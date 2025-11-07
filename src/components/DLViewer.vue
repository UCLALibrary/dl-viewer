<template>
  <div class="dl-viewer" v-if="iiif_manifest">
    <MiradorViewer4 v-if="useMirador4" :iiif_manifest_url="iiif_manifest_url" />
    <!-- <UniversalViewer v-else-if="isCollection" /> -->
    <VideoJS v-else-if="useVideoJs" :iiif_manifest="iiif_manifest" />
    <UniversalViewerLatest
      v-else-if="useUniversalViewerLatest"
      :iiif_manifest_url="iiif_manifest_url"
      :canvas="canvas"
    />
    <UniversalViewer3 v-else-if="useUniversalViewer3" />
    <ImageTag v-else-if="isImage && !hasIiifService" :iiif_manifest="iiif_manifest" />
    <UniversalViewer v-else />
  </div>
</template>

<script lang="ts">
/* eslint-disable */

import axios from 'axios'
import { defineAsyncComponent } from 'vue'
import _get from 'lodash/get'
import _has from 'lodash/has'
import _isArray from 'lodash/isArray'
import _isNull from 'lodash/isNull'
import _isObject from 'lodash/isObject'
import _isString from 'lodash/isString'
import _isUndefined from 'lodash/isUndefined'
import { presentation3StrictUpgrade } from '@iiif/parser/strict'
import { type Manifest } from '@iiif/presentation-3'
import type UniversalViewerLatest from './UniversalViewerLatest.vue'

const VIEWER_ALIASES = {
  mirador: 'MiradorViewer',
  img: 'ImageTag',
  vidoejs: 'VideoJS',
  uv: 'UniversalViewer',
  uv3: 'UniversalViewer3',
}

export default {
  name: 'DLViewer',
  components: {
    ImageTag: defineAsyncComponent(() => import('./ImageTag.vue')),
    MiradorViewer4: defineAsyncComponent(() => import('./MiradorViewer4.vue')),
    VideoJS: defineAsyncComponent(() => import('./VideoJS.vue')),
    UniversalViewer: defineAsyncComponent(() => import('./UniversalViewer.vue')),
    UniversalViewer3: defineAsyncComponent(() => import('./UniversalViewer3.vue')),
    UniversalViewerLatest: defineAsyncComponent(() => import('./UniversalViewerLatest.vue')),
  },
  props: {
    iiif_manifest_url: {
      type: String,
      required: true,
    },
    site: {
      type: String,
      default: '',
    },
    viewer_name: {
      type: String,
      default: '',
    },
    canvas: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      iiif_manifest: null as null | Manifest,
    }
  },
  computed: {
    firstItemType() {
      if (_isNull(this.firstItemBody) || _isUndefined(this.firstItemBody)) {
        return undefined
      } else if (_isString(this.firstItemBody)) {
        return 'TextBody'
      } else return this.firstItemBody.type
    },
    firstItemBody() {
      let body = this.iiif_manifest?.items?.[0]?.items?.[0]?.items?.[0]?.body

      if (_isArray(body)) return body?.[0]
      else return body
    },
    firstItemTypeFromChoice() {
      return (
        this.isChoice &&
        this.firstItemBody &&
        _get(this.firstItemBody, 'type') == 'Choice' &&
        _has(this.firstItemBody, 'items') &&
        _isArray(this.firstItemBody.items) &&
        this.firstItemBody.items[0].type
      )
    },
    hasIiifService() {
      if (_has(this.firstItemBody, 'service')) return true
      else return false
    },
    isChoice() {
      return this.firstItemType == 'Choice'
    },
    isCollection() {
      const newLocal = _get(this.iiif_manifest, '@type') || _get(this.iiif_manifest, 'type', '')
      // Have seen "'@type': 'sc:Collection'" and "'type': 'Collection'"
      return newLocal.includes('Collection')
    },
    isImage() {
      return this.firstItemType == 'Image'
    },
    useMirador4() {
      return (
        this.viewer_name === 'mirador' || this.viewer_name === 'mirador4' || this.site === 'sinai'
      )
    },
    useUniversalViewerLatest() {
      return this.viewer_name === 'uv-latest'
    },
    useUniversalViewer3() {
      return (
        !this.isCollection &&
        (this.firstItemType == 'Sound' || this.firstItemTypeFromChoice == 'Sound')
      )
    },
    useVideoJs() {
      return (
        !this.isCollection &&
        (this.firstItemType == 'Video' || this.firstItemTypeFromChoice == 'Video')
      )
    },
  },
  async mounted() {
    try {
      const response = await axios.get(this.iiif_manifest_url)
      this.iiif_manifest = presentation3StrictUpgrade(response.data)
    } catch (error) {
      console.warn(_get(error, 'response') || error)
    }
  },
}
</script>

<style scoped>
.dl-viewer {
  width: 100%;
  height: 100%;
}
</style>
