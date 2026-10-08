/**
 * Project collection helpers.
 *
 * Content architecture:
 *   src/content/projects/<project-key>/<locale>.mdx
 *   e.g. src/content/projects/profresolve/pt-BR.mdx
 *        src/content/projects/profresolve/en.mdx
 *
 * The project key (first path segment) is the URL slug for every locale, so the
 * language switcher can stay on the same case.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '@/i18n';

export type ProjectEntry = CollectionEntry<'projects'>;

/** Stable per-project key used as the URL slug in both locales. */
export function projectKey(entry: ProjectEntry): string {
  const id = entry.id.replace(/\.(md|mdx)$/i, '');
  const parts = id.split('/');
  return parts.length > 1 ? parts[0] : parts[parts.length - 1];
}

/** Localized case URL (trailing slash matches `trailingSlash: 'always'`). */
export function caseUrl(locale: Locale, key: string): string {
  return locale === 'pt-BR' ? `/projects/${key}/` : `/en/projects/${key}/`;
}

/** Localized projects index URL. */
export function projectsIndexUrl(locale: Locale): string {
  return locale === 'pt-BR' ? '/projects/' : '/en/projects/';
}

/** Only metrics explicitly marked as verified may be rendered publicly. */
export function isVerified(metric: { state?: string }): boolean {
  return metric.state === 'verified';
}

export function verifiedOnly<T extends { state?: string }>(metrics: T[] | undefined): T[] {
  return (metrics ?? []).filter(isVerified);
}

function sortProjects(entries: ProjectEntry[]): ProjectEntry[] {
  return [...entries].sort(
    (a, b) => b.data.order - a.data.order || b.data.year - a.data.year,
  );
}

/** Published (non-draft) projects for a locale, sorted for display. */
export async function getPublishedProjects(locale: Locale): Promise<ProjectEntry[]> {
  const all = await getCollection('projects');
  return sortProjects(
    all.filter((entry) => entry.data.locale === locale && !entry.data.draft),
  );
}

/** A single published project by key + locale (or undefined). */
export async function getPublishedProject(
  key: string,
  locale: Locale,
): Promise<ProjectEntry | undefined> {
  const all = await getCollection('projects');
  const entry = all.find((e) => projectKey(e) === key && e.data.locale === locale);
  return entry && !entry.data.draft ? entry : undefined;
}
