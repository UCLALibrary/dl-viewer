<template>
  <div class="dl-viewer">
    <component :is="viewer" :options="options" />
  </div>
</template>

<script>
/* eslint-disable */

// import VideoJS from "./VideoJS.vue";
// import UniversalViewer from "./UniversalViewer.vue"; // TODO: set up code splitting. Might need to move this?

import axios from "axios";
import { defineAsyncComponent } from "vue";

export default {
  name: "DLViewer",
  components: {
    VideoJS: defineAsyncComponent(() => import("./VideoJS.vue")),
    UniversalViewer: defineAsyncComponent(() => import("./UniversalViewer.vue"))
  },
  props: {
    iiif_manifest_url: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      iiif_manifest: {},
      media: "",
      uv_config: "",
      options: {},
      viewer: null
    };
  },
  async created() {
    try {
      // console.log("encode" + encodeURIComponent(this.iiif_manifest_url));
      const response = await axios.get(this.iiif_manifest_url);
      // console.log(response.data);
      this.iiif_manifest = response.data;
      this.uv_config = "";
      this.options = {};
      // Media format for viewer
      switch (this.iiif_manifest["@context"]) {
        case "http://iiif.io/api/presentation/3/context.json":
          this.media =
            this.iiif_manifest.items[0].items[0].items[0].body[0].type;
          this.uv_config = "no-download-uv-config.json";
          if (this.media == "Video") {
            const videoOptions = {
              autoplay: false,
              controls: true,
              fill: true,
              // fluid: true,
              sources: []
            };
            videoOptions.sources = [
              {
                src: this.iiif_manifest.items[0].items[0].items[0].body[0].id,
                type: this.iiif_manifest.items[0].items[0].items[0].body[0]
                  .format
              },
              {
                src: this.iiif_manifest.items[0].items[0].items[0].body[1].id,
                type: this.iiif_manifest.items[0].items[0].items[0].body[1]
                  .format
              }
            ];
            this.options = videoOptions;
          } else {
            this.options = {
              iiif_manifest: this.iiif_manifest,
              iiif_manifest_url: this.iiif_manifest_url,
              media: this.media,
              uv_config: this.uv_config
            };
          }

          break;
        default:
          this.media = "Image";
          this.uv_config = "uv-config.json";
          this.options = {
            iiif_manifest: this.iiif_manifest,
            iiif_manifest_url: this.iiif_manifest_url,
            media: this.media,
            uv_config: this.uv_config
          };
      }

      this.viewer = this.media == "Video" ? "VideoJS" : "UniversalViewer";
      console.log("Media" + this.media);
    } catch (error) {
      console.log(error.response);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dl-viewer {
  width: 100%;
  height: 100%;
}
</style>
