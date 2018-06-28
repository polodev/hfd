import Vue from 'vue';
import store from './store'
require('./other');

Vue.component('Test', require('./components/Test.vue'))
Vue.component('Evaluation', require('./components/Evaluation.vue'))
var app = new Vue({
  el: '#app',
  store,
})

// alert('hello world')