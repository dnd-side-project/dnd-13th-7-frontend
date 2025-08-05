import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// const dirname =
//   typeof __dirname !== 'undefined'
//     ? __dirname
//     : path.dirname(fileURLToPath(import.meta.url))

const dirname = path.dirname(fileURLToPath(import.meta.url))

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['src/stories/**', '**/*.stories.{js,ts,jsx,tsx}'],
  },
  optimizeDeps: {
    exclude: ['@storybook/nextjs-vite'],
  },
  ssr: {
    noExternal: ['@storybook/nextjs-vite'],
  },
})
