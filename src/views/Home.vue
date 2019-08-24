<template>
  <div class="home">
    <transition name="fade">
      <div v-show="message" class="messages">{{ message }}</div>
    </transition>
    <button class="button button--set" @click="toggleSetMode">
      {{ clickAction }}
    </button>
    <button
      class="button button--clear"
      :class="{ active: clearMode }"
      @click="toggleClearMode"
    >
      Clear
    </button>
    <button class="button button--clear-all" @click="clearPatchPoints">
      Clear All
    </button>
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
  components: {
    Instrument
  },
  computed: {
    message() {
      return this.$store.state.message;
    },
    instruments() {
      return this.$store.state.instruments;
    },
    setMode() {
      return this.$store.state.setMode;
    },
    clearMode() {
      return this.$store.state.clearMode;
    },
    clickAction() {
      if (this.setMode) {
        return "Patch";
      } else {
        return "Map";
      }
    }
  },
  watch: {
    message: function() {
      setTimeout(() => {
        this.$store.commit("setMessage", "");
      }, 3000);
    }
  },
  methods: {
    toggleSetMode() {
      this.$store.commit("toggleSetMode");
    },
    toggleClearMode() {
      this.$store.commit("toggleClearMode");
    },
    clearPatchPoints() {
      this.$store.commit("clearPatchPoints");
    }
  },
  mounted() {
    this.$store.commit("unselectAll");
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin: 50px auto;
  max-width: 900px;
}

button {
  &:focus {
    outline: none;
  }
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

.button {
  border: 0;
  color: #fff;
  background-color: #545454;
  padding: 8px 20px;
  margin: 15px 25px;

  &.active {
    background-color: #287e94;
  }
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
