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
