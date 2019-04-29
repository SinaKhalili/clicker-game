<template>
  <div class="fl ma2 tc b--solid bg-light-red shadow-5 dib pa3">
    <h3 class="helvetica">Ethan Level : {{ ethanLevel }}</h3>
    <p class="helvetica">{{ ethanQuotes[3]}}</p>
    <h1 class="code">{{ cummulativeThink }}</h1>
    <div class="db mb1">
      <button class="bg-light-blue f2 helvetica" @click="clickThink">Think 🤔</button>
    </div>
    <img class="mw5" :src="getImageUrl()">
    <p>Current Ethan:</p>
    <div class="tl code" v-for="entry in ethanstats" :key="entry.name">
      <p>Name : {{ entry.name }}</p>
      <p>Rarity : {{ entry.rarity }}</p>
      <p>Boosters : {{ entry.boosters }}</p>
      <p>Description : {{ entry.description }}</p>
    </div>
  </div>
</template>

<script>
import EventBus from '../eventBus'
export default {
  methods: {
    clickThink() {
      let clickVal = 1 * this.clickMultipliers + this.clickAdders
      EventBus.$emit('think-click', { thinks: clickVal })
    },
    getPic() {
      return this.ethanPics[1]
    },
    getImageUrl() {
      return require('../assets/' + this.currPic)
    }
  },
  mounted() {
    EventBus.$on('game-tick', () => {
      /* Pass */
    })
    EventBus.$on('think-click', data => {
      this.cummulativeThink += data.thinks
      /* Pass */
    })
  },
  data() {
    return {
      clickMultipliers: 1,
      clickAdders: 0,
      ethanLevel: 0,
      ethanQuotes: [
        'Um, I mean, yea',
        "Listen, traps aren't gay. The US army ... ",
        '*shakes hands*',
        '  *shakes hands, grabs elbow* ',
        ' Yeah dude, I saw a reddit post about it '
      ],
      ethanPics: [
        'cow_cyrus.jpg',
        'ethan_artona.jpg',
        'ethan_beedie.jpg',
        'dabbing_ethan.jpg'
      ],
      currPic: 'cow_cyrus.jpg',
      cummulativeThink: 0,
      ethanstats: [
        {
          name: 'cow cyrus',
          rarity: 'shiny',
          boosters: ' +15 🤔 per click, energy 🍆 costs 50% lower',
          description: 'To this day, only a few have been found in the wild'
        }
      ]
    }
  }
}
</script>

<style>
</style>
