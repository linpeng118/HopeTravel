<template>
  <div class="new-page">
    <section class="new-banner">
      <div class="itembox">
        <div class="item-cop" v-for="(item,ind) in couponlist" :key="ind">
          <template v-if="ind<4">
            <p class="p1">{{item.minus_label}}</p>
            <p class="p2">{{item.scope_label}}</p>
            <p class="p3">{{item.full_label}}</p>
          </template>
        </div>
      </div>
      <van-button class="button-activity"
                  :disabled="submiting"
                  @click="onReceive"
                  type="default">立刻领取</van-button>
      <p class="jump" @click="jumpToUse" v-if="isShow">定制专享券</p>
    </section>
    <!-- 推荐产品 -->
    <van-tabs v-model="activeCity" v-if="products&&products.length">
      <section v-for="(item,ind) in products" :key="ind">
        <van-tab :title="item.moduleName" :name="ind">
          <section class="product-list" >
            <div class="product" v-for="(pro,inp) in item.data" :key="inp" @click="jumpToDetail(pro.product_id)">
              <div class="banner" style="background-color: #ddd">
                <img :src="pro.image" alt="">
              </div>
              <div class="more">
                <p class="name no-wrap-line3">{{pro.name}}</p>
                <p class="price">
                  <span class="newprice">新人价</span>
                  <span class="p-now">{{pro.sale_price}}</span><span class="text">/起</span>
                </p>
                <p class="else">原价：{{pro.default_price}}</p>
              </div>
            </div>
          </section>
        </van-tab>
      </section>
    </van-tabs>
    <!--<p v-else>暂无专享产品</p>-->
  </div>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'
  import {getNewCoupon, getPro, getshow} from '@/api/activity'
  import {RECEIVE_TYPE} from '@/assets/js/consts/activity'
  export default {
    head: {
      title: '新人超值专享'
    },
    data() {
      return {
        RECEIVE_TYPE,
        // 是否是app
        isApp: this.$route.query.platform||0,
        appVersion: this.$route.query.app_version||'0.0.0',
        appLanguage: this.$route.query.language||'',
        appCurrency: this.$route.query.currency||'USD',
        appPhoneType: this.$route.query.phone_type||'ios',
        // 活动id
        activity_id: '',
        // 活动规则
        rules: '',
        // 推荐列表
        products: [],
        activeCity: 0,
        // 优惠券列表
        couponlist: [],
        // 是否正在提交
        submiting: false,
        // 领取状态
        receiveStatus: RECEIVE_TYPE.default,
        //是否显示
        isShow:false
      }
    },
    computed: {
      ...mapState({
        vxToken: state => state.token // 登录展示哪个页面
      }),
    },
    async beforeMount() {
      this.jsBridge = require('@/assets/js/jsBridge.js').default
    },
    mounted() {
      this.init()
      this.jsBridge.webRegisterHandler('obtainUserToken', (token, callback) => {
        if (token) {
          this.vxSetToken(token)
          this.getshow()
        } else {
          this.jsBridge.webCallHandler('jumpToLoginView')
        }
      })
    },
    methods: {
      ...mapMutations({
        // 设置品台
        vxSetPlatform: 'setPlatform',
        // 改变token
        vxSetToken: 'setToken',
        // 设置语言
        vxSetLanguage: "setLanguage",
        // 设置货币
        vxSetCurrency: "setCurrency",
        // 设置机型
        vxSetPhoneType: "setPhoneType",
        // 设置版本
        vxSetAppVersion: "setAppVersion"
      }),
      async init() {
        await this.vxSetPlatform(this.isApp)
        await this.vxSetLanguage(this.appLanguage)
        await this.vxSetCurrency(this.appCurrency)
        await this.vxSetPhoneType(this.appPhoneType)
        await this.vxSetAppVersion(this.appVersion)
        await this.getConList()
        await this.getProductList()


      },
      async getConList() {
        let that=this;
        const {code, msg, data} = await getNewCoupon();
        if (code === 0) {
          that.couponlist = data.coupons
          that.activity_id= data.activity_id
        }
      },
      async getshow() {
        let that=this;
        const {code,msg,data} = await getshow();
        alert(code)
        alert(msg)
        alert(data.answe)
        if (code === 0) {
          if(!data.answe){
            that.isShow=true
          }
        }
      },
      /**
       * 获取推荐产品列表,page_size默认20条
       */
      async getProductList() {
        const {code, msg, data} = await getPro()
        if (code === 0) {
          // this.products = data
          this.products = [{
            "moduleName":"当地跟团",
            "data":[
              {
                "product_id":"2609",
                "name":"(1日)【天天发团】日本富士山超值一日游·富士山五合目+河口湖宝刀面·天妇罗定食+忍野八海泉水+奥特莱斯购物",
                "image":"https://img.tourscool.net/images/product/5cd3bebe6c018.jpg",
                "sale_price":"￥36,501.94",
                "default_price":"￥36,801.94"
              },
              {
                "product_id":"4897",
                "name":"BONDI BEACH - 1.5 Hours Guided Motorcycle Tour",
                "image":"https://img.tourscool.net/images/product/5d22fd5a67c3b.jpg",
                "sale_price":"￥0.00",
                "default_price":"￥0.00"
              },
              {
                "product_id":"4891",
                "name":"BONDI BEACH - 1.5 Hours Guided Motorcycle Tour",
                "image":"https://img.tourscool.net/images/product/1d7eab34ced146c27822f651da9ae21d.jpg",
                "sale_price":"￥97,716.07",
                "default_price":"￥98,016.08"
              },
              {
                "product_id":"3112",
                "name":"3 Day Tour To Jokulsarlon | The Golden Circle, the South Coast, Glacier Hike & Boat Tour",
                "image":"https://img.tourscool.net/images/product/03188f786bca6cff9a89167cc3823f01.jpeg",
                "sale_price":"￥25,503.77",
                "default_price":"￥25,803.78"
              }
            ]
          },
            {
              "moduleName":"当地玩乐",
              "data":[
                {
                  "product_id":"3112",
                  "name":"3 Day Tour To Jokulsarlon | The Golden Circle, the South Coast, Glacier Hike & Boat Tour",
                  "image":"https://img.tourscool.net/images/product/03188f786bca6cff9a89167cc3823f01.jpeg",
                  "sale_price":"￥25,503.77",
                  "default_price":"￥25,803.78"
                },
                {
                  "product_id":"3105",
                  "name":"(3天)【澳洲散拼】塔斯马尼亚经典游•萨拉曼卡广场+里奇蒙小镇+亚瑟港+塔斯曼拱门+皇家植物园+罗素瀑布",
                  "image":"https://img.tourscool.net/images/product/5d1085ea295e5.jpg",
                  "sale_price":"￥1,485.74",
                  "default_price":"￥1,523.83"
                }
              ]
            }]
        }
      },
      // 点击领取
      onReceive() {
        this.jsBridge.webCallHandler(
          'getUserToken',
          null,
          (token) => {
            // alert(token);
            if (token) {
              this.vxSetToken(token)
              this.submiting = true
              // 领取
              this.receiveCoupons()
            } else {
              this.jsBridge.webCallHandler('jumpToLoginView')
            }
          }
        )
      },
      // 领取优惠卷
      async receiveCoupons() {
        this.submiting = true
        const {code, msg, data} = await getCouponsReceive({
          id: this.activity_id,
        })
        this.msg = msg
        if (code === 0) {
          // 领取成功
          this.receiveStatus = 0
          this.couponlist = data.map(item => ({
            ...item,
            isShow: false
          }))
          this.jsBridge.webCallHandler('userObtainNewcomerGiftSuccessful')
        } else if (code === RECEIVE_TYPE.end) {
          // 活动结束(这里直接)
          this.jsBridge.webCallHandler('userObtainNewcomerGiftSuccessful')
          this.receiveStatus = RECEIVE_TYPE.end
        } else if (code === RECEIVE_TYPE.old) {
          // 老用户
          this.jsBridge.webCallHandler('userObtainNewcomerGiftSuccessful')
          this.receiveStatus = RECEIVE_TYPE.old
        } else if (code === RECEIVE_TYPE.again) {
          // 已领取
          this.jsBridge.webCallHandler('userObtainNewcomerGiftSuccessful')
          this.receiveStatus = RECEIVE_TYPE.again
        } else if (code === 401) {
          console.log(msg)
        } else {
          this.$toast(msg)
        }
        this.submiting = false
      },
      // 点击定制优惠劵
      jumpToUse() {
        this.jsBridge.webCallHandler('jumpCustomizationCouponsListView')
      },
      // 跳转到产品详情
      jumpToDetail(id) {
        this.jsBridge.webCallHandler('jumpProductDetailView', {
          product_id: id
        })
      }
    },
  }
