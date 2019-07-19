<template>
  <div class="area-code-only-comp">
    <!-- 区号 -->
    <div class="area-code clearfix">
      <h3 class="title">国家/地区</h3>
      <span class="desc">{{areaName}} {{proAreaCode}}</span>
      <van-icon class="icon-arrow fr"
        name="arrow"
        @click="onAreaArrow" />
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
        type: String,
        default: '86'
      }
    },
    data() {
      return {
        isShowList: false,
        areaName: '中国大陆',
        // 区号列表数据
        moreLists: {},
      }
    },
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
      onAreaArrow() {
        this.isShowList = true
      },
      selectCode(area) {
        console.log('area: ', area);
        this.areaCode = area[0].telcode
        this.areaName = area[0].name
        this.$emit('update:proAreaCode', area[0].telcode)
        this.toggleAreaList()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .area-code-only-comp {
    width: 100%;
    font-size: 0;
    .area-code {
      height: 84px;
      padding: 24px;
      font-size: 0;
      border-bottom: 1px solid rgba(222, 222, 222, 1);
      .title {
        display: inline-block;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(19, 19, 19, 1);
      }
      .desc {
        margin-left: 10px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(197, 197, 197, 1);
      }
      .icon-arrow {
        padding: 2px 20px;
        font-size: 30px;
      }
    }
  }
</style>