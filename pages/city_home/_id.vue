<template>
  <div class="city-home-main" :style="{backgroundImage: `url(${img})`}">
    <!-- topBar -->
    <div class="top-bar-ld" @click="onClickLeft">
      <div class="go-jump-page">
        <template v-if="$route.query.sem"> 
          <img src="../../assets/imgs/cityHome/home@2x.png" alt="">
          <p>首页</p>
        </template>
        <template v-else>
          <van-icon name="arrow-left" size="0.64rem" />
        </template>
      </div>
      <div class="search-keywords">
        <van-search
          v-model="keywords"
          placeholder="搜索目的地/关键词"
          show-action
          shape="round"
          background="transparent"
          @search="onSearch">
          <div slot="action" @click="onSearch" style="color: #fff;">搜索</div>
        </van-search>
      </div>
      <nuxt-link class="persone-center" tag="div" to="/personal">
        <img src="../../assets/imgs/cityHome/person@2x.png" alt="">
      </nuxt-link>
    </div>
    <!-- title -->
    <div class="city-name-box">
      <span class="name">日本</span>
      <van-button type="default" size="mini" round>切换<van-icon name="play" /></van-button>
    </div>
    <!-- 中间配置区域 -->
    <div class="config-area-main">
      <!-- 8icons -->
      <div class="config-icons">
        <van-grid :border="false" :column-num="4">
          <van-grid-item v-for="value in 8" :key="value" >
            <div>
              <img src="https://assets.tourscool.com/uploads/inn/2019/08/02/952/QNAOvDz7ymXG-xU46lCiAsHDyRc.png" alt="">
              <div>sdfsdfsd</div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <!--  热门城市-->
      <div class="hot-city">
        <h2 class="title"><img src="../../assets/imgs/cityHome/hot_city_icon@2x.png">热门城市</h2>
        <van-grid :border="false" :column-num="3">
          <van-grid-item v-for="value in 6" :key="value" >
            <div class="tag">
              <span>dsfsdf</span>
              <em class="tips"></em>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 热门景点-->
      <div class="hot-points">
        <h2 class="title"><img src="../../assets/imgs/cityHome/hot_city_icon@2x.png">热门景点</h2>
        <van-grid :border="false" :column-num="3">
          <van-grid-item v-for="value in 3" :key="value" >
            <img-box position="bottom"></img-box>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 热门玩法 -->
      <div class="hot-play">
        <h2 class="title"><img src="../../assets/imgs/cityHome/hot_paly_icon@2x.png">热门玩法</h2>
        <div class="slide-box">
          <van-swipe :loop="false" :width="380" @change="onChange">
            <van-swipe-item v-for="n in 3" :key="n">
              <van-grid :border="false" :column-num="3">
                <van-grid-item v-for="n in 3" :key="'sdfsd'+n">
                  <img-box position="center" :isHot="true"></img-box>
                </van-grid-item>
              </van-grid>
            </van-swipe-item>
            <div class="custom-indicator" slot="indicator">
              <div v-for="n in 3" :key="'dfdfd'+n" :class="current+1 == n ? 'currernt':''"></div>
            </div>
          </van-swipe>
        </div>
        
      </div>
    </div>
    <!--  限时特价-->
    <div class="pro-lst-box">
      <h2 class="title"><img src="../../assets/imgs/cityHome/hot_sale_icon@2x.png">限时特价</h2>
      <div class="mian-b">
        <div class="half">
          <div class="item" v-for="value in 4" :key="'dfdfd'+value">
            <sale-item></sale-item>
          </div>
        </div>
        <nuxt-link to="/" tag="div" class="look-all">
          查看全部
        </nuxt-link>
      </div>
    </div>
    <!-- 热销推荐 -->
    <div class="pro-lst-box">
      <h2 class="title">热销推荐</h2>
      <div class="mian-b">
        <van-list v-model="loadingHot" :finished="finishedHot" finished-text="没有更多了" @load="onLoad">
          <div class="half">
            <div class="item" v-for="value in 4" :key="'dfdfd'+value">
              <city-product></city-product>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import ImgBox from '@/components/list/imgBox'
