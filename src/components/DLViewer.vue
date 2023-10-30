<template>
  <div class="dl-viewer">
    <component :is="viewer" :options="options" />
  </div>
</template>

<script>
/* eslint-disable */

import axios from "axios";
import { defineAsyncComponent } from "vue";

export default {
  name: "DLViewer",
  components: {
    VideoJS: defineAsyncComponent(() => import("./VideoJS.vue")),
    UniversalViewer: defineAsyncComponent(() => import("./UniversalViewer.vue")),
    UniversalViewer3: defineAsyncComponent(() => import("./UniversalViewer3.vue")),
  },
  props: {
    iiif_manifest_url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      iiif_manifest: null,
    };
  },
  computed: {
    firstItemType() {
      console.log(this.isV3Manifest && this.iiif_manifest)
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
    isChoice() {
      return (this.firstItemType == "Choice")
    },
    isCollection() {
      return (
        this.iiif_manifest &&
        this.iiif_manifest.type &&
        this.iiif_manifest.type == "Collection")
    },
    isImage() {
      return (this.firstItemType == "Image")
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
      } else {
        return {
          iiif_manifest: this.iiif_manifest,
          iiif_manifest_url: this.iiif_manifest_url,
          uv_config: this.isSound ? "no-download-uv-config.json" : "uv-config.json",
        }
      }
    },
    isAppleOrIOS(){
      console.log("user agent info", navigator.userAgent)
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
      return (
        this.isCollection ? "UniversalViewer" :
        this.isVideo ? "VideoJS" :
        this.isSound ? "UniversalViewer3" :
        this.isImage ? "UniversalViewer" :
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
