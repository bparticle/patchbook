<template>
  <div ref="instrument" class="instrument" :style="leftTop">
    <div :ref="handleId" :id="handleId" class="instrument__handle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 25 25"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-move"
      >
        <polyline points="5 9 2 12 5 15" />
        <polyline points="9 5 12 2 15 5" />
        <polyline points="15 19 12 22 9 19" />
        <polyline points="19 9 22 12 19 15" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    </div>
    <div class="instrument__device">
      <button class="button button--clear-all" @click="clearPatchPoints">
        Clear All
      </button>
      <button
        class="button button--set"
        @click="toggleSetMode"
        :class="{ active: setMode }"
      >
        {{ clickAction }}
      </button>
      <transition name="fade">
        <PatchPointDialog
          v-if="infoDialog"
          :event="clickEvent"
          v-on:send-details="pushDetails"
          v-on:close-dialog="closeDialog"
        />
      </transition>
      <img
        @click="getPatchPointInfo($event)"
        class="instrument__img"
        ref="img"
        :src="imgSrcPath"
      />
    </div>
    <PatchPointReference :instrument="id" />
  </div>
</template>

<script>
/* global Draggable */

import PatchPointDialog from "@/components/PatchPointDialog";
import PatchPointReference from "@/components/PatchPointReference";

export default {
  name: "Instrument",
  components: {
    PatchPointDialog,
    PatchPointReference
  },
  props: {
    id: {
      type: String,
      required: true
    },
    imgSrc: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      infoDialog: false,
      clickEvent: "",
      svgViewBox: null
    };
  },
  computed: {
    leftTop() {
      return {
        left: this.instrumentDimensions.x + "px",
        top: this.instrumentDimensions.y + "px"
      };
    },
    instrumentDimensions() {
      return this.$store.getters.instrumentDimensions(this.id);
    },
    handleId() {
      return "handle" + this.id;
    },
    size() {
      return this.$store.getters.instrumentSize(this.id);
    },
    imgSrcPath() {
      return "/img/" + this.imgSrc;
    },
    patchPoints() {
      return this.$store.getters.patchPoints(this.id);
    },
    patchCables() {
      return this.$store.state.patchCables;
    },
    setMode() {
      return this.$store.getters.setMode(this.id);
    },
    clearMode() {
      return this.$store.getters.clearMode(this.id);
    },
    clickAction() {
      if (this.setMode) {
        return "Patch";
      } else {
        return "Map";
      }
    }
  },
  methods: {
    addPatchPoint(details) {
      this.$store.commit("addPatchPoint", {
        event: this.clickEvent,
        id: this.id,
        name: details,
        instrument: this.id
      });
    },
    pushDetails(details) {
      this.addPatchPoint(details);
      this.infoDialog = false;
    },
    closeDialog() {
      this.infoDialog = false;
    },
    getPatchPointInfo(event) {
      this.clickEvent = event;
      if (this.setMode) {
        this.infoDialog = true;
      }
    },
    setSize() {
      this.$store.commit("setInstrumentSize", {
        instrumentId: this.id,
        size: {
          w: this.$refs.img.width,
          h: this.$refs.img.height
        },
        offset: {
          x: this.$refs.instrument.offsetLeft,
          y: this.$refs.instrument.offsetTop
        }
      });
      this.svgViewBox = "0 0 " + this.size.w + " " + this.size.h;
    },
    toggleSetMode() {
      this.$store.commit("toggleSetMode", this.id);
      this.$store.commit("unselectAll", this.id);
    },
    toggleClearMode() {
      this.$store.commit("toggleClearMode", this.id);
      this.$store.commit("unselectAll", this.id);
    },
    clearPatchPoints() {
      this.$store.commit("clearPatchPoints", this.id);
    }
  },
  mounted() {
    this.$refs.img.onload = this.setSize;
    this.$store.commit("moveGhost", {
      instrumentId: this.id,
      position: {
        left: 0,
        top: 0
      }
    });
    // Subscribe to changes in Vuex store and save to local storage
    this.$store.subscribe((mutation, state) => {
      // Store the state object as a JSON string // wait for all mutations and data to arrive
      setTimeout(function() {
        localStorage.setItem("instruments", JSON.stringify(state.instruments));
      }, 500);
    });
    // Make draggable
    const vm = this;
    const grabber = document.getElementById(this.handleId);
    Draggable.create(this.$refs.instrument, {
      type: "top,left",
      cursor: "grab",
      trigger: grabber,
      zIndexBoost: false,
      onDrag: function() {
        vm.$store.commit("moveGhost", {
          instrumentId: vm.id,
          position: {
            left: this.x,
            top: this.y
          }
        });
      }
    });
    setTimeout(() => {
      this.$refs.instrument.style.left = this.instrumentDimensions.x + "px";
      this.$refs.instrument.style.top = this.instrumentDimensions.y + "px";
    }, 20);
  }
};
</script>

<style lang="scss" scoped>
.instrument {
  position: absolute;
  &__handle {
    position: absolute;
    margin-top: -30px;
    left: 3px;
    stroke: rgb(77, 77, 77);
    background: rgb(236, 236, 236);
    box-shadow: inset 0px -2px 1px rgba(0, 0, 0, 0.3), 1px 0px 3px;
    height: 20px;
    padding: 5px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  &__device {
    position: relative;
  }
  &__img {
    vertical-align: bottom;
  }
  &__stage {
    position: absolute;
    fill: transparent;
  }
  &__rect {
    fill: transparent;
    &--set {
      fill: rgba($color: #15c, $alpha: 0.3);
    }
  }
}

.button {
  position: absolute;
  border: 0;
  color: #fff;
  background-color: #545454;
  padding: 8px 20px;
  margin: -50px 0 15px;
  border-radius: 3px;

  &:focus {
    outline: none;
  }
  &--set {
    right: 105px;
    &.active {
      background-color: #287e94;
    }
  }
  &--clear-all {
    right: 0;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
