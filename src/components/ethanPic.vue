<template>
  <div class="fl ma2 tc b--solid bg-light-red shadow-5 dib pa3">
    <v-dialog />
    <h3 v-if="checkpoint0" class="helvetica">Ethan Level : {{ currLevel }}</h3>
    <blockquote
      v-if="checkpoint0"
      class="athelas mw5 ml0 mt0 pl4 black-90 bl bw2 b--blue"
    >
      {{ ethanQuotes[currQuote] }}
    </blockquote>
    <div class="db mb1">
      <a
        class="f1 unselectable grow no-underline br-pill ph3 pv2 mb2 dib white bg-white"
        @click="clickThink"
        href="#0"
        >🤔</a
      >
    </div>
    <img v-if="checkpoint1" class="mw5" :src="getImageUrl()" />
    <p v-if="checkpoint1">Current Ethan:</p>
    <div v-if="checkpoint1" class="tl code mw5">
      <p>Name : {{ currEthan.name }}</p>
      <p>Rarity : {{ currEthan.rarity }}</p>
      <p>Effect : {{ currEthan.effect }}</p>
      <p>Description : {{ currEthan.desc }}</p>
    </div>
    <h3 class="code" v-if="accruedShow">
      Accrued thought: {{ cummulativeThink.toFixed(1) }}
    </h3>
    <h3 class="code" v-if="accruedShow">
      Next level at: {{ this.clickThresholds[this.currLevel] }}
    </h3>
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
    getImageUrl() {
      return require('../assets/ethans/' + this.currEthan.image)
    },
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
              `fair - but listen, it does have some pretty solid references you can think of it as art if you want.`
            )
          },
        },
        {
          title: "Let's see what ya got, boy",
        },
      ],
    })
    EventBus.$on('game-tick', () => {
      if (this.currLevel < this.clickThresholds.length - 1) {
        if (this.cummulativeThink >= this.clickThresholds[this.currLevel]) {
          EventBus.$emit('level-up', this.currLevel)
          EventBus.$emit(
            'send-modal',
            `<h1> Level up! </h1> <p> congrats on ${
              this.clickThresholds[this.currLevel]
            } clicks! </p>`
          )
          this.currLevel += 1
          if (this.currLevel === this.clickThresholds.length - 1) {
            EventBus.$emit('max-level')
          }
        }
      } else {
        this.currLevel = this.clickThresholds[this.clickThresholds.length - 1]
      }
    })
    EventBus.$on('ethan-change', (data) => {
      this.currEthan = data
      if (this.currEthan.name === 'INFINITE ETHAN') {
        EventBus.$emit('final-boss-unlock')
      }
      this.currQuote = Math.floor(Math.random() * this.ethanQuotes.length)
    })
    EventBus.$on('think-click', (data) => {
      this.cummulativeThink += data.thinks
    })
    EventBus.$on('item-bought', (data) => {
      //pass
      this.clickMultipliers += parseFloat(data.clickMultipliers)
        ? parseFloat(data.clickMultipliers)
        : 0
      this.clickAdders += parseFloat(data.clickAdders)
        ? parseFloat(data.clickAdders)
        : 0
      this.tickFlux += data.tickFlux ? data.tickFlux : 0
    })
    setInterval(() => {
      EventBus.$emit('game-tick', { tickFlux: this.tickFlux })
    }, 500)
  },
  data() {
    return {
      clickMultipliers: 0,
      clickAdders: 1,
      tickFlux: -0.05,
      currQuote: 0,
      ethanQuotes: [
        'Um, I mean, yea',
        "Listen, traps aren't gay. The US army ... ",
        '*shakes hands*',
        '  *shakes hands, grabs elbow* ',
        ' Yeah dude, I saw a reddit post about it ',
      ],
      cummulativeThink: 0,
      currEthan: {
        name: 'Beedie ethan',
        rarity: 'shiny + ',
        effect: ' None',
        desc: 'Default starter ethan. Neat dude.',
        image: 'ethan_beedie.jpg',
        adder: 1,
        multiplier: 0,
      },
      levels: [
        'MAX LEVEL LEVEL',
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
        50,
      ],
      currLevel: 0,
      clickThresholds: [
        50,
        80,
        150,
        200,
        250,
        500,
        1500,
        2100,
        3500,
        4000,
        6000,
        8500,
        15000,
        20000,
        50000,
        'MAX LEVEL',
      ],
      showModal: false,
      modalContent: ' One think closer',
    }
  },
  components: {
    VuexplosiveModal,
  },
  computed: {
    ethanClickMultipliers() {
      return this.currEthan.multiplier
    },
    ethanClickAdder() {
      return this.currEthan.adder
    },
    checkpoint1() {
      return this.cummulativeThink > 15
    },
    checkpoint0() {
      return this.cummulativeThink > 10
    },
    accruedShow() {
      return this.cummulativeThink > 1
    },
  },
}
</script>

<style></style>
