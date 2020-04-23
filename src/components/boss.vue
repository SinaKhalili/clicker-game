<template>
  <div class="fl ma2 tc b--solid bg-light-green shadow-5 db pa3">
    <h2>⚔️ Battle! ⚔️</h2>
    <h1>{{ current_enemy.name }}</h1>

    <!-- enemy image -->
    <img class="f1 unselectable grow" @click="attackEnemy" :src="getImageUrl()" />

    <!-- enemy health (number and health bar) -->
    <p>Health : {{ current_enemy.current_health }} / {{ current_enemy.max_health }}</p>
    <!-- bag health -->
    <div id="enemy-health">
      <div :style="{ width: health_bar_width + '%' }"></div>
    </div>

    <button v-show="current_enemy.dead" class="pointer">LOOT</button>
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
          reward: '1500 think',
          run: () => {
            alert('gotta go fast')
          }
        },
        {
          name: 'kirby with feet'
        },
        {
          name: 'Light TURNER'
        },
        // all devins + darren
        // the old one-2
        {
          name: 'Ultimate Ethan'
        },
        {
          name: "Me and I'm litterally allowed to cheat"
          // Macbeth narrator picture
        },
        {
          name: 'Truth'
        },
        {
          name: 'Ryô Asuka (Satan)'
        },
        {
          name: 'Mr. Natas'
        },
        {
          name: 'A queer furry'
        },
        {
          name: 'Tiger'
        },
        {
          name: 'Fangblade'
        },
        {
          name: 'SANS UNDERTALE'
        }
      ],
      active: true,
      player_attack: 1,
      enemy_level: 0
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
      this.enemy_level += 1
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
