<template>
  <div class="city-home-main">
    <div class="bg-top" :style="{backgroundImage: `url(${baseInfo.url})`}"></div>
    <!-- topBar -->
    <div class="top-bar-ld">
      <div class="go-jump-page" @click="onClickLeft">
        <template v-if="$route.query.sem"> 
          <img src="../../assets/imgs/cityHome/home@2x.png" alt="">
          <p>首页</p>
        </template>
        <template v-else>
          <van-icon name="arrow-left" size="0.64rem" />
        </template>
      </div>
      <div class="search-keywords">
        <van-search
          v-model="keywords"
          placeholder="搜索目的地/关键词"
          show-action
          shape="round"
          background="transparent">
          <div slot="action" @click="onSearch" style="color: #fff;">搜索</div>
        </van-search>
      </div>
      <nuxt-link class="persone-center" tag="div" to="/personal">
        <img src="../../assets/imgs/cityHome/person@2x.png" alt="">
      </nuxt-link>
    </div>
    <!-- title -->
    <div class="city-name-box">
      <span class="name">{{baseInfo.title}}</span>
      <van-button type="default" size="mini" to="/search" round>切换<van-icon name="play" /></van-button>
    </div>
    <!-- 中间配置区域 -->
    <div class="config-area-main">
      <!-- 8icons -->
      <div class="config-icons">
        <van-grid :border="false" :column-num="4">
          <van-grid-item v-for="banner in bannerDataList" :key="banner.data_id" >
            <div @click="gotoIconPage(banner)">
              <img :src="banner.nav_image" alt="">
              <div>{{banner.nav_title}}</div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <!--  热门城市-->
      <div class="hot-city" v-if="hotCityList.length">
        <h2 class="title"><img src="../../assets/imgs/cityHome/hot_city_icon@2x.png">热门城市</h2>
        <van-grid :border="false" :column-num="3">
          <van-grid-item v-for="city in hotCityList" :key="city.id" >
            <div class="tag" @click="gotoHotCityPage(city)">
              <span>{{city.title}}</span>
              <em class="tips" v-if="city.is_hot"></em>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 热门景点 先取消-->
      <!-- <div class="hot-points" v-if="hotViewList.length">
        <h2 class="title">
          <img src="../../assets/imgs/cityHome/hot_city_icon@2x.png">
          热门景点
          <nuxt-link class="all" :to="`/tour/list?city_id=${$route.params.id}&title=${baseInfo.title}`">查看全部</nuxt-link>
          </h2>
        <van-grid :border="false" :column-num="3">
          <van-grid-item v-for="value in hotViewList" :key="value.tour_city_id" >
            <img-box position="bottom" :imgObj="value" @gotoPage="gotoPage"></img-box>
          </van-grid-item>
        </van-grid>
      </div> -->
      <!-- 热门玩法 -->
      <div class="hot-play" v-if="hotPlayList.length">
        <h2 class="title"><img src="../../assets/imgs/cityHome/hot_paly_icon@2x.png">热门玩法</h2>
        <div class="slide-box">
          <van-swipe :loop="false" :width="380" @change="onChange">
            <van-swipe-item v-for="(hot,index) in hotPlayList" :key="'hotPlayList'+index">
              <van-grid :border="false" :column-num="3">
                <van-grid-item v-for="(item,index ) in hot.items" :key="item.product_id">
                  <img-box position="center" :isSelfBg="true" :index="index" :imgObj="item" @gotoPage="gotoPageList" :isHot="item.product_id.toString().split(',').length > 15"></img-box>
                </van-grid-item>
              </van-grid>
            </van-swipe-item>
            <div class="custom-indicator" slot="indicator">
              <div v-for="n in hotPlayList.length" :key="'dfdfd'+n" :class="current+1 == n ? 'currernt':''" style="width:16px"></div>
            </div>
          </van-swipe>
        </div>
        
      </div>
    </div>
    <!--  限时特价-->
    <div class="pro-lst-box" v-if="specialTimeList.length">
      <h2 class="title"><img src="../../assets/imgs/cityHome/hot_sale_icon@2x.png">限时特价</h2>
      <div class="mian-b">
        <div class="half">
          <div class="item" v-for="product in specialTimeList" :key="product.product_id">
            <sale-item :productObj="product"></sale-item>
          </div>
        </div>
        <nuxt-link :to="timeProductPath" tag="div" class="look-all" v-if="specialTimeList.length == 4">
          查看全部
        </nuxt-link>
      </div>
    </div>
    <!-- 热销推荐 -->
    <div class="pro-lst-box">
      <h2 class="title">热销推荐</h2>
      <div class="mian-b">
        <van-list ref="refVanList" v-model="loadingHot" :finished="finishedHot" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
          <div class="half">
            <div class="item" v-for="product in productHotList" :key="product.product_id">
              <city-product :item="product"></city-product>
            </div>
          </div>
        </van-list>
      </div>
    </div>
    <drift-aside class="drift"></drift-aside>
  </div>
