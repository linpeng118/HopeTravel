<template>
  <section class="container">
    <lay-header title="更多城市" :isSearch="false" :classBg="true" @leftClick="leftClick"></lay-header>
    <div class="listview">
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item v-for="cityInfo in cityList" :key="cityInfo.countryId" :title="cityInfo.countryName" :name="cityInfo.countryId">
          <ul>
            <li
              class="list-group-item"
              v-for="item in cityInfo.cityInfo"
              :key="item.tour_city_id"
              @click="selectItem(item.tour_city_id)"
              >{{item.city_name}}</li>
          </ul>
        </van-collapse-item>
      </van-collapse>
    </div>
  </section>
</template>

<script>
  import LayHeader from '@/components/header/index.vue'
  import Scroll from '@/components/sroll/index.vue'
  import {getCityList} from '@/api/local_play'
  import {getUrlParam} from '@/assets/js/utils'
  export default {
    name: 'moreCity',
    transition: 'page',
    components: {
      LayHeader,
      Scroll
    },
    data() {
      return {
        activeName: 1,
        cityList: []
      }
    },
    async asyncData({$axios}) {

    },
    created() {
      this.init()
      console.log(this.cityList)
    },
    mounted() {
      if (this.getPlatForm()) {
        this.appBridge = require('@/assets/js/appBridge.js').default
        this.appBridge.hideNavigationBar()
      }
    },
    methods: {
      // 判断是app还是web
      getPlatForm() {
        return getUrlParam('platform') ? true : false
      },
      // 返回上一级页面
      leftClick() {
        if (this.getPlatForm()) {
          this.appBridge.backPreviousView()
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
          let {city_info,county_info} = obj[key]
          list.push({
            cityInfo:city_info,
            countryName:county_info.country_name,
            countryId:county_info.country_id
          })
        }
        return list
      },
      // 路由跳转
      selectItem(cityId) {
        let query = {
          touCityId: cityId
        }
        if (this.getPlatForm()) {
          query.platform = 'app'
        }
        this.$router.push({
          path: `/local_play_foreign`,
          query
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .listview{

  }
</style>
<style type="text/scss" lang="scss">
  .listview{
    padding-top: 88px;
    .van-cell{
      border-top: 1px solid #DEDEDE;
    }
    .van-collapse-item__content{
      padding: 0;
    }
    .van-cell__title{
      font-weight: bold;
    }
    .list-group-item{
      padding:26px 0;
      margin: 0 32px;
      font-size:24px;
      color: #191919;
      border-top: 1px solid #DEDEDE;
    }
  }
</style>
