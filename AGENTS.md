# AGENTS.md

Qualquer agente de IA que edite este repositório deve ler este arquivo antes de alterar conteúdo, i18n ou componentes de projeto.
Se este arquivo e o código divergirem, **o código vale**: avise e corrija este arquivo.

> **Manutenção:** se mudar campos, seções ou rotas, atualize este arquivo na mesma tarefa. As referências usam arquivo + símbolo (sem número de linha) — localize o símbolo com grep.

## 1. Arquitetura em 30 segundos

- Astro 100% estático, publicado no Cloudflare Pages.
- Dois idiomas por **arquivos duplicados**: `src/pages/` (pt-BR) e `src/pages/en/` (en). Não use `astro:i18n` nem rotas `[locale]`.
- Projetos: `src/content/projects/<slug>/pt-BR.mdx` + `en.mdx`. **A pasta é a URL**: `/projects/<slug>/` e `/en/projects/<slug>/`.
- `src/content/config.ts`: schema Zod, o contrato do frontmatter.
- `src/i18n/ui.ts`: textos de UI, editorial da Home (`homeProjects`), seções do /projects (`projectsPage.sections`) e tradução do enum de status. Os blocos PT e EN são espelhados no mesmo objeto: edite sempre os dois.
- `src/lib/projects.ts`: `SECTION_ORDER`, ordenação (`order`, depois `year`), filtro de `draft`, URLs.
- `src/styles/site.css`: o sistema visual (tokens, `.field-ink`, Home, case, Sobre). `global.css` só tem a base Tailwind (botões, prose, tag). Não crie um terceiro lugar para tokens. Ver `DESIGN.md`.

## 2. Quero mexer em… → onde

| Tarefa | Onde |
|---|---|
| Dados de um projeto (texto, status, métricas, seção, ordem) | `src/content/projects/<slug>/pt-BR.mdx` **e** `en.mdx` |
| Campos permitidos / obrigatórios | `src/content/config.ts`; template de card `docs/project-template-card.mdx` ou de case `docs/project-template.mdx` |
| Visual do card do /projects | `src/components/ProjectCard.astro` (capa 16:10, status, título, descrição, números; `tags` não aparecem no card) |
| Seções do /projects (variante do card, layout por nº de itens) | `src/components/ProjectsIndex.astro` (`variantFor`, `layout`) e `src/components/ProjectsSection.astro`. A página abre num palco escuro com título + seção `featured`. Por nº de itens: 1 = linha larga (imagem ao lado do texto); 2 = duas colunas; 3 = linha larga de abertura + duas colunas; 4 = 2×2; 5+ = três colunas. Linhas largas alternam o lado da imagem. `discovery` e `archived` usam o fundo suave. |
| Imagem de projeto sem `cover` | `src/components/ProjectPlate.astro`: emblema 16:10 por chave de projeto (`marks`), na cor do status. Chave desconhecida cai nas iniciais. Para um projeto novo, desenhe a marca ali ou adicione um `cover` real |
| Título/subtítulo de uma seção | `src/i18n/ui.ts` → `projectsPage.sections` (PT e EN) |
| Ordem das seções | `SECTION_ORDER` (`projects.ts`) **e** `projectsPage.sections` (PT e EN) **e** enum `projectSection` (`config.ts`) |
| Card de projeto na Home | `featuredOrder` (`src/components/HomePage.astro`, 3 linhas alternadas) + `homeProjects.projects.<slug>` (`ui.ts`, PT e EN) + `cover:` do projeto |
| Imagens do hero da Home | `hero.visual` em `ui.ts` (PT e EN), ligado a `src/components/Hero.astro` |
| Página Sobre | `src/components/AboutPage.astro` (as rotas `about.astro` e `en/about.astro` só chamam o componente) |
| Página de case | `src/layouts/CaseLayout.astro` e `src/pages/**/projects/[slug].astro` |
| Componentes usáveis no corpo do MDX | mapa de componentes em `src/pages/projects/[slug].astro`, `src/pages/en/projects/[slug].astro` e `src/components/index.ts` (ligado em `astro.config.mjs`) |
| Slot de mídia ainda sem arquivo (case em desenvolvimento) | `src/components/MediaSlot.astro` (registrado nos 3 lugares da armadilha 16); mostra uma linha compacta de "prévia a caminho" quando o arquivo não existe em `public/`. Caminhos previstos por case ficam em `docs/media-slots.md` |
| Anterior/Próximo entre cases | `src/components/CaseNavigation.astro` (usa a ordenação de `projects.ts`) |
| Seletor Resumo/Case completo | `docs/case-views.md` |

