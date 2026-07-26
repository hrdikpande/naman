# User Experience & Content Flow

This file governs how content is sequenced and how users move through it. It is about experience and information order — not visual design.

## Who the users are (audience segments)

1. **First-time founder / MSME owner** — has a brand or product, low legal literacy, price-sensitive, wants hand-holding. Largest segment.
2. **Creator** (writer, musician, designer, developer) — wants to protect original work, values speed and proof of ownership.
3. **Inventor / deep-tech startup** — patent intent, more sophisticated, needs credibility and technical accuracy.
4. **Business already mid-process** — hit an objection, hearing, or opposition, often against a deadline, high urgency, high intent.
5. **Researcher / comparison shopper** — reading before buying, arrives from search or an AI answer.

Every page should be written so at least one of these segments immediately feels "this is for me."

## Universal page content order

Unless a page spec says otherwise, sequence content top-to-bottom in this order of the buyer's questions:

1. **What is this / what it protects** (one clear sentence first).
2. **Do I need it / who it's for** (self-identification).
3. **What's included / what you get** (the deliverable).
4. **The process** (step by step, including dispute branches).
5. **What we need from you** (documents/inputs).
6. **Timeline** (honest, with government-dependency caveats).
7. **Cost drivers** (what affects price; link to Pricing).
8. **FAQ** (objection-handling in the sales sense).
9. **Primary action** (start enquiry) — repeated at top and bottom.

Rationale: this mirrors the actual decision sequence a buyer runs through. Front-load the "what/why," end on the "how to start."

## Progressive disclosure

- Lead pages (service pages) carry the essential 80%. Push the deep 20% (edge cases, sub-processes) into sub-pages and link to them.
- Don't force a researcher to read the whole prosecution chain to enquire — the primary action is always available near the top.
- Long processes (trademark prosecution, patent lifecycle) should be scannable as a numbered sequence so a user can jump to their current stage.

## Urgency & deadline handling (critical for support-intent users)

For any page tied to a statutory deadline (trademark objection = 30 days/1 month; opposition counter-statement = 2 months, no extension; provisional-to-complete patent = 12 months), the deadline must appear **early and unmissably in the content order**, plus a fast route to enquiry. These users convert on speed, not persuasion.

## Trust-building content (reduce buyer anxiety)

Weave these throughout (content requirement, placement flexible):
- Clear statement that outcomes depend partly on government authorities — never promise registration.
- What happens after payment (so the user isn't buying into a void).
- Turnaround expectations and communication cadence.
- Credentials / experience (on About, referenced site-wide).
- Transparent cost drivers rather than hidden fees.

## Enquiry / lead-capture experience

- Keep the primary form to the minimum: **Name, Email, Phone, Service of interest, Message.** Pre-select "Service of interest" when the form is opened from a specific service page.
- Provide inline validation with plain-language error messages ("Enter a valid 10-digit phone number," not "Error 422").
- On submit, route to `/enquiry/thank-you` with a confirmation that restates: what they asked about, that a human will respond, and the expected response window.
- Offer a secondary, lower-commitment action on educational pages: request a callback or ask a quick question.
- Never require account creation to make an enquiry.

## Post-enquiry experience (`/enquiry/thank-you`)

Content must include:
1. Confirmation the enquiry was received.
2. Restatement of the service they enquired about.
3. What happens next and the expected response time.
4. A secondary path: browse Resources or read the relevant service's FAQ while they wait.
5. Direct contact channel (email/phone) for urgent/deadline cases.

## Error & empty states

- **404:** friendly message + links to the four services and the search page. Never a dead end.
- **Form errors:** field-level, specific, non-technical.
- **Search with no results:** suggest the four service pages and popular resources.

## Mobile-first experience (behavioral, not visual)

- Assume most first-time founders arrive on mobile. Content order and primary action must work when only one thing is visible at a time.
- The primary action must be reachable without hunting through the whole page.
- Forms must be short enough to complete comfortably on a phone.

## Content readability rules

- Short paragraphs. One idea per paragraph.
- Define every legal term on first use, inline.
- Use numbered lists for processes, plain sentences for explanation.
- Prefer "you" and "we." Avoid legalese except where a statutory term is necessary — and then gloss it.
- Every claim about fees/timelines is a maintainable value, not baked into prose, so it can be updated centrally.
