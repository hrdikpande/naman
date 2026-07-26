import type { SubPageData } from '../types';
import { trademarkFees } from '../fees';

// Every field below is drawn directly from service-trademark.md's process/key-facts sections,
// reorganized into the trimmed sub-page template (04-SERVICE-PAGE-TEMPLATE.md). Renewal's
// process/fee detail is not in the source doc — flagged via ownerSupplyNote, not invented.

export const trademarkSubPages: SubPageData[] = [
  {
    slug: 'search',
    parentSlug: 'trademark',
    name: 'Trademark Search',
    urlPath: '/services/trademark/search',
    definition:
      'A trademark search checks the IP India database for identical or similar existing or pending marks ' +
      'before you file, so you avoid conflict with an existing owner and pick a mark and class that are clear to register.',
    primaryActionLabel: 'Start Your Trademark Search',
    whatsIncluded: ['Search of the IP India trademark database across relevant classes.', 'Class advice for your goods/services.', 'A plain-language risk read before you commit to filing.'],
    process: [
      { step: 1, title: 'Share your mark', description: 'Tell us the word, logo, or slogan and what goods/services it covers.' },
      { step: 2, title: 'Database search', description: 'We search the IP India database for identical/similar marks across the relevant class(es).' },
      { step: 3, title: 'Search report & advice', description: 'You get a plain-language read on conflict risk and the recommended class(es) before filing Form TM-A.' },
    ],
    faq: [
      { question: 'Is a trademark search mandatory before filing?', answer: 'No, but skipping it raises the risk of an objection or opposition later — a search is the cheapest way to avoid that.' },
      { question: 'Which classes will you search?', answer: `We search the class(es) matching your goods/services out of the ${trademarkFees.classCount} total trademark classes.` },
    ],
    metaTitle: 'Trademark Search India — Check Your Brand Before You File',
    metaDescription: 'Search the IP India trademark database for conflicting marks before filing. Class advice and a plain-language risk read.',
  },
  {
    slug: 'objection',
    parentSlug: 'trademark',
    name: 'Trademark Objection Reply',
    urlPath: '/services/trademark/objection',
    definition:
      "A trademark objection is raised by the Registry's own examiner about your application — under Section 9 " +
      '(absolute grounds) or Section 11 (relative grounds) of the Trade Marks Act — after examination. It is ' +
      'distinct from an "opposition," which is a third-party challenge after advertisement.',
    deadline: `Reply within ${trademarkFees.objectionReplyDeadline} of receiving the Examination Report. No reply risks the application being treated as abandoned.`,
    primaryActionLabel: 'Get Help With Your Objection Reply',
    whatsIncluded: ['Drafting and filing the written reply to the Examination Report.', 'Representation at a show cause hearing if the reply alone does not satisfy the examiner.', 'Status tracking through to acceptance and advertisement.'],
    process: [
      { step: 1, title: 'Examination Report received', description: 'The Registry issues objections under Section 9 and/or Section 11.', deadline: trademarkFees.objectionReplyDeadline },
      { step: 2, title: 'Written reply filed', description: 'We draft and file a reply addressing each ground raised, with supporting evidence where available.' },
      { step: 3, title: 'Show cause hearing (if needed)', description: 'If the reply does not fully satisfy the examiner, a hearing is scheduled — see our dedicated hearing page.' },
      { step: 4, title: 'Acceptance & advertisement', description: 'A satisfied examiner accepts the mark for publication in the Trade Marks Journal.' },
    ],
    faq: [
      { question: 'What happens if I miss the reply deadline?', answer: `You must reply within ${trademarkFees.objectionReplyDeadline} (extendable up to two further months). Missing it risks the application being treated as abandoned.` },
      { question: 'Objection vs opposition — what is the difference?', answer: "An objection comes from the Registry's examiner about the application itself; an opposition is a third party challenging your mark after it is advertised. See our opposition page for that process." },
    ],
    metaTitle: 'Trademark Objection Reply India — Deadline & Process',
    metaDescription: `Received a trademark examination report? Reply within ${trademarkFees.objectionReplyDeadline}. How the objection reply process works, step by step.`,
  },
  {
    slug: 'hearing',
    parentSlug: 'trademark',
    name: 'Trademark Show Cause Hearing',
    urlPath: '/services/trademark/hearing',
    definition:
      "A show cause hearing is scheduled when your objection reply doesn't fully satisfy the examiner. You " +
      'demonstrate the mark\'s distinctiveness — often via evidence of actual use — usually by video conference.',
    deadline: `Adjournment requests (Form ${trademarkFees.forms.adjournment}, fee ${trademarkFees.adjournmentFee}) must be filed at least 2 days before the hearing date; typically a maximum of two adjournments are allowed.`,
    primaryActionLabel: 'Get Help With Your Hearing',
    whatsIncluded: ['Hearing preparation and representation.', 'Compiling evidence of actual use (invoices, advertising, packaging).', 'Adjournment filing if a genuine scheduling conflict arises.'],
    process: [
      { step: 1, title: 'Hearing scheduled', description: 'Usually conducted by video conference after an unsatisfactory objection reply.' },
      { step: 2, title: 'Evidence compiled', description: 'Invoices, advertising, packaging, and other proof of actual use are prepared and presented.' },
      { step: 3, title: 'Outcome', description: 'The examiner accepts the mark for advertisement, or refuses it. Non-attendance can itself result in refusal or abandonment.' },
    ],
    faq: [
      { question: 'What if I cannot attend on the scheduled date?', answer: `You can request an adjournment via Form ${trademarkFees.forms.adjournment} (fee ${trademarkFees.adjournmentFee}), filed at least 2 days before the hearing — typically up to two adjournments are allowed.` },
      { question: 'What evidence should I bring?', answer: 'Anything proving the mark is actually in use and distinctive — invoices, advertising material, product packaging, and similar.' },
    ],
    metaTitle: 'Trademark Show Cause Hearing India — What to Expect',
    metaDescription: 'Scheduled for a trademark show cause hearing? How it works, what evidence to bring, and adjournment rules.',
  },
  {
    slug: 'opposition',
    parentSlug: 'trademark',
    name: 'Trademark Opposition',
    urlPath: '/services/trademark/opposition',
    definition:
      'A trademark opposition is a challenge filed by a third party after your mark is advertised in the Trade ' +
      `Marks Journal, via Form ${trademarkFees.forms.opposition}. It is the longest branch of the prosecution chain, often 2–3 years.`,
    deadline: `Anyone may oppose within ${trademarkFees.oppositionWindow}. If opposed, you must file a counter-statement within ${trademarkFees.counterStatementDeadline} — this deadline cannot be extended, and missing it means the application is deemed abandoned.`,
    primaryActionLabel: 'Get Help Defending Your Opposition',
    whatsIncluded: ['Counter-statement drafting and filing.', 'Support through the evidence stages.', 'Representation at the opposition hearing.'],
    process: [
      { step: 1, title: 'Notice of opposition filed', description: `A third party files ${trademarkFees.forms.opposition} within the opposition window.`, deadline: trademarkFees.oppositionWindow },
      { step: 2, title: 'Counter-statement', description: 'You must respond addressing each ground raised.', deadline: trademarkFees.counterStatementDeadline + ' — no extension' },
      { step: 3, title: 'Evidence stages', description: 'Both sides file evidence in support of their position.' },
      { step: 4, title: 'Hearing & decision', description: 'The Registrar hears both sides and decides whether the mark proceeds to registration.' },
    ],
    faq: [
      { question: 'What if I miss the counter-statement deadline?', answer: `The deadline is ${trademarkFees.counterStatementDeadline} with no extension available — missing it means the application is deemed abandoned.` },
      { question: 'How long does an opposition take?', answer: 'Opposition is the longest branch of the prosecution chain, often 2–3 years, since it involves multiple evidence stages and a hearing.' },
    ],
    metaTitle: 'Trademark Opposition India — Counter-Statement Deadline & Process',
    metaDescription: `Facing a trademark opposition? Counter-statement due within ${trademarkFees.counterStatementDeadline}, no extension. Process explained.`,
  },
  {
    slug: 'renewal',
    parentSlug: 'trademark',
    name: 'Trademark Renewal',
    urlPath: '/services/trademark/renewal',
    definition: `A registered trademark is valid for ${trademarkFees.validity}.`,
    primaryActionLabel: 'Start Your Renewal Enquiry',
    deadline: 'Any time from one year before expiry. Late renewal within 6 months after expiry requires a surcharge.',
    whatsIncluded: ['Confirmation of expiry date and status on IP India.', 'Preparation and filing of Form TM-R.', 'Payment of government renewal fees.', 'Tracking and delivery of updated renewal certificate.'],
    process: [
      { step: 1, title: 'Confirm Status', description: 'We confirm your registration\'s expiry date and current status on the IP India portal.' },
      { step: 2, title: 'Prepare Form TM-R', description: 'We prepare Form TM-R with your registration certificate and a fresh Power of Attorney if applicable.' },
      { step: 3, title: 'File & Pay', description: 'We file the form online and pay the applicable government fee on your behalf.' },
      { step: 4, title: 'Certificate', description: 'We track the renewal confirmation and send you the updated renewal certificate.' }
    ],
    faq: [
      { question: 'How long is a trademark valid, and how does renewal work?', answer: `A trademark is valid for 10 years from registration and can be renewed indefinitely in further 10-year terms. Contact us before your term expires to start the renewal process.` },
      { question: 'What is the government fee for renewal?', answer: 'Government renewal fee: ₹9,000 per class (e-filing, on time). Late renewal within the 6-month grace period attracts a surcharge. Government fees are set by IP India and subject to change — we confirm the exact current fee at the time of filing.' }
    ],
    metaTitle: 'Trademark Renewal India — 10-Year Term',
    metaDescription: 'Renew your registered trademark before its 10-year term expires. Indefinite renewal in further 10-year terms.',
  },
];
