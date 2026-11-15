import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const flagship = '/research/wearable-foot-kinetics/';
const paperId = 'paper-10-1109-jbhi-2025-3605296';

for (const path of ['/', '/research/', flagship, '/publications/', '/cv/', '/software/']) {
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
