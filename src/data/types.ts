// Shared shape for the service-page template (04-SERVICE-PAGE-TEMPLATE.md, 13 sections)
// and the trimmed sub-page template. Every ServiceData/SubPageData object is filled from
// the corresponding /pages/service-*.md content file — no invented fields.

export interface KeyFact {
  label: string;
  value: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  deadline?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedLink {
  name: string;
  href: string;
}

export interface ServiceData {
  slug: 'trademark' | 'copyright' | 'patent' | 'privacy-policy';
  name: string;
  urlPath: string;
  definition: string;
  primaryActionLabel: string;
  whoNeedsIt: string[];
  whatsIncluded: string[];
  keyFacts: KeyFact[];
  types?: { title: string; description: string }[];
  typesIntro?: string;
  process: ProcessStep[];
  documents: string[];
  timelineDetail: string;
  costDrivers: string;
  relatedServices: RelatedLink[];
  subPages: RelatedLink[];
  faq: FAQItem[];
  metaTitle: string;
  metaDescription: string;
  isOwnerSupplied?: boolean;
}

export interface SubPageData {
  slug: string;
  parentSlug: ServiceData['slug'];
  name: string;
  urlPath: string;
  definition: string;
  deadline?: string;
  primaryActionLabel: string;
  whatsIncluded: string[];
  process: ProcessStep[];
  documents?: string[];
  faq: FAQItem[];
  metaTitle: string;
  metaDescription: string;
  ownerSupplyNote?: string; // flags content gaps per 07-IMPLEMENTATION-PLAN.md §10
}
