import { useThemeStore } from '@/core/theme/use-theme-store';
import type { ThemePreset } from './theme-customizer';

export function useThemeManager() {
  const { isDarkMode } = useThemeStore();

  function applyTweakcnTheme(themePreset: ThemePreset) {
    const styles = isDarkMode ? themePreset.styles.dark : themePreset.styles.light;

    Object.entries(styles).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }

  return {
    applyTweakcnTheme,
  };
}
