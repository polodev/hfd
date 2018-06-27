import Vue from 'vue';
import Vuex from 'vuex'
import data from './evaluation_data'
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    data
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

export default store;