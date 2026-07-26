# Creation Playbook — Business Requirement → Shipped Interface

This is the end-to-end method for CREATE mode. The goal is not "a page that works" —
it is an interface a design-literate founder would screenshot and share. Follow the
phases in order; each produces an artifact the next phase consumes.

---

## Phase 1 — Decode the Business Requirement

Before any pixel decision, extract these six facts from the request (ask only if
genuinely undeterminable — prefer inferring from context):

| Fact | Why it matters | Example |
|------|----------------|---------|
| **Industry / product type** | Drives the reasoning engine's pattern + anti-pattern selection (192 categories) | "real estate CRM" ≠ "meditation app" |
| **Primary conversion goal** | Determines page pattern & CTA strategy | demo booking / signup / purchase / portfolio credibility |
| **Audience sophistication** | Sets density, jargon level, visual risk tolerance | enterprise buyers → Trust & Authority; Gen Z → Neubrutalism viable |
| **Brand adjectives (3-5)** | Feed the style/color/typography searches | "premium, calm, clinical" vs "loud, playful, fast" |
| **Differentiator** | The hero section must lead with this, not generic claims | "only ABDM-compliant marketplace" beats "best healthcare platform" |
| **Stack** | Routes all implementation guidance | detect from repo files before asking |

Write these down (1 line each) before Phase 2. A design system generated from a vague
query produces a vague site.

## Phase 2 — Generate the Design System (never skip)

```bash
python3 <SKILL_DIR>/scripts/search.py "<industry> <product> <brand adjectives>" \
  --design-system -p "<Project Name>" [-f markdown]
```

Then tune with dials when the brief implies them:
- `--variance 8-10` for portfolios/creative agencies (bold, asymmetric); `1-3` for gov/finance/medical
- `--motion 7-9` for storytelling/product launches (returns ready GSAP snippets); `1-3` for dashboards/utilities
- `--density 8-10` for dashboards/admin; `1-3` for premium marketing pages

**Persist it for multi-page projects** so every later page pulls the same tokens:
```bash
... --design-system --persist -p "Name" --output-dir "<project-root>" [--page "pricing"]
```
Check whether `design-system/<slug>/MASTER.md` already exists FIRST — if so, read and
honor it; never regenerate over prior decisions without `--force` and user consent.

**Treat the output as a contract:** the palette hexes become CSS variables verbatim,
the font pairing is loaded exactly as given, the listed anti-patterns are hard bans,
and the section list becomes the page outline.

## Phase 3 — Deepen with Targeted Searches (2-4 queries, as needed)

| Gap | Query |
|-----|-------|
| Section needs animation | `--domain gsap "scroll reveal stagger"` (copy the snippet + its Don't notes) |
| Need icons | `--domain icons "<function>"` → gives library + import code; never emoji |
| Dashboard/data page | `--domain chart "<data shape>"` → chart type + library |
| Unsure on a UX pattern | `--domain ux "<pattern>"` → Do/Don't + severity |
| Stack-specific implementation | `--stack <detected>` "<feature keywords>" |

If a search returns 0 results: retry once with broader words; if still empty, use the
priority-table defaults and say so explicitly. Never fabricate database output.

## Phase 4 — Token Architecture (before writing components)

Three layers, top referencing bottom, components referencing only the top two:

1. **Primitive** — raw values from the design system output:
   `--blue-600: #2563EB; --space-4: 1rem; --font-heading: 'Poppins';`
2. **Semantic** — role-mapped: `--color-primary: var(--blue-600); --color-bg`,
   `--color-fg`, `--color-muted`, `--color-border`, `--color-accent`,
   `--color-destructive`, `--color-ring`, plus `--radius`, `--shadow-sm/md/lg`.
3. **Component** — only where a component diverges: `--button-radius: var(--radius)`.

In Tailwind, layer 2 lives in `theme.extend.colors` / CSS `@theme`; components then use
`bg-primary text-on-primary`, never raw hexes. Dark mode = swapping layer-2 values only.
This single discipline is what makes later restyling a 10-line change instead of a rewrite.

## Phase 5 — The Visual Quality Bar

What separates "generic AI page" from "visually appealing" is craft in five places:

**Hero (users judge in 3 seconds).** One dominant focal point. Headline states the
differentiator in ≤9 words; subhead adds proof/specifics. Primary CTA uses the accent
color found nowhere else at that weight. Add ONE depth device from the chosen style
(glass blur, soft gradient mesh, bento tile, oversized display type, layered product
shot) — not three. Whitespace above the fold is a feature, not waste.

**Rhythm.** Pick a spacing scale (the design system output gives one) and never
freelance values. Section vertical padding is consistent (e.g. `py-24` desktop /
`py-16` mobile everywhere). Alternate section backgrounds subtly (bg / muted / bg) to
create scannable bands instead of borders.

**Typographic hierarchy.** Exactly two families (from the pairing). Display sizes are
brave: hero h1 at `clamp(2.5rem, 5vw+1rem, 4.5rem)`, tight tracking on large sizes,
`line-height: 1.1` headings vs `1.6` body, max `65ch` measure on paragraphs. Muted
foreground for secondary text instead of smaller sizes.

**Real content, no lorem.** Write plausible domain-specific copy: real-sounding
feature names, numeric proof points ("4,200+ audits run"), specific testimonials with
name + role. Use SVG patterns/gradients or CSS shapes for visuals; if images are
needed, use meaningful placeholders with correct aspect ratios and `alt`.

**Motion with intent.** Every animation answers "what does this communicate?" —
entrance stagger implies order, hover lift implies clickability. 150-300ms
interactions, `transform`/`opacity` only, one signature scroll moment maximum per page,
`prefers-reduced-motion` block always present.

**Section anatomy for landing pages** (adapt to the pattern the design system chose):
nav (sticky, blur, ≤5 links + CTA) → hero → social proof strip (logos/metric) →
features (3-6, icon + benefit-first copy) → deep-dive or how-it-works →
testimonials (specific, attributed) → pricing (if relevant; highlight one tier) →
final CTA (restate differentiator) → footer (real links, no dead ends).

## Phase 6 — Build Discipline

- Semantic HTML first: `nav/main/section/article/footer`, one `h1`, ordered heading levels.
- Every interactive element: `cursor-pointer`, visible hover (≤300ms), `:focus-visible`
  ring, and disabled/loading states where async.
- Responsive at 375 / 768 / 1024 / 1440. Mobile-first classes; no fixed pixel widths
  on containers; test that nothing horizontally scrolls at 375px.
- Forms: visible labels, inline validation on blur, error text adjacent to field,
  submit shows loading → success/error.
- Images: dimensions or aspect-ratio set (CLS), lazy-load below fold, WebP where possible.

## Phase 7 — Pre-Delivery Gate (mandatory)

Run BOTH before presenting anything:
1. `python3 <SKILL_DIR>/scripts/audit.py <output-path>` — must score ≥90 with zero
   Critical findings. Fix and re-run until it does.
2. The canonical checklist in `references/pro-rules.md` — walk every unchecked item.

Only then deliver, stating: chosen style + why it fits the business, the palette/type
contract, and the audit score.
