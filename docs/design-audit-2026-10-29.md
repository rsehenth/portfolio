# Auditoria de design — portfólio

**Data:** 2026-10-29 · **Branch:** `feat/motion` · **Natureza:** somente auditoria. Nenhum arquivo de código, conteúdo ou configuração foi alterado; este documento é o único arquivo criado.

**Skills usadas:** `impeccable` (audit + critique, com o detector `impeccable detect`), `design-taste-frontend` (critérios anti-"cara de IA"), `no-slop-ui`. `seo-audit` não foi usada, por decisão do `AGENTS.md`.

## Método e limites

- Dev server local, Playwright, páginas rolando de ponta a ponta para disparar os reveals antes da captura.
- Visto: Home PT (1440 claro, 1440 escuro, 390), Home EN (1440, topo), `/projects/` (1440, 390), `/about/` (1440), case ProfResolve (1440, 390). Capturei o case CLT Simulator mas **não analisei a imagem**.
- Medido no navegador: contraste de ~85 nós de texto, tamanhos de fonte, overflow horizontal, alvos de toque, peso e dimensão das imagens.
- **Não medido:** LCP/INP, leitor de tela, hover/transições (estados de hover não foram capturados), navegador real em dispositivo físico, `/projects/` em EN, 404.
- A auditoria de 2026-10-26 (`docs/audit-2026-10-26.md`) já cobriu parte do terreno (cabeçalho "Home", payload, view transitions). Aqui só reafirmo o que **revi no código e nas telas de hoje**.

---

## 1. Veredito

O site **não tem a cara clássica de IA**: sem gradiente, vidro, emoji, sombra decorativa nem cartão arredondado em grade de ícones. O detector não achou nenhum antipadrão fatal. Há uma ideia visual coerente (folha de prova) e tipografia forte.

Mas ele tem **a cara de uma outra assinatura, igualmente reconhecível**: o "dossiê técnico". Mono em caixa alta com tracking por toda parte, numeração `01–04`, `PROCESSO / 01-04`, pontos de status, réguas de 1px em tudo, rótulos `DEMONSTRA:` / `DESTAQUES:`. As referências que usei para essa auditoria tratam exatamente esses recursos como o figurino atual de páginas geradas. E o que mais pesa na sensação de "pouco profissional": **o site é só texto**. Não há rosto, não há captura de tela de produto acima da dobra, e o cabeçalho se chama "Home".

Para um portfólio de PM técnico a prova do trabalho é a imagem do trabalho. Hoje o visitante lê sobre produtos que nunca vê.

### Audit Health Score

| # | Dimensão | Nota | Achado principal |
|---|---|---|---|
| 1 | Acessibilidade | 3/4 | Chips e eyebrow em 4,45:1 (abaixo de 4,5); 22 textos < 12px; verde de 10px com 3,41:1 no escuro |
| 2 | Performance | 2/4 | Logos 1254×1254 exibidos em ~64px; 3 logos de 0,85–0,96 MB; screenshot de 2,4 MB no Aurora |
| 3 | Tema | 3/4 | Tokens bons e escuro bem resolvido; `DESIGN.md` descreve outra paleta; verde hard-coded |
| 4 | Responsivo | 3/4 | Sem overflow horizontal; 13–24 links/botões < 44px por página; 5 linhas de H1 em EN no desktop |
| 5 | Integridade da implementação | 2/4 | Skin "proof" empilhada sobre o template Tailwind com seletores frágeis; 96 avisos de deriva do `DESIGN.md` |
| | **Total** | **13/20** | **Aceitável: precisa de trabalho significativo** |

**Implementation Integrity: reprovado em parte.** A identidade é própria, mas a implementação é um segundo sistema (`global.css` ~linhas 456–590, `.proof-*`) forçando um primeiro (`.card`, `.btn`, `.prose`, `.tag` com `rounded-2xl`/`rounded-full`). Onde um seletor não alcança, vaza o template: caixas de 12px no case, toggle em pílula, botão de CTA arredondado.

