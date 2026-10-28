module.exports = [{
  ignores: ['node_modules/**', 'coverage/**'],
}, {
  files: ['**/*.js'],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'commonjs',
    globals: {
      require: 'readonly', module: 'readonly', process: 'readonly',
      console: 'readonly', fetch: 'readonly', describe: 'readonly',
      beforeAll: 'readonly', afterAll: 'readonly', test: 'readonly',
      expect: 'readonly'
    }
  },
  rules: {
    'no-unused-vars': 'error',
    'no-undef': 'error',
    'eqeqeq': ['error', 'always'],
    'semi': ['error', 'always']
  }
}];
