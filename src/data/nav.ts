// Navigation structure — sourced from 02-NAVIGATION.md. Single source for Header + Footer.

export const services = [
  { name: 'Trademark', href: '/services/trademark' },
  { name: 'Copyright', href: '/services/copyright' },
  { name: 'Patent', href: '/services/patent' },
  { name: 'Privacy Policy', href: '/services/privacy-policy' },
] as const;

export const headerNav = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services', children: services },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Resources', href: '/resources' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
] as const;

// Primary action (Contact) is rendered separately in the Header as the CTA button, not a plain link.
export const headerCta = { name: 'Contact', href: '/contact' } as const;

export const footerColumns = [
  {
    title: 'Services',
    links: services,
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Blog', href: '/blog' },
      { name: 'Resources', href: '/resources' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Search', href: '/search' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Site Privacy Policy', href: '/legal/privacy-policy' },
      { name: 'Terms of Service', href: '/legal/terms' },
      { name: 'Refund Policy', href: '/legal/refund-policy' },
      { name: 'Disclaimer', href: '/legal/disclaimer' },
    ],
  },
] as const;

// "Which service do I need?" decision guide — reused on Home + Services hub (02-NAVIGATION.md).
export const decisionGuide = [
  { need: 'A brand name, logo, or slogan', service: 'Trademark', href: '/services/trademark' },
  {
    need: 'Original creative work (writing, music, art, software code)',
    service: 'Copyright',
    href: '/services/copyright',
  },
  { need: 'A new invention, product, or process', service: 'Patent', href: '/services/patent' },
  {
    need: "My website/app's data-handling compliance document",
    service: 'Privacy Policy',
    href: '/services/privacy-policy',
  },
] as const;
