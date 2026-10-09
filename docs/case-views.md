# Case View Toggle — Como ativar o seletor em um case

O seletor "Resumo / Case completo" é opt-in por case via frontmatter. Casos sem opt-in continuam exatamente como estão.

## Passo 1 — Frontmatter

No arquivo MDX do case (PT e EN), adicione:

```yaml
views: true
readingTime:
  basic: 2   # minutos de leitura do resumo
  full: 8    # minutos de leitura do case completo
```

Os valores de `readingTime` são livres. Se omitidos, os rótulos aparecem sem o tempo (ex: "Resumo" em vez de "Resumo · 2 min").

## Passo 2 — Estrutura do MDX

O MDX deve ter dois tipos de conteúdo:

- **Fora de qualquer wrapper**: aparece nas duas visões (hero, CaseSummary, StatusEvidence já são renderizados pelo layout — não precisam de wrapper).
- **Dentro de `<BasicView>`**: aparece apenas no resumo.
- **Dentro de `<FullView>`**: aparece apenas na visão completa.

### Estrutura mínima

```mdx
<BasicView>

## O problema

Descrição concisa do problema.

## Resultado

Resultado principal.

</BasicView>

<FullView>

## Seção detalhada

Conteúdo completo do case...

</FullView>
```

## Passo 3 — Links SeeFull (opcional)

Para criar um link dentro do BasicView que muda para a visão completa e rola até uma seção específica:

1. Na visão completa, use `<h2 id="meu-id">` com um ID ASCII estável.
2. No BasicView, use `<SeeFull to="meu-id" label="Ver detalhes" />`.

```mdx
<BasicView>
  <SeeFull to="arquitetura" label="Ver arquitetura" />
</BasicView>

<FullView>
  <h2 id="arquitetura">Arquitetura</h2>
  ...
</FullView>
```

## Passo 4 — Bloco de métricas técnicas (snapshotSecondary)

Quando `views: true`, o bloco de métricas técnicas (`snapshot.secondary` no frontmatter) **não é renderizado** pelo layout no hero. Para exibi-lo apenas na visão completa, coloque um `<StatsGrid>` equivalente dentro de `<FullView>`.

O bloco "Resultados Verificados" no rodapé do layout também é omitido quando `views: true`.

## Comportamento do seletor

| Situação | Comportamento |
|---|---|
| Sem JS | Visão completa sempre visível; seletor oculto |
| `?v=resumo` ou `?v=summary` | Abre na visão resumo |
| `?v=completo` ou `?v=full` | Abre na visão completa |
| localStorage `caseView` | Preferência persistida entre visits |
| URL param | Tem prioridade sobre localStorage |

O canonical, og:url e hreflang **nunca contêm `?v=`** — são gerados sem query string pelo layout.

## Exemplo: Super Squad AI

```yaml
# super-squad-ai/pt-BR.mdx
views: true
readingTime:
  basic: 2
  full: 10
```

```mdx
<BasicView>
## O problema
...
<SeeFull to="arquitetura-de-agentes" label="Ver arquitetura" />
</BasicView>

<FullView>
<h2 id="arquitetura-de-agentes">Arquitetura de agentes</h2>
...
</FullView>
```