## 3. Adicionar projeto / checklists

### Adicionar projeto (fluxo curto — padrão: projeto só com card)

1. Peça ou confirme com o dono apenas: nome, descrição curta (1–2 frases), status, seção, 2–3 tags e métricas já verificadas. Sem métrica se não houver; nunca invente números, descrição nem status.
2. Copie `docs/project-template-card.mdx` para `src/content/projects/<slug>/pt-BR.mdx` e `en.mdx` (mesmos campos nos dois, texto traduzido). Status, `cardBadge` e `tone` seguem a §4.
3. `order`: topo da seção = maior valor existente nela + 1; fim = menor valor − 1; nunca repetir na mesma seção (P5 derruba o build).
4. Rode `npm run build` e confira o card em `/projects/` e `/en/projects/`.
5. Não faça commit, branch ou PR, a menos que o dono peça.

### Checklists

**a) Projeto novo com case (só nesse caso use o completo):** `docs/project-template.mdx`. O padrão para projeto novo é o mínimo `docs/project-template-card.mdx`, que é só para card, sem case.
1. Copie o template para `src/content/projects/<slug>/pt-BR.mdx` e duplique para `en.mdx`, com os **mesmos campos estruturais**.
2. `locale` igual ao nome do arquivo. `section` e `cardBadge` são obrigatórios.
3. `logo`/`cover` só se o arquivo existir em `public/projects/<slug>/` (nos dois arquivos). `cover`: captura real em 16:10 (ex.: 1600×1000, `.webp`, ~100–350 KB), usada na Home, no /projects e no topo do case. `logo`: 256×256. Sem `cover`, o card do /projects mostra um bloco com o logo ou as iniciais.
4. Rode o build e confira `/projects/`, `/projects/<slug>/` e `/en/projects/<slug>/`.

**b) Projeto sem case (padrão):** copie `docs/project-template-card.mdx` — só campos de card, com `noCase: true` e nenhum campo de case (R3 derruba o build). Hoje nenhum projeto publicado usa `noCase`; o template continua valendo para o próximo card isolado. Nunca ponha um projeto `noCase` em `featuredOrder` (o card da Home sempre linka).

**c) Mudar status:** veja §4. Altere todos os campos relevantes, nos dois idiomas.

**d) Métricas, highlights, tags**
- Números do card: `metrics` com `state: verified` e `display: figure`, **máx. 3** (a 4ª derruba o build — R1). `needs_confirmation` e `hidden` não renderizam, de propósito.
- `display: text` não vira número: duplique o texto à mão em `cardHighlights`.
- `demonstrates`: 3 visíveis no card, só quando o projeto não tem `cardHighlights`. `tags`: só no case (coluna lateral "Temas").
- `metrics` é só do card. O case usa `snapshot`, `scaleMetrics` e `productMetrics`.
- Home: `highlights` (máx. 2) e `focus` (máx. 3) em `homeProjects`, **sem** o filtro `verified`: escreva só o que já está verificado.

**e) Reordenar:** `order` nos dois idiomas (maior = primeiro, **dentro da seção**). Empate: `year` decrescente; não dependa de empate. Muda também o Anterior/Próximo de todos os cases.

**f) Mover de seção:** `section` nos dois MDX. `archived` usa a variante compacta e `featured` a grande (`variantFor`). Seção que fica vazia some da página. O Anterior/Próximo muda.

