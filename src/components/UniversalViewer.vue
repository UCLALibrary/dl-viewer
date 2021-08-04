<template>
  <div class="universalviewer" id="uv" />
</template>

<script>
/* eslint-disable */

export default {
  props: {
    iiif_manifest: {
      type: Object,
      required: true
    },
    media: {
      type: String,
      required: true
    },
    iiif_manifest_url: {
      type: String,
      required: true
    },
    uv_config: {
      type: String,
      required: true
    }
  },
  methods: {
    loadUV(e) {
      console.log("in loaduv");
      const urlDataProvider = new UV.URLDataProvider(true);
      var formattedLocales;
      var locales = urlDataProvider.get("locales", "");

      if (locales) {
        var names = locales.split(",");
        formattedLocales = [];

        for (var i in names) {
          var nameparts = String(names[i]).split(":");
          formattedLocales[i] = {
            name: nameparts[0],
            label: nameparts[1]
          };
        }
      } else {
        formattedLocales = [
          {
            name: "en-GB"
          }
        ];
      }
      console.log("manifest url" + urlDataProvider);
      let uv = createUV(
        "#uv",
        {
          root: "./uv/",
          iiifResourceUri: this.iiif_manifest_url,
          configUri: this.uv_config,
          collectionIndex: Number(urlDataProvider.get("c", 0)),
          manifestIndex: Number(urlDataProvider.get("m", 0)),
          sequenceIndex: Number(urlDataProvider.get("s", 0)),
          canvasIndex: Number(urlDataProvider.get("cv", 0)),
          rangeId: urlDataProvider.get("rid", 0),
          rotation: Number(urlDataProvider.get("r", 0)),
          xywh: urlDataProvider.get("xywh", ""),
          embedded: true,
          locales: formattedLocales
        },
        urlDataProvider
      );
      console.log(uv);
    }
  },
  watch: {
    media(val, oldVal) {
      console.log(`new: ${val}, old: ${oldVal}`);
      window.addEventListener("uvLoaded", this.loadUV, false);
    }
  },

  // TODO: integrate UV into webpack build, instead of just jury-rigging <script> tags
  // TODO: Pass manifest && config options as parameters, instead of getting them from URL (only <App> should look at URL)
  mounted() {
    let offlineScript = document.createElement("script");
    offlineScript.setAttribute("src", "/uv/lib/offline.js");
    document.head.appendChild(offlineScript);

    let helpersSript = document.createElement("script");
    helpersSript.setAttribute("src", "/uv/helpers.js");
    document.head.appendChild(helpersSript);

    let uvScript = document.createElement("script");
    uvScript.setAttribute("src", "/uv/uv.js");
    document.body.appendChild(uvScript);
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
