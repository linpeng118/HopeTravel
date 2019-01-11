<template>
  <div class="login-page">
    <h1 class="title">稀饭旅行账号登陆</h1>
    <van-tabs class="login-wrap tours-tabs-nowrap">
      <van-tab title="普通登陆">
        <van-field v-model="username"
          placeholder="请输入用户名" />
        <van-field v-model="password"
          center
          clearable
          placeholder="请输入密码">
          <van-button slot="icon"
            size="small"></van-button>
          <van-button slot="button"
            size="small"
            type="primary">忘记密码</van-button>
        </van-field>
      </van-tab>
      <van-button size="large">登陆</van-button>
      <p>登陆即代表您已同意我们的<span>服务协议</span></p>
      <van-tab title="手机验证码登陆">
        手机验证码登陆
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        username: '',
        password: '',
      }
    },
    computed: {},
    mounted() {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .login-page {
    text-align: center;
    .title {
      padding-top: 136px;
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 56px;
      color: rgba(85, 85, 85, 1);
      opacity: 1;
    }
    .login-wrap {
      margin-top: 100px;
    }
  }
</style>