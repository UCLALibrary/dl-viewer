<template>
  <auth-firefox-modal
    v-if="isFirefox"
    title="To use the high quality image content available for this item in Firefox, you will need to adjust some settings."
    :message="modalMessage"
  />

  <iframe
    class="universalviewer"
    :src="iframe_target_url"
    id="universalviewer-iframe"
    allowfullscreen
    frameborder="0"
  />
</template>

<script>
/* eslint-disable */
import AuthFirefoxModal from './AuthFirefoxModal.vue';

export default {
  components: { AuthFirefoxModal },
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFirefox: false
    };
  },
  mounted() {
    this.isFirefox = this.detectFirefox();
  },
  computed: {
    iframe_target_url() {
      console.log("viewer 4")
      const fixed_url = new URL(window.location.toString().replace("#?", "?")); // for some reason the URL format we inherited used '#?' to indicate query parameters, but URLSearchParams won't parse this.
      console.log(`uv.html#${fixed_url.search}`)
      return `uv.html#${fixed_url.search}`
    },
    modalMessage(){
      return '<ul>\
      <li>\
        Enable pop-ups (i.e., add the viewer site to the list in Settings &gt;\
        Privacy &amp; Security &gt; Permissions &gt; Block pop-up-windows &gt;\
        Exceptions...)\
        <ul style="margin: 0px">\
          <li>\
            <em>Reason:</em> IIIF Auth 1.0 specifies that viewers must open a\
            new window as part of this particular authentication flow, which is not\
            possible unless you allow pop-ups from our site\
          </li>\
        </ul>\
      </li>\
      <li>\
        Disable &quot;Enhanced Tracking Protection&quot;\
        <ul style="margin: 0px">\
          <li>\
            <em>Reason:</em> IIIF Auth 1.0 specifies that viewers must set a\
            IIIF access cookie during this particular authentication f\low, which is not\
            possible unless Firefox will allow us to use a cookie when you are using our site\
          </li>\
        </ul>\
      </li>\
    </ul>'
    }
  },
  methods: {
    detectFirefox() {
      const userAgent = navigator.userAgent;
      return userAgent.includes("Firefox");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.universalviewer {
  width: 100%;
  height: 100%;
}
</style>
