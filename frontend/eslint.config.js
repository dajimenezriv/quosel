import quoselConfig from '@quosel/templates/eslint';

export default quoselConfig({ env: 'browser', react: true, ignores: ['dist', 'src/api/schema.ts'], tsconfigRootDir: import.meta.dirname });
