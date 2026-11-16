import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, rmdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { refreshGoogleScholar } from './refresh-google-scholar.mjs';

const now = new Date('2027-01-01T00:15:00+03:00');
const currentFile = await readFile(new URL('../src/data/google-scholar.json', import.meta.url), 'utf8');
const previous = {
  ...JSON.parse(currentFile),
  checkedOn: '2026-11-16',
};

const response = {
  search_metadata: { status: 'Success' },
  search_parameters: { author_id: previous.authorId },
  author: { name: `\u202a${previous.authorName}\u202c` },
  cited_by: {
    table: [
      { citations: { all: '2,435', since_2022: 2375 } },
      { h_index: { all: 28, since_2022: 27 } },
      { i10_index: { all: 47, since_2022: 46 } },
    ],
    graph: [2026, 2027, 2021, 2025, 2023, 2024, 2022].map((year, index) => ({ year, citations: String(index + 1) })),
  },
};

async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), 'scholar-refresh-'));
  const snapshotPath = join(directory, 'google-scholar.json');
  t.after(async () => {
    await rm(snapshotPath, { force: true });
    await rmdir(directory);
  });
  const original = JSON.stringify(previous);
  await writeFile(snapshotPath, original);
  return { snapshotPath, original };
}

test('one verified request updates the totals and chart and rolls over the recent period', async t => {
  const { snapshotPath } = await fixture(t);
  let requests = 0;
  const request = async url => {
    requests++;
    assert.equal(url.origin, 'https://serpapi.com');
    assert.equal(url.searchParams.get('engine'), 'google_scholar_author');
    assert.equal(url.searchParams.get('author_id'), previous.authorId);
    assert.equal(url.searchParams.get('hl'), 'en');
    assert.equal(url.searchParams.get('no_cache'), 'true');
    return Response.json(response);
  };
  const input = { apiKey: 'test-key', snapshotPath, now, request };
  assert.equal(await refreshGoogleScholar(input), 'updated');
  assert.equal(requests, 1);
  const updated = JSON.parse(await readFile(snapshotPath, 'utf8'));
  assert.equal(updated.checkedOn, '2027-01-01');
  assert.deepEqual(updated.totals, { citations: 2435, hIndex: 28, i10Index: 47 });
  assert.deepEqual(updated.recent, { since: 2022, citations: 2375, hIndex: 27, i10Index: 46 });
  assert.deepEqual(updated.yearly.map(({ year }) => year), [2022, 2023, 2024, 2025, 2026, 2027]);
  assert.equal(updated.yearly.at(-1).citations, 2);
  assert.equal(await refreshGoogleScholar(input), 'unchanged');
});

test('the missing-key path leaves the snapshot intact and sends no request', async t => {
  const { snapshotPath, original } = await fixture(t);
  const result = await refreshGoogleScholar({ apiKey: ' ', snapshotPath, request: () => assert.fail('Unexpected request') });
  assert.equal(result, 'missing-key');
  assert.equal(await readFile(snapshotPath, 'utf8'), original);
});

test('rate limits, transport errors and unverified data preserve the saved snapshot', async t => {
  const { snapshotPath, original } = await fixture(t);
  const badChart = structuredClone(response);
  badChart.cited_by.graph[0].citations = 'n/a';
  const wrongProfile = { ...response, author: { name: 'Different researcher' } };
  const failedSearch = { search_metadata: { status: 'Error' }, error: 'test-key' };

  for (const [request, message] of [
    [() => new Response(null, { status: 429 }), /HTTP 429/],
    [() => { throw new Error('failure containing test-key'); }, /failed or timed out/],
    [() => Response.json(failedSearch), /did not return a completed/],
    [() => Response.json(wrongProfile), /did not match the configured author/],
    [() => Response.json(badChart), /invalid citation value/],
  ]) {
    await assert.rejects(refreshGoogleScholar({ apiKey: 'test-key', snapshotPath, now, request }), error => {
      assert.match(error.message, message);
      assert.equal(error.message.includes('test-key'), false);
      return true;
    });
    assert.equal(await readFile(snapshotPath, 'utf8'), original);
  }
});
