<template>
  <div id="app" v-bind:style="{ backgroundImage: curr_bg }">
    <div v-if="gameover" class="fl pa3 ma2 b--solid bg-red shadow-5 db pa3">
      <h1>GAME OVER FRIEND. REFRESH THE PAGE AND TRY AGAIN.</h1>
    </div>
    <div v-if="win" class="fl pa3 ma2 b--solid bg-blue shadow-5 db pa3">
      <h1>A HERO IS YOU.</h1>
      <ul class="list pl0 ml0 tl mw5 ba b--black br0">
        <li v-for="t in endRunStats" :key="t.name" class="ph3 pv2 bb b--black">
          <div>{{ t.name }}</div>
          <div>{{ t.time }}</div>
        </li>
      </ul>
      <h3>
        YOU DID IT. YOU'RE OFFICIALLY 22 (or whatever age you actually are when
        playing this). YOU also beat this dumb clicker game, but that's
        unrelated.
      </h3>
      <h1>SPECIALTHANKS : PARSA HABIBI FOR THE SHMOKING VUE 🙏🙏</h1>
      <h1>
        The source code is
        <a href="https://github.com/SinaKhalili/clicker-game">here</a> which you
        (ethan) have already starred on github lol
      </h1>
      <h4>
        Thanks to aref, jamal, and cyrus for the ideas when I ran this game by
        them.
      </h4>
      <p>Feel free to keep playing to get all the achievements and ethans</p>
    </div>
    <ethan-pic />
    <stats v-show="stats" />
    <boss v-if="boss" />
    <inventory v-if="inventory" />
    <progressions v-if="progressions" />
    <achievements v-if="achievements" />
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
      beginTime: 0,
      invTime: 0,
      hornTime: 0,
      moustacheTime: 0,
      smokeTime: 0,
      maxLevelTime: 0,
      mrNatasTime: 0,
      MAS1: 0,
      MAS2: 0,
      finalTime: 0,
      herculesTime: 0,
      achievements: false,
      stats: false,
      progressions: false,
      inventory: false,
      achievements: false,
      boss: false,
      shmoke: false,
      showModal: false,
      gameover: false,
      win: false,
      eth1: false, // ethan unlock for leveling
      eth2: false, // ethan unlock for leveling
      modalContent: '',
      bgs: ['trippy.gif', 'vapor_walk.gif', 'vapor.gif'],
      curr_bg: 'trippy.gif',
    }
  },
  mounted() {
    this.beginTime = Date.now()
    EventBus.$on('hercules-killed', () => {
      this.herculesTime = Date.now() - this.beginTime
    })
    EventBus.$on('MAS2', () => {
      this.MAS2 = Date.now() - this.beginTime
    })
    EventBus.$on('MAS1', () => {
      this.MAS1 = Date.now() - this.beginTime
    })
    EventBus.$on('horny-killed', () => {
      this.hornTime = Date.now() - this.beginTime
    })
    EventBus.$on('natas-killed', () => {
      this.mrNatasTime = Date.now() - this.beginTime
    })
    EventBus.$on('max-level', () => {
      this.maxLevelTime = Date.now() - this.beginTime
    })
    EventBus.$on('level-up', (data) => {
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
          this.invTime = Date.now() - this.beginTime
          this.inventory = true
          this.progressions = true
          this.explainInventory()
        }
        if (data > 5 && !this.eth1) {
          this.moustacheTime = Date.now() - this.beginTime
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
          this.smokeTime = Date.now() - this.beginTime
          this.shmoke = true
          this.explainShmoking()
        }
      }
    })
    EventBus.$on('send-modal', (data) => {
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
      this.finalTime = Date.now() - this.beginTime
      this.win = true
    })
  },
  computed: {
    endRunStats() {
      let endTemp = [
        { name: 'inventory', time: this.invTime },
        { name: 'moustache unlocked', time: this.moustacheTime },
        { name: 'horny mushroom defeated', time: this.hornTime },
        { name: 'hercules defeated', time: this.herculesTime },
        { name: 'max level reached', time: this.maxLevelTime },
        { name: 'MAS1', time: this.MAS1 },
        { name: 'MAS2', time: this.MAS2 },
        { name: 'FINAL TIME', time: this.finalTime },
      ]
      return endTemp.map(this.timeToString)
    },
  },
  methods: {
    timeToString(inputTime) {
      let d = new Date(inputTime.time)
      return {
        name: inputTime.name,
        time:
          d.getUTCHours() +
          ':' +
          d.getUTCMinutes() +
          ':' +
          d.getUTCSeconds() +
          ':' +
          d.getUTCMilliseconds(),
      }
    },
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
            title: 'Cool',
          },
        ],
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
            title: 'Cool',
          },
        ],
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
            title: 'Aight',
          },
        ],
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
            title: 'Aight',
          },
        ],
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
