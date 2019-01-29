<template>
  <div>
    <div class="banner">
      <a class="return" @click="goBack" href="javascript:;" v-if="!isApp"></a>
      <span class="title" v-if="!isApp">旅行故事</span>
      <span class="recommend">稀饭推荐·旅行正当季</span>
    </div>
    <div class="ct">
      <!-- 产品 -->
      <nuxt-link v-for="item in prodList" :key="item.path" :to="{path: item.path, query: {platform: isApp ? isApp : ''}}">
        <dl class="product">
          <dt>
            <img class="pic_image imgStyle" :src="item.img" alt>
            <span class="pic_site">{{item.country}}</span>
          </dt>
          <dd class="description">{{item.desc}}</dd>
          <dd class="clearfix com_height">
            <div class="fl star">
              <img class="starStyle" src="../../assets/imgs/custom/list/star_full.png" alt>
              <img class="starStyle" src="../../assets/imgs/custom/list/star_full.png" alt>
              <img class="starStyle" src="../../assets/imgs/custom/list/star_full.png" alt>
              <img class="starStyle" src="../../assets/imgs/custom/list/star_full.png" alt>
              <img class="starStyle" src="../../assets/imgs/custom/list/star_empty.png" alt>
              <span class="scoreStyle">4.8</span>
            </div>
            <div class="priceStyle fr">
              <span>{{item.price}}</span>/起
            </div>
          </dd>
        </dl>
      </nuxt-link>
    </div>
    <div class="btn_container clearfix">
      <a
        target="_blank"
        href="http://p.qiao.baidu.com/cps/chat?siteId=12918104&userId=26301226"
        class="btn_online fl"
        data-ajax="false"
        id="qa-wangqiao-btn"
      >
        <img class="online" src="../../assets/imgs/custom/btn1.png" alt>
        在线咨询
      </a>
      <a href="/custom" class="btn_custom fl">
        <img class="online" src="../../assets/imgs/custom/btn2.png" alt>
        立即定制
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "custom-list",
  data() {
    return {
      isApp: this.$route.query.platform, // 有就是app
      // tsst: this.$route.params.tst, // 有就是app
      prodList: [
        {
          path: "/custom/store1",
          country: "法国",
          img: require("../../assets/imgs/custom/list/1.png"),
          desc: "【巴黎第七章】轻奢9天7晚之旅",
          price: "￥19980"
        },
        {
          path: "/custom/store2",
          country: "希腊",
          img: require("../../assets/imgs/custom/list/2.png"),
          desc:
            "【爱琴.地中海】豪华游艇出海/特色海鲜大餐/浮潜/海钓/最美悬崖步道/浪漫地中海日落/梵蒂冈博物馆/圣...",
          price: "￥22800"
        },
        {
          path: "/custom/store3",
          country: "印尼",
          img: require("../../assets/imgs/custom/list/3.png"),
          desc: "【全球热恋】巴厘岛+科莫多",
          price: "￥15600"
        },
        {
          path: "/custom/store4",
          country: "泰国",
          img: require("../../assets/imgs/custom/list/4.png"),
          desc: "【快乐活】苏梅岛+涛岛",
          price: "￥6380"
        },
        {
          path: "/custom/store5",
          country: "新加坡",
          img: require("../../assets/imgs/custom/list/5.png"),
          desc: "【一城一岛】新加坡+民丹岛",
          price: "￥13800"
        },
        {
          path: "/custom/store6",
          country: "东京&关西",
          img: require("../../assets/imgs/custom/list/6.png"),
          desc: "【花开异国】东京+关西 7天6晚",
          price: "￥13800"
        },
        {
          path: "/custom/store7",
          country: "东京&关西",
          img: require("../../assets/imgs/custom/list/77.png"),
          desc:
            "【富士山下】东京.关西 7天6晚【日本美食之旅】东京+富士山 7天5晚",
          price: "￥12600"
        },
        {
          path: "/custom/store8",
          country: "东京&富士山",
          img: require("../../assets/imgs/custom/list/7.png"),
          desc: "【日本美食之旅】东京+富士山 7天5晚",
          price: "￥12800"
        },
        {
          path: "/custom/store9",
          country: "新西兰",
          img: require("../../assets/imgs/custom/list/8.png"),
          desc: "【臻品新西兰】南北双岛11日自驾游",
          price: "￥16800"
        },
        {
          path: "/custom/store10",
          country: "新西兰",
          img: require("../../assets/imgs/custom/list/9.png"),
          desc: "【臻品新西兰】南岛10日自驾游",
          price: "￥13800"
        },
        {
          path: "/custom/store11",
          country: "新西兰",
          img: require("../../assets/imgs/custom/list/10.png"),
          desc: "【臻品新西兰】南岛12日自驾游",
          price: "￥17800"
        },
        {
          path: "/custom/store12",
          country: "美国",
          img: require("../../assets/imgs/custom/list/11.png"),
          desc: "黄石大提顿国家公园+洛杉矶8天6晚私家小团",
          price: "￥11500"
        },
        {
          path: "/custom/store13",
          country: "美国",
          img: require("../../assets/imgs/custom/list/12.png"),
          desc: "加州一号公路+锡安国家公园+羚羊彩穴发现自驾14 日",
          price: "￥16800"
        },
        {
          path: "/custom/store14",
          country: "美国",
          img: require("../../assets/imgs/custom/list/13.png"),
          desc: "加州一号公路+圣地亚哥经典自驾之旅10 日",
          price: "￥12800"
        },
        {
          path: "/custom/store15",
          country: "美国",
          img: require("../../assets/imgs/custom/list/14.png"),
          desc: "美西国家公园大环线全景自驾14 日",
          price: "￥16500"
        },
        {
          path: "/custom/store16",
          country: "美国",
          img: require("../../assets/imgs/custom/list/15.png"),
          desc: "美西三城+双国家公园+加州一号公路精彩自驾9天7晚",
          price: "￥18900"
        },
        {
          path: "/custom/store17",
          country: "澳大利亚",
          img: require("../../assets/imgs/custom/list/16.png"),
          desc: "太平洋海岸自驾之旅13天10晚",
          price: "￥18900"
        },
        {
          path: "/custom/store18",
          country: "印尼",
          img: require("../../assets/imgs/custom/list/17.png"),
          desc:
            "【童趣巴厘岛】夜游巴厘岛动物园（含晚餐）/阿勇河漂流/空中漫步/百度库/香料市场/海神庙",
          price: "￥9050"
        },
        {
          path: "/custom/store19",
          country: "泰国",
          img: require("../../assets/imgs/custom/list/18.png"),
          desc:
            "【童趣巴厘岛】夜游巴厘岛动物园（含晚餐）/阿勇河漂流/空中漫步/百度库/香料市场/海神庙",
          price: "￥9050"
        },
        {
          path: "/custom/store20",
          country: "泰国",
          img: require("../../assets/imgs/custom/list/19.png"),
          desc:
            "【网红巴厘岛】森林瀑布/网红秋千/漂浮下午茶/乌布皇宫/天空之门/莲花池台/水上皇宫/滑翔伞高空飞...",
          price: "￥9630"
        },
        {
          path: "/custom/store21",
          country: "印尼",
          img: require("../../assets/imgs/custom/list/20.png"),
          desc: "【畅游印尼双岛】巴厘岛+吉利岛",
          price: "￥7800"
        }
      ]
    };
  },
  mounted() {
    console.log(this.tsst,4444)
  },
  methods: {
    goBack() {
      window.history.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
body {
  margin: 0;
}
body,
html {
}
/* 头部banner */
.banner {
  background: url("../../assets/imgs/custom/list/banner.png") no-repeat -10px center/775px
    375px;
  width: 100%;
  height: 375px;
  position: relative;
}
.return {
  position: absolute;
  top: 20px;
  left: 0;
  display: inline-block;
  width: 100px;
  height: 100px;
  background: url("../../assets/imgs/custom/back.png") no-repeat center
    center/24px 41px;
}
.title {
  position: absolute;
  top: 85px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  font: 34px/36px "";
  color: #fff;
}
.recommend {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  height: 50px;
  text-align: center;
  font: bold 38px/50px "";
  color: #fff;
}
/* 中间内容 */
.ct {
  width: 100%;
  padding: 14px 32px;
  position: relative;
  padding-bottom: 120px;
  background: #fff;
}
.product {
  margin: 20px auto;
  width: 670px;
}
.product dt {
  width: 100%;
  position: relative;
}
.pic_site {
  position: absolute;
  left: 8px;
  bottom: 20px;
  width: 203px;
  height: 50px;
  padding-left: 45px;
  font: 24px/50px "";
  color: #fff;
  box-sizing: border-box;
  background: #000 url("../../assets/imgs/custom/list/pic_site.png") no-repeat
    10px 12px/30px 30px;
  opacity: 0.7;
  border-radius: 5px;
}
.description {
  font: 26px/26px "";
  color: #000;
  /* height: 74px; */
  margin: 13px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
/* 底部定位按钮 */
.btn_container {
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  background: #fff;
}
.btn_container a {
  width: 375px;
  display: inline-block;
  height: 100px;
  box-sizing: border-box;
  text-align: center;
}
.btn_online {
  color: #5e5e5e !important;
  background: rgb(243, 243, 243);
  font: 32px/100px "";
}
.btn_custom {
  background: #ef9a1a;
  color: #fff !important;
  font: 32px/100px "";
}

.clearfix:after {
  content: "";
  display: block;
  clear: both;
  overflow: hidden;
  height: 0;
}
.clearfix {
  zoom: 1;
  margin: 0;
}
.com_height {
  height: 40px;
}
.imgStyle {
  width: 670px;
  height: 380px;
}
.starStyle {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.star {
  line-height: 40px;
  vertical-align: center;
}
.scoreStyle {
  color: #ef9a1a;
  font-size: 29px;
  line-height: 40px;
  display: inline-block;
}
.priceStyle {
  color: #ef9a1a;
  font-size: 20px;
  line-height: 40px;
  span {
    font-weight: bold;
    color: #ef9a1a;
    font-size: 40px;
  }
}
.online {
  width: 0.52rem;
  height: 0.52rem;
}
</style>