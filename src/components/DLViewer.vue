<template>
  <div class="dl-viewer">
    <component :is="viewer" :options="options" />
  </div>
</template>

<script>
/* eslint-disable */

import axios from "axios";
import { defineAsyncComponent } from "vue";
import _has from "lodash/has"
import _get from "lodash/get"

export default {
  name: "DLViewer",
  components: {
    ImageTag: defineAsyncComponent(() => import("./ImageTag.vue")),
    Mirador: defineAsyncComponent(() => import("./Mirador.vue")),
    MiradorPalimpsest: defineAsyncComponent(() => import("./MiradorPalimpsest.vue")),
    VideoJS: defineAsyncComponent(() => import("./VideoJS.vue")),
    UniversalViewer: defineAsyncComponent(() => import("./UniversalViewer.vue")),
    UniversalViewer3: defineAsyncComponent(() => import("./UniversalViewer3.vue")),
  },
  props: {
    iiif_manifest_url: {
      type: String,
      required: true
    },
    site: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      iiif_manifest: null,
    };
  },
  computed: {
    firstItemType() {
      if (this.isV3Manifest) {
        // Non-image content currently only uses IIIF v3
        return (
          this.iiif_manifest?.items?.[0]?.items?.[0]?.items?.[0]?.body?.type ||
          this.iiif_manifest?.items?.[0]?.items?.[0]?.items?.[0]?.body?.[0]?.type
        )
      } else {
        return "Image"
      }
    },
    firstItemTypeFromChoice() {
      return this.isChoice && this.iiif_manifest.items[0].items[0].items[0].body.items[0].type
    },
    hasIiifService() {
      const iiifServicePath = this.isV3Manifest ?
        "iiif_manifest.items[0].items[0].items[0].body.service" :
        "iiif_manifest.sequences[0].canvases[0].images[0].resource.service"
      console.log(this.isV3Manifest, iiifServicePath, _get(this, iiifServicePath))
      const parts = iiifServicePath.split(".")
      for (let i = 0; i < parts.length - 1; i++) {
        let path = parts.slice(0, i + 1).join(".")
        console.log(path, _get(this, path))
      }
      return _has(this, iiifServicePath)
    },
    isChoice() {
      return (this.firstItemType == "Choice")
    },
    isCollection() {
      // Have seen "'@type': 'sc:Collection'" and "'type': 'Collection'"
      return _get(this, "iiif_manifest.@type", _get(this, "iiif_manifest.type", "")).includes("Collection")
    },
    isImage() {
      return (this.firstItemType == "Image")
    },
    isSinai() {
      return (this.site === "sinai")
    },
    isSinaiPalimpsest() {
      return this.iiif_manifest_url.includes("sinai-images.library.ucla.edu")
    },
    isSound() {
      return (this.firstItemType == "Sound" || this.firstItemTypeFromChoice == "Sound")
    },
    isVideo() {
      return (this.firstItemType == "Video" || this.firstItemTypeFromChoice == "Video")
    },
    isV3Manifest() {
      return (
        this.iiif_manifest &&
        this.iiif_manifest["@context"] == "http://iiif.io/api/presentation/3/context.json"
      )
    },
    options() {
      if (this.iiif_manifest == {}) {
        return {}
      } else if (this.isVideo) {
        const filteredSources = this.videoSources.filter((source) => (
          (this.isAppleOrIOS && source.format === "application/vnd.apple.mpegurl") ||
          (!this.isAppleOrIOS && source.format === "application/dash+xml")
        ))
        return {
          autoplay: false,
          controls: true,
          fill: true,
          sources: filteredSources.map((source) => (
            { src: source.id, type: source.format} // HLS for Safari
          )),
        }
      } else if (this.viewer == "ImageTag") {
        return {
          src: _get(this, "iiif_manifest.items[0].items[0].items[0].body.id"),
          height: _get(this, "iiif_manifest.items[0].items[0].items[0].body.height"),
          width: _get(this, "iiif_manifest.items[0].items[0].items[0].body.width"),
          alt: _get(this, "iiif_manifest.label.none[0]", ""),
        }
      } else {
        return {
          iiif_manifest: this.iiif_manifest,
          iiif_manifest_url: this.iiif_manifest_url,
          uv_config: this.isSound ? "no-download-uv-config.json" : "uv-config.json",
        }
      }
    },
    isAppleOrIOS(){
      return /(Apple|iOS)/.test(navigator.userAgent)
    },
    videoSources() {
      if (!this.isVideo) {
        return null
      } else if (this.isChoice) {
        return this.iiif_manifest.items[0].items[0].items[0].body.items
      } else {
        return this.iiif_manifest.items[0].items[0].items[0].body
      }
    },
    viewer() {
      console.log(this.isSinaiPalimpsest, this.isSinai, this.isCollection, this.isVideo, this.isSound, this.isImage, this.hasIiifService)
      return (
        this.isSinaiPalimpsest ? "MiradorPalimpsest" :
        this.isSinai ? "Mirador" :
        this.isCollection ? "UniversalViewer" :
        this.isVideo ? "VideoJS" :
        this.isSound ? "UniversalViewer3" :
        this.isImage && this.hasIiifService ? "UniversalViewer" :
        this.isImage && !this.hasIiifService ? "ImageTag" :
        "UniversalViewer"
      )
    },
  },
  async created() {
    try {
      const response = await axios.get(this.iiif_manifest_url);
      this.iiif_manifest = response.data;
    } catch (error) {
      console.warn(error.response);
    }
  }
};
</script>

<style scoped>
.dl-viewer {
  width: 100%;
  height: 100%;
}
</style>
