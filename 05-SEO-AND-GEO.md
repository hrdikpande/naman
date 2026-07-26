# SEO & GEO (AI Discoverability) Requirements

Content and metadata requirements only. No design.

## URL structure
- Clean, human-readable, lowercase, hyphenated slugs exactly as in `01-SITEMAP.md`.
- Hierarchical for sub-pages: `/services/trademark/objection`.
- URLs are permanent once published — never change a slug without a 301 redirect.

## Per-page metadata (every page)
Each page owns:
- **Title tag** — unique, includes the primary keyword + "India" where relevant (e.g. "Trademark Registration in India — Process, Documents & Fees").
- **Meta description** — unique, ~150–160 chars, describes the page and invites the click.
- **H1** — one per page, matching the page's core intent.
- **Canonical URL** — self-referencing to avoid duplicate-content issues.
- **Open Graph / social metadata** — title, description, and a share image slot.

## Keyword intent map (one page = one primary intent)
| Page | Primary intent |
|---|---|
| `/services/trademark` | trademark registration India |
| `/services/trademark/objection` | trademark objection reply |
| `/services/trademark/opposition` | trademark opposition |
| `/services/trademark/hearing` | trademark show cause hearing |
| `/services/trademark/renewal` | trademark renewal |
| `/services/copyright` | copyright registration India |
| `/services/copyright/software` | copyright for software / source code |
| `/services/patent` | patent registration India |
| `/services/patent/provisional` | provisional patent application |
| `/services/privacy-policy` | privacy policy drafting service |

Do not target the same primary keyword on two pages (avoid cannibalisation).

## Structured data (schema markup)
Add JSON-LD structured data where applicable:
- **Organization / LegalService** schema site-wide (name, contact, area served = India).
- **BreadcrumbList** on every sub-top-level page.
- **FAQPage** on every page that has an FAQ block (all service pages).
- **Service** schema on each service page.
- **Article** schema on each Resources/blog post.

## GEO — being discoverable & citable by AI systems
Goal: when someone asks ChatGPT / Claude / Perplexity / Gemini about IPR registration in India, the site's content is structured to be understood and cited.

- **Clear, self-contained answers.** Each page should answer its core question in the opening lines so an AI can extract a clean, quotable summary.
- **Question-based headings.** Use real user questions as sub-headings ("How long does trademark registration take?"), which map to how people query AI.
- **Factual, structured content.** Definitions, numbered processes, and labelled facts (law, term, timeline) are easy for models to parse and attribute.
- **`llms.txt` file** at the site root summarising what the site offers and linking key pages, to guide AI crawlers.
- **`robots.txt`** configured to allow reputable AI crawlers where the business wants visibility (decision left to owner).
- **Consistent entity naming.** Refer to the business by the same name everywhere so AI systems associate the brand with these services reliably.
- **Freshness signals.** Show last-updated dates on content pages; keep fees/timelines current.

## On-page SEO content rules
- Primary keyword in title, H1, first paragraph, and URL.
- Descriptive internal anchor text (not "click here").
- Every service page links to its sub-pages and vice versa (topical clustering).
- FAQ blocks target long-tail question queries.
- Image alt text describes content (accessibility + SEO).

## Technical SEO hooks (content/structure side)
- XML sitemap generated from the page inventory.
- Breadcrumb structured data matches the visible breadcrumb trail.
- No orphan pages — everything is internally linked per `02-NAVIGATION.md`.
- 404 page routes users back into the funnel.
