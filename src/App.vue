<template>
  <DLViewer
    v-if="iiif_manifest_url && iiif_manifest_url.length > 0"
    :iiif_manifest_url="iiif_manifest_url"
    :site="site"
    :viewer_name="viewer_name"
  />
</template>

<script>
import DLViewer from './components/DLViewer.vue'

export default {
  name: 'App',
  components: {
    DLViewer,
  },
  computed: {
    normalized_url() {
      return new URL(window.location.toString().replace('#?', '?')) // for some reason the URL format we inherited used '#?' to indicate query parameters, but URLSearchParams won't parse this.
    },
    iiif_manifest_url() {
      const iiif_url = this.normalized_url.searchParams.get('manifest')
      if (
        iiif_url &&
        iiif_url.includes('library.ucla.edu/') &&
        !iiif_url.includes('library.ucla.edu/collection')
      ) {
        const split_url = iiif_url.split('library.ucla.edu/')
        const ark = split_url[1].replace('/manifest', '')
        return `${split_url[0]}library.ucla.edu/${encodeURIComponent(ark)}/manifest`
      } else {
        return iiif_url
      }
    },
    site() {
      return this.normalized_url.searchParams.get('site', '')
    },
    viewer_name() {
      return this.normalized_url.searchParams.get('viewer', '')
    },
  },
}
</script>

<style>
#app {
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 100%;
  background-color: black;
}
</style>
