import type { ServiceData } from '../types';
import { copyrightFees } from '../fees';

export const copyright: ServiceData = {
  slug: 'copyright',
  name: 'Copyright Registration',
  urlPath: '/services/copyright',
  definition:
    'Copyright protects your original creative work — writing, music, art, film, sound recordings, and software ' +
    '— giving you exclusive control over how it is reproduced, distributed, displayed, and commercialised.',
  primaryActionLabel: 'Start Your Copyright Enquiry',
  whoNeedsIt: [
    'You are a writer, musician, artist, designer, filmmaker, or software developer.',
    'You want provable proof of ownership and creation date.',
    'You license, sell, or want to enforce rights over your work.',
    'You want a stronger position against plagiarism or piracy.',
  ],
  whatsIncluded: [
    'Guidance on the correct work category.',
    `Preparation and filing of the application (${copyrightFees.form}).`,
    'Handling of objections/clarifications during examination (scope depends on package).',
    'Tracking through to the registration certificate.',
  ],
  keyFacts: [
    { label: 'Governing law', value: 'Copyright Act, 1957 and Copyright Rules, 2013 — processed via copyright.gov.in' },
    { label: 'Protection', value: 'Arises automatically on creation; registration adds legal proof and easier enforcement (not mandatory but strongly advised)' },
    { label: 'Typical timeline', value: copyrightFees.timeline },
    { label: 'Starting cost driver', value: `Work type/category — roughly ${copyrightFees.feeRange}. See Pricing.` },
  ],
  typesIntro:
    'Six protected categories: literary (including software source code), dramatic, musical, artistic, ' +
    'cinematograph films, and sound recordings. Examples — literary: novels, articles, blogs, software, training ' +
    'material; dramatic: scripts, plays, choreography; musical: compositions and notation; artistic: paintings, ' +
    'drawings, photographs, architectural designs, logos.',
  process: [
    { step: 1, title: 'Draft the application', description: `Using ${copyrightFees.form} with a statement of particulars.` },
    { step: 2, title: 'Complete details', description: 'Title, author/creator name, creation date, brief description; attach copies of the work.' },
    { step: 3, title: 'Pay the fee', description: 'Varies by work type.' },
    { step: 4, title: 'Submit', description: 'Online via the e-filing portal or by post to the Copyright Office, Delhi; a diary number is issued on receipt.' },
    { step: 5, title: 'Waiting period for objections', description: 'The application proceeds only after this window closes.', deadline: copyrightFees.objectionWindow },
    { step: 6, title: 'Examination', description: 'The office reviews and may issue objections or request clarifications.' },
    { step: 7, title: 'Certificate', description: 'On successful registration, a copyright registration certificate is issued as proof of ownership.' },
  ],
  documents: [
    'Two copies of the work.',
    'Proof of identity (Aadhaar, Passport, PAN).',
    'Proof of ownership (NOC, assignment deed, or publishing agreement).',
    'Power of Attorney (if filing through an agent).',
    'For published works: NOC from the publisher.',
    "Where a person's photograph appears: NOC from that person.",
  ],
  timelineDetail:
    `Typically ${copyrightFees.timeline} end to end: ${copyrightFees.form} filing → diary number → ` +
    `${copyrightFees.objectionWindow} → examination → certificate. Some categories (e.g. software source code, ` +
    'artistic works tied to goods) can take longer if additional documents are needed.',
  costDrivers:
    'Work category is the primary driver; published works and certain artistic/software works carry additional ' +
    'document requirements.',
  relatedServices: [{ name: 'Trademark — for logos (an artistic work can also be a trademark)', href: '/services/trademark' }],
  subPages: [
    { name: 'Copyright for Software / Source Code', href: '/services/copyright/software' },
    { name: 'Copyright for Music & Sound Recordings', href: '/services/copyright/music' },
    { name: 'Copyright Objection Response', href: '/services/copyright/objection' },
  ],
  faq: [
    { question: 'Is copyright registration mandatory?', answer: 'No — protection is automatic on creation — but registration is strong, dated proof of ownership that makes enforcement much easier.' },
    { question: 'Is software copyrightable?', answer: 'Yes, source code is protected as a literary work.' },
    { question: "What's the difference between copyright and trademark for a logo?", answer: 'A logo can be both: copyright protects it as an artistic work (the drawing itself); trademark protects it as a brand identifier used in commerce. Many logos qualify for both.' },
    { question: 'How long does registration take?', answer: `Typically ${copyrightFees.timeline}, including the mandatory objection waiting period.` },
    { question: `What's the ${copyrightFees.objectionWindow.toLowerCase()}?`, answer: 'After filing, the application must sit for this window before examination proceeds, giving third parties a chance to raise an objection.' },
    { question: 'What proof of ownership do I need for published vs unpublished work?', answer: 'Unpublished work generally needs proof of creation/authorship; published work additionally needs an NOC from the publisher.' },
  ],
  metaTitle: 'Copyright Registration India — Process, Documents & Fees',
  metaDescription:
    'Register copyright for your literary, musical, artistic, software, or film work in India. Process, ' +
    'documents, timeline, and cost drivers explained in plain language.',
};
