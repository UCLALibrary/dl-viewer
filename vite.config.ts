import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// UV reads its version from process.env.PACKAGE_VERSION, which only its own build sets.
// Without this the settings dialogue shows "vundefined".
const uvVersion = JSON.parse(
  readFileSync(new URL('./node_modules/universalviewer/package.json', import.meta.url), 'utf-8'),
).version

// Patches UV to draw images with canvas instead of WebGL,
// which breaks access-controlled images and static images without CORS headers.
const UV_OSD_OPTIONS = /drawer:\s*"auto",\s*crossOriginPolicy:\s*"Anonymous"/g
let patchedOsdOptions = false
let isBuild = false

const useCanvasDrawer: Plugin = {
  name: 'uv-canvas-drawer',
  configResolved(config) {
    isBuild = config.command === 'build'
  },
  transform(code, id) {
    // In dev, Vite serves UV from its .vite/deps cache, so check that path too.
    if (!id.includes('universalviewer') && !id.includes('/.vite/deps/')) return null
    const patched = code.replace(UV_OSD_OPTIONS, 'drawer:"canvas"')
    if (patched === code) return null
    patchedOsdOptions = true
    return { code: patched, map: null }
  },
  buildEnd() {
    if (isBuild && !patchedOsdOptions) {
      throw new Error(
        'uv-canvas-drawer: could not find the OpenSeadragon options in universalviewer.',
      )
    }
  },
}

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env.PACKAGE_VERSION': JSON.stringify(uvVersion),
  },
  plugins: [vue(), vueDevTools(), useCanvasDrawer],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
