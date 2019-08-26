<template>
  <div class="instrument">
    <div class="instrument__device">
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
    <button class="button button--clear-all" @click="clearPatchPoints">
      Clear All
    </button>

    <PatchPointReference :instrument="id" />
  </div>
</template>

<script>
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
      size: null,
      svgViewBox: null
    };
  },
  computed: {
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
      this.size = {
        w: this.$refs.img.width,
        h: this.$refs.img.height,
        nW: this.$refs.img.naturalWidth,
        nH: this.$refs.img.naturalHeight
      };
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
    this.$store.commit("initializeStore");
    this.$store.commit("modeReset");
  }
};
</script>

<style lang="scss" scoped>
.instrument {
  &__device {
    position: relative;
  }
  &__img {
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
  border: 0;
  color: #fff;
  background-color: #545454;
  padding: 8px 20px;
  margin: 15px 25px;

  &:focus {
    outline: none;
  }
  &--set {
    &.active {
      background-color: #287e94;
    }
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
