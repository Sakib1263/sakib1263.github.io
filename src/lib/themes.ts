type HexColor = `#${string}`;
type Palette = Record<'background' | 'surface' | 'text' | 'primary' | 'accent', HexColor>;
type Theme = { label: string; scheme: 'light' | 'dark'; colors: Palette };

export const themes = {
  'modern-professional': {
    label: 'Modern Professional', scheme: 'light',
    colors: { background: '#F8FAFC', surface: '#FFFFFF', text: '#14213D', primary: '#1D4ED8', accent: '#0F766E' },
  },
  'midnight-tech': {
    label: 'Midnight Tech', scheme: 'dark',
    colors: { background: '#0B1220', surface: '#152238', text: '#EAF0F8', primary: '#60A5FA', accent: '#A78BFA' },
  },
  'warm-editorial': {
    label: 'Warm Editorial', scheme: 'light',
    colors: { background: '#F7F5F0', surface: '#FFFFFF', text: '#252525', primary: '#1F4D3A', accent: '#C76D4F' },
  },
  'minimalist-monochrome': {
    label: 'Minimalist Monochrome', scheme: 'light',
    colors: { background: '#FAFAF9', surface: '#EFEFED', text: '#18181B', primary: '#6D28D9', accent: '#737373' },
  },
  'botanical-sage': {
    label: 'Botanical Sage', scheme: 'light',
    colors: { background: '#F3F7F2', surface: '#FFFFFF', text: '#20352A', primary: '#23624C', accent: '#A3BDAF' },
  },
  'creative-terracotta': {
    label: 'Creative Terracotta', scheme: 'light',
    colors: { background: '#FFF7F1', surface: '#FFFFFF', text: '#202432', primary: '#C24132', accent: '#EAC54F' },
  },
} as const satisfies Record<string, Theme>;

export type ThemeId = keyof typeof themes;
export const lightTheme = 'modern-professional' satisfies ThemeId;
export const darkTheme = 'midnight-tech' satisfies ThemeId;
export const themeStorageKey = 'portfolio-theme';

export function isThemeId(value: string | null): value is ThemeId {
  return value !== null && Object.hasOwn(themes, value);
}

function rule(selector: string, { colors, scheme }: Theme) {
  const tokens = Object.entries(colors).map(([name, value]) => `--${name}:${value};`).join('');
  const buttonText = scheme === 'dark' ? 'background' : 'surface';
  return `${selector}{${tokens}color-scheme:${scheme};--on-primary:var(--${buttonText});}`;
}

export const themeCss = [
  rule(':root', themes[lightTheme]),
  `@media screen and (prefers-color-scheme: dark){${rule(':root:not([data-theme])', themes[darkTheme])}}`,
  ...Object.entries(themes).map(([id, theme]) => rule(`:root[data-theme="${id}"], .theme-preview[data-palette="${id}"]`, theme)),
  `@media print{${rule(':root, :root[data-theme]', themes[lightTheme])}}`,
].join('\n');
