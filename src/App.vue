<template>
  <DLViewer :iiif_manifest_url="iiif_manifest_url" />
</template>

<script>
import DLViewer from "./components/DLViewer.vue";

export default {
  name: "App",
  components: {
    DLViewer,
  },
  computed: {
    iiif_manifest_url() {
      const fixed_url = new URL(window.location.toString().replace("#?", "?")); // for some reason the URL format we inherited used '#?' to indicate query parameters, but URLSearchParams won't parse this.
      let iiif_url = fixed_url.searchParams.get("manifest");
      let ark = iiif_url
        .replace("https://iiif.library.ucla.edu/", "")
        .replace("/manifest", "");
      return `https://iiif.library.ucla.edu/${encodeURIComponent(
        ark
      )}/manifest`;
    },
  },
};
</script>

<style>
#app {
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 100%;
}
</style>
