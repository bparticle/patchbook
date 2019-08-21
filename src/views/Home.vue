<template>
  <div class="home">
    <Instrument />
  </div>
</template>

<script>
// @ is an alias to /src
import Instrument from "@/components/Instrument.vue";

export default {
  name: "home",
  components: {
    Instrument
  }
};
</script>
