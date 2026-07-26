---
name: neo
description: Design system and CSS/HTML reference for NeoBrutalism — a raw, high-contrast visual style built on hard borders, flat offset shadows, and bold uppercase type. Use this skill whenever the user asks for "neobrutalism," "neo-brutalist," "brutalist," or a bold/raw/punk/Swiss-grid aesthetic for a website, landing page, dashboard, component, or any HTML/React/frontend UI — even if they just say "make it look brutalist" or "give me that bold bordered look with hard shadows." Also trigger if the user references bento grids, hard offset shadows, or a beige-background/black-border/yellow-accent look without naming the style explicitly. Applies to full page builds (hero, navbar, footer, stats, testimonials) as well as single components (buttons, cards, inputs).
---

# NeoBrutalism Design System

## Personality

Raw, systematic, and unapologetic. Every element is visible, every border is declared, every shadow is hard. Think Swiss grid theory meets punk music — bold enough to demand attention, structured enough to convert. When building any NeoBrutalism UI, lead with confidence: no soft edges, no ambiguity, no half-measures.

## The Two Non-Negotiable Rules

Every single element — buttons, cards, inputs, badges, sections — must carry both of these. No exceptions:

**Rule 1 — Hard Border**
```css
border: 3px solid #0A0A0A;
border-radius: 4px; /* 4px MAX, never more */
```

**Rule 2 — Hard Offset Shadow (flat, no blur, no spread)**
```css
box-shadow: 5px 5px 0 #0A0A0A;
```
Never use `blur` in a box-shadow. Never use `rgba` for the shadow color. The shadow is always flat black at 100% opacity.

If you're about to write `border-radius: 8px+` or a shadow with a blur value, stop — that's the style breaking down.

## Color System

**Base (always present):**
- Background: `#FFFEF0` (paper beige — never pure white)
- Black: `#0A0A0A` (all borders, shadows, primary text — never pure `#000000`)
- White: `#FFFFFF` (card surfaces that need to lift off the beige background)

**6 accent colors — pick 2–3 max per page, rotate per section, never all at once:**
| Color | Hex | Use |
|---|---|---|
| Electric Yellow | `#FFE600` | primary CTA, hero badges, highlights, active states |
| Hot Magenta | `#FF3EA5` | secondary accent, destructive actions, attention markers |
| Vivid Cyan | `#00C2CB` | feature blocks, info states, link accents |
| Deep Purple | `#7B2FBE` | stats sections, full-bleed contrast panels |
| Signal Green | `#00C853` | success states, checkmarks, positive indicators |
| Bright Orange | `#FF6B35` | warmth accent, pricing highlights |

**Pastel variants (bento card backgrounds only):**
`#FFDB58` yellow · `#87CEEB` cyan · `#FFC0CB` pink · `#BAFCA2` green · `#C4A1FF` purple · `#FFA07A` orange

## Typography

Font: **Space Grotesk** (preferred) or **Inter**.

```
Display/H1:  clamp(40px, 6vw, 72px), weight 900, letter-spacing -0.03em, UPPERCASE, line-height 0.95
H2:          clamp(28px, 4vw, 44px), weight 900, letter-spacing -0.03em, UPPERCASE, line-height 1.0
H3:          clamp(20px, 2.5vw, 28px), weight 800, letter-spacing -0.02em
Body:        16-18px, weight 400-500, line-height 1.6, color #333
Label/Meta:  12-13px, weight 700, letter-spacing 0.08-0.12em, UPPERCASE, color #666
Section Tag: 11px, weight 700, letter-spacing 0.12em, UPPERCASE, white text on black pill
```

Display headings MUST be uppercase — lowercase display text breaks the aesthetic.

## Core Components

### Section Tag
Every section opens with this label:
```html
<div style="display:inline-block; background:#0A0A0A; color:#FFFFFF; font-size:11px;
  font-weight:700; letter-spacing:0.12em; text-transform:uppercase; padding:5px 14px;
  border-radius:2px; margin-bottom:16px;">SECTION LABEL</div>
```

### Buttons — The Press Effect
Default state has full border + shadow. Hover lifts (shadow shrinks as if being pushed). Active fully presses in (shadow disappears).
```css
.btn {
  border: 3px solid #0A0A0A; border-radius: 4px;
  box-shadow: 5px 5px 0 #0A0A0A;
  font-weight: 700; font-size: 15px; letter-spacing: 0.02em;
  padding: 12px 24px; cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}
.btn:hover  { transform: translate(2px, 2px); box-shadow: 3px 3px 0 #0A0A0A; }
.btn:active { transform: translate(5px, 5px); box-shadow: 0 0 0 #0A0A0A; }
```
Variants: **Primary** yellow bg/black text (main CTA) · **Dark** black bg/white text (secondary/high-contrast) · **White/Outline** white bg/black text (browse actions) · **Accent** contextual color per section.

### Cards
```css
.card {
  background: #FFFFFF; border: 3px solid #0A0A0A; border-radius: 4px;
  box-shadow: 5px 5px 0 #0A0A0A; padding: 28px;
  transition: transform 0.15s, box-shadow 0.15s;
}
.card:hover { transform: translate(-3px, -3px); box-shadow: 8px 8px 0 #0A0A0A; }
```
Cards lift UP-LEFT on hover with a bigger shadow — the opposite motion of buttons (picked up vs. pushed down). This contrast is intentional; preserve it.

- **Accent card** (bento grids): same border/shadow, pastel or vivid background instead of white.
- **Dark card** (stats/featured): `background:#0A0A0A; color:#FFFFFF`, yellow numbers for impact.

