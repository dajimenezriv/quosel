import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import unicornPlugin from 'eslint-plugin-unicorn';

export default [
  {
    ignores: [],
  },
  prettierRecommended,
  sonarjsPlugin.configs.recommended,
  unicornPlugin.configs['flat/recommended'],
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
    rules: {
      // must use @ts-expect-error explanation
      '@typescript-eslint/ban-ts-comment': 'error',
      // must await or void promises
      '@typescript-eslint/no-floating-promises': 'error',
      // cannot assert
      '@typescript-eslint/no-non-null-assertion': 'error',
      // cannot write expressions that do nothing
      '@typescript-eslint/no-unused-expressions': 'error',
      // must use forEach if we do not return something from a array map
      'array-callback-return': 'error',
      'max-len': ['error', { code: 140, ignoreStrings: true, ignoreTemplateLiterals: true }],
      // the callback of a promise cannot be async
      'no-async-promise-executor': 'error',
      // cannot do if(Boolean(x)) because it is the same as if(x)
      'no-extra-boolean-cast': 'error',
      // cannot throw something different than Error
      'no-throw-literal': 'error',
      // cannot use objects before definition
      'no-use-before-define': ['error', { functions: false }],
      // cannot do msg: msg
      'object-shorthand': 'error',
      // disallow async function that do not have await inside
      'require-await': 'error',
      'sonarjs/cognitive-complexity': 'error',
      'sonarjs/different-types-comparison': 'warn',
      // cannot catch error and not use it
      'sonarjs/no-ignored-exceptions': 'error',
      'sonarjs/no-nested-conditional': 'error',
      'sonarjs/no-nested-functions': 'error',
      // disallow types that are redundant
      'sonarjs/no-useless-intersection': 'error',
      // cannot generate numbers that are not really random
      'sonarjs/pseudo-random': 'error',
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
      // must use undefined instead of null
      'unicorn/no-null': 'off',
      // imports should be node:fs/pomises
      'unicorn/prefer-node-protocol': 'error',
      // cannot msg we must write message
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {},
  },
];
