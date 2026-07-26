import type { ServiceData } from '../types';
import { trademarkFees } from '../fees';

export const trademark: ServiceData = {
  slug: 'trademark',
  name: 'Trademark Registration',
  urlPath: '/services/trademark',
  definition:
    'A trademark is a distinctive sign — a brand name, word, logo, slogan, label, or shape — that identifies ' +
    "and distinguishes your goods or services from everyone else's. Registration gives you exclusive rights " +
    'to that mark across India.',
  primaryActionLabel: 'Start Your Trademark Enquiry',
  whoNeedsIt: [
    "You've launched or are launching a brand, product, or business name.",
    "You have a logo or slogan you don't want competitors copying.",
    "You're raising investment or franchising and need your brand as a protected asset.",
    "You've received a legal notice about your brand name.",
  ],
  whatsIncluded: [
    'Trademark search and class advice.',
    'Preparation and filing of the application (Form TM-A).',
    'Handling of the prosecution process including objection replies and hearing representation (scope depends on the package).',
    'Status tracking through to the registration certificate.',
  ],
  keyFacts: [
    { label: 'Governing law', value: 'Trade Marks Act, 1999 and Trade Marks Rules, 2017 — Registrar of Trademarks (IP India)' },
    { label: 'Validity', value: trademarkFees.validity },
    { label: 'Typical timeline', value: `${trademarkFees.timelineUnopposed} if unopposed; ${trademarkFees.timelineOpposed} with objections/opposition (government-dependent)` },
    { label: 'Starting cost driver', value: `Number of classes — ${trademarkFees.govtFeePerClassSmallEntity}/class (individuals, startups, MSMEs) or ${trademarkFees.govtFeePerClassLargeEntity}/class (larger businesses), e-filing. See Pricing.` },
  ],
  typesIntro:
    'Mark types: word mark, logo/device mark, combined mark, service mark, and specialised marks (collective, ' +
    'certification, shape, sound). Classes: 45 in total — Classes 1–34 for goods, Classes 35–45 for services. ' +
    'Common ones: Class 9 (software, electronics), Class 25 (clothing), Class 35 (business/retail services), ' +
    'Class 41 (education). A business spanning multiple categories needs each relevant class covered. Once TM-A ' +
    'is filed you may use the ™ symbol; the ® symbol is reserved for registered marks only.',
  process: [
    { step: 1, title: 'Trademark search', description: 'Check the IP India database for identical/similar existing or pending marks to avoid future conflict.' },
    { step: 2, title: 'File application (Form TM-A)', description: 'Submit online, select class(es), pay fees; an application number is generated immediately and ™ can be used.' },
    { step: 3, title: 'Vienna codification & formality check', description: 'The Registry classifies device marks and checks formalities.' },
    { step: 4, title: 'Examination', description: 'Examined under Section 9 (absolute grounds) and Section 11 (relative grounds); an Examination Report is issued.' },
    { step: 5, title: 'Objection — reply to Examination Report', description: 'An "objection" is raised by the examiner about the application itself — distinct from an "opposition," a third-party challenge. No reply risks the application being treated as abandoned.', deadline: trademarkFees.objectionReplyDeadline },
    { step: 6, title: 'Show cause hearing', description: `If the reply doesn't satisfy the examiner, a hearing is scheduled (usually by video conference). You demonstrate distinctiveness, often via evidence of actual use (invoices, ads, packaging). Adjournment via Form ${trademarkFees.forms.adjournment} (fee ${trademarkFees.adjournmentFee}), filed at least 2 days before, typically max two adjournments. Non-attendance can mean refusal or abandonment.` },
    { step: 7, title: 'Acceptance & advertisement', description: 'Accepted marks are published in the Trade Marks Journal.' },
    { step: 8, title: 'Opposition window', description: `Any person may oppose via Form ${trademarkFees.forms.opposition}. If opposed: opponent files notice → applicant files counter-statement → evidence stages → hearing. Opposition is the longest branch, often 2–3 years.`, deadline: `${trademarkFees.oppositionWindow}; counter-statement within ${trademarkFees.counterStatementDeadline}` },
    { step: 9, title: 'Registration & certificate', description: `If unopposed/resolved, the mark is registered and the certificate issued (Form ${trademarkFees.forms.certificate}). The ® symbol may now be used.` },
  ],
  documents: [
    'Copy of the trademark/logo (not needed for a plain word mark).',
    'Applicant name, address, nationality.',
    'Incorporation certificate (company/LLP).',
    'Udyog Aadhaar/MSME certificate (to claim the lower fee).',
    'Description of goods/services and the class.',
    `Power of Attorney (${trademarkFees.forms.powerOfAttorney}) signed by the applicant.`,
    'PAN, Aadhaar, GST, partnership deed may also apply depending on applicant type.',
  ],
  timelineDetail:
    `Unopposed and unobjected: certificate typically in ${trademarkFees.timelineUnopposed}. With objections/oppositions: ` +
    `${trademarkFees.timelineOpposed} owing to Registry backlog. Government stages are outside anyone's control — no ` +
    'registration outcome is guaranteed.',
  costDrivers:
    'Primary driver is the number of classes filed. Larger entities pay a higher per-class government fee. ' +
    'Objection replies, hearings, and opposition defence add scope.',
  relatedServices: [{ name: 'Copyright — for logos that are also artistic works', href: '/services/copyright' }],
  subPages: [
    { name: 'Trademark Search', href: '/services/trademark/search' },
    { name: 'Objection Reply', href: '/services/trademark/objection' },
    { name: 'Show Cause Hearing', href: '/services/trademark/hearing' },
    { name: 'Opposition', href: '/services/trademark/opposition' },
    { name: 'Renewal', href: '/services/trademark/renewal' },
  ],
  faq: [
    { question: 'Is trademark registration mandatory?', answer: 'No, but unregistered marks are far harder to protect against copycats and infringers.' },
    { question: "What's the difference between an objection and an opposition?", answer: "An objection is raised by the Registry's own examiner about the application itself. An opposition is a challenge filed by a third party after the mark is advertised. They happen at different stages and are handled differently." },
    { question: 'Can I use ™ before registration? When can I use ®?', answer: 'Yes — you can use ™ as soon as you file (Form TM-A). The ® symbol is reserved for marks that have completed registration.' },
    { question: 'What happens if my application is objected or opposed?', answer: 'You (or we, on your behalf) reply within the statutory deadline with evidence and arguments. Objections are answered via a written reply and, if needed, a show cause hearing. Oppositions require a counter-statement and can run to a full hearing.' },
    { question: 'How long is a trademark valid, and how does renewal work?', answer: `A trademark is valid for ${trademarkFees.validity.split(',')[0]} from the date of registration and can be renewed indefinitely in further 10-year terms. See our dedicated renewal page for process detail.` },
    { question: 'Can I file for multiple classes at once?', answer: 'Yes — a single application can cover multiple classes; the government fee is charged per class.' },
    { question: "What happens if I don't reply to the examination report in time?", answer: `You must reply within ${trademarkFees.objectionReplyDeadline}. Missing this deadline risks the application being treated as abandoned.` },
  ],
  metaTitle: 'Trademark Registration in India — Process, Documents & Fees',
  metaDescription:
    'Register your brand name, logo, or slogan as a trademark in India. Full process — search, filing, objections, ' +
    'opposition, renewal — documents, timelines, and cost drivers explained.',
};
