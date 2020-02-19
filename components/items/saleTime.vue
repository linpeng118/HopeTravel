<template>
  <div class="com-sale-time" :style="{height:height + 'px'}">
    <div class="img" @click="chakerer">
      <img :src="item.image" alt="">
    </div>
    <div class="count-down-time">
      <van-count-down :time="item.special_end_date">
        <template v-slot="timeData">
          <template v-if="timeData.days > 0">
            <div class="item">{{ timeData.days }}</div>
            <span>天</span>
          </template>
          <div class="item">{{ timeData.hours | getTwo }}</div><span>:</span>
          <div class="item">{{ timeData.minutes | getTwo}}</div><span>:</span>
          <div class="item">{{ timeData.seconds | getTwo}}</div>
        </template>
      </van-count-down>
    </div>
    <div class="cp-detail">
      <div class="title" :class="title == 1 ? 'one': 'two'">{{item.name}}</div>
      <div class="price-main">
        <div class="price-text">
          <span>{{(item.special_price || item.default_price) | getPrice}}</span> 起
        </div>
        <span>
          已减{{item.reduced_price}}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "saleTime",
  filters:{
    getPrice(value) {
      return value.toString().split('.')[0]
    },
    getTwo(value) {
      return value > 10 ? value : '0' + value
    }
  },
  props:{
    height: {
      type: Number,
      default: 90
    },
    title:{
      type: Number,
      default: 1
    },
    item:{
      type:Object,
      default: null
    }
  },
  data() {
    return {
      timeData: {}
    }
  },
  methods:{
    onChange(e) {
      console.log(2342354123, e)
      // this.timeData = e.detail
    },
    chakerer(){
      alert('msg')
    }
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
.com-sale-time{
  border-radius:8px;
  overflow: hidden;
  position: relative;
  margin-bottom: 18px;
  font-size: 24px;
  &::before{
    content: '';
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background:rgba(0,0,0,0.2);
    position: absolute;
  }
  .img, img{
    width: 100%;
    height: 100%;
  }
  .count-down-time{
    position:absolute;
    left: 10px;
    top: 10px;
    width: 100%;
    span{
      color: #fff;
    }
  }
  .item {
    display: inline-block;
    width: 36px;
    height: 32px;
    line-height: 32px;
    margin-right: 5px;
    color: #00ABF9;
    text-align: center;
    background-color: #fff;
    border-radius: 2px;
  }
  .cp-detail{
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #fff;
    .title{
      padding: 0 16px;
      line-height: 30px;
      overflow: hidden;
      margin-bottom: 10px;
      &.one{
        height: 28px;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      &.two{
        line-height: 30px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
    .price-main{
      .price-text{
        display: inline-block;
        height:52px;
        border-radius:0px 12px 0 8px;
        background:rgba(255,81,61,0.8);
        padding: 0 20px;
        line-height: 52px;
        span{
          font-size:36px;
        }
      }
    }
  }
}
</style>