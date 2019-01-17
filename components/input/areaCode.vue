<template>
  <!-- 居中 -->
  <van-row class="area-code-input"
    type="flex"
    align="center"
    :class="isShowList">
    <van-col class="area-code-wrap"
      span="6"
      @click.native="toggleAreaList">
      <span class="area-code">+ {{areaCode}}
      </span>
      <van-icon class="icon-arrow"
        name="arrow" />
    </van-col>
    <van-col class="mobile-input"
      v-show="!isShowList"
      span="18">
      <van-field class="mobile"
        style=""
        v-model="mobile"
        placeholder="请输入手机号">
      </van-field>
    </van-col>
    <van-col v-show="isShowList"
      class="area-list"
      span="18">
      <div class="area-item"
        v-for="area in araeList"
        :key="area.code"
        @click="selectArea(area)">
        <div class="addr">{{area.addr}}</div>
        <div class="code">{{area.code}}</div>
      </div>
    </van-col>
  </van-row>
</template>

<script>
  export default {
    components: {},
    props: {
      proMobile: {
        type: [Number, String],
        default: ''
      },
    },
    data() {
      return {
        isShowList: false, // 是否显示列表
        areaCode: '86',
        mobile: '',
        araeList: [
          {code: '86', addr: '中国大陆'},
          {code: '87', addr: '美国'},
          {code: '88', addr: '日本'},
          {code: '89', addr: '香港'},
          {code: '90', addr: '台湾'},
        ]
      }
    },
    watch: {
      mobile(val) {
        this.$emit('update:proMobile', val)
      }
    },
    mounted() {},
    methods: {
      toggleAreaList() {
        this.isShowList = !this.isShowList
      },
      selectArea(area) {
        this.areaCode = area.code
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
      align-items: center;
      max-width: 140px;
      position: relative;
      .area-code {
        font-size: 32px;
        color: #555;
      }
      .icon-arrow {
        margin-left: 20px;
        font-size: 24px;
        color: #555;
      }
      &::after {
        content: '';
        position: absolute;
        right: 0;
        height: 60px;
        width: 2px;
        background: #C4C4C4;
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
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #c4c4c4;
        font-size: 28px;
        color: rgba(85, 85, 85, 1);
      }
    }
  }
</style>