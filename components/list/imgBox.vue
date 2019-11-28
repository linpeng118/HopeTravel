<template>
  <div class="img-sg-b">
    <img src="http://assets.tourscool.com/uploads/inn/2019/05/23/952/PvOp8X5Y_G5b2k-VsGiw39o7SEA.jpg" />
    <p class="name" :style="stylePosition">7月富士音乐</p>
    <em v-if="isHot"></em>
  </div>
</template>
<script>
export default {
  props:{
    imgObj: {
      type: Object,
      default: null
    },
    position:{
      type: String,
      default: 'center'
    },
    isHot: {
      type: Boolean,
      default: false
    }
  },
  computed:{
    stylePosition(){
      let value = '', key = '', transform = ''
      if(this.position === 'center'){
        value = '50%'
        key = 'top'
      } else if(this.position === 'bottom') {
        value = '14px'
        key = 'bottom'
        transform = 'translate(0, 0)'
      }
      return {
        [key]: value,
        transform
      }
    }
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
.img-sg-b{
  position: relative;
  img{
    width: 100%;
    height:160px;
    border-radius:44px;
  }
  p.name{
    width: 100%;
    position: absolute;
    font-size:28px;
    font-weight:bold;
    line-height:40px;
    color:#fff;
    padding:0 20px;
    transform: translate(0, -50%);
    overflow: hidden;
  }
  em{
    width: 52px;
    height: 32px;
    position: absolute;
    top: -10px;
    right: 0;
    display: inline-block;
    background: url('../../assets/imgs/cityHome/hot_icon@2x.png') no-repeat;
    background-size: cover;
  }
}
</style>