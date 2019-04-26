<template>
  <div class="custom-page"
    ref="refCustomPage">
    <div class="custom-content">
      <!-- header -->
      <normal-header v-if="!isApp"
        :title="'私人定制'"
        :transparent="isTransparent"
        fixed />
      <!-- banner -->
      <div class="banner">
        <h1 class="banner-title">高阶玩法&emsp;探秘全球</h1>
        <h3 class="banner-desc">旅游自由随心，体验独一无二</h3>
        <div class="form-wrap">
          <div class="title-s">热门景点</div>
          <div class="tag-list">
            <transp-tag v-for="tag in tagList"
              @callOnTag="onTag"
              :tag="tag"
              :key="tag.title"></transp-tag>
          </div>
          <div class="form">
            <!-- 地点 -->
            <div class="form-input">
              <div class="left-icon icon-addr"></div>
              <van-cell-group class="transparent-input tours-input-no-bg">
                <van-field v-model="address"
                  placeholder="请填写您想去的目的地或景点" />
              </van-cell-group>
              <div class="right">*</div>
            </div>
            <!-- 手机号码 -->
            <div class="form-input phone">
              <div class="left-icon icon-phone"></div>
              <van-cell-group class="transparent-input tours-input-no-bg">
                <van-field v-model="phone"
                  placeholder="请填写您的电话号码" />
              </van-cell-group>
              <div class="right">*</div>
            </div>
            <!-- 微信 -->
            <div class="form-input wechat">
              <div class="left-icon icon-wx"></div>
              <van-cell-group class="transparent-input tours-input-no-bg">
                <van-field v-model="wechat"
                  placeholder="请填写您的微信号码" />
              </van-cell-group>
              <div class="right">*</div>
            </div>
            <!-- 定制按钮 -->
            <van-button class="btn-custom tours-button-no-bg"
              size="large"
              :loading="submiting"
              @click="onCustom">开始定制</van-button>
          </div>
        </div>
      </div>
      <!-- 当季推荐 -->
      <div class="season-recommend">
        <div class="season-title">当季推荐</div>
        <div class="season-wrap wiper-container"
          v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide"
              v-for="item in seasonList"
              :key="item.title">
              <div class="season-item"
                @click="onSeasonRecommend(item)">
                <img :src="item.url"
                  alt="img">
                <div class="season-body">
                  <h1 class="season-body-title">{{item.title}}</h1>
                  <h3 class="season-body-desc no-wrap-line3">{{item.desc}}</h3>
                  <p class="season-body-price">参考价格：{{item.price}} 人/起</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-more"
          @click="toList">查看全部</div>
      </div>
      <!-- 承诺/服务 -->
      <div class="features">
        <div class="features-title">稀饭承诺 · 专业服务</div>
        <div class="features-desc">用心给你舒适的旅行</div>
        <div class="features-list">
          <div class="item"
            v-for="item in featureList"
            :key="item.title">
            <img :src="item.img"
              alt>
            <p class="features-item-title">{{item.title}}</p>
          </div>
        </div>
      </div>
      <!-- story -->
      <h1 class="story-title">
        <span>遇见稀饭</span>
        <span class="gray">&emsp;|&emsp;旅行故事</span>
      </h1>
      <div class="story-wrap"
        v-for="item in storyList"
        :key="item.title">
        <div class="story-item-title">{{item.title}}</div>
        <div class="story-item-pos">{{item.pos}}</div>
        <div class="story-item-line"></div>
        <div class="story-item-desc no-wrap-line2">{{item.desc}}</div>
        <div class="show-banner">
          <img-item :proData="item.imgs"
            @callOnSlide="onSlide" />
        </div>
      </div>
    </div>
    <div class="back-top"
      v-show="!isTransparent"
      @click="backTop"></div>
  </div>
</template>

