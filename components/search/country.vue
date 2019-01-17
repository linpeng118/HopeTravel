<template>
  <div class="search-main">
    <div class="country-bg">
      <img src="../../assets/imgs/search_bg.jpg" alt="">
      <div class="desc">{{data.cityName}}{{data.title}} {{data.num}}条</div>
    </div>
    <div class="hot-box" v-if="data.hotTarget && data.hotTarget.length">
      <h2>热门目的地</h2>
      <hot-place :lists="data.hotTarget" :isDesc="false"></hot-place>
    </div>
    <div class="result-line" v-if="data.allArea && data.allArea.length">
      <h2>全部目的地</h2>
      <div class="line">
        <hot-city-tag v-for="line in data.allArea" :key="line.id" :className="line.active ? 'active' : 'normal'" :tag="line" />
      </div>
    </div>
  </div>
</template>

<script>
import HotPlace from '@/components/hot_place/index.vue'
import HotCityTag from '@/components/tags/index.vue'
export default {
  name: 'country',
  components: {
    HotPlace,
    HotCityTag
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .country-bg{
    width:518px;
    height:120px;
    position: relative;
    img{
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
    .desc{
      position: relative;
      z-index: 4;
      line-height: 120px;
      font-size:28px;
      color: #FFFFFF;
      padding-left: 18px;
    }
  }
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
