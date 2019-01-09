<template>
  <van-nav-bar class="layout-header"
    fixed
    :title="title"
    :class="{'show-bg': isBgHeader}"
    :z-index="999"
    @click-left="onClickLeft"
    @click-right="onClickRight">
    <van-icon class="left-wrap"
      name="arrow-left"
      slot="left" />
    <van-icon class="right-wrap"
      slot="right">
      <div class="search">
        <div class="icon"></div>
        <div class="text">搜索</div>
      </div>
    </van-icon>
  </van-nav-bar>
</template>

<script>
  import {Header} from 'mint-ui';
  export default {
    components: {
      Header
    },
    props: {
      title: {
        type: String,
        default: '标题'
      },
      isBgHeader: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isFixed: true,
      }
    },
    methods: {
      onClickLeft() {
        console.log('返回');
      },
      onClickRight() {
        console.log('按钮');
      }
    },
  }
</script>

<style lang="scss" scoped>
  .layout-header {
    height: 88px;
    font-size: 32px;
    color: #eee;
    background-color: transparent;
    &.show-bg {
      background-color: #fff;
      color: #191919;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.14);
      .right-wrap {
        .search {
          background: #399ef6 !important;
          color: #fff;
        }
      }
    }
    .left-wrap {
      color: #fff;
    }
    .right-wrap {
      .search {
        width: 118px;
        height: 100%;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          display: inline-block;
          width: 32px;
          height: 44px;
          background: url("../../assets/image/search@2x.png") no-repeat 0 5px/100%;
        }
        .text {
          margin-left: 5px;
          font-size: 22px;
          color: #fff;
        }
      }
    }
  }
  .van-hairline--bottom::after {
    border-bottom-width: 0px !important;
  }
</style>
