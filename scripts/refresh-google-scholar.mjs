import { readFile, rename, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const defaultPath = fileURLToPath(new URL('../src/data/google-scholar.json', import.meta.url));
const qatarDate = new Intl.DateTimeFormat('sv-SE', { dateStyle: 'short', timeZone: 'Asia/Qatar' });
const metricKeys = { citations: 'citations', hIndex: 'h_index', i10Index: 'i10_index' };

function integer(value) {
  if (typeof value === 'string' && /^(?:\d+|\d{1,3}(?:,\d{3})+)$/.test(value.trim())) {
    value = Number(value.replaceAll(',', ''));
  }
  if (!Number.isSafeInteger(value) || value < 0) throw new Error('Google Scholar returned an invalid citation value.');
  return value;
}

function normalizeName(name) {
  return typeof name === 'string' ? name.normalize('NFKC').replace(/\p{Cf}/gu, '').trim().replace(/\s+/g, ' ').toLowerCase() : '';
}

function readSnapshot(payload, previous, checkedOn) {
  if (payload?.search_metadata?.status !== 'Success') throw new Error('SerpApi did not return a completed Google Scholar search.');
  if (payload.search_parameters?.author_id !== previous.authorId
    || normalizeName(payload.author?.name) !== normalizeName(previous.authorName)) {
    throw new Error('The returned Google Scholar profile did not match the configured author.');
  }

  const { table, graph } = payload.cited_by ?? {};
  if (!Array.isArray(table) || !Array.isArray(graph) || graph.length === 0) {
    throw new Error('The Google Scholar citation table or chart was missing.');
  }

  const metricRows = Object.entries(metricKeys).map(([key, providerKey]) => {
    const row = table.find(entry => entry?.[providerKey])?.[providerKey];
    if (!row || typeof row !== 'object') throw new Error('The Google Scholar citation table was incomplete.');
    return [key, row];
  });
  const currentYear = Number(checkedOn.slice(0, 4));
  const sinceColumn = Object.keys(metricRows[0][1]).find(key => /^since_\d{4}$/.test(key));
  const since = Number(sinceColumn?.slice('since_'.length));
  if (!Number.isInteger(since) || since < 1900 || since > currentYear) {
    throw new Error('Google Scholar did not return a valid recent citation period.');
  }

  const totals = {};
  const recent = { since };
  for (const [key, row] of metricRows) {
    totals[key] = integer(row.all);
    recent[key] = integer(row[sinceColumn]);
    if (recent[key] > totals[key]) throw new Error('A recent Google Scholar metric exceeded its all-time total.');
  }

  const years = graph.map(entry => ({ year: integer(entry?.year), citations: integer(entry?.citations) }));
  if (years.some(({ year }) => year < 1900 || year > currentYear)
    || new Set(years.map(({ year }) => year)).size !== years.length) {
    throw new Error('Google Scholar returned invalid or duplicate years in the citation chart.');
  }
  const yearly = years.sort((a, b) => a.year - b.year).slice(-6);

  return { authorId: previous.authorId, authorName: previous.authorName, checkedOn, totals, recent, yearly };
}

export async function refreshGoogleScholar({ apiKey, snapshotPath = defaultPath, request = fetch, now = new Date() }) {
  const key = apiKey?.trim();
  if (!key) return 'missing-key';

  const previous = JSON.parse(await readFile(snapshotPath, 'utf8'));
  const checkedOn = qatarDate.format(now);
  if (checkedOn < previous.checkedOn) throw new Error('The refresh date precedes the saved Google Scholar snapshot.');

  const endpoint = new URL('https://serpapi.com/search.json');
  endpoint.search = new URLSearchParams({
    engine: 'google_scholar_author',
    author_id: previous.authorId,
    hl: 'en',
    no_cache: 'true',
    api_key: key,
  }).toString();

  let response;
  try {
    response = await request(endpoint, { signal: AbortSignal.timeout(25000), redirect: 'error' });
  } catch {
    throw new Error('The SerpApi request failed or timed out.');
  }
  if (!response.ok) throw new Error(`SerpApi returned HTTP ${response.status}.`);

  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new Error('SerpApi returned an unreadable Google Scholar response.');
  }

  const snapshot = readSnapshot(payload, previous, checkedOn);
  if (JSON.stringify(snapshot) === JSON.stringify(previous)) return 'unchanged';

  const staged = `${snapshotPath}.${process.pid}.tmp`;
  try {
    await writeFile(staged, `${JSON.stringify(snapshot, null, 2)}\n`);
    await rename(staged, snapshotPath);
  } finally {
    await rm(staged, { force: true });
  }
  return 'updated';
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  try {
    const result = await refreshGoogleScholar({ apiKey: process.env.SERPAPI_API_KEY });
    const messages = {
      'missing-key': '::notice::Add the SERPAPI_API_KEY repository secret to enable Google Scholar refreshes. The saved snapshot is available.',
      unchanged: 'The Google Scholar snapshot is already current.',
      updated: 'The validated Google Scholar metrics and yearly chart were saved.',
    };
    console.log(messages[result]);
  } catch (error) {
    console.error(`::error::Google Scholar refresh failed. ${error.message}`);
    process.exitCode = 1;
  }
}