<script>
  import {throttle as _throttle} from "lodash";
  import NormalHeader from "@/components/header/normal";
  import transpTag from "@/components/tags/transparent";
  import ImgItem from "@/components/items/imgItem";
  import {custom} from "@/api/custom";
  import {isMobile} from "@/assets/js/utils";

  export default {
    components: {
      NormalHeader,
      transpTag,
      ImgItem
    },
    data() {
      return {
        isApp: this.$route.query.platform,
        isTransparent: true, // 导航头是否透明
        swiperOption: {
          loop: true,
          centeredSlides: true, // 居中
          slidesPerView: "auto",
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true //修改swiper的父元素时，自动初始化swiper
        },
        tagList: [
          {title: "日本"},
          {title: "泰国"},
          {title: "美国"},
          {title: "新加坡"},
          {title: "马尔代夫"},
          {title: "毛里求斯"}
        ],
        address: "",
        phone: "",
        wechat: "",
        tipMsg: "请输入想去的地址或景点",
        canSubmit: false,
        submiting: false,
        seasonList: [
          {
            path: "/custom/store6",
            url: require("../../assets/imgs/custom/season/season_1@2x.png"),
            title: "东京+关西7天6晚 花开之旅",
            desc:
              "如果是第一次去日本，更推荐经典的关西线大阪-京都-奈良。大阪，有关西最大购物圣地心斋桥，亲子游可以去环球影城玩个痛快；京都，漫步在花见小路偶遇风情艺妓，适合穿和服出游。",
            price: "￥ 13800"
          },
          {
            path: "/custom/store3",
            url: require("../../assets/imgs/custom/season/season_2@2x.png"),
            title: "巴厘岛+科莫多8天6晚 热恋之旅",
            desc:
              "就在拥有180°海景的房间中醒来，拉开窗帘，让清晨的光和你问候早安！上山下海，采蝶追鱼，与史前巨蜥——科莫多龙，亲密接触。还有那少女心炸裂的粉色沙滩，完整整个完美假期。",
            price: "￥ 15600"
          },
          {
            path: "/custom/store1",
            url: require("../../assets/imgs/custom/season/season_3@2x.png"),
            title: "巴黎9天7晚 浪漫之旅",
            desc:
              "巴黎是法国的首都，也是这个国家的心脏。大多数游客心中向往的，是一个古老而浪漫的巴黎，一个极具历史感的巴黎，还有一个充满前卫与波西米亚气息的巴黎。",
            price: "￥ 19980"
          }
        ],
        featureList: [
          {
            img: require("../../assets/imgs/custom/features_1@2x.png"),
            title: "全球出发一人成团"
          },
          {
            img: require("../../assets/imgs/custom/features_2@2x.png"),
            title: "私家路线花样玩法"
          },
          {
            img: require("../../assets/imgs/custom/features_3@2x.png"),
            title: "项目自选费用透明"
          },
          {
            img: require("../../assets/imgs/custom/features_4@2x.png"),
            title: "高额保险安全出行"
          },
          {
            img: require("../../assets/imgs/custom/features_5@2x.png"),
            title: "海归团队专业定制"
          },
          {
            img: require("../../assets/imgs/custom/features_6@2x.png"),
            title: "管家式一对一服务"
          }
        ],
        storyList: [
          {
            title: "一路向北 · 退役空姐的欧洲之旅",
            pos: "目的地：欧洲",
            desc:
              "卸下工作的我，突然想去脚踏实地的感受一下旅行的意义。一般的旅行团都不会有这样的行程，旅行一次独属于我的私人旅行。",
            imgs: [
              {
                path: "custom/gushi1",
                url: require("../../assets/imgs/custom/story1/banner1@2x.png"),
                id: "1"
              },
              {
                path: "custom/gushi1",
                url: require("../../assets/imgs/custom/story1/banner2@2x.png"),
                id: "2"
              },
              {
                path: "custom/gushi1",
                url: require("../../assets/imgs/custom/story1/banner3@2x.png"),
                id: "3"
              }
            ]
          },
          {
            title: "毛里求斯·从人间天堂的世界路过",
            pos: "目的地：毛里求斯",
            desc:
              "很多人总把毛里求斯对比马尔代夫，在我看来它们是两个是完全不同属性的海岛，对比马尔代夫的精致浪漫，我似乎也爱上了...",
            imgs: [
              {
                path: "custom/gushi2",
                url: require("../../assets/imgs/custom/story2/banner1@2x.png"),
                id: "4"
              },
              {
                path: "custom/gushi2",
                url: require("../../assets/imgs/custom/story2/banner2@2x.png"),
                id: "5"
              },
              {
                path: "custom/gushi2",
                url: require("../../assets/imgs/custom/story2/banner3@2x.png"),
                id: "6"
              }
            ]
          },
          {
            title: "青春时期做过的梦，都在镰仓的海风里实现",
            pos: "目的地：日本",
            desc:
              "我并不是一个亲日派，之前对日本文化没有太多的兴趣，但是不得不承认，我的童年里不可缺少的日本动漫的回忆，索性我也...",
            imgs: [
              {
                path: "custom/gushi3",
                url: require("../../assets/imgs/custom/story3/banner1@2x.png"),
                id: "7"
              },
              {
                path: "custom/gushi3",
                url: require("../../assets/imgs/custom/story3/banner2@2x.png"),
                id: "8"
              },
              {
                path: "custom/gushi3",
                url: require("../../assets/imgs/custom/story3/banner3@2x.png"),
                id: "9"
              }
            ]
          }
        ],
        timer: null
      };
    },
    mounted() {
      // 监听滚动
      this.$refs.refCustomPage.addEventListener(
        "scroll",
        this.scrollFn
      );
      // 判断机型
      if (this.isApp) {
        // 引入appBridge
        this.appBridge = require('@/assets/js/appBridge').default
        // this.appBridge.hideNavigationBar()
      } else {
        // console.log('web操作')
      }
    },
    beforeDestroy() {
      this.$refs.refCustomPage.removeEventListener('scroll', this.scrollFn)
    },
    methods: {
      // 热门景点tag
      onTag(item) {
        // console.log(item);
        this.address = item.title;
      },
      // 定制
      onCustom() {
        if (!this.address) {
          this.$toast("请输入想去的地址或景点");
          this.submiting = false;
          return;
        }
        if (!this.phone && !this.wechat) {
          this.$toast("请输入电话号码或者微信号码至少一个");
          this.submiting = false;
          return;
        }
        this.doCustom({
          destination: this.address,
          phone: this.phone,
          wechat: this.wechat
        });
      },
      // 提交定制
      async doCustom(subData) {
        this.submiting = true;
        // console.log(1, subData);
        let {code, data, msg} = await custom(subData);
        this.$toast(msg);
        this.submiting = false;
      },
      // 季推荐
      onSeasonRecommend(item) {
        this.jumpToPage(item.path);
      },
      // 查看全部list
      toList() {
        this.jumpToPage("custom/list");
      },
      // 故事
      onSlide(val) {
        this.jumpToPage(val.path);
      },
      /**
       * 页面跳转
       * @param {string} path 跳转的路劲
       */
      jumpToPage(path) {
        const myRouter = {
          path
        };
        if (this.isApp) {
          myRouter.query = {
            platform: this.isApp
          };
        }
        this.$router.push(myRouter);
      },
      // 滚动函数
      scrollFn() {
        const s1 = this.$refs.refCustomPage.scrollTop;
        if (this.isApp) {
          this.appBridge.webViewScrollViewDidScroll({'top': s1.toString()})
        }
        setTimeout(() => {
          const s2 = this.$refs.refCustomPage.scrollTop;
          const direct = s2 - s1;
          // console.log("direct", direct);
          if (s1 === 0) {
            this.isTransparent = true;
          } else if (direct > 0) {
            this.isTransparent = false;
          } else if (direct < 0) {
            this.isTransparent = false;
          }
        }, 17);
      },
      // 返回顶部
      backTop() {
        // console.log("backTop");
        // TODO:可以使用requestAnimationFrame代替setInterval
        clearInterval(this.timer);
        this.timer = setInterval(this.backFn, 20);
      },
      backFn() {
        let scrollTop = this.$refs.refCustomPage.scrollTop;
        let ispeed = Math.floor(-scrollTop / 5);
        this.$refs.refCustomPage.scrollTop = scrollTop + ispeed;
        if (scrollTop === 0) {
          clearInterval(this.timer);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .custom-page {
    height: 100vh;
    font-size: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .custom-content {
      background: #f1f1f1;
      padding-bottom: 192px;
      .banner {
        padding: 154px 32px 0;
        height: 1032px;
        background: url("../../assets/imgs/custom/custom_bg@2x.png") no-repeat 0 -88px/100%;
        .banner-title {
          height: 74px;
          line-height: 74px;
          font-size: 52px;
          font-weight: 100;
          color: rgba(255, 255, 255, 1);
          -webkit-text-stroke: 1 rgba(255, 255, 255, 1);
          text-stroke: 1 rgba(255, 255, 255, 1);
          position: relative;
          &::after {
            content: "";
            display: inline-block;
            position: absolute;
            left: 235px;
            top: 12px;
            width: 2px;
            height: 52px;
            background: #fff;
          }
        }
        .banner-desc {
          height: 40px;
          line-height: 40px;
          font-size: 28px;
          font-weight: 300;
          color: rgba(255, 255, 255, 1);
        }
        .form-wrap {
          margin-top: 80px;
          padding: 20px 32px;
          width: 686px;
          height: 656px;
          background: rgba(0, 0, 0, 1);
          opacity: 0.7;
          border-radius: 12px;
          .title-s {
            font-size: 24px;
            font-weight: 300;
            line-height: 34px;
            color: rgba(152, 152, 152, 1);
          }
          .tag-list {
            margin-top: 20px;
          }
          .form {
            margin-top: calc(58px - 20px);
            .form-input {
              width: 622px;
              height: 72px;
              background: rgba(0, 0, 0, 0);
              border: 2px solid rgba(255, 255, 255, 1);
              border-radius: 22px;
              display: flex;
              display: -webkit-flex;
              justify-content: center;
              -webkit-justify-content: center;
              align-content: center;
              .left-icon {
                width: 74px;
                display: 0 0 74px;
                position: relative;
                &.icon-addr {
                  background: url("../../assets/imgs/icon_pos@2x.png") no-repeat
                    center center/40px 40px;
                }
                &.icon-phone {
                  background: url("../../assets/imgs/icon_phone@2x.png") no-repeat
                    center center/40px 40px;
                }
                &.icon-wx {
                  background: url("../../assets/imgs/icon_wx@2x.png") no-repeat
                    center center/40px 40px;
                }
                &::after {
                  content: "";
                  display: inline-block;
                  position: absolute;
                  right: 0;
                  top: 15px;
                  width: 2px;
                  height: 40px;
                  background: #fff;
                }
              }
              .transparent-input {
                flex: 1;
              }
              .right {
                flex: 0 0 30px;
                height: 28px;
                align-self: center;
                line-height: 100%;
                color: #fff;
                font-size: 28px;
              }
            }
            .phone,
            .wechat {
              margin-top: 24px;
            }
            .btn-custom {
              margin-top: 62px;
            }
          }
        }
      }
      // 当季推荐
      .season-recommend {
        height: 930px;
        overflow: hidden;
        .season-title {
          margin-top: 44px;
          padding: 0 42px;
          height: 44px;
          font-size: 32px;
          color: #131313;
        }
        .season-wrap {
          margin-top: 28px;
        }
        .swiper-container {
          .swiper-slide {
            margin: 0 10px;
            font-size: 38px;
            width: 686px !important;
            height: 668px;
            transition: all 0.5s;
            &:not(.swiper-slide-active) {
              transform: translate3d(0, 40px, 0);
            }
            .season-item {
              font-size: 0;
              background: #fff;
              border-radius: 12px;
              height: 628px;
              img {
                height: 356px;
                width: 686px;
                border-radius: 12px 12px 0 0;
              }
              .season-body {
                padding: 22px 24px;
                .season-body-title {
                  margin: 0;
                  padding: 0;
                  height: 44px;
                  font-size: 32px;
                  line-height: 44px;
                  font-weight: 400;
                  color: #000;
                }
                .season-body-desc {
                  margin-top: 12px;
                  padding-bottom: 16px;
                  border-bottom: 2px silid #e4e4e4;
                  height: 96px;
                  font-size: 22px;
                  font-weight: 300;
                  line-height: 32px;
                  color: #989898;
                }
                .season-body-price {
                  margin-top: 16px;
                  height: 34px;
                  font-size: 24px;
                  line-height: 34px;
                  color: #399ef6;
                }
              }
            }
          }
        }
        .btn-more {
          margin: 14px auto 0;
          width: 330px;
          height: 72px;
          line-height: 72px;
          font-size: 28px;
          color: #fff;
          background: linear-gradient(
            41deg,
            rgba(57, 158, 246, 1) 0%,
            rgba(137, 196, 248, 1) 100%
          );
          text-align: center;
          box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.16);
          border-radius: 36px;
        }
      }
      .features {
        height: 700px;
        width: 100%;
        text-align: center;
        background: #fff;
        overflow: hidden;
        .features-title {
          margin-top: 86px;
          height: 58px;
          font-size: 44px;
          line-height: 58px;
          color: #383a3e;
        }
        .features-desc {
          margin-top: 8px;
          height: 38px;
          font-size: 28px;
          color: rgba(158, 184, 195, 1);
          letter-spacing: 15px;
        }
        .features-list {
          margin-top: 12px;
          display: flex;
          display: -webkit-flex;
          flex-wrap: wrap;
          -webkit-flex-wrap: wrap;
          .item {
            flex: 0 0 33.3%;
            width: 33.3%;
            margin-top: 56px;
            img {
              width: 104px;
              height: 104px;
            }
            .features-item-title {
              margin-top: 16px;
              height: 30px;
              font-size: 22px;
              font-weight: 400;
              color: #000;
            }
          }
        }
      }
      .story-title {
        padding: 44px 0 4px 42px;
        span {
          width: 128px;
          height: 44px;
          font-size: 32px;
          font-weight: 400;
          color: #131313;
          &.gray {
            color: #989898;
          }
        }
      }
      .story-wrap {
        margin-top: 24px;
        background: #fff;
        height: 640px;
        overflow: hidden;
        .story-item-title,
        .story-item-pos,
        .story-item-desc {
          padding: 0 34px;
        }
        .story-item-title {
          margin-top: 32px;
          height: 40px;
          font-size: 28px;
          line-height: 40px;
          color: #000;
        }
        .story-item-pos {
          margin-top: 8px;
          height: 34px;
          font-size: 24px;
          color: #484848;
        }
        .story-item-line {
          width: 686px;
          margin-top: 20px;
          margin-left: 34px;
          border-bottom: 2px solid #e4e4e4;
        }
        .story-item-desc {
          margin-top: 20px;
          height: 64px;
          font-size: 24px;
          line-height: 30px;
        }
      }
      .show-banner {
        margin-top: 28px;
      }
    }
    .back-top {
      position: fixed;
      z-index: 999;
      right: 38px;
      bottom: 58px;
      width: 120px;
      height: 120px;
      background: url("../../assets/imgs/custom/back_top@2x.png") no-repeat center
        center/100%;
    }
  }
</style>
