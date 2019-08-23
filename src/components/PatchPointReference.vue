<template>
  <div class="patchpoint-reference">
    <div v-for="patchPoint in patchPoints" :key="patchPoint.id">
      {{ patchPoint.details }}<br />
      X: {{ patchPoint.placement.left }} Y:{{ patchPoint.placement.top }}
    </div>
  </div>
</template>

<script>
export default {
  name: "PatchPointReference",
  computed: {
    patchPoints() {
      return this.$store.state.patchPoints;
    }
  }
};
</script>

<style lang="scss" scoped>
.patchpoint-reference {
  padding: 25px;
}
</style>
