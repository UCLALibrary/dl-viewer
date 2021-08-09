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
      media: "",
      src: "",
      videoOptions: {
        // autoplay: true,
        controls: true,
        sources: [
          {
            src: "https://wowza.library.ucla.edu/iiif_av_public/definst/mp4:synanon/pairtree_root/21/19/8=/zz/00/2h/ds/j2/21198=zz002hdsj2/ark%2B=21198=zz002hdsj2.mp4/manifest.mpd",
            type: "application/dash+xml"
          }
        ]
      }
    };
  },
  async beforeCreate() {
    try {
      // console.log("encode" + encodeURIComponent(this.iiif_manifest_url));

      const response = await axios.get(this.iiif_manifest_url);
      // console.log(response.data);
      this.iiif_manifest = response.data;
      let output = false;
      let isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
      let iOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isSafari || iOS) {
        output = true;
      }

      if (output === true) {
        this.src = this.iiif_manifest.items[0].items[0].items[0].body[1].id;
      } else {
        this.src = this.iiif_manifest.items[0].items[0].items[0].body[0].id;
      }
      console.log("src  from wowza" + this.src);
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
