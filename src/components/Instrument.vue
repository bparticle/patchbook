<template>
  <div ref="instrument" class="instrument">
    <div :ref="handleId" :id="handleId" class="instrument__handle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 25 25"
        fill="none"
        stroke="currentColor"
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
      <button
        class="button button--clear"
        :class="{ active: clearMode }"
        @click="toggleClearMode"
      >
        Clear
      </button>
      <transition name="fade">
        <PatchPointDialog
          v-if="infoDialog"
          :event="clickEvent"
          v-on:send-details="pushDetails"
          v-on:close-dialog="closeDialog"
        />
      </transition>
      <svg
        v-if="size"
        ref="stage"
        class="instrument__stage"
        version="1.1"
        :width="size.w"
        :height="size.h"
        :viewBox="svgViewBox"
        @click="getPatchPointInfo($event)"
      >
        <rect
          ref="rect"
          class="instrument__rect"
          :class="{ 'instrument__rect--set': setMode }"
          x="0"
          y="0"
          width="100%"
          height="100%"
        />
        <PatchCable
          v-for="patchCable in patchCables"
          :key="patchCable.id"
          :id="patchCable.id"
          :placement="patchCable.placement"
        />
        <PatchPoint
          v-for="patchPoint in patchPoints"
          :placement="patchPoint.placement"
          :id="patchPoint.id"
          :key="patchPoint.id"
          :transform="patchPoint.transform"
          :instrument="id"
        />
      </svg>
      <img class="instrument__img" ref="img" :src="imgSrcPath" alt />
    </div>
    <PatchPointReference :instrument="id" />
  </div>
</template>

<script>
/* global Draggable */

import PatchPoint from "@/components/PatchPoint";
import PatchCable from "@/components/PatchCable";
import PatchPointDialog from "@/components/PatchPointDialog";
import PatchPointReference from "@/components/PatchPointReference";

export default {
  name: "Instrument",
  components: {
    PatchPoint,
    PatchCable,
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
    // Subscribe to changes in Vuex store and save to local storage
    this.$store.subscribe((mutation, state) => {
      // Store the state object as a JSON string // wait for all mutations and data to arrive
      setTimeout(function() {
        localStorage.setItem("instruments", JSON.stringify(state.instruments));
      }, 500);
    });
    // Make draggable
    const grabber = document.getElementById(this.handleId);
    this.draggable = Draggable.create(this.$refs.instrument, {
      type: "x,y",
      cursor: "grab",
      trigger: grabber
    });
  }
};
</script>

<style lang="scss" scoped>
.instrument {
  &__handle {
    position: absolute;
    margin-top: -30px;
  }
  &__device {
    position: relative;
  }
  &__img {
    vertical-align: bottom;
    max-width: 100%;
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
  margin: -50px 25px 15px;

  &:focus {
    outline: none;
  }
  &--set {
    right: 172px;
    &.active {
      background-color: #287e94;
    }
  }
  &--clear {
    right: 95px;
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