</script>
<style>
  .new-page .van-tabs__line{
    background-color: #399EF6!important;
  }
  .new-page .van-tab--active{
    color: #399EF6!important;
  }
</style>
<style lang="scss" scoped>
  .new-page {
    height: 100%;
    min-height: 100vh;
    text-align: center;
    background: #ff3b01 url("~assets/imgs/invite/bg_new.png") no-repeat center
    top/100%;
    overflow: hidden;
    .product-list {
      background-color: #fff;
      overflow: hidden;
      padding: 0 25px 40px;
      text-align: left;
      .product {
        display: inline-block;
        margin-top: 40px;
        width:338px;
        height: 430px;
        overflow: hidden;
        .banner {
          position: relative;
          width:338px;
          height:238px;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 10px;
          img{
            width:338px;
            height:238px;
          }
        }
        .more {
          padding: 12px 20px;
          background: #fff;
          .name {
            width: 320px;
            height: 80px;
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 28px;
            color: #000;
          }
          .price {
            text-align: right;
            line-height: 48px;
            .newprice{
              padding:0 5px;
              height:32px;
              background:rgba(255,0,0,1);
              opacity:1;
              border-radius:20px;
              text-align: center;
              color: #fff;
              font-size: 24px;
              margin-top: 22px;
              line-height: 30px;
              display: inline-block;
              float: left;
            }
            .p-old,
            .text {
              height: 28px;
              font-size: 20px;
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 28px;
              color: #FF0000;
              opacity: 1;
              letter-spacing: -1px;
            }
            .p-old {
              text-decoration: line-through;
            }
            .p-now {
              height: 48px;
              font-size: 28px;
              font-family: PingFang SC;
              font-weight: 600;
              line-height: 48px;
              color: rgba(255, 0, 0, 1);
            }
          }
          .else{
            font-size: 20px;
            line-height: 30px;
            color: #C7C7C7 ;
          }
        }
        &:nth-child(2n) {
          margin-left:22px;
        }
      }
    }
    .new-banner {
      background: url("~assets/imgs/activity/newbg.png") no-repeat center
      top/100%;
      width: 750px;
      height: 922px;
      .button-activity{
        width:266px;
        height:56px;
        background:rgba(250,223,165,1);
        opacity:1;
        border-radius:200px;
        font-size:28px;
        position: relative;
        color:#FF5266;
        box-sizing: border-box;
        line-height: 56px;
        margin-top: 28px;
      }
      .jump{
        text-align: center;
        margin-top: 75px;
        font-size: 24px;
        color: #fff!important;
        text-decoration:underline
      }
      .itembox{
        margin-left: 132px;
        margin-top: 513px;
        width: 520px;
        height: 164px;
        float: left;
        .item-cop{
          float: left;
          margin-right:20px ;
          color: #FDF2D9;
          margin-bottom:15px;
          width:235px ;
          .p1{
            display: inline-block;
            float: left;
            width:92px;
            text-align: center;
            height:72px ;
            font-size: 24px;
            line-height: 72px;
          }
          .p2{
            display: inline-block;
            font-size: 20px;
            width:132px;
            text-align: left;
            height:36px ;
            float: left;
            line-height: 36px;
          }
          .p3{
            font-size: 20px;
            display: inline-block;
            float: left;
            width:132px;
            text-align: left;
            height:36px ;
            line-height: 36px;
          }
        }
      }

    }
  }
</style>
