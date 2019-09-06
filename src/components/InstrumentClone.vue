<template>
  <g :style="instrumentOffset">
    <rect
      ref="rect"
      class="instrument-clone"
      :class="{ 'instrument-clone--set': setMode }"
      :style="instrumentDimensions"
    ></rect>
    <PatchCable
      v-for="patchCable in patchCables"
      :key="patchCable.id"
      :id="patchCable.id"
      :placement="patchCable.placement"
    />
    <PatchPoint
      v-for="patchPoint in patchPoints"
      :id="patchPoint.id"
      :key="patchPoint.id"
      :placement="instrumentOffset"
      :selected="patchPoint.selected"
      :transform="patchPoint.transform"
      :instrument="instrumentId"
    />
  </g>
</template>

<script>
import PatchPoint from "@/components/PatchPoint";
import PatchCable from "@/components/PatchCable";

export default {
  name: "InstrumentClone",
  components: {
    PatchPoint,
    PatchCable
  },
  props: {
    instrumentId: {
      type: String,
      required: true
    }
  },
  computed: {
    instrumentDimensions() {
      return this.$store.getters.instrumentDimensions(this.instrumentId);
    },
    instrumentOffset() {
      const o = this.$store.getters.instrumentOffset(this.instrumentId);
      return {
        transform: "matrix(1,0,0,1," + o.x + "," + o.y + ")"
      };
    },
    patchPoints() {
      return this.$store.getters.patchPoints(this.instrumentId);
    },
    patchCables() {
      return this.$store.state.patchCables;
    },
    setMode() {
      return this.$store.getters.setMode(this.instrumentId);
    }
  }
};
</script>

<style lang="scss" scoped>
.instrument-clone {
  fill: transparent;
  stroke-width: 4px;
  &--set {
    stroke-linejoin: round;
    stroke: rgba($color: #15c, $alpha: 0.7);
    stroke-width: 5px;
  }
}
</style>
