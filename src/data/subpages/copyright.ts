import type { SubPageData } from '../types';
import { copyrightFees } from '../fees';

// Sourced from service-copyright.md's category list and process section. Objection-response
// detail beyond the 30-day window is not documented — flagged via ownerSupplyNote.

export const copyrightSubPages: SubPageData[] = [
  {
    slug: 'software',
    parentSlug: 'copyright',
    name: 'Copyright for Software / Source Code',
    urlPath: '/services/copyright/software',
    definition:
      'Software source code is protected as a literary work under the Copyright Act, 1957 — the same category ' +
      'as novels, articles, and training material. Registration gives you dated, provable proof of authorship.',
    primaryActionLabel: 'Start Your Software Copyright Enquiry',
    whatsIncluded: [
      'Guidance on filing source code as a literary work.',
      `Preparation and filing of the application (${copyrightFees.form}).`,
      'Handling of objections/clarifications during examination.',
      'Tracking through to the registration certificate.',
    ],
    process: [
      { step: 1, title: `Draft ${copyrightFees.form}`, description: 'Title, author/creator, creation date, and a statement of particulars for the source code.' },
      { step: 2, title: 'Submit with copies', description: 'Source code excerpts/documentation are attached as required by the Copyright Office.' },
      { step: 3, title: 'Waiting period & examination', description: 'The application proceeds through the standard objection window and examination.', deadline: copyrightFees.objectionWindow },
      { step: 4, title: 'Certificate', description: 'Issued as dated proof of authorship once registration is complete.' },
    ],
    documents: ['Source code copies/excerpts as required.', 'Proof of identity (Aadhaar, Passport, PAN).', 'Proof of ownership (assignment deed or employment agreement where applicable).'],
    faq: [
      { question: 'Is software copyrightable in India?', answer: 'Yes — source code is protected as a literary work under the Copyright Act, 1957.' },
      { question: 'Do I need to submit my full source code?', answer: 'Requirements vary by case; some applicants submit excerpts with confidential portions redacted. We advise on what is needed for your filing.' },
    ],
    metaTitle: 'Copyright for Software & Source Code — India',
    metaDescription: 'Register your source code as a literary work under Indian copyright law. Process, documents, and what counts as proof of authorship.',
  },
  {
    slug: 'music',
    parentSlug: 'copyright',
    name: 'Copyright for Music & Sound Recordings',
    urlPath: '/services/copyright/music',
    definition:
      'Musical works (compositions and notation) and sound recordings are two of the six protected copyright ' +
      'categories — the composition and its recorded performance can each be registered separately.',
    primaryActionLabel: 'Start Your Music Copyright Enquiry',
    whatsIncluded: [
      'Guidance on filing under the musical work and/or sound recording category.',
      `Preparation and filing of the application (${copyrightFees.form}).`,
      'Handling of objections/clarifications during examination.',
      'Tracking through to the registration certificate.',
    ],
    process: [
      { step: 1, title: `Draft ${copyrightFees.form}`, description: 'Title, composer/performer/producer details, creation date, and a statement of particulars.' },
      { step: 2, title: 'Submit with copies', description: 'Sheet music/notation and/or the sound recording are attached as required.' },
      { step: 3, title: 'Waiting period & examination', description: 'The application proceeds through the standard objection window and examination.', deadline: copyrightFees.objectionWindow },
      { step: 4, title: 'Certificate', description: 'Issued as dated proof of ownership once registration is complete.' },
    ],
    documents: ['Copies of the composition/notation and/or sound recording.', 'Proof of identity (Aadhaar, Passport, PAN).', 'Proof of ownership (assignment/publishing agreement where applicable).'],
    faq: [
      { question: 'Are the composition and the recording protected separately?', answer: 'Yes — a musical work (the composition/notation) and a sound recording (the recorded performance) are distinct copyright categories and can be registered separately.' },
      { question: 'Who owns the copyright if multiple people were involved?', answer: 'It depends on the agreement between composer, performer, and producer — we advise on documenting ownership correctly before filing.' },
    ],
    metaTitle: 'Copyright for Music & Sound Recordings — India',
    metaDescription: 'Register your musical composition or sound recording under Indian copyright law. Process, documents, and ownership guidance.',
  },
  {
    slug: 'objection',
    parentSlug: 'copyright',
    name: 'Copyright Objection Response',
    urlPath: '/services/copyright/objection',
    definition: 'After the mandatory 30-day waiting period, the Copyright Office examiner reviews the application. If there\'s no third-party objection but the examiner finds a discrepancy (e.g., incomplete Statement of Particulars, unclear title of work, missing NOC), they issue a discrepancy letter. We respond with the clarification or amended documents within the deadline given — typically 30 days. If a third-party objection is filed during or after the waiting period, both parties are given a hearing date. We prepare and file a written response addressing the objector\'s grounds, and represent your interests at the hearing (in person or via authorised agent) before the Registrar decides.',
    deadline: copyrightFees.objectionWindow + ' before examination proceeds.',
    primaryActionLabel: 'Get Help With Your Copyright Objection',
    whatsIncluded: ['Drafting and filing clarification/amended documents for discrepancy letters.', 'Preparing and filing written responses to third-party objections.', 'Representation at hearings in person or via authorised agent.'],
    process: [
      { step: 1, title: 'Waiting period', description: 'The mandatory window during which a third party may object.', deadline: copyrightFees.objectionWindow },
      { step: 2, title: 'Examination & Discrepancies', description: 'The Copyright Office reviews the application. If discrepancies are found, they issue a letter which we reply to (usually within 30 days).' },
      { step: 3, title: 'Objection & Hearing', description: 'If a third party objects, we prepare a written response and attend the scheduled hearing.' },
      { step: 4, title: 'Certificate', description: 'Once objections are resolved, the Registrar issues the Certificate of Registration.' }
    ],
    faq: [
      { question: `What is the ${copyrightFees.objectionWindow.toLowerCase()}?`, answer: 'A window after filing, before examination begins, during which any third party can raise an objection to your application.' },
    ],
    metaTitle: 'Copyright Objection Response — India',
    metaDescription: `Facing a copyright objection during the ${copyrightFees.objectionWindow.toLowerCase()} or examination? What happens and how to respond.`,
  },
];
