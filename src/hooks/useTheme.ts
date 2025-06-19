import { useAtom } from 'jotai';
import { atom } from 'jotai';
import { useEffect } from 'react';

export interface Theme {
  background: string;
  backgroundAccent: string;
  border: string;
  text: string;
  textError: string;
  buttonPrimary: string;
  buttonSecondary: string;
  buttonDestructive: string;
}

export const LightTheme: Theme = {
  background: '#ffffff',
  backgroundAccent: '#f4f6f8',
  border: '#d0d7de',
  text: '#1a1a1a',
  textError: '#d32f2f',
  buttonPrimary: '#007bff',
  buttonSecondary: '#6c757d',
  buttonDestructive: '#dc3545',
};

export const DarkTheme: Theme = {
  background: '#222222',
  backgroundAccent: '#1e1e1e',
  border: '#33393f',
  text: '#f5f5f5',
  textError: '#ff6b6b',
  buttonPrimary: '#339af0',
  buttonSecondary: '#adb5bd',
  buttonDestructive: '#ff4d4f',
};

export const Themes = {
  light: LightTheme,
  dark: DarkTheme,
};

export type ThemeKey = keyof typeof Themes;

const themeAtom = atom<ThemeKey>('dark');
const localStorageKey = 'user-theme';

export function camelToKebab(camelCase: string) {
  return camelCase.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
}

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    const saved = localStorage.getItem(localStorageKey);
    if (saved === 'dark' || saved === 'light') {
      setTheme(saved);
    }
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, theme);

    const root = document.documentElement;
    const themeVars = Themes[theme];
    for (const key of Object.keys(themeVars) as (keyof Theme)[]) {
      root.style.setProperty(`--${camelToKebab(key)}`, themeVars[key]);
    }
  }, [theme]);

  return { theme, themeColors: Themes[theme], setTheme };
};
