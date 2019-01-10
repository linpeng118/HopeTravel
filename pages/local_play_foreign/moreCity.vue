<template>
  <section class="container">
    <lay-header title="更多城市" :isSearch="false" :classBg="true"></lay-header>
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
  export default {
    name: 'moreCity',
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
    created() {
      this.getInit()
    },
    methods: {
      // 初始化数据
      async getInit() {
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
        this.$router.push({
          path: `/local_play_foreign`,
          query: {
            touCityId: cityId
          }
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
  .bg-color{
    background: #fff !important;
    color: #3E3E3E !important;
    .left-wrap{
      color: #3E3E3E !important;
    }
  }
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
