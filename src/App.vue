<template>
  <div id="app">
    <header :style="deskSize">
      <button class="button" @click="resetPositions">Reset</button>
      <div id="nav">
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    resetPositions() {
      this.$store.commit("resetPositions");
    }
  },
  computed: {
    deskSize() {
      return {
        width: this.$store.state.deskSize + "px"
      };
    }
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
header {
  background-color: rgb(145, 158, 146);
  width: 100%;
  position: absolute;
  top: 0;
  padding: 0 35px;
}
#nav {
  padding: 30px 0;
  float: left;
  a {
    margin: 0 10px;
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #007272;
    }
  }
}
.button {
  float: left;
  border: 0;
  color: #fff;
  background-color: #545454;
  padding: 8px 20px;
  margin: 25px;
  border-radius: 3px;

  &:focus {
    outline: none;
  }
}
</style>
