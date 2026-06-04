import { tweakcnThemes } from '@quosel/templates';

export const themes = Object.entries(tweakcnThemes).map(([key, value]) => ({
  key,
  value,
}));
