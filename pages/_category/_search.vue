<template>
  <section class="product-list-page" ref="refprolistPage">
    <lay-header
      @leftClick="leftClick"
      :searchString="headerTitleShow"
      @search="searchKeywordsProduct"
      @query="queryChange"
      :isProductPage="!headerTitleShow"
    ></lay-header>
    <van-sticky>
      <tab-tags :items="filterTabs" @changeTag="changeFilterTag" v-if="(tourCityName && !$route.query.tb) || headerKeySearch || $route.query.cs"></tab-tags>
      <div v-if="!$route.query.bar">
        <van-dropdown-menu active-color="#02ACF9">
          <van-dropdown-item v-model="sortResult" :options="sortTypes" ref="sortTypesDropdown" />
          <van-dropdown-item :title="filteryTitleName('目的地', 'departure_city', '全部')" 
            @close="closeDropdown()" 
            v-if="(allDestination.length && searchParams.type != 'cruise') && (searchParams.type != 'local_play' || !searchParams.tour_city)" 
            ref="destinationDropdown" v-cloak>
            <div class="dropdown-select-box">
              <div v-for="destination in allDestination" 
                :key="'departure_city' + destination.id" :class="filterActive(destination.id, 'departure_city')"
                @click="getProductNum(destination, 'departure_city')">
                {{destination.name}}
              </div>
            </div>
            <div class="btn-ocr">
              <van-button class="cancel" :class="selectedObj.departure_city ? 'disable': ''" :disabled="!selectedObj.departure_city"
                @click="cancelSelected('departure_city', 'allDestination')">清空</van-button> 
              <van-button class="sure" :loading="loadingNum" type="info" loading-text="加载中..." @click="changeSelectProduct()">查看{{productTotal}}条产品</van-button>
            </div>
          </van-dropdown-item>
          <van-dropdown-item :title="filteryTitleName('航线', 'lines', '')" v-if="linesYlList.length" ref="linesDropdown" @close="closeDropdown()">
            <div class="dropdown-select-box">
              <div v-for="lines in linesYlList" :key="lines.id" :class="filterActive(lines.id, 'lines')"
                @click="getProductNum(lines, 'lines')">
                {{lines.name}}
              </div>
            </div>
            <div class="btn-ocr">
              <van-button class="cancel" :class="selectedObj.lines? 'disable': ''" @click="cancelSelected('lines', 'linesYlList')" :disabled="!selectedObj.lines">清空</van-button>
              <van-button class="sure" type="info" :loading="loadingNum" loading-text="加载中..." @click="changeSelectProduct()">查看{{productTotal}}条产品</van-button>
            </div>
          </van-dropdown-item>
          <van-dropdown-item :title="filteryTitleName('行程天数', 'duration', '')" v-if="durationList.length && searchParams.type != 'local_play'" ref="durationDropdown" @close="closeDropdown()">
            <div class="dropdown-select-box">
              <div v-for="duration in durationList" :key="'duration' + duration.id" :class="filterActive(duration.id, 'duration')"
                @click="getProductNum(duration, 'duration')">
                {{duration.name}}
              </div>
            </div>
            <div class="btn-ocr">
              <van-button class="cancel" :class="selectedObj.duration? 'disable': ''" @click="cancelSelected('duration', 'durationList')" :disabled="!selectedObj.duration">清空</van-button>
              <van-button class="sure" type="info" :loading="loadingNum" loading-text="加载中..." @click="changeSelectProduct()">查看{{productTotal}}条产品</van-button>
            </div>
          </van-dropdown-item>
          <div class="fileter-list-show" @click="startChangeFilters(false)" v-if="filterRightList.length">
            筛选 <img src="../../assets/imgs/icon_fileter@2x.png" width="8" alt="">
          </div>
        </van-dropdown-menu>
      </div>
    </van-sticky>
    <div class="classify-box" v-if="filterTabsSub.length">
      <div class="main">
        <div v-for="tabsSub in filterTabsSub" 
          :key="'tabsSub' + tabsSub.id" 
          :class="filterActiveSub(tabsSub.id)"
          @click="changeFilterTabsSub(tabsSub.id)">
          {{tabsSub.title}}
        </div>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="refresh-box">
        <van-list v-model="prodLoading" :finished="prodFinished" :finished-text="$t('noMore')" @load="onLoad" :immediate-check="false" ref="refProductList">
          <div v-for="item in productList" :key="item.product_id" class="product-main">
            <product-list :data="item" @selectItem="selectProductDetail"></product-list>
          </div>
        </van-list>
        <div v-if="isShowSkeleton">
          <div class="product-main" v-for="n in 4" :key="'skeleton' + n">
            <div class="item-ske">
              <van-skeleton avatar-shape="square" avatar-size="100px" title avatar :row="3"/>
            </div>
          </div>
        </div>  
      </div>
    </van-pull-refresh>
    <!--更多列表的选择-->
    <van-popup v-model="showList" position="right" class="filter-select" @click-overlay="closeDropdown()">
      <div class="content-fls-c">
        <div class="box-ct">
          <template v-for="fileter in filterRightList">
            <div :key="fileter.key" v-if="fileter.items.length">
              <div class="title">
                {{fileter.value}} 
                <span v-if="fileter.items.length > 6 && fileter.items.length < 16" @click="changeShowAll(fileter)" :class="fileter.isAll ? 'turn-up':''">
                  {{fileter.isAll ? '收起':'展开'}}
                  <van-icon name="play" />
                </span>
              </div>
              <div class="main-box" :style="{'max-height': fileter.isAll ? 'none': ''}">
                <template v-for="(item, index) in fileter.items">
                  <template v-if="fileter.items.length < 16">
                    <div :key="fileter.value + item.id" :class="filterActive(item.id, fileter.key)" @click="getProductNum(item, fileter.key)">
                      {{item.name}}
                    </div>
                  </template>
                  <template v-else>
                    <div :key="fileter.value + item.id" :class="filterActive(item.id, fileter.key)" @click="getProductNum(item, fileter.key)" v-if="index < 5">
                      {{item.name}}
                    </div>
                  </template>
                </template>
                <div class="more" v-if="fileter.items.length > 15" @click="changeShowAll(fileter)">
                  查看更多
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="bottom">
          <van-button class="cancel" @click="cancelSelected()" :class="isClearData? 'disable': ''" :disabled="!isClearData">清空</van-button>
          <van-button class="sure" type="info" :loading="loadingNum" loading-text="加载中..." :class="!productTotal? 'disable': ''" @click="changeSelectProduct()" :disabled="!productTotal">查看{{productTotal}}条产品</van-button>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="moreLists" position="right" class="filter-select">
      <div class="content-fls-c">
        <div class="box-ct">
          <van-index-bar highlight-color="#00ABF9">
            <template v-for="(value, key) in cityList">
              <div :key="key" class="city-list">
                <van-index-anchor :index="key" />
                <van-cell v-for="n in value" :key="'city-list' + n.name" :title="n.name" :class="filterActive(n.id, currentCityKey)" @click="getProductNum(n, currentCityKey)"/>
              </div>
            </template>
          </van-index-bar>
        </div>
        <div class="bottom">
          <van-button class="cancel" @click="cancelSelected(currentCityKey)" :class="selectedObj[currentCityKey] ? 'disable': ''" :disabled="!selectedObj[currentCityKey]">清空</van-button>
          <van-button class="sure" type="info" :loading="loadingNum" loading-text="加载中..." @click="changeSelectProduct()">查看{{productTotal}}条产品</van-button>
        </div>
      </div>
    </van-popup>
    <drift-aside class="drift"></drift-aside>
  </section>
