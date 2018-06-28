<template>
<div class="text-center evaluation-question-content">
  <h2>Let's get started</h2>
  <div class='question'>
    <h4 class="hfd_color mb-3">Concern with your smile</h4>
    <h3 class="hfd_color">Are your two upper front teeth too long or too wide? </h3>
    <button @click="yesClickHandler" class="yes_no">Yes</button>
    <p class="answer">Probable diagnosis: Aesthetic problem, Treatment: Cosmetic correction </p>
    <button @click="noClickHandler" class="yes_no">No</button>
    <div>
      <button  class="prev_next"><i class='fa fa-caret-left'></i></button>
      <button class="prev_next"><i class='fa fa-caret-right'></i></button>
    </div>
  </div>
  <!-- /.question -->
</div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    yesClickHandler () {

    },
    noClickHandler () {

    }
  }
}
</script>