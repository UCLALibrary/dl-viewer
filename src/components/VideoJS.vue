<template>
  <div class="video-js-container">
    <div class="video-player">
      <video
        id="videojs-video-player"
        class="video-js vjs-big-play-centered"
        poster="https://static.library.ucla.edu/video_icon.svg"
      ></video>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  onMounted,
  onBeforeUnmount,
  ref,
  type Ref,
  // type PropType,
} from 'vue'
import videojs from 'video.js'
import type Player from 'video.js/dist/types/player'
import 'video.js/dist/video-js.css'
import { useGtm } from '@gtm-support/vue-gtm'
import _get from 'lodash/get'
import _isArray from 'lodash/isArray'
import {
  type AnnotationBody,
  // type Manifest,
} from '@iiif/presentation-3'
import { isString } from 'lodash'

const gtm = useGtm()

const props = defineProps({
  iiif_manifest: {
    type: Object, //as PropType<Manifest>,
    required: true,
  },
})

const isAppleOrIOS = /(Apple|iOS)/.test(navigator.userAgent)

const videoSources = computed(() => {
  const body = props.iiif_manifest?.items?.[0]?.items?.[0]?.items?.[0]?.body
  let choices: AnnotationBody[]

  if (!body || isString(body)) {
    choices = []
  } else if (_isArray(body)) {
    choices = body
  } else {
    choices = _get(body, 'items', [body])
  }

  return choices
    .filter(
      (source) =>
        (isAppleOrIOS && _get(source, 'format') === 'application/vnd.apple.mpegurl') ||
        (!isAppleOrIOS && _get(source, 'format') === 'application/dash+xml'),
    )
    .map((source) => ({ src: _get(source, 'id'), type: _get(source, 'format') }))
})

const player: Ref<null | Player> = ref(null)

onMounted(() => {
  if (gtm) {
    gtm.enable(true)
  }
  player.value = videojs('videojs-video-player', {
    autoplay: false,
    controls: true,
    fill: true,
    sources: videoSources.value,
  })
  console.log(videoSources.value)
})

onBeforeUnmount(() => {
  if (player.value) {
    player.value.dispose()
  }
  if (gtm) {
    gtm.enable(false)
  }
})
</script>

<style>
.video-js-container {
  width: 100%;
  height: 100%;
}
.video-player {
  width: 100%;
  height: 100%;
}
</style>
