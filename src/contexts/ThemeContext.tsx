import { createContext, useContext, useState, type ReactNode } from 'react';
import {
  THEME_PRESETS,
  getSurfaceClass,
  getHeaderClass,
  getIconAnimClass,
  type ThemePreset,
  type SurfaceStyle,
  type ThemeHeaderStyle,
  type IconAnimation,
} from '@/data/themePresets';

/**
 * Resolved theme values ready for use by any component.
 * Components read these instead of raw CSS variables.
 */
export interface ResolvedTheme {
  /** The full preset object (null = default, no preset active). */
  preset: ThemePreset | null;

  /* ── CSS class helpers ── */
  surfaceClass: string;
  headerClass: string;
  iconAnimClass: string;

  /* ── Raw values for conditional logic ── */
  surfaceStyle: SurfaceStyle;
  headerStyle: ThemeHeaderStyle;
  iconAnimation: IconAnimation;
}

interface ThemeContextValue {
  theme: ResolvedTheme;
  setActivePresetId: (id: string | null) => void;
}

const DEFAULT_RESOLVED: ResolvedTheme = {
  preset: null,
  surfaceClass: 'glass-card',
  headerClass: 'glass',
  iconAnimClass: '',
  surfaceStyle: 'glass',
  headerStyle: 'glass',
  iconAnimation: 'none',
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_RESOLVED,
  setActivePresetId: () => {},
});

function resolve(preset: ThemePreset | null): ResolvedTheme {
  if (!preset) return DEFAULT_RESOLVED;
  return {
    preset,
    surfaceClass: getSurfaceClass(preset.surfaceStyle),
    headerClass: getHeaderClass(preset.headerStyle),
    iconAnimClass: getIconAnimClass(preset.iconAnimation),
    surfaceStyle: preset.surfaceStyle,
    headerStyle: preset.headerStyle,
    iconAnimation: preset.iconAnimation,
  };
}

const STORAGE_KEY = 'telleg_active_theme';

function loadPresetId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function savePresetId(id: string | null) {
  try {
    if (id) localStorage.setItem(STORAGE_KEY, id);
    else localStorage.removeItem(STORAGE_KEY);
  } catch { /* ignore */ }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [presetId, setPresetId] = useState<string | null>(() => loadPresetId());

  const preset = presetId ? THEME_PRESETS.find(p => p.id === presetId) ?? null : null;
  const theme = resolve(preset);

  const setActivePresetId = (id: string | null) => {
    setPresetId(id);
    savePresetId(id);
  };

  return (
    <ThemeContext.Provider value={{ theme, setActivePresetId }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Hook to read the current resolved theme. */
export function useTheme(): ResolvedTheme {
  return useContext(ThemeContext).theme;
}

/** Hook to change the active theme preset. */
export function useSetTheme(): (id: string | null) => void {
  return useContext(ThemeContext).setActivePresetId;
}
