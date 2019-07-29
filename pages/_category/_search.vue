<template>
  <section class="product-list-page" ref="refprolistPage">
    <lay-header
      :searchKeyWords="searchKeyWords"
      :isSearch="false"
      @query="queryChange"
      @leftClick="leftClick"
      :isProductList="true"
      :serachtype="searchType"
    ></lay-header>
    <!--主要内容-->
    <div class="list-wrap">
      <div class="tabs-box">
        <van-tabs v-model="active" @click="changeTypeClick">
          <template v-for="item in tagsList">
            <van-tab :title="item.title" :key="item.type">
              <!--<van-pull-refresh v-model="prodLoading" @refresh="onRefresh">-->
              <!--</van-pull-refresh>-->
              <van-list v-model="prodLoading" :finished="prodFinished" :finished-text="$t('noMore')" @load="onLoad" :immediate-check="false">
                <template>
                  <div class="filter-box">
                    <div class="sort-left all-px" :style="showcolor=='sort'?'':'color:#3c3c3c'" @click="sortChange">
                      {{sortResult.name}}
                      <van-icon name="arrow-down" />
                    </div>
                    <div class="sort-left" :style="showcolor=='type'?'':'color:#3c3c3c'" @click="typeChange" v-if="active === 2">
                      {{$t('typex')}}
                      <van-icon name="arrow-down" />
                    </div>
                    <div class="sort-left" :style="showcolor=='router'?'':'color:#3c3c3c'" v-if="active === 4" @click="routerChange">
                      {{$t('routerSel')}}
                      <van-icon name="arrow-down" />
                    </div>
                    <div class="sort-left" :style="showcolor=='day'?'':'color:#3c3c3c'" @click="dayChange" v-if="active !== 2">
                      {{$t('productListPage.duration')}}
                      <van-icon name="arrow-down" />
                    </div>
                    <div class="right" @click="filterSelect">
                      {{$t('screen')}}
                      <van-icon name="filter-o" />
                    </div>
                  </div>
                </template>
                <template v-if="productList.length">
                  <van-cell v-for="item in productList" :key="item.product_id + Math.random()">
                    <product-list :data="item" @selectItem="selectProductDetail" :showTag="active === 0"></product-list>
                  </van-cell>
                </template>
              </van-list>
            </van-tab>
          </template>
        </van-tabs>
      </div>
    </div>
    <!--筛选排序-->
    <van-popup v-model="showFilter" position="right" class="filter-select">
      <div class="filter-main-box" @click="showFilter = false">
      </div>
      <div class="filter-content">
        <div class="filter-list">
          <div class="filter-items" v-for="(item, key) in filterLists" :key="key">
            <template v-if="key!='duration' && key!='lines'">
              <div class="cell-list" v-if="item.total">
                <div class="left">{{showTitle(key)}}</div>
                <div class="right" @click="showMoreFilter(key, item)">
                  <span class="text">{{selectNameShow(key)}} </span>
                  <i class="van-icon van-icon-arrow" :ref="'filter' + key" v-if="item.total > 6"> </i>
                </div>
              </div>
              <div class="filter-tags" :ref="'tags' + key">
                <div class="item"
                     v-for="(city,index) in item.items"
                     :key="city.name"
                     :class="filterActive(city.id, key)"
                     @click="filterClick(city, key, index)" :ref="key + currentType">{{city.name}}</div>
              </div>
            </template>
          </div>
          <div v-if="!isShowFilterBtn" class="no-data">没有搜索到数据</div>
        </div>
      </div>
      <div class="bottom-btn">
        <div class="left" @click="resetFilter">{{$t('reset')}}</div>
        <div class="right" @click="againSearch">{{$t('chosen')}}</div>
      </div>
    </van-popup>
    <!--排序条件搜索-->
    <div class="sort-box" v-if="sortShow">
      <sort-item :sortShow="sortShow" :sortResult="sortResult" @selectSort="selectSortItem" @close="sortShow = false"></sort-item>
    </div>
    <!--类别条件搜索-->
    <div class="sort-box" v-if="typeShow">
      <play-item :dayShow="typeShow" :checkitem="checktype" @selectSort="selectTypeItem" @close="typeShow = false"></play-item>
    </div>
    <!--行程天数搜索-->
    <div class="sort-box" v-if="dayShow && (filterLists.duration && filterLists.duration.total)">
      <day-item :dayShow="dayShow" :checkitem="filterResult.duration" :dayResult="filterLists.duration" @selectSort="selectDayItem" @close="dayShow = false"></day-item>
    </div>
    <!--航线搜索-->
    <div class="sort-box" v-if="routerShow && (filterLists.lines && filterLists.lines.total)">
      <router-item :dayShow="routerShow" :checkitem="Number(checkrouter)" :dayResult="filterLists.lines" @selectSort="selectRouterItem" @close="routerShow= false"></router-item>
    </div>
    <!--更多列表的选择-->
    <van-popup v-model="showList" position="right" class="filter-select more-tag">
      <div class="filter-main-box" @click="showList = false"></div>
      <city-list :multiple="multipleTag" :showBar="true" :dataObj="moreLists" @selectItemCancel="selectItemCancel" @selectItem="selectItem" ref="moreList" @back="moreListBack"></city-list>
    </van-popup>
    <drift-aside class="drift"></drift-aside>
  </section>
