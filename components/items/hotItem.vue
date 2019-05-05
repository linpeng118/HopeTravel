<template>
  <div class="hot-item" @click="selectItem" target="_blank">
    <div class="banner" :productId="proData.product_id">
      <img :src="proData.image"
        alt="banner">
      <div class="tag-wrap"
        :class="tagPos">
        <div class="tag"
          v-for="(item,index) in proData.icons_show"
          :class="index===1? 'color': ''"
          :key="item">
          {{item}}
        </div>
      </div>
      <div class="title-wrap"
        v-if="isShowTitle">
        <span class="title">{{proData.title}}</span>
      </div>
    </div>
    <div class="desc no-wrap-line2 imitate-ellipsis2">{{proData.name}}</div>
    <div class="tag-icon-tour">
      <span v-for="(item,index) in proData.icons_tour"
            :key="index">{{item.title}}</span>
    </div>
    <div class="price-wrap">
      <span class="price">
        {{proData.special_price ? proData.special_price : proData.default_price }}
      </span>
      <span class="unit">/{{$t('since')}}&nbsp;</span>
      <span class="ori-price"
        v-if="proData.special_price">
        {{proData.default_price}}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
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
      },
      isShowTitle: {
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
    .banner {
      position: relative;
      height: 240px;
      border-radius:8px;
      background-color: #d8d8d8;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        background-color: #d8d8d8;
      }
      .tag-wrap {
        position: absolute;
        left: 0;
        top: 0;
        height:36px;
        border-radius: 0 0 0.16rem 0;
        overflow: hidden;
        .tag {
          display: inline-block;
          font-size:22px;
          color: #fff;
          background-color: #ef9a1a;
          width: 58px;
          text-align: center;
          line-height: 36px;
        }
        .color {
          background: #fe423f;
        }
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
      margin-top: 10px;
      font-size: 28px;
      color: #3e3e3e;
    }
    .price-wrap {
      margin-top: 8px;
      .price {
        font-size: 32px;
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
    .tag-icon-tour{
      font-size:22px;
      line-height: 32px;
      color: #666;
      height: 30px;
      overflow: hidden;
      margin-top: 5px;
      span{
        display: inline-block;
        border-radius:16px;
        background-color: #E4E4E4;
        padding: 0 10px;
        margin-bottom: 5px;
        margin-right: 2px;
      }
    }
  }
</style>
