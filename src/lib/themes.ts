export const modernProfessional = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#14213D',
  primary: '#1D4ED8',
  accent: '#0F766E',
} as const;

export const midnightTech = {
  background: '#0B1220',
  surface: '#152238',
  text: '#EAF0F8',
  primary: '#60A5FA',
  accent: '#A78BFA',
} as const;

export const themes = { light: modernProfessional, dark: midnightTech };
export type ColorMode = keyof typeof themes;
export const colorModeKey = 'portfolio-color-mode';
export const themeBackgrounds = { light: themes.light.background, dark: themes.dark.background };

function rule(selector: string, mode: ColorMode) {
  const tokens = Object.entries(themes[mode]).map(([name, value]) => `--${name}:${value};`).join('');
  const buttonText = mode === 'dark' ? 'background' : 'surface';
  return `${selector}{${tokens}color-scheme:${mode};--on-primary:var(--${buttonText});}`;
}

const darkSelector = ':root[data-color-mode="dark"]';
export const themeCss = [
  rule(':root', 'light'),
  rule(darkSelector, 'dark'),
  `@media print{${rule(darkSelector, 'light')}}`,
].join('\n');
