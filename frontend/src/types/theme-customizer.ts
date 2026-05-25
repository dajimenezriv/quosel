export interface ThemePreset {
  styles: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

export interface ColorTheme {
  name: string;
  value: string;
  preset: ThemePreset;
}

export interface BrandColor {
  name: string;
  cssVar: string;
}

export interface ImportedTheme {
  light: Record<string, string>;
  dark: Record<string, string>;
}
