<template>
  <!-- 居中 -->
  <van-row class="area-code-default"
    type="flex"
    align="center"
    :class="className">
    <van-col class="area-code-wrap"
      span="6"
      @click.native="toggleAreaList">
      <span class="area-code">+&nbsp;{{areaCode}}</span>
      <van-icon class="icon-arrow"
        name="arrow-down" />
    </van-col>
    <van-col class="mobile-input"
      v-show="!isShowList"
      span="18">
      <van-field class="phone"
        style=""
        v-model="phone"
        :placeholder="$t('plhdPhoneNumber')">
      </van-field>
    </van-col>
    <!-- 区号列表 -->
    <van-popup v-model="isShowList"
      position="bottom"
      :overlay="true">
      <van-picker v-if="araeList.length"
        :columns="araeList"
        @confirm="selectArea"
        @cancel="isShowList=false"
        show-toolbar
        title="选择区号" />
    </van-popup>
  </van-row>
</template>

<script>
  import {getCountryTelcodes} from '@/api'

  export default {
    components: {},
    props: {
      proAreaCode: {
        type: [Number, String],
        default: '86'
      },
      proPhone: {
        type: [Number, String],
        default: ''
      },
      className: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isShowList: false, // 是否显示列表
        areaCode: this.proAreaCode,
        phone: this.proPhone,
        araeList: []
      }
    },
    watch: {
      phone(val) {
        this.$emit('update:proPhone', val)
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      async init() {
        const {code, data, msg} = await getCountryTelcodes()
        if (code === 0) {
          this.araeList = data.map(item => ({
            text: `${item.countryName}（${item.tel_code}）`,
            code: item.tel_code,
            subname: item.countryName,
          }))
        } else {
          this.$toast(msg)
        }
      },
      toggleAreaList() {
        this.isShowList = !this.isShowList
      },
      selectArea(area) {
        this.areaCode = area.code
        this.$emit('update:proAreaCode', area.code)
        this.toggleAreaList()
      }
    },
  }
</script>

<style lang="scss" scoped>
  .area-code-default {
    // overflow: hidden;
    height: 80px;
    line-height: 80px;
    background: #fff;
    border-bottom: 1px solid #d9d9d9;
    border-radius: 10px;
    position: relative;
    .area-code-wrap {
      padding-left: 20px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      width: 160px;
      position: relative;
      .area-code {
        font-size: 32px;
        color: #000;
        overflow: hidden;
      }
      .icon-arrow {
        margin-left: 10px;
        font-size: 24px;
        color: #000;
      }
      // 竖线
      // &::after {
      //   content: "";
      //   position: absolute;
      //   right: 0;
      //   height: 60px;
      //   width: 2px;
      //   background: #c4c4c4;
      // }
    }
    .mobile-input {
      .phone {
        padding: 0 15px;
      }
    }
    .area-list {
      width: 100%;
      max-height: 40%;
      overflow: scroll;
      .area-item {
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        font-size: 28px;
        color: rgba(85, 85, 85, 1);
      }
    }
  }
</style>
