<template><div id="uv" class="uv" allowfullscreen frameborder="0" /></template>

<script setup lang="ts">
// This component uses the latest version of Universal Viewer (4.2.1 as of writing), which fixes issues with static (non-cantaloupe) images and scrolling mode but ignores all options defined in UV_CONFIG.modules. Because of the config issue, it isn't used by default but can by selected by including 'viewer=uv-latest' as a url parameter

import { init } from 'universalviewer4.2'
import 'universalviewer4.2/dist/esm/index.css'
import { onMounted } from 'vue'

const UV_CONFIG = {
  options: {
    rightPanelEnabled: false,
  },
  modules: {
    contentLeftPanel: {
      options: {
        defaultToTreeEnabled: true,
      },
    },
    headerPanel: {
      options: {
        settingsButtonEnabled: true,
      },
    },
    footerPanel: {
      options: {
        downloadEnabled: true,
        moreInfoEnabled: false,
        printEnabled: false,
        shareEnabled: false,
      },
      content: {
        download: 'Download ',
        exitFullScreen: 'Exit Full Screen',
        fullScreen: 'Full Screen',
      },
    },
    downloadDialogue: {
      options: {
        confinedImageSize: 200,
        currentViewDisabledPercentage: 90,
        maxImageWidth: 5000,
        optionsExplanatoryTextEnabled: true,
        selectionEnabled: false,
      },
    },
  },
}

const props = defineProps({
  iiif_manifest_url: {
    type: String,
    required: true,
  },
  canvas: {
    type: Number,
    default: 0,
  },
})

onMounted(() => {
  const uv = init('uv', {
    manifest: props.iiif_manifest_url,
    canvasIndex: props.canvas,
    embedded: true,
  })

  uv.on('configure', function ({ cb }: { cb: (config: unknown) => void }) {
    cb(UV_CONFIG)
  })
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.uv {
  width: 100%;
  height: 100%;
}
</style>
