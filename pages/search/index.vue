<template>
  <div>
    <lay-header
      searchKeyWords="城市/景点/产品/关键字"
      :isSearch="isSearch"
      @onSearch="onSearch"
      @searchStart="searchStart"
      @query="queryChange"
    ></lay-header>
    <div class="search-wrap">
      <!--左边侧边栏-->
      <van-badge-group :active-key="activeKey" @change="onChange" class="badge-bar">
        <van-badge v-for="(area,index) in areaList" :key="index" :title="area" />
      </van-badge-group>
      <!--热门推荐的内容-->
      <recommend :data="recommendObj" :titleList="recommendObj.subTitle" v-if="activeKey === 0"></recommend>
      <country :data="countryObj" v-else></country>
    </div>
    <!--<loading v-if="searchLoading" loading="数据加载中..."></loading>-->
  </div>
</template>

<script>
import LayHeader from '@/components/header/search.vue'
import Recommend from '@/components/search/recommend.vue'
import Country from '@/components/search/country.vue'
import Loading from '@/components/loading/whiteBg'
import {getDestination, getAssociateSearch} from '@/api/search'

export default {
  name: 'search',
  components: {
    LayHeader,
    Recommend,
    Country,
    Loading
  },
  data() {
    return {
      isApp: this.$route.query.platform,
      activeKey: 0,
      areaList: [],
      allData: [],
      recommendObj: {},
      countryObj: {},
      searchWords: '', // 搜索内容
      isSearch: false, // 是否搜索
    }
  },
  watch: {
    searchWords() {
      this.search()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    onChange(key) {
      this.activeKey = key
      if (key)  {
        this.countryObj = this._nomalLizesAreaList(this.allData[key])
      }
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
        lineList: dataArray[0].datas, //经典路线
        hotPlace: dataArray[1].datas, //热门景点
        hotTarget: dataArray[2].datas, //热门目的地
        playWaysList: dataArray[3].datas, //top6玩法
        subTitle: {
          lineTitle: dataArray[0].title,
          hotTitle: dataArray[1].title,
          targetTitle: dataArray[2].title,
          playTitle: dataArray[3].title
        }
      }
    },
    // 其他区域热门城市
    _nomalLizesAreaList(data) {
      let countryObj = {}
      let {cityName, dataArray} = data
      countryObj = {
        cityName: cityName, // 城市的名字
        title: dataArray[0].title, // title
        num: dataArray[0].datas.length, // 路线的数量
        hotTargetTitle: dataArray[1].title, // 热门目的地名字
        allAreaTitle: dataArray[2] && dataArray[2].title, // 全部目的地名字
        hotTarget: dataArray[1].datas, // 热门目的地
        allArea: dataArray[2] && dataArray[2].datas  // 全部目的地
      }
      return countryObj
    },
    // 取消按钮
    onSearch() {
      console.log(this.search)
    },
    //
    searchStart() {
      this.isSearch = true
    },
    // 获取搜索字段
    queryChange (value) {
      // console.log(value)
      this.searchWords = value
    },
    // 搜索执行
    async search() {
      let {code, data} = await getAssociateSearch(this.searchWords)
      if (code === 0) {
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
      padding: 20px 10px 0 210px;
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
