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
| `clt-bedroom.webp` | Resumo e case completo: quarto do Cleiton |
| `clt-street.webp` | Case completo: rua, veículos e pedestres |
| `clt-wintario.webp` | Case completo: WinTário OS no computador |
| `clt-fudidin.webp` | Case completo: candidaturas no FudidIn |
| `clt-zapzap.webp` | Case completo: celular e ZapZap |
| `clt-art-evolution.webp` | Case completo: comparação de evolução visual |
| `clt-cover.webp` | Reservado para `cover:` no frontmatter, nos dois arquivos |

`logo` e `cover` no frontmatter só entram quando o arquivo existir, e nos dois idiomas. Sem arquivo, o card do /projects usa as iniciais e o card da Home não desenha imagem.

### Logo do CLT Simulator (publicado)

Os três slots de logo — card da Home (`HomeProjectCard`), card do /projects (`ProjectCard`) e hero do case (`CaseLayout`) — são quadrados fixos com `object-fit: cover`. Um arquivo 2:1 entra recortado no meio e fica ilegível, então o asset publicado é 1:1.

| Arquivo | O que é |
|---|---|
| `logo-clt-simulator.webp` | 640×640, fundo transparente, logotipo completo centralizado com folga de 5%. É o caminho do `logo:` nos dois MDX |
| `logo-wide.webp` | Fonte 1774×887 (2:1) em fundo transparente. Não é referenciada por nada; guardada para um futuro `cover:` ou cartela |

Para refazer o quadrado a partir do wide: recorte a mancha útil (`left:187 top:77 width:1457 height:781`), redimensione para 90% da largura do canvas e centre com `extend` em fundo transparente.

