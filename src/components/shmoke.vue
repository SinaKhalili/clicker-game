<template>
<div id='s' class="fl ma2 tc b--solid bg-green shadow-5 db pa3"> 
        <h2>🌲 SHMOKE up FELLA 🌲 </h2>
        <img class="snoop pointer grow" @click="shmoke_weed"  :src = getimageUrl() />
</div>

</template>


<script>
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
              title: `<h1> SHMOKING GANJA BIG BOI , ENJOY A 20 🍆 BOOST </h1>`,
              buttons:[{
                  title: "puff puff 🅱A🅱Y"
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
        getimageUrl() {
            return require('../assets/items/tenor.gif')
        },
        shmoke_weed() {
            this.shmoke[0].run()
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
        transition: background-image  1s  ease-in-out;
    }
    #s:hover{
        background-image: url('../assets/items/smoke.gif');
    }
    .snoop{
        height:auto;
        width:auto;
        max-height:300px;
        max-width: 400px;
        opacity:1;

    }
/*     
    img:hover{ 
        animation-name: pulse_animation;
        animation-duration: 800ms;
        transform-origin: 70% 70%;
        animation-iteration-count:infinite;
        animation-timing-function: ease-in-out;
    }
     */

</style>
