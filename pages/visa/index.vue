<template>
  <div class="visa">
    <van-nav-bar left-arrow
      @click-left="onClickLeft"
      :title="$t('visaPage.pageHead')" />
    <div class="top-banner">
      <div class="content">
        <h6>{{$t('visaPage.title')}}</h6>
        <p>{{$t('visaPage.describe')}}</p>
      </div>
    </div>
    <div class="bottom-content">
      <van-row class="server"
        type="flex"
        justify="center">
        <van-col span="5">
          <dl>
            <dt>
              <img src="../../assets/imgs/visa/s1.png"
                alt>
            </dt>
            <dd>{{$t('visaPage.signRate')}}</dd>
          </dl>
        </van-col>
        <van-col span="5">
          <dl>
            <dt>
              <img src="../../assets/imgs/visa/s2.png"
                alt>
            </dt>
            <dd>{{$t('visaPage.signTime')}}</dd>
          </dl>
        </van-col>
        <van-col span="5">
          <dl>
            <dt>
              <img src="../../assets/imgs/visa/s3.png"
                alt>
            </dt>
            <dd>{{$t('visaPage.urgentAppoint')}}</dd>
          </dl>
        </van-col>
        <van-col span="5">
          <dl>
            <dt>
              <img src="../../assets/imgs/visa/s4.png"
                alt>
            </dt>
            <dd>{{$t('visaPage.refusedRefund')}}</dd>
          </dl>
        </van-col>
        <van-col span="4">
          <dl>
            <dt>
              <img src="../../assets/imgs/visa/s5.png"
                alt>
            </dt>
            <dd>{{$t('visaPage.countrySent')}}</dd>
          </dl>
        </van-col>
      </van-row>
      <div class="pro"
        v-for="(item,index) in visaList"
        :key="index">
        <div :class="`pic${index+1}`">
          <div class="title">
            <img :src="item.img"
              alt>
          </div>
        </div>
        <div class="content">
          <div class="left">
            <div class="item"
              v-for="(cItem,cIndex) in item.content"
              :key="cIndex">
              <img src="../../assets/imgs/visa/dian.png"
                alt>
              <span>{{cItem}}</span>
            </div>
          </div>
          <div class="right">
            <div class="price">
              <strong>{{item.price}}</strong>
              <span>{{$t('since')}}</span>
            </div>
            <div class="btn">
              <button @click="tel">{{$t('phoneConsult')}}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="more">
        <span>{{$t('visaPage.noNeed')}}</span>
        <a @click="zixun()">{{$t('visaPage.consultSister')}}</a>
      </div>
    </div>
    <div class="bar"></div>
    <div class="advantage">
      <h6>{{$t('visaPage.nationalAndFree')}}</h6>
      <div class="item">
        <van-row class="item-row"
          type="flex"
          justify="center">
          <van-col class="item-col"
            span="12">
            <img src="../../assets/imgs/visa/international.png"
              alt="">
          </van-col>
          <van-col class="item-col"
            span="12">
            <img src="../../assets/imgs/visa/experts.png"
              alt="">
          </van-col>
        </van-row>
        <van-row class="item-row"
          type="flex"
          justify="center">
          <van-col class="item-col"
            span="12">
            <img src="../../assets/imgs/visa/safety.png"
              alt="">
          </van-col>
          <van-col class="item-col"
            span="12">
            <img src="../../assets/imgs/visa/customers.png"
              alt="">
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="footer-team">
      <div class="bg"></div>
      <h6>{{$t('visaPage.professionalAndFree')}}</h6>
      <div class="season-wrap swiper-container"
        v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper litu-swper">
          <div class="swiper-slide pic-size">
            <img src="../../assets/imgs/visa/customer1.png"
              alt>
          </div>
          <div class="swiper-slide pic-size">
            <img src="../../assets/imgs/visa/customer2.png"
              alt>
          </div>
          <div class="swiper-slide pic-size">
            <img src="../../assets/imgs/visa/customer3.png"
              alt>
          </div>
        </div>
      </div>
      <div class="copyright">
        <p>{{$t('visaPage.copyright')}}</p>
        <p>{{$t('visaPage.icp')}}</p>
      </div>
    </div>
    <div class="consultant"
      @click="zixun()">
      <span>{{$t('visaPage.preferential')}}</span>
      <button>{{$t('visaPage.immediatelyConsult')}}</button>
    </div>
    <div class="ab-icom"
      @click="zixun()">
      <!-- <img class="abimg" src="../../assets/imgs/newcustom/zixun.png" alt> -->
    </div>
    <div class="back-top"
      v-if="!isApp"
      @click="showcall2()"></div>
  </div>
