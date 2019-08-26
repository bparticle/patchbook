<template>
  <div class="ghost">
    <svg :width="ghostWidth" :height="ghostHeight">
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
    ghostWidth() {
      return "2500";
    },
    ghostHeight() {
      return "2500";
    }
  }
};
</script>

<style lang="scss" scoped>
.ghost {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
