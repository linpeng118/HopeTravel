<template>
  <van-nav-bar class="product-detail-header-neu tours-no-bb"
    ref="productDetailHeader"
    :fixed="true"
    :class="{'transparent': transparent}"
    :z-index="999"
    @click-left="onClickLeft"
    @click-right="onClickRight">
    <van-icon class="left-wrap-neu"
      :name="$route.query.sem == 1 ? 'wap-home-o':'arrow-left'"
      slot="left" />
    <van-icon class="right-wrap-neu"
      name="ellipsis"
      slot="right"/>
    <div slot="title">
    </div>
  </van-nav-bar>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      transparent: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        isFixed: true,
      }
    },
    computed: {
    },
    methods: {
      onClickLeft() {
        // 返回上一页（打开新页面问题处理）
        // this.$router.go(-1);
        this.$emit('callOnLeft')
      },
      onClickRight() {
        this.$emit('callOnRight')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .product-detail-header-neu {
    height: 88px;
    font-size: 32px;
    background-color: transparent !important;
    color: #fff !important;
    box-shadow: none !important;
    .left-wrap-neu,
    .right-wrap-neu {
      color: #fff !important;
    }
  }
</style>
