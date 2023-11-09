import Vuex from "vuex";

import Vue from "vue";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: 0,
  },
  mutations: {
    setUser(state, mutation) {
      state.user = mutation;
    },
  },
});
