module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript'
  ],
  settings: {
    'import/resolver': {
      alias: [
        ['~', './src/popup'],
        ['@', './src'],
      ]
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],
    'max-len': ['warn', 120],
    'no-param-reassign': 'off',
    'semi': ['error', 'never'],
    'no-extra-semi': 'error',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