</template>
<script>
import LayHeader from '@/components/header/search'
import playItem from '@/components/search/playItem'
import routerItem from '@/components/search/routerItem'
import ProductList from '@/components/list/productList'
import tabTags from '@/components/tags/tabs'
import CityList from '@/components/list/cityList'
import {getProductList, getNewFilterList, getFilterstotal} from '@/api/products'
import {getmenuSearch, postKeywordsCensus} from '@/api/search'
import DriftAside from '@/components/drift_aside'
import {getParams, changeParams, removeOrAddStr} from '@/assets/js/utils'
import {LIST_PARAMS} from '@/assets/js/config'
import Loading from '@/components/loading'
import {TAB_PARAMS} from '@/assets/js/consts/products'

export default {
   async asyncData({params, query, $axios, store,redirect}){
    let {category,search = ''} = params
    let {page = 1, sem = '0', w = null, sale = null, sp = null, ids = null, key = null, ory = null, or = null} = query
    if(search.indexOf('y')==-1){
      let urlNeu = '/'+category+'/ya'
      redirect(urlNeu) 
    }
    let getSearch = {}
    if(search){
      getSearch = getParams(search)
    }
    getSearch.category = category
    if(ids){
      getSearch.product_id = ids
    }
    if(sale){
      getSearch.reduce = sale
    }
    if(sp){
      getSearch.is_special = sp
    }

    return {
      searchKeyWords: w, // 关键字
      searchType:sem,
      currentPage: page,
      searchParams: getSearch,
      categoryId: category,
      filterResult: {
        ...getSearch
      },
      headerKeySearch: key, // 关键字搜索
      orderSort: {
        order_by: ory,
        order: or
      }
    }
  },
  components: {
    LayHeader,
    ProductList,
    playItem,
    CityList,
    routerItem,
    DriftAside,
    Loading,
    tabTags
  },
  data() {
    return {
      prodPagination: {}, // 分页数据
      prodLoading: false, // 是否处于加载状态，加载过程中不触发load事件
      prodFinished: false, // 是否已加载完成，加载完成后不再触发load事件
      productList: [], // 产品列表数据
      showList: false, // 更多列表的选择
      sortResult: 'default:desc', // 排序的选择条件
      startCity: [],
      submitserData:null,//跳转存储数据
      checkrouter:0,
      lines:{},
      //  2019年12月23日14:14:19
      isLoading: false,
      filterTabs: [],
      typeString: '',
      moreLists: false, // 更多的列表
      sortTypes: [], // 排序数组
      durationList: [], // 天数日期
      filterRightList: [], // 筛选列表数据处理
      cityList: [],
      allDestination: [],
      linesYlList: [], // 航线
      lodingText: '加载中...',
      filterTabsSub: [],
      selectedObj: {},
      loadingNum: false,
      productTotal: 0,
      tourCityName: '',
      headerTitleShow: '',
      subType: [], // 二级副标题
      currentCityKey: '', //
      isShowSkeleton: true,
    }
  },
  computed: {
    isClearData(){
      let {departure_city, duration, stop_city, span_city, price, lines, brand} = this.selectedObj
      return departure_city || stop_city || span_city || price || lines || brand
    },
  },
  watch:{
    $route:{
      handler(){
        let {query} = this.$route
        let lx = query.lx
        this.changeSelectedObj()
        if(lx) {
          this.subType = lx.split(',')
        }
        if(query.ory) {
          this.sortResult = `${query.ory}:${query.or}`
        }
        this.getFilterList()
        this.searchGetProduct()
      },
      immediate:true
    },
    sortResult(newValue, oldValue) {
      if(oldValue) {
        if(newValue != oldValue){
          this.changeRouter()
          this.prodPagination.page = 0
          this.productList = []
        }
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollFn)
    this.changeSelectedObj()
  },
  destroyed() {
    // 移除监听
    window.removeEventListener('scroll', this.scrollFn)
  },
  methods:{
    filteryTitleName(name, type, other){
      let value = this.searchParams[type] || ''
      let len = value.split(',').length
      return value ? `${name}${len}` : `${other}${name}`
    },
    // 二级副标题搜索
    async changeFilterTabsSub(id){
      if(!this.isLoading) {
        let index = this.subType.indexOf(id)
        if(index >= 0) {
          this.subType.splice(index, 1)
        } else {
          this.subType.push(id)
        }
        this.prodPagination.page = 0
        await this.searchGetProduct(true)
      }
    },
    filterActiveSub(id){
      return this.subType.indexOf(id) >= 0 ? 'current' : ''
    },
    // 开始筛选
    startChangeFilters(type) {
      this.showList = !type
      this.$refs.sortTypesDropdown && this.$refs.sortTypesDropdown.toggle(false)
      this.$refs.destinationDropdown && this.$refs.destinationDropdown.toggle(false)
      this.$refs.durationDropdown && this.$refs.durationDropdown.toggle(false)
      this.$refs.linesDropdownDropdown && this.$refs.linesDropdownDropdown.toggle(false)
    },
    // 筛选项重置
    changeSelectedObj() {  
      let {departure_city = '', duration = '',stop_city = '', span_city = '', price = '', lines = '', brand = ''} = this.searchParams
      this.selectedObj = {
        departure_city, duration, stop_city, span_city, price, lines, brand
      }
    },
    // 搜索
    async onRefresh(){
      this.prodPagination.page = 0
      // this.productList = []
      await this.searchGetProduct(true)
    },
    searchKeywordsProduct() {
      let {query} = this.$route
      if(query.w != this.searchKeyWords) {
        this.keywordStatistics(this.searchKeyWords)
        this.prodPagination.page = 0
        this.productList = []
        this.changeRouter(true, 'cs')
      }
    },
    // 返回上一级
    leftClick() {
      if(this.searchType > 0) {
        this.$router.push({
          path: '/'
        })
      } else {
        let href = window.location.href.slice(-1)
        if(href == '#'){
          this.$router.go(-2)
        } else {
          this.$router.go(-1)
        }
      }
    },
    // 改变关键字
    queryChange(value) {
      this.searchKeyWords = value
    },
    onLoad(){
      this.searchGetProduct()
    },
    changeFilterTag(list, index) {
      let {category, tour_city} = this.searchParams
      let _url = changeParams({category, tour_city, type: list.id}).split('/')
      this.$router.push({
        name: 'category-search',
        params:{
          category: this.categoryId,
          search: _url[2]
        },
        query: this.$route.query
      })
    },
    // 关闭下拉框
    closeDropdown() {
      this.changeSelectedObj() 
      this.getFilterstotal()
    },
    // 改变搜索条件
    getProductNum(item, key, data){
      let newValue
      if(key == 'price') {
        newValue = this.selectedObj.price == item.id ? '' : item.id + ''
      } else {
        if(this.selectedObj[key]){
          let _arr = this.selectedObj[key].split(',')
          let id = item.id + ''
          let index = _arr.indexOf(id) 
          if(index >= 0){
            _arr.splice(index, 1)
          } else {
            _arr.push(id)
          }
          newValue = _arr.join(',')
        } else {
          newValue = item.id + ''
        }
      }
      this.$set(this.selectedObj, key, newValue)
      this.getFilterstotal()
    },
    // 清除数据
    cancelSelected(key, data){
      if(key) {
        this.$set(this.searchParams, key, '')
        this.$set(this.selectedObj, key, '')
      } else {
        let {duration} = this.selectedObj
        this.selectedObj = {}
        if(duration) {
          this.$set(this.selectedObj, 'duration', duration)
        }
        let {category, tour_city,type} = this.searchParams
        this.searchParams = {category, tour_city,type}    
      }
      this.getFilterstotal()
      this.changeRouter()
    },
    // search 关键词操作统计
    keywordStatistics(item) {
      if (item) {
        postKeywordsCensus(item)
      }
    },
    // 初始化筛选列表
    async getFilterList() {
      let subParams = {
        ...this.searchParams,
        keyword: this.searchKeyWords || null,
        ...this.orderSort
      }
      let {code, data = {}} = await getNewFilterList(subParams)
      if (code === 0) {
        let {departure_city, duration, filter_sort, filter_tabs, price, span_city, stop_city, filter_tabs_sub, lines, tour_city,brand,type_name} = data
        this.sortTypes = this._nomolaizfilter(filter_sort.items) // 综合排序
        this.filterTabs = (filter_tabs && filter_tabs.items) || [] // tabs标签
        this.durationList = (duration && duration.items) || []
        this.allDestination = (departure_city && departure_city.items) || [] // 全部目的地
        this.filterTabsSub = (filter_tabs_sub && filter_tabs_sub.items) || []
        this.linesYlList = (lines && lines.items) || []
        this.tourCityName = tour_city || ''
        this.filterRightList = [
          {
            key: 'departure_city',
            value: this.showTitle('start_city'),
            items: (departure_city && departure_city.items) || [],
            pinyin: (departure_city && departure_city.pinyin ) || [],
            isAll: false
          },
          {
            key: 'stop_city',
            value: this.showTitle('stop_city'),
            items: (stop_city && stop_city.items) || [],
            pinyin: (stop_city && stop_city.pinyin) || [],
            isAll: false
          },
          {
            key: 'span_city',
            value: this.showTitle('span_city'),
            items: (span_city && span_city.items) || [],
            pinyin: (span_city && span_city.pinyin) || [],
            isAll: false
          },
          {
            key: 'brand',
            value: this.showTitle('brand'),
            items: (brand && brand.items) || [],
            isAll: false
          },
          {
            key: 'price',
            value: this.showTitle('price'),
            items: (price && price.items) || [],
            isAll: false
          }
        ]  // 右边筛选列表
        if(this.$route.query.tb) {
          let bar = this.$route.query.bar
          this.headerTitleShow = bar || tour_city + type_name
        } else if(this.headerKeySearch) {
          this.headerTitleShow = ''
        } else {
          this.headerTitleShow = tour_city || (this.tourCityName + (type_name || ''))
        }
      }
    },
    // 请求产品总数
    async getFilterstotal() {
      let _params = {
        keyword: this.searchKeyWords || null,
        ...this.searchParams,
        ...this.selectedObj
      }
      let {code, data} = await getFilterstotal(_params)
      if(code === 0) {
        this.productTotal = data.total
      }
    },
    // 处理排序的字段名字
    _nomolaizfilter(data){
      data.forEach(item => {
        item.text = item.name
        item.value = item.key
      })
      return data
    },
    changeShowAll(fileter) {
      if(fileter.items.length > 15) {
        this.moreLists = true
        this.cityList = this._nomalLizePinyin(fileter.pinyin)
        this.currentCityKey = fileter.key
      } else {
        fileter.isAll = !fileter.isAll
      }
    },
    // 数据请求
    async searchGetProduct(refresh){
      this.isLoading = true
      let {query} = this.$route
      let _params = {
        sub_type: this.subType.toString(),
        keyword: this.searchKeyWords || null,
        ...this.searchParams,
        ...this.selectedObj,
        order_by: query.ory,
        order: query.or,
        page: (this.prodPagination.page || 0) + 1
      }
      const {data,code,pagination} = await getProductList(_params)
      if(code === 0){
        if(refresh) {
           this.productList = data
           this.prodFinished = false
        } else {
          let findOne = this.productList.some(item => {
            return item.product_id == (data[0] && data[0].product_id)
          })
          if(!this.productList[0] || !findOne){
            this.productList.push(...data)
          }
        } 
        this.productTotal = pagination.total_record
        this.prodPagination = pagination
        // 加载状态结束
        this.prodLoading = false
        // 数据全部加载完成
        if (!this.prodPagination.more) {
          this.prodFinished = true
        }
      }
      this.isShowSkeleton = !this.productList.length && !this.prodFinished
      this.isLoading = false
    },
    // 显示title
    showTitle(name) {
      let obj = {
        start_city:this.$t('productListPage.startCity'),
        span_city: this.$t('productListPage.spanCity'),
        stop_city: this.$t('productListPage.stopCity'),
        duration: this.$t('productListPage.duration'),
        lines: this.$t('routerSel'),
        price: this.$t('productListPage.budgetPrice'),
        product_type: this.$t('productListPage.productType'),
        brand: this.$t('brandx')
      }
      return obj[name]
    },
    // 展示显示的name
    selectNameShow(key) {
      let name = ''
      if(key === 'span_city') {
        // 多选
        let selectArr = []
        if(this.filterResult[key]) {
          this.filterLists[key].items.forEach(item => {
            let _arr =  this.filterResult[key].split(',')
            if(_arr.indexOf(item.id + '') >= 0){
              selectArr.unshift(item.name)
            }
          })
          name = selectArr.length > 3 ? selectArr.splice(0,3).toString() + '...' : selectArr.toString()
        }
      } else {
        // 单选
        this.filterLists[key].items.forEach(item => {
          if(this.filterResult[key] == item.id){
            name = item.name
          }
        })
      }
      return name
    },
    // 视觉判断tag是否选中
    filterActive(id, key) {
      id = id + ''
      let value = this.selectedObj[key] || ''
      let p = key == 'price' ? 'price' : ''
      let cu = value.split(',').indexOf(id) >= 0 ? 'current': ''
      return `${p} ${cu}`
    },
    // 搜索数据
    changeSelectProduct() {
      let data = {
        ...this.searchParams,
        ...this.selectedObj
      }
      this.searchParams = data
      this.changeRouter()
    },
    selectProductDetail(productId){
      this.$router.push({
        name: 'product-detail',
        query: {
          productId
        }
      });
    },
    // 数据变化引起导航变化
    changeRouter(keyword, typeLocal){
      let _url = changeParams(this.searchParams)
      let query = JSON.parse(JSON.stringify(this.$route.query))
      console.log(_url, this.$route.path);
      let _s = this.sortResult.split(':')
      let _urlArr = _url.split('/')
      query.ory = _s[0] || null
      query.or = _s[1] || null
      if(keyword) {
        if(!this.searchKeyWords){
          delete query.w
        } else {
          query.w = this.searchKeyWords
        }
      }
      if(typeLocal) {
        query.cs = 1
      }
      this.$router.replace({
        name: 'category-search',
        params:{
          category: _urlArr[1],
          search: _urlArr[2]
        },
        query
      })
      this.startChangeFilters(true)
    },
    // 格式化拼音列表
    _nomalLizePinyin(data) {
      let len = data.length
      let obj = {}
      data.sort((a, b) => {
        if(a.key && b.key) {
          return a.key.charCodeAt(0) - b.key.charCodeAt(0)
        }
      })
      for(let i= 0; i<len; i++) {
        if(!obj[data[i].key] && data[i].key != null) {
          obj[data[i].key] = []
        }
        if(data[i].key) {
          obj[data[i].key].push({...data[i]})
        }
      }   
      return obj
    }
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
.product-list-page{
   background: #F2F7F9;
   min-height: 100vh;
  .refresh-box{
    min-height: calc(100vh - 88px);
  }
  .product-main{
    padding: 20px 32px 0 32px;
    .item-ske{
      background: #fff;
      padding: 20px;
      border-radius:20px;
    }
  }
}
.dropdown-select-box{
  padding: 0 14px 0 32px;
  background: #fff;
  font-size: 24px;
  margin-top: 20px;
  max-height: 384px;
  overflow: hidden;
  overflow-y: auto;
  & > div{
    width: 160px;
    height: 48px;
    background: #F2F7F9;
    border-radius: 8px;
    text-align: center;
    display: inline-block;
    color: #AEAEAE;
    font-weight: 400;
    font-size: 24px;
    line-height: 48px;
    margin: 0 16px 16px 0;
    overflow: hidden;
    &.current{
      background: #00ABF9;
      color: #fff;
    }
  }
}
.btn-ocr{
  text-align: center;
  font-size: 28px;
  padding:40px 0;
  button{
    width: 280px;
    height: 60px;
    line-height: 50px;
    border-radius: 44px;
    margin: 0 20px;
    display: inline-block;
  }
  .cancel{
    background: #F3F3F3;
    color: #AEAEAE;
  }
  .sure{
    background: #00ABF9;
    color: #fff;
  }
  .disable{
    background: #fff;
    border: 1px solid #AEAEAE;
    color: #2d2d2d;
  }
}
.fileter-list-show{
  font-size: 28px;
  align-self: center;
  text-align: center;
  flex: 1;
  img{
    vertical-align: middle;
  }
}
.filter-select{
  width: 75%; 
  height: 100%;
  .content-fls-c{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    padding-bottom: 120px;
    .title{
      padding: 20px 32px;
      line-height: 40px;
      font-size: 28px;
      font-weight: bold;
      span{
        float: right;
        font-size: 24px;
        font-weight: normal;
        color: #00ABF9;
        i{
          transition: all 0.3s;
        }
        &.turn-up{
          i{
            transform: rotate(-90deg)
          }
        }
      }
      i{
        transform:rotate(90deg);
        &.up{
          transform:rotate(-90deg);
        }
      }
    }
    .main-box{
      padding-left: 32px;
      display: flex;
      flex-flow: wrap;
      max-height: 128px;
      overflow: hidden;
      & > div{
        width: 160px;
        height: 48px;
        background: #F2F7F9;
        border-radius: 8px;
        text-align: center;
        color: #AEAEAE;
        font-weight: 400;
        font-size: 22px;
        line-height: 48px;
        margin: 0 16px 16px 0;
        overflow: hidden;
        &.current{
          background: #00ABF9;
          color: #fff;
        }
        &.more{
          color: #00ABF9;
        }
        &.price{
          width: 240px;
        }
      }
    }
  }
  .bottom{
    height: 120px;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 -4px 8px rgba(27,52,71,0.1);
    display: flex;
    padding: 30px 0;
    justify-content: space-around;
    background: #fff;
    button{
      width: 240px;
      height: 60px;
      line-height: 58px;
      border-radius: 44px;
      font-size: 28px;
      padding: 0 10px;
    }
    .cancel{
      background: #F3F3F3;
      color: #AEAEAE;
    }
    
    .sure{
      background: #00ABF9;
      color: #fff;
    }
    .disable{
      background: #fff;
      border: 1px solid #AEAEAE;
      color: #2d2d2d;
    }
  }
  .city-list{
    .current {
      color: #00ABF9;
    }
  }
}
.classify-box{
  height: 88px;
  padding: 20px 0;
  overflow: hidden;
  .main {
    position: relative;
    display: flex;
    overflow: hidden;
    overflow-x: auto;
    height: 100%;
    & > div {
      height: 48px;
      left: 48px;
      border-radius: 44px;
      border: 2px solid #00ABF9;
      color: #00ABF9;
      font-size: 24px;
      line-height: 44px;
      margin-left: 16px;
      text-align: center;
      padding: 0 14px;
      &.current{
        background: #00ABF9;
        color: #fff;
      }
    }
  }
}
</style>