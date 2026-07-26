// JSON-LD builders per 05-SEO-AND-GEO.md's structured-data requirements.
import { business } from '../data/business';
import type { FAQItem, ServiceData } from '../data/types';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: business.displayName,
    email: business.email,
    telephone: business.phoneDisplay,
    areaServed: business.areaServed,
    url: business.siteUrl,
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
    name: data.name,
    description: data.metaDescription,
    provider: { '@type': 'LegalService', name: business.displayName },
    areaServed: business.areaServed,
    url: business.siteUrl + data.urlPath,
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
    author: { '@type': 'Organization', name: business.displayName },
    publisher: { '@type': 'Organization', name: business.displayName },
  };
}
