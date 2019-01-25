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
        <van-search
          :placeholder="query || searchKeyWords"
          v-model="query" v-if="!isSearch" @click.stop="searchChange"></van-search>
        <van-search
          :placeholder="searchKeyWords"
          v-model="query"
          show-action
          @cancel="onCancel"
          @search="onSearch" v-if="isSearch">
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
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
      onSearch() {
        this.$emit('onSearch', false)
      },
      searchChange(){
        // this.$emit('searchStart', true)
      },
      onCancel() {
        console.log('onCancel')
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
</style>
<style lang="scss">
  .right-wrap {
    .van-search{
      .van-cell{
        background: #DBDBDB !important;
        border-radius:36px;
      }
      .van-cell__left-icon{
        color: #fff;
      }
      .van-field__body {
        input::-webkit-input-placeholder {
          color: #fff !important;
        }
        .van-field__clear{
          color: #000000;
        }
      }
      .van-search__action{
        color: #00ABF9;
      }
    }
  }
</style>
