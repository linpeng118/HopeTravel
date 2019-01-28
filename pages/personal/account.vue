<template>
  <div>
    <div class="header">
      <van-nav-bar
        class="bar-shadow"
        title="我的账号"
        @click-left="onClickLeft"
        @click-right="saveProfile"
        left-arrow
      >
        <span class="header-btn" slot="right">保存</span>
      </van-nav-bar>
    </div>

    <div class="body">
      <van-cell>
        <template slot="title">
          <span class="custom-text">头像</span>
          <div>
            <img v-if="newProfile.face" :src="newProfile.face">
            <button id="pick-avatar">Select an image</button>
          </div>
          <!--<div><img class="user-pic" slot="right-icon" :src="newProfile.face" alt></div>-->
        </template>
      </van-cell>
      <van-field label="昵称" v-model="newProfile.nickname" placeholder="请输入用户昵称"/>
      <div class="space-line"></div>
      <!--姓名-->
      <van-cell title="姓名" is-link @click="modifyNames">
        <template slot="title">
          <span class="custom-text">姓名</span>
          <span class="all-name" v-if="newProfile.last_name">{{newProfile.chinese_name}} {{newProfile.last_name}}/{{newProfile.first_name}}</span>
        </template>
      </van-cell>
      <!--性别-->
      <div class="sex">
        <div class="title">性别：</div>
        <div class="sex-radio">
          <van-radio-group v-model="newProfile.gender">
            <van-radio class="man" name="m">男</van-radio>
            <van-radio class="woman" name="f">女</van-radio>
          </van-radio-group>
        </div>
      </div>
      <van-cell title="出生日期" @click="showBirthday = !showBirthday">
        <span>{{newProfile.dob}}</span>
      </van-cell>
      <div class="space-line"></div>
      <!--手机号码-->
      <van-cell :isLink="newProfile.phone ? false : true" @click="changePhone">
        <template slot="title">
          <span class="custom-text">手机号码</span>
          <span v-if="newProfile.phone">{{newProfile.phone}}</span>
          <span v-else class="color-g">请验证手机号码</span>
        </template>
      </van-cell>

      <van-cell :isLink="newProfile.email ? false : true" @click="changeEmail">
        <template slot="title">
          <span class="custom-text">邮箱</span>
          <span v-if="newProfile.email">{{newProfile.email}}</span>
          <span v-else class="color-g">完善邮箱信息，可获得100米粒</span>
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
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {modifyProfile} from '@/api/profile'
import AccountName from '@/components/account/name'
import AccountPhone from '@/components/account/phone'
import AccountEmail from '@/components/account/email'
export default {
  name: "component_name",
  components: {
    AccountName,
    AccountPhone,
    AccountEmail,
  },
  data() {
    return {
      nickname: "", //昵称
      nameShow: false,  //
      currentDate: new Date(), // 当前日期
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(),
      showBirthday: false, // 生日
      showPhone: false, // 手机号码
      showEmail: false, // 邮箱
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
  created() {
    // console.log(this.profile)
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    async saveProfile() {
      const _data = {

      }
      let {code, data} = await modifyProfile(_data)

    },
    modifyNames() {
      this.nameShow = !this.nameShow
    },
    // 头像
    handleUploaded(resp) {
      console.log(resp);
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
</style>
