// JSON-LD builders per 05-SEO-AND-GEO.md's structured-data requirements.
import { business } from '../data/business';
import type { FAQItem, ServiceData } from '../data/types';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: business.displayName,
    description: "India's trusted platform for Trademark, Copyright, Patent registration and Privacy Policy drafting.",
    email: business.email,
    telephone: business.phoneDisplay,
    url: business.siteUrl,
    logo: business.siteUrl + '/1.png', // Fallback since no specific logo.png was provided yet, using client logo 1 as placeholder or a default
    openingHours: business.openingHours,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    areaServed: business.areaServed,
    serviceType: [
      'Trademark Registration',
      'Copyright Registration',
      'Patent Registration',
      'Privacy Policy Drafting',
    ],
    founder: personSchema(),
    sameAs: [business.linkedin],
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.displayName,
    telephone: business.phoneDisplay,
    email: business.email,
    url: business.siteUrl,
    openingHours: business.openingHours,
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    areaServed: business.areaServed,
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: business.director,
    jobTitle: 'Director',
    worksFor: {
      '@type': 'LegalService',
      name: business.displayName,
      url: business.siteUrl,
    },
    url: business.siteUrl + '/about',
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: business.siteUrl + item.href,
    })),
  };
}

// FAQPage kept for AI/LLM citation value (seo-doctor.skill quality-gates.md: Google retired
// FAQ rich results May 2026 for all sites — do not expect a SERP feature from this).
export function faqSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function serviceSchema(data: ServiceData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: data.name,
    name: data.name,
    description: data.metaDescription,
    provider: {
      '@type': 'LegalService',
      name: business.displayName,
      url: business.siteUrl,
    },
    areaServed: business.areaServed,
    url: business.siteUrl + data.urlPath,
  };
}

export function howToSchema(name: string, steps: { name: string; text: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  pubDate: Date;
  updatedDate?: Date;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    datePublished: opts.pubDate.toISOString(),
    dateModified: (opts.updatedDate ?? opts.pubDate).toISOString(),
    author: { '@type': 'Person', name: business.director },
    publisher: {
      '@type': 'Organization',
      name: business.displayName,
      logo: {
        '@type': 'ImageObject',
        url: business.siteUrl + '/1.png',
      },
    },
  };
}
