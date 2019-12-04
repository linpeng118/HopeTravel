<template>
  <div class="sale-box-mp" @click="changePage">
    <div class="img-m">
      <img :src="productObj.image" alt="">
      <div class="time" v-html="productObj.time">
        <!-- <span>32</span>天<span>05</span>:<span>13</span>:<span>55</span> -->
      </div>
      <div class="price-f-b">
        <span class="sell-p"><b>{{productObj | getPrice}}</b>起</span>
        <span>已减{{productObj | specialPrice}}</span>
      </div>
    </div>
    <div class="name-p">
      {{productObj.name}}
    </div>
  </div>
</template>
<script>
export default {
  filters:{
    getPrice(value){
      return (value.special_price || value.default_price).toString().split('.')[0]
    },
    specialPrice(value){
      let fh = value.default_price.substring(0, 1)
      let dp = value.default_price.substring(1).replace(/,/g, '')
      let sp = value.special_price.substring(1).replace(/,/g, '')
      return fh + parseInt(dp - sp)
    }
  },
  props:{
    productObj:{
      type: Object,
      default: null
    }
  },
  methods:{
    changePage(){
      this.$router.push(`/product/detail?productId=${this.productObj.product_id}`)
    }
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
.sale-box-mp{
  margin-bottom: 10px;
  .img-m{
    position: relative;
    height: 250px;
    margin-bottom: 10px;
    overflow: hidden;
    &::before{
      content: '';
      position: absolute;
      width: 100%;
      height: 130px;
      background:linear-gradient(180deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.3) 50%,rgba(0,0,0,0) 100%);
      border-radius: 32px 32px 0 0;
    }
    img{
      width:100%;
      height: 100%;
      border-radius: 32px;
    }
  }
  .price-f-b{
    height:46px;
    background-color: #FFC72C;
    color: #fff;
    font-size:24px;
    line-height: 46px;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    border-radius:0px 0px 28px 28px;
    padding: 0 20px;
    text-align: right;
    b{
      font-weight:bold;
      line-height:64px;
      font-size:32px;
      margin-right: 6px;
    }
    .sell-p{
      position: absolute;
      bottom: 0;
      height:64px;
      left: 0;
      background:#FF2C2C;
      border-radius:0px 28px 28px 28px;
      padding:0 14px;
      text-align: left;
    }
  }
  .name-p{
    height:80px;
    font-size:28px;
    font-weight:bold;
    line-height:40px;
    color:#2D2D2D;
    overflow: hidden;
  }
}
</style>
<style type="text/scss" lang="scss">
.sale-box-mp .time{
  position: absolute;
  top:16px;
  left: 16px;
  right:0;
  font-size: 24px;
  color: #fff;
  span{
    font-size: 24px;
    display: inline-block;
    height:34px;
    line-height: 34px;
    background: #fff;
    border-radius: 12px;
    padding:0 6px;
    color: #333;
  }
}
</style>