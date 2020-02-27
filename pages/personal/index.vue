<template>
  <div class="personal">
    <div class="header">
      <div class="setting">
        <div tag="div"
             class="set"
             @click.stop="$router.push(`/personal/setting?isLogin=${isLogin?1:0}`)">
          <img src="../../assets/imgs/personal/index/ic_setting@2x.png"
               alt>
        </div>
      </div>
      <div class="con">
        <div class="box">
          <img @click="editInfo"
               v-if="JSON.stringify(profile) !== '{}'"
               :src="profile.face"
               alt="">
          <img v-else
               src="../../assets/imgs/personal/index/head@2x.png"
               alt="">
        </div>
        <div class="text">
          <span class="span1"
                @click="editInfo"
                v-if="JSON.stringify(profile) !== '{}'">{{profile.nickname || $t('personalPage.noNickName')}}</span>
          <nuxt-link tag="span"
                     v-else
                     class="span1"
                     to="/login?redirect=personal">{{$t('login')}}/{{$t('regist')}}</nuxt-link>
          <nuxt-link tag="span"
                     v-if="JSON.stringify(profile) === '{}'"
                     class="span2"
                     to="/order/search">手机号查单</nuxt-link>

        </div>
        <div class="icon-kefu"
             data-agl-cvt="1"
             @click="contactCustom">
          <img src="../../assets/imgs/personal/index/kefu.png"
               alt="">
        </div>
      </div>
      <div class="elsecon"
           v-if="!isLogin">
        <div>
          <nuxt-link to="/login?redirect=personal">查看{{$t('personalPage.riceGrain')}}</nuxt-link>
        </div>
        <div>
          <nuxt-link to="/login?redirect=personal">查看{{$t('coupons')}}</nuxt-link>
        </div>
      </div>
      <div class="elsecon"
           v-else>
        <div @click="myRice">
          <p class="p1">{{profile.total_points}}</p>
          <p class="p2">{{$t('personalPage.riceGrain')}}</p>
        </div>
        <div @click="myCon">
          <p class="p1">{{profile.total_coupons||0}}</p>
          <p class="p2">{{$t('coupons')}}</p>
        </div>
      </div>
    </div>
    <div class="body">
      <!-- 主要菜单 -->
      <div class="main-menu">
        <div class="menu-item"
             v-for="(item, index) in statusList"
             :key="index"
             @click="allOrders(item)">
          <dl>
            <dt>
              <img v-if="item.status === 'unpaid'"
                   src="../../assets/imgs/personal/index/ic_daichuxing@2x.png"
                   alt>
              <img v-else-if="item.status === 'wait'"
                   src="../../assets/imgs/personal/index/ic_weifukuan@2x.png"
                   alt>
              <img v-else-if="item.status === 'comment'"
                   src="../../assets/imgs/personal/index/ic_daipinglun@2x.png"
                   alt>
              <img v-else
                   src="../../assets/imgs/personal/index/ic_daichuxing@2x.png"
                   alt>
            </dt>
            <dd>{{item.title}}</dd>
          </dl>
        </div>
      </div>
      <p class="elsetitle">我的工具</p>
      <!-- 次级菜单 -->
      <div class="main-menu2">
        <nuxt-link tag="div"
                   class="menu-item"
                   to="/personal/money">
          <dl>
            <dt>
              <img src="../../assets/imgs/personal/index/ic_currency@2x.png"
                   alt>
            </dt>
            <dd>{{$t('personalPage.switchMoney')}}</dd>
          </dl>
        </nuxt-link>
        <nuxt-link tag="div"
                   class="menu-item"
                   :to="isLogin ? '/personal/exchange_discount': '/login?redirect=personal'">
          <dl>
            <dt>
              <img src="../../assets/imgs/personal/index/ic_discounts@2x.png"
                   alt>
            </dt>
            <dd>{{$t('personalPage.exchangeDiscount')}}</dd>
          </dl>
        </nuxt-link>
        <nuxt-link tag="div"
                   class="menu-item"
                   :to="isLogin ? '/personal/follow': '/login?redirect=personal'">
          <dl>
            <dt>
              <img src="../../assets/imgs/personal/index/ic_favorite@2x.png"
                   alt>
            </dt>
            <dd>{{$t('personalPage.myCollection')}}</dd>
          </dl>
        </nuxt-link>
        <nuxt-link tag="div"
                   class="menu-item"
                   :to="isLogin ? '/personal/contactsList?type=list': '/login?redirect=personal'">
          <dl>
            <dt>
              <img src="../../assets/imgs/personal/index/ic_passenger@2x.png"
                   alt>
            </dt>
            <dd>{{$t('personalPage.commonPassenger')}}</dd>
          </dl>
        </nuxt-link>
        <div class="menu-item"
             @click="goToUnion">
          <dl>
            <dt>
              <img src="../../assets/imgs/personal/index/ic_distribution@2x.png"
                   alt>
            </dt>
            <dd>{{$t('distributionPage.distribution')}}</dd>
          </dl>
        </div>
      </div>
      <div>
        <!-- 底部导航 -->
        <Tabbar :Index="3"></Tabbar>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {getProfile} from '@/api/profile'
