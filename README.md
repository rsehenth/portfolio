# Lucas Sehnem — Technical Product Manager Portfolio

A static portfolio site built with **Astro**, **TypeScript**, **Tailwind CSS**, and **Chart.js**. Deployed on **Cloudflare Pages**.

Bilingual by default: **PT-BR at `/`** and **English at `/en/`** (no auto-redirect; the `PT | EN` switch keeps you on the same page).

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Opens at `http://localhost:4321`

### 3. Build for Production
```bash
npm run build
```
Outputs to `./dist/` — ready for static hosting.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📦 Deploy to Cloudflare Pages

1. Push this repository to GitHub/GitLab
2. In Cloudflare Dashboard → **Pages** → **Create a project**
3. Connect your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node version**: `20` (or latest LTS)
5. Deploy!

> No Cloudflare Workers, Pages Functions, or backend required. Pure static hosting.

---

## 📁 Project Structure

```
src/
├── components/              # Reusable Astro components
│   ├── Header.astro             # Nav + PT|EN switch (keeps current page)
│   ├── Footer.astro
│   ├── Hero.astro
│   ├── HomePage.astro           # Shared homepage (both locales)
│   ├── ProjectsIndex.astro      # Shared projects listing (both locales)
│   ├── ProjectCard.astro
│   ├── MetricCard.astro
│   ├── Tag.astro
│   ├── CaseNavigation.astro     # Prev / next / back (locale-aware)
│   ├── FlowDiagram.astro        # Vertical flow + failure branch
│   ├── ArchitectureDiagram.astro# Conceptual architecture diagram
│   ├── RoleBlocks.astro         # Product / AI / Technical / Hands-on
│   ├── ComparisonBlock.astro    # Two-column comparison (A → B / lists)
│   ├── StatsGrid.astro          # Verified-stats row for case sections
│   ├── Callout.astro
│   ├── DataTable.astro
│   └── AnimatedChart.astro
├── content/
│   └── projects/                # MDX case studies (Content Collections)
│       ├── cultos/
│       │   ├── pt-BR.mdx            # Portuguese content
│       │   └── en.mdx               # English content (same URL slug)
│       ├── profresolve/
│       │   ├── pt-BR.mdx            # Portuguese content
│       │   └── en.mdx               # English content (same URL slug)
│       └── super-squad-ai/
│           └── pt-BR.mdx            # draft: true (hidden until rewritten)
├── i18n/
│   ├── ui.ts                     # All UI strings (nav, labels, meta)
│   ├── routes.ts                 # Localized routes + hreflang links
│   ├── utils.ts                  # Path/locale helpers
│   └── index.ts                  # Barrel exports
├── lib/
│   └── projects.ts               # Collection helpers (key, URL, verified filter)
├── layouts/
│   ├── BaseLayout.astro          # SEO, lang, hreflang, OG/Twitter
│   └── CaseLayout.astro          # Case hero, snapshot, verified results
├── pages/
│   ├── index.astro               # Homepage (PT-BR)
│   ├── about.astro
│   ├── projects/
│   │   ├── index.astro           # /projects/
│   │   └── [slug].astro          # /projects/<key>/
│   └── en/                       # Mirror of every route above
│       ├── index.astro
│       ├── about.astro
│       └── projects/{index,[slug]}.astro
├── styles/global.css             # Design tokens, prose, callouts
├── data/profile.ts               # Profile/links (single source of truth)
├── content/config.ts             # Content Collections schema
└── env.d.ts
```

---

## ✍️ Adding a New Case Study

A case study is **one folder with one file per locale**. The folder name is the URL slug for both languages, so the language switch always stays on the same case.

### 1. Create the content files

```
src/content/projects/your-case-slug/pt-BR.mdx
src/content/projects/your-case-slug/en.mdx
```

