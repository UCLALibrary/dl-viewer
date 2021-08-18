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
      //Check both formats of iiif manifests for type
      switch (this.iiif_manifest["@context"]) {
        case "http://iiif.io/api/presentation/3/context.json":
          if (this.iiif_manifest.items[0].items[0].items[0].body["type"]) {
            this.media =
              this.iiif_manifest.items[0].items[0].items[0].body["type"];
          } else {
            this.media =
              this.iiif_manifest.items[0].items[0].items[0].body[0].type;
          }
          // console.log(this.media);
          //If media is choice, also check the nested type to see if sound. if so, reset media to sound
          if (
            this.media == "Choice" &&
            this.iiif_manifest.items[0].items[0].items[0].body["items"][0][
              "type"
            ] == "Sound"
          ) {
            this.media = "Sound";
          }

          this.uv_config = "no-download-uv-config.json";

          if (this.media == "Video") {
            const videoOptions = {
              autoplay: false,
              controls: true,
              fill: true,
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
            // console.log(this.options);
          } else if (this.media == "Choice") {
            const videoOptions = {
              autoplay: false,
              controls: true,
              fill: true,
              sources: []
            };
            videoOptions.sources = [
              // For choice format iiif manifests
              {
                src: this.iiif_manifest.items[0].items[0].items[0].body[
                  "items"
                ][0]["id"],
                type: this.iiif_manifest.items[0].items[0].items[0].body[
                  "items"
                ][0]["format"]
              },
              {
                src: this.iiif_manifest.items[0].items[0].items[0].body[
                  "items"
                ][1]["id"],
                type: this.iiif_manifest.items[0].items[0].items[0].body[
                  "items"
                ][1]["format"]
              }
            ];
            this.options = videoOptions;
            this.media = "Video";
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
      // console.log("Media" + this.media);
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
