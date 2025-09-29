// eslint.config.mjs
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default [
  // Ignore patterns - includes Storybook artifacts
  {
    ignores: [
      'dist/',
      'build/',
      'node_modules/',
      '*.min.js',
      '.next/',
      'storybook-static/',
      '.storybook/public/',
      'coverage/',
    ],
  },

  // Base ESLint recommended rules
  js.configs.recommended,

  // Global configuration for all files
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
  },

  // TypeScript support without type-checking (faster)
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // Disable base rule for TS files
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // Prettier integration
  {
    plugins: {
      prettier,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          trailingComma: 'es5',
          printWidth: 100,
          endOfLine: 'auto',
          tabWidth: 2,
          useTabs: false,
        },
      ],
    },
  },

  // General rules (minimal)
  {
    rules: {
      'no-console': 'off',
      'no-debugger': 'warn',
      'no-undef': 'error',
    },
  },
];
