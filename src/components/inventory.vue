<template>
  <div class="fl pa3 ma2 b--solid bg-washed-red shadow-5 db pa3">
    <h2>Inventory 🎒</h2>
    <h4>recent Ethans (click for stats and equip) :</h4>
    <ul class="list pl0 ml0 center mw5 ba b--light-silver br3">
      <li
        v-for="item in recentEthans"
        :key="item"
        class="pointer grow ph3 pv2 bb b--light-silver"
        @click="viewStats(item)"
      >
        <div>{{ item }}</div>
      </li>
    </ul>
    <a @click="viewEthans()" href="#" class="top-0 right-0">{{showEthans}}</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ethans: ['beginning ethan', 'l337 ethan', 'GoodCalc ethan', 'cow cyrus'],
      viewAllEthans: false
    }
  },
  computed: {
    recentEthans() {
      return this.viewAllEthans ? this.ethans : this.ethans.slice(0, 2)
    },
    showEthans() {
      return this.viewAllEthans ? 'show less ethans' : 'show all ethans...'
    }
  },
  methods: {
    viewEthans() {
      this.viewAllEthans = !this.viewAllEthans
    },
    viewStats(a) {
      console.log(a)
    }
  }
}
</script>

<style>
</style>
