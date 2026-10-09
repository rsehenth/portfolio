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