```mdx
---
title: Your Project Title
locale: pt-BR               # or en
subtitle: Category shown on the card (e.g. "SaaS de IA para educadores")
description: Card description + fallback meta description.
tagline: Case hero headline (short, editorial).
summary: Case hero paragraph (2 lines max).
year: 2026
role: Technical Product / Product + Hands-on Development   # editable here, never hardcoded
productType: SaaS · IA · Educação
focus: Confiabilidade de IA · Economia de Produto · APIs · Pagamentos
status: Active              # Active | Completed | Archived | On Hold
draft: false                # true = hidden from every route
featured: true              # Shows on homepage
cover: /projects/your-cover.jpg   # only if a REAL image exists
tags: [AI Product, SaaS, APIs]
technologies: [TypeScript, Next.js, PostgreSQL]

# Card metrics — only state: verified renders publicly
metrics:
  - value: "16"
    label: Geradores
    state: verified

# Hero technical-scope snapshot
snapshot:
  primary:
    - value: "16"
      label: Geradores de conteúdo
      state: verified
  secondary:
    - value: "2.4K+"
      label: Test cases
      state: verified

# "Verified Results" section (near the end of the case)
scaleMetrics: [...]         # technical scale numbers
productMetrics: []          # keep empty until real outcomes are confirmed

seo:
  title: "Your Case — Technical Product & AI | Lucas Sehnem"
  description: "Localized meta description…"
order: 5                    # Sort order (higher = first)
---

## O problema

Case study content here…

## Fluxo do produto

<FlowDiagram label="Fluxo principal" steps={['Utilizador', 'Entrada', 'Resultado']} />

## Build vs Buy

<Callout title="Build vs Buy">…</Callout>
```

### 2. Available MDX components

`FlowDiagram` (steps + optional failure `branch`), `ArchitectureDiagram` (steps + services), `RoleBlocks` (four work fronts), `ComparisonBlock` (aligned A → B rows or two independent lists), `StatsGrid` (verified stats row), `Callout` (info/warning/success/error/attribution/demonstrates), `DataTable`, `AnimatedChart`, `MetricCard`, `Tag`.

### 3. Metric states (enforced by the schema)

| State | Renders publicly? |
|-------|-------------------|
| `verified` | ✅ yes |
| `needs_confirmation` | ❌ never (confirm with Lucas first) |
| `hidden` | ❌ never (default) |

Never publish metrics, thresholds or rates that are not explicitly `state: verified`.

### 4. Add a cover image (optional)

Place a **real** image at `public/projects/your-cover.jpg` (16:9, 1200×675px) and set `cover:`. If the file does not exist, leave `cover` out — the layout skips the image instead of rendering a broken container.

### 5. That's It!

The case automatically appears on:
- Homepage (if `featured: true`)
- `/projects/your-case-slug/` (PT) and `/en/projects/your-case-slug/` (EN)
- Prev/next navigation and the language switch (same slug in both locales)
- Sitemap + hreflang alternates

> Entries with `draft: true` are excluded from every route (used to keep unpublished/illustrative cases offline).

---

## 📊 Adding a Metric

### On a project card (homepage + `/projects/`)
Add to the frontmatter `metrics` array of the case's `pt-BR.mdx` / `en.mdx`:

```yaml
metrics:
  - value: "94"
    label: API handlers
    state: verified      # only verified metrics are ever rendered
```

The card shows up to **4 verified metrics** in a 2-column grid; anything else is filtered out at render time.

### On the case page
- `snapshot.primary` / `snapshot.secondary` → "Technical Scope" block under the hero
- `scaleMetrics` → "Technical Scale" inside **Verified Results**
- `productMetrics` → "Product Impact" inside **Verified Results** (keep empty until real outcomes exist — empty blocks are never rendered)

> **Rule:** quantitative claims need `state: verified | needs_confirmation | hidden`. Only `verified` is public; `needs_confirmation` must never render in production.

---

## 🖼️ Adding Images

### In Case Studies (MDX)
```markdown
![Alt text](/projects/your-image.jpg)
```
Place images in `public/projects/` — they're served at `/projects/`.

### In Components
```astro
<img src="/projects/image.jpg" alt="Description" class="rounded-xl border border-border" />
```

### Optimization
- Use **WebP** or **AVIF** for best compression
- Recommended max width: **1600px**
- Astro Assets (`@astrojs/image`) can be added later for automatic optimization

---

## 📋 Adding a Data Table

