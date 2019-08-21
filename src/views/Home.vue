<template>
  <div class="home">
    <PatchCable
      v-for="patchCable in patchCables"
      :cableId="patchCable.id"
      :key="patchCable.id"
    />
    <Instrument />
  </div>
</template>

<script>
// @ is an alias to /src
import Instrument from "@/components/Instrument.vue";
import PatchCable from "@/components/PatchCable";

export default {
  name: "home",
  data() {
    return {
      patchCables: [
        {
          id: 0
        }
      ]
    };
  },
  components: {
    Instrument,
    PatchCable
  }
};
</script>
