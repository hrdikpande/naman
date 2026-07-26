// Centralized fee/timeline/form values. Every figure here is sourced from the /pages content
// files and is flagged VERIFY_BEFORE_LAUNCH per 06-GLOBAL-CONTENT.md — confirm against live
// IP India / Copyright Office / Patent Office sources before publishing. Edit here to propagate
// everywhere a value is referenced.

export const VERIFY_BEFORE_LAUNCH = true;

export const trademarkFees = {
  govtFeePerClassSmallEntity: '₹4,500',
  govtFeePerClassLargeEntity: '₹9,000',
  adjournmentFee: '₹900',
  validity: '10 years, renewable indefinitely in 10-year terms',
  timelineUnopposed: '6–12 months',
  timelineOpposed: '18–24 months',
  objectionReplyDeadline: '1 month (30 days) from the Examination Report, extendable up to 2 further months',
  oppositionWindow: '4 months from advertisement in the Trade Marks Journal',
  counterStatementDeadline: '2 months — no extension',
  classCount: 45,
  forms: {
    application: 'TM-A',
    adjournment: 'TM-M',
    opposition: 'TM-O',
    certificate: 'RG-2',
    powerOfAttorney: 'Form 48',
  },
} as const;

export const copyrightFees = {
  feeRange: '₹500 for Literary/Artistic/Dramatic works, and ₹5,000 for Sound recording/Commercial art/Cinematograph film',
  timeline: '2–4 months',
  objectionWindow: '30-day mandatory waiting period',
  form: 'Form XIV',
} as const;

export const patentFees = {
  term: '20 years from the date of filing',
  timeline: '3–5 years end to end',
  provisionalToCompleteDeadline: '12 months — no extension',
  publicationTiming: '18 months from the priority date',
  forms: {
    application: 'Form-1',
    specification: 'Form-2',
    statementUndertaking: 'Form-3',
    inventorshipDeclaration: 'Form-5',
    powerOfAuthority: 'Form-26',
  },
} as const;