In any MDX case study:

```mdx
<DataTable
  columns={["Metric", "Before", "After"]}
  rows={[
    ["Delivery cycle", "90 days", "30 days"],
    ["Scope", "100%", "34%"],
    ["Team size", "5", "3"]
  ]}
/>
```

**Props:**
- `columns` (string[]) — Header row
- `rows` (string[][]) — Data rows
- `caption` (string) — Accessible table caption
- `striped` (boolean, default: true) — Zebra striping
- `hoverable` (boolean, default: true) — Row hover effect

---

## 📈 Creating a Chart

In any MDX case study:

```mdx
<AnimatedChart
  type="bar"           // bar | line | doughnut
  title="Delivery Cycle"
  labels={["Before", "After"]}
  values={[90, 30]}
  datasetLabel="Days"
  suffix=" days"
  prefix=""
  height={300}
  description="Chart showing delivery cycle reduction from 90 to 30 days."
/>
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `'bar' \| 'line' \| 'doughnut'` | Yes | Chart type |
| `title` | `string` | Yes | Chart title |
| `labels` | `string[]` | Yes | X-axis labels |
| `values` | `number[]` | Yes | Data values |
| `datasetLabel` | `string` | No | Legend label (hidden by default) |
| `suffix` | `string` | No | Value suffix (e.g., `"%"`) |
| `prefix` | `string` | No | Value prefix (e.g., `"$"`) |
| `colors` | `string[]` | No | Custom colors (CSS variables supported) |
| `height` | `number` | No | Chart height in px (default: 300) |
| `description` | `string` | No | Accessibility description |

**Features:**
- ✅ Responsive, works on mobile/desktop
- ✅ Dark/light mode via CSS variables
- ✅ Subtle entrance animation
- ✅ Accessible: hidden data table + screen reader description
- ✅ Zero JS on pages without charts (island hydration)
- ✅ Fallback: click "View data table" to see raw data

---

## 👤 Editing Profile Content

All reusable content lives in **`src/data/profile.ts`**:

```ts
export const profile = {
  name: 'Lucas Sehnem',
  headline: 'Technical Product Manager',
  tagline: 'I build products at the intersection of AI, Product & Engineering.',
  subheadline: 'Technical Product Manager focused on turning complex problems into simple, scalable products.',
  description: `Longer bio...`,
  email: 'lucas@sehnem.com',
  linkedin: 'https://www.linkedin.com/in/sehenth/',
  github: 'https://github.com/lucassehnem',
  twitter: 'https://x.com/lucassehnem',
  location: 'São Paulo, Brazil',
  avatar: '/avatar.jpg',
  ogImage: '/og-image.jpg',
};

export const skills = {
  product: ['Discovery', 'Prioritization', ...],
  technology: ['AI / LLMs', 'APIs', ...],
  execution: ['Hands-on Building', 'Testing', ...],
};

export const impactMetrics = [
  // Reserved for verified product outcomes.
  // Nothing may be published here without state: 'verified' confirmation.
];

export const navigation = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
];

export const footerLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sehenth/', external: true },
  { label: 'GitHub', href: 'https://github.com/lucassehnem', external: true },
  { label: 'Email', href: 'mailto:lucas@sehnem.com', external: true },
];
```

**Change once, updates everywhere.**

---

## 🎨 Changing Colors / Design Tokens

All colors use **CSS variables** in `src/styles/global.css`:

```css
:root {
  /* Light mode */
  --color-background: #fafafa;
  --color-foreground: #0a0a0a;
  --color-muted: #f5f5f5;
  --color-muted-foreground: #525252;
  --color-border: #e5e5e5;
  --color-accent: #1a1a2e;        /* Primary brand color */
  --color-accent-foreground: #fafafa;
  --color-card: #ffffff;
  --color-card-foreground: #0a0a0a;

  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

.dark {
  /* Dark mode overrides */
  --color-background: #0a0a0a;
  --color-foreground: #fafafa;
  --color-muted: #171717;
  --color-muted-foreground: #a3a3a3;
  --color-border: #262626;
  --color-accent: #fafafa;
  --color-accent-foreground: #0a0a0a;
  --color-card: #171717;
  --color-card-foreground: #fafafa;
}
```

### To Change Brand Color
Update `--color-accent` in both `:root` and `.dark` (use contrasting values).

### Tailwind Integration
Colors are mapped in `tailwind.config.mjs`:
```js
colors: {
  background: 'var(--color-background)',
  foreground: 'var(--color-foreground)',
  accent: 'var(--color-accent)',
  // ...
}
```
Use in components: `bg-accent`, `text-accent-foreground`, `border-border`, etc.

---

## 🧭 Editing Navigation

Edit `navigation` array in `src/data/profile.ts`:

```ts
export const navigation = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },      // Add new page
  { label: 'Contact', href: '/#contact' },
];
```

Header and footer update automatically.

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run astro` | Run Astro CLI (e.g., `astro check`) |

