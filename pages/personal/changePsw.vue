<template>
  <div class="change-psw-page">
    <normal-header :title="formStyle==1?$t('partcailComp.setPass'):$t('personalPage.changePassword')" />

    <!-- 设置密码 -->
    <div class="change-psw"
         v-if="formStyle==1">
      <div class="input-item">
        <div class="name">{{$t('password')}}：</div>
        <div class="input">
          <van-cell-group class="no-border-top-input">
            <van-field v-model="setPassword"
                       :placeholder="$t('partcailComp.enterPass')"
                       type="password" />
          </van-cell-group>
        </div>
      </div>
      <!-- 按钮 -->
      <van-button class="btn-change"
                  size="large"
                  :loading="submiting"
                  @click="onSetPsw">{{$t('sure')}}</van-button>
    </div>

    <!-- 修改密码 -->
    <div class="change-psw"
         v-if="formStyle==2">
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
import {changePwd, setPwd} from '@/api/member'
import {mapState, mapMutations} from 'vuex'
import {clearCookieByKey} from '@/assets/js/utils'
import {TOKEN} from '@/assets/js/config'

export default {
  components: {
    NormalHeader,
  },
  data() {
    return {
      oldPsw: '',
      password: '',
      checkPsw: '',
      submiting: false,
      formStyle: 1,
      setPassword: '',
    }
  },
  computed: {
    ...mapState({
      vxProfile: state => state.profile.profile,
    }),
  },
  mounted() {
    this.formStyle = this.vxProfile.is_password ? 2 : 1
  },
  methods: {
    ...mapMutations({
      vxSetProfile: 'profile/setProfile',
    }),
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
        clearCookieByKey(TOKEN)
        this.vxSetProfile({})
        this.$router.go(-2)
      } else {
        this.$toast(msg)
      }
      this.submiting = false
    },
    async onSetPsw() {
      if (!this.setPassword) {
        this.$toast(this.$t('partcailComp.nodataTips'))
        return
      }
      this.submiting = true
      const {code, data, msg} = await setPwd({
        password: this.setPassword,
      })
      if (code === 0) {
        this.$toast(this.$t('operateSuc'))
        this.$router.go(-2)
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
    padding-top: 60px;
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
