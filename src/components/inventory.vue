<template>
  <div class="fl pa3 ma2 b--solid bg-washed-red shadow-5 db pa3">
    <h2>Inventory 🎒</h2>
    <h4>Ethans (click for stats and equip) :</h4>
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
    <h4>Items (click for info) :</h4>
    <ul class="list pl0 ml0 center mw5 ba b--light-silver br3">
      <li
        v-for="item in items"
        :key="item.name"
        class="pointer grow ph3 pv2 bb b--light-silver"
        @click="viewStats(item)"
      >
        <div class="badge1" :data-badge=" ` ${item.owned} `">{{ item.name }}</div>
      </li>
    </ul>
    <a @click="viewItems()" href="#" class="top-0 right-0">{{showItems}}</a>
  </div>
</template>

<script>
import eventBus from '../eventBus'
export default {
  mounted() {
    eventBus.$on('item-bought', data => {
      if (!this.items.includes(data)) {
        this.items.push(data)
      }
    })
  },
  data() {
    return {
      ethans: ['beginning ethan', 'l337 ethan', 'GoodCalc ethan', 'cow cyrus'],
      viewAllEthans: false,
      items: [],
      viewAllItems: false
    }
  },
  computed: {
    recentEthans() {
      return this.viewAllEthans ? this.ethans : this.ethans.slice(0, 2)
    },
    showEthans() {
      return this.viewAllEthans ? 'show less ethans' : 'show all ethans...'
    },
    recentItems() {
      return this.viewAllItems ? this.items : this.items.slice(0, 2)
    },
    showItems() {
      return this.viewAllItems ? 'show less items' : 'show all items...'
    }
  },
  methods: {
    viewEthans() {
      this.viewAllEthans = !this.viewAllEthans
    },
    viewItems() {
      this.viewAllItems = !this.viewAllItems
    },
    viewStats(a) {
      console.log(a)
    }
  }
}
</script>

<style>
.badge1 {
  position: relative;
}
.badge1[data-badge]:after {
  content: attr(data-badge);
  position: absolute;
  right: 1px;
  background: red;
  color: white;
  text-align: center;
  line-height: 18px;
  border-radius: 50%;
  box-shadow: 0 0 1px #333;
}
</style>
