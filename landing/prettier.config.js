/** @type {import("prettier").Config} */
export default {
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: true,
  endOfLine: 'lf',
  importOrder: ['^@/(.*)$', '^[./]'],
  importOrderParserPlugins: ['typescript', 'jsx'],
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss', 'prettier-plugin-astro'],
  printWidth: 140,
  proseWrap: 'never',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
};
