<template>
  <div class="snap-up-item" @click="selectItem(proData)">
    <div class="banner">
      <img :src="proData.image"
        alt="banner">
      <div class="collect-wrap" @click.stop="OnCollect(proData)" v-if="isCollect">
        <img v-if="proData.is_favorite"
             src="../../assets/imgs/star_active@2x.png"
             alt="">
        <img v-else
             src="../../assets/imgs/star@2x.png"
             alt="">
      </div>
      <div class="time-wrap" v-if="isShowTime">
        <div class="text">
          抢购中
        </div>
        <div class="time">
          <!--<span>00</span>-->
          <!--<span class="colon">:</span>-->
          <!--<span>23</span>-->
          <!--<span class="colon">:</span>-->
          <!--<span>56</span>-->
          <slot></slot>
          <!--<span v-if="proData.special_end_date < 0" class="over">已结束</span>-->
          <!--{{getTime(proData.special_end_date)}}-->
        </div>
      </div>
      <div class="title"
        v-if="isShowTitle">
        {{proData.name}}
      </div>
    </div>
    <div class="desc">
      <span class="tag tag1" v-if="proData.self_support===0">自营</span>
      <!--<div class="tags-wrap" :class="tagPos">-->
        <!--<span class="tag tag1" v-if="proData.self_support===0">自营</span>-->
      <!--</div>-->
      <span>{{proData.name}}</span>
    </div>
    <div class="price-wrap">
      <div v-if="proData.special_price">
        <span class="price">{{proData.special_price}}</span>
        <span class="unit">/起&emsp;</span>
        <span class="ori-price">${{proData.default_price}}</span>
      </div>
      <div v-else>
        <span class="price">{{proData.default_price}}</span>
        <span class="unit">/起&emsp;</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {resetTime} from '@/assets/js/utils'
  export default {
    components: {},
    filters: {
      showTime (value) {
        console.log(value)
        setInterval(() => {
          value = value - 1000
        }, 1000)
        return value
      }
    },
    props: {
      proData: {
        type: Object,
        require: true,
        default: () => ({
          type: [],
          image: '',
          desc: ''
        })
      },
      isShowTime: {
        type: Boolean,
        default: false,
      },
      isShowTitle: {
        type: Boolean,
        default: false,
      },
      isCollect: {
        type: Boolean,
        default: true,
      },
      tagPos: {
        type: String,
        default: 'top'
      }
    },
    data() {
      return {
        time: {h:0,m:0,s:0}
      }
    },
    computed: {},
    mounted() {

    },
    methods: {
      OnCollect(val) {
        this.$emit('callCollect', val)
      },
      selectItem(product) {
        this.$emit('selectDetail', product.product_id)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .snap-up-item {
    width: 686px;
    height: 554px;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    .banner {
      position: relative;
      height: 368px;
      background: #eee;
      img {
        width: 100%;
        height: 368px;
      }
      .title {
        position: absolute;
        bottom: 0;
        padding: 0 10px;
        width: 100%;
        height: 80px;
        line-height: 80px;
        background: rgba(0, 0, 0, 0.6);
        color: #f1f1f1;
        font-size: 20px;
        border-radius: 0 0 6px 6px;
      }
      .collect-wrap {
        width: 100px;
        height: 100px;
        position: absolute;
        top: 10px;
        right: 10px;
        text-align: right;
        img {
          width: 50px;
          height: 50px;
        }
      }
      .time-wrap{
        width: 300px;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 24px;
        color: #fff;
        display: flex;
        .text{
          height:48px;
          width: 96px;
          line-height: 48px;
          background-color: #FF0000;
          text-align: center;
        }
        .over{
          height:48px;
          width: 96px;
          line-height: 48px;
          background-color: #000;
          text-align: center;
          display: block;
          border-radius: 0 8px 8px 0;
        }
      }
    }
    .desc {
      margin-top: 10px;
      font-size: 32px;
      overflow: hidden;
      text-overflow: ellipsis; //文本溢出显示省略号
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      .tag {
        display: inline-block;
        padding:5px 10px;
        text-align: center;
        color: #fff;
        font-size: 22px;
        border-radius: 6px;
        background: #ef9a1a;
        vertical-align: middle;
      }
      /*.tags-wrap {*/
        /*display: inline-block;*/
        /*.tag {*/
          /*display: inline-block;*/
          /*width: 60px;*/
          /*height: 36px;*/
          /*line-height: 36px;*/
          /*text-align: center;*/
          /*color: #fff;*/
          /*font-size: 22px;*/
          /*border-radius: 6px;*/
          /*background: #ef9a1a;*/
        /*}*/
        /*.tag1 {*/
          /*background: #ef9a1a;*/
        /*}*/
        /*.tag2 {*/
          /*background: #fe423f;*/
        /*}*/
      /*}*/
    }
    .price-wrap {
      margin-top: 12px;
      font-size: 0;
      .price {
        font-size: 50px;
        color: #ff0000;
      }
      .unit {
        font-size: 24px;
        color: #ff0000;
      }
      .ori-price {
        font-size: 24px;
        color: #9a9a9a;
        text-decoration: line-through;
      }
    }
  }
</style>
