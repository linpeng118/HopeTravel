<template>
  <section class="container">
    <lay-header v-if="!isApp"
      :title="$t('localPlayPage.moreCity')"
      :isSearch="false"
      :classBg="true"
      @leftClick="leftClick"></lay-header>
    <div class="listview"
      v-if="cityList.length"
      :style="{marginTop: isApp ? '1.76rem' : '1.173333rem'}">
      <!--:style="{paddingTop: isApp ? 0 : '1.173333rem'}"-->
      <van-collapse v-model="activeName"
        accordion>
        <van-collapse-item v-for="cityInfo in cityList"
          :key="cityInfo.countryId"
          :title="cityInfo.countryName"
          :name="cityInfo.countryId">
          <ul>
            <li class="list-group-item"
              v-for="item in cityInfo.cityInfo"
              :key="item.tour_city_id"
              @click="selectItem(item.tour_city_id)">{{item.city_name}}</li>
          </ul>
        </van-collapse-item>
      </van-collapse>
    </div>
    <loading v-if="!cityList.length "></loading>
  </section>
</template>

<script>
  import LayHeader from '@/components/header/index.vue'
  import Scroll from '@/components/sroll/index.vue'
  import {getCityList} from '@/api/local_play'
  import Loading from '@/components/loading'
  export default {
    name: 'moreCity',
    transition: 'page',
    components: {
      LayHeader,
      Scroll,
      Loading
    },
    data() {
      return {
        isApp: this.$route.query.platform,
        appVersion: this.$route.query.app_version,
        appLanguage: this.$route.query.language,
        appCurrency: this.$route.query.currency,
        appPhoneType: this.$route.query.phone_type,
        activeName: 1,
        cityList: [],
      }
    },
    async asyncData({$axios}) {

    },
    head() {
      return {
        title: '更多城市'
      }
    },
    created() {
      this.init()
    },
    beforeMount() {
      if (this.isApp) {
        if (this.appVersion) {
          this.jsBridge = require("@/assets/js/jsBridge").default;
        } else {
          this.appBridge = require("@/assets/js/appBridge").default;
        }
      }
    },
    mounted() {},
    methods: {
      // 返回上一级页面
      leftClick() {
        if (this.isApp) {
          if (this.appVersion) {
            this.jsBridge.webCallHandler('backPreviousView')
          } else {
            this.appBridge.backPreviousView()
          }
        } else {
          this.$router.go(-1)
        }
      },
      // 初始化数据
      async init() {
        let {data, code} = await getCityList()
        if (code === 0) {
          this.cityList = this._nomalLizeCityList(data)
        }
      },
      // 格式化aip得到的数据
      _nomalLizeCityList(obj) {
        let list = []
        for (let key in obj) {
          let {city_info, county_info} = obj[key]
          list.push({
            cityInfo: city_info,
            countryName: county_info.country_name,
            countryId: county_info.country_id
          })
        }
        return list
      },
      // 路由跳转
      selectItem(cityId) {
        let query = {
          touCityId: cityId
        }
        if (this.isApp) {
          let params = {
            path: `local_play_foreign?touCityId=${cityId}`
          }
          if (this.appVersion) {
            this.jsBridge.webCallHandler('jumpWebHTML', params)
          } else {
            this.appBridge.jumpWebHTML(params);
          }
        } else {
          this.$router.push({
            path: `/local_play_foreign`,
            query
          })
        }
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
  .listview {
    margin-top: 132px;
    .van-cell {
      border-top: 1px solid #dedede;
    }
    .van-collapse-item__content {
      padding: 0;
    }

    .van-cell__title {
      font-weight: bold;
    }
    .list-group-item {
      padding: 26px 0;
      margin: 0 32px;
      font-size: 24px;
      color: #191919;
      border-top: 1px solid #dedede;
    }
  }
</style>
