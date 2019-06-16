<template>
  <div class="fl ma2 tc b--solid bg-light-red shadow-5 dib pa3">
    <v-dialog/>
    <h3 class="helvetica">Ethan Level : {{ ethanLevel }}</h3>
    <blockquote class="athelas mw5 ml0 mt0 pl4 black-90 bl bw2 b--blue">{{ ethanQuotes[1]}}</blockquote>
    <h1 class="code">{{ cummulativeThink }}</h1>
    <div class="db mb1">
      <a
        class="f1 unselectable grow no-underline br-pill ph3 pv2 mb2 dib white bg-white"
        @click="clickThink"
        href="#0"
      >🤔</a>
    </div>
    <img class="mw5" :src="getImageUrl()">
    <p>Current Ethan:</p>
    <div class="tl code mw5">
      <p>Name : {{ currEthan.name }}</p>
      <p>Rarity : {{ currEthan.rarity }}</p>
      <p>Boosters : {{ currEthan.boosters }}</p>
      <p>Description : {{ currEthan.description }}</p>
    </div>
  </div>
</template>

<script>
import EventBus from '../eventBus'
import VuexplosiveModal from './VuexplosiveModal'

export default {
  methods: {
    clickThink() {
      let clickVal = 1 * this.clickMultipliers + this.clickAdders
      EventBus.$emit('think-click', { thinks: clickVal })
      EventBus.$emit('achievement-unlocked', 'Organized af')
    },
    getPic() {
      return this.ethanPics[1]
    },
    getImageUrl() {
      return require('../assets/' + this.currPic)
    }
  },
  mounted() {
    this.$modal.show('dialog', {
      title: "Let's play a game",
      text: "It's an idle clicker",
      buttons: [
        {
          title: 'Close',
          handler: () => {
            alert('Woot!')
          }
        },
        {
          title: 'Actual close',
          handler: () => {
            alert('Just kidding also woot')
          }
        }
      ]
    })
    EventBus.$on('game-tick', () => {
      for (let num = 0; num < this.clickThresholds.length; num++) {
        if (this.cummulativeThink >= this.clickThresholds[num]) {
          EventBus.$emit(
            'send-modal',
            `<h1> Spinny hat ethan </h1> <p> congrats on ${
              this.clickThresholds[num]
            } clicks! </p>`
          )
          this.clickThresholds.splice(num, 1)
        }
      }
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
      currEthan: {
        name: 'cow cyrus',
        rarity: 'shiny',
        boosters: ' +15 🤔 per click, energy 🍆 costs 50% lower',
        description: 'To this day, very few have been found in the wild'
      },
      levels: [
        1000000,
        500000,
        100000,
        50000,
        21000,
        15000,
        8000,
        2500,
        1000,
        500,
        100,
        50
      ],
      clickThresholds: [50, 100, 250, 500, 1000, 2000, 3500],
      showModal: false,
      modalContent: '<h1> Spinny hat ethan </h1> <p> +12 😎'
    }
  },
  components: {
    VuexplosiveModal
  },
  computed: {
    ethanLevel() {
      return this.levels.filter(num => num < this.cummulativeThink).length
    }
  }
}
</script>

<style>
</style>