**g) Seção nova (4 pontos obrigatórios):** enum `projectSection` (`config.ts`) → `SECTION_ORDER` (`projects.ts`) → `projectsPage.sections` PT → idem EN. Opcional: `variantFor`/`layout` em `ProjectsIndex.astro` e `ProjectsSection.astro`.
Se faltar em qualquer lugar, o **P4** derruba o `npm run check:content`; sem a checagem, a seção ordena antes de todas e os projetos somem do /projects.

**h) Destaque na Home**
1. `featuredOrder` em `HomePage.astro` (hoje 3 chaves: ProfResolve, Super Squad AI, CLT Simulator). Cada destaque é uma linha: imagem (`cover`, 16:10) de um lado e texto do outro, alternando a partir de 900px; abaixo disso, imagem sobre texto.
2. `homeProjects.projects.<slug>` em `ui.ts`, PT e EN (`category`, `description`, `highlights`, `focus`).
Isso é independente de `section: featured` (que só afeta o /projects). Chave sem entrada em `homeProjects` deixa a célula vazia — hoje é erro (**P6**).

## 4. Vocabulário de status

| PT | EN | `tone` | Exemplo |
|---|---|---|---|
| Ativo | Active | `active` | ProfResolve |
| Em desenvolvimento | In development | `development` | CultoOS |
| Funcional (rótulos compostos: "Funcional · Protótipo") | Working ("Working · Prototype") | `functional` | Mosaic, Universal Docs |
| Em discovery | In discovery | `discovery` | AI Command Center |
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

## 5. Armadilhas (hoje todas falham alto)

O schema derruba o build e o `npm run check:content` derruba o conteúdo. O código entre parênteses é a regra que pega.

1. **PT ≠ EN** (P3): `section`, `order`, `status`, `draft`, `noCase`, `views`, `year`, `snapshotMode`, `externalUrl`, `logo`, `cover`, `cardBadge.tone`, a presença de `statusBadge`/`stage`/`caseSummary`/`statusEvidence`/`readingTime` e as contagens de `tags`/`demonstrates`/`technologies`/`cardHighlights`/`metrics` (com `state` e `display` de cada métrica).
2. **Chave desconhecida no frontmatter** (`.strict()`): o Zod não descarta mais em silêncio — `cardbade:` derruba o build.
3. **Projeto só em um idioma, ou `draft`/`noCase` só em um** (P1, P3): a rota do outro dá 404, mas o hreflang da página existente aponta para ela. O sitemap não: ele só lista as rotas realmente geradas.
4. **`locale` ≠ nome do arquivo** (P2): gera entradas duplicadas.
5. **Seção fora do lugar** (P4): precisa estar no enum, em `SECTION_ORDER` e em `projectsPage.sections` nos dois idiomas, com os mesmos ids e a mesma ordem.
6. **`order` repetido na mesma seção** (P5). Efeito colateral: a ordenação global alimenta o Anterior/Próximo de todos os cases.
7. **`featuredOrder` órfã** (P6): a chave precisa ser projeto existente com `noCase: false` e `draft: false`, e ter entrada em `homeProjects.projects`.
8. **`homeProjects.projects` ou `ui` com chaves divergentes PT × EN** (P7, P8): precisam ser idênticas, recursivamente.
9. **Mais de 3 `metrics` com `state: verified` + `display: figure`** (R1).
10. **`metrics` com `display: text` e `cardHighlights` vazio** (R2). Separado disso: `needs_confirmation` e `hidden` continuam sumindo do card sem aviso.
11. **`noCase: true` com campo de case preenchido** (R3): `views`, `readingTime`, `caseSummary`, `statusEvidence`, `snapshot`, `externalUrl`, `seo`.
12. **`snapshotMode: product-technical` sem `snapshot`** (R4).
13. **`externalUrl` sem `externalUrlLabel`** (R5).
14. **Pastas com prefixo `_` dentro de `src/content/`** são ignoradas pelo Astro (o build passa sem ler; o P1 avisa). Para teste temporário use outro nome (ex.: `zz-test`) e remova ao terminar. Atenção: projeto `noCase: true` não gera rota de case, então **não muda a contagem de páginas** — confira o card em `dist/projects/index.html`.
15. **Avisos, não fatais** (W1, W2): `statusBadge` diferente de `cardBadge.label` só na caixa e `section: archived` com `tone` diferente de `archived`.
16. **Registro de componentes MDX em 3 lugares** (§2): build e checker não pegam. É o único que segue dependendo de você lembrar — o `npm run check` já roda dentro do `npm run build`, inclusive no deploy.

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
| `npm run build` | roda `npm run check` antes (`astro check` + `check:content`) e só então gera `dist/`; é o comando que o **deploy** usa |
| `npm run build:fast` | só `astro build`, pulando toda a validação — **não use para entregar** (escape manual) |
| `npx astro check` | checagem de tipos isolada |
| `npm run check:content` | só as regras P1–P8 do conteúdo, sempre com arquivo e campo (exit 1 em erro) |
| `npm run check` | `astro check` + `check:content` — o que o `build` chama |
| `npm run preview` | servir o `dist/` |

