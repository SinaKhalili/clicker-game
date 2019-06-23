<template>
  <div class="fl ma2 tc b--solid bg-light-yellow shadow-5 db pa3">
    <h2>Achievements 🏆</h2>
    <hr class="mw3 bb bw1 b--black-10">
    <ul class="list pl0 ml0 tl mw5 ba b--black br0">
      <li
        v-for="achievement in recentAchievements"
        :key="achievement.name"
        class="pointer grow ph3 pv2 bb b--black"
        @click="viewAchievementStats(achievement)"
      >
        <div class="dib w-90">{{ achievement.name }}</div>
        <div class="dib f3 w-10">{{ achievement.grade }}</div>
      </li>
    </ul>
    <a @click="viewAchievements()" href="#" class="tl">{{showAchievements}}</a>
  </div>
</template>

<script>
import eventBus from '../eventBus'
export default {
  mounted() {
    eventBus.$on('achievement-unlocked', data => {
      for (let i = 0; i < this.locked_achievements.length; i++) {
        if (this.locked_achievements[i].name === data) {
          this.unlocked_achievements.push(this.locked_achievements[i])
          this.locked_achievements.splice(i, 1)
          this.$toasted.global.achievement(data)
        }
      }
    })
  },
  data() {
    return {
      viewAllAchievements: false,
      unlocked_achievements: [
        {
          name: 'Achievement unlocked',
          grade: '🥉',
          desc: 'Achievement unclocked when unlocking an achievement'
        },
        {
          name: 'Please add sans undertale',
          grade: '🥉',
          desc: 'Unlocked when defeating SANS undertale'
        },
        {
          name: 'Call me sonicfox9k',
          grade: '🥉',
          desc: 'Unlocked when defeating sub-zero'
        },
        {
          name: 'We only smoke quads',
          grade: '🥉',
          desc: 'Unlocked when seshin a quadro'
        },
        {
          name: 'Not even a platformer',
          grade: '🥉',
          desc: 'Unlocked when being lazy and making an idle clicker game'
        },
        {
          name: 'Lookin ass',
          grade: '🥉',
          desc: 'Unlocked when eating ahs'
        }
      ],
      locked_achievements: [
        {
          name: 'Organized af',
          grade: '🥉',
          desc: 'Unlocked after acquiring the semester schedule'
        }
      ]
    }
  },
  computed: {
    showAchievements() {
      return this.viewAllAchievements ? 'show less' : 'show all...'
    },
    recentAchievements() {
      return this.viewAllAchievements
        ? this.unlocked_achievements
        : this.unlocked_achievements.slice(0, 2)
    }
  },
  methods: {
    viewAchievements() {
      this.viewAllAchievements = !this.viewAllAchievements
    },
    viewAchievementStats(a) {
      this.$modal.show('dialog', {
        title: `<h1> Achievement: ${a.name} </h1>`,
        text: `<p class="f4">  Grade : ${a.grade} </p>
               <p class="f4">  <em> ${a.desc} </em> </p>`,
        buttons: [
          {
            title: 'Close'
          }
        ]
      })
    }
  }
}
</script>

<style>
</style>
