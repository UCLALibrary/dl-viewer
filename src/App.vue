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
      console.log(window.location.toString(), fixed_url.searchParams.get("manifest"))
      if (iiif_url.includes("library.ucla.edu/")) {
        let split_url = iiif_url.split("library.ucla.edu/");
        let ark = split_url[1].replace("/manifest", "");
        return `${split_url[0]}library.ucla.edu/${encodeURIComponent(
          ark
        )}/manifest`;
      } else {
        return iiif_url;
      }
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
