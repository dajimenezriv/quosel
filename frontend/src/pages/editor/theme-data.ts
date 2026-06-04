import type { ColorTheme } from './theme-customizer';
import { tweakcnPresets } from './tweakcn-theme-presets';

export const tweakcnThemes: ColorTheme[] = Object.entries(tweakcnPresets).map(([key, value]) => ({
  key,
  value,
}));
