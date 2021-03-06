import Vue from 'vue';
import Vuex from 'vuex'
import data from './evaluation_data_flat'
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    data,
    tests: [],
    currentTestId: 1,
  },
  mutations: {
    addTest(state, payload) {
      const isAlreadyExists = state.tests.find(test => test.id == payload.id)
      if (isAlreadyExists) {
        return state;
      }else {
        return state.tests.push(payload)
      }
    },
    removeCurrentFromTests(state) {
      const isAlreadyExists = state.tests.find(test => test.id == state.currentTestId)
      if (isAlreadyExists) {
        return state.tests = state.tests.filter(test => test.id != state.currentTestId)
      } else {
        return state;
      }
    },
    changeCurrentTestId (state, newId) {
      state.currentTestId = newId
    }

  },

})

export default store;