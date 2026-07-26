# Implementation Plan (completed before development)

## 1. Pre-flight confirmation
- [x] `neo.skill` installed and loadable — extracted to `.claude/skills/neo/SKILL.md`.
- [x] `seo-doctor.skill` installed and loadable — extracted to `.claude/skills/seo-doctor/SKILL.md` (+ 24 sub-skills).
- [x] `uiux.skill` installed and loadable — extracted to `.claude/skills/uiux/SKILL.md` (+ CREATE/AUDIT playbooks, scripts, data).
- [x] All markdown files read and understood: `00-BUILD-PROMPT.md` (recovered from user), `01-SITEMAP.md`, `02-NAVIGATION.md`, `03-USER-EXPERIENCE.md`, `04-SERVICE-PAGE-TEMPLATE.md`, `05-SEO-AND-GEO.md`, `06-GLOBAL-CONTENT.md`, `README.md`, and all files in `/pages` (`service-trademark.md`, `service-copyright.md`, `service-patent.md`, `service-privacy-policy.md`, `supporting-pages.md`).
- [x] Skill precedence understood: **neo.skill overrides uiux.skill on any visual conflict; uiux.skill is UX/audit guidance only; seo-doctor.skill governs all SEO/AEO/GEO.**

Note: `00-BUILD-PROMPT.md` was missing from the delivered file set (folder only contained `01`–`07` + README + service pages). Its full text was supplied directly by the business owner during this session and is treated as authoritative; it should be added to the repo as `00-BUILD-PROMPT.md` for future reference.

## 2. Understanding summary

The site is a 31-page marketing and lead-generation website for **bhartiyaipsolutions**, an Indian IPR (Intellectual Property Rights) registration facilitation business. It has three jobs: **educate** non-lawyer visitors on what Trademark, Copyright, Patent, and Privacy Policy protection mean and cost; **convert** them into enquiries via a single, consistently-named primary action; and **rank/be-cited** in both traditional search and AI answer engines (GEO).

Four services: **Trademark** (brand/logo/slogan, full prosecution chain incl. objection/hearing/opposition/renewal), **Copyright** (creative works, six categories), **Patent** (inventions, provisional/complete/PCT routes), and **Privacy Policy drafting** — the only service whose substantive copy is owner-supplied rather than pre-written; its page ships with the same structural template but `[OWNER TO SUPPLY]` content slots.

