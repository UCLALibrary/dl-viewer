<template>
  <img
    v-if="iiif_manifest"
    :src="src"
    :height="height"
    :width="width"
    :alt="alt"
    class="image-tag"
  />
  <div v-else class="image-tag">
    <!-- CSS Placeholder w/o broken image icon -->
  </div>
</template>

<script setup lang="ts">
import _get from 'lodash/get'
import { computed } from 'vue'

const props = defineProps({
  iiif_manifest: {
    // { src: [...] }
    type: Object,
    required: true,
  },
})

const src = computed(() => _get(props.iiif_manifest, 'items[0].items[0].items[0].body.id'))
const height = computed(() => _get(props.iiif_manifest, 'items[0].items[0].items[0].body.height'))
const width = computed(() => _get(props.iiif_manifest, 'items[0].items[0].items[0].body.width'))
const alt = computed(() => _get(props.iiif_manifest, 'label.none[0]'))
</script>

<style>
.image-tag {
  width: 100%;
  height: 100%;

  object-fit: contain;
  background-color: black;
}
</style>
