import github from 'eslint-plugin-github'

export default [
  github.getFlatConfigs().recommended,
  ...github.getFlatConfigs().typescript,
  {
    files: ['**/*.ts'],
    ignores: ['eslint.config.mjs'],
    rules: {
      'import/no-namespace': 'off',
      'i18n-text/no-en': 'off',
      'prefer-template': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {varsIgnorePattern: '^_'}]
    },
  },
  {
    ignores: [
      'dist/',
      'lib/',
      'node_modules/',
      '__tests__/__snapshots__/',
      '__tests__/__results__/',
      'assets/',
      'reports/',
      'jest.config.js/',
    ],
  },
]
