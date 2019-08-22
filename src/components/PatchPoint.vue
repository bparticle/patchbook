<template>
  <circle
    ref="circle"
    class="circle circle--patch-point"
    :cx="placement.x"
    :cy="placement.y"
    :r="r"
    style="-webkit-tap-highlight-color: transparent; box-shadow: transparent 0px 0px 1px; cursor: grab; user-select: none;"
    transform="translate(0 0)"
  />
</template>

<script>
export default {
  name: "PatchPoint",
  props: {
    id: {
      type: String,
      required: true
    },
    placement: {
      type: Object,
      required: true
    },
    rect: {
      type: SVGRectElement,
      required: true
    }
  },
  data() {
    return {
      r: 9,
      draggable: null
    };
  },
  mounted() {
    this.draggable = new this.$plaindraggable(this.$refs.circle, {
      leftTop: true,
      containment: this.rect
    });
    this.draggable.snap = { step: 5 };
  }
};
</script>

<style lang="scss" scoped>
.circle {
  fill: rgba(88, 87, 87, 0.5);
  stroke: rgba(23, 124, 243, 0.8);
  stroke-width: 3px;
}
</style>
