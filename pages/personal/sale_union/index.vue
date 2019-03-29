<template>
  <div class="union-page-container union-main-page">
    <header-bar title="稀饭联盟"></header-bar>
    <div class="main-union" style="padding-top: 46px;">
      <!--我的收益-->
      <div class="self-news" @click="onProfitCenter">
        <div class="left">
          <span class="price" v-if="JSON.stringify(incomeReport) !== '{}' && incomeReport.income.total_income != 0">{{incomeReport.currency}}{{incomeReport.income.total_income}}</span>
          <span v-else>暂无</span>我的收益
        </div>
        <div class="right">
          <van-icon class-prefix="my-icon" :info="newList.length || null" />
            {{newList.length? '您有新收益': '查看收益'}}
          <van-icon name="arrow" />
        </div>
      </div>
      <!--限时奖励-->
      <!--<div class="reward-time-box">-->
        <!--<van-swipe indicator-color="white">-->
          <!--<van-swipe-item v-for="timeItem in timeSalesList" :key="timeItem.product_id">-->
            <!--<div class="item">-->
              <!--<div class="desc">-->
                <!--<p class="title">{{timeItem.name}}</p>-->
                <!--<div class="price">-->
                  <!--赚 {{timeItem.agent_fee}}-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="time">-->
                <!--限时奖励 <span v-html="timeItem.time"></span>-->
              <!--</div>-->
              <!--<img :src="timeItem.image" alt="">-->
            <!--</div>-->
          <!--</van-swipe-item>-->
        <!--</van-swipe>-->
      <!--</div>-->
      <!--产品列表-->
      <div class="hot-product-list">
        <van-tabs v-model="currentTab" title-active-color="#DB302C" color="transparent">
          <van-tab title="热销产品" >
            <van-list v-model="prodLoadingagent_sales" :finished="prodFinishedagent_sales" finished-text="没有更多了" @load="onLoad">
              <template v-for="hotItem in productListagent_sales">
                <union-item :key="hotItem.product_id + Math.random()" :item="hotItem" @select="selectProduct"></union-item>
              </template>
            </van-list>
          </van-tab>
          <van-tab title="超高佣金" >
            <van-list v-model="prodLoadingmargin" :finished="prodFinishedmargin" finished-text="没有更多了" @load="onLoad">
              <template v-for="hotItem in productListmargin">
                <union-item :key="hotItem.product_id + Math.random()" :item="hotItem" @select="selectProduct"></union-item>
              </template>
            </van-list>
          </van-tab>
          <!--<van-tab title="热门景点">-->
            <!--<template v-for="sightItem in productListsight">-->
              <!--<union-item :key="sightItem.product_id" :item="sightItem" :sight="true" @select="selectSight"></union-item>-->
            <!--</template>-->
          <!--</van-tab>-->
        </van-tabs>
      </div>
    </div>
    <div class="share-box">
      <van-popup v-model="shareListShow" :overlay="false">
        <share-list @close="closeShare" :data="shareDataInfo" :ids="ids"></share-list>
      </van-popup>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/sale_union'
