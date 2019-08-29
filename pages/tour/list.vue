<template>
  <div class="scenic">
    <van-nav-bar class="login-header tours-no-bb"
                 ref="loginHeader"
                 title="景区列表"
                 :z-index="999" @click-left="leftClick" >
      <van-icon class="left-wrap"
                name="arrow-left"
                slot="left" />
    </van-nav-bar>
    <div class="scenic-list">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="isLoading"
          :finished="finished"
          @load="onLoad"
        >
            <div
              class="scenic-list-product"
              v-for="scenic in sceincList"
              :key="scenic.tour_city_id"
            >
              <nuxt-link
                :to="`/tour/detail?tourId=${scenic.tour_city_id}`"
                tag="div" 
                class="scenic-list-product">
              <div class="scenic-list-product-img">
                <img :src="scenic.image" :alt="scenic.name">
              </div>
              <div class="scenic-list-product-item">
                <div class="scenic-list-product-item-title">
                  <div class="scenic-list-product-item-title-name">{{ scenic.name }}</div>
                  <div class="scenic-list-product-item-title-weather">
                    <img src="../../assets/imgs/scenic-w2x.png" alt="天气">
                    <span>阴</span>
                    <span>25-27C</span>
                  </div>
                </div>
                <div class="scenic-list-product-item-info">问水都江堰，拜道青城山</div>
                <div class="scenic-list-product-item-price">门票：￥60</div>
              </div>
              </nuxt-link>
            </div>
        </van-list>
      </van-pull-refresh>
    </div>
    
  </div>
</template>

<script>
import {getSceincList} from '@/api/sceinc'
export default {
  data () {
    return {
      count: 0,
      isLoading: false,
      finished: false,
      sceincList: [],
      pagination: {}
    }
  },
  created () {
    // this.getSceincList({
    //   page: 1,
    //   page_size: 10
    // })
    // console.log(this.sceincList)
  },
  methods: {
    // 返回上一级
    leftClick() {
      this.$router.go(-1)
    },
    // 滑动会请求数据
     onLoad() {
      console.log('onload')
        const submitData = {
          page: this.pagination.page + 1,
          page_size: this.pagination.page_size,
        }
        this.getSceincList(submitData)
    },
    // 上拉刷新
      async onRefresh(){
        this.sceincList= [],
      this.pagination= {}
        this.getSceincList({
        page: 1,
        page_size: 20
    })
      },
     async getSceincList(subData) {
       this.isLoading = true
        let {code, data} = await getSceincList(subData)
        if (code === 0) {
          this.sceincList.push(...data.items)
          this.pagination = data.pagination
          // 加载状态结束
          this.isLoading = false
          // 数据全部加载完成
          if (this.pagination.page >= this.pagination.total_page) {
            this.finished = true
          }
        } else {
          console.log(res.msg)
          
          this.pagination = {}
          this.isLoading = false
          this.finished = false
        }
      },
  }
}
</script>

<style scoped lang="scss">
.scenic {
  min-height: 100vh;
  background: #f3f3f3;
  &-list {
    padding: 40px 0 0 0;
    &-product {
      width: 686px;
      height: 168px;
      margin: 0 auto;
      margin-bottom: 16px;
      background: #fff;
      border-radius: 8px;
      display: flex;
      &-img {
        width: 170px;
        height: 128px;
        margin: 20px 0 20px 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &-item {
        flex: 1;
        padding: 14px 0 20px 18px;
        font-size: 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        color: #1d1d1d;
        &-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          &-name {
            font-size: 36px;
            font-weight: bold;
          }
          &-weather {
            display: flex;
            align-items: center;
            color: #9e9e9e;
            padding-right: 20px;
          }
        }
        &-price {
            color: #9e9e9e
          }
      }
    }
  }
}

</style>
