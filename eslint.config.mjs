import { FlatCompat } from '@eslint/eslintrc'
import pluginNext from '@next/eslint-plugin-next'
import storybook from 'eslint-plugin-storybook'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.config({
    plugins: ['@next/next', '@tanstack/query'],
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'prettier',
      'plugin:@tanstack/query/recommended',
      'plugin:storybook/recommended',
    ],
    rules: {
      ...pluginNext.configs.recommended.rules,
      '@tanstack/query/exhaustive-deps': 'error',
      '@tanstack/query/stable-query-client': 'error',
      '@tanstack/query/no-rest-destructuring': 'warn',
      '@tanstack/query/no-unstable-deps': 'warn',
    },
    ignorePatterns: [
      '**/node_modules/**',
      '**/public/**',
      '**/dist/**',
      '.next/**',
      'out/**',
      'storybook-static/**',
    ],
  }),
  ...storybook.configs['flat/recommended'],
]

export default eslintConfig
