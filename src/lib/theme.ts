const THEME_KEY = 'gitweb.theme';

export type ThemePreference = 'system' | 'light' | 'dark';

export function getThemePreference(): ThemePreference {
  try {
    const v = localStorage.getItem(THEME_KEY);
    if (v === 'light' || v === 'dark' || v === 'system') return v;
  } catch {
    /* ignore */
  }
  return 'system';
}

export function setThemePreference(pref: ThemePreference): void {
  localStorage.setItem(THEME_KEY, pref);
  applyTheme(pref);
}

export function applyTheme(pref: ThemePreference = getThemePreference()): void {
  const root = document.documentElement;
  let theme: 'light' | 'dark';
  if (pref === 'system') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  } else {
    theme = pref;
  }
  root.setAttribute('data-theme', theme);
}

export function initTheme(): void {
  applyTheme();
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      if (getThemePreference() === 'system') applyTheme('system');
    });
}
