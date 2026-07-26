# IPR Registration Services Website — Content & UX Brief

A complete, build-ready brief for an Intellectual Property Rights registration services website (India). Covers **content, information architecture, navigation, user experience, SEO, and GEO**. Visual design, UI, and layout are supplied by three skills in the codebase — **`neo.skill`** (design/UI authority), **`uiux.skill`** (UX guidance), and **`seo-doctor.skill`** (SEO/AEO/GEO) — not self-invented.

## How to use this
1. **Install the three skills first** (`neo.skill`, `seo-doctor.skill`, `uiux.skill`) — see STEP 0 in `00-BUILD-PROMPT.md`.
2. **Read every markdown file** in this brief before development.
3. **Write the implementation plan** (`07-IMPLEMENTATION-PLAN.md`) before any code.
4. Then build.

Start with `00-BUILD-PROMPT.md` — it's the master instruction. Then read the structure files in order, then the per-page content in `/pages`.

## Skill precedence (important)
On any visual/design conflict between `uiux.skill` and `neo.skill`, **`neo.skill` wins completely.** `uiux.skill` is UX and visual-representation *guidance* only. `seo-doctor.skill` governs all SEO/AEO/GEO.

## File index

| File | What it covers |
|---|---|
| `00-BUILD-PROMPT.md` | Master build prompt — scope, principles, requirements, deliverable checklist |
| `01-SITEMAP.md` | Full page inventory with URLs and priorities (31 pages) |
| `02-NAVIGATION.md` | Header/footer nav, breadcrumbs, internal linking, user journeys, decision guide |
| `03-USER-EXPERIENCE.md` | Audience segments, content order, enquiry flow, urgency handling, error states |
| `04-SERVICE-PAGE-TEMPLATE.md` | Shared skeleton every service page follows |
| `05-SEO-AND-GEO.md` | Metadata, URL rules, structured data, AI discoverability |
| `06-GLOBAL-CONTENT.md` | Site-wide elements: disclaimer, header/footer, reusable blocks, tone |
| `07-IMPLEMENTATION-PLAN.md` | The plan to complete BEFORE development — skill install, comprehension, phasing, content management |
| `pages/service-trademark.md` | Trademark page content — full prosecution chain |
| `pages/service-copyright.md` | Copyright page content |
| `pages/service-patent.md` | Patent page content |
| `pages/service-privacy-policy.md` | Privacy Policy page — structure only, owner supplies copy |
| `pages/supporting-pages.md` | Home, Services hub, How It Works, Pricing, About, Contact, FAQ, Resources, legal, 404 |

## The four services
1. **Trademark** — brand/logo/slogan protection, with full prosecution chain (search → filing → examination → objection → hearing → advertisement → opposition → registration → renewal).
2. **Copyright** — original creative works (literary/software, dramatic, musical, artistic, films, sound recordings).
3. **Patent** — inventions; provisional/complete, Indian/convention/PCT routes.
4. **Privacy Policy** — drafting service; **content supplied by the business owner** (structure is in place).

## Critical workflow reminders
- **Install all three skills before development**, read all md files, then write the implementation plan — in that order. No code before the plan.
- **No hallucination:** every design decision traces to `neo.skill`, every SEO decision to `seo-doctor.skill`, every content/structure decision to these markdown files. Missing info is flagged, never invented.
- **neo.skill overrides uiux.skill** on any visual conflict.
- The site must be **visually appealing, attractive, and easy to use**, with the business presented credibly and content kept centrally manageable.

## Critical launch reminders
- **Verify every fee, form number, and statutory deadline** against live IP India / Copyright Office / Patent Office sources before publishing. All such values are flagged as placeholders.
- **Never promise a registration outcome** — government stages are outside anyone's control. The site-wide disclaimer enforces this.
- **Keep the two "privacy policies" separate:** the service you sell (`/services/privacy-policy`) vs the site's own policy (`/legal/privacy-policy`).
- **Fill the Privacy Policy service copy** from the owner before that page goes live.
