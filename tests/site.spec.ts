import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const flagship = '/research/wearable-foot-kinetics/';
const paperId = 'paper-10-1109-jbhi-2025-3605296';

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
  await page.getByRole('link', { name: 'Citation', exact: true }).click();
  await expect(page).toHaveURL(`/publications/#${paperId}`);
  const paper = page.locator(`#${paperId}`);
  await paper.getByRole('button', { name: /copy citation/i }).click();
  await expect(paper.getByRole('status')).toHaveText('Citation copied.');
  const citation = await page.evaluate(() => navigator.clipboard.readText());
  expect(citation).toContain('Mahmud');
  expect(citation).toContain('https://doi.org/10.1109/jbhi.2025.3605296');
  await page.getByRole('combobox', { name: 'Topic', exact: true }).selectOption('imaging');
  await expect(paper).toBeHidden();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await paper.getByRole('link', { name: 'Project summary' }).click();
  await expect(page).toHaveURL(flagship);
});

test('site navigation and section links stay in the current tab', async ({ page, context }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Explore research' }).click();
  await expect(page).toHaveURL('/#current-research');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Publications' }).click();
  await expect(page).toHaveURL('/publications/');
  expect(context.pages()).toEqual([page]);
  await expect(page.getByRole('link', { name: 'ORCID' }).first()).toHaveAttribute('target', '_blank');
});

test('dataset records link to their release and companion paper', async ({ page, context }) => {
  await page.goto('/software/');
  await page.getByRole('link', { name: 'Browse datasets' }).click();
  await expect(page).toHaveURL('/software/#datasets');
  const listing = page.getByRole('region', { name: 'Datasets', exact: true });
  await expect(listing.getByRole('article')).toHaveCount(3);
  await expect(listing.getByText('Processed treadmill and insole recordings')).toHaveCount(0);
  await expect(listing.getByText('Access by request')).toBeVisible();

  const covid = page.locator('#covid-qu-ex');
  const archive = covid.getByRole('link', { name: 'Kaggle record for COVID-QU-Ex Dataset' });
  await expect(archive).toHaveAttribute('href', 'https://doi.org/10.34740/kaggle/dsv/3122958');
  await expect(archive).toHaveAttribute('target', '_blank');
  await expect(listing.getByRole('link', { name: 'Kaggle record for Aseptic Loose Hip Implant X-Ray Database' }))
    .toHaveAttribute('href', 'https://doi.org/10.34740/kaggle/dsv/3078704');
  await covid.getByRole('link', { name: 'Related paper for COVID-QU-Ex Dataset' }).click();
  const paper = page.locator('#paper-10-1016-j-compbiomed-2021-105002');
  await expect(paper).toBeVisible();
  await paper.getByRole('link', { name: 'Dataset details' }).click();
  await expect(page).toHaveURL('/software/#covid-qu-ex');
  await expect(covid).toBeInViewport();
  expect(context.pages()).toEqual([page]);
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

test('the CV highlights education and provides a navigable experience timeline on mobile', async ({ page, context }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/cv/');
  await expect(page.locator('main h2').nth(1)).toHaveText('Education');
  await page.getByRole('link', { name: 'Education & coursework' }).click();
  await expect(page).toHaveURL('/cv/#education-title');
  const msc = page.locator('#msc-electrical-engineering');
  await expect(msc.getByText('CGPA 3.31 / 4.00')).toBeVisible();
  await expect(msc.getByText('Applied Statistical Analysis')).toBeVisible();
  await expect(msc.locator('.cv-course-list li')).toHaveCount(8);
  await expect(msc.getByRole('link', { name: 'Deep Learning Techniques for Kidney Disease Detection' }))
    .toHaveAttribute('href', 'https://qspace.qu.edu.qa/handle/10576/45080');
  const bsc = page.locator('#bsc-electrical-engineering');
  await expect(bsc.getByText('Artificial Neural Networks')).toBeVisible();
  await expect(bsc.locator('.cv-course-list li')).toHaveCount(20);

  const sections = page.getByRole('navigation', { name: 'CV sections' });
  await sections.getByRole('link', { name: 'Experience', exact: true }).click();
  await expect(page).toHaveURL('/cv/#positions-title');
  const experience = page.getByRole('region', { name: 'Research and professional experience' });
  await expect(experience.getByRole('article')).toHaveCount(12);
  await expect(experience.getByRole('heading', { name: 'Administrative Assistant', exact: true })).toBeVisible();
  await sections.getByRole('link', { name: 'Earlier internships' }).click();
  await expect(page).toHaveURL('/cv/#internships-title');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  expect(context.pages()).toEqual([page]);
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
  await page.getByRole('navigation', { name: 'Publication research areas' }).getByRole('link', { name: /medical imaging/i }).click();
  await expect(page).toHaveURL(/\?topic=imaging#cluster-imaging$/);
  await expect(page.locator('[data-publication-group]:visible')).toHaveCount(1);
  await page.getByRole('checkbox', { name: 'Selected papers only' }).check();
  await expect(page).toHaveURL(/view=selected/);
  await page.reload();
  await expect(page.getByRole('combobox', { name: 'Topic', exact: true })).toHaveValue('imaging');
  await expect(page.getByRole('checkbox', { name: 'Selected papers only' })).toBeChecked();
  await expect(page.locator('[data-publication]:visible')).toHaveCount(5);
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.locator('[data-publication]:visible')).toHaveCount(61);
  await expect(page).toHaveURL('/publications/#bibliography');

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
    await page.getByRole('navigation', { name: 'Publication research areas' }).getByRole('link', { name: /medical imaging/i }).click();
    await expect(page).toHaveURL(/#cluster-imaging$/);
    await expect(page.locator('#cluster-imaging')).toBeInViewport();
    const paper = page.locator('#paper-10-1016-j-bspc-2026-109894');
    await paper.getByText('My contribution', { exact: true }).click();
    await expect(paper.locator('.publication-contribution')).toContainText('feature-transfer');
  });
});
