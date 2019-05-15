<template>
  <van-nav-bar class="layout-header tours-no-bb"
    ref="layoutHeader"
    fixed
    :title="title"
    :class="{'show-bg': vxHeaderStatus, 'bg-color': classBg}"
    :z-index="999"
    @click-left="onClickLeft">
    <van-icon class="left-wrap"
      name="arrow-left"
      slot="left" />
    <van-icon class="right-wrap"
      slot="right">
      <div class="search"
        v-if="isSearch">
        <!--<div class="icon"></div>-->
        <!--<div class="text">搜索</div>-->
        <nuxt-link tag="div" class="personal-btn" to="/personal">
          <van-icon name="user-circle-o" color="#fff" />
        </nuxt-link>
      </div>
      <div class="big-search" :style="{opacity: barSearch ? 1 : 0}" v-if="!isSearch">
        <div class="icon"></div>
        <div class="text">{{searchKeyWords}}</div>
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
      title: {
        type: String,
        default: ''
      },
      isBgHeader: {
        type: Boolean,
        default: false
      },
      isSearch: {
        type: Boolean,
        default: true
      },
      classBg: {
        type: Boolean,
        default: false
      },
      barSearch: {
        type: Boolean,
        default: false
      },
      searchKeyWords:{
        type: String,
        default: ''
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
        // this.$emit('rightClick')
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
    overflow: hidden;
    &.show-bg {
      background-color: #fff;
      color: #191919;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.14);
      .left-wrap {
        color: #191919 !important;
      }
      .right-wrap {
        .search {
          i{
            color: #666 !important;
          }
        }
      }
    }
    .left-wrap {
      color: #fff !important;
      /*padding: 16px;*/
    }
    .right-wrap {
      .search {
        /*width: 118px;*/
        height: 100%;
        i{
          font-size: 48px !important;
          color: #fff !important;
        }
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
        color: #989898;
        border-radius:36px;
        font-size:30px;
        background: #EBEBEB;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        line-height: 72px;
        transition: all .5s;
        .icon {
          display: inline-block;
          width: 32px;
          height: 44px;
          background: url("../../assets/imgs/search_b@2x.png") no-repeat 0 5px/100%;
          margin-right: 22px;
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
