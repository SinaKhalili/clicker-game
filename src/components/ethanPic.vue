<template>
  <div class="fl ma2 tc b--solid bg-light-red shadow-5 dib pa3">
    <v-dialog/>
    <h3 class="helvetica">Ethan Level : {{ ethanLevel }}</h3>
    <blockquote class="athelas mw5 ml0 mt0 pl4 black-90 bl bw2 b--blue">{{ ethanQuotes[1]}}</blockquote>
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
      <p>Effect : {{ currEthan.effect }}</p>
      <p>Description : {{ currEthan.desc }}</p>
    </div>
    <h3 class="code">Accrued thought: {{ cummulativeThink }}</h3>
  </div>
</template>

<script>
import EventBus from '../eventBus'
import VuexplosiveModal from './VuexplosiveModal'

export default {
  methods: {
    clickThink() {
      let clickVal = 1 * this.clickMultipliers + this.clickAdders
      clickVal = clickVal * this.ethanClickMultipliers + this.ethanClickAdder
      EventBus.$emit('think-click', { thinks: clickVal })
    },
    getPic() {
      return this.ethanPics[1]
    },
    getImageUrl() {
      return require('../assets/ethans/' + this.currEthan.image)
    }
  },
  mounted() {
    this.$modal.show('dialog', {
      title: "Let's play a game...",
      text:
        "And I know your favourite genre, that's right, it's an idle clicker game.",
      buttons: [
        {
          title: 'IAMDISSAPOINT',
          handler: () => {
            alert(
              "fair - but listen, it does have some pretty solid references AND it's really overdone.\
               It might just be the most ethan game of all time."
            )
          }
        },
        {
          title: "Let's see what ya got, boy"
        }
      ]
    }),
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
      }),
      EventBus.$on('ethan-change', data => {
        this.currEthan = data
      })
    EventBus.$on('think-click', data => {
      this.cummulativeThink += data.thinks
    }),
      EventBus.$on('item-bought', data => {
        //pass
        this.clickMultipliers += parseFloat(data.clickMultipliers)
          ? parseFloat(data.clickMultipliers)
          : 0
        this.clickAdders += parseFloat(data.clickAdders)
          ? parseFloat(data.clickAdders)
          : 0
        this.tickFlux += data.tickFlux ? data.tickFlux : 0
      }),
      setInterval(() => {
        EventBus.$emit('game-tick', { tickFlux: this.tickFlux })
      }, 500)
  },
  data() {
    return {
      clickMultipliers: 1,
      clickAdders: 0,
      tickFlux: -0.05,
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
      cummulativeThink: 0,
      currEthan: {
        name: 'cow cyrus',
        rarity: 'shiny',
        effect: ' +15 🤔 per click, energy 🍆 costs 50% lower',
        desc: 'To this day, very few have been found in the wild',
        adder: 15,
        multiplier: 1,
        image: 'cow_cyrus.jpg'
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
      clickThresholds: [100, 250, 500, 1000, 2000, 3500],
      showModal: false,
      modalContent: ' One think closer'
    }
  },
  components: {
    VuexplosiveModal
  },
  computed: {
    ethanLevel() {
      return this.levels.filter(num => num < this.cummulativeThink).length
    },
    ethanClickMultipliers() {
      return this.currEthan.multiplier
    },
    ethanClickAdder() {
      return this.currEthan.adder
    }
  }
}
</script>

<style>
</style>
