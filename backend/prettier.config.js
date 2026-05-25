/** @type {import("prettier").Config} */
export default {
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: true,
  endOfLine: 'lf',
  importOrder: ['^@/(.*)$', '^[./]'],
  importOrderParserPlugins: ['typescript'],
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  printWidth: 140,
  proseWrap: 'never',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
};
