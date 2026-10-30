# Mídia dos cases

Crie uma pasta por slug e use caminhos como `/projects/profresolve/dashboard.webp` no MDX.

Use o componente `CaseMedia` para toda mídia de case:

```mdx
<CaseMedia
  src="/projects/profresolve/exemplo.webp"
  alt="Descrição objetiva do conteúdo da imagem"
  width={1600}
  height={900}
  caption="Legenda opcional"
/>
```

Para GIFs, use `kind="gif"`. Para vídeos curtos, use `kind="video"`; o componente fornece controles, reprodução sem áudio e respeita `prefers-reduced-motion`. Não inclua mídia sem alt, dimensões ou arquivo real.

## Mídia ainda não publicada: `MediaSlot`

Cases em desenvolvimento podem ter slots de imagem que ainda não têm arquivo. `MediaSlot` aceita os mesmos props de `CaseMedia` mais `pending` (rótulo curto e traduzido, "preview em produção" / "preview coming"). Se o arquivo existir em `public/`, ele renderiza o `CaseMedia`; se não existir, renderiza uma linha compacta no mesmo lugar. Nunca mostra imagem quebrada, nome de arquivo ou buraco grande na página.

```mdx
<MediaSlot
  src="/projects/clt-simulator/clt-bedroom.webp"
  alt="Descrição objetiva do conteúdo da imagem"
  width={1672}
  height={941}
  caption="Legenda opcional"
  pending="Preview em produção"
/>
```

Não use capturas geradas por IA nem mockups no lugar de imagens reais do jogo.

### Slots previstos: CLT Simulator

Solte os arquivos em `public/projects/clt-simulator/` com estes nomes. Os dois idiomas apontam para os mesmos caminhos.

| Arquivo | Onde aparece |
|---|---|
| `ingame.webp` (publicado) | Resumo e case completo: quarto do Cleiton, captura real de gameplay (1591×896). Substituiu o slot `clt-bedroom.webp` |
| `clt-street.webp` | Case completo: rua, veículos e pedestres |
| `clt-wintario.webp` | Case completo: WinTário OS no computador |
| `clt-fudidin.webp` | Case completo: candidaturas no FudidIn |
| `clt-zapzap.webp` | Case completo: celular e ZapZap |
| `clt-art-evolution.webp` | Case completo: comparação de evolução visual |
| `clt-cover.webp` | Captura real do jogo em 16:10 para substituir `cover.webp` (hoje o logo oficial sobre o azul do próprio logo) |

`logo` e `cover` no frontmatter só entram quando o arquivo existir, e nos dois idiomas. Sem arquivo, o card do /projects usa as iniciais e o card da Home não desenha imagem.

### AI Command Center

| Arquivo | Onde aparece |
|---|---|
| `demo.webp` (publicado) | Resumo e case completo, via `CaseMedia`: captura real da demonstração web (1592×1197, modo demonstração, dados de exemplo) |
| `cover.webp` (publicado) | Recorte 16:10 de `demo.webp`; é o `cover:` nos dois MDX |
| `logo-ai-command-center.webp` | Opcional, 640×640 (1:1): quando existir, acrescente `logo:` nos dois MDX e remova as iniciais do card |

Não use mockup ou captura gerada por IA no lugar da interface real.

### Mídia publicada nos demais cases

| Case | Arquivos | Onde aparecem |
|---|---|---|
| Project Relay (`public/projects/projectrelay/`) | `interface.webp` (visão geral do painel), `login.webp` (acesso administrativo), `cover.webp` (recorte 16:10 de `login.webp`) | `interface`: Resumo e case completo, depois da solução; `login`: case completo, em Arquitetura |
| Super Squad AI | `SQAIapp.webp` (app em modo demonstração, v0.2, sem backend conectado) | Resumo e case completo, em "Estado atual". Mantém a `cover.webp` existente |
| Universal Docs | `docsin.webp` (starter aplicado à documentação da Cripto Host), `cover.webp` (recorte 16:10) | Corpo do case, em "O que o módulo precisava entregar" |

### Logo do CLT Simulator (publicado)

Os três slots de logo — card da Home (`HomeProjectCard`), card do /projects (`ProjectCard`) e hero do case (`CaseLayout`) — são quadrados fixos com `object-fit: cover`. Um arquivo 2:1 entra recortado no meio e fica ilegível, então o asset publicado é 1:1.

| Arquivo | O que é |
|---|---|
| `logo-clt-simulator.webp` | 640×640, fundo transparente, logotipo completo centralizado com folga de 5%. É o caminho do `logo:` nos dois MDX |
| `logo-wide.webp` | Fonte 1774×887 (2:1) em fundo transparente. Não é referenciada por nada; guardada para um futuro `cover:` ou cartela |

Para refazer o quadrado a partir do wide: recorte a mancha útil (`left:187 top:77 width:1457 height:781`), redimensione para 90% da largura do canvas e centre com `extend` em fundo transparente.


## Capas (`cover`) e logos

- `cover.webp` em `public/projects/<slug>/`, 16:10 (ex.: 1600×1000), de captura real do produto. Aparece na Home (linhas de destaque), no /projects e no topo do case. Referencie nos dois MDX.
- `logo`: 256×256 é suficiente (aparece em até ~96 px).
- Capas atuais: ProfResolve e CultoOS (recorte do topo da captura real), Super Squad AI (diagrama real sobre fundo branco), Project Aurora (recorte central do frame real) e CLT Simulator (logo oficial sobre o azul do logo, enquanto não há captura do jogo).
- Capas de AI Command Center (`demo.webp`), Project Relay (`login.webp`) e Universal Docs (`docsin.webp`) são recortes 16:10 (1600×1000) das capturas reais.
- Projetos sem `cover` (Mosaic, Cripto Host) usam um bloco com iniciais ou logo no /projects.
