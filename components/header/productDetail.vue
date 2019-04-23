<template>
  <van-nav-bar class="product-detail-header tours-no-bb"
    ref="productDetailHeader"
    :fixed="fixed"
    :class="{'transparent': transparent}"
    :title="title"
    :z-index="999"
    @click-left="onClickLeft"
    @click-right="onClickRight">
    <van-icon class="left-wrap"
      name="arrow-left"
      slot="left" />
    <van-icon class="right-wrap"
      name="ellipsis"
      slot="right" />
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
        this.$router.go(-1)
      },
      onClickRight() {
        this.$emit('callOnRight')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .product-detail-header {
    height: 88px;
    font-size: 32px;
    transition: all 0.5s;
    background-color: #fff;
    .left-wrap,
    .right-wrap {
      color: #404040;
      font-size: 32px;
    }
    .left-wrap {
      padding: 16px;
    }
    &.transparent {
      background-color: transparent;
      color: #fff;
      .left-wrap,
      .right-wrap {
        background: rgba(0, 0, 0, 0.5);
        padding: 10px;
        border-radius: 50%;
        color: #fff;
        font-size: 32px;
      }
    }
  }
</style>
