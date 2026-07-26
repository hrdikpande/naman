---
name: seo-doctor
description: "SEO Doctor: comprehensive SEO analysis and optimization for any website or business type. Use this skill whenever the user mentions SEO, an SEO audit, website ranking, Google rankings, search visibility, schema/structured data, Core Web Vitals, page speed, sitemaps, E-E-A-T, content quality for search, keyword clustering, content briefs, backlinks, local SEO, Google Business Profile, hreflang/international SEO, e-commerce SEO, programmatic SEO, or AI search / GEO (AI Overviews, ChatGPT, Perplexity citability) — even if they don't say the word 'SEO' explicitly. Covers full site audits, single-page analysis, technical SEO, schema markup, image SEO, strategic SEO planning, drift monitoring, and SXO."
license: MIT
metadata:
  author: AgriciDaniel (packaged as "seo-doctor" from github.com/hrdikpande/claude-seo)
  version: "2.2.0"
  category: seo
---

# SEO Doctor: Universal SEO Analysis Skill

Comprehensive SEO analysis across all industries (SaaS, local services,
e-commerce, publishers, agencies). This skill orchestrates 24 sub-skills located
in `subskills/`. Python helper scripts live in `scripts/` at this skill's root.

**Environment note:** In claude.ai there are no parallel subagents. Where the
original plugin says "spawn subagents in parallel", instead load the relevant
sub-skill files (`subskills/<name>/GUIDE.md`) and run their analyses
sequentially yourself, then synthesize a single unified report. Use `web_fetch`
/ `web_search` or `scripts/fetch_page.py` (network permitting) to retrieve
pages. If a script needs network access to a blocked domain or an API key that
isn't configured, note the limitation, skip that check, and continue with the
rest of the analysis.

## Quick Reference

Users may phrase requests naturally ("audit my site", "check my schema") or use
command-style shorthand. Map either to the right sub-skill:

| Command | What it does | Sub-skill |
|---------|-------------|-----------|
| `audit <url>` | Full website audit | subskills/seo-audit |
| `page <url>` | Deep single-page analysis | subskills/seo-page |
| `sitemap <url or generate>` | Analyze or generate XML sitemaps | subskills/seo-sitemap |
| `schema <url>` | Detect, validate, generate Schema.org markup | subskills/seo-schema |
| `images <url or optimize>` | Image SEO: audit, SERP analysis, optimization | subskills/seo-images |
| `technical <url>` | Technical SEO audit (9 categories) | subskills/seo-technical |
| `content <url>` | E-E-A-T and content quality analysis | subskills/seo-content |
| `content-brief <topic or url>` | SEO content brief with keywords, outline, internal links | subskills/seo-content-brief |
| `geo <url>` | AI Overviews / Generative Engine Optimization | subskills/seo-geo |
| `plan <business-type>` | Strategic SEO planning | subskills/seo-plan |
| `programmatic [url or plan]` | Programmatic SEO analysis and planning | subskills/seo-programmatic |
| `competitor-pages [url or generate]` | Competitor comparison page generation | subskills/seo-competitor-pages |
| `local <url>` | Local SEO (GBP, citations, reviews, map pack) | subskills/seo-local |
| `maps [command] [args]` | Maps intelligence (geo-grid, GBP audit, reviews) | subskills/seo-maps |
| `hreflang [url]` | Hreflang/i18n SEO audit and generation | subskills/seo-hreflang |
| `google [command] [url]` | Google SEO APIs (GSC, PageSpeed, CrUX, Indexing, GA4) | subskills/seo-google |
| `backlinks <url>` | Backlink profile analysis | subskills/seo-backlinks |
| `cluster <seed-keyword>` | SERP-based semantic clustering | subskills/seo-cluster |
| `sxo <url>` | Search Experience Optimization | subskills/seo-sxo |
| `drift baseline/compare/history <url>` | SEO drift monitoring | subskills/seo-drift |
| `ecommerce <url>` | E-commerce SEO: product schema, marketplace intel | subskills/seo-ecommerce |
| `dataforseo [command]` | Live SEO data via DataForSEO (needs MCP/API) | subskills/seo-dataforseo |
| `image-gen [use-case] <description>` | AI image generation for SEO assets (needs Gemini) | subskills/seo-image-gen |
| `flow [stage] [url or topic]` | FLOW framework: Find, Leverage, Optimize, Win, Local | subskills/seo-flow |

