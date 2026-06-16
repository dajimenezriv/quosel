import quoselConfig from './eslint.shared.js';

export default quoselConfig({ env: 'browser', react: true, ignores: ['dist'], tsconfigRootDir: import.meta.dirname });
