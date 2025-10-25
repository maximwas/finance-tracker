'use client';

import { createContext, type JSX, type ReactNode, useContext, useEffect, useState } from 'react';

export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export interface IThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export interface IThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, defaultTheme }: IThemeProviderProps): JSX.Element {
  const [theme, setTheme] = useState<Theme>(defaultTheme || Theme.Light);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle(Theme.Light, theme === Theme.Light);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === Theme.Light ? Theme.Dark : Theme.Light));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): IThemeContextType | undefined {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
