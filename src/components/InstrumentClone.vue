<template>
  <g>
    <rect
      class="instrument-clone"
      :style="instrumentDimensions"
      :x="instrumentOffset.x"
      :y="instrumentOffset.y"
    ></rect>
    <svg>
      <circle r="20" fill="red" />
    </svg>
  </g>
</template>

<script>
export default {
  name: "InstrumentClone",
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
    }
  }
};
</script>

<style lang="scss" scoped>
rect {
  // fill: transparent;
  fill: rgba($color: #15c, $alpha: 0.3);
  &--set {
    fill: rgba($color: #15c, $alpha: 0.3);
  }
}
</style>
