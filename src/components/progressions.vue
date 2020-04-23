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
        }
      }
    })
  },
  data() {
    return {
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
          desc: 'Suslando was sick!',
          effect: ' +12 😎',
          price: 4,
          unit: `🤔`,
          owned: 0,
          run: a => {
            if (a.owned === 50) {
              eventBus.$emit('ethan-unlocked', 'SUSLANDO ETHAN JSON OBJECT')
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
