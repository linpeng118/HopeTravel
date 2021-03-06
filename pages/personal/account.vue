<template>
  <div>
    <div class="header">
      <van-nav-bar
        class="bar-shadow"
        :title="$t('personalPage.myAccount')"
        @click-left="onClickLeft"
        @click-right="savePersonalInfo"
        left-arrow
      >
        <span class="header-btn" slot="right">{{$t('save')}}</span>
      </van-nav-bar>
    </div>
    <div class="body">
      <van-cell>
        <template slot="title">
          <span class="custom-text">{{$t('personalPage.avatar')}}</span>
          <van-uploader :after-read="onRead">
            <img v-if="newProfile.face" :src="newProfile.face" class="avatar">
          </van-uploader>
          <!--<div><img class="user-pic" slot="right-icon" :src="newProfile.face" alt></div>-->
        </template>
      </van-cell>
      <van-field :label="$t('personalPage.nickName')" v-model="newProfile.nickname" :placeholder="$t('personalPage.plhdNickName')"/>
      <div class="space-line"></div>
      <!--姓名-->
      <van-cell :title="$t('name')" is-link @click="modifyNames">
        <template slot="title">
          <span class="custom-text">{{$t('name')}}</span>
          <span class="all-name" v-if="newProfile.last_name">{{newProfile.chinese_name}} {{newProfile.last_name}}/{{newProfile.first_name}}</span>
        </template>
      </van-cell>
      <!--性别-->
      <div class="sex">
        <div class="title">{{$t('personalPage.sex')}}：</div>
        <div class="sex-radio">
          <van-radio-group v-model="newProfile.gender">
            <van-radio class="man" name="m">{{$t('man')}}</van-radio>
            <van-radio class="woman" name="f">{{$t('woman')}}</van-radio>
          </van-radio-group>
        </div>
      </div>
      <van-cell :title="$t('personalPage.dateOfBirth')" @click="showBirthday = !showBirthday">
        <span>{{newProfile.dob}}</span>
      </van-cell>
      <div class="space-line"></div>
      <!--手机号码-->
      <van-cell :isLink="newProfile.phone ? false : true" @click="changePhone">
        <template slot="title">
          <span class="custom-text">{{$t('personalPage.phoneNumber')}}</span>
          <span v-if="newProfile.phone">{{newProfile.phone}}</span>
          <span v-else class="color-g">{{$t('personalPage.verifyPhone')}}</span>
        </template>
      </van-cell>

      <van-cell :isLink="newProfile.email ? false : true" @click="changeEmail">
        <template slot="title">
          <span class="custom-text">{{$t('email')}}</span>
          <span v-if="newProfile.email">{{newProfile.email}}</span>
          <span v-else class="color-g">{{$t('personalPage.plhdEmail')}}</span>
        </template>
      </van-cell>

    </div>
    <!--姓名-->
    <van-popup v-model="nameShow" position="right" :overlay="false" class="show-popup">
      <account-name @closeNameLayer="modifyNames" :names="names" @nameChange="getNameChange"></account-name>
    </van-popup>
    <!--出生日期-->
    <van-popup v-model="showBirthday" position="bottom" :overlay="true">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmBirthday"
        @cancel="showBirthday = !showBirthday"
      />
    </van-popup>
    <!--手机号码-->
    <van-popup v-model="showPhone" position="right" :overlay="false" class="show-popup">
      <account-phone @closeNameLayer="showPhone=!showPhone" @validatePhone="validatePhone"></account-phone>
    </van-popup>
    <!--email-->
    <van-popup v-model="showEmail" position="right" :overlay="false" class="show-popup">
      <account-email @closeNameLayer="showEmail=!showEmail" @validatePhone="validatePhone" @sendEmail="sendEmail"></account-email>
    </van-popup>
    <!--头像-->
    <van-popup v-model="showAvatar" position="right" :overlay="false" class="show-popup">
      <account-avatar @closeNameLayer="showAvatar=!showAvatar" :avatar="avatar" :nickname="newProfile.nickname" @uploadAvatar="uploadAvatar"></account-avatar>
    </van-popup>
    <!-- 退出登录 -->
    <div class="sign-out-btn-con">
      <van-button class="sign-out-btn" @click="logout" block>{{$t('personalPage.logout')}}</van-button>
    </div>
  </div>
</template>
<script>
import {modifyProfile} from '@/api/profile'
import AccountName from '@/components/account/name'
import AccountPhone from '@/components/account/phone'
import AccountEmail from '@/components/account/email'
import AccountAvatar from '@/components/account/avatar'
import { getProfile } from "@/api/profile";
import {mapMutations,mapGetters} from 'vuex'
import {clearCookieByKey} from '@/assets/js/utils'
import {
  TOKEN,
} from '@/assets/js/config'

