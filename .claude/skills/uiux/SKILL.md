---
name: uiux
description: "UI/UX design intelligence with two modes: CREATE (build visually striking, business-fit interfaces from scratch) and AUDIT (score and remediate existing UI/UX). Local BM25 engine over 84 UI styles, 192 industry palettes, 192 product reasoning rules, 74 font pairings, 1,900+ Google Fonts, 98 UX guidelines, icons, GSAP motion presets, and chart types across 22 stacks (React, Next.js, Vue, Nuxt, Svelte, Astro, Angular, Laravel, SwiftUI, Flutter, React Native, Compose, Tailwind, shadcn), plus a static audit scanner. Use whenever the user wants to build, design, redesign, restyle, or implement ANY page, website, landing page, dashboard, app screen, or component — even just 'make it look good' or 'build me a site for my business' — AND whenever they want to review, audit, critique, score, fix, or improve existing UI, UX, accessibility, responsiveness, or visual design. Also for choosing styles, color palettes, typography, icons, animations, or charts."
license: Engine, databases, and quick-reference/pro-rules bundled from nextlevelbuilder/ui-ux-pro-max-skill (MIT — see LICENSE-upstream.txt); audit engine and playbooks added on top.
---

# UIUX — Design Intelligence: Create & Audit

Two capabilities, one rule database. **CREATE** turns a business requirement into a
design system and a polished interface. **AUDIT** turns an existing interface into a
scored, prioritized remediation plan. Both speak the same language: 10 priority
categories backed by searchable CSVs and executable scripts.

All scripts are Python 3, stdlib-only, no network. `<SKILL_DIR>` below means this
skill's own directory (the folder containing this SKILL.md — resolve its absolute
path first; the scripts locate their data relative to themselves, so they run from
anywhere). If `python3` is missing, try `python`; if neither exists, ask the user
before installing anything, and fall back to `references/quick-reference.md`.

---

## Mode Router

| User intent sounds like | Mode | Start at |
|-------------------------|------|----------|
| "Build / design / create a site, page, dashboard, app UI" | **CREATE** | Create workflow below |
| "Make a component" (card, modal, pricing table) | **CREATE (component)** | Steps C3-C5 only |
| "Review / audit / critique / score my UI or UX" | **AUDIT** | Audit workflow below |
| "Fix / improve / modernize my existing site" | **AUDIT → CREATE** | Audit first, then remediate with create discipline |
| "Which style / colors / fonts fit my product?" | **ADVISE** | Run `--design-system`, present, don't build |
| "Redesign X" | **AUDIT (light) → CREATE** | Layer-3 gap analysis, then full create |

When intent is ambiguous between building and reviewing, ask one clarifying question
rather than guessing — the two modes produce very different deliverables.

---

## CREATE Workflow

Full methodology with the visual quality bar, token architecture, and section anatomy:
**read `references/creation-playbook.md` before building any page or site.** Summary:

**C1. Decode the business requirement** — industry, conversion goal, audience,
3-5 brand adjectives, differentiator, stack (detect from repo files: package.json,
pubspec.yaml, *.xcodeproj, composer.json; never assume — ask or default html-tailwind).

**C2. Generate the design system (required for any new page/project):**
```bash
python3 <SKILL_DIR>/scripts/search.py "<industry> <product> <adjectives>" --design-system -p "<Project>"
```
Optional dials: `--variance 1-10` (minimal↔bold), `--motion 1-10` (attaches matching
GSAP snippet), `--density 1-10` (spacious↔dashboard spacing tokens).
For multi-page projects persist it: add `--persist --output-dir "<project-root>"`
(+ `--page "<name>"` for per-page overrides). If `design-system/<slug>/MASTER.md`
already exists, read and honor it — never overwrite without `--force` and consent.
The output is a contract: exact hexes → CSS variables, exact font pairing, listed
anti-patterns are hard bans, section list = page outline.

**C3. Deepen with targeted searches** (see full domain table below): `--domain gsap`
for animation snippets, `--domain icons` for icon imports (never emoji), `--domain
chart` for data viz, `--domain ux` for pattern Do/Don'ts.

**C4. Get stack guidelines:** `python3 <SKILL_DIR>/scripts/search.py "<feature>" --stack <stack>`

**C5. Build to the quality bar** (playbook Phase 4-6): three-layer tokens
(primitive → semantic → component), hero craft, spacing rhythm, brave typographic
hierarchy, real domain-specific copy (no lorem), motion with intent + reduced-motion
support, semantic HTML, visible focus/hover states, responsive at 375/768/1024/1440.

**C6. Pre-delivery gate (mandatory):**
```bash
python3 <SKILL_DIR>/scripts/audit.py <output-path>
```
Must reach ≥90 with zero Critical findings — fix and re-run until it does. Then walk
the canonical checklist in `references/pro-rules.md`. Deliver with: chosen style +
why it fits the business, the token contract, and the audit score.

---

## AUDIT Workflow

Full methodology with focus questions, severity rubric, and the report template:
**read `references/audit-playbook.md` before auditing.** Summary of the three layers:

**A1. Scope** — target (codebase / pasted code / screenshots / URL), stack, surfaces
in scope, one-line business context.

**A2. Layer 1 — mechanical scan:**
```bash
python3 <SKILL_DIR>/scripts/audit.py <path> [--json] [--include-low]
```
Verify each finding in context; drop confirmed false positives and say so.

