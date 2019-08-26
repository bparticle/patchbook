<template>
  <g :id="id">
    <path
      :d="pathFormula"
      stroke="red"
      stroke-width="3"
      fill="transparent"
      class="path"
    />
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
  computed: {
    pathFormula() {
      return (
        "M " +
        this.placement.fromPosition.x +
        " " +
        this.placement.fromPosition.y +
        " C " +
        (this.placement.fromPosition.x + 40) +
        " " +
        (this.placement.fromPosition.y + 40) +
        ", " +
        (this.placement.toPosition.x - 40) +
        " " +
        (this.placement.toPosition.y + 40) +
        ", " +
        this.placement.toPosition.x +
        " " +
        this.placement.toPosition.y
      );
    }
  },
  props: {
    placement: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.circle {
  fill: red; // rgb(78, 77, 77);
  z-index: 100000;
}
</style>
