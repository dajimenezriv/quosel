import { useEffect, useMemo } from 'react';
import { themeProps } from '@/core/theme/theme-props';
import { useThemeStore } from '@/core/theme/use-theme-store';

export function useTheme() {
  const { theme } = useThemeStore();

  const isDarkMode = useMemo(() => {
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }, [theme]);

  useEffect(() => {
    const styles = isDarkMode ? themeProps.dark : themeProps.light;

    Object.entries(styles).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [isDarkMode]);
}
