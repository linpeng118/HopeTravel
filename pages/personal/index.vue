<template>
  <div class="personal">
    <div class="header">
      <div class="info" v-if="JSON.stringify(profile) !== '{}'">
        <div class="user-pic" @click="editInfo">
          <img class :src="profile.face" alt>
        </div>
        <div class="user-info">
          <div class="name">{{profile.nickname || $t('personalPage.noNickName')}}</div>
          <div class="rice">
            <span @click="myRice">{{$t('riceGrain')}}}：{{profile.total_points}} <van-icon color="#fff" name="arrow" size="1em" /></span>
            <span @click="myCon">{{$t('coupons')}}：{{profile.total_coupons||0}} <van-icon color="#fff" name="arrow" size="1em"/></span>
          </div>
        </div>
        <div class="user-edit" @click="editInfo">
          <img src="../../assets/imgs/personal/index/edit.png" alt>
        </div>
      </div>
      <nuxt-link tag="div" to="/login" class="go-login" v-else>{{$t('login')}}/{{$t('regist')}}</nuxt-link>
    </div>
    <div class="body">
      <!-- 主要菜单 -->
      <div class="main-menu">
        <div class="menu-item" v-for="(item, index) in statusList" :key="index" @click="allOrders(item)">
          <dl>
            <dt>
              <img v-if="item.status === 'unpaid'" src="../../assets/imgs/personal/index/unpaid.png" alt>
              <img v-else-if="item.status === 'wait'" src="../../assets/imgs/personal/index/will_go.png" alt>
              <img v-else-if="item.status === 'finish'" src="../../assets/imgs/personal/index/gone.png" alt>
              <img v-else src="../../assets/imgs/personal/index/order.png" alt>
            </dt>
            <dd>{{item.title}}</dd>
          </dl>
        </div>
      </div>
      <!-- 次级菜单 -->
      <div class="sub-menu">
        <van-cell :title="$t('personalPage.myCollection')" is-link :to="isLogin ? '/personal/follow': '/login?redirect=personal'">
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/attention.png">
          </template>
        </van-cell>
        <van-cell :title="$t('personalPage.commonPassenger')" is-link :to="isLogin ? '/personal/contactsList?type=list': '/login?redirect=personal'">
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/passenger.png">
          </template>
        </van-cell>
        <!--分销-->
        <!--<van-cell title="我的分销" is-link :to="isLogin ? '/personal/sale_union': '/login?redirect=personal'">-->
        <van-cell :title="$t('personalPage.myDistribution')" is-link @click="goToUnion">
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/sales.png">
          </template>
        </van-cell>
        <van-cell :title="$t('personalPage.switchMoney')" is-link to="/personal/money">
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/currency.png">
          </template>
        </van-cell>
      </div>
      <!-- 次级菜单 -->
      <div class="sub-menu">
        <van-cell :title="$t('personalPage.feedback')" is-link to="/personal/content">
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/feedback.png">
          </template>
        </van-cell>
        <van-cell :title="$t('contactService')" is-link url="http://p.qiao.baidu.com/cps/chat?siteId=12524949&userId=26301226">
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/service.png">
          </template>
        </van-cell>
        <van-cell :title="$t('personalPage.seting')" is-link to="/personal/setting">
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/setting.png">
          </template>
        </van-cell>
      </div>
    </div>

    <div>
      <van-tabbar v-model="active" active-color="#399EF6">
        <van-tabbar-item icon="wap-home" to="/">{{$t('personalPage.homepage')}}</van-tabbar-item>
        <van-tabbar-item icon="location-o" to="/search">{{$t('personalPage.myDistribution')}}</van-tabbar-item>
        <van-tabbar-item icon="chat-o" url="http://p.qiao.baidu.com/cps/chat?siteId=12524949&userId=26301226">{{$t('onlineConsult')}}}</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/personal">{{$t('personalPage.userCenter')}}</van-tabbar-item>
      </van-tabbar>
    </div>

  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import { getProfile } from "@/api/profile"
import { joinStatus } from "@/api/sale_union"

