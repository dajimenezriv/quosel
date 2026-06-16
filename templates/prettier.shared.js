/**
 * Shared Prettier config for all Quosel packages.
 *
 * @param {object} [options]
 * @param {boolean} [options.tailwind] Enable Tailwind class sorting (plugin must load last).
 * @param {boolean} [options.astro] Enable Astro support.
 * @returns {import("prettier").Config}
 */
export default function quoselConfig({ tailwind = false, astro = false } = {}) {
  return {
    arrowParens: 'always',
    bracketSameLine: true,
    bracketSpacing: true,
    endOfLine: 'lf',
    plugins: [
      '@ianvs/prettier-plugin-sort-imports',
      ...(astro ? ['prettier-plugin-astro'] : []),
      ...(tailwind ? ['prettier-plugin-tailwindcss'] : []),
    ],
    printWidth: 140,
    proseWrap: 'never',
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    useTabs: false,
    ...(astro ? { overrides: [{ files: '*.astro', options: { parser: 'astro' } }] } : {}),
  };
}
