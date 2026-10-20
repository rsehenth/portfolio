# Qualidade e revisão

## Gate canônico

| Comando | O que verifica |
|---|---|
| `npx astro check` | Diagnósticos de Astro e TypeScript. |
| `npm run check:content` | Regras de conteúdo, paridade PT/EN, seções, ordem e destaques. |
| `npm run check` | Tipos e regras de conteúdo. |
| `npm run build` | Gate integrado acima e geração estática em `dist/`. |
| `npm run preview` | Servir o build para inspeção local. |
| `npm audit --omit=dev` | Inventário de advisories das dependências de produção; não aplica correções. |

Não há suíte de testes automatizados, linter separado ou medição de cobertura configurados hoje. `astro check` e o checker de conteúdo são os controles existentes; alterações comportamentais devem adicionar uma verificação pequena e proporcional apenas quando revelarem uma lacuna real.

## Baseline de 19 de outubro de 2026

- `npm run check`: aprovado, com 0 erros, 0 avisos e 0 hints.
- `npm run build`: aprovado; 26 páginas estáticas geradas.
- `npm audit --omit=dev`: 12 advisories transitivas (1 crítica, 6 altas, 3 moderadas e 2 baixas). O caminho automático exige `astro@7.4.0` e `tailwindcss@4.3.3`, ambos upgrades incompatíveis para este projeto. Nenhuma atualização ou mitigação foi aplicada durante a adoção; revisar em uma tarefa própria com testes de compatibilidade e changelogs.

## Revisão proporcional

- Mudanças de conteúdo: validar os pares MDX e as rotas afetadas nos dois idiomas.
- Mudanças de interface: além do build, inspecionar em navegador local os estados, navegação, foco visível, contraste, responsividade e movimento reduzido pertinentes. Use as skills de design e acessibilidade disponíveis somente quando a tarefa exigir.
- Mudanças que atravessam limites de confiança, dependências, links externos, entradas ou serviços: usar `security-and-hardening` e produzir uma revisão de escopo explícito, somente leitura por padrão.
- Bugs e regressões: reproduzir, identificar o limite falho, corrigir e registrar uma prova de regressão quando viável. Use `diagnosing-bugs` para o ciclo de diagnóstico.
- Performance: medir a página e o comportamento relevantes antes de otimizar. Use `performance` quando houver uma solicitação ou sinal de lentidão; uma build verde não é uma medição de desempenho.

O prompt reutilizável de revisão de segurança é o bloco de [`docs/prompts/13-security-review.md`](https://raw.githubusercontent.com/soumatheusgomes/vibe-coding-toolkit/790a895304e0c08b70a5b215c9d334f1c86b816c/docs/prompts/13-security-review.md) da revisão `790a895304e0c08b70a5b215c9d334f1c86b816c` do Vibe Coding Toolkit. Para invocá-lo, recupere esse URL imutável, copie somente o bloco `Prompt` e peça uma revisão somente leitura do intervalo ou baseline definido, com o relatório privado/redigido fora do repositório. A revisão não autoriza correções, acesso a produção ou envio de código a terceiros.

## Harness e continuidade

O método nativo inspirado em Harness2 usa: entender o pedido e instruções, definir critérios e comandos, fazer a menor alteração verificável, rodar os checks pertinentes, revisar o diff e registrar limitações. Para retomá-lo, use o [prompt 15](https://raw.githubusercontent.com/soumatheusgomes/vibe-coding-toolkit/790a895304e0c08b70a5b215c9d334f1c86b816c/docs/prompts/15-harness-improvement.md) e o [guia 23](https://raw.githubusercontent.com/soumatheusgomes/vibe-coding-toolkit/790a895304e0c08b70a5b215c9d334f1c86b816c/docs/tools/23-harness2.md) nessa revisão, aplicando apenas a adaptação nativa compatível com o pedido atual.

Para avaliar o harness além da aplicação, recupere o [prompt 14](https://raw.githubusercontent.com/soumatheusgomes/vibe-coding-toolkit/790a895304e0c08b70a5b215c9d334f1c86b816c/docs/prompts/14-harness-evaluation.md), copie o fixture descartável da mesma revisão para fora do repositório e execute o avaliador indicado pelo prompt. A avaliação deve registrar cliente, contexto, ações observadas, comando do avaliador e resultados; uma sessão nova de agente não prova reinicialização do cliente. Sem uma falha observada, não criar comparações artificiais nem instalar o CLI opcional do Harness2.

## Política de skills e integrações

As skills globais reconhecidas para este projeto estão registradas em `docs/setup.md`. Elas são orientação sob demanda, não uma autorização para refatorar, publicar ou instalar dependências. `seo-audit` está explicitamente fora de escopo neste repositório, mesmo estando instalada globalmente.

Atualize este documento ao mudar scripts, regras, estratégia de teste, revisão de segurança, dependências de qualidade ou riscos conhecidos.
