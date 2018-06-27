import Vue from 'vue';
import store from './store'
require('./other');

Vue.component('EvaluationFirst', require('./components/EvaluationFirst.vue'))
var app = new Vue({
  el: '#app',
  store,
})

// alert('hello world')