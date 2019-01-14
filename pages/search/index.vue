<template>
  <div>
    <lay-header title="搜索" :isSearch="false" :barSearch="true" searchKeyWords="城市/景点/产品/关键字"></lay-header>
    <div class="search-wrap">
      <van-badge-group :active-key="activeKey" @change="onChange" class="badge-bar">
        <van-badge title="热门推荐" />
        <van-badge title="美东"/>
        <van-badge title="美东"/>
        <van-badge title="美东"/>
      </van-badge-group>
      <div class="search-main">
        <h2>经典线路</h2>
      </div>
    </div>
  </div>
</template>

<script>
import LayHeader from '@/components/header/index.vue'
import HotCityTag from '@/components/tags/index.vue'
export default {
  name: 'search',
  components: {
    LayHeader,
    HotCityTag
  },
  data() {
    return {
      activeKey: 0
      // searchKeyWords: ''
    }
  },
  methods: {
    onChange(key) {
      this.activeKey = key;
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .search-wrap{
    margin-top:88px;
    .badge-bar{
      position: fixed;
      top:88px;
      bottom: 0;
      width: 180px;
      background-color: #F1F1F1;
    }
    .van-badge{
      padding: 32px 0;
      font-size:28px;
      background-color: transparent;
      height: 100px;
      line-height: 36px;
      border:none;
    }
    .van-badge--select {
      background-color: #fff;
    }
    .search-main {
      flex: 1;
      padding-left: 210px;
      h2{
        padding:32px 0;
        font-size:28px;
        color: #9A9A9A;
      }
    }

  }
</style>
<style>
  .search-wrap .van-badge__text{
    padding-left: 32px;
  }
  .search-wrap .van-badge--select .van-badge__text{
    border-left: 6px solid #399EF6;
  }
</style>
