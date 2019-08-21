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
      containment: this.rect,
      onMove: function() {
        console.log("yoyo");
      }
    });
    this.draggable.snap = { step: 20 };
  }
};
</script>

<style lang="scss" scoped>
.circle {
  fill: rgb(88, 87, 87);
  stroke: #177cf3;
  stroke-width: 3px;
}
</style>
