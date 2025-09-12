import github from 'eslint-plugin-github'

export default [
  github.getFlatConfigs().recommended,
  ...github.getFlatConfigs().typescript,
  {
    files: ['src/**/*.ts'],
    rules: {
      'no-shadow': 'off',
      'import/no-namespace': 'off',
      'i18n-text/no-en': 'off',
      'prefer-template': 'off',
      "@typescript-eslint/array-type": ['error', {default: 'array'}],
      '@typescript-eslint/no-unused-vars': ['error', {varsIgnorePattern: '^_'}],
      '@typescript-eslint/no-shadow': ['error'],
    },
  },
  {
    ignores: [
      'dist/**',
      'lib/**',
      'node_modules/**',
      '__tests__/**',
      '__tests__/__snapshots__/**',
      '__tests__/__results__/**',
      'assets/**',
      'reports/**',
      'eslint.config.mjs',
      'jest.config.js',
    ],
  },
]
