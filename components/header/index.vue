<template>
  <mt-header :fixed="isFixed"
    :title="title"
    class="defalut-header"
    :class="{'show-bg': isBgHeader}">
    <router-link to="/"
      slot="left">
      <mt-button icon="back"
        class="back"></mt-button>
    </router-link>
    <div slot="right"
      class="right-wrap">
      <div class="search">
        <div class="icon"></div>
        <div class="text">搜索</div>
      </div>
    </div>
  </mt-header>
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
        default: true
      }
    },
    data() {
      return {
        isFixed: true,
      }
    },
    computed: {},
    mounted() {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .defalut-header {
    height: 88px;
    font-size: 32px;
    background-color: transparent;
    color: #eee;
    z-index: 999;
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
    .back .mintui-back {
      font-size: 32px;
    }
    .right-wrap {
      float: right;
      .search {
        width: 118px;
        height: 44px;
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
        }
      }
    }
  }
</style>
