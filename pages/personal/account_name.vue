<template>
  <div>
    <van-nav-bar :title="$t('name')" left-arrow @click-left="onClickLeft"/>
    <div class="line">
      <label class="tit">{{$t('english')}}</label>
      <input class="en-f-name" type="text" :placeholder="$t('lastName')" v-model="last_name" >
      <span class="cut">|</span>
      <input class="en-l-name" type="text" :placeholder="$t('firstName')" v-model="first_name" >
    </div>
    <div class="line">
      <label class="tit">{{$t('chineseName')}}</label>
      <input class="ch-name" type="text" :placeholder="$t('plhdChineseName')" v-model="chinese_name">
    </div>
    <div class="btn_container" @click="nameChange">
      <button class="sure">{{$t('sure')}}</button>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";

export default {
  name: "account_name",
  props: {
    names: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      last_name: '',
      first_name: '',
      chinese_name: ''
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    nameChange(){
      this.$emit('nameChange', {
        last_name: this.last_name,
        first_name: this.first_name,
        chinese_name: this.chinese_name
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.line {
  padding:5px 10px 5px  40px;
  height:80px;
  font: 28px/80px "";
  border-bottom: 1px solid rgba($color: #ccc, $alpha: 0.5);
  .tit {
    width: 100px;
    text-align: right;
    margin-right: 30px;
    display: inline-block;
  }
  .en-f-name {
    width: 200px;
    border: none;
  }
  .cut {
    font: 40px/80px "";
    color: #ccc;
    margin: 0 30px;
  }
  .en-l-name {
    width: 200px;
    border: none;
  }
  .ch-name {
    width: 500px;
    border: none;
  }
}
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
