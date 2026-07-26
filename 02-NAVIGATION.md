# Navigation & Information Architecture

This defines how pages connect and how a user always knows where they are. No styling — only structure and behavior.

## Global header navigation

Present on every page. Contains these items in this order:

1. **Home** → `/`
2. **Services** → `/services` (with a dropdown/expandable listing the four categories)
   - Trademark → `/services/trademark`
   - Copyright → `/services/copyright`
   - Patent → `/services/patent`
   - Privacy Policy → `/services/privacy-policy`
3. **How It Works** → `/how-it-works`
4. **Pricing** → `/pricing`
5. **Resources** → `/resources`
6. **About** → `/about`
7. **Contact / Enquiry** → `/contact` (this is the primary action in the header and should be the most prominent nav item)

Requirement: the Services dropdown must list all four categories. Sub-pages (e.g. trademark objection) are *not* in the global dropdown — they are reached from within each service page to avoid overwhelming the menu.

## Footer navigation

Present on every page. Grouped into four columns of links (grouping is structural, not visual):

- **Services:** Trademark, Copyright, Patent, Privacy Policy
- **Company:** About, How It Works, Pricing, Contact
- **Resources:** Blog/Resources, FAQ, Search
- **Legal:** Site Privacy Policy, Terms, Refund Policy, Disclaimer

Footer also contains: business name, contact email + phone, and the site-wide legal disclaimer line.

## Breadcrumbs

Every page below the top level must show a breadcrumb trail so the user's location is always clear. Examples:

- `Home > Services > Trademark`
- `Home > Services > Trademark > Objection Reply`
- `Home > Resources > [Article Title]`

Breadcrumbs are also marked up as structured data (see SEO file).

## Cross-linking rules (internal linking)

Internal links serve both UX and SEO. Enforce these:

1. **Home → each of the four services.** The homepage must link directly to all four service pages.
2. **Service hub (`/services`) → all four service pages.**
3. **Each service page → its own sub-pages.** e.g. the Trademark page links to Search, Objection, Hearing, Opposition, Renewal.
4. **Each sub-page → back up to its parent service.** e.g. Objection Reply links back to the main Trademark page.
5. **Related-service links.** Each service page links to at least one adjacent service where relevant (e.g. Copyright ↔ Trademark for logos; Patent ↔ Copyright for software).
6. **Every educational/blog article → the relevant service page** it supports (this is the GEO/SEO conversion bridge).
7. **Every page → the enquiry/contact entry point.**

## Primary user journeys (happy paths)

Design navigation so these journeys are frictionless. Each should be completable in the stated number of steps.

### Journey A — "I know what I need" (fast lane)
`Home` → `Services dropdown → Trademark` → read → **Start Enquiry** → `Thank You`
*Target: 3 clicks to enquiry.*

### Journey B — "I'm not sure what protects my thing" (guided)
`Home` → `Services hub` → compare the four → pick one → service page → **Start Enquiry**
*Support this with a short "Which service do I need?" chooser on the Services hub (content logic, not a fancy widget): a plain decision guide mapping asset type → service.*

### Journey C — "I hit a problem after filing" (support intent)
`Home` or search → `Trademark → Objection Reply` (or Hearing / Opposition) → read → **Start Enquiry**
*These users are high-intent and often mid-deadline. Every sub-page must state the statutory deadline prominently and route to enquiry fast.*

### Journey D — "I'm researching / comparing" (top of funnel)
`Search engine / AI answer` → `Resources article` → internal link → relevant `service page` → **Start Enquiry**

### Journey E — "I want to talk to a human first"
Any page → `Contact` → submit enquiry or use the callback/secondary action → `Thank You`

## "Which service do I need?" decision guide (content for Services hub)

Present as a simple mapping (plain content, no interactive UI required):

| I want to protect... | Service |
|---|---|
| A brand name, logo, or slogan | **Trademark** |
| Original creative work (writing, music, art, software code) | **Copyright** |
| A new invention, product, or process | **Patent** |
| My website/app's data-handling compliance document | **Privacy Policy** |

If the asset is a logo that is also creative artwork, note that it may qualify for **both** trademark and copyright, and link both.

## Menu behavior requirements (non-visual)

- The current section must be indicated in the nav (state, not styling — the implementer decides how).
- All navigation must be operable by keyboard and screen reader.
- The Services dropdown content must also be reachable as plain links on the `/services` hub page, so nothing depends solely on a hover/dropdown.
