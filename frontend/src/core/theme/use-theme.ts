import { useEffect } from 'react';
import { themeProps } from '@/core/theme/theme-props';
import { useThemeStore } from '@/core/theme/use-theme-store';

export function useTheme() {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    const styles = isDarkMode ? themeProps.dark : themeProps.light;

    Object.entries(styles).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [isDarkMode]);
}
