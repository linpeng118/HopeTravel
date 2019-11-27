<template>
  <div class="sale-box-mp">
    <div class="img-m">
      <img src="http://assets.tourscool.com/uploads/inn/2019/05/23/952/PvOp8X5Y_G5b2k-VsGiw39o7SEA.jpg" alt="">
      <div class="time">
      </div>
      <div class="price-f-b">
        <span class="sell-p"><b>￥2519</b>起</span>
        <span>已减￥888</span>
      </div>
    </div>
    <div class="name-p">
      东京+日光私家团•鬼怒川温泉一泊+日光东照宫+...
    </div>
  </div>
</template>
<script>
export default {
  props:{
    productObj:{
      type: Object,
      default: null
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
      border-radius: 32px;
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