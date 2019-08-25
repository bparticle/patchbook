<template>
  <circle
    @click="clickPatchPoint"
    ref="circle"
    class="circle circle--patch-point"
    :class="{
      'circle--set': setMode,
      'circle--clear': clearMode
    }"
    :cx="placement.left"
    :cy="placement.top"
    :r="r"
    :transform="transform"
  />
</template>

<script>
/* global Draggable */
export default {
  name: "PatchPoint",
  props: {
    instrument: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    placement: {
      type: Object,
      required: true
    },
    transform: {
      type: String,
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
    rect() {
      return this.$parent.$refs.rect;
    },
    setMode() {
      return this.$store.getters.setMode(this.instrument);
    },
    clearMode() {
      return this.$store.getters.clearMode(this.instrument);
    }
  },
  watch: {
    setMode() {
      if (this.setMode === false) {
        this.draggable[0].disable();
      } else {
        this.draggable[0].enable();
      }
    }
  },
  methods: {
    clickPatchPoint() {
      this.selectPatchPoint();
      if (!this.setMode) {
        this.addCable();
      } else if (this.clearMode) {
        this.$store.commit("removePatchPoint", this.id);
      }
    },
    selectPatchPoint() {
      this.$store.commit("selectPatchPoint", {
        id: this.id,
        instrument: this.instrument
      });
    },
    addCable() {
      this.$store.commit("addPatchCable", {
        placement: this.placement,
        element: this.$refs.circle
      });
    }
  },
  mounted() {
    const vm = this;
    this.draggable = Draggable.create(this.$refs.circle, {
      type: "x,y",
      cursor: "grab",
      bounds: vm.rect,
      liveSnap: {
        x: value => {
          return Math.round(value / 3) * 3;
        },
        y: value => {
          return Math.round(value / 3) * 3;
        }
      },
      onDragEnd: function() {
        vm.$store.commit("setNewPosition", {
          instrument: vm.instrument,
          id: vm.id,
          transform: window
            .getComputedStyle(vm.$refs.circle)
            .getPropertyValue("transform")
        });
      }
    });
    if (!this.setMode) {
      this.draggable[0].disable();
    }
  }
};
</script>

<style lang="scss" scoped>
.circle {
  fill: rgba(88, 87, 87, 0.5);
  stroke: rgba(23, 124, 243, 0.3);
  stroke-width: 3px;
  // transform: translate(0 0) !important;
  &--set {
    stroke: rgba(23, 240, 200, 1);
  }
}
</style>
