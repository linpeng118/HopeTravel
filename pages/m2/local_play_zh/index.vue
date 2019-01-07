<template>
  <section class="container">
    <!-- banner -->
    <div class="banner"></div>
    <div>dfs</div>
  </section>
</template>

<script>

  export default {
    layout: 'defaultHeader',
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    background: #f1f1f1;
    height: 100%;
    .banner {
      height: 312px;
      background: url(../assets/imgs/bg_banner@2x.png) no-repeat 0 0/100%;
    }
    .hot-swiper,
    .hot-citys,
    .high-quality {
      background: #fff;
      .title {
        color: #191919;
        font-size: 40px;
        font-weight: 300;
        padding: 30px 0;
      }
    }
    .hot-swiper {
      height: 522px;
      width: 100%;
      padding-left: 32px;
      .swiper-wrapper {
        width: 100%;
        .swiper-slide {
          font-size: 38px;
          width: 332px !important;
          // padding-left: 32px;
        }
      }
    }
    .hot-citys {
      margin-top: 24px;
      padding: 0 30px;
      height: 268px;
      width: 100%;
      font-size: 0;
    }
    .high-quality {
      margin-top: 24px;
      .title {
        padding-left: 32px;
      }
      .scroll-topbar {
        width: 100%;
        .mint-navbar {
          overflow-x: scroll;
          .mint-tab-item {
            min-width: 22%;
          }
        }
      }
      .hq-tags {
        margin-top: 10px;
        padding: 0 30px;
        font-size: 0;
      }
      .high-quality-list-wrap {
        padding: 0 32px;
        .high-quality-list {
          .high-quality-item {
            display: inline-block;
            margin-right: 10px;
            margin-top: 34px;
          }
        }
      }
    }
  }
</style>

