<template>
  <div class="home">
    <transition name="fade">
      <div v-show="message" class="messages">{{ message }}</div>
    </transition>
    <Instrument
      v-for="instrument in instruments"
      :imgSrc="instrument.img"
      :id="instrument.id"
      :key="instrument.id"
    />
    <Ghost />
  </div>
</template>

<script>
// @ is an alias to /src
import Instrument from "@/components/Instrument.vue";
import Ghost from "@/components/Ghost.vue";

export default {
  name: "home",
  components: {
    Instrument,
    Ghost
  },
  computed: {
    message() {
      return this.$store.state.message;
    },
    instruments() {
      return this.$store.state.instruments;
    }
  },
  watch: {
    message: function() {
      setTimeout(() => {
        this.$store.commit("setMessage", "");
      }, 3000);
    }
  },
  mounted() {
    // Reset all modes and check store
    this.$store.commit("initializeStore");
    this.$store.commit("unselectAll");
    this.$store.commit("modeReset");
  }
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  margin: 50px auto;
  max-width: 900px;
}
.messages {
  top: 50px;
  left: 0;
  position: absolute;
  width: 100%;
  background-color: lightyellow;
  height: 40px;
  padding: 20px 0;
  box-shadow: 0 0 5px #545454;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  height: 0;
  padding-top: 0;
}
</style>
