<template><div id="mirador" class="mirador" allowfullscreen frameborder="0" /></template>

<script setup>
import mirador from 'mirador'
import { onMounted } from 'vue'
import { miradorImageToolsPlugin } from 'mirador-image-tools'
import annotationPlugins from '/mae/mirador-annotation-editor.es.js'

const props = defineProps({
  options: {
    type: Object,
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
          loadedManifest: props.options.iiif_manifest_url,
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
