<template>
  <div>
    <div style="height:1rem"></div>
    <div class="custo-index cu-form">
      <div class="m-custo-form clear">
        <p class="">不跟团 不自助 专车专导 尊贵出行</p>
        <form autocomplete="off"
          name="custo-form">
          <input type="hidden"
            name="pgr_from"
            value="m">
          <p>
            <input type="text"
              name="custo-dest"
              v-model="Tourist.contact"
              class="validate[required] cu-dest"
              placeholder="请填写您的姓名">
          </p>
          <p class="email-mt25">
            <input class="phone"
              type="tel"
              v-model="Tourist.phone"
              placeholder="输入您的手机号">
          </p>
          <p class="email-mt25">
            <input class="email cu-email"
              type="email"
              v-model="Tourist.email"
              placeholder="输入您的邮箱">
          </p>
          <p class="email-mt25">
            <textarea type="text"
              name="custo-email"
              v-model="Tourist.description"
              class="write"
              placeholder="请填写您的定制需求"></textarea>
          </p>
          <div id="tip"></div>
          <button type="button"
            class="custo-btn"
            @click="subtravel()"
            id="js-custo">定制行程</button>
        </form>
      </div>
    </div>

    <div class="cu-index">
      <!--头部模块-->
      <!--占位盒子-->
      <!-- BEGIN:头部 -->
      <header id="page_header2"
        class="boxSizing">
        <a class="logo f_l"
          @click="tohref('https://m.tourscool.com')"
          style="border:none;"><img src="@/assets/image/index/logo2.png"
            style="width: 32px;height: 32px"></a>
        <div class="product-pro-param">
          <span>定制旅游</span>
        </div>
        <div class="product_toolbar f_r">
          <a @click="tohref('https://m.tourscool.com/site/destination')"
            class="product-list-ico nav"></a>
        </div>
      </header>
      <!-- END:头部 -->
      <!--定制行程模块-->
    </div>

    <!--<div class="custom-travel custo-container">
          <h3 class="custo-title"><span></span>&nbsp;<i></i><strong class="title-text">定制旅行</strong><i></i>&nbsp;<span></span>
          </h3>
          <div class="swiper-container J-banner" group="packet_group_05">
              <ul class="swiper-wrapper">
                  <li class="swiper-slide">
                      <img src="/newIndex/img/custom/banner2.png" alt="北美旅游口碑第一"/>
                      <h3>北美旅游口碑第一</h3>
                      <p>
                          走四方成立15年来，专注于北美旅游，已经为超过130万人次提供了专业的出境旅游服务，更凭借优质的商业信誉和良好的服务品质，成为了北美唯一“最高信用等级”A+级华人旅行社，定制选择走四方，出游省心有保障</p>
                  </li>
                  <li class="swiper-slide">
                      <img src="/newIndex/img/custom/banner2.png" alt="与众不同 想您所想"/>
                      <h3>与众不同 想您所想</h3>
                      <p>想去哪玩您做主，想玩什么您做主！只要告诉我们您的需求，走四方会根据您的需求定制最合适的的特色行程，带您深入探访普通游客无法到达的最美的风景</p>
                  </li>
                  <li class="swiper-slide">
                      <img src="/newIndex/img/custom/banner2.png" alt="专属体验 享您所想"/>
                      <h3>专属体验 享您所想</h3>
                      <p>从旅行攻略到玩乐体验，从酒店交通到票务订购，走四方为您一切安排妥当，同时我们会分享各个旅游项目价格，透明报价，让您尽享无忧旅程</p>
                  </li>
                  <li class="swiper-slide">
                      <img src="/newIndex/img/custom/banner2.png" alt="7X24服务 助您安心出游"/>
                      <h3>7X24服务 助您安心出游</h3>
                      <p>走四方总部位于美国洛杉矶，深圳设有大型运营中心，走四方承诺提供全程7X24小时管家式旅行服务，全球实时沟通，用心为您打造终生难忘的定制旅行体验</p>
                  </li>
                  <li class="swiper-slide">
                      <img src="/newIndex/img/custom/banner2.png" alt="定制师团队 为您量身定制"/>
                      <h3>定制师团队 为您量身定制</h3>
                      <p>走四方拥有多位长期生活在美国的“玩咖级”旅游定制师，您只需要花5秒钟提交需求，我们的定制师会立即根据自己的旅行经验，为您量身定制最合理的行程方案</p>
                  </li>
              </ul>
              &lt;!&ndash; 如果需要导航按钮 &ndash;&gt;
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
          </div>
      </div>-->

    <!--游客案例模块-->
    <div class="custo-case custo-container">
      <h3 class="custo-title"><span></span>&nbsp;<i></i><strong class="title-text">游客案例</strong><i></i>&nbsp;<span></span>
      </h3>
      <div class="case-content">
        <router-link :to="{path:'/custom/gushi',query:{'gushi':'1'}}">
          <dl class="case-item">
            <dt><img src="../assets/img/custom/index/gs1.png"
                alt=""></dt>
            <dd>
              <h2>欧洲</h2>
              <div class="case-info">
                <span class="case-day">行程: <strong>15天</strong></span>
                <span class="case-person">游客: <strong>3人</strong></span>
              </div>
              <div class="case-price">
                人均预算:&nbsp;&nbsp;<span class="price"><i>￥</i>25690</span><i>/人</i>
              </div>
            </dd>
          </dl>
          <!--<a href="/custom/gushi?gushi=1">-->
          <!---->
          <!--</a>-->
        </router-link>
        <router-link :to="{path:'/custom/gushi',query:{'gushi':'2'}}">
          <dl class="case-item">
            <dt><img src="../assets/img/custom/index/gs2.png"
                alt=""></dt>
            <dd>
              <h2>毛里求斯</h2>
              <div class="case-info">
                <span class="case-day">行程: <strong>8天</strong></span>
                <span class="case-person">游客: <strong>2人</strong></span>
              </div>
              <div class="case-price">
                人均预算:&nbsp;&nbsp;<span class="price"><i>￥</i>14266</span><i>/人</i>
              </div>
            </dd>
          </dl>
        </router-link>
        <router-link :to="{path:'/custom/gushi',query:{'gushi':'3'}}">
          <dl class="case-item">
            <dt><img src="../assets/img/custom/index/gs3.png"
                alt=""></dt>
            <dd>
              <h2>日本</h2>
              <div class="case-info">
                <span class="case-day">行程: <strong>7天</strong></span>
                <span class="case-person">游客: <strong>2人</strong></span>
              </div>
              <div class="case-price">
                人均预算:&nbsp;&nbsp;<span class="price"><i>￥</i>13160</span><i>/人</i>
              </div>
            </dd>
          </dl>
        </router-link>
      </div>

    </div>

    <!--热门目的地-->
    <div class="custo-nation custo-container">
      <h3 class="custo-title"><span></span>&nbsp;<i></i><strong class="title-text">热门目的地</strong><i></i>&nbsp;<span></span></h3>
      <div class="nation-content"
        group="packet_group_03">
        <div class="nation-item">

          <router-link id="store1"
            :to="{path:'/custom/store',query:{'store':'1'}}">
            <img src="../assets/img/custom/index/rm1.png"
              alt="巴黎">
            <span class="ellipsis">巴黎</span>
          </router-link>

        </div>
        <div class="nation-item">
          <router-link id="store7"
            :to="{path:'/custom/store',query:{'store':'7'}}">
            <img src="../assets/img/custom/index/jd2.png"
              alt="罗马">
            <span class="ellipsis">日本</span>
          </router-link>
        </div>
        <div class="nation-item">
          <router-link id="store3"
            :to="{path:'/custom/store',query:{'store':'3'}}">
            <img src="../assets/img/custom/index/rm3.png"
              alt="巴厘岛">
            <span class="ellipsis">巴厘岛</span>
          </router-link>
        </div>
        <div class="nation-item">
          <router-link id="store4"
            :to="{path:'/custom/store',query:{'store':'4'}}">
            <img src="../assets/img/custom/index/rm4.png"
              alt="苏梅岛">
            <span class="ellipsis">苏梅岛</span>
          </router-link>
        </div>
        <div class="nation-item">
          <router-link id="store5"
            :to="{path:'/custom/store',query:{'store':'5'}}">
            <img src="../assets/img/custom/index/rm5.png"
              alt="新加坡">
            <span class="ellipsis">新加坡</span>
          </router-link>
        </div>
        <div class="nation-item">
          <router-link id="store17"
            :to="{path:'/custom/store',query:{'store':'17'}}">

            <img src="../assets/img/custom/index/rm6.png"
              alt="澳洲">
            <span class="ellipsis">澳洲</span>
          </router-link>
        </div>
      </div>
      <div class="nation-foot">
        <router-link :to="{path:'/custom/list'}">更多目的地 ></router-link>

      </div>
    </div>

    <!--经典行程推荐-->
    <div class="custo-list-small custo-container">
      <h3 class="custo-title"><span></span>&nbsp;<i></i><strong class="title-text">经典行程推荐</strong><i></i>&nbsp;<span></span></h3>
      <div class="stroke-content">
        <dl class="stroke-item">
          <dt>

            <router-link :to="{path:'/custom/store',query:{'store':'7'}}">
              <img src="../assets/img/custom/index/jd2.png"
                alt="【日本美食之旅】东京+富士山 7日">
            </router-link>
          </dt>
          <dd>
            <router-link :to="{path:'/custom/store',query:{'store':'7'}}">
              <h2 class="ellipsis-two">【日本美食之旅】东京+富士山 7日</h2>
            </router-link>
            <span class="start-city custo-icon ellipsis">全国出发</span>
            <span class="price"><em><span class="min-dollar">￥</span>14000</em><i class="money-m">起</i><i>/人</i></span>
          </dd>
        </dl>
        <dl class="stroke-item">
          <dt>

            <router-link :to="{path:'/custom/store',query:{'store':'17'}}">
              <img src="../assets/img/custom/index/jd4.png"
                alt=" 澳大利亚太平洋海岸自驾之旅13日">
            </router-link>
          </dt>
          <dd>
            <router-link :to="{path:'/custom/store',query:{'store':'17'}}">
              <h2 class="ellipsis-two"> 澳大利亚太平洋海岸自驾之旅13日</h2>
            </router-link>
            <span class="start-city custo-icon ellipsis">全国出发</span>
            <span class="price"><em><span class="min-dollar">￥</span>18900</em><i class="money-m">起</i><i>/人</i></span>
          </dd>
        </dl>
        <dl class="stroke-item">
          <dt>
            <router-link :to="{path:'/custom/store',query:{'store':'14'}}">
              <img src="../assets/img/custom/index/jd1.png"
                alt="加州一号公路+大峡谷锡安国家公园+羚羊彩穴发现自驾14日">
            </router-link>
          </dt>
          <dd>
            <router-link :to="{path:'/custom/store',query:{'store':'14'}}">
              <h2 class="ellipsis-two">加州一号公路+大峡谷锡安国家公园+羚羊彩穴发现自驾14日</h2>
            </router-link>
            <span class="start-city custo-icon ellipsis">全国出发</span>
            <span class="price"><em><span class="min-dollar">￥</span>16800</em><i class="money-m">起</i><i>/人</i></span>
          </dd>
        </dl>
        <dl class="stroke-item">
          <dt>
            <!--<router-link   :to="{path:'/store',query:{'store':'10'}}">-->
            <a @click="tostore(10)">
              <img src="../assets/img/custom/index/jd3.png"
                alt="新西兰玩转南岛12天跟队自驾行程">
            </a>
            <!--</router-link>-->
          </dt>
          <dd>
            <!--<router-link   :to="{path:'/store',query:{'store':'10'}}">-->
            <a @click="tostore(10)">
              <h2 class="ellipsis-two">新西兰玩转南岛12天跟队自驾行程</h2>
            </a>
            <!--</router-link>-->
            <span class="start-city custo-icon ellipsis">全国出发</span>
            <span class="price"><em><span class="min-dollar">￥</span>17800</em><i class="money-m">起</i><i>/人</i></span>
          </dd>
        </dl>
      </div>
      <div class="stroke-foot">
        <router-link :to="{path:'/custom/list'}">更多私家包团行程&nbsp;&nbsp;&gt;</router-link>
      </div>
    </div>

    <!--定制旅行模块-->
    <div class="service">
      <img style="width:100%;"
        src="../assets/img/custom/service.png"
        alt="">
    </div>
    <div class="height-50"></div>
    <div id="public_toolbar"
      class="clearfix public_toolbar detail_toolbar">
      <div class="f_l phone_contact">
        <a class="boxSizing"
          data-ajax="false"
          value="18581951271"
          href="tel:18581951271">电话咨询</a>
      </div>
      <div class="f_l online_contact active_btn"
        id="online-service-contact">
        <a class="boxSizing ui-link"
          id="qa-wangqiao-btn">在线咨询</a>
      </div>
    </div>
  </div>
