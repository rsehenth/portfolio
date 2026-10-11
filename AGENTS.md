# AGENTS.md

Qualquer agente de IA que edite este repositório deve ler este arquivo antes de alterar conteúdo, i18n ou componentes de projeto.
Se este arquivo e o código divergirem, **o código vale**: avise e corrija este arquivo.

> **Manutenção:** se mudar campos, seções ou rotas, atualize este arquivo na mesma tarefa.
> As referências usam arquivo + símbolo (sem número de linha): localize o símbolo com grep.

## 1. Arquitetura em 30 segundos

- Astro 100% estático, publicado no Cloudflare Pages.
- Dois idiomas por **arquivos duplicados**: `src/pages/` (pt-BR) e `src/pages/en/` (en). Não use `astro:i18n` nem rotas `[locale]`.
- Projetos: `src/content/projects/<slug>/pt-BR.mdx` + `en.mdx`. **A pasta é a URL**: `/projects/<slug>/` e `/en/projects/<slug>/`.
- `src/content/config.ts`: schema Zod, o contrato do frontmatter.
- `src/i18n/ui.ts`: textos de UI, editorial da Home (`homeProjects`), seções do /projects (`projectsPage.sections`) e tradução do enum de status. Os blocos PT e EN são espelhados no mesmo objeto: edite sempre os dois.
- `src/lib/projects.ts`: `SECTION_ORDER`, ordenação (`order`, depois `year`), filtro de `draft`, URLs.

## 2. Quero mexer em… → onde

| Tarefa | Onde |
|---|---|
| Dados de um projeto (texto, status, métricas, seção, ordem) | `src/content/projects/<slug>/pt-BR.mdx` **e** `en.mdx` |
| Campos permitidos / obrigatórios | `src/content/config.ts` e `docs/project-template.mdx` |
| Visual do card do /projects | `src/components/ProjectCard.astro` |
| Seções do /projects (variante do card, nº de colunas) | `src/components/ProjectsIndex.astro` (`variantFor`, `gridClass`) |
| Título/subtítulo de uma seção | `src/i18n/ui.ts` → `projectsPage.sections` (PT e EN) |
| Ordem das seções | `SECTION_ORDER` (`projects.ts`) **e** `projectsPage.sections` (PT e EN) **e** enum `projectSection` (`config.ts`) |
| Card de projeto na Home | `featuredOrder` (`src/components/HomePage.astro`) + `homeProjects.projects.<slug>` (`ui.ts`, PT e EN) |
| Página de case | `src/layouts/CaseLayout.astro` e `src/pages/**/projects/[slug].astro` |
| Componentes usáveis no corpo do MDX | mapa de componentes em `src/pages/projects/[slug].astro`, `src/pages/en/projects/[slug].astro` e `src/components/index.ts` (ligado em `astro.config.mjs`) |
| Anterior/Próximo entre cases | `src/components/CaseNavigation.astro` (usa a ordenação de `projects.ts`) |
| Seletor Resumo/Case completo | `docs/case-views.md` |

## 3. Checklists

**a) Projeto novo com case**
1. Copie `docs/project-template.mdx` para `src/content/projects/<slug>/pt-BR.mdx` e duplique para `en.mdx`, com os **mesmos campos estruturais**.
2. `locale` igual ao nome do arquivo. `section` e `cardBadge` são obrigatórios.
3. `logo`/`cover` só se o arquivo existir em `public/projects/<slug>/` (nos dois arquivos).
4. Rode o build e confira `/projects/`, `/projects/<slug>/` e `/en/projects/<slug>/`.

**b) Projeto sem case:** `noCase: true` e o bloco "PÁGINA DE CASE" inteiro apagado do template. Exemplo real: `project-chat` — entre os campos de case, só mantém `scaleMetrics: []` e `productMetrics: []`. Nunca ponha um projeto `noCase` em `featuredOrder` (o card da Home sempre linka).

**c) Mudar status:** veja §4. Altere todos os campos relevantes, nos dois idiomas.

**d) Métricas, highlights, tags**
- Números do card: `metrics` com `state: verified` e `display: figure`, **máx. 3** (o 4º é cortado em silêncio). `needs_confirmation` e `hidden` não renderizam.
- `display: text` não vira número: duplique o texto à mão em `cardHighlights`.
- `demonstrates`: 3 visíveis no card. `tags`: 3 no card, todas no case.
- `metrics` é só do card. O case usa `snapshot`, `scaleMetrics` e `productMetrics`.
- Home: `highlights` (máx. 2) e `focus` (máx. 3) em `homeProjects`, **sem** o filtro `verified`: escreva só o que já está verificado.

**e) Reordenar:** `order` nos dois idiomas (maior = primeiro, **dentro da seção**). Empate: `year` decrescente; não dependa de empate. Muda também o Anterior/Próximo de todos os cases.

**f) Mover de seção:** `section` nos dois MDX. `archived` usa a variante compacta e `featured` a grande (`variantFor`). Seção que fica vazia some da página. O Anterior/Próximo muda.

**g) Seção nova (4 pontos obrigatórios):** enum `projectSection` (`config.ts`) → `SECTION_ORDER` (`projects.ts`) → `projectsPage.sections` PT → idem EN. Opcional: `variantFor`/`gridClass` em `ProjectsIndex.astro`.
Se faltar o `SECTION_ORDER`, a seção ordena antes de todas (silencioso). Se faltar em `ui.ts`, os projetos ficam invisíveis no /projects.