import SaleItem from '@/components/list/sale'
import CityProduct from '@/components/list/cityProduct'
export default {
  components:{
    ImgBox, SaleItem, CityProduct
  },
  data(){
    return {
      keywords: '', // 搜索关键词
      img: 'http://assets.tourscool.com/uploads/inn/2019/05/23/952/PvOp8X5Y_G5b2k-VsGiw39o7SEA.jpg',
      current: 0,
      loadingHot: false, // 加载热销商品
      finishedHot: false, // 是否加载完成
      productHotList: [
        {
          name:'',
          id: 15
        },
        {
          name: '23',
          id: 36
        }
      ]
    }
  },
  methods:{
    onClickLeft(){
      if(this.$route.query.sem) {
        this.$router.push('/')
      } else{
        this.$router.go(-1)
      }
    },
    onClickRight(){},
    onSearch(){},
    onChange(index){
      this.current = index;
    },
    onLoad(){

    }
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
  .city-home-main{
    position: relative;
    width: 100%;
    background-repeat: no-repeat;
    background-color: #f1f1f1;
    background-size: 100% 360px;
    &::before{
      content: '';
      width: 100%;
      height: 366px;
      background:linear-gradient(180deg,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.3) 50%,rgba(0,0,0,0.6) 100%);
      position: absolute;
      top: 0;
      left: 0;
    }
     h2.title{
      padding: 20px 0 20px;
      font-size:32px;
      color: #333;
      img{
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }
  .top-bar-ld{
    display: flex;
    height:88px;
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    align-items: center;
    .van-search{
      padding: 10px 0;
    }
    .go-jump-page{
      padding: 0 20px;
      color: #fff;
      font-size:18px;
      text-align: center;
    }
    .search-keywords{
      flex: 1;
    }
    .persone-center{
      padding: 0 20px;
    }
    img{
      width: 48px;
    }
  }
  .city-pic-show{
    position: absolute;
    height:366px;
  }
  .city-name-box{
    position: relative;
    padding: 124px 38px 100px 38px;
    display: flex;
    align-items: center;
    .name{
      font-size:48px;
      line-height:62px;
      font-weight:bold;
      color: #fff;
      margin-right: 20px;
    }
    i{
      vertical-align: text-bottom;
    }
  }
  .config-area-main{
    position: relative;
    padding: 30px 0 30px 30px;
    border-radius:74px 74px 0px 0px;
    background-color: #fff;
    .config-icons{
      font-size: 32px;
      color: #333;
      padding-right: 30px;
      padding-bottom: 30px;
      img{
        width: 136px;
        height: 136px;
      }
    }
    .hot-city{
      padding-right: 30px;
      padding-bottom: 30px;
      .tag{
        height:68px;
        width: 100%;
        border:3px solid #E5E5E5;
        border-radius:44px;
        line-height: 60px;
        text-align: center;
        font-size:28px;
        color: #5E5E5E;
        position: relative;
      }
      .tips{
        width: 52px;
        height: 32px;
        position: absolute;
        top: -20px;
        right: 0;
        display: inline-block;
        background: url('../../assets/imgs/cityHome/hot_icon@2x.png') no-repeat;
        background-size: cover;
      }
    }
    .hot-points{
      padding-right: 30px;
      padding-bottom: 30px;
    }
    .hot-play{
      .custom-indicator{
        height:8px;
        width: 96px;
        background: #ECECEC;
        border-radius:4px;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        & > div{
          width:32px;
          display: inline-block;
        }
        .currernt{
          background: #7BCDEC;
          border-radius:4px;
        }
      }
    }
  }
  .pro-lst-box{
    margin: 20px 0;
    padding: 10px 0;
    background: #fff;
    h2.title{
      padding-left: 30px;
    }
    .mian-b{
      padding:0 20px;
    }
    .look-all{
      line-height:38px;
      color: #0099FF;
      font-size:28px;
      text-align: center;
      padding: 30px 0;
    }
    .half{
      display: flex;
      flex-wrap:wrap;
      .item{
        width: 50%;
        padding: 0 10px;
      }
    }
  }

</style>
<style lang="scss">
.config-icons .van-grid-item__content{
  padding: 8px;
}
.hot-city .van-grid-item__content{
  padding: 16px 8px;
}
.hot-play .van-grid-item__content{
  padding: 16px 0 0 0;
  height: 170px;
  margin: 10px 14px 20px 0;
  position: relative;
}
.hot-points .van-grid-item__content{
  padding: 0 14px 0 0;
}
.pro-lst-box .van-grid-item__content{
  padding:0;
}
</style>