<template>
  <div class="patchpoint-reference">
    <h3>Patch points</h3>
    <div
      class="patchpoint-reference__patchpoint"
      v-for="patchPoint in patchPoints"
      :key="patchPoint.id"
      :class="{ selected: patchPoint.selected }"
    >
      > {{ patchPoint.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "PatchPointReference",
  props: {
    instrument: {
      type: String,
      required: true
    }
  },
  computed: {
    patchPoints() {
      return this.$store.getters.patchPoints(this.instrument);
    }
  }
};
</script>

<style lang="scss" scoped>
.patchpoint-reference {
  padding: 25px 0;
  text-align: left;
  color: #545454;
  font-size: 0.8em;
  &__patchpoint {
    &.selected {
      animation: colorPulseSet 0.4s infinite alternate;
    }
  }
}

@keyframes colorPulseSet {
  0% {
    background-color: transparent;
  }
  100% {
    background-color: greenyellow;
  }
}
</style>
