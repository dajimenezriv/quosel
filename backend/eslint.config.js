import quoselConfig from '@quosel/templates/eslint';

export default quoselConfig({ env: 'node', ignores: ['dist', 'src/infra/postgres/prisma'], tsconfigRootDir: import.meta.dirname });
