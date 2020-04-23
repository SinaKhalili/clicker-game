<template>
  <div id="app" v-bind:style="{ backgroundImage: curr_bg }">
    <ethan-pic />
    <achievements v-if="achievements" />
    <stats v-show="stats" />
    <inventory v-if="inventory" />
    <progressions v-if="progressions" />
    <boss v-if="boss" />
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
      if (data > 0 && !this.achievements) {
        this.achievements = true

        this.explainAchievements()
      }
      if (data > 1) {
        EventBus.$emit(
          'achievement-unlocked',
          'Clickety clackety this is my property'
        )
        EventBus.$emit('achievement-unlocked', 'Achievement unlocked')
      }
      if (data > 2 && !this.stats) {
        this.stats = true
        this.explainStats()
      }
      if (data > 4) {
        this.inventory = true
        this.progressions = true
        this.explainInventory()
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
    explainAchievements() {
      this.$modal.show('dialog', {
        title: 'Menu unlocked! - Achievements',
        text: `The more you play, the more stuff you unlock (yea I spent a lot of time this lol)
          You just unlocked the ability to get achievements! These are pretty self-explanatory.`,
        buttons: [
          {
            title: 'Cool',
          },
        ],
      })
    },
    explainStats() {
      this.$modal.show('dialog', {
        title: 'Menu unlocked! - Stats',
        text: `Ok these are pretty substantial.
        </br>
        Think (🤔)- is the <strong>ultimate</strong> unit of this game (and also some would argue life?)
        </br>
        </br>
        For every second you are alive, you pay some price in think.
        </br>
        </br>
        Once your think runs out, you start losing energy (🍆)
        </br>
        </br>
        IF YOU LOSE all of your energy, you lose the game.
        Restart from scratch. Do not pass go, do not collect 200 dollars.
        </br>
        </br>
        However your "accrued thought" never goes down, and that is what determines level, which is the goal of the game -
        well acutally the goal of the game is super ethan simulation, but this is close enough.
        </br>
        Money and cool can be discovered by the player (this message is already super long and you've been losing think this whole time)
        `,
        buttons: [
          {
            title: 'Cool',
          },
        ],
      })
    },
    explainInventory() {
      this.$modal.show('dialog', {
        title: 'Menus(menues?) unlocked! - Inventory and Progressions',
        text: `Inventory is what you have, you can view how many you have or interact with items.
        </br>
        </br>
        Progressions are things you can buy! Some things you can buy many times
        (despite not making sense to buy that thing multiple times in real life)
        also despite what you may have thought "money" was, you actually buy them
        in think or sometimes cool
        </br>
        </br>
        `,
        buttons: [
          {
            title: 'Aight',
          },
        ],
      })
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
