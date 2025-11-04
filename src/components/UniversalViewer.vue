<template><div id="uv" class="uv" allowfullscreen frameborder="0" /></template>

<script setup lang="ts">
import { init } from 'universalviewer'
import { onMounted } from 'vue'
import 'universalviewer/dist/esm/index.css'

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
  const uv_config = {
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
          fullScreen: 'Full Screen HEYYYYYYY',
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

  const uv = init('uv', {
    manifest: props.iiif_manifest_url,
    canvasIndex: props.canvas,
  })

  uv.on('configure', function ({ cb }: { cb: (cfg: unknown) => void }) {
    // Ensure the configure callback returns a Promise so the
    // BaseContentHandler.configure flow handles the value reliably
    // (and add a log to confirm the configure handler runs).
    // Passing a Promise.wrap/Promise.resolve mirrors the extension
    // expectation for async config merges.
    // See: BaseContentHandler.configure -> Promise.all([...])
    console.log('uv configure handler called with config:', uv_config)
    cb(Promise.resolve(uv_config))
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