Page inventory (31 at launch, per `01-SITEMAP.md`): 8 top-level pages, 4 main service pages, 12 service sub-pages (5 trademark, 3 copyright, 4 patent), 4 legal/utility pages, 3 system pages (thank-you, 404, search) — plus 5 Resources articles (excluded from the 31 count per the sitemap's own note).

Core journeys (`02-NAVIGATION.md`, `03-USER-EXPERIENCE.md`): fast-lane enquiry (Home → service → enquiry, 3 clicks), guided comparison (Services hub decision guide), deadline-driven support intent (sub-pages must surface statutory deadlines early), top-of-funnel research (Resources → service page), and direct human contact. Content on every page follows the fixed order: what it is → who needs it → what's included → process → documents → timeline → cost → FAQ → primary action (repeated top and bottom).

## 3. Skill application map

- **neo.skill →** the entire visual system: paper-beige/black/white base, 6-accent rotating palette, Space Grotesk type scale, the two non-negotiable rules (3px hard border + flat offset shadow, ≤4px radius), button press-effect, card lift-on-hover, bento grid (used for the four-services showcase), stats-band styling (reused for key-facts strips), section-tag labels, arrow convention, 8pt spacing scale, footer/navbar/CTA-band specs. Implemented as Tailwind config tokens + `global.css` + a small set of reusable Astro components (`Button`, `Card`, `SectionTag`, `Input`) used verbatim everywhere — no ad hoc styling invented outside this system.
- **uiux.skill →** UX/interaction guidance layered on top of neo's visuals, never overriding them: accessibility (contrast, focus states, keyboard nav), touch target sizing, mobile-first responsive behavior, form/feedback patterns (inline validation, field-level errors), navigation predictability. Also its `scripts/audit.py` is run as the mandatory pre-delivery quality gate (≥90, zero Critical) per the skill's own CREATE workflow.
- **seo-doctor.skill →** applied per `05-SEO-AND-GEO.md`: unique title/meta/canonical/OG per page, JSON-LD (Organization/LegalService sitewide, BreadcrumbList, FAQPage, Service, Article), `llms.txt`, question-based FAQ/article headings, consistent entity naming (`bhartiyaipsolutions` everywhere), freshness dates on content pages, XML sitemap, and the quality-gate rules from the skill (no HowTo schema, FAQ schema kept for AI-citation value not Google rich results per its 2026 deprecation note).
- **Conflict handling →** neo.skill wins on every visual decision. uiux.skill's role is strictly UX/interaction/accessibility guidance and the audit gate — it never dictates colors, borders, shadows, or layout skeleton where neo.skill already specifies one.

## 4. Information architecture plan
- Full 31-page sitemap from `01-SITEMAP.md` will be built (see §5 sequencing). No pages merged or dropped.
- Navigation, breadcrumbs, and the 7 internal-linking rules from `02-NAVIGATION.md` are implemented via shared `Header`, `Footer`, `Breadcrumbs` components driven by a single `src/data/nav.ts` source of truth — no hand-duplicated nav markup per page.
- The two "privacy policy" surfaces are kept structurally separate: `/services/privacy-policy` (the service sold, owner-supply content slots) vs. `/legal/privacy-policy` (the site's own data-handling policy, standard legal content). Distinct routes, distinct nav entries (Services column vs. Legal column in the footer), never cross-linked as if the same thing.

## 5. Page build sequence (phased) — as executed
1. This plan document.
2. Astro + Tailwind + TypeScript scaffold (`package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`), `@astrojs/sitemap`, `@fontsource/space-grotesk`.
3. Design tokens + base components (neo.skill verbatim).
4. Global elements: `BaseLayout` (SEO + Organization/LegalService JSON-LD), `Header`/nav dropdown, `Footer`, `Breadcrumbs`.
5. Data layer: `business.ts`, `fees.ts` (all flagged verify-before-launch), `nav.ts`, per-service and per-subpage data files sourced from the `/pages` content files.
6. 4 core service pages (`ServiceLayout`, full 13-section template).
7. 12 service sub-pages (`SubServiceLayout`, trimmed template; renewal/objection-response gaps flagged with owner-supply slots per §10).
8. 8 supporting pages: Home, Services hub, About, How It Works, Pricing, Contact, FAQ, Resources index.
9. Utility/system pages: 4 legal pages, enquiry thank-you, 404, search.
10. 5 Resources articles (content collection) with Article schema, each linking to its service page.
11. SEO/GEO infra pass: sitemap.xml integration, `robots.txt` (AI crawlers allowed — GEO goal, owner-adjustable), `llms.txt`, JSON-LD verification per page-type table in `05-SEO-AND-GEO.md`.
12. `uiux/scripts/audit.py` quality gate, fix to ≥90 / zero Critical.
13. Build + dev-server visual spot-check.
14. Final deliverable-checklist pass, this document's §10 Risk & Gap log finalized.

## 6. Content management plan
- **Centralized/editable values:** business identity (`src/data/business.ts`), all fees/timelines (`src/data/fees.ts`, each constant tagged `VERIFY_BEFORE_LAUNCH`), navigation structure (`src/data/nav.ts`), and all per-service/sub-page content (`src/data/services/*.ts`, `src/data/subpages/*.ts`) — a single edit propagates everywhere the value is used, satisfying the brief's "maintainable, not baked into prose" requirement.
- **Privacy Policy owner-supply slot:** `src/data/services/privacy-policy.ts` mirrors the structure of the other three service data files but with fields populated by clearly marked `OWNER_TO_SUPPLY` string constants; the page renders visible "content pending" styling in place of empty sections rather than silently omitting them, so it's obvious what's missing pre-launch.
- **Business visual-presentation content** (About credentials, homepage trust strip): no real figures exist in the brief. These render as labeled, honest placeholder copy (e.g., "add years of experience / credentials here") rather than invented numbers or testimonials — tracked as a launch-blocking content gap in §10, not fabricated.

## 7. Design & visual plan (from neo.skill)
- Typography: self-hosted Space Grotesk (400/500/700/800/900), uppercase display headings, exact clamp() scale from the skill.
- Structure/components: hard 3px black borders, flat offset shadows (no blur/rgba), ≤4px radius, button press-effect, card lift-on-hover, bento grid for the four-services showcase, section-tag labels opening every section, arrow convention (↗ external / → internal / ↓ expand / ← back, never chevrons), yellow full-bleed CTA band before footer, dark footer per spec.
- Consistency: one Tailwind token set + a fixed component library (`Button`, `Card`, `SectionTag`, `Input`, `KeyFactsStrip`, `ProcessSteps`) reused across all 31+ pages — no page invents its own visual pattern.
- Skipped by design (not fabricated): announcement bar (no real marketing message exists to put in it) and testimonial cards (no real testimonials exist) — both are optional neo.skill patterns, not core requirements, and using them would mean inventing marketing/trust copy.
- Everything above traces to `neo.skill`; `uiux.skill` contributes no visual decisions, only the accessibility/interaction layer in §8.

## 8. UX plan (from uiux.skill + brief)
- **Journey A (fast lane):** prominent header CTA + hero primary action reach any service's enquiry form in ≤3 clicks.
- **Journey B (guided):** Services hub carries the full decision-guide table from `02-NAVIGATION.md` verbatim.
- **Journey C (support/urgent):** sub-pages (objection, hearing, opposition) surface their statutory deadline in the first screen, ahead of the process detail, per `03-USER-EXPERIENCE.md`'s urgency-handling rule.
- **Journey D (research):** Resources articles internally link into the relevant service page (GEO/SEO conversion bridge).
- **Journey E (human contact):** Contact page + a persistent header/footer contact channel.
- Enquiry flow: 5-field form (Name, Email, Phone, Service, Message), service pre-tagged from referring page, inline field-level validation, redirect to `/enquiry/thank-you` on success (see §10 for the form-backend gap).
- Post-enquiry experience matches `03-USER-EXPERIENCE.md` §"Post-enquiry" exactly: confirmation, restated service, next-step/response-window copy, Resources/FAQ secondary path, direct urgent-contact channel.
- Accessibility/interaction (uiux.skill categories 1–2, 9): visible focus rings, ≥44×44px touch targets, keyboard-operable nav and dropdown with a plain-link fallback on `/services`, no color-only state signals.

## 9. SEO/AEO/GEO plan (from seo-doctor.skill)
- Metadata: unique title (primary keyword + "India" where relevant), ~150–160 char meta description, one H1, self-referencing canonical, OG/Twitter tags — per page, via `SEO.astro`.
- URLs: exact slugs from `01-SITEMAP.md`, lowercase/hyphenated, hierarchical for sub-pages.
- Structured data: Organization/LegalService sitewide; BreadcrumbList on every non-top-level page; FAQPage on every page with an FAQ block (kept for AI-citation value per the skill's 2026 quality-gate note, not for Google rich results); Service schema on the 4 main service pages; Article schema on the 5 Resources posts.
- GEO assets: `llms.txt` at root summarizing the site + linking key pages; question-based FAQ/article sub-headings; consistent `bhartiyaipsolutions` entity naming; freshness ("last updated") dates on service and article pages; `robots.txt` allowing major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) — flagged as an owner-adjustable default.
- One primary keyword per page, no cannibalization, per the intent map in `05-SEO-AND-GEO.md`.

## 10. Risk & gap log

**Flagged, not fabricated:**
1. Trademark renewal sub-page: no fee/form/step detail in the source docs beyond "10 years, renewable indefinitely." Ships with sourced facts + an owner-supply slot for renewal process detail.
2. Copyright objection-response sub-page: source doc gives only the 30-day pre-examination objection window, not a distinct post-filing "objection response" procedure. Ships with what's sourced + an owner-supply slot.
3. About/homepage credentials, experience, and any trust numbers: zero real figures anywhere in the brief. No stats or testimonials invented — rendered as explicit content-pending slots.
4. ~~Enquiry form backend~~ — **Resolved 2026-07-22.** Wired to Netlify Forms (zero-config for a Netlify static deploy — see `netlify.toml` and `src/components/EnquiryForm.astro`): the form carries the `data-netlify`/`form-name` markup Netlify's build bot needs plus a honeypot field, submits via `fetch()` on top of the existing inline validation, and only redirects to the thank-you page on a confirmed successful submission (shows an inline error otherwise). Remaining pre-launch step: enable a notification (email/Slack/webhook) under the Netlify site's Site settings → Forms → Notifications so submissions actually reach someone — Forms itself is on by default.
5. AI-crawler allow-list in `robots.txt`: brief explicitly leaves this to the owner. Defaulted to "allow" for GEO visibility; flagged as adjustable.
6. `00-BUILD-PROMPT.md` was missing from the delivered files; recovered via the business owner during this session and should be committed to the repo.

**Verify-before-launch (all fees/timelines/forms), per `06-GLOBAL-CONTENT.md`:**
- Trademark: ₹4,500/₹9,000 per class government fee, TM-A/TM-M/TM-O/RG-2 form numbers, all prosecution timelines.
- Copyright: ₹500–₹5,000 per-work fee range, Form XIV, all timelines.
- Patent: all form numbers (1/2/3/5/26), all timelines, government renewal fee schedule.
- All three against live IP India / Copyright Office / Patent Office sources before publishing.

**Never-promise constraint:** no page states or implies a guaranteed registration outcome; the site-wide footer disclaimer (`06-GLOBAL-CONTENT.md`) plus explicit "government-dependent" language on every timeline claim enforces this.

**Additional gap found during build — legal utility pages:** `/legal/privacy-policy`, `/legal/terms`, and `/legal/refund-policy` have no substantive source text anywhere in the brief (unlike Disclaimer, which `06-GLOBAL-CONTENT.md` fully specifies). Built as structural, footer-linked pages with explicit `[OWNER TO SUPPLY]` slots — recommend legal review before publishing real text — and set `noindex` so search engines don't index placeholder legal content in the meantime.

**Build-time issues found and fixed (recorded for transparency, not left silent):**
1. `@astrojs/sitemap` 3.7.3 requires an Astro 5 integration hook (`astro:routes:resolved`) that doesn't exist in Astro 4 — crashed the build. Fixed by upgrading the stack to Astro 5.1 (`package.json`, `astro.config.mjs` unchanged otherwise).
2. Fontsource's CSS `@import` of a bare package specifier (`@import '@fontsource/space-grotesk/800.css'` in `global.css`) didn't resolve reliably. Fixed by switching to JS imports in `BaseLayout.astro`'s frontmatter (Vite/Rollup resolves node_modules packages correctly there).
3. Space Grotesk via Fontsource only ships static weights 300–700, not 800/900. neo.skill's display-heading weights (800/900) render via the browser's synthetic-bold fallback from 700 — standard practice, not a defect.
4. `uiux/scripts/audit.py` flagged 6 High "placeholder-only label" findings, all in components using the shared `Input.astro` component. Verified false positives by code inspection: every field renders a real, properly `for`/`id`-associated `<label>`; the heuristic scanner can't see through the component abstraction (it only detects raw `<label>` tags in the same file as the `<input>`, and call sites pass `label` as a prop). No code changed in response — documented per the audit playbook's "verify and drop confirmed false positives" instruction rather than gamed.
5. Verified end-to-end via a headless-browser smoke test (Playwright, used only as a one-off verification tool and removed afterward — not left as a project dependency): homepage, `/services/trademark`, and the `/contact` enquiry form (empty-submit validation → filled submit → redirect to `/enquiry/thank-you`) all render with zero console/page errors, at both a 1440px and 375px viewport, including the mobile hamburger menu.

**Netlify production setup added (2026-07-22):** `netlify.toml` (build command, `dist` publish dir, Node 20, security headers, immutable caching for hashed `_astro/*` assets, no-cache for `sitemap*.xml`/`robots.txt`/`llms.txt` so crawlers see updates immediately), `.env.example` (both variables optional — `PUBLIC_SITE_URL` overrides the canonical/OG base URL, `PUBLIC_GOOGLE_SITE_VERIFICATION` renders a GSC ownership meta tag only when set), and `Button.astro` now forwards arbitrary attributes (`id`, `data-*`) so the enquiry form's submit button could be targeted by its script.

## 11. Definition of done
Development is complete when: all 31 sitemap pages + 5 resource articles exist and are correctly linked per `02-NAVIGATION.md`; the shared templates are used with no content drift; all fee/timeline values are centralized and flagged; SEO/GEO infrastructure (metadata, JSON-LD, sitemap, `llms.txt`, `robots.txt`) is present per `05-SEO-AND-GEO.md`; the neo.skill visual system is applied with zero ad hoc styling; the uiux.skill audit gate scores ≥90 with zero Critical findings; the site builds cleanly and passes a manual dev-server spot-check; and every item in the recovered `00-BUILD-PROMPT.md` deliverable checklist is checked off, with this §10 Risk & Gap log as the record of everything flagged rather than invented.

**Status: met.** `npm run build` produces 36 pages (31 sitemap + 5 resource articles) with zero errors; `uiux/scripts/audit.py` returned 0 Critical / 0 real High findings (the 6 raw High hits were verified false positives, see above); a Playwright smoke test across desktop and mobile viewports showed 0 console errors and confirmed the enquiry form's full validate → submit → thank-you flow works. Remaining items are the explicitly flagged owner-supply content gaps in this §10, which are launch-blocking for those specific sections only (Privacy Policy service copy, 3 legal pages, About/homepage credentials, trademark renewal and copyright objection-response process detail) — everything else is complete and traced to a source document or skill.

---
Plan reviewed and approved by the business owner (session of 2026-07-22) via the Claude Code plan-mode approval flow. Development proceeds per §5.
