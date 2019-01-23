<template>
  <van-tabs class="regist-comp tours-tabs-nowrap">
    <!-- 手机号注册 -->
    <van-tab class="regist"
      title="手机号注册">
      <van-cell-group>
        <area-code-input class="mobile"
          :proMobile.sync="mobile" />
        <van-field class="password tours-input"
          v-model="password"
          center
          clearable
          icon="eye-o"
          placeholder="请输入密码"
          :type="pswInputType"
          @click-icon="toggleInputType">
        </van-field>
        <van-field class="password tours-input"
          v-model="smsCode"
          center
          clearable
          placeholder="请输入验证码">
          <van-button class="tours-button-noborder"
            slot="button"
            size="small"
            @click="getCode">获取验证码</van-button>
        </van-field>
      </van-cell-group>
    </van-tab>
    <!-- 请输入邮箱 -->
    <van-tab class="email-regist"
      title="请输入邮箱">
      <van-cell-group>
        <van-field class="email tours-input"
          v-model="email"
          placeholder="请输入邮箱" />
        <van-field class="password tours-input"
          v-model="password"
          center
          clearable
          icon="eye-o"
          placeholder="请输入密码"
          :type="pswInputType"
          @click-icon="toggleInputType">
        </van-field>
        <van-field class="auth-code tours-input"
          v-model="emailCode"
          center
          clearable
          placeholder="请输入验证码">
          <van-button class="tours-button-noborder"
            slot="button"
            size="small"
            @click="getCode">获取验证码</van-button>
        </van-field>
      </van-cell-group>
    </van-tab>
    <van-button class="btn-regist tours-button"
      size="large"
      :disabled="!canSubmit"
      @click="regist">注册</van-button>
    <div class="text">
      <van-checkbox class="tour-checkbox"
        v-model="checked">
        <span @click="onAgreement">我已经阅读并同意《服务协议》</span>
      </van-checkbox>
    </div>
  </van-tabs>
</template>

<script>
  import AreaCodeInput from '@/components/input/areaCode'
  import areaCodeInput from '@/components/input/areaCode'
  import {VERIFY_CODE} from '@/assets/js/consts'

  const TIME = 60 // 倒计时时间

  export default {
    components: {
      AreaCodeInput,
      areaCodeInput,
    },
    props: {
      showRegist: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // 手机注册
        mobile: '',
        canSubmit: false, // 是否可提交
        areaCode: '86', // 区号
        smsCode: '', // 短信验证码
        emailCode: '', // 邮箱验证码
        show: false,
        checked: false,
        pswInputType: 'password',
        // 邮箱注册
        email: '',
        password: '',
      }
    },
    computed: {
      showText() {
        if (this.codeType === VERIFY_CODE.START) {
          clearInterval(this.timer)
          return '获取验证码'
        } else if (this.codeType === VERIFY_CODE.GETTING) {
          return `${this.countDownTime} s`
        } else {
          clearInterval(this.timer)
          return '重新获取'
        }
      }
    },
    mounted() {},
    methods: {
      // 显示登录弹窗
      showLoginDlg() {
        this.$emit('showLoginDlg')
      },
      toggleInputType(val) {
        this.pswInputType = this.pswInputType === 'password' ? 'text' : 'password'
      },
      forgetPsw() {
        this.$router.push({
          path: '/regist/forget'
        })
      },
      // 获取验证码
      getCode() {
        // TODO:
      },
      onAreaCode() {
        console.log(123)
      },
      regist() {
        console.log(1)
      },
      mobileLogin() {
        console.log(2, this.mobile)
      },
      // 点击服务协议
      onAgreement() {
        console.log('onAgreement')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .regist-comp {
    margin-top: 100px;
    .regist,
    .email-regist {
      padding: 0 76px;
      .icon-arrow {
        position: absolute;
        top: 0;
        left: 50px;
        z-index: 999;
      }
    }
    .regist {
      .mobile {
        margin-top: 54px;
      }
      .password {
        margin-top: 16px;
      }
    }
    .email-regist {
      .email {
        margin-top: 54px;
      }
      .password {
        margin-top: 16px;
      }
      .auth-code {
        margin-top: 16px;
      }
    }
    .btn-regist {
      margin-top: 20px;
      width: 596px;
    }
    .text {
      margin-top: 30px;
      padding: 0 76px;
      text-align: left;
      font-size: 22px;
      span {
        color: rgba(57, 158, 246, 1);
      }
    }
  }
</style>