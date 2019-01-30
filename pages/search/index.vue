<template>
  <div>
    <lay-header
      searchKeyWords="城市/景点/产品/关键字"
      :isSearch="isSearch"
      @onSearch="onSearch"
      @searchStart="searchStart"
      @query="queryChange"
      @leftClick="leftClick"
    ></lay-header>
    <div class="search-wrap" v-if="searchWrapShow">
      <!--左边侧边栏-->
      <van-badge-group :active-key="activeKey" @change="onChange" class="badge-bar">
        <van-badge v-for="(area,index) in areaList" :key="index" :title="area" />
      </van-badge-group>
      <!--热门推荐的内容 默认显示热门推荐-->
      <recommend :data="recommendObj"
                 :titleList="recommendObj.subTitle"
                 v-if="activeKey === 0"
                 @selectDetail="selectDetail"
                 @selectPlay="selectDetail"
                 @selectTag="selectDetail"
      ></recommend>
      <!--其他地区的推荐-->
      <country :data="countryObj"
               @selectDetail="selectDetail"
               @selectCountryLine="selectDetail"
               @selectOnTag="selectDetail"
               v-else></country>
    </div>
    <div class="search-result" v-if="searchResult">
      <template v-if="searchResultList.searchCategory.length">
        <h2 class="title">{{searchWords}} 的产品</h2>
        <square-tag :lists="searchResultList.searchCategory"></square-tag>
      </template>
      <search-result :lists="searchResultList.searchProduct"></search-result>
    </div>
    <loading-tr v-if="searchLoading" :loading="loading"></loading-tr>
    <loading v-if="startLoading"></loading>
  </div>
</template>

<script>
import LayHeader from '@/components/header/search'
import Recommend from '@/components/search/recommend'
import Country from '@/components/search/country'
import SquareTag from '@/components/tags/square'
import Loading from '@/components/loading/index'
import LoadingTr from '@/components/loading/whiteBg'
import SearchResult from '@/components/items/searchResult'
import {getDestination, getAssociateSearch} from '@/api/search'

export default {
  name: 'search',
  components: {
    LayHeader,
    Recommend,
    Country,
    Loading,
    SquareTag,
    SearchResult,
    LoadingTr
  },
  data() {
    return {
      isApp: this.$route.query.platform,
      activeKey: 0,
      areaList: [],
      allData: [],
      recommendObj: {}, // 推荐热门数据
      countryObj: {}, // 其他区域数据
      searchWords: '', // 搜索内容
      isSearch: false, // 是否搜索
      searchResultList: {}, // 搜索结果
      searchLoading: false, // 搜索结果监听
      loading: '数据加载中...',
      startLoading: true // 进入时加载是否显示
    }
  },
  computed: {
    searchWrapShow () { // 第一次显示
      return (!this.startLoading && JSON.stringify(this.searchResultList) === '{}') && !this.searchLoading
    },
    searchResult () { // 搜索的结果显示
      return JSON.stringify(this.searchResultList) !== '{}'
    },
    loadingStart() { // 第一个加载显示
      return this.startLoading
    },
    loadingSecond() { // 第二次加载显示
      return this.searchLoading
    }
  },
  watch: {
    searchWords(newValue) {
      if (!newValue) { // 没有数据是恢复原状
        this.searchLoading = false
        this.loading = '数据加载中...'
        this.isSearch = false
      } else {
        this.isSearch = true
      }
      this.search()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 返回上一级
    leftClick() {
      this.$router.go(-1)
    },
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
        this.startLoading = false
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
        allLines: dataArray[0].datas[0], // 总体线路
        num: dataArray[0].datas.length, // 路线的数量
        hotTargetTitle: dataArray[1].title, // 热门目的地名字
        allAreaTitle: dataArray[2] && dataArray[2].title, // 全部目的地名字
        hotTarget: dataArray[1].datas, // 热门目的地
        allArea: dataArray[2] && dataArray[2].datas  // 全部目的地
      }
      return countryObj
    },
    // 搜索按钮
    onSearch() {
      console.log('search')
    },
    //
    searchStart() {
      // this.isSearch = true
    },
    // 获取搜索字段
    queryChange (value) {
      // console.log(value)
      this.searchWords = value
    },
    // 搜索执行
    async search() {
      if(this.searchWords) {
        let {code, data} = await getAssociateSearch(this.searchWords)
        if (code === 0) {
          this.searchLoading = false
          this.loading = '数据加载中...'
          this.searchResultList = {
            searchCategory:data.category,
            searchProduct: data.product
          }
          if(!data.category.length && !data.product.length) { // 搜索结果为空显示处理
            this.searchResultList = {}
            this.searchLoading = true
            this.loading = '暂无数据'
          }
        } else {
          this.searchResultList = {}
        }
      } else {
        this.searchResultList = {}
      }
    },
    selectDetail(item){
      this.$router.push({
        name: 'product_list',
        query: {
          itemType: 1,
          ...item
        }
      })
    },
    selectCountryLine(item){
      console.log(item)
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .search-wrap{
    position: relative;
    top:88px;
    z-index: 9;
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
  .search-result{
    padding: 0 14px 10px 32px;
    background-color: #fff;
    position: relative;
    top: 88px;
    z-index: 10;
    h2.title{
      padding:32px 0 24px;
      font-size: 28px;
      font-weight: 400;
      color: #BEBEBE;
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
