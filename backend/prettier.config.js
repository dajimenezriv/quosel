/** @type {import("prettier").Config} */
export default {
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: true,
  endOfLine: 'lf',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  printWidth: 140,
  proseWrap: 'never',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
};
