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
import type { ProjectSection } from '@/content/config';

export type ProjectEntry = CollectionEntry<'projects'>;

/**
 * Canonical section order for listings and case navigation.
 * Must match the `section` enum in src/content/config.ts.
 * NOT derived from ui translations (stable across locales).
 */
export const SECTION_ORDER: ProjectSection[] = [
  'featured',
  'products',
  'discovery',
  'tools',
  'archived',
];

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
  return [...entries].sort((a, b) => {
    const rankA = SECTION_ORDER.indexOf(a.data.section);
    const rankB = SECTION_ORDER.indexOf(b.data.section);
    const sectionDiff = rankA - rankB;
    if (sectionDiff !== 0) return sectionDiff;
    // Within the same section: higher order first, then more recent year first
    return b.data.order - a.data.order || b.data.year - a.data.year;
  });
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

export type BadgeTone = 'active' | 'development' | 'functional' | 'discovery' | 'archived';

const TONE_BY_STATUS: Record<string, BadgeTone> = {
  Active: 'active',
  Completed: 'archived',
  Archived: 'archived',
  Discovery: 'discovery',
};

/** Status tone of a project: its listing badge, else its canonical status. */
export function badgeToneOf(data: ProjectEntry['data']): BadgeTone {
  return data.cardBadge?.tone ?? TONE_BY_STATUS[data.status] ?? 'archived';
}