---

## 2. Achados por prioridade

### P1 — Prejudicam a primeira impressão

**P1.1 A marca do site é "Home".** `src/components/Header.astro:39`. O visitante nunca vê "Lucas Sehnem" no topo de nenhuma página. A frase do hero é boa, mas não diz de quem é. *Corrigir:* wordmark com o nome (e, se quiser, o papel em linha menor). `/impeccable clarify`

**P1.2 Nenhuma imagem do trabalho nem da pessoa acima da dobra.** O hero é título + cartão de texto "Meu processo"; os três projetos em destaque aparecem só com logo de 64px. `public/avatar.jpg` existe e só é referenciado em `src/data/profile.ts`, não é renderizado em lugar algum. `public/projects/profresolve-cover.jpg` e `super-squad-ai-cover.jpg` também não aparecem na Home renderizada. *Corrigir:* uma imagem dominante por projeto em destaque (captura real do produto) e uma foto no hero ou no Sobre. É a maior alavanca de "profissional e agradável". `/impeccable layout` + `/impeccable bolder`

**P1.3 O topo do case compete consigo mesmo.** Em `/projects/profresolve/` a caixa de metadados (Papel, Etapa, Produto, Foco) vem **antes** do título, perde a borda inferior e o logo+título encostam nela (visível em 1440). Causa provável: o grid do header é montado por seletor `:is(.relative, time, .flex, ...)` em `global.css:575-577`, que depende da ordem dos elementos no `CaseLayout`. *Corrigir:* título primeiro, metadados em coluna lateral ou faixa abaixo, markup explícito em vez de `:is()`. `/impeccable layout`

**P1.4 Lista numerada duplicada.** "Como validei": cada passo aparece como `1.` do `<ol>` e de novo como bolinha `1`, em caixa de 12px de raio. É um bug visível. Mesmo padrão arredondado fora do sistema nos passos de fluxo. `/impeccable polish`

### P2 — Fazem o site parecer "tema" e não "autoral"

**P2.1 Mono caixa-alta como voz padrão.** Botões, eyebrow do hero, status, tags, "VER CASE →", cabeçalhos de painel. O `DESIGN.md` diz "do not add decorative eyebrows", mas o hero tem um (`TECHNICAL PRODUCT MANAGER / SISTEMAS, PRODUTO, IA`). *Corrigir:* reservar o mono para dado (números, versões, datas); rótulos e botões em Archivo, caixa de frase. `/impeccable typeset`

**P2.2 Excesso de metadados por cartão em `/projects/`.** Cada cartão empilha: ponto+status+ano, logo, título, subtítulo mono, descrição, `DEMONSTRA:`, `DESTAQUES:`, métricas, tags, `VER CASE`. São 6–7 níveis antes do link. Os "AC" e "PR" no lugar do logo parecem placeholders. *Corrigir:* título, uma linha, uma imagem, 1 a 3 números, status. O resto vive no case. `/impeccable distill`

**P2.3 Escala tipográfica solta.** 15 tamanhos distintos só na Home (10, 11, 11,2, 12, 14, 16, 18, 18,4, 20, 24, 37,6, 43,2, 57,6, 72, 100,8px) e 45 avisos de tamanho fora do `DESIGN.md`. O H1 usa tracking −0,055em e leading 0,92: o espaço entre "Da" e "estratégia" quase some. *Corrigir:* uma escala de 6–7 passos (por exemplo 12/14/16/20/32/56/104) e tracking −0,03 a −0,04em. `/impeccable typeset`

**P2.4 Linguagem de bordas inconsistente.** Home: cartões de projeto sem moldura. `/projects/`: molduras de 1px. Case: caixas empilhadas (Resumo, Status e evidências, Escopo técnico) uma dentro da outra. Contato: sem moldura. *Corrigir:* decidir uma regra (moldura só em dado; espaço e tom de fundo no resto). `/impeccable layout`

