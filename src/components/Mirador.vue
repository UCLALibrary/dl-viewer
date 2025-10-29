<template>
  <iframe
    class="mirador"
    :src="iframe_target_url"
    id="mirador-iframe"
    allowfullscreen
    frameborder="0"
  />
</template>

<script>
/* eslint-disable */

export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  computed: {
    iframe_target_url() {
      // console.log("viewer 4")
      const fixed_url = new URL(window.location.toString().replace('#?', '?')) // for some reason the URL format we inherited used '#?' to indicate query parameters, but URLSearchParams won't parse this.
      return `mirador3.html${fixed_url.search}`
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mirador {
  width: 100%;
  height: 100%;
}
</style>
