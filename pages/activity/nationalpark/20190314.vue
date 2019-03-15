<template>
  <div>
    <div class="section1"></div>
    <div class="section2">
      <div class="coupon">
        <img class="coupon-size" src="../../../assets/imgs/activity/nationalpack/title/9.png" alt>
        <img class="coupon-size" src="../../../assets/imgs/activity/nationalpack/title/10.png" alt>
        <img class="coupon-size" src="../../../assets/imgs/activity/nationalpack/title/11.png" alt>
        <img class="coupon-size" src="../../../assets/imgs/activity/nationalpack/title/12.png" alt>
      </div>
      <div class="s-bg">
        <img class src="../../../assets/imgs/activity/nationalpack/title/5.jpg" alt>
      </div>

      <div class="pro-flex">
        <a
          @click="jump('https://m.tourscool.com/product/detail?productId=533','tourscool://open/LineDetailsVC?productID=533')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/1.png" alt>
        </a>
        <a
          @click="jump('https://www.tourscool.com/tour535.html','tourscool://open/LineDetailsVC?productID=535')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/2.png" alt>
        </a>
        <a
          @click="jump('https://www.tourscool.com/tour538.html','tourscool://open/LineDetailsVC?productID=538')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/3.png" alt>
        </a>
        <a
          @click="jump('https://www.tourscool.com/tour539.html','tourscool://open/LineDetailsVC?productID=539')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/4.png" alt>
        </a>
        <a
          @click="jump('https://www.tourscool.com/tour541.html','tourscool://open/LineDetailsVC?productID=541')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/5.png" alt>
        </a>
        <a
          @click="jump('https://www.tourscool.com/tour515.html','tourscool://open/LineDetailsVC?productID=515')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/6.png" alt>
        </a>
        <a
          @click="jump('https://www.tourscool.com/tour557.html','tourscool://open/LineDetailsVC?productID=557')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/7.png" alt>
        </a>
        <a
          @click="jump('https://www.tourscool.com/tour721.html','tourscool://open/LineDetailsVC?productID=721')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/8.png" alt>
        </a>
      </div>

      <!-- 查看更多 -->
      <div class="more1">
        <a
          @click="jump('https://m.tourscool.com/product_list?category=&product_type=&span_city=131&start_city=&itemType=0','tourscool://open/ProductListVC?itemType=1&keyword=%E9%BB%84%E7%9F%B3')"
        >
          <img src="../../../assets/imgs/activity/nationalpack/title/6.png" alt>
        </a>
      </div>

      <!-- <div class="bg-item1">
        <img src="../../../assets/imgs/activity/nationalpack/title/1.png" alt>
      </div> -->



      <div class="pro-large1">
        <a
          @click="jump('https://www.tourscool.com/tour2513.html','tourscool://open/LineDetailsVC?productID=2513')"
        >
          <img src="../../../assets/imgs/activity/nationalpack/title/7.png" alt>
        </a>
      </div>

      <div class="pro-flex">
        <a
          @click="jump('https://www.tourscool.com/tour2448.html','tourscool://open/LineDetailsVC?productID=2448')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/9.png" alt>
        </a>
        <a
          @click="jump('https://www.tourscool.com/tour2207.html','tourscool://open/LineDetailsVC?productID=2207')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/10.png" alt>
        </a>
        <a
          @click="jump('https://www.tourscool.com/tour1732.html','tourscool://open/LineDetailsVC?productID=1732')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/11.png" alt>
        </a>
        <a
          @click="jump('https://www.tourscool.com/tour1727.html','tourscool://open/LineDetailsVC?productID=1727')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/12.png" alt>
        </a>
      </div>
      <!-- 查看更多 -->
      <div class="more2">
        <a
          @click="jump('https://m.tourscool.com/product_list?itemType=2&keyWords=%E4%BC%98%E8%83%9C%E7%BE%8E%E5%9C%B0','tourscool://open/ProductListVC?itemType=1&keyword=%E4%BC%98%E8%83%9C%E7%BE%8E%E5%9C%B0')"
        >
          <img src="../../../assets/imgs/activity/nationalpack/title/6.png" alt>
        </a>
      </div>

      <!-- <div class="bg-item2">
        <img src="../../../assets/imgs/activity/nationalpack/title/2.png" alt>
      </div> -->

      <div class="pro-large2">
        <a
          @click="jump('https://www.tourscool.com/tour1150.html','tourscool://open/LineDetailsVC?productID=1150')"
        >
          <img src="../../../assets/imgs/activity/nationalpack/title/8.png" alt>
        </a>
      </div>

      <div class="pro-flex">
        <a
          @click="jump('https://www.tourscool.com/tour2052.html','tourscool://open/LineDetailsVC?productID=2052')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/13.png" alt>
        </a>
        <a
          @click="jump('https://www.tourscool.com/tour2541.html','tourscool://open/LineDetailsVC?productID=2541')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/14.png" alt>
        </a>
        <a
          @click="jump('https://www.tourscool.com/tour1919.html','tourscool://open/LineDetailsVC?productID=1919')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/15.png" alt>
        </a>
        <a
          @click="jump('https://www.tourscool.com/tour1716.html','tourscool://open/LineDetailsVC?productID=1716')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/16.png" alt>
        </a>
      </div>
      <!-- 查看更多 -->
      <div class="more3">
        <a
          @click="jump('https://m.tourscool.com/product_list?itemType=2&keyWords=%E5%A4%A7%E5%B3%A1%E8%B0%B7','tourscool://open/ProductListVC?itemType=1&keyword=%E5%A4%A7%E5%B3%A1%E8%B0%B7')"
        >
          <img src="../../../assets/imgs/activity/nationalpack/title/6.png" alt>
        </a>
      </div>

      <!-- <div class="bg-item3">
        <img src="../../../assets/imgs/activity/nationalpack/title/3.png" alt>
      </div> -->

      <div class="pro-flex">
        <a
          @click="jump('https://www.tourscool.com/tour1849.html','tourscool://open/LineDetailsVC?productID=1849')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/17.png" alt>
        </a>
        <a
          @click="jump('https://www.tourscool.com/tour1741.html','tourscool://open/LineDetailsVC?productID=1741')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/18.png" alt>
        </a>
        <a
          @click="jump('https://www.tourscool.com/tour1723.html','tourscool://open/LineDetailsVC?productID=1723')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/19.png" alt>
        </a>
        <a
          @click="jump('https://www.tourscool.com/tour1372.html','tourscool://open/LineDetailsVC?productID=1372')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/20.png" alt>
        </a>
        <a
          @click="jump('https://www.tourscool.com/tour1853.html','tourscool://open/LineDetailsVC?productID=1853')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/21.png" alt>
        </a>
        <a
          @click="jump('https://www.tourscool.com/tour1525.html','tourscool://open/LineDetailsVC?productID=1525')"
        >
          <img class src="../../../assets/imgs/activity/nationalpack/prodect/22.png" alt>
        </a>
      </div>
      <!-- 查看更多 -->
      <div class="more4">
        <a
          @click="jump('https://m.tourscool.com/product_list?category=89&product_type=&span_city=&start_city=&itemType=0','tourscool://open/ProductListVC?itemType=1&keyword=%E7%BE%8E%E8%A5%BF')"
        >
          <img src="../../../assets/imgs/activity/nationalpack/title/6.png" alt>
        </a>
      </div>

      <!-- <div class="bg-item4">
        <img src="../../../assets/imgs/activity/nationalpack/title/4.png" alt>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      isApp: this.$route.query.platform
    };
  },
  mounted() {
    window.document.title = "美国国家公园";
  },
  methods: {
    jump(webUrl, appUrl) {
      if (this.isApp) {
        window.location.href = appUrl;
      } else {
        window.location.href = webUrl;
        //   this.$router.push({
        //       path:webUrl
        //   })
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.section1 {
  width: 100%;
  height: 546px;
  background: url("../../../assets/imgs/activity/nationalpack/title/head.png")
    no-repeat center center/750px 546px;
}
.section2 {
  width: 100%;
  height: 6500px;
  text-align: center;
  .coupon {
    width: 100%;
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-wrap: wrap;
    justify-content: flex-start;
    justify-content: center;
    .coupon-size {
      width: 180px;
      height: 199px;
    }
  }
  .s-bg {
    img {
      width: 750px;
      height: 1404px;
    }
  }

  .pro-flex {
    width: 100%;
    margin: 10px;
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-wrap: wrap;
    justify-content: flex-start;
    justify-content: center;

    a {
      img {
        margin-right: 15px;
        margin-bottom:5px;
        width: 339px;
        height: 259px;
      }
    }
  }
  .more1{
    width: 100%;
    height:485px;
    img {
      width: 750px;
      height: 215px;
    }
     background:url("../../../assets/imgs/activity/nationalpack/title/1.png") no-repeat center/750px 485px;
  }
  .more2 {
     width: 100%;
     height:488px;
    img {
      width: 750px;
      height: 215px;
    }
    background:url("../../../assets/imgs/activity/nationalpack/title/2.png") no-repeat center/750px 488px;
  }
  .more3 {
     width: 100%;
     height:418px;
    img {
      width: 750px;
      height: 215px;
    }
    background:url("../../../assets/imgs/activity/nationalpack/title/3.png") no-repeat center/750px 418px;
  }
  .more4{
     width: 100%;
     height:264px;
    img {
      width: 750px;
      height: 215px;
    }
    background:url("../../../assets/imgs/activity/nationalpack/title/4.png") no-repeat center/750px 264px;
  }
  .bg-item1 {
    img {
      width: 750px;
      height: 485px;
    }
  }
  .pro-large1 {
    img {
      width: 750px;
      height: 253px;
    }
  }
  .bg-item2 {
    img {
      width: 750px;
      height: 488px;
    }
  }
  .pro-large2 {
    img {
      width: 750px;
      height: 288px;
    }
  }
  .bg-item3 {
    img {
      width: 750px;
      height: 418px;
    }
  }
  .bg-item4{
    img{
      width:750px;
      height:264px;
    }
  }
}
</style>
