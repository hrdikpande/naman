import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// SITE URL: derived from the business email domain (bhartiyaipsolutions.com).
// VERIFY BEFORE LAUNCH — confirm the live production domain with the owner.
// Overridable via PUBLIC_SITE_URL (see .env.example) for local/staging builds; canonical URLs
// should otherwise always point at production, so this is not driven by Netlify's own
// deploy-preview URL env vars.
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://bhartiyaipsolutions.com',
  adapter: netlify(),
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/enquiry/thank-you') &&
        !page.includes('/legal/privacy-policy') &&
        !page.includes('/legal/terms') &&
        !page.includes('/legal/refund-policy') &&
        !page.includes('/legal/disclaimer'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});

