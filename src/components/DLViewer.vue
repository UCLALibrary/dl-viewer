<template>
  <div class="dl-viewer" v-if="iiif_manifest">
    <mirador-palimpsest v-if="isSinaiPalimpsest" />
    <MiradorViewer v-else-if="isSinai" />
    <UniversalViewer
      v-else-if="isCollection"
      :iiif_manifest_url="iiif_manifest_url"
      :canvas="canvas"
    />
    <VideoJS v-else-if="isVideo" :iiif_manifest="iiif_manifest" />
    <UniversalViewer3 v-else-if="isSound" />
    <ImageTag v-else-if="isImage && !hasIiifService" :iiif_manifest="iiif_manifest" />
    <UniversalViewer v-else :iiif_manifest_url="iiif_manifest_url" :canvas="canvas" />
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

export default {
  name: 'DLViewer',
  components: {
    ImageTag: defineAsyncComponent(() => import('./ImageTag.vue')),
    MiradorViewer: defineAsyncComponent(() => import('./MiradorViewer.vue')),
    MiradorPalimpsest: defineAsyncComponent(() => import('./MiradorPalimpsest.vue')),
    VideoJS: defineAsyncComponent(() => import('./VideoJS.vue')),
    UniversalViewer: defineAsyncComponent(() => import('./UniversalViewer.vue')),
    UniversalViewer3: defineAsyncComponent(() => import('./UniversalViewer3.vue')),
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
    isSinai() {
      return this.site === 'sinai'
    },
    isSinaiPalimpsest() {
      return this.iiif_manifest_url.includes('sinai-images.library.ucla.edu')
    },
    isSound() {
      return this.firstItemType == 'Sound' || this.firstItemTypeFromChoice == 'Sound'
    },
    isVideo() {
      return this.firstItemType == 'Video' || this.firstItemTypeFromChoice == 'Video'
    },
    isV3Manifest() {
      const v3_context = 'http://iiif.io/api/presentation/3/context.json'
      const context = _get(this.iiif_manifest, '@context')
      if (_isArray(context)) {
        return context.includes(v3_context)
      } else {
        return context == v3_context
      }
    },
    isAppleOrIOS() {
      return /(Apple|iOS)/.test(navigator.userAgent)
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
