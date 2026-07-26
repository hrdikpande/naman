#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
UIUX Audit - Static UI/UX scanner for web codebases.

Scans HTML/CSS/JSX/TSX/Vue/Svelte files for objectively detectable violations of
the UIUX skill's rule database (ux-guidelines.csv, quick-reference.md, pro-rules.md).
Findings map to the same 10 priority categories used by the search engine, so
audit output and database queries speak the same language.

These are HEURISTICS. They catch mechanical violations reliably; judgment calls
(visual hierarchy, copy quality, layout balance) still require reading the code
and rendering the UI. The audit report says which is which.

Usage:
    python3 audit.py <path> [--json] [--max-findings N] [--include-low]

Stdlib only. No network. Read-only.
"""

import argparse
import json
import os
import re
import sys
from collections import defaultdict
from pathlib import Path

UI_EXTENSIONS = {".html", ".htm", ".css", ".scss", ".sass", ".less",
                 ".jsx", ".tsx", ".vue", ".svelte", ".astro", ".php", ".blade.php"}
JS_EXTENSIONS = {".js", ".ts", ".mjs"}  # scanned only if they contain markup
SKIP_DIRS = {"node_modules", ".git", "dist", "build", ".next", ".nuxt", ".output",
             "vendor", "coverage", ".svelte-kit", "out", ".turbo", ".vercel",
             "__pycache__", ".cache", "public/assets", "storybook-static"}
MAX_FILE_BYTES = 1_500_000
MINIFIED_AVG_LINE = 500  # skip likely-minified files

SEVERITY_WEIGHT = {"Critical": 8.0, "High": 4.0, "Medium": 1.5, "Low": 0.5}
SEVERITY_CAP = {"Critical": 40.0, "High": 30.0, "Medium": 20.0, "Low": 10.0}
SEVERITY_ORDER = {"Critical": 0, "High": 1, "Medium": 2, "Low": 3}

EMOJI_RE = re.compile(
    "[\U0001F300-\U0001FAFF\U00002600-\U000027BF\U0001F900-\U0001F9FF"
    "\U0001FA70-\U0001FAFF\U00002190-\U000021FF\U00002B00-\U00002BFF]"
)


def is_markup_js(text):
    """Only scan .js/.ts files that actually contain JSX-ish markup or template strings with tags."""
    return bool(re.search(r"<(div|button|img|input|a|span|nav|section|form)[\s>/]", text))


def line_of(text, idx):
    return text.count("\n", 0, idx) + 1


def snippet(text, idx, width=90):
    start = text.rfind("\n", 0, idx) + 1
    end = text.find("\n", idx)
    if end == -1:
        end = len(text)
    s = text[start:end].strip()
    return (s[:width] + "…") if len(s) > width else s


class Finding:
    def __init__(self, rule_id, category, severity, file, line, evidence, why, fix):
        self.rule_id = rule_id
        self.category = category
        self.severity = severity
        self.file = file
        self.line = line
        self.evidence = evidence
        self.why = why
        self.fix = fix

    def to_dict(self):
        return self.__dict__


# ---------------------------------------------------------------------------
# Detectors. Each takes (relpath, text, ext, ctx) and yields Finding objects.
# ctx is a shared dict for project-wide flags (e.g. reduced-motion seen anywhere).
# ---------------------------------------------------------------------------

def detect_accessibility(rel, text, ext, ctx):
    # img without alt
    for m in re.finditer(r"<img\b[^>]*?/?>", text, re.I | re.S):
        tag = m.group(0)
        if not re.search(r"\balt\s*=", tag, re.I) and not re.search(r"\{\s*\.\.\.", tag):
            yield Finding("A11Y-ALT", "Accessibility", "Critical", rel, line_of(text, m.start()),
                          snippet(text, m.start()),
                          "Images without alt text are invisible to screen readers (WCAG 1.1.1).",
                          'Add descriptive alt="..." (or alt="" only if purely decorative).')
    # html lang
    if ext in (".html", ".htm"):
        for m in re.finditer(r"<html\b[^>]*>", text, re.I):
            if not re.search(r"\blang\s*=", m.group(0), re.I):
                yield Finding("A11Y-LANG", "Accessibility", "High", rel, line_of(text, m.start()),
                              snippet(text, m.start()),
                              "Missing lang attribute breaks screen-reader pronunciation and translation.",
                              'Add lang="en" (or the page language) to <html>.')
    # outline removed without focus-visible replacement
    if ext in (".css", ".scss", ".sass", ".less") or "<style" in text.lower():
        for m in re.finditer(r"outline\s*:\s*(none|0)\b", text, re.I):
            if "focus-visible" not in text:
                yield Finding("A11Y-FOCUS", "Accessibility", "Critical", rel, line_of(text, m.start()),
                              snippet(text, m.start()),
                              "Removing outlines without a :focus-visible replacement makes keyboard navigation invisible.",
                              "Keep a visible focus ring: use :focus-visible { outline: 2px solid var(--color-ring); outline-offset: 2px; }")
                break  # one per file is enough
    # icon-only button without accessible name
    for m in re.finditer(r"<button\b(?![^>]*aria-label)(?![^>]*aria-labelledby)[^>]*>\s*<(svg|i|img)\b", text, re.I):
        yield Finding("A11Y-ICONBTN", "Accessibility", "High", rel, line_of(text, m.start()),
                      snippet(text, m.start()),
                      "Icon-only buttons with no accessible name announce as 'button' with no purpose.",
                      'Add aria-label="..." describing the action (e.g. aria-label="Close menu").')
    # positive tabindex
    for m in re.finditer(r"tabindex\s*=\s*[\"']?([1-9]\d*)", text, re.I):
        yield Finding("A11Y-TABINDEX", "Accessibility", "Medium", rel, line_of(text, m.start()),
                      snippet(text, m.start()),
                      "Positive tabindex overrides natural tab order and creates unpredictable keyboard flow.",
                      'Use tabindex="0" (focusable, natural order) or restructure the DOM instead.')
    # autoplaying media with sound
    for m in re.finditer(r"<video\b[^>]*\bautoplay\b[^>]*>", text, re.I):
        if not re.search(r"\bmuted\b", m.group(0), re.I):
            yield Finding("A11Y-AUTOPLAY", "Accessibility", "High", rel, line_of(text, m.start()),
                          snippet(text, m.start()),
                          "Autoplaying video with sound is disorienting and blocked by most browsers anyway.",
                          "Add muted (and playsinline), or require a user gesture to play.")


def detect_touch_interaction(rel, text, ext, ctx):
    # zoom disabled
    for m in re.finditer(r'<meta[^>]*name=["\']viewport["\'][^>]*>', text, re.I):
        tag = m.group(0)
        if re.search(r"user-scalable\s*=\s*(no|0)", tag, re.I) or re.search(r"maximum-scale\s*=\s*1(\.0*)?\b", tag, re.I):
            yield Finding("TOUCH-ZOOM", "Touch & Interaction", "Critical", rel, line_of(text, m.start()),
                          snippet(text, m.start()),
                          "Disabling pinch-zoom blocks low-vision users from reading your content (WCAG 1.4.4).",
                          "Remove user-scalable=no and maximum-scale from the viewport meta.")
    # click handlers on non-interactive elements
    for m in re.finditer(r"<(div|span)\b[^>]*\bon:?[Cc]lick\s*=", text):
        tag_region = text[m.start():text.find(">", m.start()) + 1]
        if not re.search(r"\brole\s*=", tag_region) and not re.search(r"\btabindex\s*=", tag_region):
            yield Finding("INT-DIVCLICK", "Touch & Interaction", "High", rel, line_of(text, m.start()),
                          snippet(text, m.start()),
                          "Clickable div/span is unreachable by keyboard and invisible to assistive tech.",
                          'Use <button>, or add role="button" tabindex="0" plus key handlers.')


def detect_performance(rel, text, ext, ctx):
    imgs = list(re.finditer(r"<img\b[^>]*?/?>", text, re.I | re.S))
    # missing dimensions -> CLS
    missing_dim = [m for m in imgs
                   if not (re.search(r"\bwidth\s*=", m.group(0), re.I) and re.search(r"\bheight\s*=", m.group(0), re.I))
                   and "class=" not in m.group(0).lower()  # sized-by-CSS images get a pass at heuristic level
                   ]
    for m in missing_dim[:5]:
        yield Finding("PERF-IMGDIM", "Performance", "Medium", rel, line_of(text, m.start()),
                      snippet(text, m.start()),
                      "Images without intrinsic width/height (or CSS sizing) cause layout shift as they load (CLS).",
                      "Add width/height attributes or aspect-ratio CSS to reserve space.")
    # no lazy loading anywhere despite many images
    if len(imgs) >= 4 and not any(re.search(r'loading\s*=\s*["\']lazy', m.group(0), re.I) for m in imgs):
        yield Finding("PERF-LAZY", "Performance", "Medium", rel, line_of(text, imgs[0].start()),
                      f"{len(imgs)} <img> tags, none lazy-loaded",
                      "Below-the-fold images loading eagerly delay LCP and waste bandwidth.",
                      'Add loading="lazy" to below-the-fold images (keep hero images eager).')
    # gif usage
    for m in re.finditer(r'src=["\'][^"\']+\.gif["\']', text, re.I):
        yield Finding("PERF-GIF", "Performance", "Low", rel, line_of(text, m.start()),
                      snippet(text, m.start()),
                      "GIFs are 5-10x heavier than MP4/WebM for the same motion.",
                      "Replace with <video autoplay muted loop playsinline> or an animated WebP.")


def detect_layout_responsive(rel, text, ext, ctx):
    if ext in (".html", ".htm") and "<head" in text.lower():
        if not re.search(r'<meta[^>]*name=["\']viewport["\']', text, re.I):
            yield Finding("RESP-VIEWPORT", "Layout & Responsive", "Critical", rel, 1,
                          "<head> has no viewport meta",
                          "Without a viewport meta the page renders desktop-width on phones and users pinch-zoom to read.",
                          '<meta name="viewport" content="width=device-width, initial-scale=1">')
    # large fixed widths
    for m in re.finditer(r"(?<![-\w])width\s*:\s*([6-9]\d{2}|\d{4,})px", text):
        ctx_slice = text[max(0, m.start() - 200):m.start() + 200]
        if "max-width" not in ctx_slice:
            yield Finding("RESP-FIXEDW", "Layout & Responsive", "High", rel, line_of(text, m.start()),
                          snippet(text, m.start()),
                          f"Fixed width {m.group(1)}px overflows phone viewports (375px) and forces horizontal scroll.",
                          "Use max-width with width:100%, or responsive units (%, ch, min()).")


def detect_typography_color(rel, text, ext, ctx):
    # tiny font sizes
    for m in re.finditer(r"font-size\s*:\s*(\d+)px", text, re.I):
        px = int(m.group(1))
        if px < 12:
            yield Finding("TYPE-TINY", "Typography & Color", "High", rel, line_of(text, m.start()),
                          snippet(text, m.start()),
                          f"{px}px text is below the 12px legibility floor (16px recommended for body).",
                          "Raise to >=12px for captions, 16px for body; use rem so users can scale.")
    for m in re.finditer(r"font-size\s*:\s*(0?\.\d+)rem", text, re.I):
        if float(m.group(1)) < 0.75:
            yield Finding("TYPE-TINY", "Typography & Color", "High", rel, line_of(text, m.start()),
                          snippet(text, m.start()),
                          f"{m.group(1)}rem (~{round(float(m.group(1)) * 16)}px) is below the 12px legibility floor.",
                          "Raise to >=0.75rem for captions, 1rem for body.")
    # duplicated raw hex -> should be tokens
    if ext in (".css", ".scss", ".less", ".jsx", ".tsx", ".vue", ".svelte", ".html", ".htm"):
        hexes = re.findall(r"#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b", text)
        counts = defaultdict(int)
        for h in hexes:
            counts[h.lower()] += 1
        repeated = {h: c for h, c in counts.items() if c >= 4}
        if repeated and "--color" not in text and "var(--" not in text and "theme(" not in text:
            top = sorted(repeated.items(), key=lambda kv: -kv[1])[:3]
            ev = ", ".join(f"{h}×{c}" for h, c in top)
            yield Finding("COLOR-RAWHEX", "Typography & Color", "Medium", rel, 1, ev,
                          "The same raw hex values repeat with no token layer — palette drift is inevitable.",
                          "Define CSS variables (--color-primary, --color-accent…) or Tailwind theme colors and reference them.")


def detect_animation(rel, text, ext, ctx):
    has_motion = bool(re.search(r"(transition\s*:|@keyframes|animate-|animation\s*:)", text))
    if has_motion:
        ctx["files_with_motion"].append(rel)
    if re.search(r"prefers-reduced-motion", text):
        ctx["reduced_motion_seen"] = True
    # animating width/height (layout thrash)
    for m in re.finditer(r"transition\s*:\s*[^;{}]*\b(width|height|top|left)\b", text, re.I):
        yield Finding("ANIM-LAYOUT", "Animation", "Medium", rel, line_of(text, m.start()),
                      snippet(text, m.start()),
                      f"Transitioning '{m.group(1)}' triggers layout on every frame — jank on low-end devices.",
                      "Animate transform/opacity instead (transform: scale/translate).")
    # very slow UI transitions
    for m in re.finditer(r"transition[^;{}]*?(\d+(?:\.\d+)?)s\b", text, re.I):
        try:
            dur = float(m.group(1))
        except ValueError:
            continue
        if 1.0 <= dur < 20:  # ignore keyframe loops declared elsewhere
            yield Finding("ANIM-SLOW", "Animation", "Low", rel, line_of(text, m.start()),
                          snippet(text, m.start()),
                          f"{dur}s UI transition feels sluggish; standard is 150-300ms.",
                          "Keep interactive feedback at 150-300ms; reserve >500ms for page-level choreography.")


def detect_forms(rel, text, ext, ctx):
    # placeholder-only labels
    for m in re.finditer(r"<input\b[^>]*>", text, re.I):
        tag = m.group(0)
        if re.search(r'type=["\'](hidden|submit|button|checkbox|radio)', tag, re.I):
            continue
        has_placeholder = re.search(r"\bplaceholder\s*=", tag, re.I)
        has_name = re.search(r"\b(aria-label|aria-labelledby)\s*=", tag, re.I)
        id_m = re.search(r'\bid\s*=\s*["\']([^"\']+)["\']', tag)
        has_label = bool(id_m and re.search(r'<label[^>]*\bfor\s*=\s*["\']' + re.escape(id_m.group(1)) + r'["\']', text, re.I))
        if has_placeholder and not (has_name or has_label):
            yield Finding("FORM-LABEL", "Forms & Feedback", "High", rel, line_of(text, m.start()),
                          snippet(text, m.start()),
                          "Placeholder-only labels vanish on focus — users forget what the field asks for; screen readers may skip it.",
                          "Add a visible <label for> or at minimum aria-label; keep placeholder as an example, not the label.")


def detect_style_discipline(rel, text, ext, ctx):
    # emoji used as icons inside interactive elements
    for m in re.finditer(r"<(button|a)\b[^>]*>([^<]{0,40})</\1>", text, re.I | re.S):
        inner = m.group(2)
        if EMOJI_RE.search(inner) and len(EMOJI_RE.sub("", inner).strip()) <= 2:
            yield Finding("STYLE-EMOJI", "Style Selection", "Medium", rel, line_of(text, m.start()),
                          snippet(text, m.start()),
                          "Emoji render inconsistently across OSes and can't inherit color/size like SVG icons.",
                          "Use SVG icons (Lucide, Heroicons, Phosphor) with currentColor.")
    # !important pileup
    if ext in (".css", ".scss", ".less"):
        n = len(re.findall(r"!important", text))
        if n >= 5:
            yield Finding("STYLE-IMPORTANT", "Style Selection", "Low", rel, 1,
                          f"{n}× !important",
                          "Heavy !important use signals specificity wars — future changes become whack-a-mole.",
                          "Restructure selectors or adopt utility/token layers to remove the need for !important.")


DETECTORS = [detect_accessibility, detect_touch_interaction, detect_performance,
             detect_layout_responsive, detect_typography_color, detect_animation,
             detect_forms, detect_style_discipline]


def collect_files(root: Path):
    if root.is_file():
        return [root]
    files = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS and not d.startswith(".")]
        for fn in filenames:
            p = Path(dirpath) / fn
            ext = "".join(p.suffixes[-2:]) if fn.endswith(".blade.php") else p.suffix
            if ext.lower() in UI_EXTENSIONS or p.suffix.lower() in JS_EXTENSIONS:
                files.append(p)
    return files


def run_audit(root: Path):
    files = collect_files(root)
    findings, scanned, skipped = [], [], []
    ctx = {"reduced_motion_seen": False, "files_with_motion": []}

    for p in files:
        try:
            if p.stat().st_size > MAX_FILE_BYTES:
                skipped.append(str(p))
                continue
            text = p.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            skipped.append(str(p))
            continue
        lines = text.count("\n") + 1
        if len(text) / max(lines, 1) > MINIFIED_AVG_LINE:
            skipped.append(str(p))  # likely minified bundle
            continue
        ext = p.suffix.lower()
        if ext in JS_EXTENSIONS and not is_markup_js(text):
            continue
        rel = str(p.relative_to(root)) if root.is_dir() else p.name
        scanned.append(rel)
        for det in DETECTORS:
            findings.extend(det(rel, text, ext, ctx))

    # project-level: motion exists but reduced-motion never handled
    if ctx["files_with_motion"] and not ctx["reduced_motion_seen"]:
        findings.append(Finding(
            "ANIM-REDUCED", "Animation", "High", "(project-wide)", 0,
            f"animations/transitions in {len(ctx['files_with_motion'])} file(s), prefers-reduced-motion handled nowhere",
            "Vestibular-disorder users get motion sickness from unreduced animation (WCAG 2.3.3).",
            "Add a global @media (prefers-reduced-motion: reduce) block that minimizes animation/transition durations."))

    return findings, scanned, skipped


def score(findings):
    penalty = defaultdict(float)
    counts = defaultdict(int)
    for f in findings:
        counts[f.severity] += 1
        penalty[f.severity] = min(penalty[f.severity] + SEVERITY_WEIGHT[f.severity], SEVERITY_CAP[f.severity])
    total = max(0.0, 100.0 - sum(penalty.values()))
    grade = ("A" if total >= 90 else "B" if total >= 80 else "C" if total >= 70
             else "D" if total >= 60 else "F")
    return round(total), grade, counts


def render_text(root, findings, scanned, skipped, max_findings, include_low):
    total, grade, counts = score(findings)
    shown = [f for f in findings if include_low or f.severity != "Low"]
    shown.sort(key=lambda f: (SEVERITY_ORDER[f.severity], f.category, f.file, f.line))
    out = []
    out.append("=" * 78)
    out.append(f"UI/UX AUDIT — {root}")
    out.append(f"Files scanned: {len(scanned)}   Skipped (minified/oversize): {len(skipped)}")
    out.append(f"SCORE: {total}/100 ({grade})   "
               f"Critical: {counts.get('Critical', 0)}  High: {counts.get('High', 0)}  "
               f"Medium: {counts.get('Medium', 0)}  Low: {counts.get('Low', 0)}")
    out.append("=" * 78)
    if not shown:
        out.append("\nNo mechanical violations detected. Proceed to the judgment-layer review")
        out.append("(visual hierarchy, copy, spacing rhythm) using references/audit-playbook.md.")
    by_cat = defaultdict(list)
    for f in shown:
        by_cat[f.category].append(f)
    cat_order = ["Accessibility", "Touch & Interaction", "Performance", "Style Selection",
                 "Layout & Responsive", "Typography & Color", "Animation",
                 "Forms & Feedback", "Navigation Patterns", "Charts & Data"]
    n = 0
    for cat in cat_order:
        if cat not in by_cat:
            continue
        out.append(f"\n## {cat} — {len(by_cat[cat])} finding(s)")
        for f in by_cat[cat]:
            if n >= max_findings:
                out.append(f"\n… output capped at {max_findings} findings (use --max-findings to raise).")
                out.append("\nNOTE: mechanical scan only — pair with the judgment-layer review in references/audit-playbook.md.")
                return "\n".join(out)
            n += 1
            loc = f"{f.file}:{f.line}" if f.line else f.file
            out.append(f"  [{f.severity:8s}] {f.rule_id}  {loc}")
            out.append(f"      evidence: {f.evidence}")
            out.append(f"      why:      {f.why}")
            out.append(f"      fix:      {f.fix}")
    out.append("\nNOTE: mechanical scan only — pair with the judgment-layer review in references/audit-playbook.md.")
    return "\n".join(out)


def main():
    ap = argparse.ArgumentParser(description="Static UI/UX audit (heuristic layer)")
    ap.add_argument("path", help="File or directory to audit")
    ap.add_argument("--json", action="store_true", help="Machine-readable output")
    ap.add_argument("--max-findings", type=int, default=60)
    ap.add_argument("--include-low", action="store_true", help="Show Low-severity findings in text output")
    args = ap.parse_args()

    root = Path(args.path).resolve()
    if not root.exists():
        print(f"error: path not found: {root}", file=sys.stderr)
        sys.exit(2)

    findings, scanned, skipped = run_audit(root)
    if args.json:
        total, grade, counts = score(findings)
        print(json.dumps({
            "target": str(root), "score": total, "grade": grade,
            "counts": dict(counts), "files_scanned": len(scanned),
            "files_skipped": skipped,
            "findings": [f.to_dict() for f in findings],
        }, indent=2))
    else:
        print(render_text(root, findings, scanned, skipped, args.max_findings, args.include_low))


if __name__ == "__main__":
    main()
