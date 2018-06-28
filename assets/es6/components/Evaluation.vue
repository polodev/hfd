<template>
<div class="text-center evaluation-question-content">
  <div v-if="!isSummary" class="question-block">
    <h2>Let's get started</h2>
    <div class='question'>
      <h4 class="hfd_color mb-3">{{this.currentTest.title}}</h4>
      <h3 class="hfd_color">{{this.currentTest.question}}</h3>
      <button @click="yesClickHandler" class="yes_no">Yes</button>
      <p class="answer">Probable diagnosis: {{this.currentTest.diagnosis}}, Treatment: {{this.currentTest.treatment}}</p>
      <button @click="noClickHandler" class="yes_no">No</button>
      <p class='text-center my-2 hfd_color'>
        ({{this.currentTestId}}/{{this.data.length}})
      </p>
      <!-- /.text-center -->
      <div>
        <button @click="prevHandler" class="prev_next" :disabled="!this.hasPrevTest"><i class='fa fa-caret-left'></i></button>
        <button @click="nextHandler" class="prev_next" :disabled="!this.hasNextTest"><i class='fa fa-caret-right'></i></button>
      </div>
    </div>
    <!-- /.question -->
  </div>
  <div v-if="isSummary" class='summary-block text-left'>
    <h2 class="hfd_color text-center mb-4">Your Dental profile</h2>
    <div class='row'>
      <div v-for="test in tests" class='col-md-6'>
        <p>
          <span><strong>Test: - </strong> {{test.question}} <br/></span>
          <span class="hfd_color">
            <strong>diagnosis: </strong>{{test.diagnosis}}. <br>
            <strong>treatment: </strong> {{test.treatment}}
          </span>
        </p>
      </div>
      <!-- /.col-md-6 -->
    </div>
    <!-- /.row -->
    <div class="text-center">
        <h2 class="hfd_color">Interested with our Treatments?</h2>
        <p>
          <a :href='appointmentUrl' class="btn btn-hfd">Make an appointment now</a>
        </p>
    </div>

  </div>
  <!-- /.summary-block -->
</div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {

    }
  },
  props: ['appointmentUrl'],
  computed: {
      currentTestId: {
          get() { return this.$store.state.currentTestId; },
          set(value) { this.$store.commit('changeCurrentTestId', value); },
      },
     ...mapState({
      data: state => state.data,
      tests: state => state.tests,
      isSummary ( state ) {
        return state.currentTestId >= this.maxId
        // return state.currentTestId >= 6
      },
      currentTest (state) {
        return state.data.find(test => test.id === state.currentTestId) || {}
      },
      maxId (state) {
        const ids = state.data.map(test => test.id)
        return Math.max(...ids)
      },
      minId (state) {
        const ids = state.data.map(test => test.id)
        return Math.min(...ids)
      },
      hasNextTest (state) {
        return this.currentTestId < this.maxId
      },
      hasPrevTest (state) {
        return this.currentTestId > this.minId
      },
    }),
   },
  methods: {
    yesClickHandler () {
      //saved in test
      this.$store.commit('addTest', this.currentTest)
      //changeCurrentTestId
      this.$store.commit('changeCurrentTestId', ++this.currentTestId)
    },
    noClickHandler () {
      //delete already inside test
      this.$store.commit('removeCurrentFromTests');
      //changeCurrentTestId
      this.$store.commit('changeCurrentTestId', ++this.currentTestId)
    },
    prevHandler () {
      //changeCurrentTestId
      this.$store.commit('changeCurrentTestId', --this.currentTestId)
    },
    nextHandler () {
      //changeCurrentTestId
      this.$store.commit('changeCurrentTestId', ++this.currentTestId)

    }
  },
}
</script>