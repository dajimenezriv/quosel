import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import unicornPlugin from 'eslint-plugin-unicorn';

export default [
  prettierRecommended,
  sonarjsPlugin.configs.recommended,
  ...tsPlugin.configs['flat/recommended'],
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
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
      'sonarjs/no-ignored-exceptions': 'error',
      'sonarjs/no-nested-conditional': 'error',
      'sonarjs/no-nested-functions': 'error',
      'sonarjs/pseudo-random': 'error',
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
      'unicorn/prefer-node-protocol': 'error',
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'sonarjs/assertions-in-tests': 'off',
      'sonarjs/no-clear-text-protocols': 'off',
      'sonarjs/no-empty-test-file': 'off',
    },
  },
];
