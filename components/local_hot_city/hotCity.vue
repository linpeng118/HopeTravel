<template>
  <div class="hot-city">
    <h1 class="hot-title">{{$t('localHotCityComp.hotCity')}}</h1>
    <div class="hot-list">
      <div class="hot-item" v-for="item in hotCityList" :key="item.start_city" @click="selectItem(item.start_city)">
        <img :src="item.image_url" alt="">
        <div class="city-name">
          <span class="title">{{item.title}}</span>
        </div>
      </div>
    </div>
    <div class="hot-more">
      <div class="link" @click="selectMore">{{$t('more')}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hotCity',
  props: {
    hotCityList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {}
  },
  methods: {
    selectItem(id) {
      this.$emit('clickItem', id)
    },
    selectMore() {
      this.$emit('selectMore')
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  @import "~/assets/style/mixin/index.scss";
  .hot-city{
    padding: 0 32px 48px 32px;
    background: #fff;
    h1.hot-title{
      padding:32px 0;
      font-size:40px;
      line-height:56px;
      font-weight:400;
      color:rgba(25,25,25,1)
    }
    .hot-list{
      display: flex;
      display: -webkit-flex;
      flex-wrap: wrap;
      -webkit-flex-wrap: wrap;
      justify-content: space-around;
      -webkit-justify-content: space-around;
      align-items: center;
      -webkit-align-items: center;
      .hot-item{
        width:220px;
        height:164px;
        margin-bottom: 20px;
        position: relative;
        background: #d8d8d8;
        border-radius: 6px;
        overflow: hidden;
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
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: rgba(0,0,0,0.3);
          .title{
            @include center;
          }
        }
      }
    }
    .hot-more{
      width:180px;
      height:52px;
      margin: 28px auto 0 auto;
      .link{
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
</style>
