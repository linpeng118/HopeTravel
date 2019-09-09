
<template>
  <div>
    <section>
      <van-nav-bar class="login-header tours-no-bb"
                   ref="loginHeader"
                   title="景区相册"
                   @click-left="onClickLeft">
        <van-icon class="left-wrap"
                  name="arrow-left"
                  slot="left" />
      </van-nav-bar>
    </section>
    <div class="pagebox">

      <div class="title">
        <span style="color:#4DC02A" v-if="type=='all'" >全部{{objData.all_total}}</span>
        <span @click="type='all'" v-else >全部{{objData.all_total}}</span>
        <span style="color:#4DC02A" v-if="type=='photo'" ><img src="../../assets/imgs/tour/active-img.png" alt="">{{objData.image_total}}</span>
        <span v-else @click="type='photo'" ><img src="../../assets/imgs/tour/imgcion.png" alt="">{{objData.image_total}}</span>
        <span style="color:#4DC02A" v-if="type=='video'" > <img src="../../assets/imgs/tour/active-video.png" alt="">{{objData.video_total}}</span>
        <span v-else @click="type='video'"><img src="../../assets/imgs/tour/videoicon.png" alt="">{{objData.video_total}}</span>
      </div>
      <waterfall-easy :over22="over" v-if="imgsArr&&imgsArr.length&&imgsArr.length>0" :loadi="loadi" :imgsArr="imgsArr" @scrollReachBottom="((obj)=>getData(obj))"></waterfall-easy>
    </div>
  </div>



</template>
<script>
  import WaterfallEasy from '../../plugins/waterfall-easy/vue-waterfall-easy'
  import {getimgs} from '@/api/tour'
  export default {
    name: 'app',
    components: {
      WaterfallEasy
    },
    data() {
      return {
        imgsArr: [],
        page:1,
        objData:{},
        type:'all',
        over:false,
        loadi:false
      }
    },
    watch: {
      'type':function(newV, oldV) {
        if (newV) {
          this.page=1
          this.over=false
          this.getData()
        }
      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      async getData(type) {
        if(this.over){
          return false
        }
        let {code, data} = await getimgs({
          id:this.$route.query.tourId || '',
          type:this.type,
          page:this.page
        })
        if(type){
          this.objData=[]
        }
        if (code === 0) {
          let obj = data.items
          let arr = []
          for(let i=0;i<obj.length;i++){
            arr.push({src:obj[i].image,type:obj[i].type,video:obj[i].video})
          }
          if(type){
            this.objData.concat(arr);
            this.imgsArr=this.imgsArr.concat(arr)
          }
          else{
            this.objData=data;
            this.imgsArr=arr
          }
          this.page=parseInt(data.pagination.page)
          this.over=(parseInt(data.pagination.total_page)-parseInt(data.pagination.page)>0)?false:true
        }
      },
      onClickLeft() {
        this.$router.go(-1)
      },
    },

  }
</script>
<style>yarn
  body{
    overflow: scroll!important;
    position: relative!important;
  }
</style>
<style scoped>
  .title{
    font-size: 32px;
    line-height: 48px;
    color: #9E9E9E;
    padding: 30px 0;

  }
  .pagebox{
    background-color: #F3F3F3;
  }
  .title img{
    width: 48px;
    height: 48px;
    position: relative;
    top: 10px;

  }
  .title span{
    padding-right: 20px;
  }
  .pagebox{
    padding-left: 10px;
  }
</style>




