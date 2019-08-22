import Vuex from "vuex";
import Vue from "vue";

import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
