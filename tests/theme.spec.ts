import { expect, test } from '@playwright/test';

const palette = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#14213D',
  primary: '#1D4ED8',
  accent: '#0F766E',
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

test('Modern Professional uses the exact palette and accessible contrast', async ({ page }) => {
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

test('Modern Professional applies across the site over a saved theme and a dark device preference', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.addInitScript(() => localStorage.setItem('portfolio-theme', 'midnight-tech'));
  for (const path of ['/', '/research/', '/publications/', '/software/', '/cv/']) {
    await page.goto(path);
    await expect(page.locator('html')).toHaveCSS('background-color', 'rgb(248, 250, 252)');
    await expect(page.locator('html')).toHaveCSS('color-scheme', 'light');
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', palette.background);
    await expect(page.locator('[data-theme-picker]')).toHaveCount(0);
  }
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false, colorScheme: 'dark' });

  test('Modern Professional renders on a device set to dark mode', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveCSS('background-color', 'rgb(248, 250, 252)');
  });
});
