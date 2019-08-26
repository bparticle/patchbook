<template>
  <g>
    <rect
      class="instrument-clone"
      :style="instrumentDimensions"
      :x="instrumentOffset.x"
      :y="instrumentOffset.y"
    ></rect>
    <PatchCable
      v-for="patchCable in patchCables"
      :key="patchCable.id"
      :id="patchCable.id"
      :placement="patchCable.placement"
    />
    <PatchPoint
      v-for="patchPoint in patchPoints"
      :placement="instrumentDimensions"
      :id="patchPoint.id"
      :key="patchPoint.id"
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
      return this.$store.getters.instrumentOffset(this.instrumentId);
    },
    patchPoints() {
      return this.$store.getters.patchPoints(this.instrumentId);
    },
    patchCables() {
      return this.$store.state.patchCables;
    }
  }
};
</script>

<style lang="scss" scoped>
rect {
  fill: transparent;
  stroke: rgba($color: #15c, $alpha: 0.3);
  stroke-width: 4px;
  &--set {
    fill: rgba($color: #15c, $alpha: 0.3);
  }
}
</style>
