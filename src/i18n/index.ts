/**
 * i18n Module - Main exports for internationalization
 *
 * Exports are explicit to avoid ambiguity between duplicate symbols
 * in ui.ts, routes.ts and utils.ts (they define the same names independently).
 *
 * Authority per symbol:
 *   Locale, locales, defaultLocale, ui, statusLabel, t  →  ui.ts
 *   generateAlternateLinks, generateHreflangEntries,
 *   getLocalizedRoute, getLocaleBase, routes            →  routes.ts
 *   getLocalizedPath, getLocalizedUrl, generateHreflangTags,
 *   formatDate, formatYear, formatNumber,
 *   isValidLocale, isTranslatedRoute, getCanonicalPath  →  utils.ts
 *
 * Functions duplicated across routes.ts and utils.ts are resolved here
 * by picking one source; both implementations are identical.
 */

// ── Core types and UI translations (ui.ts is the authority) ──────────────────
export {
  type Locale,
  locales,
  defaultLocale,
  ui,
  statusLabel,
  t,
} from './ui';

// ── Route helpers (routes.ts) ─────────────────────────────────────────────────
export {
  routes,
  getLocaleBase,
  getLocalizedRoute,
  generateHreflangEntries,
  generateAlternateLinks,
  // Canonical versions of the duplicated helpers — picked from routes.ts
  getAlternateLocale,
  getLocaleFromPath,
  getPathWithoutLocale,
} from './routes';

// ── Additional utilities (utils.ts — non-duplicated exports only) ─────────────
export {
  isValidLocale,
  getLocalizedPath,
  getLocalizedUrl,
  generateHreflangTags,
  formatDate,
  formatYear,
  formatNumber,
  translate,
  isTranslatedRoute,
  getCanonicalPath,
} from './utils';
