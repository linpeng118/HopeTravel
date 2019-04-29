<template>
  <div class="change-psw-page">
    <normal-header :title="$t('personalPage.changePassword')" />
    <div class="change-psw">
      <div class="input-item">
        <div class="name">{{$t('personalPage.oldPassword')}}：</div>
        <div class="input">
          <van-cell-group class="no-border-top-input">
            <van-field v-model="oldPsw"
              :placeholder="$t('personalPage.oldPasswordTips')"
              type="password" />
          </van-cell-group>
        </div>
      </div>
      <div class="input-item">
        <div class="name">{{$t('personalPage.newPassword')}}：</div>
        <div class="input">
          <van-cell-group class="no-border-top-input">
            <van-field v-model="password"
              :placeholder="$t('personalPage.newPasswordTips')"
              type="password" />
          </van-cell-group>
        </div>
      </div>
      <div class="input-item">
        <div class="name">{{$t('personalPage.againPassword')}}：</div>
        <div class="input">
          <van-cell-group class="no-border-top-input">
            <van-field v-model="checkPsw"
              :placeholder="$t('personalPage.againPasswordTips')"
              type="password" />
          </van-cell-group>
        </div>
      </div>
      <!-- 按钮 -->
      <van-button class="btn-change"
        size="large"
        :loading="submiting"
        @click="onChangePsw">{{$t('personalPage.confirmChange')}}</van-button>
    </div>
  </div>
</template>

<script>
  import NormalHeader from '@/components/header/normal'
  import {changePwd} from '@/api/member'

  export default {
    components: {
      NormalHeader
    },
    data() {
      return {
        oldPsw: '',
        password: '',
        checkPsw: '',
        submiting: false,
      }
    },
    computed: {},
    mounted() {},
    methods: {
      async onChangePsw() {
        if (!this.oldPsw) {
          this.$toast(this.$t('personalPage.oldPasswordTips'))
          return
        }
        if (!this.password) {
          this.$toast(this.$t('personalPage.newPasswordTips'))
          return
        }
        if (!this.checkPsw) {
          this.$toast(this.$t('personalPage.againPasswordTips'))
          return
        }
        if (this.password !== this.checkPsw) {
          this.$toast(this.$t('partcailComp.enterError'))
          return
        }
        this.submiting = true
        const {code, data, msg} = await changePwd({
          oldPsw: this.oldPsw,
          password: this.password,
          checkPsw: this.checkPsw,
        })
        if (code === 0) {
          this.$toast(this.$t('operateSuc'))
        } else {
          this.$toast(msg)
        }
        this.submiting = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .change-psw-page {
    .change-psw {
      text-align: center;
      .input-item {
        height: 112px;
        padding: 0 32px;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        .name {
          flex: 0 0 200px;
          font-size: 28px;
          font-weight: 300;
          line-height: 40px;
          color: #191919;
          text-align: right;
        }
        .input {
          flex: 1;
        }
      }
      .btn-change {
        margin-top: 28px;
        width: 596px;
        background: rgba(57, 158, 246, 1);
        color: #fff;
        border-radius: 10px;
        font-size: 36px;
        font-weight: 300;
      }
    }
    // 样式
    .no-border-top-input {
      &.van-hairline--top-bottom::after {
        border-top: 0px;
        border-bottom: 1px solid #e4e4e4;
      }
    }
  }
</style>
