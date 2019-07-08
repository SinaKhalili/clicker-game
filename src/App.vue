<template>
  <div id="app">
    <ethan-pic/>
    <boss/>
    <stats/>
    <progressions/>
    <inventory/>
    <achievements v-show="achievements"/>
  </div>
</template>

<script>
import ethanPic from './components/ethanPic.vue'
import stats from './components/stats.vue'
import progressions from './components/progressions.vue'
import inventory from './components/inventory.vue'
import achievements from './components/achievements.vue'
import boss from './components/boss.vue'
import eventBus from './eventBus'

export default {
  name: 'app',
  methods: {
    thisFunction() {}
  },
  components: {
    ethanPic,
    stats,
    progressions,
    inventory,
    achievements,
    boss,
  },
  data() {
    return {
      achievements: true
    }
  },
  mounted() {
    eventBus.$on('think-click', data => {
      //this.achievements = true
    })
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
body {
  background-image: url('assets/backgrounds/trippy.gif');
  background-repeat: repeat;
  background-size: 100%;
}
</style>
