// Single source of truth for business identity. Edit here to propagate everywhere.
// Values confirmed directly by the business owner in the build session (not invented).

export const business = {
  // Display name is "bhartiyaipsolutions" title-cased for readability (Bhartiya IP Solutions).
  // The raw/legal form is kept below for anywhere an exact match is required (e.g. schema "name").
  displayName: 'Bhartiya IP Solutions',
  legalName: 'bhartiyaipsolutions',
  email: 'info@bhartiyaipsolutions.com',
  phone: '6387768856',
  phoneDisplay: '+91 63877 68856',
  areaServed: 'India',
  director: 'Naman Pathak',
  linkedin: 'https://www.linkedin.com/in/bhartiya-ip-solutions-a59375425/',
  openingHours: 'Mo-Sa 10:00-19:00',
  // VERIFY BEFORE LAUNCH — confirm production domain matches astro.config.mjs `site`.
  siteUrl: 'https://bhartiyaipsolutions.com',
} as const;

// Site-wide legal disclaimer — required in the footer on every page (06-GLOBAL-CONTENT.md).
export const disclaimer =
  `${business.displayName} provides IPR filing and facilitation services, not legal representation ` +
  `or legal advice unless explicitly engaged for that purpose. Registration outcomes depend on the ` +
  `relevant government authority (IP India, the Copyright Office, or the Patent Office) and cannot be ` +
  `guaranteed. Government fees and statutory timelines stated on this site are indicative and subject to change.`;

// Consistent primary/secondary action naming, used site-wide (06-GLOBAL-CONTENT.md).
export const primaryActionLabel = 'Start Enquiry';
export const secondaryActionLabel = 'Request a Callback';
