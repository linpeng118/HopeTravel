<template>
  <div class="img-sg-b" :class="isSelfBg ? `bg-${index+1}`:''" @click="changePage">
    <img v-if="!isSelfBg" :src="imgObj.image" />
    <p class="name" :style="stylePosition">{{imgObj.name || imgObj.hot_title}}</p>
    <em v-if="imgObj.is_hot"></em>
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
    isSelfBg:{
      type: Boolean,
      default: false
    },
    index:{
      type: Number,
      default: -1
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
  },
  methods:{
    changePage(){
      this.$emit('gotoPage', this.imgObj)
    }
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
.img-sg-b{
  position: relative;
  height:160px;
  width: 100%;
  border-radius:44px;
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #ddd;
  &.bg{
    &-1{
      background-image: url('../../assets/imgs/cityHome/point_bg_1.png')
    }
    &-2{
      background-image: url('../../assets/imgs/cityHome/point_bg_2.png')
    }
    &-3{
      background-image: url('../../assets/imgs/cityHome/point_bg_3.png')
    }
    &-4{
      background-image: url('../../assets/imgs/cityHome/point_bg_4.png')
    }
    &-5{
      background-image: url('../../assets/imgs/cityHome/point_bg_5.png')
    }
    &-6{
      background-image: url('../../assets/imgs/cityHome/point_bg_6.png')
    }
  }
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