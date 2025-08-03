import { FlatCompat } from '@eslint/eslintrc'
import pluginNext from '@next/eslint-plugin-next'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.config({
    plugins: ['@next/next'],
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'prettier',
      'plugin:@tanstack/eslint-plugin-query/recommended',
      'plugin:storybook/recommended',
    ],
    rules: {
      ...pluginNext.configs.recommended.rules,
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
]

export default eslintConfig