**h) Destaque na Home**
1. `featuredOrder` em `HomePage.astro` (2 slots).
2. `homeProjects.projects.<slug>` em `ui.ts`, PT e EN (`category`, `description`, `highlights`, `focus`).
Isso é independente de `section: featured` (que só afeta o /projects). Chave sem entrada em `homeProjects` deixa a célula vazia, sem erro.

## 4. Vocabulário de status

| PT | EN | `tone` | Exemplo |
|---|---|---|---|
| Ativo | Active | `active` | ProfResolve |
| Em desenvolvimento | In development | `development` | CultoOS |
| Funcional (rótulos compostos: "Funcional · Protótipo") | Working ("Working · Prototype") | `functional` | Mosaic, Universal Docs |
| Em discovery | In discovery | `discovery` | Project Stream |
| Arquivado | Archived | `archived` | Cripto Host |
| Ferramenta de uso próprio | Own-use tool | `development` | Super Squad AI |
| Concluído | Completed | via `toneFallback` | (nenhum hoje) |

**Regra:** `cardBadge`, `statusBadge`, `stage` e `statusEvidence.stage` de um mesmo projeto contam a mesma história, nos dois idiomas.

Campos que carregam status (mude todos os relevantes, em PT e EN):
- `cardBadge` (`label` + `tone`): só o card do /projects.
- `statusBadge`: linha de status do case.
- `stage`: rótulo livre no case.
- `statusEvidence.stage`: bloco "Status e evidências".
- `status` (enum `Active | Completed | Archived | Discovery`): fallback e tradução.
- Home: `homeProjects.projects.<slug>.statusBadge` (`ui.ts`, PT e EN).

Fallbacks: card = `cardBadge.label` → `statusBadge` → tradução de `status`. Case = `statusBadge` → `stage` → tradução de `status`.
`status` e `section` são independentes de propósito. Mudar o **enum** exige `config.ts`, o mapa `status` em `ui.ts` (PT e EN) e `toneFallback` em `ProjectCard.astro`.

## 5. Armadilhas (o build não avisa)

1. **PT ≠ EN:** `section`, `order`, `status`, `draft`, `noCase`, `views`, `year`, `cardBadge.tone` e as contagens de `tags`/`metrics` devem ser iguais nos dois arquivos.
2. **`order` tem efeito colateral:** é por seção, mas a ordenação global alimenta o Anterior/Próximo de todos os cases.
3. **Seção vive em vários lugares** (veja §2 e §3g).
4. **Typo no frontmatter passa:** o Zod descarta chaves desconhecidas (`cardbade:` cai no fallback sem erro).
5. **Projeto só em um idioma** (ou `draft` só em um): a rota do outro idioma dá 404, mas o hreflang da página existente aponta para ela. O sitemap não: ele só lista as rotas realmente geradas.
6. **`locale` ≠ nome do arquivo:** gera entradas duplicadas.
7. **Registro de componentes MDX em 3 lugares** (veja §2). Componente novo vai nos três.
8. **Não há CI e `astro check` não roda no build:** erro de tipo vai para produção se ninguém rodar.
9. **`display: text` não é automático** e `needs_confirmation` some do card sem aviso.
10. **Pastas com prefixo `_` dentro de `src/content/` são ignoradas pelo Astro** (o build passa sem ler o conteúdo). Para teste temporário use outro nome (ex.: `zz-test`) e confira a contagem de páginas do build. Remova ao terminar.

## 6. Não fazer

- Reescrever o site, migrar para `astro:i18n`, criar CMS/registry JSON ou adicionar dependências sem pedido explícito.
- Unificar os campos de status num só: a separação card/case/Home é intencional.
- Mover o editorial da Home (`homeProjects`) para o frontmatter.
- Dividir `ui.ts` por idioma (perde a checagem de paridade de chaves do `astro check`).
- Reorganizar o CSS de `ProjectCard.astro` "por limpeza": é onde moram os bugs de layout.
- Inventar números: só `state: verified` é publicado.

## 7. Validação

| Comando | Uso |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build estático em `dist/` (valida o schema de todo frontmatter) |
| `npx astro check` | checagem de tipos (rode antes de commitar) |
| `npm run preview` | servir o `dist/` |

(`npm run check:content`: documentar aqui somente quando o script existir.)

Antes de encerrar uma tarefa: build + `astro check` + abrir `/`, `/projects/` e um case, nos dois idiomas.

**`dist/` não é reprodutível byte a byte:** ids aleatórios (prefixos `er-`, `cc-`, `chart-`, gerados em `EmailReveal.astro`, `CaseCarousel.astro` e `AnimatedChart.astro`) mudam a cada build. Ao comparar `dist/` antes/depois, normalize ou ignore esses diffs:
- Com sed (no Windows use o do Git for Windows, `C:\Program Files\Git\usr\bin\sed.exe`): `sed -E 's/(er|cc|chart)-[a-z0-9]{6,9}/\1-X/g'`
- PowerShell: `(Get-Content arquivo -Raw) -replace '(er|cc|chart)-[a-z0-9]{6,9}','$1-X'`

## 8. Arquivos-ponteiro

Estes arquivos só apontam para este `AGENTS.md`. Não coloque conteúdo próprio neles, e se alterar este arquivo, não precisa mexer neles.

- `CLAUDE.md` — importa este arquivo (`@AGENTS.md`).

Sem ponteiro: OpenCode, Codex e Kiro leem `AGENTS.md` nativamente; o Claude Code só o lê se não houver `CLAUDE.md`, por isso existe o import acima.
