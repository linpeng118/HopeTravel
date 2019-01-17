<template>
  <van-nav-bar class="layout-header tours-no-bb classBg show-bg"
    ref="layoutHeader"
    fixed
    :z-index="999"
    @click-left="onClickLeft">
    <van-icon class="left-wrap"
      name="arrow-left"
      slot="left" />
    <van-icon class="right-wrap"
      slot="right">
      <div class="big-search">
        <div>
          <div class="icon"></div>
          <div class="text">{{searchKeyWords}}</div>
        </div>

        <div v-if="isSearch" class="search-btn">搜索</div>
      </div>
    </van-icon>
  </van-nav-bar>
</template>

<script>
  import {mapState} from 'vuex'
  import {HEADER_TYPE} from '@/assets/js/consts/headerType'

  export default {
    components: {
    },
    props: {
      searchKeyWords:{
        type: String,
        default: ''
      },
      isSearch: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        HEADER_TYPE,
        isFixed: true,
      }
    },
    computed: {
      ...mapState({
        vxHeaderStatus: state => state.header.headerStatus,
      })
    },
    methods: {
      onClickLeft() {
        // this.$router.go(-1)
        this.$emit('leftClick')
      },
      onClickRight() {
        ('按钮');
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
    transition: all 0.5s;
    margin-top: env(safe-area-inset-top);
    &.show-bg {
      background-color: #fff;
      color: #191919;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.14);
      .left-wrap {
        color: #191919;
      }
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
          background: url("../../assets/imgs/search@2x.png") no-repeat 0 5px/100%;
        }
        .text {
          margin-left: 5px;
          font-size: 22px;
          color: #fff;
        }
      }
      .big-search{
        width: 634px;
        height: 72px;
        padding: 0 26px;
        text-align: left;
        color: #fff;
        border-radius:36px;
        font-size:30px;
        background: #DBDBDB;
        display: flex;
        align-items: center;
        line-height: 72px;
        .icon {
          display: inline-block;
          width: 32px;
          height: 44px;
          background: url("../../assets/imgs/search_b@2x.png") no-repeat 0 5px/100%;
          margin-right: 22px;
        }
        .search-btn{

        }
      }
    }
  }
  .bg-color{
    background: #fff !important;
    color: #3E3E3E !important;
    .left-wrap{
      color: #3E3E3E !important;
    }
  }
</style>
