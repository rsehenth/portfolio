# Arquitetura

## Estado observado

Este repositório é um portfólio estático bilíngue de Lucas Sehnem. Usa Astro 5, TypeScript, Tailwind CSS 3, MDX e Chart.js; o destino de publicação é Cloudflare Pages. Não há servidor de aplicação, banco de dados, autenticação, autorização ou variáveis de ambiente necessárias para o build atual.

## Estrutura e limites

| Área | Fonte de verdade | Responsabilidade |
|---|---|---|
| Rotas | `src/pages/` e `src/pages/en/` | PT-BR e inglês em arquivos espelhados; não usar `astro:i18n` nem `[locale]`. |
| Conteúdo de projetos | `src/content/projects/<slug>/{pt-BR,en}.mdx` | Dados e corpo dos cases; o nome da pasta define a URL. |
| Contrato de conteúdo | `src/content/config.ts` | Schema Zod estrito do frontmatter. |
| Regras de coleção | `src/lib/projects.ts` e `scripts/check-content.mjs` | Ordenação, filtros, URLs e invariantes PT/EN. |
| Interface compartilhada | `src/components/` e `src/layouts/` | Componentes Astro e layouts reutilizados pelas duas línguas. |
| Texto de interface | `src/i18n/ui.ts` | Strings e editorial de Home, preservando paridade recursiva entre idiomas. |
| Perfil e ativos | `src/data/profile.ts` e `public/` | Perfil, links e mídia estática. |

## Decisões preservadas

- A duplicação de rotas por idioma é intencional para manter URLs e conteúdo explícitos.
- Métricas públicas devem ser verificadas; o schema e o checker protegem essa regra.
- `npm run build` chama `npm run check` antes de gerar `dist/`; não usar `build:fast` como entrega.
- O site é gerado estaticamente. Integrações de banco, logger de servidor, ORM, Sentry ou MCPs de produção não existem e não foram introduzidas pela adoção do toolkit.

## Limites de confiança atuais

O conteúdo MDX e os assets são mantidos no repositório. Alterações em frontmatter, componentes que renderizam MDX, links externos e dependências devem preservar a validação atual e evitar publicar alegações não verificadas. A aplicação não recebe sessões, credenciais ou dados de usuários no runtime atual; se isso mudar, esta arquitetura e `docs/quality.md` precisam ser atualizadas antes da implementação.

## Invalidação deste documento

Revise este documento ao alterar a estratégia de i18n, rotas, schema de conteúdo, modo de build/publicação, limites de dados ou ao introduzir serviços de runtime.
