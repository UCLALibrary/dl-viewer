<template><div id="uv" class="uv" allowfullscreen frameborder="0" /></template>

<script setup lang="ts">
import { init } from 'universalviewer'
import 'universalviewer/dist/esm/index.css'
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
    shareDialogue: {
      options: {
        // Embed generates an iframe pointing at /uv.html, which this app no longer ships.
        embedEnabled: false,
      },
    },
    downloadDialogue: {
      options: {
        // Sizes the "small image" option; UV's default is 1000.
        confinedImageSize: 200,
        maxImageWidth: 5000,
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
    cb(Promise.resolve(UV_CONFIG))
  })
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.uv {
  width: 100%;
  height: 100%;
}

/*
 * Hide the Share button. UV ignores footerPanel.options.shareEnabled, so this has to be CSS.
 * :deep() and !important are both required — UV renders its own DOM and its selectors are more
 * specific than a scoped rule can be.
 */
.uv :deep(.share) {
  display: none !important;
}
</style>
