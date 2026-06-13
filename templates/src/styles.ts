import type { Styles, WebsiteData } from './types';

export function buildRootStyles(data: WebsiteData) {
  const themeVars = Object.entries(data.styles)
    .filter(([, v]) => v != null)
    .map(([k, v]) => `  --${k}: ${v};`)
    .join('\n');

  const colorVars = Object.entries(data.styles)
    .filter(([, v]) => v != null)
    .map(([k, v]) => `  --color-${k}: ${v};`)
    .join('\n');

  const res = `@theme inline {\n${colorVars}\n}

  :root {\n${themeVars}\n}`;

  return res;
}

export const claudeStyles: Styles = {
  background: '#262624',
  foreground: '#c3c0b6',
  primary: '#d97757',
  'primary-foreground': '#ffffff',
  secondary: '#30302e',
  'secondary-foreground': '#faf9f5',
  muted: '#1b1b19',
  'muted-foreground': '#b7b5a9',
  accent: '#1a1915',
  'accent-foreground': '#f5f4ee',
  border: '#3e3e38',
  ring: '#d97757',
};
