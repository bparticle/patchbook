<template>
  <div class="ghost">
    <svg>
      <rect v-for="instrument in instruments" :key="instrument.id" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "Ghost",
  computed: {
    instruments() {
      return this.$store.state.instruments;
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
