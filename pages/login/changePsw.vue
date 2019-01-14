<template>
  <div class="change-psw-page">
    <login-header rightText="登录"
      @callOnRigth="toLogin" />
    <h1 class="title">请设置你的新密码</h1>
    <div class="change-paw-wrap tours-tabs-nowrap">
      <van-field class="mobile tours-input"
        v-model="mobile"
        placeholder="请输入手机号" />
      <van-field class="password tours-input"
        v-model="password"
        type="password"
        placeholder="请设置密码" />
      <van-field class="check-password tours-input"
        v-model="checkPassword"
        type="password"
        placeholder="确认密码" />
      <span class="tip-text">密码为6-16位，支持数字和字母</span>
      <van-button class="btn-change-psw tours-button"
        size="large"
        :disabled="!canSubmit"
        @click="changePsw">完成</van-button>
    </div>
  </div>
</template>

<script>
  import loginHeader from '@/components/header/loginHeader'
  import areaCodeInput from '@/components/input/areaCode'

  export default {
    components: {
      loginHeader,
      areaCodeInput
    },
    data() {
      return {
        // 手机注册
        mobile: '',
        password: '',
        checkPassword: '',
        canSubmit: false, // 是否可提交
      }
    },
    computed: {},
    methods: {
      // 跳转至登录页
      toLogin() {
        this.$router.push({
          path: '/login'
        })
      },
      // 修改密码
      changePsw() {
        console.log('changePsw')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .change-psw-page {
    .title {
      padding-top: 136px;
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 56px;
      color: #555;
      opacity: 1;
      text-align: center;
    }
    .change-paw-wrap {
      margin-top: 122px;
      padding: 0 78px;
      .password {
        margin-top: 16px;
      }
      .check-password {
        margin-top: 16px;
      }
      .tip-text {
        font-size: 22px;
        font-weight: 300;
        color: rgba(196, 196, 196, 1);
      }
      .btn-change-psw {
        margin-top: 88px;
      }
    }
  }
</style>