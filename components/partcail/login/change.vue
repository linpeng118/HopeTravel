<template>
  <div class="change-comp">
    <h1 class="title">{{$t('partcailComp.setNewPass')}}</h1>
    <div class="content tours-tabs-nowrap">
      <van-cell-group>
        <van-field class="phone tours-input"
          v-model="account"
          :placeholder="$t('partcailComp.pleaseInput')"
          disabled />
        <van-field class="password tours-input"
          v-model="password"
          type="password"
          :placeholder="$t('partcailComp.setPass')" />
        <van-field class="check-password tours-input"
          v-model="checkPassword"
          type="password"
          :placeholder="$t('partcailComp.confirmPass')" />
      </van-cell-group>
      <span class="tip-text">{{$t('partcailComp.passInputTips')}}</span>
      <van-button class="btn-change-psw tours-button"
        size="large"
        :loading="submiting"
        @click="changePsw">{{$t('partcailComp.accomplish')}}</van-button>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import areaCodeInput from '@/components/input/areaCode'
  import {LOGIN_WAY} from '@/assets/js/consts'
  import {findPwd} from '@/api/member'

  export default {
    layout: 'default',
    head: {
      title: '修改密码'
    },
    components: {
      areaCodeInput
    },
    data() {
      return {
        redirect: this.$route.query.redirect,
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
          this.account = `${this.vxForgetForm.areaCode}-${this.vxForgetForm.phone}`
        } else if (this.vxForgetForm.type === LOGIN_WAY.EMAIL) {
          this.account = this.vxForgetForm.email
        } else {
          this.toForget()
        }
      },
      // 跳转至忘记密码
      toForget() {
        this.$emit('noFormDataCallBack')
      },
      // 修改密码
      async changePsw() {
        if (!this.password) {
          this.$toast(this.$t('partcailComp.nodataTips'))
        }
        if (this.checkPassword !== this.password) {
          this.$toast(this.$t('partcailComp.enterError'))
        }
        // 构造数据
        let subData = {}
        if (this.vxForgetForm.type === LOGIN_WAY.PHONE) {
          subData = {
            account: this.account,
            code: this.vxForgetForm.smsCode,
            password: this.password,
          }
        } else {
          subData = {
            account: this.account,
            code: this.vxForgetForm.emailCode,
            password: this.password,
          }
        }
        // 请求接口
        try {
          const {code, data, msg} = await findPwd(subData)
          if (code === 0) {
            this.$toast(`${this.$t('partcailComp.updateSuccess')}！`)
            setTimeout(() => {
              this.$emit('changeCallBack')
            }, 1000)
          } else {
            this.$toast(msg)
          }
        } catch (error) {
          console.log(error)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .change-comp {
    .title {
      font-size: 40px;
      font-weight: 400;
      line-height: 56px;
      color: rgba(85, 85, 85, 1);
      opacity: 1;
    }
    .content {
      margin-top: 100px;
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
