<template>
  <!-- 居中 -->
  <van-row class="area-code-input"
    type="flex"
    align="center"
    :class="className">
    <van-col class="area-code-wrap"
      span="6"
      @click.native="toggleAreaList">
      <span class="area-code">+&nbsp;{{areaCode}}</span>
      <van-icon class="icon-arrow"
        name="arrow" />
    </van-col>
    <van-col class="mobile-input"
      v-show="!isShowList"
      span="18">
      <van-field class="mobile"
        style=""
        v-model="mobile"
        :placeholder="$t('phoneNumber')">
      </van-field>
    </van-col>

    <van-popup v-model="isShowList" position="right" style="width:100%;height: 100%;">
      <tel-code :pageparent="'/personal/addContacts'"
                :dataObj="moreLists"
                @selectCode="selectCode"
                ref="moreList2"
                @back="toggleAreaList">
      </tel-code>
    </van-popup>
    <!--<van-col v-show="isShowList"-->
      <!--class="area-list"-->
      <!--span="18">-->
      <!--<div class="area-item"-->
        <!--v-for="(area,index) in araeList"-->
        <!--:key="index"-->
        <!--@click="selectArea(area)">-->
        <!--<div class="addr">{{area.addr}}</div>-->
        <!--<div class="code">{{area.code}}</div>-->
      <!--</div>-->
    <!--</van-col>-->
  </van-row>
</template>

<script>
  import TelCode from '@/components/confirm_foot/telcode'
  import {getCountryTelcodes} from '@/api'
  import {guojialist} from '@/api/contacts'
  export default {
    components: {TelCode},
    props: {
      proAreaCode: {
        type: [Number, String],
        default: '86'
      },
      proMobile: {
        type: [Number, String],
        default: ''
      },
      className:{
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isShowList: false, // 是否显示列表
        areaCode: this.proAreaCode,
        mobile: '',
        araeList: [],
        moreLists:{},
      }
    },
    watch: {
      mobile(val) {
        this.$emit('update:proMobile', val)
      }
    },
    mounted() {
      this.guojia()
    },
    methods: {
      async guojia(){
        let {data, code,msg,hot_country} = await guojialist()
        if (code === 0) {
          this._nomalLizePinyin(data,hot_country)
        }
        else {

        }

      },
      //格式化拼音列表
      _nomalLizePinyin(data,hot) {
        let len = data.length;
        let len2 = hot.length;
        let obj = {
          '热门城市':[]
        };
        for(let i= 0; i<len2; i++) {
          obj['热门城市'].push({...hot[i]})
        }
        for(let i= 0; i<len; i++) {
          if(!obj[data[i].key]) {
            obj[data[i].key] = []
          }
          obj[data[i].key].push({...data[i]})
        }


        this.moreLists=obj
      },
      // async init() {
      //   const {code, data, msg} = await getCountryTelcodes()
      //   if (code === 0) {
      //     this.araeList = data.map(item => ({
      //       code: item.tel_code,
      //       addr: item.countryName,
      //     }))
      //   } else {
      //     this.$toast(msg)
      //   }
      // },
      toggleAreaList() {
        this.isShowList = !this.isShowList
      },
      selectCode(area) {
        console.log()
        this.areaCode = area[0].telcode
        this.$emit('update:proAreaCode', area[0].telcode)
        this.toggleAreaList()
      }
    },
  }
</script>

<style lang="scss" scoped>
  .area-code-input {
    // overflow: hidden;
    height: 80px;
    line-height: 80px;
    background: rgba(255, 255, 255, 1);
    border: 2px solid rgba(196, 196, 196, 1);
    border-radius: 10px;
    position: relative;
    .area-code-wrap {
      padding-left: 20px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      max-width: 140px;
      position: relative;
      .area-code {
        font-size: 32px;
        color: #555;
        overflow: hidden;
      }
      .icon-arrow {
        margin-left: 10px;
        font-size: 24px;
        color: #555;
      }
      &::after {
        content: "";
        position: absolute;
        right: 0;
        height: 60px;
        width: 2px;
        background: #c4c4c4;
      }
    }
    .mobile-input {
      .mobile {
        padding: 0 15px;
      }
    }
    .area-list {
      position: absolute;
      right: -2px;
      top: 0;
      z-index: 999;
      background: #fff;
      border-radius: 0 10px 10px 10px;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.16);
      padding: 0 36px;
      width: 458px;
      max-height: 375px;
      overflow: scroll;
      &:after {
        content: "";
        display: inline-block;
        position: absolute;
        left: 0;
        top: 80px;
        width: 2px;
        height: 100%;
      }
      .area-item {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        border-bottom: 2px solid #c4c4c4;
        font-size: 28px;
        color: rgba(85, 85, 85, 1);
      }
    }
  }
</style>