</template>

<script>
import LayHeader from '@/components/header/search'
import sortItem from '@/components/search/sortItem'
import dayItem from '@/components/search/dayItem'
import playItem from '@/components/search/playItem'
import routerItem from '@/components/search/routerItem'
import ProductList from '@/components/list/productList'
import CityList from '@/components/list/cityList'
import {getProductList, getFilterList} from '@/api/products'
import {getmenuSearch} from '@/api/search'
import DriftAside from '@/components/drift_aside'
import {getParams,changeParams} from '@/assets/js/utils'
import {LIST_PARAMS} from '@/assets/js/config'
export default {
   async asyncData({params, query, $axios, store}){
      // 路由进来则会请求数据
      // tj 途径景点；cf 出发城市; js 结束城市; sj 行程天数；jg 价格预算；page 为当前的页数
      // cf29-tj143_131-js32
      // yg 当地跟团 type 1；yw 当地玩乐 type 2；yj稀饭自营 type 3 ；yl 游轮 type 7；ym 门票演出 4; yr 一日游 5
    let {category,search = ''} = params
    let {page = 1, sem = '0', w = null} = query

    let getSearch
     if(search){
       getSearch = getParams(search)
     }
    getSearch.category = category
    let active = 0
    let checktype = 2
    // let {code, data} =await $axios.$get('/api/products', {
    //   params: getSearch,
    //   headers: {
    //     'Language': store.getters.language,
    //     'Currency': store.getters.currency
    //   }
    // })
    if(getSearch.type) {
      if(getSearch.type === 7) {
        active = 4
      } else if(getSearch.type === 4 || getSearch.type === 5){
        active = 2
        checktype = getSearch.type
      } else {
        active = getSearch.type
      }
    }
    return {
      searchKeyWords: w, // 关键字
      searchType:sem,
      currentPage: page,
      searchParams: getSearch,
      active,
      checktype,
      categoryId: category
    }
  },
  components: {
    LayHeader,
    ProductList,
    playItem,
    sortItem,
    CityList,
    routerItem,
    DriftAside,
    dayItem
  },
  data() {
    return {
      // searchKeyWords: this.$route.query. || null,
      criteria: {}, // 筛选条件数据
      prodPagination: {}, // 分页数据
      prodLoading: false, // 是否处于加载状态，加载过程中不触发load事件
      prodFinished: false, // 是否已加载完成，加载完成后不再触发load事件
      productList: [], // 产品列表数据
      showFilter: false, // 显示筛选条件
      showList: false, // 更多列表的选择
      sortResult:{id:1, order: '', order_by: '', name:this.$t('productListPage.sortDefault')}, // 排序的选择条件
      sortShow: false,
      filterLists: {},
      startCity: [],
      filterResult: {
        product_type: null,
        category: null,
        span_city: null,
        start_city: null,
        duration: null,
        brand: null,
      }, // 筛选的结果
      activeNames: ['1'],
      moreLists: {}, // 更多的列表
      moreListsTitle: '',
      sureSearchList: {
        start_city: [],
        lines:[],
        stop_city: [],
        price: [],
        span_city: [],
        // tag: [], 不要行程特色
        duration: [],
        product_type: [],
        category: [],
        brand: [],
      },
      isFilterShow: false,
      firstload:true,
      submitserData:null,//跳转存储数据
      menu:null,
      dayShow:false,
      showcolor:'sort',
      typeShow:false,
      routerShow:false,
      checkrouter:0,
      lines:{
        items: [{line_id: "15", line_name: "东亚航线"}],
        sort: 5,
        total: 1,
      },
    }
  },
  computed: {
    multipleTag() {
      return this.moreLists.type !== 'start_city' && this.moreLists.type !== 'stop_city'
    },
    // 是否显示筛选按钮
    isShowFilterBtn(){
      return Object.values(this.filterLists).some(item => {
        return item.total > 0
      })
    }
  },
  watch:{
    $route:{
      handler(){
        this.getFilterList()
        this.searchGetProduct(this.searchParams)
      },
      immediate:true
    }
  },
  created() {
    console.log('進來了')
    this.sortTypes = [
      {id:1, order: '', order_by: '', name: this.$t('productListPage.sortDefault')},
      {id:2, order: 'asc', order_by: 'price', name: this.$t('productListPage.sortPriceLowToHigh')},
      {id:3, order: 'desc', order_by: 'price', name: this.$t('productListPage.sortPriceHighToLow')},
      {id:4, order: '', order_by: 'sales', name:this.$t('productListPage.sortPopular')}
    ]
    this.tagsList = [
      {id:10,type: 0,title:this.$t('tours.torusRecommend')},
      {id:1,type: 1,title: this.$t('tours.localGroup')},
      {id:2,type: 2,title: this.$t('tours.localPlay')},
      {id:0,type: 3,title: this.$t('tours.exquisiteGroup')},
      {id:6,type: 7,title: this.$t('tours.cruise')},
    ];
  },
  methods:{
    // 返回上一级
    leftClick() {
      if(this.searchType=='1'){
        this.$router.push({
          path: '/'
        })
      } else{
        this.$router.go(-1)
      }
    },
    // 改变关键字
    queryChange(value) {
      this.searchKeyWords = value
    },
    onLoad(){
      let submitParams = {
        page: (this.prodPagination.page || 0) + 1,
        order_by: this.sortResult.order_by || null,
        order: this.sortResult.order || null,
        keyword: this.searchKeyWords || null,
        brand: this.filterResult.brand || null,
        ...this.searchParams
      }

      this.searchGetProduct(submitParams)
    },
    changeTypeClick(name, title){
      //ya 所有； yg 当地跟团 type 1；yw 当地玩乐 type 2；yj稀饭自营 type 3 ；yl 游轮 type 7
      let {category,search} = this.$route.params
      let _type = ['ya', 'yg','yw','yj','yl']
      let _newSearch
      if(search.length === 2) {
        _newSearch = _type[name]
      } else {
        _newSearch = _type[name] + search.substring(2)
      }
      if(_newSearch.indexOf('zl') >= 0) {
        _newSearch = _newSearch.substring(0, _newSearch.match(/(-zl\d{1,})/).index)
      }
      this.$router.push({
        name:'category-search',
        params:{
          category,
          search: _newSearch
        }
      })
    },
    // 改变类别搜索条件
    selectTypeItem(item){
      let {category,search} = this.$route.params
      search = item + search.substring(2)
      this.$router.push({
        name:'category-search',
        params:{
          category,
          search
        }
      })
    },
    // 初始化筛选列表
    async getFilterList() {
      let subParams
      if(this.searchParams.type){
        subParams = this.searchParams
      } else {
        subParams = {
          ...this.searchParams,
          type : null
        }
      }
      let {code, data = {}} = await getFilterList(subParams)
      if (code === 0) {
        if(data.tag) {
          delete data.tag
        }
        this.filterLists = data;
      }
    },
    // 条件查询选择
    async selectSortItem (item) {
      this.sortResult = item;
      this.sortShow = false
      // 进行数据请求
      let params = {
        order_by: this.sortResult.order_by || null,
        order: this.sortResult.order || null,
        ...this.searchParams
      }
      this.searchGetProduct(params, 'sort')
    },
    // 数据请求
    async searchGetProduct(params, sort){
      const {data,code,pagination} = await getProductList(params)
      if(code === 0){
        if(sort){
          this.productList = data
        } else {
          this.productList.push(...data)
        }
        this.prodPagination = pagination
        // 加载状态结束
        this.prodLoading = false
        // 数据全部加载完成
        if (!this.prodPagination.more) {
          this.prodFinished = true
        }
      }
    },
    // 重置筛选条件
    resetFilter(){
      this.showFilter = false
      this.sureSearchList = {
        start_city: [],
        stop_city: [],
        price: [],
        span_city: [],
        // tag: [], 不要行程特色
        duration: [],
        product_type: [],
        category: [],
        lines:[],
        brand:[],
      }
    },
    // 显示更多的标签
    showMoreFilter(key, item) {
      let filterName = this.$refs['filter' + key][0].className
      let name = this.$refs['tags' + key][0].className
      if(item.items.length > 15) {
        let _obj = this._nomalLizePinyin(item.pinyin)
        this.showList = true
        _obj.title = this.showTitle(key)
        _obj.type = key
        this.moreLists = _obj
        console.log(this.moreLists)
        if(this.$refs['moreList']) {
          this.$refs['moreList'].activeList = []
        }
      } else {
        this.$refs['tags' + key][0].className = name.indexOf('all') >= 0 ? 'filter-tags': 'filter-tags all'
        this.$refs['filter' + key][0].className = filterName.indexOf('down')>= 0 ? 'van-icon van-icon-arrow': 'van-icon van-icon-arrow-down'
      }
    },
    againSearch(){
      // this.prodPagination = {}
      // this.productList = []
      // 关闭蒙层
      this.showFilter = false
      this.changeRouter()
    },
    // 显示title
    showTitle(name) {
      let obj = {
        start_city:this.$t('productListPage.startCity'),
        span_city: this.$t('productListPage.spanCity'),
        stop_city: this.$t('productListPage.stopCity'),
        duration: this.$t('productListPage.duration'),
        lines:this.$t('routerSel'),
        price: this.$t('productListPage.budgetPrice'),
        // tag: this.$t('productListPage.tag'),
        product_type: this.$t('productListPage.productType'),
        brand:this.$t('brandx'),
      }
      return obj[name]
    },
    // 展示显示的name
    selectNameShow(key) {
      let names = this.sureSearchList[key].map(item => {
        return item.name
      })
      return names.length > 3 ? names.splice(0,3).join(',') + '...' : names.join(',')
    },
    currentType(){},
    // 航线查询选择
    selectRouterItem(item){
      // 进行数据请求
      let params = {
        lines: item.id,
        ...this.searchParams
      }
      this.routerShow = !this.routerShow
      this.checkrouter = item.id
      this.searchGetProduct(params, 'lines')
    },
    // 天数选择操作
    selectDayItem(item){
      this.filterResult.duration = item.id
      this.changeRouter()
    },
    // 视觉判断tag是否选中
    filterActive(id,key) {
      let index = this.sureSearchList[key].findIndex(list => (id === list.id))
      return index >=0 ? 'active' : ''
    },
    // 取消
    selectItemCancel(type) {
      this.sureSearchList[type] = []
      this.filterResult[type] = ''
    },
    // 关闭更多选择层
    selectItem(lists,type) {
      this.sureSearchList[type] = lists
      let spanCity = []
      for(let i= 0,len = lists.length;i < len; i++) {
        spanCity.push(lists[i].id)
      }
      this.searchParams.span_city = spanCity.sort().join(',')
      this.showList = false
    },
    // 更多列表返回
    moreListBack() {
      this.showList = false
    },
    sortChange(){
      this.sortShow = !this.sortShow
    },
    typeChange(){
      this.typeShow = !this.typeShow
    },
    routerChange(){
      console.log(222)
      this.routerShow = !this.routerShow
      console.log(this.routerShow)
    },
    dayChange(){
      this.dayShow = !this.dayShow
    },
    // 筛选条件
    filterSelect () {
      this.showFilter = !this.showFilter
      // this.showcolor = 'filter'
    },
    selectProductDetail(){},
    // 选中筛选
    filterClick(item, key) {
      // console.log(item, key)
      let index = this.sureSearchList[key].findIndex(list => (item.id === list.id))
      if(index >= 0) {
        this.sureSearchList[key].splice(index, 1)
      } else {
        if(key === 'span_city' || key === 'duration' || key === 'product_type'|| key === 'category') {
          this.sureSearchList[key].push(item) // 多选项
        } else if (key === 'start_city' || key === 'stop_city' || key === 'price'|| key === 'brand') {
          this.sureSearchList[key] = [item] // 单选项
        }
      }
      let id = item.id
      if(!this.filterResult[key]) {
        this.filterResult[key] = item.id + ''
      } else {
        if (key === 'start_city' || key === 'stop_city' || key === 'price'|| key === 'brand') {
          this.filterResult[key] = id
        } else {
          if(this.filterResult[key].indexOf(id) < 0) {
            this.filterResult[key] += ',' + id
          } else {
            let _arr = this.filterResult[key].split(',')
            let key_index = _arr.indexOf(id)
            _arr.splice(key_index,1)
            this.filterResult[key] = _arr.join(',')
          }
        }
      }
      console.log(this.filterResult)
    },
    // 数据变化引起导航变化
    changeRouter(){
      // 选处理数据
      let _copyObj = {}
      for(let key in this.filterResult) {
        if(this.filterResult[key]) {
          _copyObj[key] = this.filterResult[key]
        }
      }
      let newParams = Object.assign({}, this.searchParams, _copyObj)
      // console.log(newParams, changeParams(newParams))
      this.$router.push(`${changeParams(newParams)}`)
    },
    // 格式化拼音列表
    _nomalLizePinyin(data) {
      let len = data.length
      let obj = {}
      data.sort((a, b) => {
        return a.key.charCodeAt(0) - b.key.charCodeAt(0)
      })
      for(let i= 0; i<len; i++) {
        if(!obj[data[i].key]) {
          obj[data[i].key] = []
        }
        obj[data[i].key].push({...data[i]})
      }
      return obj
    },
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
  .list-wrap{
    padding-top:88px;
    .filter-box{
      height: 88px;
      padding:26px 32px;
      display: flex;
      display: -webkit-flex;
      font-size: 26px;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      border-bottom: 1px solid #E4E4E4;
      .sort-left{
        color: #EF9A1A;
        i{
          vertical-align: text-top;
        }
      }
      .right{
        i{
          vertical-align: text-top;
        }
      }
    }
  }
  .filter-select{
    &.van-popup--right{
      width: 100%;
      height: 100%;
      background-color: transparent;
    }
    .filter-content{
      position: absolute;
      top: -1px;
      bottom: 0;
      left: 100px;
      right: 0;
      background-color: #fff;
      padding-bottom:100px;
      overflow-y: auto;
    }
    .shade-layer{
      position: relative;
      top: 264px;
      width: 100%;
      height: calc(100% - 264px);
      background:rgba(0,0,0,.45);
    }
    .filter-tags{
      display: flex;
      display: -webkit-flex;
      flex-wrap: wrap;
      -webkit-flex-wrap: wrap;
      padding: 0 32px;
      max-height: 144px;
      overflow: hidden;
      &.all{
        max-height: none;
      }
      .item{
        width:186px;
        height:60px;
        margin:0 12px 12px 0;
        line-height: 60px;
        border-radius:8px;
        font-size:24px;
        text-align: center;
        background-color: #F1F1F1;
        color: #2D2D2D;
        &:nth-child(3n+3) {
          margin-right: 0;
        }
        &.active{
          background-color: #399EF6;
          color: #fff;
        }
      }
    }
    .no-data{
      text-align: center;
      padding-top: 200px;
      font-size:28px;
      color: #5E5E5E;
    }
    .cell-list{
      padding: 0 32px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      font-size:28px;
      height: 80px;
      color: #5E5E5E;
      .text{
        color: #399EF6;
      }
      i{
        vertical-align: middle;
      }
    }
    .bottom-btn{
      height:100px;
      position: absolute;
      bottom: 0;
      left: 100px;
      right: 0;
      background-color: #fff;
      display: flex;
      display: -webkit-flex;
      box-shadow:0px -1px 10px rgba(0,0,0,0.16);
      .left,.right{
        width: 50%;
        line-height: 100px;
        font-size:32px;
        text-align: center;
        color: #191919;
      }
      .right{
        background-color: #399EF6;
        color: #fff;
      }
    }
    .show-list{
    }
    .filter-main-box{
      width: 100px;
      height: 100%;
      margin-top: 0;
    }
  }
</style>
<style type="text/scss" lang="scss">
  .product-list-page{
    .list-wrap{
      .tabs-box{
        .van-tabs__line{
          height:4px;
          background-color: #EF9A1A;
        }
        .van-tab--active{
          color: #EF9A1A;
        }
        .van-tabs__wrap{
          position: fixed;
          top: 88px;
          width: 100%;
        }
      }
      .van-hairline--top-bottom::after{
        border-color: #E4E4E4;
      }
    }
    .filter-content{
      .van-cell__value{
        color: #399EF6;
      }
    }
    .van-overlay{
      /*top: 254px !important;*/
    }
    .drift-wrap .van-overlay{
      top: 0 !important;
    }
  }
</style>
