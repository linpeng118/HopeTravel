<template>
  <section class="product-list-page" ref="refprolistPage">
    <lay-header
      :searchKeyWords="searchKeyWords"
      :isSearch="isSearch"
      @onSearch="onSearch"
      @searchStart="searchStart"
      @query="queryChange"
      @leftClick="leftClick"
      :isProductList="true"
      :serachtype="serachtype"
    ></lay-header>
    <div class="list-wrap">
      <div class="tabs-box">
        <van-tabs v-model="active" @click="changeTypeClick">
          <template v-for="item in tagsList">
            <van-tab :title="item.title" :key="item.type">
              <van-pull-refresh v-model="prodLoading" @refresh="onRefresh">
                <van-list v-model="prodLoading" :finished="prodFinished" :finished-text="$t('noMore')" @load="onLoad">
                  <template>
                    <div class="filter-box">
                      <div class="sort-left" :style="showcolor=='sort'?'':'color:#3c3c3c'" @click="sortChange">
                        {{sortResult.name}}
                        <van-icon name="arrow-down" />
                      </div>

                      <div class="sort-left" :style="showcolor=='type'?'':'color:#3c3c3c'" v-if="currentType==2" @click="typeChange">
                        {{$t('typex')}}
                        <van-icon name="arrow-down" />
                      </div>

                      <div class="sort-left" :style="showcolor=='router'?'':'color:#3c3c3c'"
                           v-if="filterLists.lines&&filterLists.lines.items&&filterLists.lines.items.length>0" @click="routerChange">
                        {{$t('routerSel')}}
                        <van-icon name="arrow-down" />
                      </div>


                      <div class="sort-left" v-if="filterLists&&filterLists.duration&&filterLists.duration.items&&filterLists.duration.items.length>0" :style="showcolor=='day'?'':'color:#3c3c3c'" @click="dayChange">
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
                  <!--<div v-else>暂无数据</div>-->
                </van-list>
              </van-pull-refresh>
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
            <template v-if="key!='duration'&&key!='lines'">
              <div class="cell-list" @click="showMoreFilter(key, item)">
                <div class="left">{{showTitle(key)}}</div>
                <div class="right">
                  <span class="text">{{selectNameShow(key)}}</span>
                  <i class="van-icon van-icon-arrow" :ref="'filter' + key"></i>
                </div>
              </div>
              <div class="filter-tags" :ref="'tags' + key">
                <div class="item"
                     v-for="(city,index) in item.items"
                     :key="city.id + city.name"
                     :class="key!='brand'?filterActive(city.id, key):filterActive(city.brand_id, key)"
                     @click="filterClick(city, key, index)" :ref="key + currentType">{{city.name||city.brand_name}}</div>
              </div>
            </template>

          </div>
        </div>
      </div>
      <div class="bottom-btn">
        <div class="left" @click="resetFilter">{{$t('reset')}}</div>
        <div class="right" @click="againSearch">{{$t('chosen')}}</div>
      </div>
    </van-popup>

    <!--排序条件搜索-->
    <div class="sort-box" v-if="sortShow">
      <sort-item :sortShow="sortShow" :sortResult="sortResult" @selectSort="selectSortItem"></sort-item>
    </div>
    <!--日期条件搜索-->
    <div class="sort-box" v-if="dayShow">
      <day-item :dayShow="dayShow" :checkitem="filterResult.duration" :dayResult="filterLists.duration" @selectSort="selectDayItem"></day-item>
    </div>
    <!--类别条件搜索-->
    <div class="sort-box" v-if="typeShow">
      <play-item :dayShow="typeShow" :checkitem="checktype" @selectSort="selectTypeItem"></play-item>
    </div>
    <!--航线搜索-->
    <div class="sort-box" v-if="routerShow">
      <router-item :dayShow="routerShow" :checkitem="Number(checkrouter)" :dayResult="filterLists.lines" @selectSort="selectRouterItem"></router-item>
    </div>
    <!--更多列表的选择-->
    <van-popup v-model="showList" position="right" class="filter-select more-tag">
      <div class="filter-main-box" @click="showList = false">
      </div>
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
  export default {
    name: 'product_list',
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
    head() {
      let srcCustomerService
      if (process.env.customerService === "53kf") {
        srcCustomerService = 'https://tb.53kf.com/code/code/10181581/2'
      }
      return {
        script: [
          {
            src: srcCustomerService
          },
        ]
      }
    },
    asyncData({route}){
      // console.log(2222222222, route)
    },
    data() {
      return {
        isSearch: false,
        searchKeyWords: this.$route.query.keyWords || null,
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
        checktype:2,
        active: this.$route.query.itemType || 0, // 当前搜索的type值
        filterResult: {
          product_type: this.$route.query.product_type || null,
          category: this.$route.query.category || null,
          span_city: this.$route.query.span_city || null,
          start_city: this.$route.query.start_city || null
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
          tag: [],
          duration: [],
          product_type: [],
          category: []
        },
        isFilterShow: false,
        firstload:true,
        submitserData:null,//跳转存储数据
        serachtype: this.$route.query.sem+'' || '0', // 当前搜索的type值
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
        resultType: ''
      }
    },
    computed: {
      // currentType:{
      //   get() {
      //     let _arr = [0,1,2,7,3]
      //     return _arr[this.active]
      //   },
      //   set(newValue) {
      //     // this.active = newValue
      //   }
      // },
      currentType() {
        // 当前的type类型
        // 如果有修改要特别注意类型
        // let _arr = [3,1,2,4,5,7,7]
        // let _arr = [0,3,1,2,4,5,7] //
        let _arr = [0,1,2,7,3]
        return _arr[this.active]
      },
      multipleTag() {
        return this.moreLists.type !== 'start_city' && this.moreLists.type !== 'stop_city'
      }
    },
    watch: {
      searchKeyWords(newValue, oldValue) {
        this.productList = [];
        this.prodPagination = {}
        if(this.prodFinished) { // 如果这个值为true，则不会触发onLoad, 所以要手动初始化一下
          this.prodFinished = false;
        } else { // 如果为false则会触发onLoad
          this.onLoad();
        }
        // 筛选条件更新
        this.getFilterList();
        // this.menuset();
      },
      currentType : {
        handler(value) {
          console.log('变化了1111111111111', value)
          this.resultType = value
        },
        immediate: true
      }
    },
    created() {
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
        // {id:3,type: 4,title: this.$t('tours.tickets')},
        // {id:4,type: 5,title: this.$t('tours.aDayTrip')},
        {id:6,type: 7,title: this.$t('tours.cruise')},
        {id:0,type: 3,title: this.$t('tours.exquisiteGroup')},
      ];
      // console.log(this.$route.query)
      // this.menuset();
    },
    mounted() {
      // 初始化
      this.getFilterList();
      this.serachtype=this.$route.query.sem+'' || '0';
    },
    methods: {
      // 返回上一级
      leftClick() {
        if(this.serachtype=='1'){
          this.$router.push({
            path: '/'
          })
        }
        else{
          this.$router.go(-1)
        }

      },
      //得到哪些菜单下有数据
      async menuset(){
        let {code, data} = await getmenuSearch(this.searchKeyWords)
        if (code === 0) {
          this.menu = data;
          let objlist=[{id:10,type: 0,title: this.$t('tours.torusRecommend')}];
          if(data.local_and_regiment>0){
            objlist.push({id:1,type: 1,title: this.$t('tours.localGroup')})
          }
          if(data.local_play>0){
            objlist.push({id:2,type: 2,title: this.$t('tours.localPlay')})
          }
          if(data.boutique_group>0){
            objlist.push({id:0,type: 3,title: this.$t('tours.exquisiteGroup')})
          }
          if(data.tickets_performance>0){
            objlist.push({id:3,type: 4,title: this.$t('tours.tickets')})
          }
          if(data.one_day_tour>0){
            objlist.push({id:4,type: 5,title: this.$t('tours.aDayTrip')})
          }
          if(data.liner>0){
            objlist.push({id:6,type: 7,title: this.$t('tours.cruise')})
          }
          console.log('xXXXXXXXXXXXXXXXXXXXXX')
          console.log(objlist)
          this.tagsList=objlist
        }
      },
      // 跳转到详情页面
      selectProductDetail(productId) {
        if( localStorage.getItem('plist')){
          localStorage.removeItem('plist')
        }
        localStorage.setItem('plist',JSON.stringify(this.submitserData));
        let routeData = this.$router.resolve({
          name: 'product-detail',
          query: {
            productId
          }
        });
        window.open(routeData.href, '_blank')
      },
      onSearch() {},
      searchStart() {},
      queryChange(value) {
        this.searchKeyWords = value
      },
      // 筛选条件
      filterSelect () {
        this.showFilter = !this.showFilter
        this.showcolor = 'filter'
      },
      // 显示隐藏排序列表
      sortChange() {
        this.sortShow = !this.sortShow
        this.showcolor = 'sort'
        this.dayShow = false
        this.typeShow = false
        this.routerShow = false
      },

      // 显示隐藏排序列表
      typeChange() {
        this.typeShow = !this.typeShow
        this.showcolor = 'type'
        this.dayShow = false
        this.routerShow = false
        this.sortShow = false
      },
      // 显示隐藏航线列表
      routerChange() {
        this.routerShow = !this.routerShow
        this.showcolor = 'router'
        this.dayShow = false
        this.typeShow = false
        this.sortShow = false
      },

      // 显示隐藏行程天数
      dayChange() {
        this.dayShow = !this.dayShow
        this.showcolor = 'day'
        this.sortShow = false
        this.routerShow = false
        this.typeShow = false
      },
      // 条件查询选择
      async selectSortItem (item) {
        console.log("11122222222")
        this.sortResult = item;
        console.log(this.sortResult)
        let len = this.productList.length
        let total = this.prodPagination.total_record
        // 把下面控制列表的数据重置
        this.productList = []
        this.prodPagination = {}
        this.prodFinished= false
        if (len !== total) {
          console.log('进行onLoad')
          this.onLoad()
        } else {
          console.log('没有执行onLoad')
        }
        this.sortChange()
      },

      // day条件查询选择
      async selectDayItem (item) {
        this.filterResult.duration=item.id;
        this.dayShow=false;
        this.productList = [];
        this.prodPagination.page=0;
        this.onLoad();
      },
      // 航线查询选择
      async selectRouterItem (item) {
        this.checkrouter=item.line_id;
        this.filterResult.lines=item.line_id;
        console.log(this.filterResult)
        this.routerShow=false;
        this.productList = [];
        this.prodPagination.page=0;
        this.onLoad();
      },
      // type查询选择
      async selectTypeItem (item) {
        this.resultType = item;
        this.checktype=item;
        this.typeShow=false;
        this.productList = [];
        this.changeTypeClick();
      },
      // 初始化筛选列表
      async getFilterList() {
        console.log(44444444444, this.resultType)
        let submitData = {};
          submitData = {
            type: this.currentType == 0 ? null: this.currentType,
            keyword: this.searchKeyWords,
            ...this.filterResult
          }
        let {code, data} = await getFilterList(submitData)
        if (code === 0) {
          this.filterLists = data;
        }
      },
      // 滑动会请求数据
      async onLoad() {
        // 获取数据
        let submitData = {};
        if(localStorage.getItem('plist')&&this.firstload==true){
          submitData = JSON.parse(localStorage.getItem('plist'))
          localStorage.removeItem('plist')
        }
        else{
          submitData = {
            type: this.resultType == 0 ? null: this.resultType,
            page: (this.prodPagination.page || 0) + 1,
            order_by: this.sortResult.order_by || null,
            order: this.sortResult.order || null,
            keyword: this.searchKeyWords,
            ...this.filterResult
          }
        }
        this.firstload=false;
        this.submitserData=submitData;
        const res = await getProductList(submitData)
        this.productList.push(...res.data)
        this.prodPagination = res.pagination
        // 加载状态结束
        this.prodLoading = false
        // 数据全部加载完成
        if (!this.prodPagination.more) {
          this.prodFinished = true
        }
      },
      // 上拉刷新
      async onRefresh(){
        // 获取数据
        console.log('onRefresh')
        let submitData = {};
        if(!this.prodPagination.page||this.prodPagination.page==1){
          this.productList=[];
        }
        if(localStorage.getItem('plist')){
          let submitData = JSON.parse(localStorage.getItem('plist'))
          localStorage.removeItem('plist')
        }
        else{
          submitData = {
            type: this.resultType == 0 ? null: this.resultType,
            page: (!this.prodPagination.page||this.prodPagination.page==1)?1:this.prodPagination.page-1,
            order_by: this.sortResult.order_by || null,
            order: this.sortResult.order || null,
            keyword: this.searchKeyWords,
            ...this.filterResult
          }
        }
        this.firstload=false;
        this.submitserData=submitData;
        const res = await getProductList(submitData)
        this.prodPagination = res.pagination
        if(this.prodPagination!=1){
          this.productList.unshift(...res.data)
        }
        // 加载状态结束
        this.prodLoading = false
        // 数据全部加载完成
        if (!this.prodPagination.more) {
          this.prodFinished = true
        }
      },
      // 切换tab加载数据
      async changeTypeClick() {
        console.log("22222222")
        this.typeShow = false
        this.sortShow = false
        this.routerShow = false
        this.dayShow = false
        this.showcolor='sort'
        this.resetFilter()
        this.productList = []
        this.prodPagination = {}

        this.filterResult = {
          product_type: this.$route.query.product_type || null,
          category: this.$route.query.category || null,
          span_city: this.$route.query.span_city || null,
          start_city: this.$route.query.start_city || null,
          duration: this.$route.query.duration || null
        }
        // 筛选列表更新
        this.getFilterList()
        if(this.prodFinished) { // 如果这个值为true，则不会触发onLoad, 所以要手动初始化一下
          this.prodFinished = false
          console.log("222222221")
        } else { // 如果为false则会触发onLoad
          console.log("222222223")
          this.onLoad()
        }

      },
      async againSearch () {
        this.prodPagination = {}
        this.productList = []
        if(this.prodFinished) { // 如果这个值为true，则不会触发onLoad, 所以要手动初始化一下
          this.prodFinished = false
        } else { // 如果为false则会触发onLoad
          this.onLoad()
        }
        console.log(this.prodPagination)
        // 关闭蒙层
        this.showFilter = false
      },
      // 选中筛选
      filterClick(item, key) {
        let objid = key=='brand'?item.brand_id:item.id
        let index = this.sureSearchList[key].findIndex(list => (objid === list.id))
        if(index >= 0) {
          this.sureSearchList[key].splice(index, 1)
        } else {
          if(key === 'span_city' || key === 'tag' || key === 'duration' || key === 'product_type'|| key === 'category') {
            this.sureSearchList[key].push(item) // 多选项
          } else if (key === 'start_city' || key === 'stop_city' || key === 'price'|| key === 'brand'){
            this.sureSearchList[key] = [item] // 单选项
          }
        }
        console.log(this.sureSearchList)
        let id = key=='brand'?item.brand_id:item.id
        if(!this.filterResult[key]) {
          this.filterResult[key] = objid + ''
        } else {
          if (key === 'start_city' || key === 'stop_city' || key === 'price') {
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
      // 显示title
      showTitle(name) {
        let obj = {
          start_city:this.$t('productListPage.startCity'),
          span_city: this.$t('productListPage.spanCity'),
          stop_city: this.$t('productListPage.stopCity'),
          duration: this.$t('productListPage.duration'),
          lines:this.$t('routerSel'),
          price: this.$t('productListPage.budgetPrice'),
          tag: this.$t('productListPage.tag'),
          product_type: this.$t('productListPage.productType'),
          brand:this.$t('brandx'),
        }
        return obj[name]
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
      // 更多列表返回
      moreListBack() {
        this.showList = false
      },
      selectItem(lists,type) { // 关闭更多选择层
        console.log(lists,type)
        this.sureSearchList[type] = lists
        this.showList = false
      },
      // 取消
      selectItemCancel(type) {
        this.sureSearchList[type] = []
        this.filterResult[type] = ''
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
      // 视觉判断tag是否选中
      filterActive(id,key) {
        let index = this.sureSearchList[key].findIndex(list => (id === list.id||list.brand_id))
        return index >=0 ? 'active' : ''
      },
      // 展示显示的name
      selectNameShow(key) {
        let names = this.sureSearchList[key].map(item => {
          if(key!='brand'){
            return item.name
          }
          else{
            return item.brand_name
          }
        })
        return names.length > 3 ? names.splice(0,3).join(',') + '...' : names.join(',')
      },
      // 重置筛选条件
      resetFilter() {
        this.sureSearchList = {
          start_city: [],
          stop_city: [],
          price: [],
          span_city: [],
          tag: [],
          duration: [],
          product_type: [],
          category: [],
          lines:[],
          brand:[],
        }
        this.filterResult = {}
        this.filterResult = {
          product_type: this.$route.query.product_type || null,
          category: this.$route.query.category || null,
          span_city: this.$route.query.span_city || null,
          start_city: this.$route.query.start_city || null,
          lines: this.$route.query.lines || null,
          brand:this.$route.query.lines || null
        }
        console.log(this.filterResult)
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
