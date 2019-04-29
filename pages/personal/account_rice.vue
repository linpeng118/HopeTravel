<template>
  <div class="container">
    <div class="header">
      <div class="nav-bar">
        <van-icon class="arrow" name="arrow-left" @click="onClickLeft"></van-icon>
        <span class="tittle">{{$t('personalPage.myRiceGrain')}}</span>
        <i class="description" @click="riceDetail">{{$t('personalPage.riceGrainDesc')}}</i>
      </div>
      <div class="usable-rice">
        <div class="usable-left">
          <h6>{{$t('personalPage.currentRiceGrain')}}</h6>
          <div class="num">{{profile.total_points}}</div>
        </div>
        <div class="usable-right">{{$t('personalPage.equivalent')}}{{profile.exchange_price}}</div>
      </div>
    </div>
    <div class="body">
      <!-- 次级菜单 -->
      <div class="sub-menu">
        <!--<van-list class="half" v-model="prodLoading" :prodFinished="prodFinished" finished-text="没有更多了" @load="onLoad">-->
          <!--<van-cell class="half-item" tagPos="bottom" v-for="(points,index) in pointsList" :key="index">-->

          <!--</van-cell>-->
        <!--</van-list>-->
        <van-list v-model="loading" :finished="finished" :finished-text="$t('noMore')" @load="onLoad">
          <van-cell class="half-item" tagPos="bottom" v-for="(points,index) in pointsList" :key="index">
            <div class="line clearfix">
              <div class="line-left fl">
                <h6>{{points.comment}}</h6>
                <p>{{points.date}}</p>
              </div>
              <div class="line-right fr">
                <h5 class="color1">
                  {{points.pending}}
                </h5>
              </div>
            </div>
          </van-cell>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import { getPoints } from "@/api/profile"
import {mapGetters} from 'vuex'
export default {
  name: "component_name",
  data() {
    return {
      pointsList: [],
      loading:false,
      finished:false,
      prodPagination: {},
      list: []
    };
  },
  computed: {
    ...mapGetters([
      'profile'
    ])
  },
  mounted() {
  },
  methods: {
    onClickLeft() {
     window.history.go(-1);
    },
    riceDetail(){
      this.$router.push({
        path:"/integral"
      })
    },
    async onLoad() {
      console.log('onload')
      const submitData = {
        page: (this.prodPagination.page || 0) + 1,
        t: +new Date()
      }
      // 异步更新数据
      const res = await getPoints(submitData)
      this.pointsList.push(...res.data)
      this.prodPagination = res.pagination
      // 加载状态结束
      this.loading = false;
      if (!this.prodPagination.more) {
        this.finished = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>

.container {
  background: #f1f1f1;
  height:100vh;
  .header {
    height: 318px;
    background: rgba(57, 158, 246, 1);
    opacity: 1;
    padding: 0 32px;
    .nav-bar {
      color: #fff;
      box-sizing: content-box;
      height: 80px;
      padding-top: 40px;
      position: relative;
      .arrow {
        width: 100px;
        font-size: 40px;
        line-height: 80px;
      }
      .tittle {
        width: 400px;
        text-align: center;
        font: bold 34px/80px "";
        position: absolute;
        left: 150px;
        top: 40px;
      }
      .description {
        font: 24px/80px "";
        position: absolute;
        right: 0;
        top: 45px;
      }
    }
    .usable-rice {
      color: #fff;
      box-sizing: content-box;
      position: relative;
      height: 180px;
      .usable-left {
        position: absolute;
        left: 0;
        top: 30px;
        h6 {
          font: 28px/28px "";
        }
        .num {
          margin-top: 20px;
          font: 80px/100px "";
        }
      }
      .usable-right {
        position: absolute;
        right: 0;
        bottom: 20px;
        font: 28px/28px "";
      }
    }
  }
  .body {
    padding: 0 32px 24px;
    background: #f1f1f1;

    .sub-menu {
      width: 686px;
      background: #fff;
      border-radius: 8px;
      margin-top: 24px;
      margin-bottom: 24px;
      padding:24px 26px 10px 26px;
      .line{
        height:120px;
        border-bottom:1px solid rgb(233, 232, 232);    
        .line-left{
          h6{
            font:28px/60px "";
            color:#191919;
          }
          p{
            font:24px/40px "";
            color:#989898;
          }
        } 
        .line-right{
          .color1{
            font:bold 40px/120px "";
            color:#399EF6;
          }
          .color2{
            font:bold 40px/120px "";
            color:#EF9A1A;
          }
        }    
      }
      
    }
   
  }
}
</style>
