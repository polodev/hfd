import Vue from 'vue';

require('./other');

Vue.component('Test', require('./components/Test.vue'))
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

// alert('hello world')