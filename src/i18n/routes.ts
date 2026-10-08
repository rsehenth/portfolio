/**
 * Routes configuration for i18n
 * Defines the route structure for both locales
 */

export type Locale = 'pt-BR' | 'en';

export const routes = {
  'pt-BR': {
    home: '/',
    about: '/about/',
    projects: '/projects/',
    project: (slug: string) => `/projects/${slug}/`,
    contact: '/#contact',
  },
  'en': {
    home: '/en/',
    about: '/en/about/',
    projects: '/en/projects/',
    project: (slug: string) => `/en/projects/${slug}/`,
    contact: '/en/#contact',
  },
} as const;

// Get the base path for a locale
export function getLocaleBase(locale: Locale): string {
  return locale === 'pt-BR' ? '' : `/${locale}`;
}

// Get the localized route for a given path
export function getLocalizedRoute(locale: Locale, path: string): string {
  const base = getLocaleBase(locale);

  // Remove leading slash if present for concatenation
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Special case for home
  if (path === '/' || path === '') {
    return base + '/' || '/';
  }

  return `${base}/${cleanPath}`;
}

// Get the alternate locale
export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'pt-BR' ? 'en' : 'pt-BR';
}

// Extract locale from pathname
export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return 'en';
  }
  return 'pt-BR';
}

// Get the path without locale prefix
export function getPathWithoutLocale(pathname: string): string {
  if (pathname.startsWith('/en/')) {
    return pathname.slice(3) || '/';
  }
  if (pathname === '/en') {
    return '/';
  }
  return pathname;
}

// Generate hreflang entries for SEO
export function generateHreflangEntries(canonicalPath: string, siteUrl: string): Array<{ hreflang: string; href: string }> {
  const entries: Array<{ hreflang: string; href: string }> = [];

  for (const locale of ['pt-BR', 'en'] as Locale[]) {
    const localizedPath = getLocalizedRoute(locale, getPathWithoutLocale(canonicalPath));
    entries.push({
      hreflang: locale === 'pt-BR' ? 'pt-BR' : 'en',
      href: `${siteUrl}${localizedPath}`,
    });
  }

  // Add x-default (points to pt-BR as default)
  entries.push({
    hreflang: 'x-default',
    href: `${siteUrl}${getLocalizedRoute('pt-BR', getPathWithoutLocale(canonicalPath))}`,
  });

  return entries;
}

// Generate alternate links for <head>
export function generateAlternateLinks(canonicalPath: string, siteUrl: string): string {
  const entries = generateHreflangEntries(canonicalPath, siteUrl);
  return entries
    .map(({ hreflang, href }) => `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`)
    .join('\n    ');
}