---

## 📝 Content Collections Schema

Defined in `src/content/config.ts`:

```ts
const metric = z.object({
  value: z.string(),
  label: z.string(),
  // verified | needs_confirmation (default) | hidden — only 'verified' renders
  state: z.enum(['verified', 'needs_confirmation', 'hidden']).default('needs_confirmation'),
  context: z.string().optional(),
  project: z.string().optional(),
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    locale: z.enum(['pt-BR', 'en']),       // file lives at <key>/<locale>.mdx
    subtitle: z.string().optional(),        // card category
    description: z.string(),                // card + meta description
    tagline: z.string().optional(),         // case hero headline
    summary: z.string().optional(),         // case hero paragraph
    year: z.number().int().min(2000).max(2100),
    role: z.string(),                       // role text lives in content, not code
    productType: z.string().optional(),
    focus: z.string().optional(),
    stage: z.string().optional(),           // free-form stage label (e.g. "MVP · Early Release")
    stageNote: z.string().optional(),       // note rendered under the stage
    openSourceUrl: z.string().optional(),   // upstream link → hero "Base" row (fork attribution)
    status: z.enum(['Active', 'Completed', 'Archived', 'On Hold']),
    draft: z.boolean().default(false),      // true = hidden from every route
    featured: z.boolean().default(false),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    demonstrates: z.array(z.string()).default([]),    // small capability hints on cards
    technologies: z.array(z.string()).default([]),
    metrics: z.array(metric).default([]),            // project cards
    snapshot: z.object({                             // case "Technical Scope"
      primary: z.array(metric).default([]),
      secondary: z.array(metric).default([]),
    }).optional(),
    scaleMetrics: z.array(metric).default([]),       // Verified Results: scale
    productMetrics: z.array(metric).default([]),     // Verified Results: impact
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }).optional(),
    order: z.number().int().default(0),
  }),
});
```

**Validation runs at build time** — invalid frontmatter fails the build.

---

## ♿ Accessibility Features

- Semantic HTML5 structure
- Skip-to-main-content link
- Focus-visible outlines
- ARIA labels on interactive elements
- Color contrast ratios (WCAG AA)
- Reduced motion support (`prefers-reduced-motion`)
- Chart.js accessible descriptions + hidden data tables
- View Transitions API (opt-in, same-origin)

---

## ⚡ Performance

- **Static HTML** — No JS by default
- **Islands** — Only interactive components hydrate (`AnimatedChart`, mobile menu)
- **Lazy loading** — Images, charts
- **Optimized fonts** — Preconnect + `font-display: swap`
- **CSS variables** — No runtime theme switching JS
- **Minified HTML/CSS/JS** — Production build
- **Sitemap & robots.txt** — Auto-generated

---

## 🧪 Type Safety

- **Strict TypeScript** (`astro/tsconfigs/strict`)
- **Content Collections** — Typed frontmatter + content
- **Component props** — Typed interfaces
- **Path aliases** — `@/*` → `src/*`

Run type check:
```bash
npx astro check
```

---

## 📄 License

MIT — Feel free to use as a template for your own portfolio.

---

## 🙋 Questions?

Open an issue or reach out via [LinkedIn](https://www.linkedin.com/in/sehenth/) or [Email](mailto:lucas@sehnem.com).