#!/usr/bin/env node
/**
 * check-content.mjs — checagens estruturais do conteúdo do portfólio.
 *
 * Uso:  npm run check:content      (ou dentro de: npm run check)
 * Regras P1..P8 = ERROS  → exit 1 (sempre com arquivo + campo).
 * Regras W1..W2 = AVISOS → exit 0 (nunca derrubam o comando).
 *
 * Extração restrita: SECTION_ORDER, featuredOrder e projectsPage.sections são
 * lidos por padrão explícito; se o padrão não for achado o script FALHA com
 * mensagem clara. Nada é lido "se der".
 *
 * Ver AGENTS.md §5 (armadilhas) e §7 (validação).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import yaml from 'js-yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PROJECTS_DIR = path.join(ROOT, 'src', 'content', 'projects');
const UI_FILE = path.join(ROOT, 'src', 'i18n', 'ui.ts');
const PROJECTS_LIB = path.join(ROOT, 'src', 'lib', 'projects.ts');
const HOME_PAGE = path.join(ROOT, 'src', 'components', 'HomePage.astro');

const LOCALES = ['pt-BR', 'en'];
const DEFAULTS = { draft: false, noCase: false, views: false, order: 0, snapshotMode: 'default' };

const errors = [];
const warnings = [];
const rel = (file) => path.relative(ROOT, file).split(path.sep).join('/');
const err = (rule, file, field, msg) => errors.push(`ERRO ${rule} [${file}] ${field}: ${msg}`);
const warn = (rule, file, field, msg) => warnings.push(`AVISO ${rule} [${file}] ${field}: ${msg}`);

/** Falha alto: nada de continuar sem o dado. */
function must(value, label) {
  if (value === undefined || value === null) {
    throw new Error(`extração falhou: ${label} não encontrado em ${rel(UI_FILE)}`);
  }
  return value;
}

function read(file) {
  if (!fs.existsSync(file)) throw new Error(`arquivo não encontrado: ${rel(file)}`);
  // O Astro/gray-matter ignora o BOM; aqui também (senão é falso positivo).
  const raw = fs.readFileSync(file, 'utf8');
  return raw.charCodeAt(0) === 0xfeff ? raw.slice(1) : raw;
}

/* ------------------------------------------------------------------ *
 * Extração restrita de arrays literais (SECTION_ORDER, featuredOrder)
 * ------------------------------------------------------------------ */
function quotedItems(inner, label) {
  const items = [...inner.matchAll(/['"`]([^'"`\n]+)['"`]/g)].map((m) => m[1]);
  if (items.length === 0) throw new Error(`extração falhou: ${label} veio vazio`);
  return items;
}

function extractSectionOrder() {
  const src = read(PROJECTS_LIB);
  const m = /export\s+const\s+SECTION_ORDER[^=]*=\s*\[([\s\S]*?)\]/.exec(src);
  if (!m) throw new Error(`extração falhou: padrão de SECTION_ORDER não encontrado em ${rel(PROJECTS_LIB)}`);
  return quotedItems(m[1], 'SECTION_ORDER');
}

function extractFeaturedOrder() {
  const src = read(HOME_PAGE);
  const found = [...src.matchAll(/const\s+featuredOrder\s*=\s*\[([\s\S]*?)\]/g)];
  if (found.length === 0) {
    throw new Error(`extração falhou: padrão de featuredOrder não encontrado em ${rel(HOME_PAGE)}`);
  }
  const lists = found.map((m, i) => quotedItems(m[1], `featuredOrder[${i}]`));
  const first = JSON.stringify(lists[0]);
  if (lists.some((l) => JSON.stringify(l) !== first)) {
    throw new Error(`extração falhou: ${lists.length} defições de featuredOrder divergem em ${rel(HOME_PAGE)}`);
  }
  return lists[0];
}

/** Lê um array delimitado por brackets, ignorando strings e comentários. */
function takeBracketed(src, openIdx, open, close) {
  let depth = 0;
  let inStr = null;
  for (let i = openIdx; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === '\\') { i++; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '/' && src[i + 1] === '/') {
      const nl = src.indexOf('\n', i);
      if (nl < 0) break;
      i = nl;
      continue;
    }
    if (c === "'" || c === '"' || c === '`') { inStr = c; continue; }
    if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) return src.slice(openIdx, i + 1);
    }
  }
  throw new Error('extração falhou: array não fechado');
}

