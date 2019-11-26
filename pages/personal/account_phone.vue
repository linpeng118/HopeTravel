<template>
  <div>
    <van-nav-bar :title="$t('validatePhone')" left-arrow @click-left="onClickLeft"/>
    <div class="van-cell van-field">
      <div class="van-cell__title van-field__label">
        <span @click="showsel=true" > {{areaCode}} <van-icon name="arrow"/></span>
      </div>
      <div class="van-cell__value">
        <div class="van-field__body">
          <input type="text" :placeholder="$t('personalPage.plhdPhoneNum')" class="van-field__control">
        </div>
      </div>
    </div>

    <van-popup v-model="showsel" position="bottom" :overlay="true">
        <van-picker
            show-toolbar
            :title="$t('personalPage.chooseAreaCode')"
            :columns="columns"
            @cancel="onCancel"
            @confirm="onConfirm"
        />
    </van-popup>

    <van-field
        v-model="verification"
        :placeholder="$t('plhdSMS')"
    >
        <van-button slot="button" size="small" type="primary">{{$t('personalPage.sendVerifyCode')}}</van-button>
    </van-field>
    <div class="btn_container">
      <button class="sure">{{$t('sure')}}</button>
    </div>


  </div>
</template>
<script>
import { Toast } from "vant";

export default {
  name: "component_name",
  data() {
    return {
      showsel:false, //是否显示下拉框
      areaCode:"+86" ,//初始和回填的区号
      phoneNum: "",//手机号码
      verification:"",//短信验证码
      columns: [
        { text: '中国' ,value:"+86"},
        { text: '美国' ,value:"+01"},
        { text: '日本' ,value:"+83" },
       
      ]

    };
  },
  methods: {
    onClickLeft() {
      window.history.go(-1);
    },
    onConfirm(value, index) {
        this.areaCode = value.value;
        this.showsel = false; 
    //   Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
        this.showsel = false; 
    }

  }
};
</script>
<style lang="scss" scoped>
.btn_container {
    margin-top:50px;
  text-align: center;
  .sure {
    width: 596px;
    height: 84px;
    background: rgba(57, 158, 246, 1);
    opacity: 1;
    border-radius: 10px;
    color:#fff;
    font:36px/84px "";
  }
}
</style>
