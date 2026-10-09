/**
 * Centralized profile data - Single source of truth for all personal information
 * Update this file to change content across the entire site
 */

export const profile = {
  name: 'Lucas Sehnem',
  headline: 'Technical Product Manager',
  tagline: 'Construo produtos na interseção entre IA, Produto e Engenharia.',
  subheadline: 'Technical Product Manager focado em transformar problemas complexos em produtos simples, escaláveis e tecnicamente viáveis.',
  description: `Trabalho de forma hands-on entre produto e tecnologia, atuando diretamente com desenvolvimento, IA, APIs, arquitetura, automações e prototipação para transformar decisões de produto em soluções reais.

Foco em Technical Product Management, AI Products, APIs, SaaS, estratégia de produto, crescimento e desenvolvimento hands-on.`,
  email: 'lucas@sehnem.com',
  linkedin: 'https://www.linkedin.com/in/sehenth/',
  github: 'https://github.com/lucassehnem',
  twitter: 'https://x.com/lucassehnem',
  location: 'São Paulo, Brasil',
  avatar: '/avatar.jpg',
  ogImage: '/og-image.jpg',
};

export const navigation = [
  { label: 'Projects', href: '/projects/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/#contact' },
];

export const ctaButtons = {
  primary: { label: 'View Projects', href: '/projects/' },
  secondary: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sehenth/', external: true },
};

export const skills = {
  product: [
    'Discovery',
    'Prioritization',
    'Product Strategy',
    'Metrics',
    'Experimentation',
  ],
  technology: [
    'AI / LLMs',
    'APIs',
    'Architecture',
    'Automation',
    'Prototyping',
  ],
  execution: [
    'Hands-on Building',
    'Testing',
    'Observability',
    'Iteration',
    'Delivery',
  ],
};

export const impactMetrics = [
  // Reserved for verified product outcomes. Nothing may be published here
  // without state: 'verified' confirmation from Lucas.
];

export const footerLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sehenth/', external: true },
];

export const siteConfig = {
  title: 'Lucas Sehnem — Technical Product Manager',
  description: 'Technical Product Manager at the intersection of AI, Product & Engineering. Building AI-powered products, APIs, and SaaS.',
  ogImage: '/og-image.jpg',
};
