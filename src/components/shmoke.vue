<template>
<div id='s' class="fl ma2 tc b--solid bg-light-green shadow-5 db pa3"> 
        <h2>🌲 SHMOKE up FELLA 🌲 </h2>
        <img class="snoop" @click="shmoke_weed"  :src = getimageUrl() />
</div>     

</template>


<script>
import { METHODS } from 'http';
import eventBus from '../eventBus';
export default {
    data(){
        return {
            shmoking: [
                {
            shmoked:true, 
            name:"shmokie",
            run: () => {
                eventBus.$emit('achievement-unlocked' , 'We only smoke quads')
                eventBus.$emit('big-kush-energy')
                this.$modal.show('dialog', {
              title: `<h1> SHMOKING GANJA BIG BOI , ENJOY A 30 🍆 BOOST </h1>`,
              buttons:[{
                  title: "puff puff 🅱IGGA"
              }]
                }) 
            }
                }
            ]
        }
    },
    computed:{
        shmoke(){
           return this.shmoking
        }
    },
    methods:{
        getsoundUrl(){
            return require('../assets/items/shmoke.mp3');
        },
        getimageUrl() {
            return require('../assets/items/tenor.gif')
        },

        shmoke_weed() {
            this.shmoke[0].run()
            var smoke_screem = document.getElementsByClassName('toking')
            var shmokie = document.getElementsByClassName('swed')
            var promise = shmokie[0].play();

            if (promise !== undefined) {
                    promise.then(function() {
                    // Automatic playback started!
                }).catch(function(error) {
                    console.log(error)
            });
          }
        }
    }

    
}
</script>

<style scoped>
    h2{
        font-size: 20px;
    }
    #s{
        height: 450px;
        width: 300px;

    }
    .snoop{
        height:auto;
        width:auto;
        max-height:300px;
        max-width: 400px;

    }
    
    img:hover{ 
        animation-name: pulse_animation;
        animation-duration: 800ms;
        transform-origin: 70% 70%;
        animation-iteration-count:infinite;
        animation-timing-function: ease-in-out;
    }
    

</style>
