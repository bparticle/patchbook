import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import PlainDraggable from "plain-draggable";
import LeaderLine from "leader-line";

Object.defineProperty(Vue.prototype, "$plaindraggable", {
  value: PlainDraggable
});
Object.defineProperty(Vue.prototype, "$leaderline", {
  value: LeaderLine
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
