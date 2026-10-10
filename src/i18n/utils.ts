/**
 * i18n Utilities - Helper functions for internationalization
 */

import type { Locale } from './ui';

export const locales: Locale[] = ['pt-BR', 'en'];
export const defaultLocale: Locale = 'pt-BR';

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Get the locale from a pathname
 */
export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return 'en';
  }
  return 'pt-BR';
}

/**
 * Get the path without locale prefix
 */
export function getPathWithoutLocale(pathname: string): string {
  if (pathname.startsWith('/en/')) {
    return pathname.slice(3) || '/';
  }
  if (pathname === '/en') {
    return '/';
  }
  return pathname;
}

/**
 * Get the localized path for a given locale
 */
export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  const pathWithoutLocale = getPathWithoutLocale(pathname);
  const base = targetLocale === 'pt-BR' ? '' : `/${targetLocale}`;

  if (pathWithoutLocale === '/') {
    return base + '/' || '/';
  }

  return `${base}${pathWithoutLocale}`;
}

/**
 * Get alternate locale
 */
export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'pt-BR' ? 'en' : 'pt-BR';
}

/**
 * Format date according to locale
 */
export function formatDate(date: Date | string, locale: Locale): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const localeStr = locale === 'pt-BR' ? 'pt-BR' : 'en-US';
  return d.toLocaleDateString(localeStr, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format year only
 */
export function formatYear(date: Date | string | number): string {
  const d = typeof date === 'number' ? new Date(date, 0) : new Date(date);
  return d.getFullYear().toString();
}

/**
 * Format number with locale-aware formatting
 */
export function formatNumber(num: number, locale: Locale): string {
  const localeStr = locale === 'pt-BR' ? 'pt-BR' : 'en-US';
  return new Intl.NumberFormat(localeStr).format(num);
}

/**
 * Get localized URL for canonical/hreflang
 */
export function getLocalizedUrl(pathname: string, locale: Locale, siteUrl: string = import.meta.env.SITE): string {
  const localizedPath = getLocalizedPath(pathname, locale);
  return `${siteUrl}${localizedPath}`;
}

/**
 * Generate hreflang tags for SEO
 */
export function generateHreflangTags(pathname: string, siteUrl: string = import.meta.env.SITE): string {
  return locales
    .map((locale) => {
      const href = getLocalizedUrl(pathname, locale, siteUrl);
      const hreflang = locale === 'pt-BR' ? 'pt-BR' : 'en';
      return `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`;
    })
    .concat(`<link rel="alternate" hreflang="x-default" href="${getLocalizedUrl(pathname, defaultLocale, siteUrl)}" />`)
    .join('\n    ');
}

/**
 * Translate a key using the UI translations
 * This is a simple version - in practice you'd use the t() function from ui.ts
 */
export function translate(key: string, _locale: Locale, _params?: Record<string, string>): string {
  // This is a placeholder - actual translations are in ui.ts
  // The t() function from ui.ts should be used instead
  return key;
}

/**
 * Detect if we're on a translated route
 */
export function isTranslatedRoute(pathname: string): boolean {
  return pathname.startsWith('/en/') || pathname === '/en';
}

/**
 * Get the canonical path (without locale prefix) for the current page
 */
export function getCanonicalPath(pathname: string): string {
  return getPathWithoutLocale(pathname);
}
