import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const palettes = [
  ['Modern Professional', '#F8FAFC', '#FFFFFF', '#14213D', '#1D4ED8', '#0F766E'],
  ['Midnight Tech', '#0B1220', '#152238', '#EAF0F8', '#60A5FA', '#A78BFA'],
  ['Warm Editorial', '#F7F5F0', '#FFFFFF', '#252525', '#1F4D3A', '#C76D4F'],
  ['Minimalist Monochrome', '#FAFAF9', '#EFEFED', '#18181B', '#6D28D9', '#737373'],
  ['Botanical Sage', '#F3F7F2', '#FFFFFF', '#20352A', '#23624C', '#A3BDAF'],
  ['Creative Terracotta', '#FFF7F1', '#FFFFFF', '#202432', '#C24132', '#EAC54F'],
];
const baseTokens = ['background', 'surface', 'text', 'primary', 'accent'];
const grounds = ['background', 'surface', 'surface-subtle', 'surface-tint'];
const textColors = ['text', 'text-muted', 'link'];
const controlColors = ['primary', 'accent-strong', 'border-control', 'focus'];
const wcag = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function checkAccessibility(page: Page) {
  await page.evaluate(() => document.fonts.ready.then(() => true));
  const { violations } = await new AxeBuilder({ page }).withTags(wcag).analyze();
  expect(violations).toEqual([]);
}

function luminance(rgb: number[]) {
  const [r, g, b] = rgb.map(value => {
    const channel = value / 255;
    return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
  });
  return .2126 * r + .7152 * g + .0722 * b;
}

function contrast(first: number[], second: number[]) {
  const [light, dark] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (light + .05) / (dark + .05);
}

test.use({ reducedMotion: 'reduce' });

for (const [label, ...expectedColors] of palettes) {
  test(`${label} preserves the exact palette and accessible contrast`, async ({ page }) => {
    await page.goto('/');
    await page.locator('.theme-picker summary').click();
    await expect(page.getByRole('radio')).toHaveCount(7);
    await page.getByRole('radio', { name: label, exact: true }).check();

    const actual = await page.evaluate(tokens => {
      const root = getComputedStyle(document.documentElement);
      return tokens.map(token => root.getPropertyValue(`--${token}`).trim().toUpperCase());
    }, baseTokens);
    expect(actual).toEqual(expectedColors);

    const colors = await page.evaluate(tokens => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const context = canvas.getContext('2d', { willReadFrequently: true })!;
      const sample = document.createElement('span');
      document.body.append(sample);
      const computed = Object.fromEntries(tokens.map(token => {
        sample.style.color = `var(--${token})`;
        context.fillStyle = getComputedStyle(sample).color;
        context.fillRect(0, 0, 1, 1);
        return [token, Array.from(context.getImageData(0, 0, 1, 1).data).slice(0, 3)];
      }));
      sample.remove();
      return computed;
    }, [...grounds, ...textColors, ...controlColors, 'on-primary', 'primary-hover']);

    for (const ground of grounds) {
      for (const text of textColors) expect(contrast(colors[text], colors[ground]), `${text} on ${ground}`).toBeGreaterThanOrEqual(4.5);
      for (const control of controlColors) expect(contrast(colors[control], colors[ground]), `${control} on ${ground}`).toBeGreaterThanOrEqual(3);
    }
    for (const fill of ['primary', 'primary-hover']) {
      expect(contrast(colors['on-primary'], colors[fill]), `button text on ${fill}`).toBeGreaterThanOrEqual(4.5);
    }

    await checkAccessibility(page);
    await page.goto('/publications/');
    await expect(page.locator('html')).toHaveCSS('background-color', `rgb(${colors.background.join(', ')})`);
    await expect(page.getByRole('searchbox', { name: 'Search' })).toBeVisible();
    await checkAccessibility(page);
  });
}

test('the picker follows the system, remembers a choice and resets to System on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  const root = page.locator('html');
  await expect(root).toHaveCSS('background-color', 'rgb(248, 250, 252)');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(root).toHaveCSS('background-color', 'rgb(11, 18, 32)');

  const trigger = page.locator('.theme-picker summary');
  await trigger.focus();
  await trigger.press('Enter');
  const picker = page.locator('.theme-picker');
  await expect(picker).toHaveAttribute('open', '');
  const system = page.getByRole('radio', { name: 'System', exact: true });
  await expect(system).toBeChecked();
  await system.focus();
  await system.press('ArrowDown');
  const manual = page.getByRole('radio', { name: 'Modern Professional', exact: true });
  await expect(manual).toBeChecked();
  await expect(root).toHaveCSS('background-color', 'rgb(248, 250, 252)');
  await expect(root).toHaveCSS('transition-duration', '0s');
  const bounds = await page.locator('.theme-panel').boundingBox();
  expect(bounds?.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  await manual.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(picker).not.toHaveAttribute('open', '');

  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Research' }).click();
  await page.reload();
  await expect(root).toHaveAttribute('data-theme', 'modern-professional');
  await expect(page.locator('meta[name="theme-color"]').first()).toHaveAttribute('content', '#F8FAFC');
  await trigger.click();
  await system.check();
  await expect(root).not.toHaveAttribute('data-theme');
  await expect(root).toHaveCSS('background-color', 'rgb(11, 18, 32)');
  await page.reload();
  await expect(root).toHaveCSS('background-color', 'rgb(11, 18, 32)');
});

test('Midnight Tech is accessible across the research, software, and CV pages', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  for (const path of ['/research/', '/research/wearable-foot-kinetics/', '/research/prenatal-hydronephrosis/', '/software/', '/cv/']) {
    await page.goto(path);
    await checkAccessibility(page);
  }
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false, colorScheme: 'dark' });

  test('the system theme renders before and without the picker', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveCSS('background-color', 'rgb(11, 18, 32)');
    await expect(page.locator('.theme-picker')).toBeHidden();
  });
});
