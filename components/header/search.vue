<template>
  <van-nav-bar class="layout-header" @click-left="onClickLeft">
      <van-icon class="left-wrap" :name="serachtype == 1 ? 'wap-home':'arrow-left'" slot="left" />
      <van-icon class="right-wrap" slot="title">
        <template v-if="$route.query.tb">
          {{searchString}}
        </template>
        <template v-else>
          <van-search
            v-model="searchKeyWords"
            placeholder="请输入搜索关键词"
            show-action
            shape="round">
            <div slot="label" class="search-left-text" v-if="searchString">{{searchString}}</div>
            <div slot="action" @click="onSearch" style="color: #02ACF9">搜索</div>
          </van-search>
        </template>
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
      serachtype:{
        type:String,
        default: '0'
      },
      searchString: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        query: this.$route.query.w || '',
        query1: this.$route.query.w || '',
      }
    },
    methods: {
      onClickLeft() {
        this.$emit('leftClick')
      },
      clear() {
        this.query = ''
      },
      // 派发数据给列表页面
      onSearch(){}
    }
  }
</script>

<style lang="scss" scoped>
.right-wrap{
  width: 100%;
  margin-top: -6px;
}
.search-left-text { 
  color: #02ACF9;
  border-right: 2px solid #fff;
  padding-right: 10px;
}
</style>
<style>
.layout-header .van-nav-bar__title{
  max-width: 85%;
  margin: 0 0 0 12% ;
}
.layout-header .van-search{
  padding: 0 !important;
}
.layout-header .van-nav-bar{
  box-shadow: none;
}
</style>
