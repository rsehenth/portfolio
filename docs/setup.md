# Adoção do Vibe Coding Toolkit — evidências

## Fonte, escopo e decisão

- Data de verificação: 19 de outubro de 2026.
- Fonte: `soumatheusgomes/vibe-coding-toolkit`, revisão `790a895304e0c08b70a5b215c9d334f1c86b816c`, obtida em cópia temporária fora do projeto.
- Cliente observado: Codex em Windows. Node.js 24.16.0, npm 11.13.0, repositório npm com `package-lock.json`.
- Escopo entregue: documentação de continuidade, instruções de uso sob demanda, inventário de integrações e validação do projeto Astro existente. O produto, rotas, componentes, conteúdo, dependências, lockfile e configurações de publicação foram preservados.
- Exclusão explícita: `seo-audit` não é adotada nem deve ser invocada neste projeto.

Foi criado um backup recuperável pré-alteração em diretório temporário externo, contendo os documentos e configurações relevantes. Nenhum hook novo foi criado ou executado manualmente.

## Mapa documental canônico

| Destino do manifesto | Fonte canônica neste projeto | Ação |
|---|---|---|
| `README.md` | `README.md` | Preservado e ganhou índice de contexto. |
| `PRODUCT.md` | `PRODUCT.md` | Preservado; já descrevia produto e limites. |
| `AGENTS.md` | `AGENTS.md` | Preservado; ganhou acordos concisos de trabalho assistido. |
| `CLAUDE.md` | `CLAUDE.md` | Preservado como ponte `@AGENTS.md`. |
| `docs/architecture.md` | `docs/architecture.md` | Criado com estrutura e limites observados. |
| `docs/design.md` | `DESIGN.md` | O documento raiz existente é canônico; nenhum duplicado foi criado. |
| `docs/onboarding.md` | `docs/onboarding.md` | Criado com preparação local e diagnóstico. |
| `docs/quality.md` | `docs/quality.md` | Criado com gates, riscos e revisão. |
| `docs/setup.md` | `docs/setup.md` | Este registro de fontes, decisões e evidências. |

## Matriz de cobertura

| Componente | Necessidade / estado observado | Ação e escopo | Dependências | Risco / critério de validação |
|---|---|---|---|---|
| Instruções e contexto | `AGENTS.md`, `PRODUCT.md`, `DESIGN.md` já existiam; faltavam documentos operacionais | Integrado por referências e quatro documentos; repositório | Arquivos canônicos e links locais | Evitar regras duplicadas; links e `npm run build` válidos. |
| Superpowers | Não disponível no catálogo ativo | Bloqueado; processo proporcional equivalente documentado | Skill compatível no cliente | Não alegar instalação; reavaliar quando disponível. |
| Ponytail | Não disponível no catálogo ativo | Bloqueado; menor alteração verificável adotada como acordo | Plugin/skill compatível | Não alegar instalação; reavaliar quando disponível. |
| Caveman | Não disponível no catálogo ativo | Bloqueado; comunicação concisa em português preservada | Plugin/skill compatível | Não alegar instalação; reavaliar quando disponível. |
| Delegação | Cliente suporta colaboração | Política nativa reutilizada; revisão independente feita sem roster permanente | Tarefa isolável e um escritor por arquivo | Diff e checks integrados após retorno do revisor. |
| RTK | CLI e hook correspondente não encontrados | Inaplicável no estado atual | RTK instalado e integração oficial | Não envolver comandos nem mascarar saída. |
| Context7 | Nenhum conector ativo observado | Bloqueado; usar documentação oficial quando API/configuração exigir | Plugin/MCP autenticado | Não enviar código privado ou segredos; registrar uso futuro. |
| Graphify | CLI não encontrado; 72 arquivos fonte, projeto pequeno | Inaplicável por ora; não criar `.graphifyignore` sem ferramenta | CLI suportado e grafo útil | Reavaliar se relações estruturais se tornarem difíceis de navegar. |
| Skills globais de engenharia | `security-and-hardening`, `diagnosing-bugs`, `performance`, `frontend-design`, `design-taste-frontend`, `web-design-guidelines` e `find-skills` reconhecidas | Reutilizadas globalmente, sem cópia local duplicada | Instalação global e catálogo do Codex | Descoberta confirmada por `npx skills ls -g`; invocação somente por tarefa. |
| `seo-audit` | Disponível globalmente, mas excluída pelo dono | Não adotada neste repositório | Nenhuma | Não a invocar nem registrar como requisito de SEO. |
| Impeccable | `.impeccable/` e hooks cliente-específicos preexistem; executável local existe | Preservados sem alteração | Skill global e executável já instalado | Presença não equivale a execução nesta adoção; validar em tarefa de UI. |
| Vercel skills / `find-skills` | App é Astro; apenas `find-skills` é reutilizável de forma genérica | Não instalar catálogo React/Next localmente | Necessidade concreta e compatibilidade de stack | Não migrar framework ou duplicar skills globais. |
| `next-dev-loop` | Não é Next.js; não há `agent-browser` nem runtime MCP | Inaplicável | Next.js, navegador compatível e runtime local | Não introduzir Next/bundler para satisfazer catálogo. |
| `next-bundle-optimizer` | Não é Next.js e não há analisador compatível | Inaplicável | Next.js e suporte de analyzer | Não introduzir analyzer ou upgrade fora de escopo. |
| PostgreSQL / Supabase | Não há banco, ORM ou migrations | Inaplicável | Persistência PostgreSQL real | Reavaliar antes de introduzir dados. |
| GitHub CI / `gh-fix-ci` | Nenhum workflow nem GitHub CLI autorizado observado | Pendente por pré-requisito | Falha de Actions, CLI e escopo autorizado | Usar somente ao existir falha compatível. |
| Revisão diferencial de segurança | Sem diff sensível a revisar nesta adoção | Procedimento e fonte documentados em `docs/quality.md` | Skill compatível e intervalo de revisão | Relatório privado, leitura somente; não equivale a auditoria executada. |
| shadcn/ui | Não adotado; Tailwind e componentes Astro próprios | Inaplicável | Decisão explícita de UI system | Não instalar biblioteca UI sem decisão de produto. |
| Sentry MCP | Nenhuma organização/projeto OAuth autorizada | Pendente por conta e escopo | OAuth e projeto Sentry selecionado | Não adicionar SDK, tokens ou servidor MCP. |
| Browser e diagnóstico | Não havia superfície de navegador controlável; `agent-browser` e Chrome DevTools MCP ausentes | Sem instalação de CLI; usar HTTP local agora e navegador quando disponível | Navegador local controlável, sem sessão pessoal | Inspecionar estados relevantes antes de concluir mudanças visuais. |
| Memória em camadas | Documentação versionada é o índice durável; não há vault/MCP externo | Configurado por `README.md` e documentos canônicos | Checkout e documentos atuais | Revalidar contra código, Git e checks ao retomar. |
| Artifact skills | Nenhuma necessidade concreta de artefato nesta adoção | Inaplicáveis | Necessidade de documento, planilha ou apresentação | Não instalar por checklist. |
| Skill creation | Nenhuma regra recorrente não coberta pelos documentos | Inaplicável | Lacuna recorrente e escopo de skill | Não criar skill para tarefa isolada. |
| Plugins oficiais / AIA Harness extras | Nenhuma necessidade concreta ou serviço autorizado | Inaplicáveis | Serviço, autorização e integração compatíveis | Não configurar contas, custos ou proxies. |
| Hooks | Hooks do Impeccable já existem em `.codex`, `.claude` e `.gemini` | Preservados; não duplicados nem executados manualmente | Suporte oficial, script existente e necessidade | Não adicionar interceptores sem teste. |
| Harness2 nativo | Nenhum harness anterior documentado | Processo nativo e fontes do prompt 15/guia 23 documentados | Cliente atual, checks existentes e fixture descartável | Checks reais, diff e pendências explícitas; CLI oficial opcional não instalado. |

