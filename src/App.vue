<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" @game-tick="thisFunction">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { setInterval } from 'timers'

export default {
  name: 'app',
  created: function() {
    let self = this
    setInterval(() => self.$emit('game-tick'), 1000)
  },
  methods: {
    thisFunction() {
      console.log('Hi')
    }
  },
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
