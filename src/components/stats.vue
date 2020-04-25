<template>
  <div class="fl pa3 ma2 b--solid bg-red shadow-5 db pa3">
    <h3>Stats</h3>
    <table v-for="(att, name) in allStats" :key="att.disp">
      <tr>
        <td>
          <h2>{{ name }} -></h2>
        </td>
        <td :class="att.cls">{{ att.disp }}</td>
      </tr>
    </table>
    <div>MAX energy: {{ this.max_energy }}</div>
    <div v-show="lowHealth">
      <p>WARNING : LOW HEALTH</p>
      <p>- try to level up or heal first!</p>
    </div>
  </div>
</template>

<script>
import eventBus from '../eventBus'
import { setTimeout, setInterval } from 'timers'
export default {
  mounted() {
    eventBus.$on('enemy-attack', data => {
      if (this.energy - data.damage_per_tick > 0) {
        this.energy -= data.damage_per_tick
      } else {
        this.energy = 0
      }
    })
    eventBus.$on('think-click', data => {
      this.think += data.thinks
    })

    eventBus.$on('big-kush-energy', data => {
      if (this.energy + data > this.max_energy) {
        this.energy = this.max_energy
      } else {
        this.energy += data
      }
    })
    eventBus.$on('upgrade-energy', data => {
      this.max_energy += data
    })
    eventBus.$on('game-tick', data => {
      // Store previous context

      if (this.energy == 0) {
        eventBus.$emit('game-over')
      }
      if (this.think == 0) {
        if (data.tickFlux < 0) {
          this.energy += data.tickFlux
        } else {
          this.energe -= 1
        }
      }

      this.think =
        this.think + data.tickFlux > 0 ? this.think + data.tickFlux : 0
      // Check for differences
      this.coolClass = this.prev_cool == this.cool ? 'f1 pulse' : 'f1 pulse'
      this.thinkClass = this.prev_think == this.think ? 'f1 pulse' : 'f1 pulse'
      this.moneyClass = this.prev_money == this.money ? 'f1 pulse' : 'f1 pulse'
      this.energyClass =
        this.prev_energy == this.energy ? 'f1 pulse' : 'f1 pulse'

      this.prev_think = this.think
      this.prev_cool = this.cool
      this.prev_money = this.money
      this.prev_energy = this.energy
    })
    eventBus.$on('buy-item', data => {
      let unit = this.units[data.unit]
      if (this[unit] - data.price >= 0) {
        this[unit] -= data.price
        eventBus.$emit('item-bought', data)
        //success
      } else {
        this.unit += data.price
        this.$toasted.global.broke('&nbsp; 😏💩 ')
        eventBus.$emit('not-enough')
        //fail
      }
    })
  },
  data() {
    return {
      toggleThink: 'grow',
      coolClass: 'f1',
      thinkClass: 'f1',
      moneyClass: 'f1',
      energyClass: 'f1',
      think: 0,
      cool: 0,
      money: 0,
      energy: 69,
      max_energy: 69,
      prev_think: 0,
      prev_cool: 1,
      prev_money: 20,
      prev_energy: 69,
      clickThresholds: [10, 50, 100, 250, 500, 1000, 2000, 3500],
      units: {
        '🤔': 'think',
        '💰': 'money',
        '😎': 'cool'
      }
    }
  },
  computed: {
    allStats() {
      let a = this.cool
      let b = this.think
      let c = this.money
      let d = this.energy
      return {
        cool: {
          disp: `${a} 😎`,
          cls: this.coolClass
        },
        think: {
          disp: `${b.toFixed(2)} 🤔`,
          cls: this.thinkClass
        },
        money: {
          disp: `${c} 💰`,
          cls: this.moneyClass
        },
        energy: {
          disp: `${d.toFixed(2)} 🍆`,
          cls: this.energyClass
        }
      }
    },
    lowHealth() {
      return this.energy < 10
    }
  },
  methods: {
    toggleThinkGrow() {
      this.toggleThink = this.toggleThink == 'grow' ? ' ' : 'grow'
    }
  }
}
</script>

<style>
@keyframes pulse_animation {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1);
  }
  35% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1.05);
  }
}

.pulse {
  animation-name: pulse_animation;
  animation-duration: 400ms;
  transform-origin: 70% 70%;
  animation-iteration-count: 1;
  animation-timing-function: linear;
}
</style>
