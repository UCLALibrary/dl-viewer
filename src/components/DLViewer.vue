<template>
  <div class="dl-viewer">
    <VideoJS v-if="isVideo" :options="videoOptions" />
    <UniversalViewer
      v-else
      :iiif_manifest="iiif_manifest"
      :iiif_manifest_url="iiif_manifest_url"
      :uv_config="uv_config"
      :media="media"
    />
  </div>
</template>

<script>
/* eslint-disable */

import VideoJS from "./VideoJS.vue";
import UniversalViewer from "./UniversalViewer.vue"; // TODO: set up code splitting. Might need to move this?

import axios from "axios";

export default {
  name: "DLViewer",
  components: {
    VideoJS,
    UniversalViewer
  },
  props: {
    iiif_manifest_url: {
      type: String,
      required: true
    }
  },
  computed: {
    isVideo() {
      return this.media == "Video";
    },
    videoOptions() {
      if (this.media == "Video") {
        return {
          autoplay: false,
          controls: true,
          fill: true,
          // fluid: true,
          sources: [
            {
              src: this.iiif_manifest.items[0].items[0].items[0].body[0].id,
              type: this.iiif_manifest.items[0].items[0].items[0].body[0].format
            },
            {
              src: this.iiif_manifest.items[0].items[0].items[0].body[1].id,
              type: this.iiif_manifest.items[0].items[0].items[0].body[1].format
            }
          ]
        };
      }
      return {};
    }
  },
  data() {
    return {
      iiif_manifest: {},
      media: "",
      uv_config: ""
    };
  },
  async beforeCreate() {
    try {
      // console.log("encode" + encodeURIComponent(this.iiif_manifest_url));
      const response = await axios.get(this.iiif_manifest_url);
      // console.log(response.data);
      this.iiif_manifest = response.data;

      // Media format for viewer
      switch (this.iiif_manifest["@context"]) {
        case "http://iiif.io/api/presentation/3/context.json":
          this.media =
            this.iiif_manifest.items[0].items[0].items[0].body[0].type;
          this.uv_config = "no-download-uv-config.json";
          break;
        default:
          this.media = "Image";
          this.uv_config = "uv-config.json";
      }
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
