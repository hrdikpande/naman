# Audit Playbook — Evaluating Existing UI & UX

This is the method for AUDIT mode. A useful audit is not a list of complaints — it is
a scored, prioritized, evidence-backed remediation plan the owner can execute top-down.
The audit has three layers; run all three, then assemble the report.

---

## Phase 0 — Scope & Inventory

1. **Identify the target**: local codebase (preferred — full access), pasted code,
   screenshots, or a live URL (fetch the HTML/CSS if tools allow; note that
   client-rendered content may be invisible to a fetch, and say so).
2. **Detect the stack** (package.json deps, pubspec.yaml, *.xcodeproj, composer.json,
   framework markers). This routes Layer-2 checks to the right `--stack` guidelines.
3. **Inventory the surfaces**: list pages/screens/components in scope. For large apps,
   agree on the 3-5 highest-traffic surfaces rather than auditing everything shallowly.
4. **Capture the business context** (industry, audience, conversion goal) — Layer 3
   depends on it. One sentence is enough.

## Layer 1 — Mechanical Scan (objective violations)

```bash
python3 <SKILL_DIR>/scripts/audit.py <path> [--json] [--include-low]
```

This catches statically detectable violations mapped to the rule database: missing
alt text, removed focus outlines, disabled zoom, placeholder-only labels, clickable
divs, fixed widths, sub-12px type, untokenized repeated hexes, layout-thrashing
transitions, missing `prefers-reduced-motion`, emoji-as-icons, CLS-risk images, and
more. Output is scored (see model below) and grouped by the same 10 categories as the
search engine.

Treat findings as *leads, not verdicts*: confirm each in context (e.g. an `<img>`
sized by CSS won't shift layout; a decorative image legitimately takes `alt=""`).
Discard confirmed false positives from the report and say you did.

## Layer 2 — Judgment Review (things regex cannot see)

Work through the 10 categories in priority order. For each, read the actual code /
rendered UI and answer the focus questions. Pull the full rule text from
`references/quick-reference.md` (sections §1-§10) when you need Do/Don't detail, and
run `--domain ux "<topic>"` for anything ambiguous.

| # | Category | Focus questions for the reviewer |
|---|----------|----------------------------------|
| 1 | Accessibility (§1) | Real contrast ratios (compute for text/bg pairs — 4.5:1 body, 3:1 large)? Keyboard-only walkthrough possible? Semantic landmarks & heading order? |
| 2 | Touch & Interaction (§2) | Targets ≥44×44 with 8px gaps? Every action gives feedback ≤100ms? Hover-only affordances that die on touch? |
| 3 | Performance (§3) | Font loading strategy (swap? subset?), bundle red flags, list virtualization for long lists, skeletons vs spinners? |
| 4 | Style Selection (§4) | Is there ONE coherent style, or flat cards next to skeuomorphic buttons? Icon set consistent (one library, one weight)? Does the style suit the industry? |
| 5 | Layout & Responsive (§5) | Walk 375/768/1024/1440: overflow, cramped tap zones, orphaned columns? Consistent container widths & breakpoints? |
| 6 | Typography & Color (§6) | Hierarchy readable at a squint? ≤2 families? Line length ≤75ch? Tokens or hex soup? Dark mode: real palette or naive inversion? |
| 7 | Animation (§7) | Motion communicates (order, causality, spatial continuity) or decorates? Exit faster than enter? Anything animating layout properties? |
| 8 | Forms & Feedback (§8) | Labels visible? Validation inline on blur? Errors adjacent & specific? Multi-step where >6 fields? |
| 9 | Navigation (§9) | Can users predict where Back goes? Active state marked? Mobile nav ≤5 items? Deep links land correctly? |
| 10 | Charts & Data (§10) | Right chart for data shape? Meaning encoded beyond color alone? Tooltips/legends present? |

Record each judgment finding in the same shape as Layer 1: `[severity] category —
file/screen — evidence — why — fix`. Severity rubric: **Critical** = blocks task
completion or excludes users (a11y); **High** = measurably hurts conversion/usability;
**Medium** = quality/consistency erosion; **Low** = polish.

## Layer 3 — Business-Fit Gap Analysis (the differentiator)

Most audits stop at rule compliance. This layer asks: *is this the right design for
this business at all?*

1. Generate what the reasoning engine recommends for their context:
   ```bash
   python3 <SKILL_DIR>/scripts/search.py "<their industry + audience + goal>" --design-system -p "<Their Name>"
   ```
2. Build a gap table — recommended vs. actual:

   | Dimension | Recommended (engine) | Actual (observed) | Gap & impact |
   |-----------|----------------------|-------------------|--------------|
   | Page pattern & section order | … | … | e.g. no social proof before CTA → trust gap |
   | Style family | … | … | e.g. playful clay UI on a legal site → credibility gap |
   | Palette & CTA color | … | … | e.g. CTA same hue as links → invisible |
   | Typography mood | … | … | … |
   | Anti-patterns for this industry | listed | violated? | each violation is auto-High |

3. Every violated industry anti-pattern (e.g. "AI purple/pink gradients" for banking,
   "unclear fees" for fintech) enters the findings list at High severity minimum.

## Scoring Model

Start at 100. Deduct per finding, capped per severity so one category can't zero the
score: Critical −8 (cap 40) · High −4 (cap 30) · Medium −1.5 (cap 20) · Low −0.5
(cap 10). Grades: A ≥90 · B ≥80 · C ≥70 · D ≥60 · F <60. `audit.py` computes this for
Layer 1 automatically; fold Layer 2/3 findings in manually using the same weights and
present ONE combined score. Always show the count breakdown next to the score so the
number is auditable.

## Report Template (use this structure)

```
# UI/UX Audit — <Product> — <date>
## Executive Summary
Combined score X/100 (grade). Three-sentence verdict: biggest risk,
biggest quick win, overall trajectory.
## Scorecard
Table: 10 categories × (findings count, worst severity, one-line status).
## Critical & High Findings  (each: ID · location · evidence · why · fix · effort S/M/L)
## Medium & Low Findings     (compact table)
## Business-Fit Gap Analysis (the Layer-3 table + narrative)
## Remediation Plan
1. Fix-now (Critical, <1 day items first)
2. This-sprint (High)
3. Backlog (Medium/Low, grouped by file/component so fixes batch)
## What's Working
3-5 genuine strengths — credibility requires acknowledging them.
```

Offer to execute the remediation plan; if accepted, switch to CREATE-mode discipline
(tokens, quality bar, pre-delivery gate) for every fix, and re-run `audit.py` after to
show the before → after score.
