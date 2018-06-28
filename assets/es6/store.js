import Vue from 'vue';
import Vuex from 'vuex'
import data from './evaluation_data'
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    data,
    tests: [],
    currentEvaluationId: 1,
    currentQuestionsId: 1,
    currentQuestion: [],
  },
  mutations: {
    addTest(state, payload) {
      state.push(payload)
    },
    changeCurrentEvaluationId (state, id) {
      state.currentEvaluationId = id;
    },
    changeCurrentQuestionsId (state, id) {
      state.currentQuestionsId = id;
    },
    changeCurrentQuestion (state, question) {
      state.currentQuestion = question;
    }

  }
})

export default store;