</template>

<script>
  import {mapMutations, mapState} from "vuex";
  import {DLG_TYPE} from "@/assets/js/consts/dialog";

  export default {
    name: "",
    head() {
      return {
        script: [
          {
            src: 'https://hm.baidu.com/hm.js?72a266736d8b5b47605e2d2ad18f0756'
          }
        ]
      }
    },
    data() {
      return {
        isApp: this.$route.query.platform,
        swiperOption: {
          centeredSlides: true, // 居中
          initialSlide: 1,
          slidesPerView: "auto",
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true //修改swiper的父元素时，自动初始化swiper
        },
        visaList: [
          {
            img: require('~/assets/imgs/visa/title_america.png'),
            content: this.$t('visaPage.visaList.content1'),
            price: "￥1140",
          },
          {
            img: require('~/assets/imgs/visa/title_japan.png'),
            content: this.$t('visaPage.visaList.content2'),
            price: "￥99",
          },
          {
            img: require('~/assets/imgs/visa/title_australia.png'),
            content:this.$t('visaPage.visaList.content3'),
            price: "￥899",
          },
          {
            img: require('~/assets/imgs/visa/title_thai.png'),
            content:this.$t('visaPage.visaList.content4'),
            price: "￥150",
          },
          {
            img: require('~/assets/imgs/visa/title_new_zealand.png'),
            content:this.$t('visaPage.visaList.content5'),
            price: "￥1099",
          },
          {
            img: require('~/assets/imgs/visa/title_schengen.png'),
            content:this.$t('visaPage.visaList.content6'),
            price: "￥899",
          }
        ]
      };
    },
    methods: {
      ...mapMutations({
        vxToggleDialog: "toggleDialog", // 是否显示弹窗
        vxSetDlgType: "setDlgType" // 设置弹窗类型
      }),
      onClickLeft() {
        this.$router.push({
          path: '/'
        })
      },
      tel() {
        window.location.href = "tel://400-118-1388";
      },
      zixun() {
        window.location.href =
          "http://p.qiao.baidu.com/cps/chat?siteId=13206734&userId=26301226";
      },
      // 电话咨询
      showcall2() {
        this.vxToggleDialog(true);
        this.vxSetDlgType(DLG_TYPE.PHONECUSTOM);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .visa {
    .top-banner {
      width: 750px;
      height: 324px;
      background: url("../../assets/imgs/visa/topBanner.png") no-repeat center
        center/750px 324px;
      position: relative;
      .content {
        width: 534px;
        height: 202px;
        background: rgba(54, 54, 54, 0.6);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-sizing: border-box;
        padding-top: 54px;
        h6 {
          width: 100%;
          height: 56px;
          font-size: 40px;
          font-family: PingFang SC;
          font-weight: 600;
          line-height: 54px;
          color: rgba(255, 255, 255, 1);
          text-align: center;
        }
        p {
          height: 40px;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 54px;
          color: rgba(255, 255, 255, 1);
          text-align: center;
        }
      }
    }
    .bottom-content {
      background: #fff;
      border-radius: 15px;
      padding: 80px 32px;
      position: relative;
      top: -15px;
      z-index: 9;
      .server {
        margin-bottom: 64px;
        dl {
          text-align: center;
          dt {
            img {
              width: 94px;
              height: 94px;
            }
          }
          dd {
            font: 24px/54px "";
          }
        }
      }
      .pro {
        width: 686px;
        height: 450px;
        box-sizing: border-box;
        border: 1.5px solid rgb(233, 233, 233);
        border-radius: 20px;
        margin-bottom: 64px;
        .pic1,
        .pic2,
        .pic3,
        .pic4,
        .pic5,
        .pic6 {
          width: 684px;
          height: 264px;
          position: relative;
          .title {
            position: absolute;
            width: 281px;
            height: 67px;
            top: 26px;
            left: 38px;
            img {
              width: 281px;
              height: 67px;
            }
          }
        }
        .pic1 {
          background: url("../../assets/imgs/visa/pic_america.png") no-repeat left
            top/686px 444px;
        }
        .pic2 {
          background: url("../../assets/imgs/visa/pic_japan.png") no-repeat left
            top/686px 444px;
        }
        .pic3 {
          background: url("../../assets/imgs/visa/pic_australia.png") no-repeat
            left top/686px 444px;
        }
        .pic4 {
          background: url("../../assets/imgs/visa/pic_thai.png") no-repeat left
            top/686px 444px;
        }
        .pic5 {
          background: url("../../assets/imgs/visa/pic_new_zealand.png") no-repeat
            left top/686px 444px;
        }
        .pic6 {
          background: url("../../assets/imgs/visa/pic_schengen.png") no-repeat
            left top/686px 444px;
        }
        .content {
          width: 684px;
          height: 174px;
          position: relative;
          .left {
            position: absolute;
            left: 18px;
            top: 0;
            .item {
              height: 54px;
              line-height: 54px;
              img {
                width: 24px;
                height: 24px;
              }
              span {
                font: 24px/54px "";
                color: #000;
                padding-left: 6px;
              }
            }
          }
          .right {
            position: absolute;
            right: 30px;
            top: 18px;
            .price {
              color: #ffa438;
              font: 46px/64px "";
              text-align: right;
              span {
                font: 24px/54px "";
                color: #000;
                margin-right: 20px;
              }
            }
            .btn {
              button {
                width: 228px;
                height: 60px;
                background: #ffa438;
                text-align: center;
                font: 28px/60px "";
                color: #fff;
                border-radius: 30px;
              }
            }
          }
        }
      }
      .more {
        width: 100%;
        text-align: center;
        height: 24px;
        padding-bottom: 50px;
        span {
          color: #000;
          font: 24px/24px "";
        }
        a {
          color: #399ef6;
          font: 24px/24px "";
        }
      }
    }
    .bar {
      width: 750px;
      height: 136px;
      background: url("../../assets/imgs/visa/bar.png") no-repeat center/750px
        136px;
    }
    .advantage {
      width: 750px;
      box-sizing: border-box;
      padding: 80px 32px;
      h6 {
        width: 100%;
        text-align: center;
        font: bold 44px/44px "";
        color: #000;
        margin-bottom: 80px;
      }
      .item {
        width: 100%;
        .item-row {
          margin: 10px auto;
          .item-col {
            text-align: center;
            img {
              width: 306px;
              height: 462px;
            }
          }
        }
      }
    }
    .footer-team {
      width: 750px;
      height: 1028px;
      background: url("../../assets/imgs/visa/pic_footer.png") no-repeat left
        top/750px 1028px;
      position: relative;
      .bg {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
      }
      h6 {
        font: 44px/60px "";
        width: 396px;
        height: 60px;
        color: #fff;
        text-align: center;
        position: absolute;
        top: 62px;
        z-index: 1;
        left: 50%;
        transform: translateX(-50%);
      }
      .season-wrap {
        padding-top: 238px;
        .litu-swper {
          .swiper-slide {
            width: 434px !important;
          }
        }
      }

      .pic-size {
        padding: 0 22px;
        img {
          width: 390px;
          height: 404px;
        }
      }
      .copyright {
        color: #fff;
        font: 26px/48px "";
        text-align: center;
        position: absolute;
        bottom: 230px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .consultant {
      width: 750px;
      height: 100px;
      text-align: center;
      background: #ffa438;
      position: fixed;
      bottom: 0;
      z-index: 99;
      span {
        font: 24px/100px "";
        color: #fff;
        display: inline-block;
      }
      button {
        width: 174px;
        height: 62px;
        text-align: center;
        background: #fff;
        color: #ffa438;
        border-radius: 32px;
        font: 24px/62px "";
      }
    }
    .ab-icom {
      position: fixed;
      right: 16px;
      bottom: 30%;
      width: 136px;
      height: 136px;
      z-index: 999;
      // background: url("../../assets/imgs/newcustom/538@2x.png") no-repeat;
      background: url("../../assets/imgs/newcustom/zixun.png") no-repeat
        center/108px 108px;
      text-align: center;
      padding-top: 42px;
      .abimg {
        width: 59px;
        height: 51px;
      }
    }
    .back-top {
      position: fixed;
      z-index: 999;
      right: 16px;
      bottom: 20%;
      width: 136px;
      height: 136px;
      background: url("../../assets/imgs/newcustom/phone.png") no-repeat center
        center/108px 108px;
    }
  }
</style>