## Evidência de checks

| Item | Estado | Evidência |
|---|---|---|
| `npm run check` antes da alteração documental | Validado | 0 erros, 0 avisos e 0 hints; checker de conteúdo aprovado. |
| `npm run build` antes da alteração documental | Validado | 26 páginas estáticas geradas. |
| `npm audit --omit=dev` | Validado com pendência | 12 advisories transitivas; correção automática requer upgrades incompatíveis para Astro 7 e Tailwind 4. |
| Preview e rotas locais | Validado sem inspeção visual | `npm run preview -- --host 127.0.0.1 --port 4321` respondeu HTTP 200 para `/`, `/en/`, `/projects/`, `/en/projects/`, `/projects/profresolve/` e `/en/projects/profresolve/`. Não havia navegador controlável para inspeção visual. |
| Catálogo de skills | Validado | `npx skills ls -g` listou as skills globais reutilizadas e a exclusão de `seo-audit` foi documentada. |
| Context7, RTK, Graphify, agent-browser, Chrome DevTools MCP | Não executado / indisponível | Nenhum conector ou CLI correspondente ativo no cliente. |
| Sentry, CI, banco, Next runtime/bundle | Inaplicável ou pendente | O produto estático não usa os primeiros; Next não é o framework; CI requer pré-requisito e escopo. |
| Harness avaliável | Parcialmente validado | O fixture descartável, sem alteração, falhou como esperado em 2 de 7 checks de autorização (cross-tenant e identidade inválida). Não foi feita uma correção por agente fresco, portanto isso valida a linha de base do avaliador, não recuperação ou execução autônoma. |

## Manutenção e retomada

1. Em nova sessão, leia `AGENTS.md`, `PRODUCT.md`, `DESIGN.md` e os documentos sob `docs/` relevantes para a mudança.
2. Antes de confiar em uma pendência, verifique `git status`, processos locais, comandos e o código atual.
3. Para mudanças de conteúdo, siga os checklists do `AGENTS.md`; para mudanças técnicas, atualize o documento dono junto com a alteração.
4. Execute `npm run build` antes de entregar e faça inspeção local das rotas afetadas quando houver UI ou navegação.
5. Reavalie esta adoção quando o Astro/Tailwind forem atualizados, quando um backend/serviço externo entrar no produto, ou quando uma skill/MCP hoje bloqueado se tornar necessário.

## Limitações e próxima ação

Não foram instalados serviços, MCPs, CLIs globais, dependências, hooks, SDKs ou integrações com produção. A linha de base do fixture de harness foi confirmada, mas não houve sessão nova observável para provar recuperação de memória nem avaliação completa de um agente fresco. A próxima validação útil é rodar `npm run build` após estas alterações e inspecionar o site local gerado; uma tarefa futura de atualização de dependências deve tratar os advisories de forma compatível e isolada.

## Atualização da About — 20 de outubro de 2026

- Removida a repetição de “Como Trabalho” somente da About; a Home preserva a seção.
- A About passou a usar leitura de até 72ch, títulos alinhados à esquerda, chamadas para cases e LinkedIn, e um bloco opcional de decisão de produto sem conteúdo publicado.
- A linha do tempo tem `highlight` opcional por item; `showOverlapNote` permanece `false` nos dois idiomas, portanto a nota não é publicada.
- O contraste de `--color-accent` no tema claro foi ajustado para AA; os demais tokens e qualquer layout fora da About foram preservados.
- Validação: `npm run build` aprovou `astro check`, `check-content` e a geração de 26 páginas.
