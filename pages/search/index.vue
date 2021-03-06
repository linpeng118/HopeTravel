<template>
    <div>
        <lay-header 
            :isFixed="true" 
            :isSearch="isSearch" 
            @query="queryChange" 
            @leftClick="leftClick" 
            @search="searchList"
            ref="layHeader">
        </lay-header>
        <div class="search-wrap" v-if="searchWrapShow" style="padding-bottom:50px;top:46px">
            <div class="history-list" v-if="historyList.length" ref="historyBox">
                <h2 class="title">{{$t('searchPage.searchHistory')}}</h2>
                <div class="search-items">
                    <div class="main-item">
                        <div class="item-info" v-for="(item, index) in historyList" :key="item" ref="searchItems">
                            <span @click="selectKeywords(item)">{{item}}</span>
                            <i class="van-icon van-icon-cross" @click="deleteHistory(index)"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="historyList.length ? 'search-content-w' : ''">
                <!--左边侧边栏-->
                <van-sidebar :active-key="activeKey" @change="onChange" class="badge-bar" :class="historyList.length ? 'has-history' : ''" ref="badgeBar">
                    <van-sidebar-item v-for="(area,index) in areaList" :key="index" :title="area" />
                </van-sidebar>
                <!--热门推荐的内容 默认显示热门推荐-->
                <recommend :data="recommendObj" :titleList="recommendObj.subTitle" v-if="activeKey === 0" @selectDetail="selectDetail"></recommend>
                <!--其他地区的推荐-->
                <country :data="countryObj" @selectDetail="selectDetail" @selectDetailKeyword="selectDetailKeyword" @selectDetailLine="selectDetailLine" v-else></country>
            </div>
        </div>
        <div class="search-result" v-if="searchResult">
            <template v-if="searchResultList.searchCategory.length">
                <h2 class="title">{{searchWords}} {{$t('searchPage.products')}}</h2>
                <square-tag :lists="searchResultList.searchCategory" @selectProductList="selectProductList"></square-tag>
            </template>
            <search-result :lists="searchResultList.searchProduct" @selectItem="selectProductInfo"></search-result>
        </div>
        <div v-if="searchLoading" style="padding-top:100px;">
            <loading-tr msg="哎呀，居然没有你想找的结果，换个词试试吧"></loading-tr>
        </div>
        <loading v-if="startLoading"></loading>
        <!-- 底部导航 -->
        <Tabbar :Index="1"></Tabbar>
    </div>
</template>

