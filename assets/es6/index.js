import Vue from 'vue';
import store from './store'
import { mapMutations } from 'vuex'

require('./other');

Vue.component('Test', require('./components/Test.vue'))
Vue.component('Evaluation', require('./components/Evaluation.vue'))
var app = new Vue({
  el: '#app',
  store,
  methods: {
    ...mapMutations([
        'addTest',
        'changeCurrentTestId'
      ])
  }
})

// alert('hello world')