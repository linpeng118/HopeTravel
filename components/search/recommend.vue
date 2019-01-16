<template>
  <div class="search-main">
    <div class="result-line">
      <h2>经典线路</h2>
      <div class="line">
        <hot-city-tag v-for="line in data.lineList" :key="line.id" :className="line.active ? 'active' : 'normal'" :tag="line" />
      </div>
    </div>
    <!--热门景点-->
    <div class="hot-box">
      <h2>热门景点</h2>
      <hot-place :lists="data.hotPlace"></hot-place>
    </div>
    <div class="hot-box">
      <h2>热门目的地</h2>
      <hot-place :lists="data.hotTarget"></hot-place>
    </div>
    <div class="play-box">
      <h2>Top6玩法</h2>
      <play-ways v-for="play in data.playWaysList" :key="play.id" :item="play"></play-ways>
    </div>
  </div>
</template>

<script>
import HotCityTag from '@/components/tags/index.vue'
import HotPlace from '@/components/hot_place/index.vue'
import PlayWays from '@/components/play_ways/index.vue'
export default {
  name: 'recommend',
  components: {
    HotCityTag,
    HotPlace,
    PlayWays
  },
  props: {
    data: {
      type: Object,
      default: () =>({
        lineList: [],
        hotPlace: [],
        hotTarget: [],
        playWaysList: []
      })
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .search-main{
    h2{
      padding: 10px 0 20px 0;
      font-size:28px;
      color: #9A9A9A;
    }
    .active{
      background-color: #00ABF9;
      color: #fff;
    }
  }
</style>
