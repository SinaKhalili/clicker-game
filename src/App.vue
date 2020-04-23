<template>
  <div id="app" v-bind:style="{ backgroundImage: curr_bg }">
    <ethan-pic />
    <stats v-show="stats" />
    <inventory v-if="inventory" />
    <boss v-if="boss" />
    <progressions v-if="progressions" />
    <achievements v-if="achievements" />
    <shmoke v-if="shmoke" />

    <VuexplosiveModal
      :visible="showModal"
      title=" 🔥 LEVEL UP! 🔥 "
      :content="modalContent"
      footer="Your ETHAN LEVEL has INCREASED"
    ></VuexplosiveModal>
  </div>
</template>

<script>
import ethanPic from './components/ethanPic.vue'
import stats from './components/stats.vue'
import progressions from './components/progressions.vue'
import inventory from './components/inventory.vue'
import achievements from './components/achievements.vue'
import boss from './components/boss.vue'
import EventBus from './eventBus'
import shmoke from './components/shmoke'
import VuexplosiveModal from './components/VuexplosiveModal'

export default {
  name: 'app',
  methods: {
    thisFunction() {},
  },
  components: {
    ethanPic,
    stats,
    progressions,
    inventory,
    achievements,
    boss,
    shmoke,
    VuexplosiveModal,
  },
  data() {
    return {
      achievements: false,
      stats: false,
      progressions: false,
      inventory: false,
      achievements: false,
      boss: false,
      shmoke: false,
      showModal: false,
      modalContent: '',
      bgs: ['trippy.gif', 'vapor_walk.gif', 'vapor.gif'],
      curr_bg: 'trippy.gif',
    }
  },
  mounted() {
    EventBus.$on('level-up', (data) => {
      // maybe map this to get rid of these gross if statements?
      if (data > 0) {
        this.achievements = true
      }
      if (data > 2) {
        this.stats = true
      }
      if (data > 4) {
        this.inventory = true
        this.progressions = true
      }
      if (data > 6) {
        this.boss = true
      }
      if (data > 8) {
        this.shmoke = true
      }
    })
    EventBus.$on('send-modal', (data) => {
      console.log('model time')
      this.modalContent = data
      this.toggleModal()
    })
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    },
  },
}
</script>

<style>
body {
  /* background-image: url('assets/backgrounds/'this.); */
  background-repeat: repeat;
  background-size: 100%;
}
</style>
