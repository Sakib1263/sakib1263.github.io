import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

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

test('research areas lead to project details, supporting publications, and ongoing work', async ({ page, context }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/research/');
  const researchAreas = page.getByRole('navigation', { name: 'Research areas', exact: true });
  await expect(researchAreas.getByRole('link')).toHaveCount(7);
  await expect(page.locator('.research-entry')).toHaveCount(42);
  await researchAreas.getByRole('link', { name: 'Biomedical devices & simulation' }).click();
  await expect(page).toHaveURL('/research/#devices');
  await page.getByRole('link', { name: 'Hip implant mechanics, sensing, and loosening detection', exact: true }).click();
  await expect(page).toHaveURL('/research/hip-implant-mechanics-and-imaging/');
  await expect(page.getByRole('heading', { name: 'My contribution', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Dataset details', exact: true })).toHaveAttribute('href', '/software/#hip-implant-xray');
  await expect(page.getByRole('link', { name: 'Read the paper', exact: true })).toHaveAttribute('target', '_blank');
  await page.getByRole('link', { name: 'All research' }).click();
  await expect(page).toHaveURL('/research/#hip-implant-mechanics-and-imaging');
  await page.getByRole('link', { name: 'Multimodal wearable estimation of 3D gait kinetics', exact: true }).click();
  await expect(page).toHaveURL('/research/multimodal-wearable-kinetics/');
  await expect(page.getByText('Wearable biomechanics · Ongoing research')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Reported results' })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Estimating 3D foot kinetics from wearable signals' })).toHaveAttribute('href', flagship);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  expect(context.pages()).toEqual([page]);
});

test('the research profile displays its saved Google Scholar metrics and yearly chart', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  const saved = JSON.parse(readFileSync(new URL('../src/data/google-scholar.json', import.meta.url), 'utf8'));
  const number = new Intl.NumberFormat('en-GB');
  await page.goto('/research/');
  const snapshot = page.getByRole('region', { name: 'Research profile', exact: true });
  const scholar = snapshot.getByLabel('Google Scholar all-time metrics');
  await expect(scholar.locator('strong')).toHaveText(Object.values(saved.totals).map(value => number.format(Number(value))));
  await expect(scholar.locator('small').first()).toHaveText(`${number.format(saved.recent.citations)} since ${saved.recent.since}`);
  await expect(snapshot.getByRole('link', { name: 'Google Scholar', exact: true })).toHaveAttribute('target', '_blank');
  await expect(snapshot.locator('time')).toHaveAttribute('datetime', saved.checkedOn);
  const history = snapshot.getByRole('figure', { name: 'Google Scholar yearly citation counts' });
  await expect(history.locator('.citation-year')).toHaveText(saved.yearly.map(({ year }) => String(year)));
  await expect(history.locator('.citation-count')).toHaveText(saved.yearly.map(({ citations }) => `${number.format(citations)} citations`));
  await expect(page.getByText(/OpenAlex|Live citation metrics/)).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
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
  await expect(page.getByRole('link', { name: 'Browse datasets' })).toHaveCount(0);
  const sections = page.getByRole('navigation', { name: 'Software & Data sections' });
  await sections.getByRole('link', { name: 'Datasets', exact: true }).click();
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

test('the homepage portrait and contact are easy to find on narrow screens', async ({ page, context }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/');
  const portrait = page.getByRole('img', { name: 'Portrait of Sakib Mahmud' });
  await expect(portrait).toBeVisible();
  await expect(portrait).toHaveAttribute('srcset', /\b768w\b/);
  await expect.poll(async () => (await portrait.boundingBox())?.width ?? 0).toBeGreaterThan(250);
  await expect.poll(() => portrait.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect(page.getByRole('region', { name: 'Featured research' }).getByRole('article')).toHaveCount(3);
  await expect(page.getByRole('region', { name: 'Ongoing research' }).getByRole('article')).toHaveCount(2);

  await page.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL('/#contact');
  const contact = page.getByRole('region', { name: 'Contact' });
  await expect(contact.getByRole('link', { name: 'sakib.mahmud@qu.edu.qa' })).toHaveAttribute('href', /^mailto:sakib\.mahmud@qu\.edu\.qa/);
  await expect(contact.getByRole('link', { name: 'Google Scholar' })).toHaveAttribute('target', '_blank');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  expect(context.pages()).toEqual([page]);
});

test('the CV highlights education and provides a navigable experience timeline on mobile', async ({ page, context }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/cv/');
  await expect(page.locator('main h2').nth(1)).toHaveText('Education');
  await expect(page.getByRole('link', { name: 'Education & coursework' })).toHaveCount(0);
  await expect(page.getByText('Print this page', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Download CV (PDF)' })).toBeVisible();
  const sections = page.getByRole('navigation', { name: 'CV sections' });
  await expect(sections.getByRole('link')).toHaveText([
    'Education', 'Experience', 'Technical skills', 'Certifications', 'Awards & distinctions', 'Languages',
  ]);
  await sections.getByRole('link', { name: 'Education', exact: true }).click();
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
  for (const degree of [msc, bsc]) {
    const supervisor = degree.getByRole('link', { name: 'Muhammad E. H. Chowdhury', exact: true });
    await expect(supervisor).toHaveAttribute('href', 'https://scholar.google.com/citations?user=BrBVR_UAAAAJ&hl=en');
    await expect(supervisor).toHaveAttribute('target', '_blank');
  }

  await sections.getByRole('link', { name: 'Experience', exact: true }).click();
  await expect(page).toHaveURL('/cv/#positions-title');
  const experience = page.getByRole('region', { name: 'Research and professional experience' });
  await expect(experience.getByRole('article')).toHaveCount(12);
  await expect(experience.getByRole('heading', { name: 'Administrative Assistant', exact: true })).toBeVisible();
  await expect(experience.getByRole('heading', { name: 'Earlier internships and apprenticeships' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Selected research contributions' })).toHaveCount(0);

  await sections.getByRole('link', { name: 'Certifications', exact: true }).click();
  await expect(page).toHaveURL('/cv/#certifications-title');
  const credentials = page.getByRole('region', { name: 'Certifications & specializations' });
  await expect(credentials.getByRole('listitem')).toHaveCount(9);
  await expect(credentials.getByRole('link')).toHaveCount(8);
  await expect(credentials.locator('a[target="_blank"][rel="noopener"]')).toHaveCount(8);
  await expect(credentials.getByRole('link', { name: 'Google Data Analytics Professional Certificate', exact: true }))
    .toHaveAttribute('href', 'https://coursera.org/verify/professional-cert/ZFM267WNWX6N');
  await expect(credentials.getByText('Azure Fundamentals (AZ-900), Azure Data Fundamentals (DP-900), and Azure AI Fundamentals (AI-900)')).toBeVisible();
  await expect(page.getByRole('region', { name: 'Technical skills' }).getByRole('listitem')).toHaveCount(9);
  await expect(page.getByRole('region', { name: 'Awards & distinctions' }).getByRole('listitem')).toHaveCount(8);
  await expect(page.getByRole('region', { name: 'Languages' }).getByText('Limited working proficiency')).toBeVisible();
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

test('publication search accepts pasted DOIs and punctuation in ordinary searches', async ({ page }) => {
  await page.goto('/publications/');
  const search = page.getByRole('searchbox', { name: 'Search', exact: true });
  const results = page.locator('[data-publication]:visible');
  for (const query of [
    '10.1109/JBHI.2025.3605296',
    ' DOI: 10.1109/JBHI.2025.3605296. ',
    'https://dx.doi.org/10.1109%2FJBHI.2025.3605296?ref=profile',
  ]) {
    await search.fill(query);
    await expect(results).toHaveCount(1);
    await expect(results).toHaveAttribute('id', paperId);
  }
  await search.fill('  KIDNEY–STONE,   SEGMENTATION  ');
  await expect(results).toHaveCount(1);
  await expect(results).toHaveAttribute('id', 'paper-10-1016-j-bspc-2026-109894');
  await search.press('Enter');
  await expect(results).toHaveCount(1);
  await search.fill('   ');
  await expect(results).toHaveCount(61);
  expect(new URL(page.url()).searchParams.has('query')).toBe(false);
});

test('publication facets combine with search and restore on back and forward', async ({ page }) => {
  await page.goto('/publications/');
  const search = page.getByRole('searchbox', { name: 'Search', exact: true });
  const topic = page.getByRole('combobox', { name: 'Topic', exact: true });
  const year = page.getByRole('combobox', { name: 'Issue year', exact: true });
  const type = page.getByRole('combobox', { name: 'Type', exact: true });
  const selected = page.getByRole('checkbox', { name: 'Selected papers only' });
  const results = page.locator('[data-publication]:visible');
  const empty = page.locator('[data-publication-empty]');

  await topic.selectOption('biomechanics');
  await type.selectOption('Journal article');
  await selected.check();
  await year.selectOption('2026');
  await search.fill('https://doi.org/10.1109/jbhi.2025.3605296');
  await expect(results).toHaveAttribute('id', paperId);
  await year.selectOption('2025');
  await expect(results).toHaveCount(0);
  await expect(page.locator('[data-publication-group]:visible')).toHaveCount(0);
  await expect(page.locator('[data-publication-count]')).toHaveText('0 of 61 publications');
  await expect(empty).toBeVisible();

  await page.goBack();
  await expect(year).toHaveValue('2026');
  await expect(topic).toHaveValue('biomechanics');
  await expect(type).toHaveValue('Journal article');
  await expect(selected).toBeChecked();
  await expect(results).toHaveAttribute('id', paperId);
  await page.goForward();
  await expect(year).toHaveValue('2025');
  await expect(empty).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(search).toHaveValue('');
  await expect(selected).not.toBeChecked();
  await expect(empty).toBeHidden();
  await expect(results).toHaveCount(61);
  await expect(page).toHaveURL('/publications/');
});

test('shared publication links handle invalid filters and hidden topic anchors', async ({ page }) => {
  await page.goto('/publications/?topic=biomechanics&topic=imaging&year=never&type=unknown&view=other&ref=cv#cluster-imaging');
  await expect(page).toHaveURL('/publications/?topic=biomechanics&ref=cv#bibliography');
  await expect(page.getByRole('combobox', { name: 'Topic', exact: true })).toHaveValue('biomechanics');
  await expect(page.getByRole('combobox', { name: 'Issue year', exact: true })).toHaveValue('');
  await expect(page.getByRole('combobox', { name: 'Type', exact: true })).toHaveValue('');
  await expect(page.getByRole('checkbox', { name: 'Selected papers only' })).not.toBeChecked();
  await expect(page.locator('[data-publication]:visible')).toHaveCount(7);
  await expect(page.locator('#cluster-biomechanics')).toBeVisible();
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