import {joinStatus} from '@/api/sale_union'
/* import onCustomerService from '@/assets/js/customerService.js' */
import {replaceServerUrl} from '@/assets/js/utils'
import Tabbar from '@/components/tabbar'
export default {
  name: 'component_name',
  components: {
    Tabbar,
  },
  data() {
    return {
      profile: {},
      active: 3,
      isLogin: false,
    }
  },
  created() {
    this.statusList = [
      {
        status: '',
        title: this.$t('personalPage.allOrder'),
      },
      {
        status: 'unpaid',
        title: this.$t('personalPage.waitPay'),
      },
      {
        status: 'wait',
        title: this.$t('personalPage.waitTrip'),
      },
      {
        status: 'comment',
        title: this.$t('personalPage.waitComment'),
      },
    ]
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      // 1. 是否有token。有就请求个人信息；无则return
      let res = await getProfile()
      let {code, data} = res
      if (code === 0) {
        this.profile = data
        this.isLogin = true
        this.vxSetProfile(data)
      } else {
        this.isLogin = false
      }
    },
    editInfo() {
      //跳转编辑信息
      if (this.isLogin) {
        this.$router.push({
          path: '/personal/account',
        })
      } else {
        this.$router.push({
          path: '/login?redirect=personal',
        })
      }
    },
    myRice() {
      //跳转我的米粒
      if (this.isLogin) {
        this.$router.push({
          path: '/personal/account_rice',
        })
      } else {
        this.$router.push({
          path: '/login?redirect=personal',
        })
      }
    },
    myCon() {
      //跳转我的优惠卷
      if (this.isLogin) {
        this.$router.push({
          path: '/personal/coupon',
        })
      } else {
        this.$router.push({
          path: '/login?redirect=personal',
        })
      }
    },
    //跳转全部订单
    allOrders(item) {
      if (this.isLogin) {
        this.$router.push({
          name: 'personal-order',
          query: {
            userId: this.profile.customer_id,
            status: item.status,
          },
        })
      } else {
        this.$router.push({
          path: '/login?redirect=personal',
        })
      }
    },
    // 跳转联盟
    async goToUnion() {
      console.log(this.isLogin)
      if (this.isLogin) {
        let {code, data, msg} = await joinStatus()
        if (code === 0) {
          if (data.is_agent === 1) {
            this.$router.push({
              name: 'personal-sale_union',
            })
          } else {
            this.$router.push({
              name: 'personal-sale_union-union_apply',
            })
          }
        } else {
          this.$toast.fail(msg)
        }
      } else {
        this.$router.push({
          path: '/login?redirect=personal',
        })
      }
    },
    contactCustom() {
      /* onCustomerService() */
      let url = replaceServerUrl()
      window.open(url, '_self')
    },
    ...mapMutations({
      vxSetProfile: 'profile/setProfile',
    }),
  },
}
</script>
<style lang="scss" scoped>
.personal {
  background-color: #f1f1f1;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.header {
  width: 750px;
  height: 374px;
  opacity: 1;
  position: relative;
  padding: 0 32px;
  box-sizing: border-box;

  .setting {
    width: 100%;
    height: 88px;
    padding-top: 22px;

    .set {
      float: right;
      width: 40px;
      height: 40px;

      img {
        width: 40px;
        height: 40px;
      }
    }
  }

  .con {
    margin-top: 20px;
    width: 100%;
    height: 160px;

    .box {
      width: 160px;
      height: 160px;
      border-radius: 80px;
      overflow: hidden;
      float: left;

      img {
        width: 160px;
        height: 160px;
      }
    }

    .text {
      float: left;
      padding: 10px 0;

      .span1 {
        color: #2d2d2d;
        font-size: 32px;
        display: inline-block;
        line-height: 140px;
        margin-left: 30px;
      }

      .span2 {
        width: 158px;
        height: 48px;
        border: 2px solid rgba(0, 171, 249, 1);
        opacity: 1;
        border-radius: 44px;
        display: inline-block;
        text-align: center;
        margin-top: 46px;
        color: rgba(0, 171, 249, 1);
        font-size: 20px;
        line-height: 44px;
      }
    }

    .icon-kefu {
      float: right;
      margin-right: -32px;
      margin-top: 38px;

      img {
        width: 132px;
        height: 72px;
      }
    }
  }

  .elsecon {
    width: 100%;
    height: 60px;

    div {
      width: 50%;
      float: left;
      height: 60px;
      text-align: center;
      font-size: 24px;
      color: #00abf9;
      line-height: 60px;

      a {
        color: #00abf9 !important;
        font-size: 24px;
        line-height: 60px;
      }

      .p1 {
        color: #00abf9;
        font-size: 32px;
        font-weight: bold;
        line-height: 50px;
      }

      .p2 {
        color: #a2a2a2;
        font-size: 24px;
        line-height: 40px;
      }
    }
  }
}