export default {
  name: "component_name",
  data() {
    return {
      profile: {},
      active: 3,
      isLogin: false
    };
  },
  created() {
    this.statusList = [
      {status:'', title: this.$t('personalPage.allOrder')},
      {status:'unpaid', title: this.$t('personalPage.waitPay')},
      {status:'wait', title: this.$t('personalPage.waitTrip')},
      {status:'finish', title: this.$t('personalPage.alreadyTrip')},
    ]
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      // 1. 是否有token。有就请求个人信息；无则return
      let res = await getProfile();
      let {code, data} = res;
      if(code === 0) {
        this.profile = data
        this.isLogin = true
        this.vxSetProfile(data)
      } else {
        this.isLogin = false
      }
    },
    editInfo() {
      //跳转编辑信息
      if(this.isLogin) {
        this.$router.push({
          path: "/personal/account"
        });
      } else {
        this.$router.push({
          path: '/login?redirect=personal'
        })
      }
    },
    myRice() {
      //跳转我的米粒
      if(this.isLogin) {
        this.$router.push({
          path: "/personal/account_rice"
        });
      } else {
        this.$router.push({
          path: '/login?redirect=personal'
        })
      }
    },
    myCon() {
      //跳转我的优惠卷
      if(this.isLogin) {
        this.$router.push({
          path: "/personal/coupon"
        });
      } else {
        this.$router.push({
          path: '/login?redirect=personal'
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
            status: item.status
          }
        })
      } else {
        this.$router.push({
          path: '/login?redirect=personal'
        })
      }

    },
    // 跳转联盟
    async goToUnion() {
      console.log(this.isLogin)
      if (this.isLogin) {
        let {code,data,msg} = await joinStatus()
        if(code === 0) {
          if(data.is_agent === 1) {
            this.$router.push({
              name: 'personal-sale_union'
            })
          } else {
            this.$router.push({
              name: 'personal-sale_union-union_apply'
            })
          }
        } else {
          this.$toast.fail(msg)
        }
      } else {
        this.$router.push({
          path: '/login?redirect=personal'
        })
      }
    },
    ...mapMutations({
      vxSetProfile: 'profile/setProfile'
    })
  }
};
</script>
<style lang="scss" scoped>
  .personal{
    background-color: #F1F1F1;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .header {
    width: 750px;
    height: 318px;
    background: rgba(57, 158, 246, 1);
    opacity: 1;
    position: relative;
    padding: 0 32px;
    box-sizing: border-box;
    .info {
      color: #fff;
      .user-pic {
        position: absolute;
        top: 48px;
        left: 32px;
        width: 142px;
        height: 142px;
        img {
          width: 142px;
          height: 142px;
          border-radius: 50%;
          overflow: hidden;
        }
      }
      .user-info {
        position: absolute;
        top: 74px;
        left: 198px;
        .name {
          /*width: 84px;*/
          height: 40px;
          font-size: 28px;
          font-weight: 400;
          line-height: 40px;
          color: rgba(255, 255, 255, 1);
          opacity: 1;
        }
        .rice {
          margin-top: 8px;
          span {
            height: 32px;
            font-size: 22px;
            padding:3px 20px;
            font-weight: 300;
            line-height: 32px;
            color: rgba(255, 255, 255, 1);
            opacity: 1;
            border-radius:20px;
            border:2px solid rgba(255,255,255,1);
            i{
              top:5px;
            }
          }
          button {
            height: 32px;
            background: rgba(255, 255, 255, 1);
            opacity: 1;
            border-radius: 16px;
            font-size: 22px;
            font-weight: bold;
            line-height: 32px;
            color: rgba(57, 158, 246, 1);
          }
        }
      }
      .user-edit {
        position: absolute;
        top: 76px;
        right: 32px;
        img {
          width: 32px;
          height: 32px;
        }
      }
    }
    .go-login{
      color: #fff;
      font-size:28px;
      padding-top: 88px;
    }
  }
  .body {
    padding: 0 32px;
    background: #f1f1f1;
    .main-menu {
      width: 686px;
      height: 162px;
      background: #fff;
      opacity: 1;
      border-radius: 8px;
      position: relative;
      top: -88px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      .menu-item {
        text-align: center;
        flex: 1;
        font: 24px/24px "";
        color: #5e5e5e;
        img {
          width: 40px;
          height: 36px;
        }
        dt {
          margin-bottom: 20px;
        }
      }
    }
    .sub-menu {
      width: 686px;
      position: relative;
      top: -65px;
      background: #fff;
      border-radius: 8px;
      margin-bottom: 24px;
    }
    .icon-size {
      width: 48px;
      height: 48px;
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
        font: 48px/48px "";
      }
      dd {
        font: 22px/22px "";
      }
    }
    .active {
      color: #399ef6;
    }
  }
</style>