Antes de encerrar uma tarefa: `npm run build` (que já validou tudo) + abrir `/`, `/projects/` e um case, nos dois idiomas.

**`dist/` não é reprodutível byte a byte:** ids aleatórios (prefixos `er-`, `cc-`, `chart-` de `EmailReveal.astro`, `CaseCarousel.astro`, `AnimatedChart.astro`) mudam a cada build — ao comparar `dist/` antes/depois, normalize ou ignore: sed (Git for Windows: `C:\Program Files\Git\usr\bin\sed.exe`) `sed -E 's/(er|cc|chart)-[a-z0-9]{6,9}/\1-X/g'` ou PowerShell `(Get-Content arquivo -Raw) -replace '(er|cc|chart)-[a-z0-9]{6,9}','$1-X'`.

## 8. Arquivos-ponteiro

Estes arquivos só apontam para este `AGENTS.md`; não coloque conteúdo próprio neles, nem precisa mexer neles ao alterar este arquivo.

- `CLAUDE.md` — importa este arquivo (`@AGENTS.md`). Sem ponteiro: OpenCode, Codex e Kiro leem `AGENTS.md` nativamente; o Claude Code só o lê se não houver `CLAUDE.md`, por isso existe o import acima.

## 9. Desenvolvimento assistido por IA

- Antes de alterar, leia estas instruções, o código afetado e os documentos de contexto: `PRODUCT.md`, `DESIGN.md`, `docs/architecture.md`, `docs/quality.md` e `docs/setup.md`.
- Diferencie fatos observados, suposições, decisões e evidências. A fonte de verdade para comportamento continua sendo o código; atualize o documento responsável quando mudar comportamento, comandos, schema, limites ou configuração.
- Defina critérios de aceite e a validação proporcional antes de implementar. Para este projeto, `npm run build` é a verificação integrada obrigatória; valide também as rotas afetadas em navegador local quando houver mudança visual ou de navegação.
- Preserve as regras locais de conteúdo, a identidade visual e as dependências existentes. Skills e ferramentas globais orientam o trabalho quando relevantes, mas não autorizam refactors, deploys, novas dependências, hooks ou serviços não solicitados.
- Use a skill `caveman` quando estiver disponível, em qualquer tarefa, para comunicação concisa sem reduzir precisão, segurança, testes ou registro de riscos.
- Use `security-and-hardening` para limites de confiança, dependências e integrações externas; `diagnosing-bugs` para falhas e regressões; `performance` para otimizações; e `frontend-design`, `design-taste-frontend`, `impeccable` e `web-design-guidelines` para trabalho ou auditoria de interface. Não usar `seo-audit` neste projeto por decisão explícita do dono.
- Para tarefas não triviais, mantenha plano, decisões, comandos executados, evidências e pendências descobríveis em `docs/setup.md` ou no documento temático adequado. Ao retomar um handoff, confira arquivos, estado do Git, processos e checks em vez de confiar apenas no texto anterior.
- As integrações locais existentes do Impeccable em `.codex/hooks.json`, `.claude/settings.local.json` e `.gemini/settings.json` são preservadas. Não adicione nem execute hooks novos sem revisão e necessidade comprovada.
