import type { ServiceData } from '../types';

// The substantive copy for this service is supplied by the business owner (service-privacy-policy.md).
// Everything below is a structural placeholder so the page slots consistently beside the three IP
// services. Do not invent legal claims, fees, or process steps here.

export const privacyPolicy: ServiceData = {
  slug: 'privacy-policy',
  name: 'Privacy Policy Drafting',
  urlPath: '/services/privacy-policy',
  definition: 'We draft clear, legally-grounded privacy policy documents for websites and apps, covering what data you collect, how it\'s used, and the disclosures Indian and global users expect.',
  primaryActionLabel: 'Start Your Privacy Policy Enquiry',
  isOwnerSupplied: false,
  whoNeedsIt: [
    'Website owners, app developers, SaaS founders, and e-commerce businesses that collect any user data — names, emails, payment details, cookies, or analytics — need a privacy policy, both to meet legal requirements (India\'s DPDP Act, and GDPR/CCPA if you have overseas users) and to build visitor trust.',
  ],
  whatsIncluded: [
    'A drafted, ready-to-publish privacy policy document tailored to your platform — covering what data you collect and why, how it\'s stored and secured, which third parties (analytics, payment gateways, hosting) receive it, user rights (access, correction, deletion), cookie disclosures, and a data breach/grievance contact — formatted for direct publishing on your website or app.',
  ],
  keyFacts: [
    { label: 'Applicable framework/standard', value: 'Drafted to align with India\'s Digital Personal Data Protection Act, 2023 (DPDPA), with optional GDPR/CCPA clauses if you serve international users.' },
    { label: 'Turnaround', value: '4 business days, inclusive of up to two rounds of revisions.' },
    { label: 'Starting cost driver', value: 'Number of data touchpoints and jurisdictions served.' },
  ],
  typesIntro: undefined,
  process: [
    { step: 1, title: 'Gather info', description: 'We collect details about your data practices.' },
    { step: 2, title: 'Draft', description: 'We draft the policy tailored to your platform.' },
    { step: 3, title: 'Review', description: 'You review the draft.' },
    { step: 4, title: 'Finalize', description: 'We finalize the document for publishing.' }
  ],
  documents: [
    'A list (or access) of every form, cookie, plugin, or third-party tool on your site/app that collects user data (e.g., contact forms, Google Analytics, payment gateway, newsletter signup).',
    'Your business name, registered address, and a grievance/contact email for data requests.',
    'Whether you serve users outside India (affects whether GDPR/CCPA clauses are needed).',
  ],
  timelineDetail: '4 business days, inclusive of up to two rounds of revisions.',
  costDrivers: 'Cost is driven by the number of data touchpoints (forms, cookies, analytics, payment gateway, third-party integrations), whether GDPR/CCPA clauses are needed alongside DPDPA (international users), website vs. mobile app (app store disclosures — Play Store/App Store data safety sections — add scope), and revisions after your review.',
  relatedServices: [
    { name: 'Trademark', href: '/services/trademark' },
    { name: 'Copyright', href: '/services/copyright' },
    { name: 'Patent', href: '/services/patent' },
  ],
  subPages: [],
  faq: [],
  metaTitle: 'Privacy Policy Drafting Service — Bhartiya IP Solutions',
  metaDescription:
    'Professional privacy policy drafting service for websites, apps, and businesses. Compliant, ' +
    'ready-to-publish documents tailored to your business.',
};
