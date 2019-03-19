<template>
  <div class="personal">
    <div class="header">
      <div class="info" v-if="JSON.stringify(profile) !== '{}'">
        <div class="user-pic" @click="editInfo">
          <img class :src="profile.face" alt>
        </div>
        <div class="user-info">
          <div class="name">{{profile.nickname || '昵称还没有设置呢~'}}</div>
          <div class="rice">
            <span>米粒：{{profile.total_points}}</span>
            <button @click="myRice">查看</button>
          </div>
        </div>
        <div class="user-edit" @click="editInfo">
          <img src="../../assets/imgs/personal/index/edit.png" alt>
        </div>
      </div>
      <nuxt-link tag="div" to="/login" class="go-login" v-else>登录/注册</nuxt-link>
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
        <van-cell title="我的收藏" is-link :to="isLogin ? '/personal/follow': '/login?redirect=personal'">
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/attention.png">
          </template>
        </van-cell>
        <van-cell title="常用旅客" is-link :to="isLogin ? '/personal/contactsList?type=list': '/login?redirect=personal'">
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/passenger.png">
          </template>
        </van-cell>
        <!--分销-->
        <!--<van-cell title="我的分销" is-link :to="isLogin ? '/personal/sale_union': '/login?redirect=personal'">-->
        <van-cell title="我的分销" is-link to="/personal/sale_union">
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/sales.png">
          </template>
        </van-cell>
        <van-cell title="切换货币" is-link to="/personal/money">
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/currency.png">
          </template>
        </van-cell>
      </div>
      <!-- 次级菜单 -->
      <div class="sub-menu">
        <van-cell title="意见反馈" is-link to="/personal/content">
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/feedback.png">
          </template>
        </van-cell>
        <van-cell title="联系客服" is-link url="http://p.qiao.baidu.com/cps/chat?siteId=12524949&userId=26301226">
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/service.png">
          </template>
        </van-cell>
        <van-cell title="设置" is-link to="/personal/setting">
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/setting.png">
          </template>
        </van-cell>
      </div>
    </div>

    <div>
      <van-tabbar v-model="active" active-color="#399EF6">
        <van-tabbar-item icon="wap-home" to="/">主页</van-tabbar-item>
        <van-tabbar-item icon="location-o" to="/search">目的地</van-tabbar-item>
        <van-tabbar-item icon="chat-o" url="http://p.qiao.baidu.com/cps/chat?siteId=12524949&userId=26301226">在线咨询</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/personal">我的</van-tabbar-item>
      </van-tabbar>
    </div>

  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import { getProfile } from "@/api/profile";

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
      {status:'', title: '全部订单'},
      {status:'unpaid', title: '待支付'},
      {status:'wait', title: '待出行'},
      {status:'finish', title: '已出行'},
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
          span {
            width: 104px;
            height: 32px;
            font-size: 22px;
            font-weight: 300;
            line-height: 32px;
            color: rgba(255, 255, 255, 1);
            opacity: 1;
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
