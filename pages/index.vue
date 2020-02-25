<template>
  <div class="home-wrap" ref="refHomePage">
    <!--头部-->
    <div class="header" v-if="!isAndroid">
      <div class="down-box" v-if="closeDown === 'no'" ref="refDownBox">
        <div class="down-manner"></div>
        <div class="left" @click="changeCloseDown">
          <van-icon name="close" />
        </div>
        <div class="downloadText">
          <span>{{ $t("homePage.downloadText1") }}</span>
          <span>{{ $t("homePage.downloadText2") }}</span>
        </div>
        <div class="right">
          <a :href="downUrl">{{ $t("homePage.goOpen") }}</a>
        </div>
      </div>
    </div>
    <template v-if="!loadingPage">
      <div class="bannerSearch">
        <!--banner-->
        <div class="banner">
          <!--搜索-->
          <div class="search-box" ref="searchBox">
            <nuxt-link tag="div" class="left" to="/search" id="searchLeft">
              <img src="../assets/imgs/home/icon_search@2x.png" alt="">
              <span>{{ $t("homePage.desKeywords") }}</span>
            </nuxt-link>
            <div @click.stop="showcall" class="right">
              <img src="../assets/imgs/home/ic_phone@2x.png">
            </div>
          </div>
          <van-swipe indicator-color="white">
            <van-swipe-item v-for="banner in bannerList" :key="banner.image">
              <a class="img" :href="banner.link">
                <img :src="banner.image" />
              </a>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <!--标签-->
      <div class="entry-block">
        <div v-for="navItem in navList" :key="navItem.title">
          <a class="entry-tourism" :href="navItem.nav_link">
            <img :src="navItem.nav_image" />
            <p class="title">{{ navItem.nav_title }}</p>
          </a>
        </div>
      </div>
      <!--标签-->
      <div class="entry-block last">
        <div v-for="navItem in assNavList" :key="navItem.title">
          <a class="entry-tourism" :href="navItem.nav_link">
            <img :src="navItem.nav_image" />
            <p class="title">{{ navItem.nav_title }}</p>
          </a>
        </div>
      </div>
      <!--推荐目的地-->
      <div class="hot-target">
        <div class="title">
          <div class="name">{{ $t("homePage.hotDes") }}</div>
          <nuxt-link tag="div" class="link-all" to="/search">
            {{ $t("seeAll") }}
            <van-icon name="arrow" />
          </nuxt-link>
        </div>
        <hot-place :lists="hotList"></hot-place>
      </div>
      <!-- 旅行月历 -->
      <div class="travel-calendar">
        <div class="title-name">{{ $t("homePage.trcalendar") }}</div>
        <div class="tab-main-content">
          <van-tabs :border="false" color="#00ABF9" line-width="60">
            <van-tab
              :title="calendar.month && calendar.month.tab_name"
              v-for="(calendar, index) in tourCalendarList"
              :key="'Calendar' + index"
            >
              <div class="items">
                <div class="box-lx">
                  <div
                    class="info"
                    v-for="theme in calendar.theme"
                    :key="theme.a_product_name"
                    :style="{ backgroundImage: `url(${theme.image})` }"
                  >
                    <div class="lm-name">
                      <div class="fs14">{{ theme.theme }}</div>
                      <div>{{ theme.desc }}</div>
                    </div>
                    <a
                      class="cp-mk"
                      :href="
                        `/product/detail?productId=${theme.a_product[0] &&
                          theme.a_product[0].product_id}`
                      "
                    >
                      <p class="name">{{ theme.a_product_name }}</p>
                      <p class="grap">{{ theme.a_product_keyword }}</p>
                      <p class="price" v-if="theme.a_product[0]">
                        {{ theme.a_product[0].default_price | getPrice }}
                      </p>
                    </a>
                    <a
                      class="cp-mk"
                      :href="
                        `/product/detail?productId=${theme.b_product[0] &&
                          theme.b_product[0].product_id}`
                      "
                    >
                      <p class="name">{{ theme.b_product_name }}</p>
                      <p class="grap">{{ theme.b_product_keyword }}</p>
                      <p class="price" v-if="theme.b_product[0]">
                        {{ theme.b_product[0].default_price | getPrice }}
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
      <!--限时抢购-->
      <div class="sale-time-box" v-if="timeSalesList.length">
        <div class="title">
          <div class="name">{{ $t("homePage.timedSpecials") }}</div>
          <nuxt-link
            tag="div"
            class="link-all"
            :to="
              `/all/ya?ids=${timeSalesIds}&tb=1&bar=${$t(
                'homePage.timedSpecials'
              )}`
            "
            v-if="timeSalesList.length >= 3"
          >
            {{ $t("seeAll") }}
            <van-icon name="arrow" />
          </nuxt-link>
        </div>
        <div class="main-sale">
          <van-row gutter="10">
            <van-col span="12">
              <sale-time
                :height="190"
                :title="2"
                :item="timeSalesList[0]"
              ></sale-time>
            </van-col>
            <van-col span="12">
              <template v-for="time in timeSalesList.slice(1, 3)">
                <sale-time :item="time" :key="time.product_id"></sale-time>
              </template>
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="service-xf">
        <div class="title">
          <div class="name">{{ $t("homePage.serviceXf") }}</div>
        </div>
        <div class="content">
          <div
            class="item"
            v-for="assurance in assuranceList"
            :key="assurance.text"
          >
            <div class="img-box">
              <img :src="assurance.image" alt="" />
            </div>
            <div class="text">
              <span>{{ assurance.title }}</span
              >{{ assurance.text }}
            </div>
          </div>
        </div>
      </div>
      <div style="height:6px;background:#F2F7F9"></div>
      <!--精选商品-->
      <div class="product-list">
        <div class="product-tabs">
          <span
            v-for="(tabs, index) in productTabsList"
            :key="'productTabsList' + tabs.value"
            :class="tabs.value == tabCurrent.value ? 'active' : ''"
            @click="changeProductTab(tabs, index)"
            >{{ tabs.tab_name }}</span
          >
        </div>
        <div class="tab-items-sub">
          <span
            v-for="(subtab, index) in selectTabsList"
            :key="subtab.title"
            :class="
              subtab.filter[0].value == tabCurrent.tabValue ? 'active' : ''
            "
            @click="changeSubTab(subtab, index)"
            >{{ subtab.title }}</span
          >
        </div>
        <van-list
          v-model="prodLoading"
          :prodFinished="prodFinished"
          :finished-text="$t('noMore')"
          ref="waterProduct"
          @load="getData"
        >
          <div class="vue-waterfall-easy-scroll" ref="scrollEl">
            <div class="vue-waterfall-easy">
              <div class="img-box-water">
                <img :src="tabCurrent.image" alt="" />
                <div class="content">
                  <a
                    class="text"
                    v-for="link in tabCurrent.links"
                    :key="link.text"
                    :href="link.link"
                  >
                    {{ link.text }}
                    <img src="../assets/imgs/home/icon_arrow.png" alt="" />
                  </a>
                </div>
              </div>
              <div
                class="img-box-water"
                v-for="product in productList"
                :key="product.product_id"
              >
                <hot-item
                  :isShowTitle="false"
                  :proData="product"
                  @selectItem="selectItem"
                />
              </div>
            </div>
          </div>
          <div v-if="prodFinished" class="filish-bottom">
            {{$t('noMore')}}
          </div>
        </van-list>
      </div>
    </template>
    <div class="page-load-box" v-if="loadingPage">
      <van-loading type="spinner" color="#1989fa" />
      <div @click="reLoadPage">重新刷新</div>
    </div>
    <!-- 底部导航 -->
    <Tabbar :Index="0"></Tabbar>
    <!--悬浮-->
    <drift-aside
      ref="driftAside"
      :isHome="true"
      @backTop="backTop"
    ></drift-aside>
  </div>
