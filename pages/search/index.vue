<template>
  <div>
    <lay-header title="搜索" :isSearch="false" :classBg="true" :barSearch="true" searchKeyWords="城市/景点/产品/关键字"></lay-header>
    <div class="search-wrap">
      <van-badge-group :active-key="activeKey" @change="onChange" class="badge-bar">
        <van-badge title="热门推荐" />
        <van-badge title="美东"/>
        <van-badge title="美东"/>
        <van-badge title="美东"/>
      </van-badge-group>
      <div class="search-main">
        <div>
          <h2>经典线路</h2>
          <div class="line">
            <hot-city-tag v-for="line in lineList" :key="line.id" :className="line.active ? 'active' : 'normal'" :tag="line" />
          </div>
        </div>
        <!--热门景点-->
        <div>
          <h2>热门景点</h2>
          <hot-place :lists="hotPlace"></hot-place>
        </div>
        <div>
          <h2>热门目的地</h2>
          <hot-place :lists="hotTarget"></hot-place>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LayHeader from '@/components/header/index.vue'
import HotCityTag from '@/components/tags/index.vue'
import HotPlace from '@/components/hot_place/index.vue'
export default {
  name: 'search',
  components: {
    LayHeader,
    HotCityTag,
    HotPlace
  },
  data() {
    return {
      activeKey: 0,
      lineList: [
        {title: '美国全景',id:1},
        {title: '纽约+阿拉斯加+洛杉矶',id:2,active: true},
        {title: '美国+墨西哥',id:3, active:true},
        {title: '美国+加拿大',id:4},
        {title: '纽约+阿拉斯加+洛杉矶',id:5}
      ],
      hotPlace: [
        {id: 1, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '黄石国家公园', desc: '惊艳黄石'},
        {id: 2, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '黄石国家公园', desc: '惊艳黄石'},
        {id: 3, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '黄石国家公园', desc: '惊艳黄石'},
      ],
      hotTarget: [
        {id: 1, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '黄石国家公园', desc: '惊艳黄石'},
        {id: 2, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '黄石国家公园', desc: '惊艳黄石'},
        {id: 3, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '黄石国家公园', desc: '惊艳黄石'},
      ]
      // searchKeyWords: ''
    }
  },
  methods: {
    onChange(key) {
      this.activeKey = key;
    },
    classActive(active) {
      if (active) {}
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .search-wrap{
    position: relative;
    top:88px;
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
      padding-right: 32px;
      height: 6000px;
      h2{
        padding:32px 0 20px 0;
        font-size:28px;
        color: #9A9A9A;
      }
      .active{
        background-color: #00ABF9;
        color: #fff;
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
