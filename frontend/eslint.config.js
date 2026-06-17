import quoselConfig from '@quosel/core/eslint';

export default [
  ...quoselConfig({ env: 'browser', react: true, ignores: ['dist', 'src/api/schema.ts'], tsconfigRootDir: import.meta.dirname }),
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'sonarjs/no-nested-functions': 'warn',
    },
  },
];
