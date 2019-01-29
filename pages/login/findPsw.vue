<template>
  <div class="change-psw-page">
    <login-header rightText="登录"
      @callOnRight="toLogin" />
    <h1 class="title">请设置你的新密码</h1>
    <div class="change-paw-wrap tours-tabs-nowrap">
      <van-cell-group>
        <van-field class="phone tours-input"
          v-model="account"
          placeholder="请输入"
          disabled />
        <van-field class="password tours-input"
          v-model="password"
          type="password"
          placeholder="请设置密码" />
        <van-field class="check-password tours-input"
          v-model="checkPassword"
          type="password"
          placeholder="确认密码" />
      </van-cell-group>
      <span class="tip-text">密码为6-20位，支持数字和字母</span>
      <van-button class="btn-change-psw tours-button"
        size="large"
        :loading="submiting"
        @click="changePsw">完成</van-button>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import loginHeader from '@/components/header/loginHeader'
  import areaCodeInput from '@/components/input/areaCode'
  import {LOGIN_WAY} from '@/assets/js/consts'
  import {findPwd} from '@/api/member'

  export default {
    layout: 'default',
    components: {
      loginHeader,
      areaCodeInput
    },
    data() {
      return {
        // 修改密码
        account: '',
        password: '',
        checkPassword: '',
        submiting: false, // 正在提交
        canSubmit: false, // 是否可提交
      }
    },
    computed: {
      ...mapState({
        vxForgetForm: state => state.login.forgetForm
      })
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        if (this.vxForgetForm.type === LOGIN_WAY.PHONE) {
          this.account = this.vxForgetForm.phone
        } else if (this.vxForgetForm.type === LOGIN_WAY.EMAIL) {
          this.account = this.vxForgetForm.email
        } else {
          this.toForget()
        }
      },
      // 跳转至登录页
      toLogin() {
        this.$router.push({
          path: '/login'
        })
      },
      // 修改密码
      async changePsw() {
        if (!this.password) {
          this.$toast('请输入密码')
        }
        if (this.checkPassword !== this.password) {
          this.$toast('密码不一致，请重新输入')
        }
        // 构造数据
        let subData = {}
        if (this.vxForgetForm.type === LOGIN_WAY.PHONE) {
          subData = {
            account: `${this.vxForgetForm.areaCode}-${this.vxForgetForm.phone}`,
            code: this.vxForgetForm.smsCode,
            password: this.password,
          }
        } else {
          subData = {
            account: this.vxForgetForm.areaCode,
            code: this.vxForgetForm.emailCode,
            password: this.password,
          }
        }
        // 请求接口
        try {
          const {code, data, msg} = await findPwd(subData)
          if (code === 0) {
            this.$toast('修改密码成功！')
            setTimeout(() => {
              this.toLogin()
            }, 1500)
          } else {
            this.$toast(msg)
          }
        } catch (error) {
          console.log(error)
        }
      },
      toForget() {
        this.$router.push({
          path: '/login/forget'
        })
      }
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