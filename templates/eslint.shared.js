import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const rules = {
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/no-non-null-assertion': 'error',
  'array-callback-return': 'error',
  'max-len': ['error', { code: 140, ignoreStrings: true, ignoreTemplateLiterals: true }],
  'no-async-promise-executor': 'error',
  'no-console': 'error',
  'no-extra-boolean-cast': 'error',
  'no-throw-literal': 'error',
  'object-shorthand': 'error',
  'require-await': 'error',
  'sonarjs/different-types-comparison': 'error',
  'sonarjs/no-hardcoded-secrets': 'off',
  'sonarjs/no-ignored-exceptions': 'error',
  'sonarjs/no-nested-conditional': 'error',
  'sonarjs/no-nested-functions': 'error',
  'sonarjs/prefer-read-only-props': 'off',
  'sonarjs/pseudo-random': 'error',
  'sonarjs/todo-tag': 'warn',
  'unicorn/filename-case': ['error', { case: 'kebabCase' }],
  'unicorn/prefer-node-protocol': 'error',
};

const testRules = {
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-non-null-assertion': 'off',
  'sonarjs/assertions-in-tests': 'off',
  'sonarjs/no-clear-text-protocols': 'off',
  'sonarjs/no-empty-test-file': 'off',
};

/**
 * Shared ESLint config for all Quosel packages.
 *
 * @param {object} [options]
 * @param {'node' | 'browser'} [options.env] Which globals to enable.
 * @param {boolean} [options.react] Enable React (hooks + Vite refresh) rules.
 * @param {string[]} [options.ignores] Paths to ignore.
 * @param {string} [options.tsconfigRootDir] Root dir for type-aware linting (pass `import.meta.dirname`).
 */
export default function quoselConfig({ env = 'node', react = false, ignores = [], tsconfigRootDir } = {}) {
  return tseslint.config(
    { ignores },
    js.configs.recommended,
    tseslint.configs.recommended,
    sonarjs.configs.recommended,
    ...(react ? [reactHooks.configs.flat.recommended, reactRefresh.configs.vite] : []),
    {
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        globals: env === 'browser' ? globals.browser : globals.node,
        parserOptions: { projectService: true, tsconfigRootDir },
      },
      plugins: { unicorn },
      rules,
    },
    {
      files: ['**/*.test.{ts,tsx}'],
      rules: testRules,
    },
    eslintConfigPrettier,
  );
}
