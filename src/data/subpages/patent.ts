import type { SubPageData } from '../types';
import { patentFees } from '../fees';

// Sourced from service-patent.md's "Types of application" and process sections.

export const patentSubPages: SubPageData[] = [
  {
    slug: 'provisional',
    parentSlug: 'patent',
    name: 'Provisional Patent Application',
    urlPath: '/services/patent/provisional',
    definition:
      'A provisional patent application gives your invention temporary protection while it is still developing, ' +
      'and secures your priority date. A specification with no claims is provisional; once it has claims, it becomes complete.',
    deadline: `You have ${patentFees.provisionalToCompleteDeadline} to file the complete specification after a provisional filing.`,
    primaryActionLabel: 'Start Your Provisional Filing',
    whatsIncluded: [`Drafting of the provisional specification (${patentFees.forms.specification}, no claims).`, `Filing (${patentFees.forms.application}).`, 'Guidance on the 12-month window to file complete.'],
    process: [
      { step: 1, title: 'Draft the provisional specification', description: 'A technical description without formal claims, drafted by the inventor or a patent attorney.' },
      { step: 2, title: 'File', description: `${patentFees.forms.application} with the provisional ${patentFees.forms.specification}. This locks in your priority date.` },
      { step: 3, title: 'File complete specification', description: 'Must be filed within the statutory window to retain the priority date.', deadline: patentFees.provisionalToCompleteDeadline },
    ],
    documents: [`${patentFees.forms.application} (application).`, `${patentFees.forms.specification} (provisional specification).`, "Proof of the inventor's right to file."],
    faq: [
      { question: 'Why file a provisional application first?', answer: "It secures your priority date while the invention is still being finalised — cheaper and faster than a complete specification, but it must be followed by a complete filing." },
      { question: 'What happens if I miss the 12-month deadline?', answer: `The deadline (${patentFees.provisionalToCompleteDeadline}) cannot be extended — missing it means losing the priority date secured by the provisional filing.` },
    ],
    metaTitle: 'Provisional Patent Application India — Secure Your Priority Date',
    metaDescription: `File a provisional patent application in India and secure your priority date. You then have ${patentFees.provisionalToCompleteDeadline} to file complete.`,
  },
  {
    slug: 'complete-specification',
    parentSlug: 'patent',
    name: 'Complete Patent Specification',
    urlPath: '/services/patent/complete-specification',
    definition:
      'A complete specification is a full patent application with formal claims, filed either directly or after ' +
      'a provisional filing, giving your invention full protection within India.',
    primaryActionLabel: 'Start Your Complete Specification Filing',
    whatsIncluded: [`Drafting of the complete specification with claims (${patentFees.forms.specification}).`, `Filing (${patentFees.forms.application}).`, 'Support through publication and examination.'],
    process: [
      { step: 1, title: 'Draft the complete specification', description: 'A technical and legal document including formal claims, drafted by the inventor or a patent attorney.' },
      { step: 2, title: 'File', description: `${patentFees.forms.application} with the complete ${patentFees.forms.specification}.` },
      { step: 3, title: 'Publication', description: 'Application published in the Patent Journal.', deadline: patentFees.publicationTiming },
      { step: 4, title: 'Request for Examination & grant', description: 'Filed within the statutory period; if satisfied, the Controller grants the patent.' },
    ],
    documents: [`${patentFees.forms.application} (application).`, `${patentFees.forms.specification} (complete specification with claims).`, `${patentFees.forms.statementUndertaking} and ${patentFees.forms.inventorshipDeclaration}.`],
    faq: [
      { question: 'Do I need a provisional filing first?', answer: 'No — you can file complete directly, or follow up a provisional filing within its 12-month window.' },
      { question: 'When is my application published?', answer: `Applications are published in the Patent Journal at ${patentFees.publicationTiming}.` },
    ],
    metaTitle: 'Complete Patent Specification India — Full Protection Filing',
    metaDescription: 'File a complete patent specification with formal claims for full protection in India. Process, documents, and timeline.',
  },
  {
    slug: 'search',
    parentSlug: 'patent',
    name: 'Patent Search',
    urlPath: '/services/patent/search',
    definition:
      'A patentability/prior-art search checks public patent databases to confirm your invention is novel and ' +
      'non-obvious before you invest in drafting and filing.',
    primaryActionLabel: 'Start Your Patent Search',
    whatsIncluded: ['Search of public patent databases for prior art.', 'Assessment against novelty, inventive step, and industrial applicability.', 'A plain-language search report.'],
    process: [
      { step: 1, title: 'Describe your invention', description: 'Share the technical details of what you have built or designed.' },
      { step: 2, title: 'Database search', description: 'We search public patent databases to confirm novelty and non-obviousness.' },
      { step: 3, title: 'Search report', description: 'You get a plain-language read on patentability before committing to drafting and filing.' },
    ],
    faq: [
      { question: 'Is a patent search required before filing?', answer: 'It is not legally required, but it is the standard first step — filing without one risks investing in an application for an invention that already exists.' },
      { question: 'What does the search check for?', answer: 'Novelty, inventive step (non-obviousness), and industrial applicability — the three statutory patentability criteria under the Indian Patent Act, 1970.' },
    ],
    metaTitle: 'Patent Search India — Prior Art & Novelty Check',
    metaDescription: 'Confirm your invention is novel before filing. Patent search across public databases assessing novelty, inventive step, and industrial applicability.',
  },
  {
    slug: 'international',
    parentSlug: 'patent',
    name: 'PCT / International Patent',
    urlPath: '/services/patent/international',
    definition:
      'International patent protection runs through the PCT (Patent Cooperation Treaty) or the Convention route ' +
      '— filing in India claiming priority from an earlier foreign filing (Paris Convention) — plus PCT National ' +
      'Phase entry into India from an existing international application.',
    primaryActionLabel: 'Start Your International Patent Enquiry',
    whatsIncluded: ['Guidance on choosing between PCT and Convention routes.', 'Support with PCT National Phase entry into India.', 'Coordination of priority document deadlines.'],
    process: [
      { step: 1, title: 'Establish priority', description: 'File an Indian or foreign priority application, or enter national phase from an existing PCT application.' },
      { step: 2, title: 'Choose your route', description: 'PCT International (single international application designating multiple countries) or Convention (direct filing claiming priority under the Paris Convention).' },
      { step: 3, title: 'Priority documents', description: 'Submitted within the statutory window.', deadline: '18 months from the priority date' },
      { step: 4, title: 'National phase examination', description: 'Each designated country examines the application under its own patent law.' },
    ],
    documents: ['Priority documents (within 18 months of the priority date for convention/PCT filings).', `${patentFees.forms.application} and ${patentFees.forms.specification} as applicable to the chosen route.`],
    faq: [
      { question: 'PCT vs Convention — what is the difference?', answer: 'PCT is a single international application that can later enter national phase in many countries; Convention is a direct filing in a specific country claiming priority from an earlier filing, under the Paris Convention.' },
      { question: 'What is the deadline for priority documents?', answer: 'Priority documents must be submitted within 18 months of the priority date.' },
    ],
    metaTitle: 'PCT & International Patent Filing — India',
    metaDescription: 'Protect your invention internationally via the PCT or Convention route. Priority document deadlines and national phase entry into India explained.',
  },
];