import UnionItem from '@/components/list/unionList'
import {getProductList,getNewIncome, getBase64, getCode} from '@/api/sale_union'
import {getHomeData} from '@/api/home'
import {summaryReport} from '@/assets/js/mixins/incomeReport'
import shareList from '@/components/share/list'
import {profileInfo} from '@/assets/js/mixins/profile'
export default {
  name: 'sale_union',
  components: {HeaderBar, UnionItem, shareList},
  mixins: [profileInfo, summaryReport],
  data() {
    return {
      currentTab: 0,
      productListmargin: [], // 高佣金
      productListagent_sales: [], // 高销量
      productListsight: [], // 热门景点
      prodPaginationagent_sales: {}, // 高销量分页数据
      prodPaginationmargin: {}, // 高佣金分页数据
      prodPaginationsight: {}, // 热门景点分页数据
      sortResult: {
        order_by: 'agent_sales', // 热销agent_sales，高佣金margin
        order: 'desc'
      },
      prodLoadingagent_sales: false, // 是否处于加载状态，加载过程中不触发load事件
      prodFinishedagent_sales: false, // 是否已加载完成，加载完成后不再触发load事件
      prodLoadingmargin: false, // 是否处于加载状态，加载过程中不触发load事件
      prodFinishedmargin: false, // 是否已加载完成，加载完成后不再触发load事件
      prodLoadingsight: false, // 是否处于加载状态，加载过程中不触发load事件
      prodFinishedsight: false, // 是否已加载完成，加载完成后不再触发load事件
      timeSalesList: [], // 限时特价
      newList: [],
      shareListShow: false, // 是否显示分享列表
      shareDataInfo: {},
      ids: {}
    }
  },
  watch:{
    currentTab(newValue) {
      if(newValue === 0) {
        this.sortResult.order_by = 'agent_sales'
      } else if(newValue === 1) {
        this.sortResult.order_by = 'margin'
      } else {
        this.sortResult.order_by = 'sight'
      }
    }
  },
  created(){
    this.tagsList = [
      {id:1,order_by: 'agent_sales',title: '热销产品'},
      {id:2,order_by: 'margin',title: '超高佣金'}
    ]
  },
  mounted(){
    this.init()
    this.getTime()
    this.getNewsList()
  },
  methods: {
    //初始化
    async init(){
      let {code, data} = await getHomeData()
      if(code === 0) {
        this.timeSalesList = data[2] && data[2].data
      } else {
        this.timeSalesList = []
      }
    },
    getTime() {
      setInterval(() => {
        this.timeSalesList.forEach(value => {
          var time = this.timeToData(value.special_end_date);
          if( typeof value.jishi == 'undefined' ) {
            this.$set(value,'time',time);
          } else {
            value.time = time
          }
          if( value.special_end_date ) {
            -- value.special_end_date
          } else {
            value.special_end_date = 0
          }
        })
      },1000)
    },
    // 转化为两位数
    numChangeT(n) {
      return n < 10 ? '0' + n : '' + n
    },
    // 倒计时时间转化
    timeToData( maxtime ) {
      let second = Math.floor( maxtime % 60);       //计算秒
      let minite = Math.floor((maxtime / 60) % 60); //计算分
      let hour = Math.floor((maxtime / 3600) % 24 ); //计算小时
      let day = Math.floor((maxtime / 3600) / 24);//计算天
      return `<span>${this.numChangeT(day)}</span>天<span>${this.numChangeT(hour)}</span>时<span>${this.numChangeT(minite)}</span>分<span>${this.numChangeT(second)}</span>秒`
    },
    //
    async onLoad() {
      // 获取数据
      console.log('onLoad', 'prodPagination' + this.sortResult.order_by)
      const submitData = {
        page: this['prodPagination' + this.sortResult.order_by].page + 1,
        orderBy: this.sortResult.order_by,
        order: 'desc',
      }
      const res = await getProductList(submitData)
      this['productList'+ this.sortResult.order_by].push(...res.data)
      this['prodPagination'+ this.sortResult.order_by] = res.pagination
      // 加载状态结束
      this['prodLoading'+ this.sortResult.order_by] = false
      // 数据全部加载完成
      if (!this['prodPagination'+ this.sortResult.order_by].more) {
        this['prodFinished'+ this.sortResult.order_by] = true
      }
    },
    // 滑动会请求数据
    async onLoadSales() {
      // 获取数据
      console.log('onLoadSales',this.productListsales)
      const submitData = {
        page: (this.prodPaginationsales.page || 0) + 1,
        // orderBy: this.sortResult.order_by || null,
        orderBy: 'sales',
        order: 'desc',
      }
      const res = await getProductList(submitData)
      this.productListsales.push(...res.data)
      this.prodPaginationsales = res.pagination
      // 加载状态结束
      this.prodLoadingsales = false
      // 数据全部加载完成
      if (!this.prodPaginationsales.more) {
        this.prodFinishedsales = true
      }
    },
    async onLoadPrice() {
      // 获取数据
      console.log('onLoadPrice')
      console.log('onLoadPrice',this.productListprice)
      const submitData = {
        page: (this.prodPaginationprice.page || 0) + 1,
        orderBy: 'price',
        order: 'desc',
      }
      const res = await getProductList(submitData)
      this.productListprice.push(...res.data)
      this.prodPaginationprice = res.pagination
      // 加载状态结束
      this.prodLoadingprice = false
      // 数据全部加载完成
      if (!this.prodPaginationprice.more) {
        this.prodFinishedprice = true
      }
    },
    onClickLeft() {
      console.log('onClickLeft')
    },
    onProfitCenter() {
      this.$router.push({
        path: '/personal/sale_union/my_profit'
      })
    },
    async selectProduct(item){
      let {product_id,name,default_price,special_price,image} = item
      let {face,customer_id,chinese_name,email,phone,last_name,first_name,nickname} = this.profile
      this.shareListShow = true
      this.ids = {
        referrerId: customer_id,
        productId: product_id
      }
      let faceImg = await getBase64(face)
      let productImg = await getBase64(image)
      let code = await getCode(`${window.location.origin}/product/detail?productId=${product_id}-${customer_id}`)
      this.shareDataInfo = {
        product_id,name,default_price,special_price,customer_id,chinese_name,email,phone,last_name,first_name,nickname,
        image: 'data:image/jpg;base64,'+ productImg.data,
        face: 'data:image/jpg;base64,'+ faceImg.data,
        code: code.data
      }
    },
    selectSight(item){
      console.log(item)
      this.$router.push({
        name: 'sight_spot'
      })
    },
    // 切换标签
    changeTypeClick() {
    },
    // 获得新闻信息
    async getNewsList(){
      let {code, data} = await getNewIncome()
      if(code === 0) {
        this.newList = data
      } else {
        this.newList = []
      }
    },
    // 关闭分享
    closeShare(){
      this.shareDataInfo = {}
      this.shareListShow = false
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .main-union{
    background-color: #F5F4F9;
    .self-news{
      height:160px;
      display: flex;
      padding: 0 18px;
      background:linear-gradient(180deg,rgba(253,141,103,1) 0%,rgba(245,41,30,1) 100%);
      box-shadow:0px 3px 6px rgba(0,43,100,0.16);
      color: #fff;
      font-size: 24px;
      align-items: center;
      justify-content: space-between;
      .left{
        display: flex;
        align-items: center;
        span.price{
          margin-right: 10px;
          font-size: 52px;
          vertical-align: middle;
          line-height: 50px;
        }
      }
      .right{
        height: 40px;
        line-height: 40px;
        display: flex;
        align-items: center;
        .my-icon{
          width: 40px;
          height: 40px;
          display: inline-block;
          position: relative;
          background: url("../../../assets/imgs/union/icon_gold@2x.png") no-repeat;
          background-size: cover;
          margin-right: 10px;
        }
        i{
          font-style: normal;
          margin-left: 10px;
        }
      }
    }
    .hot-product-list{
      margin: 10px 15px;
      background-color: #fff;
      border-radius:12px;
      box-shadow:0px 4px 4px rgba(217,217,217,0.14);
    }
    .reward-time-box{
      height: 230px;
      padding: 0 15px;
      margin-top: 20px;
      .item{
        position: relative;
        width: 100%;
        height: 230px;
        .desc{
          position: absolute;
          bottom: 30px;
          right: 20px;
          color: #fff;
          font-size:24px;
          .title{
            max-width: 400px;
            line-height: 40px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .price{
          text-align: right;
          font-size:38px;
          font-weight: bold;
        }
        .time{
          position: absolute;
          top: 0;
          left: 0;
          height:36px;
          padding: 0 16px;
          line-height: 36px;
          font-size:24px;
          border-radius:12px 0px 0px 0px;
          background-color: #DB302C;
          color: #fff;
        }
        img{
          width: 100%;
          height: 230px;
          border-radius:12px;
        }
      }
    }
  }
  .union-main-page{
    .share-box .van-popup{
      width: 100%;
      height: 100vh;
      background:rgba(0,0,0,0.7);
      transform:translate3d(0,0,0);
      top: 0;
      left: 0;
    }
  }
</style>
<style>
  .hot-product-list .van-tab--active {
    color: #DB302C;
  }
  .my-icon .van-info{
    background-color: #FF0600;
    border-color: #FF0600;
  }
</style>
