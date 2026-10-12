# Lucas Sehnem — Technical Product Manager Portfolio

A static portfolio site built with **Astro**, **TypeScript**, **Tailwind CSS**, and **Chart.js**. Deployed on **Cloudflare Pages**.

Bilingual by default: **PT-BR at `/`** and **English at `/en/`** (no auto-redirect; the `PT | EN` switch keeps you on the same page).

> **Agentes de IA:** leiam `AGENTS.md` antes de editar.

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
│           ├── pt-BR.mdx            # Portuguese content
│           └── en.mdx               # English content (same URL slug)
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

**Guia completo: [`AGENTS.md`](./AGENTS.md) (checklists, mapa de tarefas, vocabulário de status e armadilhas) + [`docs/project-template.mdx`](./docs/project-template.mdx) (template pronto para copiar).**

Resumo:
- A pasta é a URL: `src/content/projects/<slug>/pt-BR.mdx` e `en.mdx`, com os mesmos campos estruturais nos dois arquivos.
- Copie o template, ajuste `locale` em cada arquivo e apague os comentários.
- Componentes disponíveis no corpo do MDX: mapa nos dois `src/pages/**/projects/[slug].astro` e em `src/components/index.ts`.
- Validação: `npm run build`, depois abra `/projects/`, `/projects/<slug>/` e `/en/projects/<slug>/`.

---

## 📊 Adding a Metric

### On a project card (`/projects/`)
Add to the frontmatter `metrics` array of the case's `pt-BR.mdx` / `en.mdx`:

```yaml
metrics:
  - value: "94"
    label: API handlers
    state: verified      # only verified metrics are ever rendered
```

The card shows up to **3 verified metrics** in a single row; anything else is filtered out at render time.

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
  email: 'lucas.sehnemb@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sehenth/',
  github: 'https://github.com/lucassehnem',
  twitter: 'https://x.com/lucassehnem',
  location: 'Santiago, RS, Brazil',
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
  { label: 'Email', href: 'mailto:lucas.sehnemb@gmail.com', external: true },
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

O contrato do frontmatter é o schema Zod de **`src/content/config.ts`** — fonte de verdade, validado em cada `npm run build`.

- Campos, tipos e enums: `src/content/config.ts`
- Template com todos os campos comentados: [`docs/project-template.mdx`](./docs/project-template.mdx)
- Onde mexer em cada coisa, limites e armadilhas: [`AGENTS.md`](./AGENTS.md)

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

Open an issue or reach out via [LinkedIn](https://www.linkedin.com/in/sehenth/) or [Email](mailto:lucas.sehnemb@gmail.com).

---

## 🤖 Adicionar um projeto com IA

Cole este bloco numa conversa com uma IA e preencha. A IA segue o `AGENTS.md` (template mínimo `docs/project-template-card.mdx`, dois idiomas, `npm run build`, sem commit):

```
Adicione um projeto. Siga o AGENTS.md.
Nome: ...
Descrição (1-2 frases): ...
Status: (ativo / em desenvolvimento / funcional / em discovery / arquivado)
Seção: (destaque / produtos / ferramentas / discovery / arquivados)
Tags: ...
Métricas verificadas (se houver): ...
Sem página de case por enquanto. Não faça commit.
```
