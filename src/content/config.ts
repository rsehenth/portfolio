import { defineCollection, z } from 'astro:content';

/**
 * Metric state rules (see content rules):
 * - verified: may be rendered publicly
 * - needs_confirmation: never rendered (must be confirmed by Lucas first)
 * - hidden: intentionally not rendered
 */
const metricSchema = z.object({
  value: z.string(),
  label: z.string(),
  state: z.enum(['verified', 'needs_confirmation', 'hidden']).default('needs_confirmation'),
  // Listing-card presentation only (never read by case pages):
  // 'figure' → big number style in the card metric row (max 3, one row)
  // 'text'   → never styled as a number; surfaced through `cardHighlights` instead
  display: z.enum(['figure', 'text']).default('figure'),
  context: z.string().optional(),
  project: z.string().optional(),
});

/**
 * Listing-only status badge for /projects cards: colored dot + text.
 * Kept separate from `statusBadge` so case pages keep their own status wording.
 */
const cardBadgeSchema = z.object({
  label: z.string(),
  tone: z.enum(['active', 'development', 'functional', 'discovery', 'archived']),
});

/** Project grouping on the /projects listing — independent from `status`. */
const projectSection = z.enum(['featured', 'products', 'tools', 'discovery', 'archived']);
export type ProjectSection = z.infer<typeof projectSection>;

const caseSummarySchema = z.object({
  problem: z.string(),
  role: z.string(),
  result: z.string(),
  keyDecision: z.string(),
});

const statusEvidenceSchema = z.object({
  stage: z.string(),
  evidence: z.string(),
  nextValidation: z.string().optional(),
});

type Metric = z.infer<typeof metricSchema>;

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // Locale of this content file: src/content/projects/<key>/<locale>.mdx
    locale: z.enum(['pt-BR', 'en']),
    // Category shown on project cards
    subtitle: z.string().optional(),
    // Card description / fallback meta description
    description: z.string(),
    // Case hero headline
    tagline: z.string().optional(),
    // Case hero paragraph
    summary: z.string().optional(),
    year: z.number().int().min(2000).max(2100),
    // Free-form role label — editable here, never hardcoded in components
    role: z.string(),
    productType: z.string().optional(),
    focus: z.string().optional(),
    // Free-form stage label (e.g. "MVP · Primeira release") — overrides the status row
    stage: z.string().optional(),
    // Optional note rendered under the stage (e.g. commercial status)
    stageNote: z.string().optional(),
    caseSummary: caseSummarySchema.optional(),
    statusEvidence: statusEvidenceSchema.optional(),
    statusBadge: z.string().optional(),
    // Upstream/open-source attribution link (rendered on the "Base" row)
    openSourceUrl: z.string().optional(),
    openSourceLabel: z.string().optional(),
    status: z.enum(['Active', 'Completed', 'Archived', 'Discovery']),
    // Section shown on the /projects listing (independent from `status`)
    section: projectSection,
    // Listing-only badge (dot + text). Case pages keep using `statusBadge`.
    cardBadge: cardBadgeSchema,
    // Listing-only textual highlights line under the card metrics
    cardHighlights: z.array(z.string()).default([]),
    // Draft entries are excluded from every route (used to hide unpublished cases)
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
    // Small square logo/icon shown on project cards (ideal: 120×120 px, 1:1 ratio)
    logo: z.string().optional(),
    // CSS object-position for the logo image (e.g. 'center', 'top left') — defaults to 'center'
    logoPosition: z.string().optional(),
    tags: z.array(z.string()).default([]),
    // Small capability hints shown on project cards (never visual-heavy)
    demonstrates: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    // Metrics displayed on the project card (only state === 'verified' render)
    metrics: z.array(metricSchema).default([]),
    // Technical scope snapshot shown in the case hero area
    snapshot: z
      .object({
        primary: z.array(metricSchema).default([]),
        secondary: z.array(metricSchema).default([]),
      })
      .optional(),
    // "Technical Scale" block in the Verified Results section
    scaleMetrics: z.array(metricSchema).default([]),
    // "Product Impact" block — kept prepared, never filled with invented numbers
    productMetrics: z.array(metricSchema).default([]),
    // External product URL (rendered as a discrete CTA in the case hero)
    externalUrl: z.string().url().optional(),
    // Localized label for the external CTA (e.g. "Visit ProfResolve ↗")
    externalUrlLabel: z.string().optional(),
    // Controls how the snapshot section is rendered.
    // 'default'           → current layout (no headings, single grid)
    // 'product-technical' → opt-in split: Product heading + Technical Scale heading
    snapshotMode: z.enum(['default', 'product-technical']).default('default').optional(),
    // Per-case SEO (titles/descriptions)
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
    // Opt-in dual-view toggle (Resumo / Case completo)
    views: z.boolean().default(false).optional(),
    // Manual reading time overrides for the view toggle (in minutes, min 1)
    readingTime: z
      .object({
        basic: z.number().int().min(1).optional(),
        full: z.number().int().min(1).optional(),
      })
      .optional(),
    // When true, the card CTA ("Ver Case") is rendered as a disabled label instead of a link.
    // Use for projects that don't have a case page yet.
    noCase: z.boolean().default(false).optional(),
    // Order in listings
    order: z.number().int().default(0),
  }),
});

export type ProjectMetric = Metric;

export const collections = { projects };
