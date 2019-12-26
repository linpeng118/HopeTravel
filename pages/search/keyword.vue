<template>
  <div class="keyword-box">
    <lay-header
      :searchKeyWords="searchKeyWords"
      :isSearch="true"
      @query="queryChange"
      @leftClick="leftClick"
      @search="searchKeywordsProduct"
      :isFixed="true"
    >
    </lay-header>
    <div class="hot-wrapper">
      <template v-if="!searchResult && !$route.query.sr">
        <!--历史记录-->
        <div class="history-list" ref="historyBox">
          <h2 class="title">
            <span>{{$t('searchPage.searchHistory')}}</span>
            <div style="color: #399EF6" @click="deleteHistory">
              <van-icon name="delete" />
              清空
            </div>
          </h2>
          <div class="search-items">
            <div class="item-info" v-for="item in historyList" :key="item" ref="searchItems">
              <span @click="selectKeywords(item)">{{item}}</span>
            </div>
          </div>
        </div>
        <!--热门搜索-->
        <div class="hot-tags-list">
          <h2 class="title">热门搜索</h2>
          <div class="items">
          <span v-for="(item,index) in searchHotList" :key="index" @click="selectProductList(item)">
            {{item.title}}
          </span>
          </div>
        </div>
      </template>
      <template v-if="$route.query.sr || searchResult">
        <div class="search-result">
          <template v-if="searchResultList.category && searchResultList.category.length">
            <h2 class="title">{{searchKeyWords}}{{$t('searchPage.products')}}</h2>
            <square-tag :lists="searchResultList.category" @selectProductList="selectProductPage"></square-tag>
          </template>
          <search-result :lists="searchResultList.product" @selectItem="selectProductInfo"></search-result>
          <div class="no-data" v-if="noData">{{$t('noData')}}</div>
          <div class="no-data" v-if="isFirst">{{$t('loading')}}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import LayHeader from '@/components/header/search'
  import SquareTag from '@/components/tags/square'
  import SearchResult from '@/components/items/searchResult'
  import {getHotSearchList, getAssociateSearch} from '@/api/search'
  import {setLocalStore, getLocalStore} from '@/assets/js/utils'
  import {TRUE_PARAMS} from '@/assets/js/config'
  import {postKeywordsCensus} from '@/api/search'
  // 历史记录
  const SEARCH_HISTORY = '__tourscool_search_history__'
  export default {
    components:{LayHeader,SquareTag,SearchResult},

    data(){
      return {
        searchKeyWords: this.$route.query.w,
        searchHotList: [],
        historyList: [],
        searchResultList: {}, // 搜索结果
        noData: false,
        isFirst: true, // 是否首次进来
        searchResult: false // 是否显示搜索结果的部分
      }
    },
    watch: {
      searchKeyWords(newValue) {
        this.search()
        if(!newValue){
          let query = JSON.parse(JSON.stringify(this.$route.query))
          delete query.w
          console.log(query);
          this.$router.push({
            name: 'search-keyword',
            query
          })
          this.searchResult = false
          this.init()
          this.getHistoryList()
        } else {
          this.search()
        }
      }
    },
    mounted(){
      if(this.$route.query.sr){
        this.search()
      } else {
        this.init()
        this.getHistoryList()
      }
    },
    methods:{
      queryChange(keyword){
        this.searchKeyWords = keyword
      },
      leftClick(){
        let href = window.location.href.slice(-1)
        if(href == '#'){
          this.$router.go(-2)
        } else {
          this.$router.go(-1)
        }
      },
      async init(){
        let {code,data = [] } = await getHotSearchList()
        if(code === 0) {
          this.searchHotList = data
        }
      },
      // 获取历史搜索数据
      getHistoryList() {
        this.historyList = getLocalStore(SEARCH_HISTORY) || []
      },
      // 删除历史记录数据
      deleteHistory(){
        this.historyList = []
        setLocalStore(SEARCH_HISTORY, [])
      },
      // 搜索配的是id
      selectProductList(item){
        console.log(34378,item)
        this.keywordStatistics(item.title)
        let {category,span_city,start_city} = item
        let str = 'ya'
        if(span_city){
          str += '-' + TRUE_PARAMS.span_city + span_city
        } 
        if(start_city) {
          str += '-' + TRUE_PARAMS.start_city + start_city
        }
        this.$router.push({
          name:'category-search',
          params:{
            category: category || 'all',
            search:str
          }
        })
      },
      // 搜索关键字
      searchKeywordsProduct(){
        let item = this.searchKeyWords
        this.keywordStatistics(item)
        this.saveLocal()
        this.$router.push({
          name:'category-search',
          params:{
            category: 'all',
            search: 'ya'
          },
          query:{
            w: item,
            key: 1  // 添加的目的是为了在列表页面展示搜索的头部
          }
        })
      },
      async search(){
        if(this.searchKeyWords) {
          this.noData = false
          let {code, data = {}} = await getAssociateSearch(this.searchKeyWords)
          if(code === 0) {
            this.searchResultList = data
            this.isFirst = false
            this.searchResult = true
          }
          if(data.category.length === 0 && data.product.length === 0) {
            this.noData = true
          }
        }
      },
      selectProductPage(item){
        this.saveLocal()
        let _arr = ['ya','yg','yw','yj','ym','yr','','yl']
        let query = {
          w: this.searchKeyWords
        }
        this.$router.push({
          name:'category-search',
          params:{
            category: 'all',
            search: _arr[item]
          },
          query
        })
      },
      selectProductInfo(item){
        this.$router.push(`/product/detail?productId=${item}`)
      },
      // 存储浏览记录
      saveLocal() {
        if(this.searchKeyWords) {
          let historyList = getLocalStore(SEARCH_HISTORY) || []
          historyList.unshift(this.searchKeyWords)
          let set = [...new Set(historyList)]
          if (set.length >= 8) {
            set = set.slice(0, 8)
          }
          setLocalStore(SEARCH_HISTORY, set)
        }
      },
      keywordStatistics(item) {
        if(item){
          let {code, msg} = postKeywordsCensus(item)
        }
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .keyword-box{
    h2.title{
      font-size:28px;
      line-height:44px;
      color:#BEBEBE;
      font-weight: 400;
      height: 44px;
      display: flex;
      justify-content: space-between;
      align-self: center;
      i{
        vertical-align: middle;
      }
    }
    .history-list{
      padding: 0 32px;
      .search-items{
        padding: 10px 0;
        .item-info{
          display: inline-block;
          background-color:#399EF6;
          color: #fff;
          border-radius: 34px;
          margin-right: 10px;
          font-size: 24px;
          padding: 0 24px;
          line-height: 64px;
          height: 64px;
        }
      }
    }
    .hot-wrapper{
      padding-top: 112px;
    }
    .hot-tags-list{
      margin-top: 30px;
      padding: 0 32px;
      .items{
        margin-top: 10px;
        span{
          display: inline-block;
          background-color:#F1F1F1;
          color: #000;
          border-radius: 34px;
          margin-right: 10px;
          font-size: 24px;
          padding: 0 24px;
          line-height: 64px;
          height: 64px;
        }
      }
    }
    .search-result{
      padding: 0 32px;
      .no-data{
        text-align: center;
        font-size: 28px;
        color: #BEBEBE;
        padding: 20px 0 ;
      }
    }
  }

</style>
