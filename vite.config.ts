import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// UV reads its version from process.env.PACKAGE_VERSION, which only its own build sets.
// Without this the settings dialogue shows "vundefined".
const uvVersion = JSON.parse(
  readFileSync(new URL('./node_modules/universalviewer/package.json', import.meta.url), 'utf-8'),
).version

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env.PACKAGE_VERSION': JSON.stringify(uvVersion),
  },
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
