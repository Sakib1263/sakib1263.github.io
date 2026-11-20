import { colorModeKey, themeBackgrounds, type ColorMode } from '../lib/themes';

const root = document.documentElement;
const toggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
// Long enough for the colour fade in theme.css to finish before transitions are switched off again.
const fadeDuration = 320;

function readMode(): ColorMode {
  return root.dataset.colorMode === 'dark' ? 'dark' : 'light';
}

function applyMode(mode: ColorMode) {
  root.dataset.colorMode = mode;
  toggle?.setAttribute('aria-pressed', String(mode === 'dark'));
  toggle?.setAttribute('title', mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  if (themeColor) themeColor.content = themeBackgrounds[mode];
}

if (toggle) {
  applyMode(readMode());
  toggle.hidden = false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let fadeTimer: number | undefined;

  toggle.addEventListener('click', () => {
    const mode = readMode() === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(colorModeKey, mode);
    } catch {
      // The switch remains usable for the current page.
    }
    // Colours fade in place. The page is never snapshotted or re-laid out, so nothing jumps or flashes.
    if (!reduceMotion.matches) {
      root.dataset.colorModeAnimate = '';
      window.clearTimeout(fadeTimer);
      fadeTimer = window.setTimeout(() => delete root.dataset.colorModeAnimate, fadeDuration);
    }
    applyMode(mode);
  });

  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    try {
      const saved = localStorage.getItem(colorModeKey);
      if (saved === 'light' || saved === 'dark') applyMode(saved);
    } catch {
      // The restored page already has its current theme.
    }
  });
}
