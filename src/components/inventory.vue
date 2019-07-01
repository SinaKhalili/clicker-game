<template>
  <div class="fl pa3 ma2 b--solid bg-washed-red shadow-5 db pa3">
    <h2>Inventory 🎒</h2>
    <h4>Ethans (click for stats and equip) :</h4>
    <ul class="list pl0 ml0 center mw5 ba b--light-silver br3">
      <li
        v-for="item in recentEthans"
        :key="item.name"
        class="pointer grow ph3 pv2 bb b--light-silver"
        @click="viewEthanStats(item)"
      >
        <div>{{ item.name }}</div>
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
      if (data.achievement) {
        eventBus.$emit('achievement-unlocked', data.achievement)
      }
      if (data.run) {
        data.run(data)
      }
    })
  },
  data() {
    return {
      ethans: [
        {
          name: 'cow cyrus',
          rarity: 'shiny',
          effect: ' +15 🤔 per click, energy 🍆 costs 50% lower',
          desc: 'To this day, very few have been found in the wild',
          image: 'cow_cyrus.jpg',
          adder: 15,
          multiplier: 1
        },
        {
          name: 'dabbing ethan',
          rarity: 'shiny + ',
          effect: ' +5 🤔 per click',
          desc:
            'This very cool ethan will dab on every hater before finishing them off swiftly in a game of fortnite',
          image: 'dabbing_ethan.jpg',
          adder: 5,
          multiplier: 1
        }
      ],
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
      this.$modal.show('dialog', {
        title: `<h1> Item: ${a.name} </h1>`,
        text: `<img src=${a.image ? require('../assets/items/' + a.image) : ''}>
               <p class="f4"> "${a.desc}" </p>
               <p class="f5"> Effect: ${a.effect} </p>
               <p class="f5"> Owned: ${a.owned} </p>`,
        buttons: [
          {
            title: 'Close'
          }
        ]
      })
    },
    equipEthan(ethan) {
      eventBus.$emit('ethan-change', ethan)
    },
    viewEthanStats(a) {
      this.$modal.show('dialog', {
        title: `<h1> Ethan: ${a.name} </h1>`,
        text: `<img src=${
          a.image ? require('../assets/ethans/' + a.image) : ''
        } class="mw5">
               <p class="f4"> "${a.desc}" </p>
               <p class="f5"> Rarity: <em> ${a.rarity} </em> </p>
               <p class="f5"> Effect: ${a.effect} </p>`,
        buttons: [
          {
            title: '🔽 <b> Equip </b> ',
            handler: () => {
              this.equipEthan(a)
            }
          },
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
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
