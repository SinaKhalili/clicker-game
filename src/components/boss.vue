<template>
  <div class="fl ma2 tc b--solid bg-light-green shadow-5 db pa3">
    <h2>⚔️ Battle! ⚔️</h2>
    <h1>{{ current_enemy.name }}</h1>
    <h3>Attack : {{ current_enemy.damage_per_tick }}</h3>

    <!-- enemy image -->
    <img class="f1 unselectable grow" @click="attackEnemy" :src="getImageUrl()" />

    <!-- enemy health (number and health bar) -->
    <p>Health : {{ current_enemy.current_health.toFixed(2) }} / {{ current_enemy.max_health }}</p>
    <!-- bag health -->
    <div id="enemy-health">
      <div :style="{ width: health_bar_width + '%' }"></div>
    </div>

    <button v-show="current_enemy.dead" class="pointer" @click="current_enemy.loot">LOOT</button>
    <button v-show="current_enemy.dead" class="pointer red" @click="next_battle">Begin Next Battle</button>
  </div>
</template>

<script>
import eventBus from '../eventBus'

export default {
  mounted() {
    eventBus.$on('game-tick', data => {
      if (this.active && !this.current_enemy.dead) {
        eventBus.$emit('enemy-attack', this.current_enemy)
      }
    })
    eventBus.$on('attack-upgrade', data => {
      this.player_attack += data
    })
  },
  data() {
    return {
      all_enemies: [
        {
          max_health: 40,
          current_health: 40,
          name: 'horny mushroom',
          damage_per_tick: 1,
          image: 'horny_mushroom.png',
          death_image: 'horny_mushroom_dead.png',
          dead: false,
          reward: '1000 think',
          run: () => {
            eventBus.$emit('achievement-unlocked', '🍁 Royal')
            this.$modal.show('dialog', {
              title: `<h1> Enemy defeated! </h1>`,
              text: `You are glorious
                    <p> To collect your winnings click the loot button </p>
                    <b> NOTE </b> remember to heal and shit for the next battle next battle!`,
              buttons: [
                {
                  title: 'Ok cool, also your tutorial is shit'
                }
              ]
            })
          },
          loot: () => {
            if (!this.looted) {
              this.$toasted.global.loot(' + 100 think ')
              eventBus.$emit('think-click', { thinks: 100 })
            } else {
              this.$toasted.global.loot(' ❌ Already looted ❌')
            }
            this.looted = true
          }
        },
        {
          name: 'Sanic',
          max_health: 40,
          current_health: 40,
          damage_per_tick: 1,
          image: 'sanic.png',
          death_image: 'sanic_dead.png',
          dead: false,
          reward: '200 think',
          run: () => {
            alert('gotta go fast')
          },
          loot: () => {
            if (!this.looted) {
              this.$toasted.global.loot(' + 200 think ')
              eventBus.$emit('think-click', { thinks: 200 })
            } else {
              this.$toasted.global.loot(' ❌ Already looted ❌')
            }
            this.looted = true
          }
        },
        {
          name: 'Light TURNER',
          max_health: 60,
          current_health: 60,
          damage_per_tick: 2.5,
          image: 'light_turner.png',
          death_image: 'light_turner_dead.png',
          dead: false,
          reward: '200 think',
          run: () => {
            eventBus.$emit(
              'achievement-unlocked',
              'I take this chip and I eat it'
            )
          },
          loot: () => {
            if (!this.looted) {
              this.$toasted.global.loot(' + 200 think ')
              eventBus.$emit('think-click', { thinks: 200 })
            } else {
              this.$toasted.global.loot(' ❌ Already looted ❌')
            }
            this.looted = true
          }
        },
        {
          name: '10 Devin Pal',
          max_health: 60,
          current_health: 60,
          damage_per_tick: 2.5,
          image: '10_dp.png',
          death_image: '10_dp.png',
          dead: false,
          reward: '200 think',
          run: () => {
            console.log('holy shit thats a lot of devins')
          },
          loot: () => {
            if (!this.looted) {
              this.$toasted.global.loot(' + 240 think ')
              eventBus.$emit('think-click', { thinks: 240 })
            } else {
              this.$toasted.global.loot(' ❌ Already looted ❌')
            }
            this.looted = true
          }
        },
        {
          name: '9 DP Fiji',
          max_health: 60,
          current_health: 60,
          damage_per_tick: 2.5,
          image: '9_dp.png',
          death_image: '9_dp.png',
          dead: false,
          reward: '200 think',
          run: () => {
            console.log('holy shit thats a lot of devins')
          },
          loot: () => {
            if (!this.looted) {
              this.$toasted.global.loot(' + 240 think ')
              eventBus.$emit('think-click', { thinks: 240 })
            } else {
              this.$toasted.global.loot(' ❌ Already looted ❌')
            }
            this.looted = true
          }
        },
        {
          name: '8 Dphijian',
          max_health: 60,
          current_health: 60,
          damage_per_tick: 2.5,
          image: '8_dp.png',
          death_image: '8_dp.png',
          dead: false,
          reward: '200 think',
          run: () => {
            console.log('holy shit thats a lot of devins')
          },
          loot: () => {
            if (!this.looted) {
              this.$toasted.global.loot(' + 240 think ')
              eventBus.$emit('think-click', { thinks: 240 })
            } else {
              this.$toasted.global.loot(' ❌ Already looted ❌')
            }
            this.looted = true
          }
        },
        {
          name: "7 JD's brother",
          max_health: 60,
          current_health: 60,
          damage_per_tick: 2.5,
          image: '7_dp.png',
          death_image: '7_dp.png',
          dead: false,
          reward: '200 think',
          run: () => {
            console.log('holy shit thats a lot of devins')
          },
          loot: () => {
            if (!this.looted) {
              this.$toasted.global.loot(' + 240 think ')
              eventBus.$emit('think-click', { thinks: 240 })
            } else {
              this.$toasted.global.loot(' ❌ Already looted ❌')
            }
            this.looted = true
          }
        },
        {
          name: '6 DRP323',
          max_health: 60,
          current_health: 60,
          damage_per_tick: 2.5,
          image: '6_dp.png',
          death_image: '6_dp.png',
          dead: false,
          reward: '200 think',
          run: () => {
            console.log('holy shit thats a lot of devins')
          },
          loot: () => {
            if (!this.looted) {
              this.$toasted.global.loot(' + 240 think ')
              eventBus.$emit('think-click', { thinks: 240 })
            } else {
              this.$toasted.global.loot(' ❌ Already looted ❌')
            }
            this.looted = true
          }
        },
        {
          name: '5 The Black Hercules',
          max_health: 60,
          current_health: 60,
          damage_per_tick: 2.5,
          image: '5_dp.png',
          death_image: '5_dp.png',
          dead: false,
          reward: '200 think',
          run: () => {
            console.log('holy shit thats a lot of devins')
          },
          loot: () => {
            if (!this.looted) {
              this.$toasted.global.loot(' + 240 think ')
              eventBus.$emit('think-click', { thinks: 240 })
            } else {
              this.$toasted.global.loot(' ❌ Already looted ❌')
            }
            this.looted = true
          }
        },
        {
          name: "4 Darren's cousin",
          max_health: 70,
          current_health: 70,
          damage_per_tick: 2.5,
          image: '4_dp.png',
          death_image: '4_dp.png',
          dead: false,
          reward: '200 think',
          run: () => {
            console.log('holy shit thats a lot of devins')
          },
          loot: () => {
            if (!this.looted) {
              this.$toasted.global.loot(' + 240 think ')
              eventBus.$emit('think-click', { thinks: 240 })
            } else {
              this.$toasted.global.loot(' ❌ Already looted ❌')
            }
            this.looted = true
          }
        },
        {
          name: "3 Angie's brother",
          max_health: 80,
          current_health: 80,
          damage_per_tick: 2.5,
          image: '3_dp.png',
          death_image: '3_dp.png',
          dead: false,
          reward: '200 think',
          run: () => {
            console.log('holy shit thats a lot of devins')
          },
          loot: () => {
            if (!this.looted) {
              this.$toasted.global.loot(' + You found an ethan! ')
              eventBus.$emit('ethan-unlocked', 'mae ethan')
            } else {
              this.$toasted.global.loot(' ❌ Already looted ❌')
            }
            this.looted = true
          }
        },
        {
          name: '2 DRP232',
          max_health: 90,
          current_health: 90,
          damage_per_tick: 2.5,
          image: '2_dp.png',
          death_image: '2_dp.png',
          dead: false,
          reward: '200 think',
          run: () => {
            console.log('holy shit thats a lot of devins')
          },
          loot: () => {
            if (!this.looted) {
              this.$toasted.global.loot(' + 240 think ')
              eventBus.$emit('think-click', { thinks: 240 })
            } else {
              this.$toasted.global.loot(' ❌ Already looted ❌')
            }
            this.looted = true
          }
        },
        {
          name: 'Darren Reddy',
          max_health: 60,
          current_health: 60,
          damage_per_tick: 2.5,
          image: 'darren_reddy.png',
          death_image: 'darren_reddy.png',
          dead: false,
          reward: '500 think',
          run: () => {
            eventBus.$emit('achievement-unlocked', 'Top ten anything ever')
          },
          loot: () => {
            if (!this.looted) {
              this.$toasted.global.loot(' + You found an ethan! ')
              eventBus.$emit('ethan-unlocked', 'cow cyrus')
            } else {
              this.$toasted.global.loot(' ❌ Already looted ❌')
            }
            this.looted = true
          }
        },
        {
          name: 'Me',
          max_health: 200,
          current_health: 200,
          damage_per_tick: 3,
          image: 'me.png',
          death_image: 'me.png',
          dead: false,
          reward: '500 think',
          run: () => {
            eventBus.$emit('achievement-unlocked', 'Biting the hand that codes')
          },
          loot: () => {
            if (!this.looted) {
              this.$toasted.global.loot(' + 500 think ')
              eventBus.$emit('think-click', { thinks: 5000 })
            } else {
              this.$toasted.global.loot(' ❌ Already looted ❌')
            }
            this.looted = true
          }
        },
        {
          name: 'Mr Natas',
          max_health: 250,
          current_health: 250,
          damage_per_tick: 3.5,
          image: 'me.png',
          death_image: 'me.png',
          dead: false,
          reward: '500 think',
          run: () => {
            eventBus.$emit('achievement-unlocked', 'Biting the hand that codes')
          },
          loot: () => {
            if (!this.looted) {
              this.$toasted.global.loot(' + 20000 think ')
              this.$toasted.global.loot(' + A NEW ETHAN ')
              eventBus.$emit('think-click', { thinks: 20000 })
              eventBus.$emit('ethan-unlocked', 'quarantine ethan')
            } else {
              this.$toasted.global.loot(' ❌ Already looted ❌')
            }
            this.looted = true
          }
        },
        {
          name: 'Age 21 as a concept',
          max_health: 1000,
          current_health: 1000,
          damage_per_tick: 4,
          image: 'me.png',
          death_image: '21.png',
          dead: false,
          reward: '500 think',
          run: () => {
            eventBus.$emit('win')
          },
          loot: () => {
            if (!this.looted) {
              this.$toasted.global.loot(' + 20000 think ')
              eventBus.$emit('think-click', { thinks: 20000 })
            } else {
              this.$toasted.global.loot(' ❌ Already looted ❌')
            }
            this.looted = true
          }
        }
      ],
      active: true,
      player_attack: 1,
      enemy_level: 0,
      looted: false
    }
  },
  computed: {
    health_bar_width() {
      return (
        (this.current_enemy.current_health / this.current_enemy.max_health) *
        100
      )
    },
    current_enemy() {
      return this.all_enemies[this.enemy_level]
    }
  },
  methods: {
    getImageUrl() {
      if (this.current_enemy.dead) {
        return require('../assets/enemies/' + this.current_enemy.death_image)
      }
      return require('../assets/enemies/' + this.current_enemy.image)
    },
    attackEnemy() {
      if (this.current_enemy.current_health - this.player_attack <= 0) {
        this.current_enemy.current_health = 0
        this.current_enemy.dead = true
        this.current_enemy.run()
      } else {
        this.current_enemy.current_health -= this.player_attack
      }
    },
    next_battle() {
      if (this.enemy_level == 1) {
        this.$modal.show('dialog', {
          title: 'Are you sure? The next battle is hard',
          text:
            'I reccommend being at least level 10 and healing. If you are level 10, ignore this',
          buttons: [
            {
              title:
                "Do you know who you're talking to idiot? This is a speedrun, get out of my way!",
              handler: () => {
                this.enemy_level += 1
                this.looted = false
              }
            },
            {
              title: 'Ok thanks for the heads up'
            }
          ]
        })
      } else {
        this.enemy_level += 1
        this.looted = false
      }
    }
  }
}
</script>

<style>
img {
  height: auto;
  width: auto;
  max-width: 200px;
  max-height: 300px;
}
#enemy-health {
  width: 200px;
  border: 2px solid #000;
  margin: 0 auto 20px auto;
}

#enemy-health div {
  height: 20px;
  background: crimson;
}
button {
  background-color: rgb(255, 237, 104); /* Green */
  border: none;
  color: rgb(0, 0, 0);
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
button:hover {
  background-color: #ff8c00; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
