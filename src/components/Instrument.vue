<template>
  <div class="instrument">
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
      <PatchPoint
        v-for="patchPoint in patchPoints"
        :placement="patchPoint.placement"
        :rect="$refs.rect"
        :id="patchPoint.id"
        :key="patchPoint.id"
        :transform="patchPoint.transform"
      />
    </svg>
    <img class="instrument__img" ref="img" :src="imgSrcPath" alt="" />
    <div v-if="size" class="size">{{ size.w }} x {{ size.h }}</div>
    <PatchPointReference />
  </div>
</template>

<script>
import PatchPoint from "@/components/PatchPoint";
import PatchPointDialog from "@/components/PatchPointDialog";
import PatchPointReference from "@/components/PatchPointReference";

export default {
  name: "Instrument",
  components: {
    PatchPoint,
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
      return this.$store.state.patchPoints;
    },
    setMode() {
      return this.$store.state.setMode;
    }
  },
  methods: {
    addPatchPoint(details) {
      // Get patch point details from user first, then store
      this.$store.commit("addPatchPoint", {
        event: this.clickEvent,
        id: this.id,
        details: details
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
      if (this.setMode) {
        this.clickEvent = event;
        this.infoDialog = true;
      } else {
        this.$store.commit(
          "setMessage",
          "You must be in Set Mode to add patch points"
        );
      }
    },
    setSize() {
      this.size = {
        w: this.$refs.img.width,
        h: this.$refs.img.height
      };
      this.svgViewBox =
        "0 0 " + this.$refs.img.width + " " + this.$refs.img.height;
    }
  },
  mounted() {
    this.$refs.img.onload = this.setSize;
    // Subscribe to changes in Vuex store and save to local storage
    this.$store.subscribe((mutation, state) => {
      // Store the state object as a JSON string // wait for all mutations and data to arrive
      setTimeout(function() {
        localStorage.setItem("patchpoints", JSON.stringify(state.patchPoints));
      }, 500);
    });
    this.$store.commit("initializeStore");
  }
};
</script>

<style lang="scss" scoped>
.instrument {
  position: relative;
  &__img {
    width: 100%;
  }
  &__stage {
    width: 100%;
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
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
