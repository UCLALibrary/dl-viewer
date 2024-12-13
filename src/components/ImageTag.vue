<template>
  <img v-bind="options" class="image-tag" />
</template>

<script>
export default {
  name: "ImageTag",
  props: {
    options: {
      // { src: [...] }
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.image-tag {
  width: 100%;
  height: 100%;

  object-fit: contain;
}
</style>