</template>
<script>
import ImgBox from '@/components/list/imgBox'
import SaleItem from '@/components/list/sale'
import CityProduct from '@/components/list/cityProduct'
import {getLandingList, getLandingProductSale} from '@/api/landing'
import {getProductList} from '@/api/products'
import DriftAside from '@/components/drift_aside'
export default {
  components:{
    ImgBox, SaleItem, CityProduct, DriftAside
  },
  data(){
    return {
      keywords: '', // 搜索关键词
      img: 'http://assets.tourscool.com/uploads/inn/2019/05/23/952/PvOp8X5Y_G5b2k-VsGiw39o7SEA.jpg',
      current: 0,
      loadingHot: false, // 加载热销商品
      finishedHot: false, // 是否加载完成
      productHotList: [],
      tourCityId: this.$route.params.id,
      prodPagination: {}, // 热销翻页数据
      specialTimeList: [], // 限时人家
      hotPlayList: [], // 热门玩法
      baseInfo: {},// 背景数据
      hotViewList: [], // 热门景点
      hotCityList: [], // 热门城市
      bannerDataList: [], // banner icon
      isFirstLoading: true // 第一次进入
    }
  },
  validate({params}) { // 判断路由是否正确
    return /^[0-9]*$/.test(params.id)
  },
  computed:{
    timeProductPath(){
      let category = this.baseInfo.category || 'all'
      let url = ''
      if(this.baseInfo.city_id){
        url = `/${category}/ya-cf${this.baseInfo.city_id}?sale=1&sp=1`
      } else {
        url = `/${category}/ya?sale=1&sp=1`
      }
      return url
    }
  },
  async mounted(){
    await this.init()
    await this.getSpecialProduct()
    await this.searchGetProduct()
    this.getTime()
  },
  methods:{
    // 获取页面的数据
    async init(){
      let {code, data, msg} = await getLandingList({
        configId: this.tourCityId
      })
      if (code === 0) {
        this.baseInfo = data.index_img || {}
        this.hotPlayList = this._norHotPlayList(data.hot_play)
        this.hotViewList = data.hot_view || []
        this.hotCityList = data.hot_city || []
        this.bannerDataList = data.banner_icon || []
      } else {
        this.$toast.fail(msg)
      }
    },
    async getSpecialProduct(){
      let {code,data,msg} = await getProductList({
        type: 0,
        category: this.baseInfo.category || 'all',
        reduce: 1,
        start_city: this.baseInfo.city_id || null,
        page: (this.prodPagination.page || 0) + 1,
        page_size: 4,
        is_special: 1
      })
      if(code === 0) {
        this.specialTimeList = data
        console.log(5555,this.specialTimeList)
      } else {
        console.log(mag)
      }
    },
    onClickLeft(){
      if(this.$route.query.sem) {
        this.$router.push('/')
      } else{
        this.$router.go(-1)
      }
    },
    onSearch(){
      this.$router.push(`/all/ya-cf${this.tourCityId}?w=${this.keywords}`)
    },
    onChange(index){
      this.current = index;
    },
    gotoPage(obj){
      this.$router.push(`/tour/detail?tourId=${obj.tour_city_id}`)
    },
    gotoPageList(obj){
      this.$router.push(`/all/ya?ids=${obj.product_id}`)
    },
    gotoIconPage(banner){
      window.open(`${banner.nav_link}${this.tourCityId}`,'_self')
    },
    gotoHotCityPage(city){
      let url = ''
      if(city.jump_url == 2) {
        url = `/city_home/${city.config_id}`
      } else {
        url = `/all/ya?ids=${city.city_id}`
      }
      this.$router.push(url)
    },
    async onLoad(){
      if(this.baseInfo.category){
        this.searchGetProduct()
      }
    },
    async searchGetProduct(){
      let {code,data,pagination} = await getProductList({
        type: 0,
        category: this.baseInfo.category || 'all',
        start_city: this.baseInfo.city_id || null,
        page: (this.prodPagination.page || 0) + 1
      })
      if(code === 0) {
        let findOne = this.productHotList.some(item => {
          return item.product_id == data[0].product_id
        })
        if(!this.productHotList[0] || !findOne){
          this.productHotList.push(...data)
        }
        this.prodPagination = pagination
        // 加载状态结束
        this.loadingHot = false
        // 数据全部加载完成
        if (!this.prodPagination.more) {
          this.finishedHot = true
        }
      }
    },
    numChangeT(n) {
      return n < 10 ? '0' + n : '' + n
    },
    // 倒计时时间转化
    timeToData(maxtime) {
      let _time = maxtime/ 1000
      let second = Math.floor(_time % 60) //计算秒
      let minite = Math.floor((_time / 60) % 60) //计算分
      let hour = Math.floor((_time / 3600) % 24) //计算小时
      let day = Math.floor(_time / 3600 / 24) //计算天
      return `<span>${this.numChangeT(day)}</span> 天 <span>${this.numChangeT(hour)}</span> : <span>${this.numChangeT(
        minite,
      )}</span> : <span>${this.numChangeT(second)}</span>`
      // return day+':'+this.numChangeT(hour)+':'+this.numChangeT(minite)+':'+this.numChangeT(second)
    },
    getTime() {
      setInterval(() => {
        this.specialTimeList.forEach(value => {
          let endTime = new Date(value.end_date + ' 23:59:59') - new Date()
          if(endTime >=0){
            let time = this.timeToData(endTime)
            if (typeof value.jishi == 'undefined') {
              this.$set(value, 'time', time)
            } else {
              value.time = time
            }
          }
        })
      })
    },
    _norHotPlayList(data){
      if(!data){
        return 
      }
      let _arr = []
      for(let i = 0; i < data.length; i++) {
        if(!_arr[Math.floor(i/3)]){
          _arr[Math.floor(i/3)] = {
            items : []
          }
        }
        _arr[Math.floor(i/3)].items.push(data[i])
      }
      return _arr
    }
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
  .city-home-main{
    position: relative;
    width: 100%;
    background-color: #f1f1f1;
    &::before{
      content: '';
      width: 100%;
      height: 366px;
      background:linear-gradient(180deg,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.3) 50%,rgba(0,0,0,0.6) 100%);
      position: absolute;
      top: 0;
      left: 0;
    }
    .bg-top{
      position: absolute;
      top: 0;
      width: 100%;
      height: 366px;
      background-repeat: no-repeat;
      background-size: cover;
    }
     h2.title{
      padding: 20px 0 20px;
      font-size:32px;
      color: #333;
      img{
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-right: 10px;
      }
      .all{
        float: right;
        font-size:24px;
        font-weight:400;
        color: #0099FF;
      }
    }
  }
  .top-bar-ld{
    display: flex;
    height:88px;
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    align-items: center;
    z-index: 10;
    .van-search{
      padding: 10px 0;
    }
    .go-jump-page{
      padding: 0 20px;
      color: #fff;
      font-size:18px;
      text-align: center;
    }
    .search-keywords{
      flex: 1;
    }
    .persone-center{
      padding: 0 20px;
    }
    img{
      width: 48px;
    }
  }
  .city-pic-show{
    position: absolute;
    height:366px;
  }
  .city-name-box{
    position: relative;
    padding: 124px 38px 100px 38px;
    display: flex;
    align-items: center;
    .name{
      font-size:48px;
      line-height:62px;
      font-weight:bold;
      color: #fff;
      margin-right: 20px;
    }
    i{
      vertical-align: text-bottom;
    }
  }
  .config-area-main{
    position: relative;
    padding: 30px 0 30px 30px;
    border-radius:74px 74px 0px 0px;
    background-color: #fff;
    .config-icons{
      font-size: 32px;
      color: #333;
      padding-right: 30px;
      padding-bottom: 30px;
      text-align: center;
      img{
        width: 136px;
        height: 136px;
      }
    }
    .hot-city{
      padding-right: 30px;
      padding-bottom: 30px;
      .tag{
        height:68px;
        width: 100%;
        border:3px solid #E5E5E5;
        border-radius:44px;
        line-height: 60px;
        text-align: center;
        font-size:28px;
        color: #5E5E5E;
        position: relative;
      }
      .tips{
        width: 52px;
        height: 32px;
        position: absolute;
        top: -20px;
        right: 0;
        display: inline-block;
        background: url('../../assets/imgs/cityHome/hot_icon@2x.png') no-repeat;
        background-size: cover;
      }
    }
    .hot-points{
      padding-right: 30px;
      padding-bottom: 30px;
    }
    .hot-play{
      .custom-indicator{
        width: 100%;
        height:8px;
        border-radius:4px;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        & > div{
          display: inline-block;
          background: #ECECEC;
        }
        .currernt{
          background: #7BCDEC;
          border-radius:4px;
        }
      }
    }
  }
  .pro-lst-box{
    margin: 20px 0;
    padding: 10px 0;
    background: #fff;
    h2.title{
      padding-left: 30px;
      padding-right: 30px;
    }
    .mian-b{
      padding-left: 26px;
      margin-bottom: 10px;
    }
    .look-all{
      line-height:38px;
      color: #0099FF;
      font-size:28px;
      text-align: center;
      padding: 30px 0;
    }
    .half{
      display: flex;
      flex-wrap: wrap;
      .item{
        width: 334px;
        margin-right: 26px;
      }
    }
  }

</style>
<style lang="scss">
.config-icons .van-grid-item__content{
  padding: 8px;
}
.hot-city .van-grid-item__content{
  padding: 16px 8px;
}
.hot-play .van-grid-item__content{
  padding: 16px 0 0 0;
  height: 170px;
  margin: 10px 14px 20px 0;
  position: relative;
}
.hot-points .van-grid-item__content{
  padding: 0 14px 0 0;
}
.pro-lst-box .van-grid-item__content{
  padding:0;
}
</style>