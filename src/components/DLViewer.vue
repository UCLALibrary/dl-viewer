<template>
  <div class="dl-viewer">
    <VideoJS v-if="isVideo" :options="videoOptions" />
    <UniversalViewer
      v-else
      :iiif_manifest="iiif_manifest"
      :iiif_manifest_url="iiif_manifest_url"
      :media="media"
      :uv_config="parseConfig"
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
    isSafariIOS() {
      let output = false;
      let isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
      let iOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isSafari || iOS) {
        output = true;
      }
      return output;
    },
    setSrc() {
      //TODO also check format before just setting the src
      if (this.isSafariIOS === true) {
        return this.iiif_manifest.items[0].items[0].items[0].body[1].id;
      } else {
        return this.iiif_manifest.items[0].items[0].items[0].body[0].id;
      }
    },
    setType() {
      //TODO also check format before just setting the src
      if (this.isSafariIOS === true) {
        return this.iiif_manifest.items[0].items[0].items[0].body[1].format;
      } else {
        return this.iiif_manifest.items[0].items[0].items[0].body[0].format;
      }
    },
    videoOptions() {
      return {
        // autoplay: true,
        controls: true,
        sources: [
          {
            src: this.setSrc,
            type: this.setType
          }
        ]
      };
    },
    parseConfig() {
      switch (this.media) {
        case "Image":
          return "uv-config.json"; // `${window.location.protocol}//${window.location.hostname}:${window.location.port}/uv-config.json`;

        default:
          return "no-download-uv-config.json"; // `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`;
      }
    }
  },
  data() {
    return {
      iiif_manifest: {},
      media: ""
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
          break;
        default:
          this.media = "Image";
      }
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
