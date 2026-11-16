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

test('publication themes and selected filters remain shareable', async ({ page }) => {
  await page.goto('/publications/');
  await expect(page.getByRole('navigation', { name: 'Publication research areas' }).getByRole('link')).toHaveCount(6);
  await expect(page.locator('[data-publication]:visible')).toHaveCount(61);
  await page.getByRole('navigation', { name: 'Publication research areas' }).getByRole('link', { name: /medical imaging/i }).click();
  await expect(page).toHaveURL(/\?topic=imaging#cluster-imaging$/);
  await expect(page.locator('[data-publication-group]:visible')).toHaveCount(1);
  await page.getByRole('checkbox', { name: 'Selected papers only' }).check();
  await expect(page).toHaveURL(/view=selected/);
  const view = page.url();
  await page.goto(view);
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

test.describe('publication navigation without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('a topic link lands on its own group', async ({ page }) => {
    await page.goto('/publications/');
    await page.getByRole('navigation', { name: 'Publication research areas' }).getByRole('link', { name: /medical imaging/i }).click();
    await expect(page).toHaveURL(/#cluster-imaging$/);
    await expect(page.locator('#cluster-imaging')).toBeInViewport();
  });
});
