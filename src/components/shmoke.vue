<template>
  <div id="s" class="fl ma2 tc b--solid bg-green shadow-5 db pa3">
    <h2>🌲 SHMOKE up FELLA 🌲</h2>
    <img class="snoop pointer grow" @click="shmoke_weed" :src="getimageUrl()" />
  </div>
</template>


<script>
import eventBus from '../eventBus'
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      shmoking: {
        shmoked: true,
        name: 'shmokie',
        joints: 0,
        run: () => {
          eventBus.$emit('achievement-unlocked', 'We only smoke quads')
          eventBus.$emit('big-kush-energy')
          this.$modal.show('dialog', {
            title: `<h1> SHMOKING GANJA BIG BOI , ENJOY A 20 🍆 BOOST </h1>`,
            buttons: [
              {
                title: 'puff puff 🅱A🅱Y'
              }
            ]
          })
        }
      }
    }
  },
  computed: {
    shmoke() {
      return this.shmoking
    }
  },
  methods: {
    getsoundUrl() {
      return require('../assets/items/shmoke.mp3')
    },
    getimageUrl() {
      return require('../assets/items/tenor.gif')
    },
    reset_joints() {
      this.shmoke.joints = 0
    },

    shmoke_weed() {
      if (this.shmoke.joints > 4) {
        this.$modal.show('dialog', {
          title: `<h1>😤 SORRY THICKBOI , Youre all out of Js 😤</h1>`,
          buttons: [
            {
              title: 'puff puff 🅱A🅱Y'
            }
          ]
        })
        setTimeout(this.reset_joints, 30000)
      } else {
        this.shmoke.joints += 1
        this.shmoke.run()
      }
    }
  }
}
</script>

<style scoped>
h2 {
  font-size: 20px;
}
#s {
  height: 450px;
  width: 300px;
  transition: background-image 1s ease-in-out;
}
#s:hover {
  background-image: url('../assets/items/smoke.gif');
}
.snoop {
  height: auto;
  width: auto;
  max-height: 300px;
  max-width: 400px;
  opacity: 1;
}
</style>