</template>
<script>
  // import "../assets/style/swiper.min.css";
  import "../assets/style/base.css";
  import "../assets/style/custom.css";
  //   import $ from 'jquery';

  export default {
    name: "",
    data() {
      return {
        Tourist: {
          contact: '',//姓名
          phone: '',//电话
          email: '',//邮箱
          description: ''//需求
        }
      };
    },
    created() {
      //实例创建钩子
    },
    mounted() {
      //首次渲染钩子
      this.setHeight();
      var tha = this;
      document.addEventListener("click", function () {
        for (let e in tha.show) {
          if (tha.show[e] === true) {
            tha.show[e] = false;
          }
        }
      });
      // $(function () {
      //   var _hmt = _hmt || [];
      //   (function () {
      //     var hm = document.createElement("script");
      //     hm.type = "text/javascript";
      //     hm.charset = "utf-8";
      //     hm.src = "https://hm.baidu.com/hm.js?9bfbbc9f24159633a14d3b4f37db769b";
      //     var s = document.getElementsByTagName("script")[0];
      //     s.parentNode.insertBefore(hm, s);
      //   })();
      //   setTimeout(function () {
      //     $('#qa-wangqiao-btn').on('click', function () {
      //       $('#nb_invite_ok').trigger('click')
      //     })
      //   }, 1000)

      // })
    },
    activated() {
      //缓存页面访问钩子
      this.setHeight();
      //debugger
      this.$store.commit("com_dialogSelect", {
        show: false //关闭弹窗
      });
    },
    beforeRouteLeave(to, from, next) {
      if (to.name == 'customstore') {
        var scrollTop2 = document.documentElement.scrollTop;
        localStorage.setItem('scrollTop2', scrollTop2)
      }
      next();
    },
    methods: {
      subtravel() {
        var this_ = this;
        if (!this_.Tourist.contact) return $tool.warn("请输入联系人姓名");
        if (!this_.Tourist.phone) return $tool.warn("请输入手机号");
        if (!this_.Tourist.email) return $tool.warn("请输入邮箱");
        if (!this_.Tourist.description) return $tool.warn("请输入您的定制需求");
        if (!this_.checkMobile(this_.Tourist.phone)) return $tool.warn("请输入正确格式的手机号");;
        if (!this_.checkMail(this_.Tourist.email)) return $tool.warn("请输入正确格式的邮箱地址");;
        this_.$ajax.post(this_.api_port.cry + "/custom/add", this_.Tourist).then(function (response) {
          if (response.data == 'success') {
            $tool.success('定制成功，我们尽快给您安排出行');
            setTimeout(function () {
              window.location.href = 'https://m.tourscool.com'
            }, 1000)
          } else {
            $tool.error(response.data);
          }        })
          .catch(function (error) {
            console.log(error);
          });
      },
      tostore(x) {
        this.$router.push({path: '/custom/store', query: {store: x}});
      },
      setHeight() {
        this.$nextTick(() => {
          setTimeout(function () {
            if (localStorage.getItem('scrollTop2')) {
              console.log(localStorage.getItem('scrollTop2'))
              document.documentElement.scrollTop = parseInt(localStorage.getItem('scrollTop2'));
              document.body.scrollTop = parseInt(localStorage.getItem('scrollTop2'));
              window.scroll(0, parseInt(localStorage.getItem('scrollTop2')))
              localStorage.removeItem('scrollTop2')
            }
          }, 100)

        })


      },
      tohref(e) {
        window.location.href = e
      },
      checkMobile(str) {
        var re = /^1\d{10}$/;
        if (re.test(str)) {
          return true;
        }
        else {
          return false;
        }
      },
      checkMail(str) {
        var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (re.test(str)) {
          return true;
        }
        else {
          return false;
        }
      },



    }
  };