### Inputs
```css
.input {
  border: 3px solid #0A0A0A; border-radius: 4px; background: #FFFFFF;
  padding: 12px 16px; font-size: 15px; font-weight: 500; outline: none;
}
.input:focus { box-shadow: 4px 4px 0 #0A0A0A; }
.input.error { border-color: #FF3EA5; box-shadow: 4px 4px 0 #FF3EA5; }
```

## Layout Patterns

### Bento Grid (signature feature-section layout)
```css
.bento-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
```
Sizes: `1×1` normal · `2×1` wide (most important, top/bottom) · `1×2` tall (stat/featured) · `2×2` large (hero feature).
Rule: every card gets a different background color; no two adjacent cards share a color.

### Navbar
White bg, 3px bottom border, 60px height. Left: logo mark (accent bg + black border) + UPPERCASE brand name. Center-left: nav links (hover = yellow bg). Right: ghost "Log in" + yellow pill "Sign up". Sticky. No rounded dropdowns — if present, full-border flat hard-shadow panels.

### Announcement Bar (above navbar)
`background:#0A0A0A; color:#FFE600;` 13px/700/letter-spacing 0.05em, centered, 8px 24px padding. Marketing message + "CHECK IT OUT →" in yellow.

### Hero — Asymmetric Two-Column
Left (55%): badge pill → giant H1 → subtitle → button row → trust checkmarks. Right (45%): abstract blocks/illustration/product preview.

Hero badge pill:
```css
background:#FFE600; border:3px solid #0A0A0A; border-radius:4px;
box-shadow:3px 3px 0 #0A0A0A; padding:5px 14px;
font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;
```

Trust checkmarks: flex row, gap 6px; check icon is `18×18px`, `background:#00C853`, `border:2px solid #0A0A0A`, `border-radius:2px`, containing a ✓.

### Features Strip
4 equal columns, border-right between them (last column has none). Each: colored icon box (36×36px, bordered, accent rotates per item), UPPERCASE title, description in `#555`, "↗" arrow bottom-right on hover, full column bg shifts to yellow on hover.

### Stats Section
Full-bleed `#7B2FBE` background, white borders between the 4 columns. Cols 1–3: huge stat number in `#FFE600`, label in `rgba(255,255,255,0.8)`. Col 4: "TRUSTED BY" label + brand badges (white text, semi-transparent bg).

### Testimonial Cards
White bg, hard border + shadow, 3 columns. Oversized `"` in `#FFE600` (Georgia, 48px), body text `#333` 14px, author row (colored avatar circle + name + role). Hover lifts like standard cards.

### CTA / Newsletter Bands
**Full-bleed yellow CTA:** `background:#FFE600`, `border-top`/`border-bottom: 3px solid #0A0A0A`, no radius (edge to edge). Large uppercase headline left + body + button right.

**Newsletter strip:** `background:#0A0A0A`, white title, `rgba(255,255,255,0.6)` subtitle. Email input fused to subscribe button: input `border-right:none`, yellow button `border-radius:0 4px 4px 0`.

### Footer
`background:#0A0A0A`. 4-column grid: brand (+logo mark) + 3 link columns. Column headers `#FFE600` uppercase 12px letter-spacing 0.1em. Links `rgba(255,255,255,0.55)` → white on hover. Separator `1px solid rgba(255,255,255,0.15)` — deliberately NOT 3px; the footer stays quiet relative to the rest of the page.

## The Arrow Convention
`↗` external links · `→` internal navigation · `↓` expand/more · `←` back. Never use chevrons (`>`) — too subtle, always use bold directional arrows.

## Spacing System (strict 8pt grid)
```
4px micro (icon-to-text) · 8px tight (badge padding) · 12px bento gap
16px component internal · 24px between related components · 32px section sub-spacing
48px section padding mobile · 64px section padding desktop · 96px major section separation
```
Never use odd values (5px, 7px, 11px...) — everything divides by 4.

## Responsive Behavior
- Hero stacks single-column on mobile; hero-right block hides; nav links hide.
- Features strip: 4-col → 2-col → 1-col.
- Bento grid: 3-col → 2-col → 1-col (wide/tall spans drop at 1-col).
- Stats: 4-col → 2-col → 1-col.
- Display text always uses `clamp()`, never fixed px.
- Section padding: 64px desktop → 40px tablet → 20px mobile.
- Disable all `:hover` effects on touch devices (gate behind pointer media query).

## Hard Constraints — Never Do This
- `border-radius` > 4px on structural elements
- Any `box-shadow` with blur (e.g. `0 4px 12px rgba(0,0,0,0.1)`)
- Gradients as primary backgrounds (flat accent fills only)
- Center-aligned body text (only hero headings + full-bleed stat sections center)
- More than 3 accent colors on one page
- Soft/desaturated colors (`#eee`, `#f0f0f0`, muted blues) — every color must be strong and intentional
- Inconsistent grid gaps (12px bento, 16px standard — pick per context and stay consistent)
- Color as the only state signal — always pair with a shape/icon change for accessibility

## Build Workflow

1. **Scope the ask** — full page vs. single component vs. section. Don't build a whole page when only a button was asked for.
2. **Pick 2–3 accent colors** for the page up front and use them consistently across sections — don't let colors drift section to section beyond the rotation described above.
3. **Apply both non-negotiable rules to every element** before anything else — border + hard offset shadow first, styling details second.
4. **Use the component specs above verbatim** for spacing, radii, and shadow values — don't approximate (e.g. don't round `5px 5px 0` to `4px 4px 0`).
5. **Check the "Never Do This" list** before delivering — it's the fastest way to catch drift back toward generic soft-UI defaults.
6. If building in HTML/CSS or React, also consult the `frontend-design` skill for general layout/typography scaffolding, then layer this NeoBrutalism spec on top for the visual language.
