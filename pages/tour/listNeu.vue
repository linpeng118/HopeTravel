<template>
  <div class="scenic">
    <div class="header">
      <van-nav-bar
  :title="sceincName?sceincName:'景区列表'"
  left-text="返回"
  left-arrow
  :fixed="true"
  :z-index="121"
  :border="false"
  @click-left="onClickLeft"
>
</van-nav-bar>
    </div>
      <ul>
          <van-list
            v-model="isLoading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >    
                <nuxt-link v-for="item in sceincList" :key="item.tour_city_id" :to="`/tour/detailNeu?tourId=${item.tour_city_id}`"
                  tag="li" 
                  class="scenic-list-link">
                
                  <img :src="item.image" alt="img">
               
                <div class="scenic-message">
                  <p class="nearby-name">{{item.name}}</p>
                  <p class="nearby-brief">{{item.brief||$t('tour.no-con1')}}</p>
                  <p class="nearby-price" v-if="item.ticket_price">门票：{{item.ticket_price}}</p>
                </div>
                </nuxt-link>  
          </van-list>
           </ul>
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
      value: '',
      sceincName:'',
    }
  },
  mounted () {
    if(this.$route.query.title){
    this.sceincName = decodeURIComponent(this.$route.query.title)+'景点';
    }
    this.getSceincList({
        city_id: this.$route.query.city_id,
        page: 1,
        page_size: 20
      })
  },
  methods: {
    // 返回上一级
    onClickLeft() {
      this.$router.go(-1)
    },
    // 滑动会请求数据
     onLoad() {
      var page = page || this.pagination.page
      var page_size = this.pagination.page_size
      const submitData = {
        page: page + 1,
        page_size: page_size,
        }
        this.getSceincList(submitData)
      },
     async getSceincList(subData) {
       this.isLoading = true
         let {code, data} = await getSceincList(subData)
        if (code === 0) {
          this.sceincList.push(...data.items)
          console.log( this.sceincList);
          
          this.pagination = data.pagination
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
    },
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
  width: 100%;
  min-height: 100vh;
  background:rgba(243,243,243,1);
  padding-top: 136px;
  .header{

  }
  ul{
    width: 686px;
    margin: 0 auto;
    
      .scenic-list-link{
      width: 686px;
      height: 168px;
      background-color: #fff;
      padding: 20px 0 20px 20px;
      margin-bottom: 16px; 
      overflow: hidden;   
      img{
        float: left;
        width: 170px;
        height: 128px; 
      }
      .scenic-message{
        float: left;
        margin-left: 18px;
        position: relative;
        p:nth-child(1){
          font-size:36px;
          font-weight:bold;
          line-height:50px;
          color:rgba(29,29,29,1);
        }
        p:nth-child(2){
          margin-top: 4px;
          font-size:24px;
          font-weight:400;
          line-height:34px;
          color:rgba(29,29,29,1);
        }
        p:nth-child(3){
          margin-top: 12px;
          font-size:24px;
          font-weight:500;
          line-height:34px;
          color:rgba(158,158,158,1);
        }
      }
      }
    
  }
  
  
}

</style>
<style lang="scss">
  //vant重写
  //navbar 标题重写
    .header .van-nav-bar__title{
      font-size: 40px;
      font-weight: bold;
      color:rgba(29,29,29,1);
    }
    //navbar 阴影消除
    .scenic .header.van-nav-bar{
  
      box-shadow: none !important;
      -webkit-box-shadow: none !important;
    }
    //navbar 返回重写
    .scenic .header .van-nav-bar__text{
    color:rgba(29,29,29,1) !important;
    font-size: 36px;
    line-height: 50px;
  }
</style>
