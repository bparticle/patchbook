<template>
  <div class="patchpoint-dialog" :style="position">
    <label for="pp-name">Patch point description</label>
    <input
      ref="input"
      v-model="input"
      name="pp-name"
      type="text"
      required
      autofocus
      v-on:keyup.enter="submit"
      v-on:keyup.esc="kill"
    />
    <button @click="submit" type="submit">Add</button>
    <button @click="kill" type="submit">X</button>
  </div>
</template>

<script>
export default {
  name: "PatchPointDialog",
  data() {
    return {
      input: ""
    };
  },
  props: {
    event: {
      type: MouseEvent,
      required: true
    }
  },
  computed: {
    position() {
      // Get absolute positioning from mouse event
      var rect = this.event.target.getBoundingClientRect();
      var x = this.event.clientX - rect.left; //x position within the element.
      var y = this.event.clientY - rect.top; //y position within the element.
      return {
        left: x + "px",
        top: y + "px"
      };
    }
  },
  methods: {
    submit() {
      this.$emit("send-details", this.input);
    },
    kill() {
      this.$emit("close-dialog");
    }
  },
  mounted() {
    this.$refs.input.focus();
  }
};
</script>

<style lang="scss" scoped>
.patchpoint-dialog {
  position: absolute;
  padding: 25px;
  background-color: #fff;
  z-index: 5;
  box-shadow: 0 0 5px rgba(25, 25, 50, 0.5);
}

input {
  clear: both;
  display: block;
}
</style>
