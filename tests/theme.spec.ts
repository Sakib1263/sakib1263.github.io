import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const palettes = {
  light: { background: '#F8FAFC', surface: '#FFFFFF', text: '#14213D', primary: '#1D4ED8', accent: '#0F766E' },
  dark: { background: '#0B1220', surface: '#152238', text: '#EAF0F8', primary: '#60A5FA', accent: '#A78BFA' },
};
const grounds = ['background', 'surface', 'surface-subtle', 'surface-tint'];
const textColors = ['text', 'text-muted', 'link'];
const controlColors = ['primary', 'accent-strong', 'border-control', 'focus'];

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

for (const mode of ['light', 'dark'] as const) {
  test(`${mode} mode uses the exact palette and accessible contrast`, async ({ page }) => {
    const palette = palettes[mode];
    await page.addInitScript(saved => localStorage.setItem('portfolio-color-mode', saved), mode);
    await page.goto('/');
    const actual = await page.evaluate(tokens => {
      const root = getComputedStyle(document.documentElement);
      return Object.fromEntries(tokens.map(token => [token, root.getPropertyValue(`--${token}`).trim().toUpperCase()]));
    }, Object.keys(palette));
    expect(actual).toEqual(palette);

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
  });
}

test('the keyboard-accessible switch keeps the selected theme across pages and reloads', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('portfolio-theme', 'warm-editorial'));
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Dark mode', exact: true });
  await expect(toggle).toBeInViewport();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'light');
  await toggle.focus();
  await page.keyboard.press('Space');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(toggle).toBeFocused();
  for (const path of ['/research/', '/publications/', '/software/', '/cv/']) {
    await page.goto(path);
    await expect(page.locator('html')).toHaveCSS('background-color', 'rgb(11, 18, 32)');
    await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', palettes.dark.background);
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  }
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'light');
  await page.emulateMedia({ media: 'screen' });
  await toggle.click();
  await page.reload();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', palettes.light.background);
});

for (const path of ['/', '/research/', '/publications/', '/software/', '/cv/']) {
  test(`dark mode is accessible at ${path}`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('portfolio-color-mode', 'dark'));
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready.then(() => true));
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(violations).toEqual([]);
  });
}

test('switching themes keeps the viewport in place', async ({ page }) => {
  await page.goto('/research/');
  await page.locator('#project-catalog').scrollIntoViewIfNeeded();
  const scroll = await page.evaluate(() => window.scrollY);
  const toggle = page.getByRole('button', { name: 'Dark mode' });
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
  expect(await page.evaluate(() => window.scrollY)).toBe(scroll);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false, colorScheme: 'dark' });

  test('Modern Professional renders on a device set to dark mode', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveCSS('background-color', 'rgb(248, 250, 252)');
    await expect(page.getByRole('button', { name: 'Dark mode' })).toHaveCount(0);
  });
});
