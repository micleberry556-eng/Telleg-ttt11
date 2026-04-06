import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { THEMES, type FullTheme } from '@/data/themePresets';

interface ThemeContextValue {
  theme: FullTheme | null;
  themeId: string | null;
  setThemeId: (id: string | null) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: null,
  themeId: null,
  setThemeId: () => {},
});

const STORAGE_KEY = 'telleg_theme_id';

function loadId(): string | null {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
}
function saveId(id: string | null) {
  try { if (id) localStorage.setItem(STORAGE_KEY, id); else localStorage.removeItem(STORAGE_KEY); } catch { /* */ }
}

/** Apply a theme's CSS variables, font, and body background to the document. */
function applyTheme(theme: FullTheme | null) {
  const root = document.documentElement;
  if (!theme) {
    // Reset to defaults — remove all inline styles set by themes.
    root.removeAttribute('style');
    root.removeAttribute('data-theme');
    document.body.style.backgroundImage = '';
    document.body.style.backgroundAttachment = '';
    document.body.style.backgroundSize = '';
    return;
  }
  for (const [key, value] of Object.entries(theme.vars)) {
    root.style.setProperty(key, value);
  }
  root.style.fontFamily = theme.font;
  document.body.style.backgroundImage = theme.bodyBg;
  document.body.style.backgroundAttachment = 'fixed';
  document.body.style.backgroundSize = theme.bgSize || 'auto';

  // Set data-theme attribute for CSS-only theme overrides (e.g. anime).
  if (theme.id === 'anime') {
    root.setAttribute('data-theme', 'anime');
  } else {
    root.removeAttribute('data-theme');
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<string | null>(() => loadId());
  const theme = themeId ? THEMES.find(t => t.id === themeId) ?? null : null;

  const setThemeId = (id: string | null) => {
    setThemeIdState(id);
    saveId(id);
  };

  // Apply theme on mount and whenever it changes.
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeId, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Read the active theme (null = default). */
export function useTheme() {
  return useContext(ThemeContext);
}