**P2.5 "Fatos verificados" é uma tabela de texto mono de 12px.** Nove frases em grade 3×3, duas sem link e em cinza mais claro. É o bloco que mais gera confiança e o menos legível. *Corrigir:* três ou quatro números grandes ligados ao caso, não nove frases iguais. `/impeccable bolder`

**P2.6 Duas cores de destaque.** O sistema usa azul-petróleo `#2c7599`, mas os ícones de "Como trabalho" são laranja-avermelhados (resquício do vermilion do `DESIGN.md`). Visível ao lado do teal da lista. *Corrigir:* um único acento. `/impeccable colorize`

**P2.7 Colunas de leitura estreitas num canvas de 1440.** Em Sobre e no case a prosa ocupa ~690px e a metade direita fica vazia (ou recebe um cartão "Stack" solto, sem contexto). *Corrigir:* usar a coluna livre para a imagem do produto ou índice lateral. `/impeccable layout`

### P3 — Acessibilidade e técnica

**P3.1 Contraste limítrofe.** `#2c7599` sobre `#edf0ee` = **4,45:1** (WCAG AA pede 4,5) em chips e eyebrow de 12px; verde `#247c58` de 10px = 4,46:1 no claro e **3,41:1 no escuro** ("Projetos documentados com evidências"). *Corrigir:* escurecer o acento do tema claro para ~`#256a8a`; o verde do tema escuro, para `#69c58d` (já usado no selo).

**P3.2 Texto muito pequeno.** 22 nós de texto < 12px na Home (10–11px mono no painel de processo). `AGENTS.md`/`DESIGN.md` pedem não encolher rótulos. *Corrigir:* piso de 12px, de preferência 13.

**P3.3 Alvos de toque.** 13–24 links/botões < 44px por página (inclui links inline). Prioridade: seletor de idioma, botão de tema, "VER CASE", chips. *Corrigir:* `min-height: 44px` onde for controle, sem mexer nos links dentro de texto.

**P3.4 Peso das imagens.** `public/projects/project-aurora/screenshot1.webp` 2,43 MB (e um `screenshot1.svg` de 525 KB ao lado); `2dbeatlogo.webp` 962 KB e `CultoOS-logo.webp` 854 KB; todos os logos entregam 1080–1254px para caixas de ~64px; `produto/tecnologia/execucao.webp` (124–185 KB) renderizados como ícones de ~40px. *Corrigir:* exportar logos em 128–192px e as três ilustrações em 96px (ou SVG). `/impeccable optimize`

**P3.5 Movimento.** `CaseViewToggle.astro:60` tem pulso infinito de 3s. O `prefers-reduced-motion` global zera tudo com `0.01ms !important` (`global.css`, bloco "Reduced motion"), o que também mata o feedback útil. *Corrigir:* pulso só ao primeiro contato; reduced-motion com alternativa (opacidade) em vez de kill global. `/impeccable animate`

**P3.6 EN: H1 em 5 linhas e CTA no limite da dobra.** Em 1440×900 o botão "View projects" fica em y≈915–960. O header já tem "View my work", então há dois CTAs iguais acima da dobra. *Corrigir:* encurtar o H1 EN ou reduzir o clamp, e manter um CTA primário só.

**P3.7 Documentação desatualizada.** `DESIGN.md` descreve papel quente `#f4f0e7`, tinta `#161513`, vermilion e IBM Plex Mono como parte da paleta; o código usa `#edf0ee`, `#1a2226` e `#2c7599`. `PRODUCT.md` ainda cita a rota experimental `/home2`, que não existe em `src/pages/`. `AGENTS.md` pede atualizar na mesma tarefa. `/impeccable document`

---

## 3. O que funciona (manter)

