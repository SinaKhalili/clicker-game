<template>
  <div id="app">
    <ethan-pic/>
    <stats/>
    <progressions/>
    <inventory/>
  </div>
</template>

<script>
import ethanPic from './components/ethanPic.vue'
import stats from './components/stats.vue'
import progressions from './components/progressions.vue'
import inventory from './components/inventory.vue'

export default {
  name: 'app',
  methods: {
    thisFunction() {
      console.log('Hi')
    }
  },
  components: {
    ethanPic,
    stats,
    progressions,
    inventory
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
