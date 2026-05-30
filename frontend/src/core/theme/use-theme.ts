import { useEffect } from 'react';
import { useThemeStore } from '@/core/theme/use-theme-store';

export function useTheme() {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
}
