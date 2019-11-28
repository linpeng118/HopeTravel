<template>
  <div class="new-prd-l">
    <div class="img-m">
      <img src="http://assets.tourscool.com/uploads/inn/2019/05/23/952/PvOp8X5Y_G5b2k-VsGiw39o7SEA.jpg" alt="">
      <div class="start-c">东京出发•跟团游</div>
      <div class="rate">5.0分</div>
    </div>
    <div class="name-p">
      东京+日光私家团•鬼怒川温泉一泊+日光东照宫+...
    </div>
    <div class="tag-p-s">
      <span v-for="n in 2" :key="n">第二人半价</span>
    </div>
    <div class="price-b"> 
      <span class="p-j">￥15246</span>起 99人去过
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style type="text/scss" lang="scss" scoped>
  .new-prd-l{
    margin-bottom: 30px;
    .img-m{
      height: 334px;
      position: relative;
      border-radius:16px; 
      overflow: hidden;
      margin-bottom: 10px;
      img{
        width: 100%;
        height: 100%;
      }
      .start-c{
        height: 52px;
        position: absolute;
        top: 0;
        color: #fff;
        background-color: rgba(0,0,0,0.5);
        font-size:24px;    
        line-height: 52px;    
        padding: 0 16px;          
        border-radius: 0 0 16px 0;          
      }
      .rate{
        position: absolute;
        right: 8px;
        bottom: 8px;
        border-radius: 16px 0 16px 16px;
        width: 88px;
        height: 38px;
        line-break: 38px;
        text-align: center;
        color: #FFB300;
        background-color: rgba(0,0,0,0.5);
        font-size:24px;
      }
    }
    .name-p{
      font-size:28px;
      font-weight:bold;
      line-height:40px;
      color:#2D2D2D;
      overflow: hidden;
    }
    .tag-p-s{
      margin: 10px 0;
      display: flex;
      span{
        height:36px;
        line-height: 36px;
        padding: 0 10px;
        color: #00ABF9;
        background-color: #DCF4FF;
        border-radius:8px;
        font-size:20px;
        margin-right: 8px;
      }
    }
    .price-b{
      margin: 10px 0;
      font-size:24px;
      line-height:34px;
      color: #AEAEAE;
      span.p-j{
        color: #F55E2F;
        font-size:32px;
        font-weight:bold;
        line-height: 44px;
        margin-right: 8px;
      } 
    }
  }
</style>