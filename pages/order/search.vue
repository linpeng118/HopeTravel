<template>
  <div class="search-page">
    <van-nav-bar class="search-header tours-no-bb"
      title="手机号查单"
      @click-left="onClickLeft">
      <van-icon name="arrow-left"
        slot="left" />
    </van-nav-bar>
    <!-- 查询 -->
    <div class="search-content-wrap">
      <!-- <area-code :proAreaCode="areaCode"
        :proPhone.sync="phone" /> -->
    </div>
    <!-- 区号面板 -->
    <van-popup v-model="isShowList"
      position="right"
      style="width:100%;height: 100%;">
      <tel-code :pageparent="'/personal/addContacts'"
        :dataObj="moreLists"
        @selectCode="selectCode"
        ref="moreList2"
        @back="toggleAreaList">
      </tel-code>
    </van-popup>
  </div>
</template>

<script>
  import TelCode from '@/components/confirm_foot/telcode'
  import {guojialist} from '@/api/contacts'

  export default {
    components: {
      TelCode
    },
    props: {
      proAreaCode: {
        type: [Number, String],
        default: '86'
      },
    },
    data() {
      return {
        // 是否显示列表
        isShowList: false,
        // 区号与电话
        areaCode: '86',
        phone: '',
        // 数据
        moreLists: {},
      }
    },
    computed: {},
    mounted() {
      this.init()
    },
    methods: {
      async init() {
        // 获取国家列表
        let {data, code, msg, hot_country} = await guojialist()
        if (code === 0) {
          this._nomalLizePinyin(data, hot_country)
        } else {
          console.log('error:', msg)
        }
      },
      //格式化拼音列表
      _nomalLizePinyin(data, hot) {
        let len = data.length;
        let len2 = hot.length;
        let obj = {
          '热门城市': []
        };
        for (let i = 0; i < len2; i++) {
          obj['热门城市'].push({...hot[i]})
        }
        for (let i = 0; i < len; i++) {
          if (!obj[data[i].key]) {
            obj[data[i].key] = []
          }
          obj[data[i].key].push({...data[i]})
        }
        this.moreLists = obj
      },
      toggleAreaList() {
        this.isShowList = !this.isShowList
      },
      selectCode(area) {
        console.log()
        this.areaCode = area[0].telcode
        this.$emit('update:proAreaCode', area[0].telcode)
        this.toggleAreaList()
      },
      onClickLeft() {
        this.$router.go(-1)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .search-page {
    min-height: 100vh;
    background: #f5f4f9;
    .search-header {
      height: 88px;
      font-size: 32px;
      transition: all 0.5s;
      background-color: #fff;
    }
    .search-content-wrap {
      margin: 28px auto;
      width: 686px;
      height: 490px;
      background: rgba(255, 255, 255, 1);
      opacity: 1;
    }
  }
</style>