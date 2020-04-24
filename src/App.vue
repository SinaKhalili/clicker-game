<template>
  <div id="app" v-bind:style="{ backgroundImage: curr_bg }">
    <ethan-pic />
    <stats v-show="stats" />
    <boss v-if="boss" />
    <inventory v-if="inventory" />
    <progressions v-if="progressions" />
    <achievements v-if="achievements" />
    <shmoke v-if="shmoke" />

    <div v-if="gameover" class="fl pa3 ma2 b--solid bg-red shadow-5 db pa3">
      <h1>GAME OVER FRIEND. REFRESH THE PAGE AND TRY AGAIN.</h1>
    </div>
    <div v-if="win" class="fl pa3 ma2 b--solid bg-blue shadow-5 db pa3">
      <h1>A HERO IS YOU.</h1>
      <h3>YOU DID IT. YOU'RE OFFICIALLY 21. YOU also beat this dumb clicker game, but that's unrelated.</h3>
      <h2>Happy birthday my dude.</h2>
      <h1>SPECIALTHANKS : PARSA HABIBI FOR THE SHMOKING VUE 🙏🙏</h1>
      <h1>
        The source code is
        <a href="https://github.com/SinaKhalili/clicker-game">here</a> which you (ethan) have already starred on github lol
      </h1>
      <h4>Thanks to aref, jamal, and cyrus for the ideas when I ran this game by them.</h4>
      <p>Feel free to keep playing to get all the achievements and ethans</p>
    </div>
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
    thisFunction() {}
  },
  components: {
    ethanPic,
    stats,
    progressions,
    inventory,
    achievements,
    boss,
    shmoke,
    VuexplosiveModal
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
      gameover: false,
      eth1: false, // ethan unlock for leveling
      eth2: false, // ethan unlock for leveling
      modalContent: '',
      bgs: ['trippy.gif', 'vapor_walk.gif', 'vapor.gif'],
      curr_bg: 'trippy.gif'
    }
  },
  mounted() {
    EventBus.$on('level-up', data => {
      // maybe map this to get rid of these gross if statements?
      if (!this.gameover) {
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
        if (data > 4 && !this.inventory) {
          this.inventory = true
          this.progressions = true
          this.explainInventory()
        }
        if (data > 5 && !this.eth1) {
          EventBus.$emit('ethan-unlocked', 'moustache ethan')
          this.eth1 = true
        }
        if (data > 6 && !this.boss) {
          this.boss = true
          this.explainBoss()
        }
        if (data > 7 && !this.eth2) {
          EventBus.$emit('ethan-unlocked', 'dabbing ethan')
          this.eth2 = true
        }
        if (data > 8 && !this.shmoke) {
          this.shmoke = true
          this.explainShmoking()
        }
      }
    })
    EventBus.$on('send-modal', data => {
      console.log('model time')
      this.modalContent = data
      this.toggleModal()
    })
    EventBus.$on('game-over', () => {
      this.gameover = true
      this.achievements = false
      this.stats = false
      this.progressions = false
      this.inventory = false
      this.achievements = false
      this.boss = false
      this.shmoke = false
      this.showModal = false
      this.win
    })
    EventBus.$on('win', () => {
      this.win = true
    })
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    },
    explainAchievements() {
      alert('nice')
      this.$modal.show('dialog', {
        title: 'Menu unlocked! - Achievements',
        text: `The more you play, the more stuff you unlock (yea I spent a lot of time this lol)
          You just unlocked the ability to get achievements! These are pretty self-explanatory.`,
        buttons: [
          {
            title: 'Cool'
          }
        ]
      })
    },
    explainStats() {
      alert('nice')

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
        Money and cool do literally nothing (also you've been losing think this whole time)
        `,
        buttons: [
          {
            title: 'Cool'
          }
        ]
      })
    },
    explainInventory() {
      alert('nice')

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
            title: 'Aight'
          }
        ]
      })
    },
    explainBoss() {
      alert('nice')

      this.$modal.show('dialog', {
        title: 'Menu unlocked! - Boss Battles!',
        text: `Finally the crux of the game - the battle - the boss battle!
        </br>
        </br>
        When an enemy is alive and active, it will reduce your health every second by its attack points. Your think does not affect the boss.
        </br>
        </br>
        To attack the boss you must click on him. Every click will bring their health down. God speed.
        `,
        buttons: [
          {
            title: 'Aight'
          }
        ]
      })
    },
    explainShmoking() {
      alert('nice')

      this.$modal.show('dialog', {
        title: '(Final) Menu unlocked! - Shmoking!',
        text: `Finally a way to heal! You can only heal to your max hp tho! Also after 4 hits, you have to wait another 30 seconds to heal.
        </br>
        </br>
        Can't roll that fast, yknow.
        </br>
        </br>
        `,
        buttons: [
          {
            title: 'Aight'
          }
        ]
      })
    }
  }
}
</script>

<style>
body {
  /* background-image: url('assets/backgrounds/'this.); */
  background-repeat: repeat;
  background-size: 100%;
}
</style>
