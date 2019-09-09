<template>
  <div class="scenic">
    <div class="header">
      <van-nav-bar class="login-header tours-no-bb"
                  ref="loginHeader"
                  :z-index="999" @click-left="leftClick" >
        <van-icon class="left-wrap"
                  name="arrow-left"
                  slot="left"><span style="position: relative; top: -3px; font-size: 14px">返回</span>
        </van-icon>
        <van-icon name="arrow-right" slot="right">
          <input
            type="text"
            class="search"
            v-model="value"
            placeholder="搜索景区"
            >
            <img src="../../assets/imgs/search.png"
              alt="search"
              class="search-img"
              @click="search"
            >
        </van-icon>
        
      </van-nav-bar>
    </div>
    
      <div class="scenic-list">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="isLoading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
              <div
                v-for="scenic in sceincList"
                :key="scenic.tour_city_id"
              >
                <nuxt-link
                  :to="`/tour/detail?tourId=${scenic.tour_city_id}`"
                  tag="div" 
                  class="scenic-list-product">
                <div class="scenic-list-product-img">
                  <img :src="scenic.image" alt="img">
                </div>
                <div class="scenic-list-product-item">
                  <div class="scenic-list-product-item-title">
                    <div class="scenic-list-product-item-title-name">{{ scenic.name }}</div>
                    <div class="scenic-list-product-item-title-weather">
                      <img src="../../assets/imgs/scenic-w2x.png" alt="天气">
                      <span>{{ scenic.weather }}</span>
                    </div>
                  </div>
                  <div class="scenic-list-product-item-info">{{scenic.brief}}</div>
                  <div class="scenic-list-product-item-price">门票:{{ scenic.ticket_price }}</div>
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
import { getSessionStore } from '@/assets/js/utils'
export default {
  data () {
    return {
      count: 0,
      isLoading: false,
      finished: false,
      sceincList: [],
      pagination: {},
      flag: false,
      value: ''
    }
  },
  mounted () {
    var list = JSON.parse(getSessionStore('sceincList'))
    if (list === null) {
      this.getSceincList({
        page: 1,
        page_size: 20
      })
    }else {
      if (list.length > 0) {
        this.sceincList = list
      } else {
        this.getSceincList({
        page: 1,
        page_size: 20
      })
      }
    }
  },
  methods: {
    // 返回上一级
    leftClick() {
      this.$router.go(-1)
    },
    // 滑动会请求数据
     onLoad() {
       var page = Number(getSessionStore('page'))
      console.log(page)
      var page = page || this.pagination.page
      var page_size = this.pagination.page_size
      const submitData = {
        page: page + 1,
        page_size: page_size,
        }
        this.getSceincList(submitData)
      },
    // 下拉刷新
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
          sessionStorage.setItem('sceincList',JSON.stringify(this.sceincList))
          sessionStorage.setItem('page',Number(data.pagination.page))
          // 加载状态结束
          this.isLoading = false
          // 数据全部加载完成
          if (this.pagination.page >= this.pagination.total_page) {
            this.finished = true
          }
        } else {
          this.pagination = {}
          this.isLoading = false
          this.finished = false
        }
      },
      // 搜索
      async search () {
        let { code, data } = await getSceincList({
          page: null,
          page_size: null,
          keyword: this.value
          })
          if (code === 0) {
            if (data.items.length){
              this.sceincList = data.items
            }else {
              this.$toast('未找到相关景点,请换一个关键词试试！');
            }
          } else {
            this.$toast('未找到相关景点,请换一个关键词试试！');
          }
        }
  }
}
</script>
<style>
  body{
    overflow: scroll!important;
    position: relative!important;
  }
</style>
<style scoped lang="scss">
.scenic {
  min-height: 100vh;
  .login-header {
    width: 100%;
    position: fixed;
  }
  .search {
    width: 550px;
    height: 55px;
    background: #DDDDDD;
    opacity: 0.6;
    border: none;
    border-radius: 40px;
    padding-left: 30px;
    font-size: 32px;
    // 清除默认样式
    appearance: none;
    -webkit-appearance: none;
  }
  /* 
    Set up and down centering failed,no reason found yet
    I think it is a reason for compatibility, but I don't know how to solve it.
  */
  ::-webkit-input-placeholder {
    color: #000 !important;
  }
  .search-img {
    position: absolute;
    width: 50px;
    height: 50px;
    right: 20px;
    top: 6px;
  }
  &-list {
    padding: 100px 0 0 0;
    &-product {
      width: 100%;
      height: 168px;
      margin-left: 40px;
      border-bottom: 1px solid #d2d2d2;
      background: #fff;
      border-radius: 8px;
      display: flex;
      align-items: center;
      &-img {
        width: 170px;
        height: 128px;
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
            width: 300px;
            // height: 50px;
            font-size: 36px;
            font-weight: bold;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          &-weather {
            display: flex;
            align-items: center;
            color: #9e9e9e;
            padding-right: 50px;
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
