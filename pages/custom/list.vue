<template>
  <div>
    <div class="banner">
      <a class="return" @click="goBack" href="javascript:;"></a>
      <span class="title">旅行故事</span>
      <span class="recommend">稀饭推荐·旅行正当季</span>
    </div>
    <div class="ct">
      <!-- 产品 -->
      <nuxt-link v-for="item in prodList" :key="item.path" :to="item.path">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              :src="item.img"
              alt
            >
            <span class="pic_site">{{item.country}}</span>
          </dt>
          <dd class="description">{{item.desc}}</dd>
          <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">{{item.price}}</span>/起
            </div>
          </dd>
        </dl>
      </nuxt-link>
      <!-- 产品 -->
      <a href="/custom/store?store=2">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/2.png"
              alt
            >
            <span class="pic_site">希腊</span>
          </dt>
          <dd class="description">
            【爱琴.地中海】豪华游艇出海/特色海鲜大餐/浮潜/海
            钓/最美悬崖步道/浪漫地中海日落/梵蒂冈博物馆/圣...
          </dd>
          <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$22800</span>/起
            </div>
          </dd>
        </dl>
      </a>
      <!-- 产品 -->
      <a href="/custom/store?store=3">
        <dl class="product">
          <dt>
            <img
                style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/3.png"
              alt
            >
            <span class="pic_site">印尼</span>
          </dt>
          <dd class="description">【全球热恋】巴厘岛+科莫多</dd>
          <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$15600</span>/起
            </div>
          </dd>
        </dl>
      </a>
      <!-- 产品 -->
      <a href="/custom/store?store=4">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/4.png"
              alt
            >
            <span class="pic_site">泰国</span>
          </dt>
          <dd class="description">【快乐活】苏梅岛+涛岛</dd>
          <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$6380</span>/起
            </div>
          </dd>
        </dl>
      </a>
      <a href="/custom/store?store=5">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/5.png"
              alt
            >
            <span class="pic_site">新加坡</span>
          </dt>
          <dd class="description">【一城一岛】新加坡+民丹岛</dd>
          <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$13800</span>/起
            </div>
          </dd>
        </dl>
      </a>
      <a href="/custom/store?store=6">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/6.png"
              alt
            >
            <span class="pic_site">东京&关西</span>
          </dt>
          <dd class="description">【花开异国】东京+关西 7天6晚</dd>
          <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$13800</span>/起
            </div>
          </dd>
        </dl>
      </a>
      
      <a href="/custom/store?store=7">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/77.png"
              alt
            >
            <span class="pic_site">东京&关西</span>
          </dt>
          <dd class="description">【富士山下】东京.关西 7天6晚【日本美食之旅】东京+富士山 7天5晚</dd>
          <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$12600</span>/起
            </div>
          </dd>
        </dl>
      </a>
      
      <a href="/custom/store?store=8">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/7.png"
              alt
            >
            <span class="pic_site">东京&富士山</span>
          </dt>
          <dd class="description">【日本美食之旅】东京+富士山 7天5晚</dd>
         <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$12800</span>/起
            </div>
          </dd>
        </dl>
      </a>
      <a href="/custom/store?store=9">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/8.png"
              alt
            >
            <span class="pic_site">新西兰</span>
          </dt>
          <dd class="description">【臻品新西兰】南北双岛11日自驾游</dd>
          <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$16800</span>/起
            </div>
          </dd>
        </dl>
      </a>
      <a href="/custom/store?store=10">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/9.png"
              alt
            >
            <span class="pic_site">新西兰</span>
          </dt>
          <dd class="description">【臻品新西兰】南岛10日自驾游</dd>
          <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$13800</span>/起
            </div>
          </dd>
        </dl>
      </a>
      <a href="/custom/store?store=11">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/10.png"
              alt
            >
            <span class="pic_site">新西兰</span>
          </dt>
          <dd class="description">【臻品新西兰】南岛12日自驾游</dd>
          <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$17800</span>/起
            </div>
          </dd>
        </dl>
      </a>
      <a href="/custom/store?store=12">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/11.png"
              alt
            >
            <span class="pic_site">美国</span>
          </dt>
          <dd class="description">黄石大提顿国家公园+洛杉矶8天6晚私家小团</dd>
          <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$11500</span>/起
            </div>
          </dd>
        </dl>
      </a>
      <a href="/custom/store?store=13">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/12.png"
              alt
            >
            <span class="pic_site">美国</span>
          </dt>
          <dd class="description">加州一号公路+锡安国家公园+羚羊彩穴发现自驾14 日</dd>
          <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$16800</span>/起
            </div>
          </dd>
        </dl>
      </a>
      <a href="/custom/store?store=14">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/13.png"
              alt
            >
            <span class="pic_site">美国</span>
          </dt>
          <dd class="description">加州一号公路+圣地亚哥经典自驾之旅10 日</dd>
          <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$12800</span>/起
            </div>
          </dd>
        </dl>
      </a>
      <a href="/custom/store?store=15">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/14.png"
              alt
            >
            <span class="pic_site">美国</span>
          </dt>
          <dd class="description">美西国家公园大环线全景自驾14 日</dd>
          <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$16500</span>/起
            </div>
          </dd>
        </dl>
      </a>
      <a href="/custom/store?store=16">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/15.png"
              alt
            >
            <span class="pic_site">美国</span>
          </dt>
          <dd class="description">美西三城+双国家公园+加州一号公路精彩自驾9天7晚</dd>
          <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$18900</span>/起
            </div>
          </dd>
        </dl>
      </a>
      <a href="/custom/store?store=17">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/16.png"
              alt
            >
            <span class="pic_site">澳大利亚</span>
          </dt>
          <dd class="description">太平洋海岸自驾之旅13天10晚</dd>
          <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$18900</span>/起
            </div>
          </dd>
        </dl>
      </a>
      <a href="/custom/store?store=18">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/17.png"
              alt
            >
            <span class="pic_site">印尼</span>
          </dt>
          <dd class="description">
            【童趣巴厘岛】夜游巴厘岛动物园（含晚餐）/阿勇河
            漂流/空中漫步/百度库/香料市场/海神庙
          </dd>
         <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$9050</span>/起
            </div>
          </dd>
        </dl>
      </a>
      <a href="/custom/store?store=19">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/18.png"
              alt
            >
            <span class="pic_site">泰国</span>
          </dt>
          <dd class="description">
            【童趣巴厘岛】夜游巴厘岛动物园（含晚餐）/阿勇河
            漂流/空中漫步/百度库/香料市场/海神庙
          </dd>
         <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$9050</span>/起
            </div>
          </dd>
        </dl>
      </a>
      <a href="/custom/store?store=20">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/19.png"
              alt
            >
            <span class="pic_site">泰国</span>
          </dt>
          <dd class="description">
            【网红巴厘岛】森林瀑布/网红秋千/漂浮下午茶/乌布
            皇宫/天空之门/莲花池台/水上皇宫/滑翔伞高空飞...
          </dd>
          <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$9630</span>/起
            </div>
          </dd>
        </dl>
      </a>
      <a href="/custom/store?store=21">
        <dl class="product">
          <dt>
            <img
              style="width:335px;height:190px;"
              class="pic_image"
              src="../../assets/imgs/custom/list/20.png"
              alt
            >
            <span class="pic_site">印尼</span>
          </dt>
          <dd class="description">【畅游印尼双岛】巴厘岛+吉利岛</dd>
          <dd class="clearfix">
            <div class="fl" style="line-height:16px;">
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_full.png"
                alt
              >
              <img
                style="width:10px;height:10px;vertical-align:middle;"
                src="../../assets/imgs/custom/list/star_empty.png"
                alt
              >
              <span style="color:#ef9a1a;font-size:14px;position:relative;top: 2.5px;line-height:1px;vertical-align:middle;">4.8</span>
            </div>
            <div class="fr" style="color:#ef9a1a;font-size:16px;line-height:16px;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:14px;">$7800</span>/起
            </div>
          </dd>
        </dl>
      </a>
    </div>
    <div class="btn_container clearfix">
      <a
        target="_blank"
        href="http://p.qiao.baidu.com/cps/chat?siteId=12918104&userId=26301226"
        class="btn_online fl"
        data-ajax="false"
        id="qa-wangqiao-btn"
      >
        <img style="widht:.52rem;height:.52rem;" src="../../assets/imgs/custom/btn1.png" alt>
        在线咨询
      </a>
      <a href="/custom/index" class="btn_custom fl">
        <img style="widht:.48rem;height:.48rem;" src="../../assets/imgs/custom/btn2.png" alt>
        立即定制
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "component_name",
  data() {
    return {
      prodList: [
        {path: '/custom/store1', country: '法国', img: require('../../assets/imgs/custom/list/1.png'), desc: '【巴黎第七章】轻奢9天7晚之旅', price: '$19980'},
        {path: '/custom/store2', country: '希腊', img: require('../../assets/imgs/custom/list/1.png'), desc: '【巴黎第七章】轻奢9天7晚之旅', price: '$19980'},
        {path: '/custom/store3', country: '法国', img: require('../../assets/imgs/custom/list/1.png'), desc: '【巴黎第七章】轻奢9天7晚之旅', price: '$19980'},
        {path: '/custom/store4', country: '法国', img: require('../../assets/imgs/custom/list/1.png'), desc: '【巴黎第七章】轻奢9天7晚之旅', price: '$19980'},
      ]
    };
  },
  methods: {
    goBack() {
      window.history.go(-1);
    }
  }
};
</script>
<style>
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

.clearfix:after{
    content:"";
    display:block;
    clear:both;
    overflow: hidden;
    height:0;
}
.clearfix{
    zoom:1;
    margin:0;
}

</style>