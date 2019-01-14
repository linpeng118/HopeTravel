<template>
  <div class="search-wrap">
    <lay-header title="搜索" :isSearch="false" :barSearch="true" searchKeyWords="城市/景点/产品/关键字"></lay-header>
    <van-badge-group :active-key="activeKey" @change="onChange" class="badge-bar">
      <van-badge title="热门推荐" />
      <van-badge title="美东"/>
      <van-badge title="美东"/>
      <van-badge title="美东"/>
    </van-badge-group>
  </div>
</template>

<script>
import LayHeader from '@/components/header/index.vue'
export default {
  name: 'search',
  components: {
    LayHeader
  },
  data() {
    return {
      activeKey: 0
      // searchKeyWords: ''
    }
  },
  methods: {
    onChange() {
      this.activeKey = key;
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .search-wrap{
    display: flex;
    .badge-bar{
      position: fixed;
      top:88px;
      bottom: 0;
      width: 168px;
      background-color: #F1F1F1;
    }
  }
</style>
