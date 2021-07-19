<template>
  <div class="dl-viewer">
    <MEJS v-if="isVideo" />
    <UniversalViewer
      v-else
      :iiif_manifest="iiif_manifest"
      :iiif_manifest_url="iiif_manifest_url"
    />
  </div>
</template>

<script>
import MEJS from "./MEJS.vue";
import UniversalViewer from "./UniversalViewer.vue"; // TODO: set up code splitting. Might need to move this?
import axios from "axios";

export default {
  name: "DLViewer",
  components: {
    MEJS,
    UniversalViewer,
  },
  props: {
    iiif_manifest_url: {
      type: String,
      required: true,
    },
  },
  computed: {
    isVideo() {
      return this.mediaType == "Video";
    },
    mediaType() {
      // Manifest hasn't loaded yet or we can't determine IIIF presentation API version
      if (!this.iiif_manifest || !this.iiif_manifest["@context"]) {
        return "unknown";
      }

      // First check IIIF API version
      switch (this.iiif_manifest["@context"]) {
        case "http://iiif.io/api/presentation/3/context.json":
          return this.iiif_manifest.items[0].items[0].items[0].body[0].type;
        default:
          return "Image";
      }
    },
  },
  data() {
    return { iiif_manifest: {} };
  },
  created() {
    axios
      .get(this.iiif_manifest_url)
      .then((response) => (this.iiif_manifest = response.data))
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dl-viewer {
  width: 100%;
  height: 100%;
}
</style>
