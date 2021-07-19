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
    iiif_manifest_url: function () {
      const fixed_url = new URL(window.location.toString().replace("#?", "?")); // for some reason the URL format we inherited used '#?' to indicate query parameters, but URLSearchParams won't parse this.
      return fixed_url.searchParams.get("manifest");
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
