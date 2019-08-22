<template>
  <div class="home">
    <Instrument
      v-for="instrument in instruments"
      :imgSrc="instrument.img"
      :id="instrument.id"
      :key="instrument.id"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Instrument from "@/components/Instrument.vue";

export default {
  name: "home",
  data() {
    return {
      patchCables: [
        {
          id: 0
        }
      ],
      instruments: [
        {
          id: "instrument-00",
          img: "modulargrid_732076.jpg"
        }
      ]
    };
  },
  components: {
    Instrument
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin: 50px auto;
  max-width: 900px;
}
</style>
