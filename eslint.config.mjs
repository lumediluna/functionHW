import js from '@eslint/js'
import playwright from 'eslint-plugin-playwright'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  js.configs.recommended,

  // TypeScript (ВАЖНО: spread массива)
  ...tseslint.configs.recommended,

  // Общие globals
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
      },
    },
  },

  // Playwright
  {
    files: ['**/*.spec.{js,ts}'],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs.recommended.rules,
    },
  },
]