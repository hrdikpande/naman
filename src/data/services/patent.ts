import type { ServiceData } from '../types';
import { patentFees } from '../fees';

export const patent: ServiceData = {
  slug: 'patent',
  name: 'Patent Registration',
  urlPath: '/services/patent',
  definition:
    'A patent grants you exclusive rights over an invention — a new product, process, or service — so others ' +
    'cannot make, use, sell, or import it without your permission.',
  primaryActionLabel: 'Start Your Patent Enquiry',
  whoNeedsIt: [
    "You've created a genuinely new invention, product, or process.",
    'You are a deep-tech or R&D-driven startup protecting core technology.',
    'You want to secure a priority date while you keep developing.',
    'You are planning to license or commercialise an invention.',
  ],
  whatsIncluded: [
    'Patentability/prior-art search.',
    'Drafting of the specification (provisional or complete).',
    'Filing and prosecution support through examination to grant (scope depends on package).',
    'Guidance on Indian, convention, and PCT routes.',
  ],
  keyFacts: [
    { label: 'Governing law', value: 'Indian Patent Act, 1970 — Controller General of Patents' },
    { label: 'Patentability', value: 'Must be novel, involve an inventive step, and have industrial applicability' },
    { label: 'Term', value: `${patentFees.term}, then the invention enters the public domain` },
    { label: 'Typical timeline', value: `${patentFees.timeline} (government-dependent)` },
  ],
  typesIntro:
    'Provisional — temporary protection while the invention is still developing; secures a priority date. ' +
    'Complete/Ordinary — full protection within India; filed directly or after a provisional. PCT National Phase ' +
    '— entry into India from an international PCT application. PCT International — the international application ' +
    'stage. Convention — filed in India claiming priority from an earlier foreign filing (Paris Convention). ' +
    'Divisional / Patent of Addition — for multiple inventions in one application, or improvements to an existing ' +
    'patent. Provisional vs complete: if the specification has no claims it is provisional; with claims it is ' +
    `complete. A provisional secures the priority date, and you then have ${patentFees.provisionalToCompleteDeadline} ` +
    'to file the complete specification. Provisional cannot be used for divisional, convention, or PCT ' +
    'national-phase applications — those require a complete specification.',
  process: [
    { step: 1, title: 'Patent search', description: 'Search public databases to confirm novelty and non-obviousness and to see what is already registered.' },
    { step: 2, title: 'Draft the specification', description: 'A technical and legal document, drafted by the inventor or a patent attorney.' },
    { step: 3, title: 'File', description: `${patentFees.forms.application} with the specification in ${patentFees.forms.specification} (provisional or complete).` },
    { step: 4, title: 'Publication', description: 'Application published in the Patent Journal.', deadline: patentFees.publicationTiming },
    { step: 5, title: 'Request for Examination', description: 'Filed within the statutory period; examination reports and objections must be answered.' },
    { step: 6, title: 'Grant & publication', description: 'If satisfied, the Controller grants the patent, subject to annual renewal fees.' },
  ],
  documents: [
    `${patentFees.forms.application} (application).`,
    `${patentFees.forms.specification} (complete or provisional specification).`,
    `${patentFees.forms.statementUndertaking} (statement and undertaking).`,
    `${patentFees.forms.inventorshipDeclaration} (declaration of inventorship).`,
    "Proof of the inventor's right to file.",
    `${patentFees.forms.powerOfAuthority} (power of authority) if a patent agent files.`,
    'For convention/PCT: priority documents within 18 months of the priority date.',
  ],
  timelineDetail:
    `The full process typically takes ${patentFees.timeline}. Key milestones: filing → provisional-to-complete ` +
    `within ${patentFees.provisionalToCompleteDeadline} (if provisional) → publication at ${patentFees.publicationTiming} ` +
    '→ examination on request → grant. Government timelines are outside anyone\'s control.',
  costDrivers:
    'Provisional vs complete filing, specification length and complexity, drawings, professional drafting, and ' +
    'international (PCT/convention) routes all affect cost.',
  relatedServices: [
    { name: 'Copyright — software may also be protected as a literary work (patentability of software is limited)', href: '/services/copyright' },
  ],
  subPages: [
    { name: 'Provisional Patent Application', href: '/services/patent/provisional' },
    { name: 'Complete Patent Specification', href: '/services/patent/complete-specification' },
    { name: 'Patent Search', href: '/services/patent/search' },
    { name: 'PCT / International Patent', href: '/services/patent/international' },
  ],
  faq: [
    { question: 'What can be patented in India?', answer: 'Novel, inventive, and industrially applicable inventions — a new product, process, or improvement.' },
    { question: 'Provisional vs complete application — which do I file first?', answer: 'Most inventors file provisional first to lock in a priority date while the invention is finalised, then file complete within the statutory window.' },
    { question: 'How long does a patent last?', answer: patentFees.term + '.' },
    { question: 'How long does the whole process take?', answer: `${patentFees.timeline}, government-dependent.` },
    { question: `What's the rule after filing a provisional application?`, answer: `You must file the complete specification within ${patentFees.provisionalToCompleteDeadline} — this cannot be extended.` },
    { question: 'Can I protect my invention internationally?', answer: 'Yes — via the Convention route (claiming priority from an earlier foreign filing) or the PCT (Patent Cooperation Treaty) route.' },
    { question: 'Is my software patentable, or should I use copyright?', answer: 'Software patentability is limited in India; source code is reliably protected as a literary work under copyright. We can advise which route (or both) fits your invention.' },
  ],
  metaTitle: 'Patent Registration in India — Process, Documents & Fees',
  metaDescription:
    'Protect your invention with a patent in India. Provisional, complete, and PCT/international routes, full ' +
    'filing process, documents, timelines, and cost drivers explained.',
};
