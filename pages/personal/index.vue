<template>
  <div class="container">
    <div class="header">
      <div class="info">
        <div class="user-pic">
          <img class src="../../assets/imgs/personal/index/user_pic.png" alt>
        </div>
        <div class="user-info">
          <div class="name">用户名</div>
          <div class="rice">
            <span>米粒：100</span>
            <button @click="myRice">查看</button>
          </div>
        </div>
        <div class="user-edit" @click="editInfo">
          <img src="../../assets/imgs/personal/index/edit.png" alt>
        </div>
      </div>
    </div>
    <div class="body">
      <!-- 主要菜单 -->
      <div class="main-menu">
        <div class="menu-item" @click="allOrders">
          <dl>
            <dt>
              <img src="../../assets/imgs/personal/index/order.png" alt>
            </dt>
            <dd>全部订单</dd>
          </dl>
        </div>
        <div class="menu-item">
          <dl>
            <dt>
              <img src="../../assets/imgs/personal/index/unpaid.png" alt>
            </dt>
            <dd>待支付</dd>
          </dl>
        </div>
        <div class="menu-item">
          <dl>
            <dt>
              <img src="../../assets/imgs/personal/index/will_go.png" alt>
            </dt>
            <dd>待出行</dd>
          </dl>
        </div>
        <div class="menu-item">
          <dl>
            <dt>
              <img src="../../assets/imgs/personal/index/gone.png" alt>
            </dt>
            <dd>已出行</dd>
          </dl>
        </div>
      </div>
      <!-- 次级菜单 -->
      <div class="sub-menu">
        <van-cell title="我的关注" is-link to>
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/attention.png">
          </template>
        </van-cell>
        <van-cell title="常用旅客" is-link to>
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/passenger.png">
          </template>
        </van-cell>
        <van-cell title="我的分销" is-link to>
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/sales.png">
          </template>
        </van-cell>
        <van-cell title="切换货币" is-link to>
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/currency.png">
          </template>
        </van-cell>
      </div>
      <!-- 次级菜单 -->
      <div class="sub-menu">
        <van-cell title="意见反馈" is-link to>
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/feedback.png">
          </template>
        </van-cell>
        <van-cell title="联系客服" is-link to>
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/service.png">
          </template>
        </van-cell>
        <van-cell title="设置" is-link to>
          <template slot="icon">
            <img class="icon-size" src="../../assets/imgs/personal/index/setting.png">
          </template>
        </van-cell>
      </div>
      <!-- 退出登录 -->
      <div class="sign-out-btn-con">
        <van-button class="sign-out-btn">退出登录</van-button>
      </div>
    </div>
    <div class="footer">
      <dl class="f-el">
        <dt>
          <van-icon name="wap-home"></van-icon>
        </dt>
        <dd>
          <span>主页</span>
        </dd>
      </dl>
      <dl class="f-el">
        <dt>
          <van-icon name="location-o"></van-icon>
        </dt>
        <dd>
          <span>目的地</span>
        </dd>
      </dl>
      <dl class="f-el">
        <dt>
          <van-icon name="chat-o"></van-icon>
        </dt>
        <dd>
          <span>在线咨询</span>
        </dd>
      </dl>
      <dl class="f-el active">
        <dt>
          <van-icon name="user-o"></van-icon>
        </dt>
        <dd>
          <span>我的</span>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
// import {mapActions} from 'vuex'
import { getProfile } from "@/api/profile.js";

export default {
  name: "component_name",
  data() {
    return {
      profile: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // ...mapActions({
    //   vxGetProfile: 'profile/getProfile'
    // }),
    async init() {
      // 1. 是否有token。有就请求个人信息；无则return
      let res = await getProfile();
      console.log(111111, res);
      let {code , data , msg} = res;
      this.prifile = data
      // let res = await this.vxGetProfile()
      // console.log(123, res.data)
      // this.prifile = res.data
    },
    editInfo() {
      //跳转编辑信息
      this.$router.push({
        path: "/personal/account"
      });
    },
    myRice() {
      //跳转我的米粒
      this.$router.push({
        path: "/personal/account_rice"
      });
    },
    allOrders() {
      //跳转全部订单
      this.$router.push({
        path: "/personal/order"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
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
        width: 84px;
        height: 40px;
        font-size: 28px;
        font-family: PingFang SC;
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
          font-family: PingFang SC;
          font-weight: 300;
          line-height: 32px;
          color: rgba(255, 255, 255, 1);
          opacity: 1;
        }
        button {
          width: 78px;
          height: 32px;
          background: rgba(255, 255, 255, 1);
          opacity: 1;
          border-radius: 16px;
          font-size: 22px;
          font-family: PingFang SC;
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
    align-items: center;
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
  .sign-out-btn-con {
    text-align: center;
    position: relative;
    top: -60px;
    .sign-out-btn {
      width: 464px;
      height: 80px;
      background: rgba(57, 158, 246, 1);
      border-radius: 8px;
      color: #fff;
    }
  }
}
.footer {
  padding: 25px 32px;
  background: #fff;
  display: flex;
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