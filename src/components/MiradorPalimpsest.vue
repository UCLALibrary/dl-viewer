<template>
  <iframe
    class="mirador"
    :src="iframe_target_url"
    id="mirador-iframe"
    allowfullscreen
    frameborder="0"
  />
</template>

<script lang="ts">
/* eslint-disable */

export default {
  computed: {
    iframe_target_url() {
      const querystring = new URL(window.location.toString().replace('#?', '?')).search // for some reason the URL format we inherited used '#?' to indicate query parameters, but URLSearchParams won't parse this.
      return `/palimpsest/viewer.html${querystring}`
    },
  },
}
</script>

<style scoped>
.mirador {
  width: 100%;
  height: 100%;
}
</style>
