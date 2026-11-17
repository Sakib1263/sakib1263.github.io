export const modernProfessional = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#14213D',
  primary: '#1D4ED8',
  accent: '#0F766E',
} as const;

const tokens = Object.entries(modernProfessional).map(([name, value]) => `--${name}:${value};`).join('');
export const themeCss = `:root{${tokens}color-scheme:light;--on-primary:var(--surface);}`;