- **Hero tipográfico.** Hierarquia clara, mensagem específica ("Do problema ao produto / Da estratégia à execução"), um acento só.
- **Tema escuro** (`#111b1f`, azul-claro `#8db8d4`): coerente e agradável; é o ponto mais "premium" hoje.
- **Honestidade editorial.** Só métricas verificadas, status explícito, sem inflar título. É raro e é o melhor argumento do site.
- **Archivo** como família principal é uma boa escolha: neutra, forte em display, sem cara de template.
- **Cantos retos, tom plano, sem sombras.** Isso combina com o conteúdo e não deve ser trocado por "cards macios".
- **Acessibilidade estrutural:** `h1` único por página, skip link, foco visível de 2px, sem overflow horizontal em 390px, lazy-load nas imagens fora da primeira dobra.
- **Paridade PT/EN** e checagem de conteúdo no build.

---

## 4. Direção recomendada: "menos dossiê, mais obra"

Manter a base (Archivo, cantos retos, plano, azul-petróleo, tema escuro) e trocar **o que carrega a página**: de rótulos e réguas para imagem, escala e espaço.

1. **Quem + o quê no topo.** Nome no wordmark; no hero, uma foto real ao lado do H1 (ou captura do produto principal). Um CTA primário.
2. **Projetos como vitrine.** Os três destaques viram blocos grandes, cada um com captura real do produto, título, uma linha e 2 números. Layouts alternados (imagem à esquerda/direita), não três colunas iguais.
3. **Prova em números grandes.** "Fatos verificados" vira 3–4 números de peso, cada um ligado ao case.
4. **Campos de cor, não réguas.** Uma seção em tom escuro (o escuro atual) separando "Projetos" de "Sobre" faz o trabalho de dez réguas de 1px.
5. **Mono só para dado.** Rótulos e botões em Archivo, caixa de frase. Remover eyebrow, `01–04`, pontos de status e `DEMONSTRA:/DESTAQUES:` das superfícies principais.
6. **Case com título primeiro**, imagem de capa, metadados em faixa discreta, depois o texto, com a coluna direita ocupada por captura/índice.
7. **Um sistema, não dois.** Mover os tokens `.proof-*` para os componentes e apagar o que o template Tailwind ainda força (`rounded-2xl`, `rounded-full`, `.btn-primary` com translate).

---

## 5. Ordem de execução sugerida

| Ordem | Ação | Esforço | Comando |
|---|---|---|---|
| 1 | Wordmark com o nome; um CTA primário; piso de 12px; contraste do acento e do verde | Baixo | `/impeccable clarify`, `/impeccable typeset` |
| 2 | Corrigir topo do case (ordem título/metadados) e a lista numerada duplicada | Baixo–médio | `/impeccable polish` |
| 3 | Imagens: otimizar logos e screenshot do Aurora; usar capas reais nos destaques | Médio | `/impeccable optimize`, `/impeccable layout` |
| 4 | Hero com foto/produto; destaques em blocos grandes alternados; "Fatos" em números | Médio–alto | `/impeccable bolder`, `/impeccable layout` |
| 5 | Reduzir metadados do cartão de `/projects/`; regra única de bordas | Médio | `/impeccable distill` |
| 6 | Mono só para dado; escala tipográfica de 6–7 passos | Médio | `/impeccable typeset` |
| 7 | Unificar sistema (remover camada do template); movimento com reduced-motion de verdade | Médio | `/impeccable animate` |
| 8 | Atualizar `DESIGN.md` e `PRODUCT.md` com o resultado | Baixo | `/impeccable document` |
| 9 | Passe final | Baixo | `/impeccable polish` |

Depois de aplicar os itens 1–4, vale repetir esta auditoria e passar o site pela skill `jury` para uma nota independente.

## 6. Pontos que dependem de decisão do dono

- Ter ou não uma **foto** no site (ela muda o tom mais do que qualquer ajuste de CSS).
- Quais capturas de tela de produto podem ser públicas (o `AGENTS.md` só permite o que está verificado).
- Aceitar abandonar a estética "dossiê" que o `DESIGN.md` defende. O pedido de "sem cara de IA" aponta para sim; mas é uma decisão de identidade, não de bug.