</script>

<style scoped>
  .block {
    display: block;
  }

  .hide {
    display: none;
  }

  .m-custo-form {
    width: 100%;
    height: 660px;
    padding: 0 20px;
    background-color: #fff;
  }

  .custo-index .m-custo-form {
    background: url(../assets/img/custom/custom.jpg) 0 0 no-repeat;
    background-size: cover;
  }

  .m-custo-form > p {
    position: relative;
    font-size: 26px;
    text-align: center;
    color: #fff;
    padding: 6px 0;
    margin-top: 46px;
    margin-bottom: 40px;
  }

  .m-custo-form > p:before,
  .m-custo-form > p:after {
    content: "";
    display: block;
    position: absolute;
    width: 16%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    top: 18px;
  }

  .m-custo-form > p:before {
    left: 4px;
  }

  .m-custo-form > p:after {
    right: 4px;
  }

  .m-custo-form input {
    outline: none;
    width: 100%;
    height: 0.62rem;
    border-radius: 0.08rem;
    font-size: 0.12rem;
  }

  .m-custo-form textarea {
    outline: none;
    width: 100%;
    border-radius: 0.08rem;
    font-size: 0.12rem;
  }

  .m-custo-form form p {
    margin-bottom: 0.3rem;
  }

  .m-custo-form form p > input {
    border: 1px solid #dfe3e5;
    padding-left: 0.46rem;
    position: relative;
  }

  .m-custo-form form p > textarea {
    border: 1px solid #dfe3e5;
    padding-left: 0.46rem;
    position: relative;
  }

  .m-custo-form input.cu-dest {
    background-image: url(../assets/img/custom/private-case-sripte.png);
    background-repeat: no-repeat;
    background-position: -210px -188px;
    background-size: 232px 350px;
  }

  .m-custo-form .cu-email {
    background-image: url(../assets/img/custom/private-case-sripte.png);
    background-repeat: no-repeat;
    background-position: -210px -34px;
    background-size: 232px 350px;
  }
  .write {
    background-image: url(../assets/img/custom/write.png);
    background-repeat: no-repeat;
    background-position: 0.06rem 0;
    background-size: 0.4rem 0.4rem;
  }

  .m-custo-form input.phone {
    background-image: url(../assets/img/custom/private-case-sripte.png);
    background-repeat: no-repeat;
    background-position: -210px -79px;
    background-size: 232px 350px;
    border-radius: 0.08rem;
  }

  #custo-telephone {
    /*overflow: hidden;*/
    margin-bottom: 0.44rem;
  }

  #custo-telephone .area-wrap .area-box i.flag {
    padding-right: 10px;
  }

  #custo-telephone .area-box .areas {
    /*width: .82rem;*/
    width: 27%;
    height: 0.6rem;
    margin-right: 0.26rem;
    padding-left: 5px;
    background-color: #fff;
    border: 1px solid #dfe3e5;
  }

  #custo-telephone .area-wrap .area-box input.areaname {
    width: 58% !important;
    height: 0.24rem !important;
    background-color: #fff;
  }

  #custo-telephone .area-wrap .area-box em {
    margin: 0 0 0 -0.02rem;
  }

  #custo-telephone .area-wrap .con {
    width: 100%;
  }

  #custo-telephone .area-wrap .area-box input.phone {
    float: right;
    padding-left: 0.46rem;
    height: 0.3rem;
    border: 1px solid #dfe3e5;
    width: 68% !important;
    background-image: url(../assets/img/custom/private-case-sripte.png);
    background-repeat: no-repeat;
    background-position: -210px -79px;
    background-size: 232px 350px;
    border-radius: 0.08rem;
  }

  .m-custo-form .cu-area {
    margin-top: 0.44rem;
    border: 1px solid #dfe3e5;
    -webkit-appearance: none;
    -webkit-border-radius: 0.08rem;
    border-radius: 0.08rem;
    width: 100%;
    height: 1.8rem;
    padding: 0.2rem;
    resize: none;
    outline: none;
  }

  .m-custo-form .custo-btn {
    display: block;
    width: 2.1rem;
    height: 0.62rem;
    line-height: 0.62rem;
    border: 0;
    border-radius: 0.08rem;
    color: #fff;
    background-color: #fa8532;
    margin: 0 auto;
    font-size: 0.26rem;
    cursor: pointer;
  }

  .dest-clear,
  .email-clear {
    display: none;
    font-size: 0.18rem;
    font-weight: bold;
    width: 0.36rem;
    height: 0.36rem;
    line-height: 0.36rem;
    text-align: center;
    border-radius: 0.2rem;
    color: #fff;
    background-color: #c7c7c7;
    cursor: pointer;
    position: absolute;
  }

  .custo-index .dest-clear {
    top: 2.44rem;
  }

  .custo-index .email-clear {
    top: 3.48rem;
  }

  .dest-clear {
    top: 2.24rem;
    right: 0.32rem;
  }

  .email-clear {
    top: 3.16rem;
    right: 0.32rem;
  }

  /*验证码*/
  .changeimg {
    overflow: hidden;
    margin-bottom: 0;
  }

  .changeimg input {
    border: 1px solid #dfe3e5;
    display: inline-block;
    float: left;
    font-size: 0.12rem;
    color: #333;
    width: 30.5%;
    height: 0.62rem;
    padding-left: 0.12rem;
  }

  .changeimg p {
    display: inline-block;
    float: left;
    font-size: 13px;
    color: #3a393a;
    margin: 0;
    margin-left: 0.4rem;
  }

  .changeimg p span {
    position: relative;
    left: 4px;
    top: 1px;
  }

  .changeimg img {
    vertical-align: middle;
    width: 1.8rem;
    height: 0.62rem;
  }

  #tip {
    color: red;
    height: 12px;
    margin-top: 0.04rem;
    margin-bottom: 0.12rem;
  }

  /*手机号码重置go*/
  .area-wrap-two .area-box .areas {
    border-radius: 0.08rem;
    line-height: 0.6rem;
  }

  .area-wrap-two .phone-box {
    width: auto !important;
    float: right;
    padding-left: 0.46rem;
    height: 0.6rem;
    border: 1px solid #dfe3e5;
    width: 68% !important;
    line-height: 0.6rem;
    background-image: url(../assets/img/custom/private-case-sripte.png);
    background-repeat: no-repeat;
    background-position: -210px -79px;
    background-size: 232px 350px;
    border-radius: 0.08rem;
  }

  .area-wrap-two .area-box i.flag {
    margin-top: 9px;
  }

  .area-wrap-two .area-box .areas:after {
    display: none;
  }

  .area-wrap-two .area-box input.phone {
    height: 0.52rem;
  }

  .area-wrap-two .phone-box .JS-code {
    padding-top: 0;
    padding-bottom: 0;
  }

  /*手机号码重置end*/

  @media screen and (min-width: 640px) {
    /*手机号码重置go*/
    .area-wrap-two .area-box i.flag {
      margin-top: 24px;
    }

    .area-wrap-two .phone-box {
      background-position: -267px -98px;
      background-size: 305px 480px;
    }

    /*手机号码重置end*/
    .m-custo-form input.cu-dest {
      background-position: -267px 16px;
      background-size: 305px 480px;
    }

    .m-custo-form input.cu-email {
      background-position: -267px -38px;
      background-size: 305px 480px;
    }

    #custo-telephone .area-wrap .area-box input.phone {
      background-position: -267px -98px;
      background-size: 305px 480px;
    }

    #custo-telephone .area-wrap .area-box em {
      border-left: 8px solid #fff;
      border-right: 8px solid #fff;
      border-top: 8px solid #000;
    }
  }
</style>