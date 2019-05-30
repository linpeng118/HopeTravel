<template>
  <div class="coupons-wrap">
    <div class="coupon-upper">
      <div :class="typeClassName">
        <div class="price" v-if="item.type !== 'percent'">
          <span class="price-symbol">{{item.minus_label.substring(0,1)}}</span>
          <span class="use-cond">{{item.minus_label.substring(1)}}</span>
        </div>
        <div class="price" v-else>
          <span class="use-cond">{{item.minus_label}}</span>
        </div>
        <p>{{item.full_label}}</p>
      </div>
      <div class="right-info">
        <h1 class="title">{{item.title}}</h1>
        <p>{{item.date_label}}</p>
        <p class="scope" @click="showExplain">使用说明</p>
      </div>
    </div>
    <div class="coupon-lower" :style="{'display': item.isShow ? 'block': 'none'}">
      <p v-for="(rule,index) in item.rules" :key="index">{{index + 1}}、{{rule}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'coupons',
  props:{
    typeOne:{
      type: Boolean,
      default: false
    },
    typeTwo:{
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: null
    },
    index:{
      type: Number,
      default: 0
    }
  },
  computed:{
    typeClassName(){
      if(this.typeOne){
        return 'amount type-one'
      } else if(this.typeTwo) {
        return 'amount type-two'
      } else {
        return 'amount'
      }
    }
  },
  methods: {
    showExplain(){
      this.$emit('showAll',this.index)
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .coupons-wrap {
    margin-bottom: 14px;
    .coupon-upper{
      display: flex;
      height: 147px;
      background-color: #EDEDED;
      .amount{
        width: 170px;
        height: 147px;
        color: #fff;
        font-size: 24px;
        background: linear-gradient(-60deg,#FF47F1,#FD5D1F 90%);
        position: relative;
        text-align: center;
        line-height: 24px;
        &:after{
          content: '';
          display:block;
          width:0;
          height:0;
          border-width:24px 0 24px 24px;
          border-style:solid;
          border-color:transparent transparent transparent #FF47F1;
          position:absolute;
          top: 50px;
          right: -24px;
        }
        &.type-one{
          background: linear-gradient(-60deg,#4C76FF,#825EF9 90%);
          &:after{
            border-color:transparent transparent transparent #4C76FF;
          }
        }
        &.type-two{
          background: linear-gradient(-60deg,#FF4470, #FD761E 90%);
          &:after{
            border-color:transparent transparent transparent #FF4470;
          }
        }
        .price{
          height: 100px;
          line-height: 100px;
        }
        .price-symbol{
          font-size: 32px;
        }
        .use-cond{
          font-size: 70px;
        }
      }
      .right-info{
        flex: 1;
        height: 150px;
        padding-left: 60px;
        color: #000;
        font-size: 22px;
        line-height: 36px;
        h1.title{
          font-size: 30px;
          padding: 15px 0;
          line-height: 40px;
        }
        .scope{
          font-size: 20px;
          color: #969696;
        }
      }
    }
    .coupon-lower{
      padding: 10px 20px;
      font-size:20px;
      color: #000;
      line-height:32px;
      display: none;
    }
  }
</style>
