<template>
  <div class="visa">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="签证"/>
    <div class="top-banner">
      <div class="content">
        <h6>全球签证，一键办理</h6>
        <p>已成功服务100,000出境人次</p>
      </div>
    </div>
    <div class="bottom-content">
      <van-row class="server" type="flex" justify="center">
        <van-col span="6">
          <dl>
            <dt>
              <img src="../../assets/imgs/visa/s1.png" alt>
            </dt>
            <dd>过签率99%</dd>
          </dl>
        </van-col>
        <van-col span="6">
          <dl>
            <dt>
              <img src="../../assets/imgs/visa/s2.png" alt>
            </dt>
            <dd>最快5天过签</dd>
          </dl>
        </van-col>
        <van-col span="6">
          <dl>
            <dt>
              <img src="../../assets/imgs/visa/s3.png" alt>
            </dt>
            <dd>加急预约</dd>
          </dl>
        </van-col>
        <van-col span="6">
          <dl>
            <dt>
              <img src="../../assets/imgs/visa/s4.png" alt>
            </dt>
            <dd>拒签退款</dd>
          </dl>
        </van-col>
      </van-row>
      <div class="pro">
        <div class="pic1">
          <div class="title">
            <img src="../../assets/imgs/visa/title_america.png" alt>
          </div>
        </div>
        <div class="content">
          <div class="left">
            <div class="item">
              <img src="../../assets/imgs/visa/dian.png" alt>
              <span>面试培训，专家指导</span>
            </div>
            <div class="item">
              <img src="../../assets/imgs/visa/dian.png" alt>
              <span>全国范围约签</span>
            </div>
            <div class="item">
              <img src="../../assets/imgs/visa/dian.png" alt>
              <span>办签进度实时反馈</span>
            </div>
          </div>
          <div class="right">
            <div class="price">
              <strong>￥1140</strong>
              <span>起</span>
            </div>
            <div class="btn">
              <button @click="tel">电话咨询</button>
            </div>
          </div>
        </div>
      </div>
      <div class="pro">
        <div class="pic2">
          <div class="title">
            <img src="../../assets/imgs/visa/title_japan.png" alt>
          </div>
        </div>
        <div class="content">
          <div class="left">
            <div class="item">
              <img src="../../assets/imgs/visa/dian.png" alt>
              <span>最快6个工作日出签</span>
            </div>
            <div class="item">
              <img src="../../assets/imgs/visa/dian.png" alt>
              <span>极简办理，全程指导</span>
            </div>
            <div class="item">
              <img src="../../assets/imgs/visa/dian.png" alt>
              <span>办签进度实时反馈</span>
            </div>
          </div>
          <div class="right">
            <div class="price">
              <strong>￥99</strong>
              <span>起</span>
            </div>
            <div class="btn">
              <button @click="tel">电话咨询</button>
            </div>
          </div>
        </div>
      </div>
      <div class="pro">
        <div class="pic3">
          <div class="title">
            <img src="../../assets/imgs/visa/title_australia.png" alt>
          </div>
        </div>
        <div class="content">
          <div class="left">
            <div class="item">
              <img src="../../assets/imgs/visa/dian.png" alt>
              <span>全国受理，1对1指导</span>
            </div>
            <div class="item">
              <img src="../../assets/imgs/visa/dian.png" alt>
              <span>团购优惠，当日送签</span>
            </div>
            <div class="item">
              <img src="../../assets/imgs/visa/dian.png" alt>
              <span>旅游/探亲/商务/毕业典礼</span>
            </div>
          </div>
          <div class="right">
            <div class="price">
              <strong>￥899</strong>
              <span>起</span>
            </div>
            <div class="btn">
              <button @click="tel">电话咨询</button>
            </div>
          </div>
        </div>
      </div>
      <div class="pro">
        <div class="pic4">
          <div class="title">
            <img src="../../assets/imgs/visa/title_thai.png" alt>
          </div>
        </div>
        <div class="content">
          <div class="left">
            <div class="item">
              <img src="../../assets/imgs/visa/dian.png" alt>
              <span>极速办理，最快5-30分钟办理</span>
            </div>
            <div class="item">
              <img src="../../assets/imgs/visa/dian.png" alt>
              <span>电子落地签，方便快捷</span>
            </div>
            <div class="item">
              <img src="../../assets/imgs/visa/dian.png" alt>
              <span>100%过签率，出签有保障</span>
            </div>
          </div>
          <div class="right">
            <div class="price">
              <strong>￥150</strong>
              <span>起</span>
            </div>
            <div class="btn">
              <button @click="tel">电话咨询</button>
            </div>
          </div>
        </div>
      </div>
      <div class="pro">
        <div class="pic5">
          <div class="title">
            <img src="../../assets/imgs/visa/title_new_zealand.png" alt>
          </div>
        </div>
        <div class="content">
          <div class="left">
            <div class="item">
              <img src="../../assets/imgs/visa/dian.png" alt>
              <span>从业10年以上专业顾问</span>
            </div>
            <div class="item">
              <img src="../../assets/imgs/visa/dian.png" alt>
              <span>当日递交，最快5个工作日出签</span>
            </div>
            <div class="item">
              <img src="../../assets/imgs/visa/dian.png" alt>
              <span>99%过签率，出签有保障</span>
            </div>
          </div>
          <div class="right">
            <div class="price">
              <strong>￥1099</strong>
              <span>起</span>
            </div>
            <div class="btn">
              <button @click="tel">电话咨询</button>
            </div>
          </div>
        </div>
      </div>
      <div class="pro">
        <div class="pic6">
          <div class="title">
            <img src="../../assets/imgs/visa/title_schengen.png" alt>
          </div>
        </div>
        <div class="content">
          <div class="left">
            <div class="item">
              <img src="../../assets/imgs/visa/dian.png" alt>
              <span>最快5个工作日出签</span>
            </div>
            <div class="item">
              <img src="../../assets/imgs/visa/dian.png" alt>
              <span>超值，一签畅游欧洲26国</span>
            </div>
            <div class="item">
              <img src="../../assets/imgs/visa/dian.png" alt>
              <span>99%过签率，出签有保障</span>
            </div>
          </div>
          <div class="right">
            <div class="price">
              <strong>￥899</strong>
              <span>起</span>
            </div>
            <div class="btn">
              <button @click="tel">电话咨询</button>
            </div>
          </div>
        </div>
      </div>
      <div class="more">
        <span>没有想要的？</span>
        <a @click="zixun()">马上咨询签证小姐姐吧</a>
      </div>
    </div>
    <div class="footer-team">
      <div class="bg"></div>
      <h6>专业团队，服务无忧</h6>
      <div class="season-wrap swiper-container" v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper litu-swper">
          <div class="swiper-slide pic-size">
            <img src="../../assets/imgs/visa/customer1.png" alt>
          </div>
          <div class="swiper-slide pic-size">
            <img src="../../assets/imgs/visa/customer2.png" alt>
          </div>
          <div class="swiper-slide pic-size">
            <img src="../../assets/imgs/visa/customer3.png" alt>
          </div>
        </div>
      </div>
    </div>
    <div class="consultant" @click="zixun()">
      <span>前100名咨询，可获得特价签证，最低65元</span>
      <button>马上咨询</button>
    </div>
    <div class="ab-icom" @click="zixun()">
      <img class="abimg" src="../../assets/imgs/newcustom/921@2x.png" alt>
    </div>
    <div class="back-top" v-if="!isApp" @click="showcall2()"></div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { DLG_TYPE } from "@/assets/js/consts/dialog";
export default {
  name: "",
  data() {
    return {
      isApp: this.$route.query.platform,
      swiperOption: {
        centeredSlides: true, // 居中
        initialSlide: 1,
        slidesPerView: "auto",
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      }
    };
  },
  mounted() {
    setTimeout(() => {
      document.querySelector("#newBridge").style.display = "none";
    }, 300);
  },
  methods: {
    onClickLeft() {
        window.location.href="/";
    },

    ...mapMutations({
      vxToggleDialog: "toggleDialog", // 是否显示弹窗
      vxSetDlgType: "setDlgType" // 设置弹窗类型
    }),
    tel() {
      window.location.href = "tel://400-118-1388";
    },
    zixun() {
      window.location.href =
        "http://p.qiao.baidu.com/cps/chat?siteId=12918104&userId=26301226";
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
    padding: 50px 32px;
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
            span {
              font: 24px/54px "";
              color: #000;
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
      padding-bottom:30px;
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
    background: url("../../assets/imgs/newcustom/538@2x.png") no-repeat;
    background-size: 136px;
    background-position: center;
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
    background: url("../../assets/imgs/newcustom/callphone.png") no-repeat
      center center/100%;
  }
}
</style>