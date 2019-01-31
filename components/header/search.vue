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
        <div class="search-box" v-if="!isSearch">
          <van-icon name="search" />
          <input class="box" :placeholder="searchKeyWords" v-model="query" ref="query" />
          <van-icon name="clear" v-show="query" @click="clear" />
        </div>
        <div class="has-keyword" v-else>
          <div class="search-box">
            <van-icon name="search" />
            <input class="box" :placeholder="searchKeyWords" v-model="query" ref="query" />
            <van-icon name="clear" v-show="query" @click="clear" />
          </div>
          <div class="search-btn" @click="getSearchList">搜索</div>
        </div>
      </div>
    </van-icon>
  </van-nav-bar>
</template>

<script>
  import {throttle as _throttle} from 'lodash'
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
        query: this.$route.query.keyWords || ''
      }
    },
    created() {
      this.$watch('query', _throttle((newValue) => {
        this.$emit('query', newValue)
      }, 500))
    },
    methods: {
      onClickLeft() {
        // this.$router.go(-1)
        this.$emit('leftClick')
      },
      clear() {
        this.query = ''
      },
      getSearchList() {
        this.$emit('searchList', this.query)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .layout-header {
    height: 88px;
    font-size: 32px;
    color: #eee;
    background-color: transparent;
    transition: all 0.5s;
    &.show-bg {
      background-color: #fff;
      color: #191919;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.14);
      .left-wrap {
        color: #191919;
      }
    }
    .right-wrap {
      .big-search{
        width: 634px;
        height: 72px;
      }
      .van-search{
        background: #fff !important;
        border-radius:36px;
        height: 72px;
        padding: 0;
      }
    }
  }
  .search-box{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width:618px;
    padding: 0 6px 0 20px;
    height:68px;
    background: #DBDBDB;
    border-radius:36px;
    overflow: hidden;
    i.van-icon-search{
      color: #fff;
      font-size: 40px;
    }
    .box{
      flex: 1;
      height: 68px;
      padding: 10px 0 10px 10px;
      line-height: 48px;
      border: none;
      outline: 0;
      color: #666;
      background: #DBDBDB;
      &::-webkit-input-placeholder{
        color: #fff !important;
      }
    }
    i.van-icon-clear{
      color: #666;
      padding-right: 10px;
    }
  }
  .has-keyword{
    display: flex;
    .search-box{
      flex: 1;
    }
    .search-btn{
      line-height: 72px;
      padding-left: 10px;
      color: #00ABF9;
    }
  }
</style>
