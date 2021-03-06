<template>
  <circle
    :id="id"
    @click="clickPatchPoint"
    ref="circle"
    class="patchpoint"
    :class="{
      'patchpoint--set': setMode,
      'patchpoint--clear': clearMode,
      'patchpoint--selected': selected
    }"
    :r="r"
    :transform="matrix"
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
    transform: {
      type: Object,
      required: true
    },
    placement: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
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
    activeCable() {
      return this.$store.getters.activeCable;
    },
    rect() {
      return this.$parent.$refs.rect;
    },
    setMode() {
      return this.$store.getters.setMode(this.instrument);
    },
    clearMode() {
      return this.$store.getters.clearMode(this.instrument);
    },
    patchingMode() {
      return this.$store.state.patchingMode;
    },
    matrix() {
      return (
        "matrix(1,0,0,1," + this.transform.x + "," + this.transform.y + ")"
      );
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
        if (this.patchingMode === false) {
          this.addCable();
        }
      } else if (this.clearMode) {
        this.$store.commit("removePatchPoint", this.id);
      }
    },
    cableClick() {
      console.log("cableClick");
      this.$store.commit("setPatchingMode", false);
      document.removeEventListener("mousemove", this.followMouse);
    },
    selectPatchPoint() {
      this.$store.commit("selectPatchPoint", {
        id: this.id,
        instrument: this.instrument
      });
    },
    followMouse(event) {
      this.$store.commit("moveCableEnd", event);
    },
    addCable() {
      this.$store.commit("setPatchingMode", true);
      this.$store
        .dispatch("addPatchCable", {
          placement: {
            x: this.$refs.circle.transform.baseVal[0].matrix.e,
            y: this.$refs.circle.transform.baseVal[0].matrix.f
          },
          element: this.$refs.circle
        })
        .then(() => {
          document.addEventListener("mousemove", this.followMouse);
          setTimeout(() => {
            document.addEventListener("click", this.cableClick);
          }, 10);
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
          transform: {
            x: this.endX,
            y: this.endY
          }
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
.patchpoint {
  pointer-events: auto;
  z-index: 500000;
  fill: rgba(88, 87, 87, 0.5);
  stroke: rgba(23, 124, 243, 0.3);
  stroke-width: 3px;
  &--set {
    stroke: rgba(23, 240, 200, 1);
  }
  &--selected {
    animation: colorPulseSelected 0.6s infinite alternate;
  }
}

@keyframes colorPulseSelected {
  0% {
    stroke: rgb(255, 255, 255);
  }
  100% {
    stroke: rgba(23, 240, 200, 1);
  }
}
</style>
