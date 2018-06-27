<template>
  <div>
    <div class='row'>
      <div class='col-md-6 d-flex justify-content-md-end justify-content-center'>
        <img :src="this.source" class="main" alt=''/>
      </div>
      <div class='col-md-6 d-flex justify-content-md-start align-items-center'>
        <div class="text-center">
          <h3>What is your problem?</h3>
          <button class='btn btn-hfd'>Take The Online Check up</button>
        </div>
      </div>
      <!-- /.col-md-6 -->
      <!-- /.col-md-6 -->
    </div>
    <!-- /.row -->

  </div>
</template>
<script>
  export default {
    props: ['source']
  }
</script>

    <h1>{{this.$store.state.data[0].title}}</h1>
    <img :src="this.source" height="391" width="295" alt=''/>
