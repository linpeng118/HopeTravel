<template>
  <div>
    <div class="header">
      <van-nav-bar
        class="bar-shadow"
        title="我的账号"
        @click-left="onClickLeft"
        @click-right="onClickRight"
        left-arrow
      >
        <span class="header-btn" slot="right">保存</span>
      </van-nav-bar>
    </div>

    <div class="body">
      <van-cell>
        <template slot="title">
          <span class="custom-text">头像</span>
          <img
            class="user-pic"
            slot="right-icon"
            src="../../assets/imgs/personal/account/user_pic.png"
            alt
          >
        </template>
      </van-cell>

      <van-cell title="头像">
        <img
          class="user-pic"
          slot="right-icon"
          src="../../assets/imgs/personal/account/user_pic.png"
          alt
        >
      </van-cell>
      <van-field label="昵称" v-model="pet_name" placeholder="请输入用户昵称" value="pet_name"/>

      <nuxt-link to="/personal/account_name">
        <van-field v-model="username" label="姓名" is-link value="username" placeholder="请输入姓名"/>
      </nuxt-link>

      <div class="sex">
        <div class="title">性别：</div>
        <div class="sex-radio">
          <van-radio-group v-model="radio">
            <van-radio class="man" name="1">单选框 1</van-radio>
            <van-radio class="woman" name="2">单选框 2</van-radio>
          </van-radio-group>
        </div>
      </div>

      <van-cell title="出生日期"></van-cell>

      <nuxt-link to="/personal/account_phone">
        <van-field
          v-model="iphone_num"
          label="手机号码"
          is-link
          value="iphone_num"
          placeholder="请输入手机号码"
        />
      </nuxt-link>

      <nuxt-link to="/personal/account_email">
        <van-field v-model="email" label="邮箱" is-link value="email" placeholder="完善邮箱信息，可获得100米粒"/>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";

export default {
  name: "component_name",
  components: {},
  data() {
    return {
      pet_name: "haha", //昵称
      username: "hehe", //姓名，
      iphone_num: 1555555111,
      email: "rg@163.com",
      radio: '1'
    };
  },
  methods: {
    onClickLeft() {
      window.history.go(-1);
    },
    onClickRight() {
      Toast("按钮");
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  .bar-shadow {
    box-shadow: 1px 1px 10px 1px #ccc;
  }
  .header-btn {
    color: #fff;
    width: 92px;
    height: 36px;
    background: rgba(57, 158, 246, 1);
    border-radius: 18px;
    font-size: 22px;
    padding: 2px 20px;
  }
}
.body {
  .user-pic {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    overflow: hidden;
    vertical-align: middle;
  }
  .sex {
    padding: 20px 30px;
    height: 80px;
    display: flex;
    align-items: center;
    .title {
      flex: 0 0 180px;
      font-size: 28px;
      width: 100px;
    }
    .sex-radio {
      flex: 0 0 1;
      .man,
      .woman {
        display: inline-block;
        font-size: 20px;
      }
    }
  }
}
</style>