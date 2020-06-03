<template>
  <div id="app">
    <!--    <img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  body {
    margin: 0;
  }
  #app {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
