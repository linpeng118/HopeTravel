<template>
  <div class="hot-item" @click="selectItem" target="_blank">
    <div class="banner" :productId="proData.product_id">
      <img v-lazy="proData.image" alt="banner">
      <div class="tag-wrap">
        {{proData.departure_city | departureCity}}  {{proData.sub_type}}
      </div>
    </div>
    <div class="desc" :class="proData.name_short ? 'one' : 'no-wrap-line2 imitate-ellipsis2'">{{proData.name_short || proData.name}}</div>
    <div class="tag-icon-tour" v-if="proData.icons_tour.length">
      <span v-for="(item,index) in proData.icons_tour" :key="index">{{item.title}}</span>
    </div>
    <div class="price-wrap">
      <span class="price">
        {{(proData.special_price || proData.default_price) | getPrice }}
      </span>
      <span class="unit">/{{$t('since')}}&nbsp;</span>
    </div>
    <div class="lv-info">
      <span v-if="proData.sales > 0">{{proData.sales}}人出行</span>
      <span class="score" v-if="proData.comment_score != '0.0'">{{proData.comment_score}}分</span>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    filters:{
      getPrice(value) {
        return value.toString().split('.')[0]
      },
      departureCity(value){
        let _arr = value.split('/')
        let len = _arr.length
        if(len > 1) {
          return `${_arr[0]}等${len}地出发`
        }
        return `${value}出发`
        }
    },
    props: {
      proData: {
        type: Object,
        require: true,
        default: () => ({
          default_price: '0.00',
          departure_city: '',
          icons_show: [],
          icons_tour: [],
          image: '',
          is_play: 0,
          min_book_date: '',
          name: '',
          product_entity_type: 1,
          product_id: 3,
          self_support: 0,
          special_price: '',
        })
      }
    },
    data() {
      return {
      }
    },
    computed: {},
    mounted() {},
    methods: {
      selectItem() {
        this.$emit('selectItem', this.proData.product_id)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .hot-item {
    width: 100%;
    height: 100%;
    font-size: 0;
    box-shadow:0px 0 12px rgba(57,57,57,0.16);
    margin-bottom: 20px;
    border-radius: 8px;
    padding-bottom: 20px;
    overflow: hidden;
    .banner {
      position: relative;
      height: 240px;
      background-color: #d8d8d8;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        border-radius: 8px 8px 0px 0px;
      }
      .tag-wrap {
        position: absolute;
        left: 20px;
        bottom: 10px;
        height:36px;
        background-color: rgba(0,0,0,0.5);
        color: #fff;
        height:36px;
        font-size: 24px;
        line-break: 36px;
        padding: 0 10px;
        border-radius:8px;
      }
      .title-wrap {
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.6);
        padding-left: 10px;
        .name {
          height: 40px;
          line-height: 40px;
          color: #f1f1f1;
          font-size: 10px;
        }
      }
    }
    .desc {
      margin: 10px 20px;
      font-size: 28px;
      color: #2D2D2D;
      overflow: hidden;
      font-weight: bold;
      &.one{
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
    .price-wrap {
      margin-top: 8px;
      padding: 0 20px;
      .price {
        font-size: 32px;
        color: #F55E2F;
      }
      .unit {
        font-size: 24px;
        color: #AEAEAE;
      }
      .ori-price {
        font-size: 24px;
        color: #9a9a9a;
        text-decoration: line-through;
      }
    }
    .tag-icon-tour{
      font-size:22px;
      line-height: 32px;
      color: #00ABF9;
      height: 30px;
      overflow: hidden;
      margin-top: 5px;
      height: 36px;
      padding: 0 20px;
      span{
        display: inline-block;
        border-radius:8px;
        border:1px solid #00ABF9;
        padding: 0 10px;
        margin-bottom: 5px;
        margin-right: 10px;
      }
    }
    .lv-info{
      display: flex;
      justify-content: space-between;
      font-size: 24px;
      color: #AEAEAE;
      padding: 8px 20px 0 20px;
      .score{
        color: #FEC133;
      }
    }
  }
</style>