## Orchestration Logic

When the user asks for a full audit:
1. Detect business type (SaaS, local, ecommerce, publisher, agency, other)
2. Run the core analyses in sequence: seo-technical, seo-content, seo-schema, seo-sitemap, performance (CWV), visual/above-fold checks, seo-geo
3. If Google API credentials detected (`python3 scripts/google_auth.py --check`), also run seo-google
4. If local business detected, also run seo-local (and seo-maps if DataForSEO is available)
5. If backlink APIs detected (`python3 scripts/backlinks_auth.py --check`), also run seo-backlinks
6. If content strategy signals detected (blog, pillar pages, topic clusters), also run seo-cluster
7. If e-commerce detected, also run seo-ecommerce
8. If drift baseline exists for this URL (`python3 scripts/drift_history.py <url>`), also run seo-drift
9. Always include seo-sxo in full audits
10. Collect results and generate a unified report with SEO Health Score (0-100)
11. **Synthesize via the 10-principle framework** (see "Synthesis Methodology") — walk PERCEIVE → ANALYZE → VALIDATE → ACT before bucketing findings into Critical / High / Medium / Low
12. Create a prioritized action plan with dependency sequencing + falsifiability per recommendation

For individual commands, load the relevant sub-skill's GUIDE.md directly and
follow it.

## Synthesis Methodology

Audits are not just findings — they are findings synthesized into a coherent
strategy, using a 10-principle thinking framework grouped into four phases:
**PERCEIVE** (observe-external · observe-internal · listen),
**ANALYZE** (think · connect-lateral · connect-system), **VALIDATE** (feel ·
accept), **ACT** (create · grow).

Full audits walk every phase before emitting the action plan. Narrower commands
pass at least THINK + ACCEPT before emitting (sound first principle, surfaced
falsifiability). The Critical / High / Medium / Low priority buckets are the
**output** of validation, not a substitute for it.

Full methodology + per-principle SEO mapping: `references/thinking-framework.md`.

Each emitted recommendation should carry:
- The first-principle observation it rests on (THINK)
- The dependency on / unblock relationship to other recommendations (CONNECT-system)
- An explicit "how would we know this failed?" check (ACCEPT)
- A leading indicator the user can monitor without re-running the audit (GROW)

## Industry Detection

Detect business type from homepage signals:
- **SaaS**: pricing page, /features, /integrations, /docs, "free trial", "sign up"
- **Local Service**: phone number, address, service area, "serving [city]", Google Maps embed → auto-suggest local analysis
- **E-commerce**: /products, /collections, /cart, "add to cart", product schema
- **Publisher**: /blog, /articles, /topics, article schema, author pages, publication dates
- **Agency**: /case-studies, /portfolio, /industries, "our work", client logos

## Quality Gates

Read `references/quality-gates.md` for thin content thresholds per page type.
Hard rules:
- WARNING at 30+ location pages (enforce 60%+ unique content)
- HARD STOP at 50+ location pages (require user justification)
- Never recommend HowTo schema (deprecated Sept 2023)
- FAQ schema: Google retired FAQ rich results for ALL sites on May 7, 2026 (no SERP feature anymore). Flag existing FAQPage at Info (not Critical) for its AI/LLM citation benefit; do not recommend removal; do not recommend new FAQPage for Google SERP benefit; use QAPage for genuine user Q&A
- All Core Web Vitals references use INP, never FID

## Reference Files

