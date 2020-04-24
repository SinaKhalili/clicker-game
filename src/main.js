import Vue from 'vue'
import Toasted from 'vue-toasted'
import vmodal from 'vue-js-modal'
import App from './App.vue'

// Importing the global css file
import '@/assets/global.css'

Vue.config.productionTip = false
Vue.use(vmodal, { dialog: true })
Vue.use(Toasted)
Vue.toasted.register(
  'achievement',
  payload => {
    return '<h3> 🏆 Achievement Unlocked!  🏆 &nbsp;&nbsp; </h3> ' + payload
  },
  {
    type: 'info',
    theme: 'outline',
    position: 'top-right',
    action: {
      text: 'Close',
      onClick: (e, toastObject) => {
        toastObject.goAway(0)
      }
    }
  }
)
Vue.toasted.register(
  'broke',
  payload => {
    return 'Ur too broke kid' + payload
  },
  {
    type: 'error',
    theme: 'outline',
    position: 'top-right',
    duration: '450',
    action: {
      text: 'Close',
      onClick: (e, toastObject) => {
        toastObject.goAway(0)
      }
    }
  }
)
Vue.toasted.register(
  'unlock',
  payload => {
    return '🗝 New Unlock! ' + payload
  },
  {
    type: 'success',
    theme: 'outline',
    position: 'top-right',
    action: {
      text: 'Close',
      onClick: (e, toastObject) => {
        toastObject.goAway(0)
      }
    }
  }
)
Vue.toasted.register(
  'loot',
  payload => {
    return '⚰ LOOT ⚰ ' + payload
  },
  {
    type: 'success',
    theme: 'outline',
    position: 'top-right',
    action: {
      text: 'Close',
      onClick: (e, toastObject) => {
        toastObject.goAway(0)
      }
    }
  }
)
new Vue({
  render: h => h(App)
}).$mount('#app')
