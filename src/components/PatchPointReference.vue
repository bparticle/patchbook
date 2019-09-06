<template>
  <div class="patchpoint-reference">
    <h3>Patch points</h3>
    <div
      class="patchpoint-reference__patchpoint"
      v-for="patchPoint in patchPoints"
      :key="patchPoint.id"
      :class="{ selected: patchPoint.selected }"
      @click="selectPatchPoint(patchPoint.id)"
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
  },
  methods: {
    selectPatchPoint(id) {
      this.$store.commit("selectPatchPoint", {
        id: id,
        instrument: this.instrument
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.patchpoint-reference {
  z-index: -1;
  position: absolute;
  padding: 25px 0;
  text-align: left;
  color: #545454;
  font-size: 0.8em;
  background-color: white;
  padding: 0 20px 20px;
  left: 0;
  right: 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 1px 0px 4px rgba(0, 0, 0, 0.4);

  &__patchpoint {
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 3px;
    padding: 2px 5px;
    &.selected {
      margin-left: 15px;
    }
  }
}
</style>
