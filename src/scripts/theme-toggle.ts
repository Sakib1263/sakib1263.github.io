import { colorModeKey, themeBackgrounds, type ColorMode } from '../lib/themes';

const root = document.documentElement;
const toggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

function readMode(): ColorMode {
  return root.dataset.colorMode === 'dark' ? 'dark' : 'light';
}

function applyMode(mode: ColorMode) {
  root.dataset.colorMode = mode;
  toggle?.setAttribute('aria-pressed', String(mode === 'dark'));
  if (themeColor) themeColor.content = themeBackgrounds[mode];
}

if (toggle) {
  applyMode(readMode());
  toggle.hidden = false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeTransition: ViewTransition | undefined;
  let selectedMode = readMode();

  toggle.addEventListener('click', () => {
    const mode = selectedMode === 'dark' ? 'light' : 'dark';
    selectedMode = mode;
    try {
      localStorage.setItem(colorModeKey, mode);
    } catch {
      // The switch remains usable for the current page.
    }
    const update = () => applyMode(mode);
    if (!reduceMotion.matches && typeof document.startViewTransition === 'function') {
      activeTransition?.skipTransition();
      activeTransition = document.startViewTransition(update);
    } else {
      root.dataset.colorModeAnimate = '';
      update();
    }
  });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    try {
      const saved = localStorage.getItem(colorModeKey);
      if (saved === 'light' || saved === 'dark') {
        selectedMode = saved;
        applyMode(saved);
      }
    } catch {
      // The restored page already has its current theme.
    }
  });
}
