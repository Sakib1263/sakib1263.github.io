import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Locator } from '@playwright/test';

const flagship = '/research/wearable-foot-kinetics/';
const paperId = 'paper-10-1109-jbhi-2025-3605296';

async function followLink(link: Locator) {
  const [tab] = await Promise.all([link.page().context().waitForEvent('page'), link.click()]);
  return tab;
}

for (const path of ['/', '/research/', flagship, '/research/prenatal-hydronephrosis/', '/publications/', '/cv/', '/software/']) {
  test(`checks accessibility at ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready.then(() => true));
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(violations).toEqual([]);
  });
}

test('mobile navigation stays visible and the flagship fits at 320 pixels', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto(flagship);
  await page.getByRole('heading', { name: 'Mediolateral ground reaction moment' }).scrollIntoViewIfNeeded();
  await expect(page.getByText('Normalized amplitude (unitless)')).toBeVisible();
  await page.getByRole('heading', { name: 'Work with the study data' }).scrollIntoViewIfNeeded();
  expect(await page.locator('.site-header').evaluate(header => header.getBoundingClientRect().top)).toBe(0);
  const viewport = await page.evaluate(() => ({ width: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
  expect(viewport.content).toBeLessThanOrEqual(viewport.width);
});

test('project and paper links round-trip and the citation copies', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto(flagship);
  const bibliography = await followLink(page.getByRole('link', { name: 'Citation', exact: true }));
  await expect(bibliography).toHaveURL(`/publications/#${paperId}`);
  await expect(page).toHaveURL(flagship);
  const paper = bibliography.locator(`#${paperId}`);
  await paper.getByRole('button', { name: /copy citation/i }).click();
  await expect(paper.getByRole('status')).toHaveText('Citation copied.');
  const citation = await bibliography.evaluate(() => navigator.clipboard.readText());
  expect(citation).toContain('Mahmud');
  expect(citation).toContain('https://doi.org/10.1109/jbhi.2025.3605296');
  await bibliography.getByRole('combobox', { name: 'Topic', exact: true }).selectOption('imaging');
  await expect(paper).toBeHidden();
  await bibliography.getByRole('button', { name: 'Clear filters' }).click();
  const project = await followLink(paper.getByRole('link', { name: 'Project summary' }));
  await expect(project).toHaveURL(flagship);
});

test('CV download works from the homepage', async ({ page, request }) => {
  await page.goto('/');
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download CV' }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe('sakib-mahmud-cv.pdf');
  const response = await request.get('/sakib-mahmud-cv.pdf');
  expect(response.ok()).toBe(true);
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
});

test('the publications page downloads the complete BibTeX file', async ({ page }) => {
  await page.goto('/publications/');
  const downloaded = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download BibTeX' }).click();
  const file = await downloaded;
  expect(file.suggestedFilename()).toBe('publications.bib');
  const downloadStream = await file.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of downloadStream) chunks.push(chunk);
  const bibliography = Buffer.concat(chunks).toString('utf8');
  expect(bibliography.match(/^@\w+\{/gm)).toHaveLength(61);
  expect(bibliography).toContain('isbn = {978-981-97-3302-6}');
  expect(bibliography).toContain('editor = {Yang, Xin-She and Sherratt, Simon and Dey, Nilanjan and Joshi, Amit}');
  expect(bibliography).toContain('eid = {130241}');
});

test('publication themes and selected filters remain shareable', async ({ page }) => {
  await page.goto('/publications/');
  await expect(page.getByRole('navigation', { name: 'Publication research areas' }).getByRole('link')).toHaveCount(6);
  await expect(page.locator('[data-publication]:visible')).toHaveCount(61);
  const filtered = await followLink(page.getByRole('navigation', { name: 'Publication research areas' }).getByRole('link', { name: /medical imaging/i }));
  await expect(filtered).toHaveURL(/\?topic=imaging#cluster-imaging$/);
  await expect(filtered.locator('[data-publication-group]:visible')).toHaveCount(1);
  await filtered.getByRole('checkbox', { name: 'Selected papers only' }).check();
  await expect(filtered).toHaveURL(/view=selected/);
  await filtered.reload();
  await expect(filtered.getByRole('combobox', { name: 'Topic', exact: true })).toHaveValue('imaging');
  await expect(filtered.getByRole('checkbox', { name: 'Selected papers only' })).toBeChecked();
  await expect(filtered.locator('[data-publication]:visible')).toHaveCount(5);
  await filtered.getByRole('button', { name: 'Clear filters' }).click();
  await expect(filtered.locator('[data-publication]:visible')).toHaveCount(61);
  await expect(filtered).toHaveURL('/publications/#bibliography');

  await page.goto('/publications/?view=selected');
  await expect(page.locator('[data-publication]:visible')).toHaveCount(10);
});

test('a paper link wins over an incompatible filter', async ({ page }) => {
  await page.goto(`/publications/?topic=imaging#${paperId}`);
  await expect(page.locator(`#${paperId}`)).toBeVisible();
  await expect(page).toHaveURL(`/publications/#${paperId}`);
});

test('the publication list fits a narrow screen and can search contributions', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/publications/');
  await expect(page.getByRole('navigation', { name: 'Research profiles' }).getByRole('link')).toHaveCount(5);
  await expect(page.locator('[data-publication] .publication-summary')).toHaveCount(61);
  await expect(page.locator('[data-publication] .publication-contribution')).toHaveCount(61);
  await expect(page.locator(`#${paperId} .journal-metrics`)).toContainText('Q1');
  await expect(page.locator(`#${paperId} .journal-metrics`)).toContainText('Impact Factor 7.7');
  await expect(page.locator('[data-type="Conference paper"] .journal-metrics')).toHaveCount(0);
  await expect(page.getByText(/OpenAlex/)).toHaveCount(0);
  await page.getByRole('searchbox', { name: 'Search', exact: true }).fill('Arduino control code');
  await expect(page.locator('[data-publication]:visible')).toHaveCount(1);
  const paper = page.locator('[data-publication]:visible');
  await expect(paper.locator('.publication-contribution')).toBeHidden();
  await paper.getByText('My contribution', { exact: true }).click();
  await expect(paper.locator('.publication-contribution')).toContainText('Arduino control code');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
});

test.describe('publication navigation without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('a topic link lands on its own group', async ({ page }) => {
    await page.goto('/publications/');
    const topic = await followLink(page.getByRole('navigation', { name: 'Publication research areas' }).getByRole('link', { name: /medical imaging/i }));
    await expect(topic).toHaveURL(/#cluster-imaging$/);
    await expect(topic.locator('#cluster-imaging')).toBeInViewport();
    const paper = topic.locator('#paper-10-1016-j-bspc-2026-109894');
    await paper.getByText('My contribution', { exact: true }).click();
    await expect(paper.locator('.publication-contribution')).toContainText('feature-transfer');
  });
});
