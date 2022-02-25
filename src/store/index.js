import Vue from "vue";
import Vuex from "vuex";
import orderStore from "./order";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    orders: { namespaced: true, ...orderStore },
  },
});
