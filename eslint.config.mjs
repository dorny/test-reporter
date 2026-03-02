import github from 'eslint-plugin-github'
import jest from 'eslint-plugin-jest'

export default [
  github.getFlatConfigs().recommended,
  ...github.getFlatConfigs().typescript,
  {
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
          alwaysTryTypes: true
        },
        node: {
          extensions: ['.js', '.mjs', '.ts', '.tsx']
        }
      }
    }
  },
  {
    files: ['src/**/*.ts'],
    rules: {
      'i18n-text/no-en': 'off',
      'eslint-comments/no-use': 'off',
      'import/no-namespace': 'off',
      'import/no-named-as-default': 'off',
      'no-shadow': 'off',
      'no-unused-vars': 'off',
      'prefer-template': 'off',
      camelcase: 'off',
      semi: 'off',
      '@typescript-eslint/array-type': ['error', {default: 'array'}],
      '@typescript-eslint/no-unused-vars': ['error', {varsIgnorePattern: '^_'}],
      '@typescript-eslint/no-shadow': ['error'],
      // Modern replacements for deprecated rules from the legacy config.
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-require-imports': 'error'
    }
  },
  {
    files: ['__tests__/**/*.test.ts'],
    ...jest.configs['flat/recommended'],
    plugins: {
      jest
    },
    languageOptions: {
      globals: jest.environments.globals.globals
    },
    rules: {
      'i18n-text/no-en': 'off',
      'import/no-namespace': 'off',
      '@typescript-eslint/array-type': ['error', {default: 'array'}],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off'
    }
  },
  {
    ignores: [
      'dist/**',
      'lib/**',
      'node_modules/**',
      '__tests__/__snapshots__/**',
      '__tests__/__results__/**',
      'assets/**',
      'reports/**',
      'eslint.config.mjs',
      'jest.config.cjs'
    ]
  }
]