</template>

<script>
import { DLG_TYPE } from "@/assets/js/consts/dialog";
import HotPlace from "@/components/hot_place/home";
import SnapUpItem from "@/components/items/snapUpItem";
import SaleTime from "@/components/items/saleTime";
import HotItem from "@/components/items/hotItem";
import { getHomeData } from "@/api/home";
import { getProductList } from "@/api/products";
import countDown from "@/components/count-down";
import DriftAside from "@/components/drift_aside";
import { throttle as _throttle } from "lodash";
import { setCookieByKey, getCookieByKey } from "@/assets/js/utils";
import { mapGetters, mapMutations } from "vuex";
import { replaceServerUrl } from "@/assets/js/utils";
import apiConfig from "./../apiConf.env";
import Tabbar from "@/components/tabbar";
export default {
  name: "home",
  filters: {
    getPrice(value) {
      return value.toString().split(".")[0];
    }
  },
  components: {
    HotPlace,
    SnapUpItem,
    HotItem,
    countDown,
    DriftAside,
    Tabbar,
    SaleTime
  },
  async asyncData({ $axios, store }) {
    let indexData;
    console.log(store.getters.currency);
    let { code, data } = await $axios.$get("/api/m_index_v2", {
      headers: {
        Language: store.getters.language,
        Currency: store.getters.currency
      }
    });
    if (code === 0) {
      indexData = data;
    }
    return {
      indexData
    };
  },
  fetch({ store }) {
    store.commit("setLanguage", store.getters.language);
  },
  data() {
    return {
      imgBoxEls: null,
      beginIndex: 0, // 开始要排列的图片索引,首次为第二列的第一张图片，后续加载则为已经排列图片的下一个索引
      colsHeightArr: [],
      reachBottomDistance: 20, // 默认在最低那一列到底时触发
      //底部导航栏跳转索引
      active: 0,
      productList: [], // 待图片预加载imgsArr完成，插入新的字段height之后,才会生成imgsArr_c，这时才开始渲染
      timeSalesList: [], // 限时特价
      bannerList: [], // banner
      navList: [], // 小图标
      assNavList: [], // 小小图标
      hotList: {}, // 热门目的地
      assuranceList: [], // 服務保障
      tourCalendarList: [], // 旅行月历
      productTabsList: [], // 瀑布流tab数据
      selectTabsList: [], // 瀑布流二级菜单
      tabImageList: [],
      timeSalesIds: "", // 显示特价产品ids的组合
      tabCurrent: {},
      prodLoading: false,
      prodFinished: false,
      prodPagination: {},
      loadingPage: true,
      isAndroid: this.$route.query.platform
    };
  },
  computed: {
    ...mapGetters(["closeDown"]),
    itemWidth() {
      return 138 * 0.5 * (414 / 375);
    },
    gutterWidth() {
      return 9 * 0.5 * (414 / 375);
    }
  },
  created(){
    
  },
  async mounted() {
    this.getHomeInitData();
    // 监听滚动
    this.$refs.refHomePage.addEventListener("scroll", this.scrollFn);
    let u = navigator.userAgent;
    let or = window.location.origin;
    this.downUrl = `${apiConfig.base}/api/tour/v1/download`;
    if(JSON.stringify(this.indexData) != '{}') {
      this.$nextTick(() => {
        this.loadingPage = false
      })
    } else {
      this.loadingPage = true
    }
  },
  beforeDestroy() {
    this.$refs.refHomePage.removeEventListener("scroll", this.scrollFn);
  },
  methods: {
    reLoadPage(){
      location.reload()
    },
    waterfall() {
      let that = this;
      if (!this.imgBoxEls) return;
      let top,
        left,
        height,
        colWidth = this.imgBoxEls[0].offsetWidth + 12;
      if (this.beginIndex == 0) this.colsHeightArr = [];
      for (let i = this.beginIndex; i < this.productList.length + 1; i++) {
        if (!that.imgBoxEls[i]) return;
        height = that.imgBoxEls[i].offsetHeight;
        if (i < 2) {
          that.colsHeightArr.push(height);
          top = 0;
          left = i * colWidth;
        } else {
          let minHeight = Math.min.apply(null, that.colsHeightArr); // 最低高低
          let minIndex = that.colsHeightArr.indexOf(minHeight); // 最低高度的索引
          top = minHeight;
          left = minIndex * colWidth;
          // 设置元素定位的位置
          // 更新colsHeightArr
          that.colsHeightArr[minIndex] = minHeight + height;
        }
        that.imgBoxEls[i].style.left = left + "px";
        that.imgBoxEls[i].style.top = top + "px";
      }
      this.$refs.scrollEl.style.height = Math.max(...that.colsHeightArr) + "px";
      this.beginIndex = this.productList.length + 1; // 排列完之后，新增图片从这个索引开始预加载图片和排列
    },
    async getData(obj) {
      if (this.prodFinished) {
        this.prodLoading = false
        return;
      }
      const submitData = {
        page: (this.prodPagination.page || 0) + 1,
        [this.tabCurrent.name]: this.tabCurrent.value,
        [this.tabCurrent.tabName]: this.tabCurrent.tabValue
      };
      const { code, data, pagination } = await getProductList(submitData);
      if (code === 0) {
        this.productList.push(...data);
        this.prodPagination = pagination;
        // 加载状态结束
        this.prodLoading = false;
        // 数据全部加载完成
        if (!pagination.more) {
          this.prodFinished = true;
        }
        if (data.length) {
          this.imgBoxEls = this.$el.getElementsByClassName("img-box-water");
          this.$nextTick(() => {
            this.waterfall();
          });
        }
      }
    },
    resetWater() {
      this.$refs.scrollEl.style.height = "270px";
      this.imgBoxEls = null;
      this.beginIndex = 0;
      this.colsHeightArr = [];
      this.prodLoading = false;
      this.prodFinished = false;
      this.prodPagination = {};
      this.productList = [];
    },
    // 电话咨询
    showcall() {
      console.log(1);
      this.vxToggleDialog(true);
      this.vxSetDlgType(DLG_TYPE.PHONE);
    },
    //在线咨询
    contactCustom() {
      /* onCustomerService() */
      let url = replaceServerUrl();
      window.open(url, "_self");
    },
    // 判断手机是安卓还是苹果
    downUrl() {},
    // banner跳转
    bannerLink(link) {
      if (link.indexOf("?") < 0) {
        window.location.href = link;
      } else {
        let query = link.split("?")[1].replace("keyword", "w");
        this.$router.push({
          path: `/product_list?${query}`
        });
      }
    },
    // 跳转商品详情
    selectItem(item) {
      this.$router.push({
        name: "product-detail",
        query: {
          productId: item
        }
      });
    },
    // 目的地跳转列表
    selectDetail(query) {
      query.itemType = 0;
      this.$router.push({
        name: "product_list",
        query
      });
    },
    getHomeInitData() {
      this.bannerList = this.indexData.banner || [];
      this.timeSalesList =
        (this.indexData.special && this.indexData.special.special_products) ||
        [];
      this.assuranceList = this.indexData.assurance || [];
      this.navList = this.indexData.main_nav || [];
      this.assNavList = this.indexData.ass_nav || [];
      this.tourCalendarList = this.indexData.tour_calendar || [];
      this._nomolizeHotList(this.indexData.rec_dest);
      this.selectTabsList = this.indexData.select_tabs || [];
      this._nomolizePcTab(this.indexData.product_tabs);
      this.tabCurrent = {
        value: this.productTabsList[0].value,
        name: this.productTabsList[0].name,
        tabName: this.productTabsList[0].tab_name,
        ...this.tabImageList[0],
        tabValue: this.selectTabsList[0].filter[0].value,
        tabName: this.selectTabsList[0].filter[0].name
      };
      console.log(this.tabCurrent);
      this.timeSalesIds = this.getTimeSaleIds(this.timeSalesList);
    },
    changeProductTab(tab, index) {
      this.resetWater();
      let { tabValue, tabName } = this.tabCurrent;
      this.tabCurrent = {
        name: tab.name,
        value: tab.value,
        ...this.tabImageList[index],
        tabValue,
        tabName
      };
      // this.getData();
      this.$refs.waterProduct.check()
    },
    changeSubTab(tab, index) {
      this.resetWater();
      this.$set(this.tabCurrent, "tabValue", tab.filter[0].value);
      this.$set(this.tabCurrent, "tabName", tab.filter[0].name);
      this.$refs.waterProduct.check()
    },
    _nomolizeHotList(data) {
      let imgArr = [],
        textArr = [];
      data.forEach(item => {
        if (item.image) {
          imgArr.push(item);
        } else {
          textArr.push(item);
        }
      });
      this.hotList = {
        image: imgArr,
        text: textArr
      };
    },
    _nomolizePcTab(data) {
      let product = [],
        image = [];
      data.forEach(item => {
        product.push({
          ...item.category_filter[0],
          ...item.category_name
        });
        image.push({
          links: item.links,
          image: item.category_name && item.category_name.image
        });
      });
      this.productTabsList = product;
      this.tabImageList = image;
    },
    getTimeSaleIds(data) {
      let _arr = [];
      data.forEach(item => {
        _arr.push(item.product_id);
      });
      return _arr.join(",");
    },
    // 滚动
    scrollFn() {
      const s1 = this.$refs.refHomePage.scrollTop;
      let SCROLL = 300;
      const h1 =
        this.$refs.refDownBox &&
        this.$refs.refDownBox.getBoundingClientRect().height;
      let homeHeight = this.$refs.refHomePage.getBoundingClientRect().height;
      // console.log(homeHeight)
      if (s1 > homeHeight) {
        this.$refs.driftAside.homeScrollShow();
      } else {
        this.$refs.driftAside.homeScrollHide();
      }
      setTimeout(() => {
        if (s1 === 0) {
          this.$refs.searchBox.style.backgroundColor = `transparent`;
          this.$refs.searchBox.style.color = `rgb(255,255,255)`;
          document.getElementById(
            "searchLeft"
          ).style.backgroundColor = `rgba(255,255,255,0.8)`;
          document.getElementById("searchLeft").style.color = `#989898`;
          this.$refs.searchBox.style.position = "absolute";
          /* if(this.closeDown === 'yes'){
                             this.$refs.searchBox.style.position = 'relative'
                         } */
          this.$refs.searchBox.style.top = "auto";
        } else {
          let rate = s1 / SCROLL;
          this.$refs.searchBox.style.backgroundColor = `rgba(255,255,255,${rate})`;
          document.getElementById(
            "searchLeft"
          ).style.backgroundColor = `rgba(200,200,200,${rate})`;
          document.getElementById(
            "searchLeft"
          ).style.color = `rgba(152,152,152,${rate})`;
          this.$refs.searchBox.style.color = `rgba(152,152,152,${rate})`;

          if (s1 > h1 || !h1) {
            this.$refs.searchBox.style.position = "fixed";
            this.$refs.searchBox.style.top = "0px";
          }
        }
      }, 17);
    },
    // 返回顶部
    backTop() {
      let timer = setInterval(() => {
        let speed = Math.floor(-this.$refs.refHomePage.scrollTop / 3);
        this.$refs.refHomePage.scrollTop =
          this.$refs.refHomePage.scrollTop + speed;
        if (this.$refs.refHomePage.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 17);
    },
    // 关闭下载
    changeCloseDown() {
      this.setCloseDown("yes");
      //  this.$refs.searchBox.style.position = 'relative';
    },
    ...mapMutations(["setCloseDown"]),
    ...mapMutations({
      vxSaveReservePro: "product/saveReservePro",
      vxToggleDialog: "toggleDialog", // 是否显示弹窗
      vxSetDlgType: "setDlgType" // 设置弹窗类型
    })
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
.home-wrap {
  height: 100vh;
  position: relative;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .header {
    width: 100%;
    z-index: 2100;
    .down-box {
      width: 100%;
      height: 120px;
      padding: 20px 32px;
      background-color: #00abf9;
      color: #fff;
      display: flex;
      align-items: center;
      font-size: 24px;
      position: relative;
      .down-manner {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 120px;
        background: url("../assets/imgs/woniu.png") no-repeat;
        background-size: contain;
      }
      .left {
        i {
          font-size: 40px;
          vertical-align: text-bottom;
          z-index: 2;
        }
      }
      .downloadText {
        margin-left: 24px;
        z-index: 2;
        span {
          font-size: 28px;
          font-weight: 400;
          line-height: 40px;
          display: block;
        }
      }
      .right {
        margin-left: 200px;
        background-color: #ffcb3c;
        border-radius: 6px;
        width: 132px;
        height: 48px;
        z-index: 2;
        a {
          display: block;
          line-height: 48px;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
  .bannerSearch {
    position: relative;
    .banner {
      height: 420px;
      position: relative;
      z-index: 3;
      .search-box {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
        height: 108px;
        padding: 20px 32px;
        display: flex;
        justify-content: space-between;
        color: #fff;
        width: 100%;
        align-items: center;
        .left {
          flex: 1;
          height: 72px;
          padding: 12px 14px;
          border-radius: 36px;
          background-color: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          span {
            font-size: 28px;
            margin-left: 16px;
            color: #2D2D2D;
          }
          img{
            width: 32px;
            height: 32px;
          }
        }
        .right {
          padding-left: 32px;
          margin-top: 10px;
          img{
            width: 52px;
            height: 52px;
          }
        }
      }
    }
    a {
      display: inline-block;
      width: 100%;
      height: 420px;
    }
    img {
      height: 420px;
      width: 100%;
    }
  }
  .page-load-box{
    text-align: center;
    margin-top: 40px;
    font-size: 28px;
    & > div{
      line-height: 40px;
      margin-top: 20px;
      color: #00ABF9;
    }
  }
  .entry-block {
    padding: 40px 10px 0 10px;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    &.last {
      padding: 16px 10px 40px 10px;
    }
    & > div {
      width: 20%;
    }
    .title {
      color: #191919;
      font-size: 24px;
    }
    img {
      width: 80px;
      height: 80px;
      display: inline-block;
    }
    .entry-tourism {
      display: block;
    }
  }

  .hot-target,
  .sale-time-box,
  .service-xf {
    padding: 12px 32px;
    background-color: #fff;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 18px;
      .name {
        color: #191919;
        font-size: 48px;
      }
      .link-all {
        color: #00abf9;
        font-size: 24px;
      }
      i {
        vertical-align: text-top;
      }
    }
  }
  .sale-time-box {
    margin-top: 24px;
  }
  .service-xf {
    margin-bottom: 30px;
    .content {
      box-shadow: 0px 0px 12px rgba(57, 57, 57, 0.15);
      border-radius: 20px;
      padding: 24px;
      margin-top: 10px;
      .item {
        display: flex;
        font-size: 24px;
        line-height: 34px;
        color: #aeaeae;
        margin-bottom: 30px;
        align-items: center;
        &:last-child {
          margin-bottom: 0;
        }
        span {
          color: #393939;
        }
      }
      .img-box {
        width: 60px;
      }
      img {
        width: 60px;
        height: 60px;
      }
      .text {
        flex: 1;
        padding-left: 20px;
      }
    }
  }
  .product-list {
    // height: 100%;
    padding-bottom: 110px;
    .vue-waterfall-easy-scroll {
      width: 100%;
      padding: 0 32px;
      min-height: 520px;
    }
    .vue-waterfall-easy {
      position: relative;
      width: 100%;
      height: 100%;
      .img-box-water {
        position: absolute;
        font-size: 24px;
        width: 334px;
        border-radius: 8px;
        img {
          height: 334px;
          width: 334px;
          display: block;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background: linear-gradient(
            136deg,
            rgba(102, 201, 246, 1) 0%,
            rgba(106, 170, 235, 1) 100%
          );
          box-shadow: 0px 2px 12px rgba(57, 57, 57, 0.16);
          padding: 20px;
          color: #fff;
          font-size: 28px;
          line-height: 44px;
          margin-bottom: 20px;
          border-radius: 0 0 8px 8px;
          img {
            width: 21px;
            height: 21px;
            display: inline-block;
          }
          a.text {
            display: block;
            color: #fff;
          }
        }
      }
    }
    .product-tabs {
      padding: 20px 32px 0 32px;
      margin-bottom: 20px;
      span {
        display: inline-block;
        margin-right: 70px;
        font-size: 28px;
        color: #2d2d2d;
        font-weight: bold;
        &.active {
          color: #00abf9;
        }
      }
    }
    .tab-items-sub {
      padding: 0 32px;
      font-size: 24px;
      margin-bottom: 30px;
      span {
        height: 48px;
        border: 2px solid #00abf9;
        color: #00abf9;
        margin-right: 40px;
        line-height: 42px;
        display: inline-block;
        border-radius: 44px;
        padding: 0 16px;
        &.active {
          background-color: #00abf9;
          color: #fff;
        }
      }
    }
    .filish-bottom{
      text-align: center;
      font-size: 24px;
      color: #999;
    }
  }
  .count-down {
    margin-left: 10px;
  }
  .travel-calendar {
    margin-top: 20px;
    position: relative;
    .title-name {
      font-size: 48px;
      position: absolute;
      left: 32px;
      top: 10px;
      color: #2d2d2d;
      z-index: 2;
    }
    .tab-main-content {
      padding: 0 0 0 32px;
      font-size: 0;
    }
    .items {
      width: 100%;
      overflow: hidden;
      overflow-x: scroll;
      margin-top: 20px;
    }
    .box-lx {
      position: relative;
      white-space: nowrap;
      height: 368px;
      margin-bottom: 30px;
    }
    .info {
      width: 320px;
      border-radius: 8px;
      height: 368px;
      margin-right: 20px;
      display: inline-block;
      font-size: 24px;
      background-size: cover;
      background-repeat: no-repeat;
      padding: 20px;
      .lm-name {
        color: #fff;
        line-height: 40px;
        .fs14 {
          font-size: 28px;
        }
      }
    }
    .cp-mk {
      background: #fff;
      border-radius: 8px;
      line-height: 34px;
      padding: 10px;
      margin-top: 10px;
      display: block;
      color: #2d2d2d;
      .price {
        color: #f55e2f;
      }
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &.grap {
          color: #aeaeae;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
<style>
.home-wrap .van-swipe__indicator--active {
  width: 26px;
  height: 10px;
  border-radius: 12px;
}

.home-wrap .count-down span {
  width: 40px;
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 6px;
  line-height: 40px;
  font-weight: bold;
  text-align: center;
  margin-top: 6px;
}
.travel-calendar .van-tab {
  flex: none;
}
.travel-calendar .van-tabs__line {
  width: 40px !important;
}
.travel-calendar .van-tabs__nav--line {
  justify-content: flex-end;
  padding-right: 32px;
}
</style>
