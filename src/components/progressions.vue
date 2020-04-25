<template>
  <div class="fl ma2 tc b--solid bg-light-red shadow-5 db pa3">
    <h3>Progressions 👇</h3>
    <a class="pointer" v-for="item in avail" :key="item.name">
      <article
        @click="buy(item)"
        class="unselectable mw5 link grow black center bg-white br3 mv3 ba b--black-10"
      >
        <div class="tc">
          <h1 class="f4 pa1">{{ item.name }}</h1>
          <hr class="mw3 bb bw1 b--black-10" />
        </div>
        <p class="lh-copy measure center f6 black-70">{{ item.desc }}</p>
        <blockquote>{{ item.effect }}</blockquote>
        <p class="tl pl2 code">Cost : {{ item.price }} {{ item.unit }}</p>
      </article>
    </a>
  </div>
</template>

<script>
import eventBus from '../eventBus'
export default {
  mounted() {
    eventBus.$on('item-bought', data => {
      for (let i = 0; i < this.avail.length; i++) {
        if (this.avail[i] === data) {
          this.avail[i].owned += 1
          if (this.avail[i].name === 'Mind altering substances') {
            if (this.avail[i].owned === 1) {
              eventBus.$emit('MAS1')
            } else if (this.avail[i].owned === 2) {
              eventBus.$emit('MAS2')
            }
          }
        }
      }
    })
    eventBus.$on('level-up', data => {
      if (data > 6) {
        let newItem = this.notAvail.pop()
        this.avail.unshift(newItem)
        this.$toasted.global.unlock(newItem.name)
      }
    })
  },
  data() {
    return {
      notAvail: [
        {
          name: "Crashing ethan's computer",
          desc: 'I cant believe that happened lmao',
          effect: ' Pop twice for instant crash ',
          price: 1337420,
          unit: `🤔`,
          owned: 0,
          clickAdders: '0',
          clickMultipliers: '0.0',
          tickFlux: 0.0,
          image: 'pc_crash.png',
          run: a => {
            if (a.owned === 1) {
              eventBus.$emit('ethan-unlocked', 'INFINITE ETHAN')
            }
          }
        },
        {
          name: 'Mind altering substances',
          desc: 'Destroy your notion of notions',
          effect: ' Pop twice for instant Enlightenment ',
          price: 133769,
          unit: `🤔`,
          owned: 0,
          clickAdders: '0',
          clickMultipliers: '0.0',
          tickFlux: 0.0,
          image: 'substance.gif',
          run: a => {
            if (a.owned === 1) {
              eventBus.$emit('ethan-unlocked', 'INFINITE ETHAN')
            }
          }
        },
        {
          name: 'Essential oil diffuser ',
          desc: 'Truly a healthy and scientifically backed activity',
          effect: ' Increase max energy by 30',
          price: 200,
          unit: `🤔`,
          owned: 0,
          clickAdders: '0.00',
          clickMultipliers: '0.0',
          tickFlux: 0.0,
          image: 'oil.png',
          run: a => {
            eventBus.$emit('upgrade-energy', 30)
          }
        },
        {
          name: 'Sous vide machine',
          desc: 'I bought it on kickstarter',
          effect: ' + 0.05 🤔 per click',
          price: 50,
          unit: `🤔`,
          owned: 0,
          clickAdders: '0.01',
          clickMultipliers: '0.0',
          tickFlux: 0.0,
          image: 'sous_vide.png',
          run: a => {
            if (a.owned === 10) {
              eventBus.$emit('achievement-unlocked', 'Bottom empty')
            }
          }
        },
        {
          name: 'Survival Kit',
          desc: 'Just got a new knife guys',
          effect: ' + 0.01 Player attack! ',
          price: 200,
          unit: `🤔`,
          owned: 0,
          clickAdders: '0.01',
          clickMultipliers: '0.0',
          tickFlux: 0.0,
          image: 'sous_vide.png',
          run: a => {
            eventBus.$emit('attack-upgrade', 0.01)
            if (a.owned === 10) {
              eventBus.$emit('ethan-unlocked', 'artona ethan')
            }
            if (a.owned === 500) {
              eventBus.$emit('achievement-unlocked', 'Ill cut you')
            }
          }
        },
        {
          name: 'Flex jeans',
          desc: 'Do you do parkour?',
          effect: ' + 0.03 🤔 per second',
          price: 13,
          unit: `🤔`,
          owned: 0,
          clickAdders: '0',
          clickMultipliers: '0.0',
          tickFlux: 0.03,
          image: 'flex_jeans.jpg',
          run: a => {
            if (a.owned === 10) {
              eventBus.$emit('achievement-unlocked', 'CraNezy Canadian Clicker')
            }
          }
        }
      ],
      avail: [
        {
          name: 'High school class schedule',
          desc: 'Oh dude, do we have any classes?',
          effect: ' + 0.01 🤔 per second',
          price: 5,
          unit: `🤔`,
          owned: 0,
          clickAdders: '0',
          clickMultipliers: '0.0',
          tickFlux: 0.01,
          image: 'class_schedule.png',
          run: a => {
            if (a.owned === 10) {
              eventBus.$emit('achievement-unlocked', 'Organized af')
            }
          }
        },
        {
          name: 'Spinny hat',
          desc: 'That trip was sick!',
          effect:
            ' Will unlock the suslando ethan after a certain amount of buys',
          price: 7,
          unit: `🤔`,
          owned: 0,
          run: a => {
            if (a.owned === 10) {
              eventBus.$emit('ethan-unlocked', 'suslando ethan')
            }
          }
        }
      ],
      units: {
        '🤔': 'think',
        '💰': 'money',
        '😎': 'cool'
      },
      stats: {
        think: 0,
        cool: 1,
        money: 20,
        energy: 69
      }
    }
  },
  methods: {
    buy(a) {
      eventBus.$emit('buy-item', a)
    }
  }
}
</script>

<style></style>
