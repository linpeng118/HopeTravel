
<template>
  <vue-waterfall-easy v-if="imgsArr&&imgsArr.length&&imgsArr.length>0" :imgsArr="imgsArr" :scrollLoadImg="getData"></vue-waterfall-easy>
</template>
<script>
  import vueWaterfallEasy from 'vue-waterfall-easy'
  import {getimgs} from '@/api/tour'
  export default {
    name: 'app',
    components: {
      vueWaterfallEasy
    },

    data() {
      return {
        imgsArr: [],
      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      async getData() {
        let {code, data} = await getimgs()
        console.log(data)
        if (code === 0) {
          let obj = data.items
          let arr = []
          for(let i=0;i<obj.length;i++){
            arr.push({src:obj[i].image,href:"www.baidu.com"})
          }
          this.imgsArr=this.imgsArr.concat(arr)
          console.log(arr)
        }
      },
      clickFn(event, { index, value }) {
        // event.preventDefault()
        if (event.target.tagName.toLowerCase() == 'img') {
          console.log('img clicked', index, value)
        }
      },
      onClickLeft() {
        this.$router.go(-1)
      },
    },

  }
</script>
<style>
  .vue-waterfall-easy{
    position: fixed!important;
  }
</style>