export default {
  name: "component_name",
  components: {
    AccountName,
    AccountPhone,
    AccountEmail,
    AccountAvatar
  },
  data() {
    return {
      nickname: "", //昵称
      nameShow: false,  //
      currentDate: new Date(), // 当前日期
      minDate: new Date('1900/01/01'),
      maxDate: new Date(),
      showBirthday: false, // 生日
      showPhone: false, // 手机号码
      showEmail: false, // 邮箱
      showAvatar: false, // 头像框
      avatar: '', // 头像
    };
  },
  computed: {
    names() {
      return {
        last_name: this.profile.last_name,
        first_name: this.profile.first_name,
        chinese_name: this.profile.chinese_name,
      }
    },
    newProfile() {
      return this.profile
    },
    ...mapGetters([
      'profile'
    ])
  },
  mounted() {
    if(JSON.stringify(this.profile) === '{}') {
      this.init()
    }
  },
  methods: {
    async init() {
      // 1. 是否有token。有就请求个人信息；无则return
      let res = await getProfile()
      let {code, data} = res
      if(code === 0) {
        this.vxSetProfile(data)
      }
    },
    onClickLeft() {
     let href = window.location.href.slice(-1)
      if(href == '#'){
        this.$router.go(-2)
      } else {
        this.$router.go(-1)
      }
    },
    // 退出登录
    logout() {
      this.$dialog.confirm({
        message: '是否退出登录'
      }).then(() => {
        clearCookieByKey(TOKEN)
        this.vxSetProfile({})
        this.$router.push({
          path: '/personal'
        })
      }).catch(() => {
      });
    },
    async savePersonalInfo() {
      let {chinese_name,first_name,last_name,gender,dob,nickname,face} = this.newProfile
      const _data = {
        chinese_name,first_name,last_name,gender,dob,nickname,face
    }
      let {code, data,msg} = await modifyProfile(_data)
      if(code === 0) {
        let obj = {
          chinese_name: data.chinese_name,
          customer_id: data.customer_id,
          dob: data.dob,
          email: data.email,
          exchange_price: data.exchange_price,
          face: data.face,
          first_name: data.first_name,
          gender: data.gender,
          last_name: data.last_name,
          nickname: data.nickname,
          phone: data.phone,
          tel_code: data.tel_code,
          total_points: data.total_points,
        }
        this.vxSetProfile(obj)
        this.$toast({
          type: 'success',
          message: '保存成功',
          duration: 2000
        })
        setTimeout(() => {
          this.$router.push({
            path: '/personal'
          })
        }, 2000)
        // this.$toast('保存成功')
      } else {
        this.$toast(msg)
      }
    },
    modifyNames() {
      this.nameShow = !this.nameShow
    },
    // 获取头像图片
    onRead(file) {
      // console.log('sdasd')
      this.avatar = file.content
      this.showAvatar = !this.showAvatar
    },
    // 获得头像
    uploadAvatar(avatar) {
      this.newProfile.face = avatar
      this.showAvatar = !this.showAvatar
      // console.log(this.newProfile)
    },
    // 绑定手机号
    changePhone() {
      if(!this.newProfile.phone) {
        this.showPhone = !this.showPhone
      }
    },
    // 绑定手机号成功
    validatePhone(phone) {
      this.showPhone = !this.showPhone
      this.newProfile.phone = phone
    },
    // 绑定邮箱
    changeEmail() {
      if(!this.newProfile.email) {
        this.showEmail = !this.showEmail
      }
    },
    // 绑定邮箱成功
    sendEmail(email) {
      this.showEmail = !this.showEmail
      this.newProfile.email = email
    },
    getNameChange(value) {
      this.nameShow = false
      this.newProfile.last_name = value.last_name
      this.newProfile.first_name = value.first_name
      this.newProfile.chinese_name = value.chinese_name
    },
    // 生日选择
    confirmBirthday(){
      this.showBirthday = !this.showBirthday
      this.newProfile.dob = this._getYMD(this.currentDate)
    },
    // 年月日
    _getYMD(value){
      let _arr = [value.getFullYear(), value.getMonth() + 1, value.getDate()]
      for(let i = 0; i < 3;i ++) {
        if(_arr[i] < 10) {
          _arr[i] = '0' + _arr[i]
        }
      }
      return _arr.join('-')
    },
    ...mapMutations({
      vxSetProfile: 'profile/setProfile'
    })
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
  .avatar{
    height: 52px;
    width: 52px;
    vertical-align: middle;
  }
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
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    .title {
      flex: 0 0 180px;
      font-size: 28px;
      width: 100px;
    }
    .sex-radio {
      flex: 0 0 1;
      .man,
      .woman {
        float: left;
        font-size: 20px;
        width: 120px;
      }
    }
  }
  .space-line{
    height: 24px;
    background-color: #F1F1F1;
  }
  .custom-text{
    width: 180px;
    display: inline-block;
  }
  .color-g{
    color: #9F9F9F;
  }
  .all-name{}
}
.show-popup{
  width: 100%;
  height: 100%;
}
.sign-out-btn-con {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px 142px;
  .sign-out-btn {
    background: rgba(57, 158, 246, 1);
    color: #fff;
    border-radius: 8px;
  }
}
</style>