**A3. Layer 2 — judgment review:** walk the 10 categories below in priority order
against the actual code/rendered UI (contrast math, keyboard walkthrough, breakpoint
walkthrough, style coherence, copy hierarchy). Rule detail lives in
`references/quick-reference.md` §1-§10.

**A4. Layer 3 — business-fit gap analysis:** generate what the reasoning engine
recommends for their industry (`--design-system`), build the recommended-vs-actual
gap table; each violated industry anti-pattern is at least High severity.

**A5. Report** using the template in the playbook: executive summary, combined score
(model: 100 − Critical 8/cap 40 − High 4/cap 30 − Medium 1.5/cap 20 − Low 0.5/cap 10;
A≥90 B≥80 C≥70 D≥60), scorecard, findings with evidence/why/fix/effort, gap analysis,
prioritized remediation plan, and 3-5 genuine strengths. Offer to execute the plan —
then switch to CREATE discipline and re-run `audit.py` to show before → after.

---

## Rule Categories by Priority (shared by both modes)

| Priority | Category | Impact | Domain | Key checks | Key anti-patterns |
|---|---|---|---|---|---|
| 1 | Accessibility | CRITICAL | `ux` | Contrast 4.5:1, alt text, keyboard nav, aria-labels | Removed focus rings, unnamed icon buttons |
| 2 | Touch & Interaction | CRITICAL | `ux` | ≥44×44px targets, 8px gaps, loading feedback | Hover-only affordances, disabled zoom |
| 3 | Performance | HIGH | `ux`, `react` | WebP/AVIF, lazy loading, reserved space (CLS<0.1) | Layout thrash, eager everything |
| 4 | Style Selection | HIGH | `style`, `product` | Match product type, one coherent style, SVG icons | Style mixing, emoji as icons |
| 5 | Layout & Responsive | HIGH | `ux` | Mobile-first, viewport meta, no horizontal scroll | Fixed px containers, zoom disabled |
| 6 | Typography & Color | MEDIUM | `typography`, `color` | 16px base, line-height 1.5, semantic tokens | <12px body, gray-on-gray, raw hex everywhere |
| 7 | Animation | MEDIUM | `gsap`, `ux` | 150-300ms, meaning-bearing, reduced-motion | Decorative-only, animating width/height |
| 8 | Forms & Feedback | MEDIUM | `ux` | Visible labels, inline errors near field | Placeholder-only labels, errors only on submit |
| 9 | Navigation | HIGH | `ux` | Predictable back, ≤5 bottom-nav items, deep links | Overloaded nav, broken back |
| 10 | Charts & Data | LOW | `chart` | Legends, tooltips, accessible encoding | Color as the only channel |

Full rule text with Do/Don't for every category: `references/quick-reference.md`.
App-specific polish (icons, touch feedback, dark-mode contrast, safe areas) and the
canonical pre-delivery checklist: `references/pro-rules.md`.

---

## Search Engine Reference

```bash
python3 <SKILL_DIR>/scripts/search.py "<query>" [--domain D] [--stack S] [-n N] [--json] [--full]
```

**Domains** (auto-detected if omitted; pass explicitly if results look off-topic):
`product` (192 types) · `style` (84 styles + CSS keywords + implementation checklist) ·
`color` (192 palettes) · `typography` (74 pairings + Google Fonts imports) ·
`google-fonts` (1,900+ individual fonts) · `landing` (34 page patterns) ·
`chart` (25 types + libraries) · `ux` (98 guidelines) · `icons` (104 entries + import
code) · `gsap` (16 motion presets with snippets) · `react` (44 performance rules) ·
`web` (app-interface guidelines).

**Stacks:** `html-tailwind` (default) · `react` · `nextjs` · `vue` · `nuxtjs` ·
`nuxt-ui` · `svelte` · `astro` · `angular` · `laravel` · `shadcn` · `threejs` ·
`swiftui` · `react-native` · `flutter` · `jetpack-compose` · `javafx` · `wpf` ·
`winui` · `avalonia` · `uno` · `uwp`.

**Query craft:** combine product + industry + tone + density ("fintech dashboard
dark data-dense"), 1-6 words per concept; rephrase rather than repeat on misses.

**Zero results:** retry once broader; if still empty, fall back to the priority table
and tell the user the recommendation is a built-in default, not a database match.
Never present an empty search as data.

## Audit Scanner Reference

```bash
python3 <SKILL_DIR>/scripts/audit.py <path> [--json] [--max-findings N] [--include-low]
```
Scans .html/.css/.scss/.jsx/.tsx/.vue/.svelte/.astro/.blade.php (+ .js/.ts containing
markup), skips node_modules/dist/minified files, and emits scored findings
(rule id · file:line · evidence · why · fix) grouped by the 10 categories. Heuristic
layer only — always pair with the judgment review in `references/audit-playbook.md`.

## Bundled Resources

- `scripts/search.py`, `scripts/core.py`, `scripts/design_system.py` — BM25 engine + reasoning generator (upstream, MIT)
- `scripts/audit.py` — static UI/UX scanner (added)
- `scripts/validate_data.py` — data integrity check for the CSVs
- `data/*.csv`, `data/stacks/*.csv` — the 13 domain databases + 22 stack guides
- `references/quick-reference.md` — all 98 UX rules with rationale (§1-§10)
- `references/pro-rules.md` — canonical pre-delivery checklist + app polish rules
- `references/creation-playbook.md` — CREATE methodology (read before building)
- `references/audit-playbook.md` — AUDIT methodology + report template (read before auditing)
