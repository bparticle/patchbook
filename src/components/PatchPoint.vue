<template>
  <circle
    @click="patchFrom"
    ref="circle"
    class="circle circle--patch-point"
    :class="{
      'circle--set': setMode,
      'circle--clear': clearMode
    }"
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
      required: false
    }
  },
  data() {
    return {
      r: 9,
      draggable: null
    };
  },
  computed: {
    setMode() {
      return this.$store.state.setMode;
    },
    clearMode() {
      return this.$store.state.clearMode;
    }
  },
  watch: {
    setMode() {
      this.draggable.disabled = !this.setMode;
    }
  },
  methods: {
    patchFrom() {
      if (!this.setMode) {
        this.$store.commit("setMessage", "You're patching!");
      }
    }
  },
  mounted() {
    const vm = this;
    this.draggable = new this.$plaindraggable(this.$refs.circle, {
      leftTop: true,
      containment: this.rect,
      onDrag: vm.patchFrom
      // onDragEnd: function(newPosition) {
      //   vm.$store.commit("setNewPosition", {
      //     id: vm.id ,
      //     newPosition: {
      //       x: newPosition.left,
      //       y: newPosition.top
      //     }
      //   });
      // }
    });
    this.draggable.snap = { step: 5 };
    this.draggable.disabled = !this.setMode;
  }
};
</script>

<style lang="scss" scoped>
.circle {
  fill: rgba(88, 87, 87, 0.5);
  stroke: rgba(23, 124, 243, 0.8);
  stroke-width: 3px;
  transform: translate(0 0) !important;
  &--set {
    stroke: rgba(23, 240, 200, 1);
  }
  &--freeze {
    transform: none !important;
  }
}
</style>
