# Onboarding local

## Pré-requisitos observados

- Windows com Node.js 24.16.0 e npm 11.13.0 no momento da adoção.
- O deploy documentado usa Node 20 ou LTS atual; mantenha uma versão suportada pelo Astro antes de atualizar a runtime de produção.
- `package-lock.json` é o lockfile canônico. Não há workspace, banco local, migração ou segredo necessário para executar o site.

## Primeiro fluxo

```powershell
npm ci
npm run dev
```

Abra `http://localhost:4321`. Para uma verificação completa antes de entregar:

```powershell
npm run build
npm run preview
```

Confira `/`, `/en/`, `/projects/`, `/en/projects/` e um case em cada idioma quando a mudança afetar conteúdo, rotas ou interface. Pare apenas os processos locais iniciados para a tarefa.

## Diagnóstico seguro

- `npx astro check` verifica diagnósticos de Astro e TypeScript.
- `npm run check:content` verifica as invariantes de pares PT/EN e da listagem de projetos.
- `npm run check` combina os dois; `npm run build` é o gate integrado e gera `dist/`.
- Logs e capturas devem omitir informação pessoal que não seja necessária para diagnosticar o problema. Não há `.env` versionado nem serviço externo que deva ser consultado para o fluxo local.

## Onde começar uma alteração

Leia `AGENTS.md` primeiro. Em seguida, use o mapa de tarefas nele e consulte `PRODUCT.md`, `DESIGN.md` e `docs/architecture.md` conforme a área afetada. Para mudanças extensas ou retomadas entre sessões, registre a evidência e a próxima ação em `docs/setup.md`; não trate um handoff como fonte de verdade sem verificar o checkout e os checks atuais.

## Invalidação deste documento

Atualize-o quando mudarem runtime, gerenciador de pacotes, scripts, porta local, requisitos de ambiente ou procedimento de recuperação.