.body {
  padding: 0 32px;
  background: #f1f1f1;

  .main-menu {
    width: 686px;
    height: 162px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 12px rgba(57, 57, 57, 0.16);
    opacity: 1;
    border-radius: 20px;
    position: relative;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;

    .menu-item {
      text-align: center;
      flex: 1;
      font: 24px/24px '';
      color: #a2a2a2;

      img {
        width: 60px;
        height: 60px;
      }

      dt {
        margin-bottom: 10px;
      }
    }
  }

  .main-menu2 {
    width: 686px;
    height: 284px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 12px rgba(57, 57, 57, 0.16);
    opacity: 1;
    border-radius: 20px;
    position: relative;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    flex-direction: row;
    flex-wrap: wrap;

    .menu-item {
      text-align: center;
      font: 24px/24px '';
      color: #a2a2a2;
      width: 170px;

      img {
        width: 60px;
        height: 48px;
      }

      dt {
        margin-bottom: 10px;
      }
    }
  }

  .elsetitle {
    font-size: 32px;
    font-weight: bold;
    line-height: 54px;
    padding: 20px;
    width: 100%;
    color: #2d2d2d;
  }
}

.footer {
  padding: 25px 32px;
  background: #fff;
  display: flex;
  display: -webkit-flex;
  position: fixed;
  width: 100%;
  bottom: 0;

  .f-el {
    flex: 1;
    color: rgb(160, 157, 157);
    text-align: center;

    dt {
      font: 48px/48px '';
    }

    dd {
      font: 22px/22px '';
    }
  }

  .active {
    color: #399ef6;
  }
}
</style>
