<template>
  <g>
    <path class="path" />
    <circle
      class="handle circle circle--patch-point"
      :cx="placement.fromPosition.x"
      :cy="placement.fromPosition.y"
      :r="r"
    />
    <circle
      class="handle circle circle--bezier-handle"
      :cx="placement.toPosition.x"
      :cy="placement.toPosition.y"
      :r="r"
    />
  </g>
</template>

<script>
export default {
  name: "PatchCable",
  data() {
    return {
      r: 7
    };
  },
  props: {
    placement: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.circle {
  fill: rgb(78, 77, 77);
}
</style>
