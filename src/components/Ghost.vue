<template>
  <div class="ghost">
    <svg :width="deskSize" :height="deskSize">
      <InstrumentClone
        v-for="instrument in instruments"
        :instrumentId="instrument.id"
        :key="instrument.id"
      />
    </svg>
  </div>
</template>

<script>
import InstrumentClone from "@/components/InstrumentClone";

export default {
  name: "Ghost",
  components: {
    InstrumentClone
  },
  computed: {
    instruments() {
      return this.$store.state.instruments;
    },
    deskSize() {
      return this.$store.state.deskSize;
    }
  }
};
</script>

<style lang="scss" scoped>
.ghost {
  overflow: visible;
  z-index: 5; // Important to keep patch points on the forefront
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
