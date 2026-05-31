/** @type {import("prettier").Config} */
export default {
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: true,
  endOfLine: 'lf',
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  printWidth: 140,
  proseWrap: 'never',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
};
