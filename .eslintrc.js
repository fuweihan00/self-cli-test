module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'no-console': 'off',
    'import/no-dynamic-require': 0,
    'global-require': 0,
    'no-param-reassign': 0,
    'import/prefer-default-export': 0,
  },
};
