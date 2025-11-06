<template><div id="mirador" class="mirador" allowfullscreen frameborder="0" /></template>

<script setup lang="ts">
// @ts-expect-error not finding types for these
import mirador from 'mirador'
import { onMounted, type PropType } from 'vue'
// @ts-expect-error not finding types for these
import { miradorImageToolsPlugin } from 'mirador-image-tools'
import annotationPlugins from 'mirador-annotation-editor'

const props = defineProps({
  iiif_manifest_url: {
    type: String,
    required: true,
  },
})

onMounted(() => {
  console.log(`the component is now mounted.`)
  mirador.viewer(
    // config, see https://github.com/ProjectMirador/mirador/blob/main/src/config/settings.js
    {
      id: 'mirador',
      windows: [
        {
          loadedManifest: props.iiif_manifest_url,
          imageToolsEnabled: true,
        },
      ],
      window: {
        allowClose: true,
        allowFullscreen: true,
        defaultSideBarPanel: 'canvas',
        sideBarOpenByDefault: true,
        views: [
          { key: 'single', behaviors: ['individuals'] },
          { key: 'book', behaviors: ['paged'] },
          { key: 'scroll', behaviors: ['continuous'] },
          { key: 'gallery' },
        ],
      },
      selectedTheme: 'dark',
      workspace: {
        showZoomControls: true,
      },
      galleryView: {
        height: 200,
      },
      theme: {
        palette: {
          notification: {
            main: '#ffa224',
            contrastText: '#ffa224',
          },
        },
      },
    },
    // plugins
    [miradorImageToolsPlugin, ...annotationPlugins],
  )
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mirador {
  width: 100%;
  height: 100%;
}
</style>
