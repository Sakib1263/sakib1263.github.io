import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parse } from 'parse5';

const root = 'dist';
const publications = JSON.parse(readFileSync('src/data/publications.json', 'utf8'));
const pages = new Map();
const errors = [];

function visit(node, callback) {
  if (node.tagName) callback(node.tagName, Object.fromEntries(node.attrs.map(({ name, value }) => [name, value])));
  for (const child of node.childNodes ?? []) visit(child, callback);
}

for (const file of readdirSync(root, { recursive: true, withFileTypes: true })) {
  if (!file.isFile() || !file.name.endsWith('.html')) continue;
  const path = join(file.parentPath, file.name);
  const key = relative(root, path).replaceAll('\\', '/');
  const page = { url: null, ids: new Set(), links: [], papers: [] };
  visit(parse(readFileSync(path, 'utf8')), (tag, attributes) => {
    if (tag === 'link' && attributes.rel === 'canonical') page.url = new URL(attributes.href);
    if ('id' in attributes) {
      if (page.ids.has(attributes.id)) errors.push(`${key}: duplicate ID ${attributes.id}`);
      page.ids.add(attributes.id);
    }
    if ('data-publication' in attributes) page.papers.push(attributes.id);
    if (tag === 'img' && !('alt' in attributes)) errors.push(`${key}: image without alt text`);
    for (const attribute of ['href', 'src']) {
      if (attributes[attribute]) page.links.push(attributes[attribute]);
    }
    if (attributes.srcset) {
      page.links.push(...attributes.srcset.split(',').map(option => option.trim().split(/\s+/, 1)[0]));
    }
  });
  pages.set(key, page);
}

const homeUrl = pages.get('index.html')?.url;
if (!homeUrl) throw new Error('Missing built homepage or canonical URL. Run pnpm build first.');
const basePath = homeUrl.pathname;
let internalCount = 0;
for (const [key, page] of pages) {
  for (const link of page.links) {
    const target = new URL(link, page.url ?? new URL(key, homeUrl));
    if (target.origin !== homeUrl.origin) continue;
    internalCount++;
    if (!target.pathname.startsWith(basePath)) {
      errors.push(`${key}: URL is outside the site base path: ${link}`);
      continue;
    }
    const path = decodeURIComponent(target.pathname.slice(basePath.length));
    const pageKey = path.endsWith('/') || !path ? `${path}index.html` : path;
    const targetPage = pages.get(pageKey) ?? pages.get(`${pageKey}/index.html`);
    if (targetPage && target.hash && !targetPage.ids.has(decodeURIComponent(target.hash.slice(1)))) {
      errors.push(`${key}: missing fragment ${link}`);
    }
    if (!targetPage && !statSync(join(root, path), { throwIfNoEntry: false })?.isFile()) {
      errors.push(`${key}: missing internal target ${link}`);
    }
  }
}

const expectedDois = new Set(publications.map(({ doi }) => doi.toLowerCase()));
const expectedIds = new Set([...expectedDois].map(doi => `paper-${doi.replace(/[^a-z0-9]+/g, '-')}`));
const renderedIds = pages.get('publications/index.html')?.papers ?? [];
const bib = readFileSync(join(root, 'publications.bib'), 'utf8');
const exportedDois = [...bib.matchAll(/^\s*doi\s*=\s*\{([^}]+)\}/gm)].map(([, doi]) => doi.toLowerCase());
if (expectedDois.size !== publications.length || expectedIds.size !== publications.length) errors.push('Duplicate publication DOI or permalink.');
if (renderedIds.length !== expectedIds.size || ![...expectedIds].every(id => renderedIds.includes(id))) errors.push('Built publication rows and permalinks do not match the publication records.');
if (exportedDois.length !== expectedDois.size || ![...expectedDois].every(doi => exportedDois.includes(doi))) errors.push('BibTeX DOI export does not match the publication records.');
if (readFileSync(join(root, 'sakib-mahmud-cv.pdf')).subarray(0, 5).toString() !== '%PDF-') errors.push('The CV download is not a PDF.');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Checked ${pages.size} pages, ${internalCount} internal references, ${expectedDois.size} publication records and the PDF download.`);
}
