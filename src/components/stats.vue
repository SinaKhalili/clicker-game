<template>
  <div class="fl pa3 ma2 b--solid bg-red shadow-5 db pa3">
    <h3>Stats</h3>
    <table v-for="(att, name) in allStats" :key="att" class=".striped--light-silver:nth-child(odd)">
      <tr>
        <td>
          <h2>{{ name }} -></h2>
        </td>
        <td class="f1">{{ att }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
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
    setInterval(() => {
      eventBus.$emit('game-tick')
    }, 500)
  },
  data() {
    return {
      think: 4,
      cool: 1,
      money: 20,
      arefs: 69,
      subtractor: 0.05
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
  }
}
</script>

<style>
</style>
