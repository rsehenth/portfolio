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

/**
 * Campos que só existem em projeto com case. A regra R3 do superRefine impede
 * que um projeto `noCase: true` carregue dados de case esquecidos.
 */
const CASE_ONLY_FIELDS = [
  'views',
  'readingTime',
  'caseSummary',
  'statusEvidence',
  'snapshot',
  'externalUrl',
  'seo',
] as const;

/** `true` quando o valor traz conteúdo de verdade (não só o default). */
const isFilled = (value: unknown): boolean => {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') return value.trim() !== '';
  if (typeof value === 'boolean') return value;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).some(isFilled);
  }
  return true;
};

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
    status: z
      .enum(['Active', 'Completed', 'Archived', 'Discovery'])
      .describe('Status canonico do projeto: Active | Completed | Archived | Discovery (fallback de exibicao)'),
    // Section shown on the /projects listing (independent from `status`)
    section: projectSection.describe('Secao do /projects: featured | products | tools | discovery | archived (independente de status)'),
    // Listing-only badge (dot + text). Case pages keep using `statusBadge`.
    cardBadge: cardBadgeSchema.describe(
      'Badge do card do /projects: label + tone (active | development | functional | discovery | archived)',
    ),
    // Listing-only textual highlights line under the card metrics
    cardHighlights: z
      .array(z.string())
      .default([])
      .describe('Textos lineares exibidos sob as metricas do card; obrigatorio se metrics tem display "text"'),
    // Draft entries are excluded from every route (used to hide unpublished cases)
    draft: z.boolean().default(false),
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
    metrics: z
      .array(metricSchema)
      .default([])
      .describe('Metricas do card: so state "verified" + display "figure" renderizam (maximo 3)'),
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
    noCase: z
      .boolean()
      .default(false)
      .optional()
      .describe('true = sem pagina de case; o card nao vira link e os campos de case ficam proibidos (R3)'),
    // Order in listings
    order: z
      .number()
      .int()
      .default(0)
      .describe('Ordem na listagem: maior = primeiro, dentro da secao; sem repetir na mesma secao (P5)'),
  })
    .strict()
    .superRefine((data, ctx) => {
      // R1 — no máximo 3 métricas de destaque no card (o resto é cortado em silêncio)
      const figureCount = data.metrics.filter(
        (metric) => metric.state === 'verified' && metric.display === 'figure',
      ).length;
      if (figureCount > 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['metrics'],
          message: `metrics: no máximo 3 métricas com state "verified" e display "figure"; encontradas ${figureCount}. Mude state/display de ${figureCount - 3} delas ou mova o excesso para cardHighlights.`,
        });
      }

      // R2 — métrica de texto não vira número: o texto precisa estar em cardHighlights
      const textCount = data.metrics.filter((metric) => metric.display === 'text').length;
      if (textCount > 0 && data.cardHighlights.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cardHighlights'],
          message: `cardHighlights: metrics tem ${textCount} métrica(s) com display "text", mas cardHighlights está vazio. Duplique o texto de cada métrica em cardHighlights.`,
        });
      }

      // R3 — noCase não convive com campos de case
      if (data.noCase === true) {
        for (const field of CASE_ONLY_FIELDS) {
          if (isFilled((data as unknown as Record<string, unknown>)[field])) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [field],
              message: `${field}: projeto com noCase: true não pode ter ${field} preenchido. Remova o campo ou desative noCase.`,
            });
          }
        }
      }

      // R4 — snapshotMode "product-technical" só renderiza com snapshot
      if (data.snapshotMode === 'product-technical' && !isFilled(data.snapshot)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['snapshotMode'],
          message:
            'snapshotMode: "product-technical" exige snapshot preenchido. Adicione snapshot ou use snapshotMode "default".',
        });
      }

      // R5 — CTA externo sem rótulo
      if (isFilled(data.externalUrl) && !isFilled(data.externalUrlLabel)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['externalUrlLabel'],
          message:
            'externalUrlLabel: externalUrl está preenchido, mas externalUrlLabel não. Adicione o rótulo do link externo.',
        });
      }
    }),
});

export type ProjectMetric = Metric;

export const collections = { projects };
