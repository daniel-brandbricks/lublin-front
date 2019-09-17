<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/main/Navbar'

export default {
  name: 'App',
  components: {Navbar}
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
  }
</style>