Load these on-demand as needed (do NOT load all at startup):
- `references/thinking-framework.md`: Synthesis methodology
- `references/cwv-thresholds.md`: Current Core Web Vitals thresholds and measurement details
- `references/schema-types.md`: All supported schema types with deprecation status
- `references/eeat-framework.md`: E-E-A-T evaluation criteria (Sept 2025 QRG update)
- `references/quality-gates.md`: Content length minimums, uniqueness thresholds
- `references/local-seo-signals.md`: Local ranking factors, review benchmarks, citation tiers, GBP status
- `references/local-schema-types.md`: LocalBusiness subtypes, industry-specific schema and citation sources
- Maps-specific: `references/maps-geo-grid.md`, `references/maps-gbp-checklist.md`, `references/maps-api-endpoints.md`, `references/maps-free-apis.md`

Shared data files:
- `data/google-updates.json`: Google algorithm update history
- `schema/templates.json`: Schema.org JSON-LD templates

## Scoring Methodology

### SEO Health Score (0-100)
Weighted aggregate of all categories:

| Category | Weight |
|----------|--------|
| Technical SEO | 22% |
| Content Quality | 23% |
| On-Page SEO | 20% |
| Schema / Structured Data | 10% |
| Performance (CWV) | 10% |
| AI Search Readiness | 10% |
| Images | 5% |

### Priority Levels
- **Critical**: Blocks indexing or causes penalties (immediate fix required)
- **High**: Significantly impacts rankings (fix within 1 week)
- **Medium**: Optimization opportunity (fix within 1 month)
- **Low**: Nice to have (backlog)

## Sub-Skills

Each sub-skill lives at `subskills/<name>/GUIDE.md` with its own references.
Load only what the current task needs:

1. **seo-audit** — Full website audit
2. **seo-page** — Deep single-page analysis
3. **seo-technical** — Technical SEO (9 categories)
4. **seo-content** — E-E-A-T and content quality
5. **seo-content-brief** — Detailed SEO content brief generation
6. **seo-schema** — Schema markup detection and generation
7. **seo-images** — Image optimization, SERP analysis, file optimization
8. **seo-sitemap** — Sitemap analysis and generation
9. **seo-geo** — AI Overviews / GEO optimization
10. **seo-plan** — Strategic planning with templates
11. **seo-programmatic** — Programmatic SEO analysis and planning
12. **seo-competitor-pages** — Competitor comparison page generation
13. **seo-hreflang** — Hreflang/i18n SEO audit, cultural profiles, content parity
14. **seo-local** — Local SEO (GBP, NAP, citations, reviews, local schema)
15. **seo-maps** — Maps intelligence (geo-grid, GBP audit, reviews, competitor radius)
16. **seo-google** — Google SEO APIs (GSC, PageSpeed, CrUX, Indexing API, GA4)
17. **seo-backlinks** — Backlink profile analysis (free: Moz, Bing, CC; premium: DataForSEO)
18. **seo-cluster** — SERP-based semantic clustering
19. **seo-sxo** — Search Experience Optimization
20. **seo-drift** — SEO drift monitoring
21. **seo-ecommerce** — E-commerce SEO intelligence
22. **seo-dataforseo** — Live SEO data via DataForSEO MCP (requires connector/API)
23. **seo-image-gen** — AI image generation for SEO assets via Gemini (requires API)
24. **seo-flow** — FLOW framework integration (Find → Leverage → Optimize → Win)

## Error Handling

| Scenario | Action |
|----------|--------|
| Unrecognized command | List available commands from the Quick Reference table. Suggest the closest matching command. |
| URL unreachable | Report the error and suggest the user verify the URL. Do not attempt to guess site content. |
| Sub-skill fails during audit | Report partial results from successful sub-skills. Clearly note which failed and why. Suggest re-running the failed sub-skill individually. |
| Ambiguous business type detection | Present the top two detected types with supporting signals. Ask the user to confirm before proceeding with industry-specific recommendations. |
| Missing API key / blocked network | Skip that data source gracefully, state what was skipped, and complete the rest of the analysis. |

## Attribution

Packaged as "seo-doctor" from the open-source claude-seo project (MIT License)
by AgriciDaniel — https://github.com/AgriciDaniel/claude-seo
