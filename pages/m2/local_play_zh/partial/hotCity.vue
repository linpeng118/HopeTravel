<template>
  <div class="hot-city">
    <h1 class="title">热门城市</h1>
    <div class="hot-list">
      <div class="hot-item" v-for="item in hotCityList" :key="item.id">
        <img :src="item.url" alt="">
        <div class="city-name">{{item.cityName}}</div>
      </div>
      <div class="hot-more">
        <nuxt-link to="/m2/local_play_foreign/moreCity">更多</nuxt-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'hotCity',
  transition: 'bounce',
  data() {
    return {
      hotCityList: [
        {
          id: 1,
          url: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1710/03/c5/61691946_1507022504917_mthumb.jpg',
          cityName: '美国'
        },
        {
          id: 2,
          url: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1710/03/c5/61691946_1507022504917_mthumb.jpg',
          cityName: '美国'
        },
        {
          id: 3,
          url: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1710/03/c5/61691946_1507022504917_mthumb.jpg',
          cityName: '美国'
        },
        {
          id: 4,
          url: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1710/03/c5/61691946_1507022504917_mthumb.jpg',
          cityName: '美国'
        },
        {
          id: 5,
          url: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1710/03/c5/61691946_1507022504917_mthumb.jpg',
          cityName: '美国'
        },
        {
          id: 6,
          url: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1710/03/c5/61691946_1507022504917_mthumb.jpg',
          cityName: '美国'
        },
        {
          id: 7,
          url: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1710/03/c5/61691946_1507022504917_mthumb.jpg',
          cityName: '美国'
        },
        {
          id: 8,
          url: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1710/03/c5/61691946_1507022504917_mthumb.jpg',
          cityName: '美国'
        },
        {
          id: 9,
          url: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1710/03/c5/61691946_1507022504917_mthumb.jpg',
          cityName: '美国'
        }
      ]
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../../../../assets/style/mixin/index.scss";
  .hot-city{
    padding: 0 32px;
    background: #fff;
    h1.title{
      padding:32px 0;
      font-size:40px;
      line-height:56px;
      font-weight:400;
      color:rgba(25,25,25,1)
    }
    .hot-list{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      .hot-item{
        width:220px;
        height:164px;
        margin-bottom: 20px;
        position: relative;
        background: #ccc;
        img{
          width: 100%;
          height: 100%;
          cursor: pointer;
          &:hover, &:focus{
            opacity: 0.8;
          }
        }
        .city-name{
          font-size:32px;
          font-weight:300;
          line-height:44px;
          color:#fff;
          text-align: center;
          @include center;
        }
      }
      .hot-more{
        width:180px;
        height:52px;
        margin: 28px auto 48px auto;
        a{
          display: block;
          background:rgba(57,158,246,1);
          border-radius:26px;
          text-align: center;
          color: #fff;
          font-size:28px;
          line-height: 52px;
          text-decoration: none;
          &:active{
            background:rgba(57,158,246,0.8);
          }
        }
      }
    }
  }
</style>
