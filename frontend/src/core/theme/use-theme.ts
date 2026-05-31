import { useThemeStore } from '@/core/theme/use-theme-store';
import { useEffect } from 'react';

export function useTheme() {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
}
