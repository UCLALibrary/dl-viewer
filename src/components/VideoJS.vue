<template>
  <div class="video-player">
    <video
      ref="videoPlayer"
      class="video-js"
      poster="https://static.library.ucla.edu/video_icon.svg"
    ></video>
  </div>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        // console.log('onPlayerReady', this)
      }
    );
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style></style>