/** projectsPage.sections de um bloco de locale, preso ao projeto 'projectsPage'. */
function extractSections(src, locale) {
  const start = src.indexOf(`'${locale}': {`);
  if (start < 0) throw new Error(`extração falhou: bloco '${locale}' não encontrado em ${rel(UI_FILE)}`);
  const endMarker = locale === 'pt-BR' ? `'en': {` : 'export type UITranslations';
  const end = src.indexOf(endMarker, start + 1);
  if (end < 0) throw new Error(`extração falhou: fim do bloco '${locale}' não encontrado em ${rel(UI_FILE)}`);

  const region = src.slice(start, end);
  const pm = /projectsPage\s*:\s*\{/.exec(region);
  if (!pm) throw new Error(`extração falhou: 'projectsPage' não encontrado no bloco '${locale}' de ${rel(UI_FILE)}`);
  const after = /sections\s*:\s*\[/.exec(region.slice(pm.index));
  if (!after) throw new Error(`extração falhou: 'projectsPage.sections' não encontrado no bloco '${locale}' de ${rel(UI_FILE)}`);

  const openIdx = start + pm.index + after.index + after[0].lastIndexOf('[');
  const arr = takeBracketed(src, openIdx, '[', ']');
  const ids = [...arr.matchAll(/\bid\s*:\s*(['"`])([^'"`\n]+)\1/g)].map((m) => m[2]);
  if (ids.length === 0) throw new Error(`extração falhou: nenhum id em projectsPage.sections ('${locale}') de ${rel(UI_FILE)}`);
  return ids;
}

/** Transpila ui.ts e importa (typescript já é devDependency). Sem eval de string solta. */
async function loadUi() {
  const src = read(UI_FILE);
  const out = ts.transpileModule(src, {
    reportDiagnostics: true,
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  if (out.diagnostics?.length) {
    throw new Error(`transpile de ${rel(UI_FILE)} falhou: ${out.diagnostics[0].messageText}`);
  }
  const mod = await import('data:text/javascript;base64,' + Buffer.from(out.outputText, 'utf8').toString('base64'));
  must(mod.ui, `export const ui`);
  for (const locale of LOCALES) must(mod.ui[locale], `ui['${locale}']`);
  return mod.ui;
}

/* ------------------------------------------------------------------ *
 * Frontmatter
 * ------------------------------------------------------------------ */
function parseMdx(file) {
  const text = read(file);
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!m) {
    err('YAML', rel(file), 'frontmatter', 'bloco --- não encontrado');
    return null;
  }
  try {
    const data = yaml.load(m[1]);
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      err('YAML', rel(file), 'frontmatter', 'o frontmatter não é um mapa');
      return null;
    }
    return data;
  } catch (e) {
    err('YAML', rel(file), 'frontmatter', `falha ao analisar YAML: ${e.message.split('\n')[0]}`);
    return null;
  }
}

const effective = (data, key) => (data[key] === undefined ? DEFAULTS[key] : data[key]);
const listOf = (data, key) => (Array.isArray(data[key]) ? data[key] : []);
const metricSignature = (data) =>
  listOf(data, 'metrics').map((m) => `${m?.state ?? '-'}|${m?.display ?? '-'}`).join(',');
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/* ------------------------------------------------------------------ *
 * Regras
 * ------------------------------------------------------------------ */
const STRUCT_SCALARS = [
  'section', 'order', 'status', 'draft', 'noCase', 'views', 'year',
  'snapshotMode', 'externalUrl', 'logo', 'cover',
];
const STRUCT_PRESENCE = ['statusBadge', 'stage', 'caseSummary', 'statusEvidence', 'readingTime'];
const STRUCT_COUNTS = ['tags', 'demonstrates', 'technologies', 'cardHighlights', 'metrics'];

function p3Compare(pt, en) {
  const fPt = rel(pt.file);
  const fEn = rel(en.file);
  for (const field of STRUCT_SCALARS) {
    const a = effective(pt.data, field);
    const b = effective(en.data, field);
    if (!same(a, b)) err('P3', fEn, field, `EN=${JSON.stringify(b)} difere de PT=${JSON.stringify(a)} (${fPt})`);
  }
  if (!same(pt.data.cardBadge?.tone, en.data.cardBadge?.tone)) {
    err('P3', fEn, 'cardBadge.tone', `EN=${JSON.stringify(en.data.cardBadge?.tone)} difere de PT=${JSON.stringify(pt.data.cardBadge?.tone)} (${fPt})`);
  }
  for (const field of STRUCT_PRESENCE) {
    const a = field in pt.data;
    const b = field in en.data;
    if (a !== b) err('P3', fEn, field, `presença no ${a ? 'PT' : 'EN'} e ausência no ${b ? 'PT' : 'EN'} (${a ? fPt : fEn})`);
  }
  for (const field of STRUCT_COUNTS) {
    const a = listOf(pt.data, field).length;
    const b = listOf(en.data, field).length;
    if (a !== b) err('P3', fEn, field, `EN tem ${b} item(ns), PT tem ${a} (${fPt})`);
  }
  const sigPt = metricSignature(pt.data);
  const sigEn = metricSignature(en.data);
  if (sigPt !== sigEn) err('P3', fEn, 'metrics.state/display', `EN=[${sigEn}] difere de PT=[${sigPt}] (${fPt})`);
}

function warningsFor(p) {
  const file = rel(p.file);
  const { data } = p;
  const badge = data.statusBadge;
  const label = data.cardBadge?.label;
  if (typeof badge === 'string' && typeof label === 'string' && badge !== label && badge.toLowerCase() === label.toLowerCase()) {
    warn('W1', file, 'statusBadge', `"${badge}" difere de cardBadge.label "${label}" só na caixa das letras`);
  }
  if (data.section === 'archived' && data.cardBadge?.tone !== 'archived') {
    warn('W2', file, 'cardBadge.tone', `section é "archived" mas tone é ${JSON.stringify(data.cardBadge?.tone)}`);
  }
}

/* ------------------------------------------------------------------ *
 * Main
 * ------------------------------------------------------------------ */
const SECTION_ORDER = extractSectionOrder();
const featuredOrder = extractFeaturedOrder();
const uiSource = read(UI_FILE);
const sectionsByLocale = Object.fromEntries(LOCALES.map((l) => [l, extractSections(uiSource, l)]));
const ui = await loadUi();

if (!fs.existsSync(PROJECTS_DIR)) throw new Error(`pasta não encontrada: ${rel(PROJECTS_DIR)}`);
const dirs = fs
  .readdirSync(PROJECTS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

const projects = [];

for (const name of dirs) {
  const dir = path.join(PROJECTS_DIR, name);

  // P1 — exatamente pt-BR.mdx e en.mdx
  if (name.startsWith('_')) {
    err('P1', rel(dir), 'pasta', 'prefixo "_" faz o Astro ignorar a pasta inteira; renomeie (ex.: zz-test) ou remova');
    continue;
  }
  const files = fs.readdirSync(dir).filter((f) => fs.statSync(path.join(dir, f)).isFile());
  const expected = ['en.mdx', 'pt-BR.mdx'];
  const missing = expected.filter((f) => !files.includes(f));
  const extra = files.filter((f) => !expected.includes(f));
  if (missing.length || extra.length) {
    const parts = [];
    if (missing.length) parts.push(`faltam ${missing.join(', ')}`);
    if (extra.length) parts.push(`sobram ${extra.join(', ')}`);
    err('P1', rel(dir), 'arquivos', `esperado só pt-BR.mdx + en.mdx; ${parts.join('; ')}`);
  }

  const byLocale = {};
  for (const locale of LOCALES) {
    const file = path.join(dir, `${locale}.mdx`);
    if (!fs.existsSync(file)) continue;

    // P2 — locale igual ao nome do arquivo
    const data = parseMdx(file);
    if (!data) continue;
    if (data.locale !== locale) {
      err('P2', rel(file), 'locale', `é ${JSON.stringify(data.locale)}, deveria ser ${JSON.stringify(locale)}`);
    }
    byLocale[locale] = { file, data, key: name };
    warningsFor({ file, data });
  }
  if (byLocale['pt-BR'] && byLocale['en']) {
    p3Compare(byLocale['pt-BR'], byLocale['en']);
    projects.push({ key: name, ...byLocale });
  } else if (Object.keys(byLocale).length === 1) {
    const only = LOCALES.find((l) => byLocale[l]);
    err('P1', rel(dir), 'arquivos', `projeto existe só em ${only}; a rota do outro idioma não é gerada`);
  }
}

const allFiles = projects.flatMap((p) => LOCALES.map((l) => p[l]).filter(Boolean));

// P4 — seções usadas existem nas duas fontes; PT e EN com mesmos ids e mesma ordem
for (const locale of LOCALES) {
  const ids = sectionsByLocale[locale];
  const ordered = SECTION_ORDER.filter((s) => ids.includes(s));
  if (ordered.length !== ids.length) {
    err('P4', rel(UI_FILE), `projectsPage.sections[${locale}]`, `ids fora de SECTION_ORDER: ${ids.filter((s) => !SECTION_ORDER.includes(s)).join(', ')}`);
  }
}
if (!same(sectionsByLocale['pt-BR'], sectionsByLocale['en'])) {
  err('P4', rel(UI_FILE), 'projectsPage.sections', `PT=[${sectionsByLocale['pt-BR'].join(', ')}] difere de EN=[${sectionsByLocale['en'].join(', ')}]`);
}
for (const p of allFiles) {
  const section = p.data.section;
  if (!SECTION_ORDER.includes(section)) {
    err('P4', rel(p.file), 'section', `"${section}" não está em SECTION_ORDER (${rel(PROJECTS_LIB)})`);
  }
  for (const locale of LOCALES) {
    if (!sectionsByLocale[locale].includes(section)) {
      err('P4', rel(p.file), 'section', `"${section}" não está em projectsPage.sections[${locale}] (${rel(UI_FILE)})`);
    }
  }
}

// P5 — sem order repetido dentro da mesma seção
const bySectionOrder = new Map();
for (const p of allFiles) {
  const k = `${p.data.section}|${effective(p.data, 'order')}`;
  if (!bySectionOrder.has(k)) bySectionOrder.set(k, []);
  bySectionOrder.get(k).push(p);
}
for (const [k, group] of bySectionOrder) {
  const keys = [...new Set(group.map((p) => p.key))];
  if (keys.length > 1) {
    const [section, order] = k.split('|');
    err('P5', rel(group[0].file), 'order', `order ${order} repetido na seção "${section}": ${keys.join(', ')}`);
  }
}

// P6 — featuredOrder
const homeProjects = {
  'pt-BR': must(must(ui['pt-BR'].homeProjects, "ui['pt-BR'].homeProjects").projects, "ui['pt-BR'].homeProjects.projects"),
  en: must(must(ui['en'].homeProjects, "ui['en'].homeProjects").projects, "ui['en'].homeProjects.projects"),
};
const byKey = new Map(projects.map((p) => [p.key, p]));
for (const key of featuredOrder) {
  const p = byKey.get(key);
  if (!p) {
    err('P6', rel(HOME_PAGE), 'featuredOrder', `"${key}" não é uma pasta de projeto em ${rel(PROJECTS_DIR)}`);
    continue;
  }
  for (const locale of LOCALES) {
    const entry = p[locale];
    if (effective(entry.data, 'noCase') === true) err('P6', rel(HOME_PAGE), 'featuredOrder', `"${key}" tem noCase: true em ${rel(entry.file)}; o card da Home linka`);
    if (effective(entry.data, 'draft') === true) err('P6', rel(HOME_PAGE), 'featuredOrder', `"${key}" tem draft: true em ${rel(entry.file)}; a rota não é gerada`);
    if (!(key in homeProjects[locale])) err('P6', rel(UI_FILE), `homeProjects.projects[${locale}]`, `"${key}" está no featuredOrder mas não tem entrada editorial`);
  }
}

// P7 — homeProjects.projects: mesmas chaves nos dois idiomas + projeto existente
for (const key of Object.keys(homeProjects['pt-BR'])) {
  if (!(key in homeProjects.en)) err('P7', rel(UI_FILE), 'homeProjects.projects', `"${key}" existe no PT e não no EN`);
}
for (const key of Object.keys(homeProjects.en)) {
  if (!(key in homeProjects['pt-BR'])) err('P7', rel(UI_FILE), 'homeProjects.projects', `"${key}" existe no EN e não no PT`);
}
for (const key of new Set(Object.keys(homeProjects['pt-BR']))) {
  if (!byKey.has(key)) err('P7', rel(UI_FILE), 'homeProjects.projects', `"${key}" não é um projeto existente em ${rel(PROJECTS_DIR)}`);
}

// P8 — chaves de ui idênticas recursivamente
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
function diffKeys(a, b, prefix, out) {
  for (const k of Object.keys(a)) {
    if (!(k in b)) out.push(`${prefix}${k}: existe no PT e não no EN`);
    else if (isObj(a[k]) && isObj(b[k])) diffKeys(a[k], b[k], `${prefix}${k}.`, out);
    else if (isObj(a[k]) !== isObj(b[k])) {
      out.push(`${prefix}${k}: estrutura divergente (PT ${Array.isArray(a[k]) ? 'array' : typeof a[k]}, EN ${Array.isArray(b[k]) ? 'array' : typeof b[k]})`);
    }
  }
  for (const k of Object.keys(b)) {
    if (!(k in a)) out.push(`${prefix}${k}: existe no EN e não no PT`);
  }
}
const uiDiffs = [];
diffKeys(ui['pt-BR'], ui['en'], '', uiDiffs);
for (const d of uiDiffs) err('P8', rel(UI_FILE), 'ui', d);

/* ------------------------------------------------------------------ *
 * Relatório
 * ------------------------------------------------------------------ */
for (const e of errors) console.error(e);
for (const w of warnings) console.log(w);
console.log(
  `check-content: ${errors.length} erro(s), ${warnings.length} aviso(s) — ` +
    `${dirs.length} pasta(s), ${allFiles.length} arquivo(s), ${SECTION_ORDER.length} seção(ões) em SECTION_ORDER, ` +
    `featuredOrder=[${featuredOrder.join(', ')}]`,
);
process.exit(errors.length > 0 ? 1 : 0);
