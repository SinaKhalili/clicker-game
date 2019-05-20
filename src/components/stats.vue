<template>
  <div class="fl pa3 ma2 b--solid bg-red shadow-5 db pa3">
    <h3>Stats</h3>
    <table v-for="(att, name) in allStats" :key="att">
      <tr>
        <td>
          <h2>{{ name }} -></h2>
        </td>
        <td class="f1">{{ att }}</td>
      </tr>
    </table>
    <VuexplosiveModal
      :visible="showModal"
      title=" 🔥 Ethan unlocked! 🔥 "
      :content="modalContent"
      footer="<button> Equip </button>"
    ></VuexplosiveModal>
  </div>
</template>

<script>
import VuexplosiveModal from './VuexplosiveModal'

import eventBus from '../eventBus'
import { setTimeout, setInterval } from 'timers'
export default {
  mounted() {
    eventBus.$on('think-click', data => {
      this.think += 1
    })
    eventBus.$on('game-tick', data => {
      this.think =
        this.think - this.subtractor > 0 ? this.think - this.subtractor : 0
    })
    eventBus.$on('send-modal', data => {
      this.modalContent = data
      this.toggleModal()
    })
    setInterval(() => {
      eventBus.$emit('game-tick')
    }, 500)
  },
  data() {
    return {
      think: 0,
      cool: 1,
      money: 20,
      arefs: 69,
      subtractor: 0.05,
      showModal: false,
      modalContent: '<h1> Spinny hat ethan </h1> <p> +12 😎',
      clickThresholds: [10, 50, 100, 250, 500, 1000, 2000, 3500]
    }
  },
  computed: {
    allStats() {
      let a = this.cool
      let b = this.think
      let c = this.money
      let d = this.arefs
      return {
        cool: `${a} 😎`,
        think: `${b.toFixed(2)} 🤔`,
        money: `${c} 💰`,
        energy: `${d} 🍆`
      }
    }
  },
  components: {
    VuexplosiveModal
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    }
  }
}
</script>

<style>
</style>
