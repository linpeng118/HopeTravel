<template>
  <div>
    <lay-header searchKeyWords="城市/景点/产品/关键字"></lay-header>
    <!--左边侧边栏-->
    <div class="search-wrap">
      <van-badge-group :active-key="activeKey" @change="onChange" class="badge-bar">
        <van-badge v-for="(area,index) in areaList" :key="index" :title="area" />
      </van-badge-group>
      <!--热门推荐的内容-->
      <recommend :data="recommendObj" v-if="activeKey === 0"></recommend>
      <country :data="countryObj" v-else></country>
    </div>
  </div>
</template>

<script>
import LayHeader from '@/components/header/search.vue'
import Recommend from '@/components/search/recommend.vue'
import Country from '@/components/search/country.vue'
import {getDestination} from '@/api/search'
// import HotCityTag from '@/components/tags/index.vue'
// import HotPlace from '@/components/hot_place/index.vue'
// import PlayWays from '@/components/play_ways/index.vue'

export default {
  name: 'search',
  components: {
    LayHeader,
    Recommend,
    Country,
    // HotCityTag,
    // HotPlace,
    // PlayWays
  },
  data() {
    return {
      isApp: this.$route.query.platform,
      activeKey: 0,
      areaList: [],
      allData: [],
      recommendObj: {},
      countryObj: {
        image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',
        num: 10,
        country: '北美',
        hotTarget: [
          {id: 1, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '纽约'},
          {id: 2, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '洛杉矶'},
          {id: 3, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '塞班'},
          {id: 4, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '纽约'},
          {id: 5, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '洛杉矶'},
          {id: 6, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '塞班'},
        ],
        lineList: [
          {title: '美国全景',id:1},
          {title: '纽约',id:2,},
          {title: '墨西哥',id:3,},
          {title: '美国',id:4},
          {title: '纽洛杉矶',id:5}
        ]
      }
      // searchKeyWords: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    onChange(key) {
      this.activeKey = key;
    },
    // 获取页面需要的数据
    async init() {
      let {data, code} = await getDestination()
      if(code === 0) {
        this.areaList = this._nomalLizeshowList(data)
        this.allData = data
        this._nomalLizesHotRecommend(data[0])
      }
    },
    // 序列化数据
    _nomalLizeshowList(data) {
      let areaList = []
      for(let i = 0, len = data.length; i < len; i++) {
        areaList.push(data[i].cityName)
      }
      return areaList
    },
    // 热门推荐序列化
    _nomalLizesHotRecommend(data) {
      const {dataArray} = data
      this.recommendObj = {
        lineList: { //经典路线
          title: dataArray[0].title,
          lists: dataArray[0].datas
        },
        hotPlace: { //热门景点
          title: dataArray[1].title,
          lists: dataArray[1].datas
        },
        hotTarget: { //热门目的地
          title: dataArray[2].title,
          lists: dataArray[3].datas
        },
        playWaysList: { //top6玩法
          title: dataArray[3].title,
          lists: dataArray[3].datas
        }
      }
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
      padding-top:20px;
      h2{
        padding: 10px 0 20px 0;
        font-size:28px;
        color: #9A9A9A;
      }
      .active{
        background-color: #00ABF9;
        color: #fff;
      }
      .result-line{
        padding-top: 22px;
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