<script>
    import LayHeader from '@/components/header/search'
    import Recommend from '@/components/search/recommend'
    import Country from '@/components/search/country'
    import SquareTag from '@/components/tags/square'
    import Loading from '@/components/loading/index'
    import LoadingTr from '@/components/no-data'
    import SearchResult from '@/components/items/searchResult'
    import {
        getDestination,
        getAssociateSearch,
        postKeywordsCensus
    } from '@/api/search'
    import {
        setLocalStore,
        getLocalStore
    } from '@/assets/js/utils'
    import Tabbar from '@/components/tabbar'
    // 历史记录
    const SEARCH_HISTORY = '__tourscool_search_history__'

    export default {
        name: 'search',
        components: {
            LayHeader,
            Recommend,
            Country,
            Loading,
            SquareTag,
            SearchResult,
            LoadingTr,
            Tabbar,
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
                loading: this.$t('dataLoading'),
                startLoading: true, // 进入时加载是否显示
                historyList: [],
                active: 1, //底部导航栏tabbar显示索引值
            }
        },
        computed: {
            searchWrapShow() {
                // 第一次显示
                return !this.startLoading && JSON.stringify(this.searchResultList) === '{}' && !this.searchLoading
            },
            searchResult() {
                // 搜索的结果显示
                return JSON.stringify(this.searchResultList) !== '{}'
            },
            loadingStart() {
                // 第一个加载显示
                return this.startLoading
            },
            loadingSecond() {
                // 第二次加载显示
                return this.searchLoading
            },
        },
        watch: {
            searchWords(newValue) {
                if (!newValue) {
                    // 没有数据恢复原状
                    this.searchLoading = false
                    this.loading = this.$t('dataLoading')
                    this.isSearch = false
                } else {
                    this.isSearch = true
                }
                this.search()
            },
        },
        mounted() {
            this.init()
            this.getHistoryList()
        },
        methods: {
            //在线咨询
            contactCustom() {
              console.log('contactCustom');
              
            },
            // 滚动显示
            scrollFn() {
                if (this.historyList.length) {
                    let s1 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                    let height = this.$refs.historyBox.getBoundingClientRect().height
                    const h2 = this.$refs.badgeBar.$el.getBoundingClientRect().top
                    setTimeout(() => {
                        const s2 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                        const direct = s2 - s1
                        if (s1 === 0) {
                            // console.log('处于顶部')
                        } else if (direct > 0) {
                            // console.log('向下滚动')
                            if (s1 < height) {
                                this.$refs.badgeBar.$el.style.top = h2 - s1 + 'px'
                            }
                        } else if (direct < 0) {
                            if (s1 < height) {
                                this.$refs.badgeBar.$el.style.top = h2 - s1 + 'px'
                            }
                        }
                    }, 17)
                }
            },
            // 返回上一级
            leftClick() {
               let href = window.location.href.slice(-1)
                if(href == '#'){
                this.$router.go(-2)
                } else {
                this.$router.go(-1)
                }
            },
            onChange(key) {
                this.activeKey = key
                if (key) {
                    this.countryObj = this._nomalLizesAreaList(this.allData[key])
                }
            },
            // 获取页面需要的数据
            async init() {
                let {
                    data,
                    code
                } = await getDestination()
                if (code === 0) {
                    this.areaList = this._nomalLizeshowList(data)
                    this.allData = data
                    this._nomalLizesHotRecommend(data[0])
                    this.startLoading = false
                }
            },
            // 获取历史搜索数据
            getHistoryList() {
                this.historyList = getLocalStore(SEARCH_HISTORY) || []
            },
            // 删除历史搜索
            deleteHistory(index) {
                this.historyList.splice(index, 1)
                setLocalStore(SEARCH_HISTORY, this.historyList)
            },
            // 序列化数据
            _nomalLizeshowList(data) {
                let areaList = []
                for (let i = 0, len = data.length; i < len; i++) {
                    areaList.push(data[i].cityName)
                }
                return areaList
            },
            // 热门推荐序列化
            _nomalLizesHotRecommend(data) {
                const {
                    dataArray
                } = data
                this.recommendObj = {
                    lineList: dataArray[0].datas, //经典路线
                    hotPlace: dataArray[1].datas, //热门景点
                    hotTarget: dataArray[2].datas, //热门目的地
                    playWaysList: dataArray[3].datas, //top6玩法
                    subTitle: {
                        lineTitle: dataArray[0].title,
                        hotTitle: dataArray[1].title,
                        targetTitle: dataArray[2].title,
                        playTitle: dataArray[3].title,
                    },
                }
            },
            // 其他区域热门城市
            _nomalLizesAreaList(data) {
                let countryObj = {}
                let {
                    cityName,
                    dataArray
                } = data
                countryObj = {
                    cityName: cityName, // 城市的名字
                    title: dataArray[0].title, // title
                    allLines: dataArray[0].datas[0], // 总体线路
                    num: dataArray[0].datas.length, // 路线的数量
                    hotTargetTitle: dataArray[1].title, // 热门目的地名字
                    allAreaTitle: dataArray[2] && dataArray[2].title, // 全部目的地名字
                    hotTarget: dataArray[1].datas, // 热门目的地
                    allArea: dataArray[2] && dataArray[2].datas, // 全部目的地
                }
                return countryObj
            },
            // 搜索按钮
            searchList() {
                this.keywordStatistics(this.searchWords)
                this.saveLocal()
                this.getHistoryList()
                this.$router.push({
                    name: 'category-search',
                    params: {
                        category: 'all',
                        search: 'ya',
                    },
                    query: {
                        w: this.searchWords,
                        key: 1
                    },
                })
            },
            // 存储浏览记录
            saveLocal() {
                let historyList = getLocalStore(SEARCH_HISTORY) || []
                historyList.unshift(this.searchWords)
                let set = [...new Set(historyList)]
                // console.log(set)
                if (set.length >= 8) {
                    set = set.slice(0, 8)
                }
                setLocalStore(SEARCH_HISTORY, set)
            },
            // 历史记录到详情
            selectKeywords(key) {
                this.keywordStatistics(key)
                this.$router.push({
                    name: 'category-search',
                    params: {
                        category: 'all',
                        search: 'ya',
                    },
                    query: {
                        w: key,
                        key: 1,
                    },
                })
            },
            //
            selectProductInfo(productId) {
                this.$router.push({
                    name: 'product-detail',
                    query: {
                        productId,
                    },
                })
            },
            //
            searchStart() {
            
            },
            // search 关键词操作
            keywordStatistics(item) {
                if (item) {
                    let {
                        code,
                        msg
                    } = postKeywordsCensus(item)
                }
            },
            // 获取搜索字段
            queryChange(value) {
                this.searchWords = value
            },
            // 搜索关键字跳转列表
            selectProductList(type) {
                this.saveLocal()
                let _arr = ['ya', 'yg', 'yw', 'yj', 'ym', 'yr', '', 'yl']
                let query = {
                    w: this.searchWords,
                }
                this.$router.push({
                    name: 'category-search',
                    params: {
                        category: 'all',
                        search: _arr[type],
                    },
                    query,
                })
            },
            // 搜索执行
            async search() {
                if (this.searchWords) {
                    let {
                        code,
                        data
                    } = await getAssociateSearch(this.searchWords)
                    if (code === 0) {
                        this.searchLoading = false
                        this.loading = '数据加载中...'
                        this.searchResultList = {
                            searchCategory: data.category,
                            searchProduct: data.product,
                        }
                        if (!data.category.length && !data.product.length) {
                            // 搜索结果为空显示处理
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
            selectDetail(query, tag) {
                if (tag.jump_url && tag.jump_url == 2) {
                    this.$router.push(`/city_home/${tag.config_id}`)
                } else {
                    console.log(tag);
                    if(tag.span_city || tag.start_city){
                        let _cs = tag.span_city ? 'at' + tag.span_city : 'dc' + tag.start_city
                        this.$router.push(`/${tag.category}/ya-${_cs}?jd=1`)
                    } else {
                        this.$router.push(`/${tag.category || 'all'}/ya-pt${tag.product_type}?jd=1&pt=${tag.content}`)
                    }
                }
            },
            selectDetailLine(category) {
                this.$router.push({
                    name: 'category-search',
                    params: {
                        category: category,
                        search: 'ya',
                    },
                })
            },
            selectDetailKeyword(keyword) {
                this.$router.push({
                    name: 'category-search',
                    params: {
                        category: 'all',
                        search: 'ya',
                    },
                    query: {
                        w: keyword,
                    },
                })
            },
            selectCountryLine(item) {
                // console.log(item)
            },
        },
    }

</script>

<style type="text/scss" lang="scss" scoped>
.search-wrap {
  position: relative;
  z-index: 9;
  bottom: 0;
  .badge-bar {
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 180px;
    background-color: #f1f1f1;
    &.has-history {
      top: 212px;
    }
  }
  .search-content-w {
    padding-top: 124px;
  }
  .van-sidebar-item {
    padding: 32px 0;
    font-size: 28px;
    background-color: transparent;
    height: 100px;
    line-height: 36px;
    border: none;
  }
  .van-sidebar-item--select {
    background-color: #fff;
  }
  .search-main {
    flex: 1;
    padding: 20px 10px 0 210px;
    h2 {
      padding: 10px 0 20px 0;
      font-size: 28px;
      color: #9a9a9a;
    }
    .active {
      background-color: #00abf9;
      color: #fff;
    }
    .result-line {
      padding-top: 22px;
    }
  }
  .history-list {
    height: 124px;
    padding: 0 32px;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    background-color: #fff;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.14);
    .title {
      font-size: 24px;
      line-height: 44px;
      color: #bebebe;
      font-weight: 400;
      height: 44px;
    }
    .search-items {
      width: 100%;
      overflow: hidden;
      overflow-x: scroll;
      padding-bottom: 20px;
      .main-item {
        height: 60px;
        line-height: 20px;
        position: relative;
        white-space: nowrap;
      }
      .item-info {
        display: inline-block;
        background-color: #f1f1f1;
        color: #000;
        border-radius: 30px;
        margin-right: 10px;
        font-size: 24px;
        padding: 0 20px;
        line-height: 60px;
        i {
          vertical-align: text-top;
        }
      }
    }
  }
}
.search-result {
  padding: 0 14px 10px 32px;
  background-color: #fff;
  position: relative;
  top: 88px;
  z-index: 10;
  h2.title {
    padding: 32px 0 24px;
    font-size: 28px;
    font-weight: 400;
    color: #bebebe;
  }
}
</style>
<style>
    .search-wrap .van-sidebar-item__text {
        padding-left: 32px;
    }

    .search-wrap .van-sidebar-item--select .van-sidebar-item__text {
        border-left: 6px solid #399ef6;
    }

</style>
