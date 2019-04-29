<template>
  <div class="fl ma2 tc b--solid bg-light-red shadow-5 db pa3">
    <h3>Progressions</h3>
    <a class="pointer" v-for="item in avail" :key="item.name">
      <article
        @click="buy(item.name)"
        class="mw5 link grow black center bg-white br3 mv3 ba b--black-10"
      >
        <div class="tc">
          <h1 class="f4">{{ item.name }}</h1>
          <hr class="mw3 bb bw1 b--black-10">
        </div>
        <p class="lh-copy measure center f6 black-70">{{ item.desc}}</p>
        <blockquote>{{ item.effect }}</blockquote>
        <p class="tl pl2 code">Cost : {{ item.price}} {{item.unit}}</p>
      </article>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avail: [
        {
          name: 'Semester schedule',
          desc: 'Oh dude, do we have any classes?',
          effect: ' + 0.01 🤔 per second',
          price: 45,
          unit: `🤔`
        },
        {
          name: 'Spinny hat',
          desc: 'Suslando was sick!',
          effect: ' +12 😎',
          price: 400,
          unit: `🤔`
        }
      ]
    }
  },
  methods: {
    buy(a) {
      console.log(a)
    }
  }
}
</script>

<style>
</style>
