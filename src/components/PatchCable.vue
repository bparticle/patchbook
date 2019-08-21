<template>
  <div class="patchcable">
    <svg ref="stage" id="stage" version="1.1">
      <circle
        ref="p0"
        id="p0"
        class="cat circle circle--patch-point"
        :cx="xy.p0.x"
        :cy="xy.p0.y"
        :r="r"
        style="-webkit-tap-highlight-color: transparent; box-shadow: transparent 0px 0px 1px; cursor: grab; user-select: none;"
        transform="translate(0 0)"
      />
      <circle
        ref="p1"
        id="p1"
        class="cat circle circle--bezier-handle"
        :cx="xy.p1.x"
        :cy="xy.p1.y"
        :r="r"
        style="-webkit-tap-highlight-color: transparent; box-shadow: transparent 0px 0px 1px; cursor: grab; user-select: none;"
        transform="translate(0 0)"
      />
    </svg>
  </div>
</template>

<script>
import PlainDraggable from "plain-draggable";

export default {
  name: "PatchCable",
  data() {
    return {
      r: 12,
      xy: {
        p0: { x: 36, y: 160 },
        p1: { x: 80, y: 40 },
        p2: { x: 240, y: 220 },
        p3: { x: 380, y: 120 }
      }
    };
  },
  mounted() {
    new PlainDraggable(this.$refs.p0, {
      // containment: field,
      // onMove: function() {
      //   update(this.rect, vm.xy.p0);
      // }
    });
    new PlainDraggable(this.$refs.p1, {
      // containment: field,
      // onMove: function() {
      //   update(this.rect, vm.xy.p1);
      // }
    });
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
