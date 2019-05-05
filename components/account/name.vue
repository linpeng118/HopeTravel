<template>
  <div>
    <van-nav-bar :title="$t('name')" left-arrow @click-left="onClickLeft" class="header"/>
    <div class="line">
      <label class="tit">{{$t('accountComp.englishName')}}</label>
      <input class="en-f-name" type="text" :placeholder="$t('lastName')" v-model="last_name" >
      <span class="cut">|</span>
      <input class="en-l-name" type="text" :placeholder="$t('firstName')" v-model="first_name">
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
      last_name: this.names.last_name || '',
      first_name:  this.names.first_name || '',
      chinese_name:  this.names.chinese_name || ''
    };
  },
  methods: {
    // 派发事件，关闭图层
    onClickLeft() {
      this.$emit('closeNameLayer')
    },
    // 派发事件
    nameChange(){
      if(this.chineseOrNot(this.last_name + this.first_name) === 'hasChinese') {
        this.$toast(this.$t('accountComp.chineseNoEnglish'))
      } else if(this.chineseOrNot(this.chinese_name) === 'noChinese') {
        this.$toast(this.$t('accountComp.chineseNoEnglish'))
      } else {
        this.$emit('nameChange', {
          last_name: this.last_name,
          first_name: this.first_name,
          chinese_name: this.chinese_name
        })
      }
    },
    // 判断中英文
    chineseOrNot(value){
      let val = value.trim()
      for(let i = 0,len = val.length; i < len; i++) {
        if(val[i].charCodeAt(i)>256) {
          return 'hasChinese'
        } else {
          return 'noChinese'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .header{
    border-bottom: 1px solid #dedede;
  }
  .line {
    padding:5px 0;
    margin: 0 40px;
    font: 28px/80px "";
    border-bottom: 1px solid #E4E4E4;
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
