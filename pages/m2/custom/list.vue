<template>
  <div>
    <div class="banner">
      <a class="return"
        @click="back()"
        href="javascript:;"></a>
      <span class="title">旅行故事</span>
      <span class="recommend">稀饭推荐·旅行正当季</span>
    </div>
    <div class="ct"
      id="ct">
      <!-- 产品 -->
      <router-link id="store1"
        :to="{path:'/custom/store',query:{'store':'1'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/1.png"
              alt="">
            <span class="pic_site">法国</span>
          </dt>
          <dd class="description">
            【巴黎第七章】轻奢9天7晚之旅
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">$19980</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <!-- 产品 -->
      <router-link id="store2"
        :to="{path:'/custom/store',query:{'store':'2'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/2.png"
              alt="">
            <span class="pic_site">希腊</span>
          </dt>
          <dd class="description">
            【爱琴.地中海】豪华游艇出海/特色海鲜大餐/浮潜/海
            钓/最美悬崖步道/浪漫地中海日落/梵蒂冈博物馆/圣...
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.7</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥22800</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <!-- 产品 -->
      <router-link id="store3"
        :to="{path:'/custom/store',query:{'store':'3'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/3.png"
              alt="">
            <span class="pic_site">印尼</span>
          </dt>
          <dd class="description">
            【全球热恋】巴厘岛+科莫多
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥15600</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <!-- 产品 -->
      <router-link id="store4"
        :to="{path:'/custom/store',query:{'store':'4'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/4.png"
              alt="">
            <span class="pic_site">泰国</span>
          </dt>
          <dd class="description">
            【快乐活】苏梅岛+涛岛
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥6380</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <router-link id="store5"
        :to="{path:'/custom/store',query:{'store':'5'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/5.png"
              alt="">
            <span class="pic_site">新加坡 </span>
          </dt>
          <dd class="description">
            【一城一岛】新加坡+民丹岛
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥13800</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <router-link id="store6"
        :to="{path:'/custom/store',query:{'store':'6'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/6.png"
              alt="">
            <span class="pic_site">东京&关西</span>
          </dt>
          <dd class="description">
            【花开异国】<东京+关西> 7天6晚
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥13800</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <router-link id="store7"
        :to="{path:'/custom/store',query:{'store':'7'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/77.png"
              alt="">
            <span class="pic_site">东京&关西</span>
          </dt>
          <dd class="description">
            【富士山下】<东京.关西> 7天6晚【日本美食之旅】<东京+富士山> 7天5晚
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥12600</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <router-link id="store8"
        :to="{path:'/custom/store',query:{'store':'8'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/7.png"
              alt="">
            <span class="pic_site">东京&富士山</span>
          </dt>
          <dd class="description">
            【日本美食之旅】<东京+富士山> 7天5晚
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥12800</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <router-link id="store9"
        :to="{path:'/custom/store',query:{'store':'9'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/8.png"
              alt="">
            <span class="pic_site">新西兰</span>
          </dt>
          <dd class="description">
            【臻品新西兰】南北双岛11日自驾游
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥16800</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <router-link id="store10"
        :to="{path:'/custom/store',query:{'store':'10'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/9.png"
              alt="">
            <span class="pic_site">新西兰</span>
          </dt>
          <dd class="description">
            【臻品新西兰】南岛10日自驾游
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥13800</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <router-link id="store11"
        :to="{path:'/custom/store',query:{'store':'11'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/10.png"
              alt="">
            <span class="pic_site">新西兰</span>
          </dt>
          <dd class="description">
            【臻品新西兰】南岛12日自驾游
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥17800</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <router-link id="store12"
        :to="{path:'/custom/store',query:{'store':'12'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/11.png"
              alt="">
            <span class="pic_site">美国</span>
          </dt>
          <dd class="description">
            黄石大提顿国家公园+洛杉矶8天6晚私家小团
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥11500</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <router-link id="store13"
        :to="{path:'/custom/store',query:{'store':'13'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/12.png"
              alt="">
            <span class="pic_site">美国</span>
          </dt>
          <dd class="description">
            加州一号公路+锡安国家公园+羚羊彩穴发现自驾14 日
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥16800</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <router-link id="store14"
        :to="{path:'/custom/store',query:{'store':'14'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/13.png"
              alt="">
            <span class="pic_site">美国</span>
          </dt>
          <dd class="description">
            加州一号公路+圣地亚哥经典自驾之旅10 日
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥12800</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <router-link id="store15"
        :to="{path:'/custom/store',query:{'store':'15'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/14.png"
              alt="">
            <span class="pic_site">美国</span>
          </dt>
          <dd class="description">
            美西国家公园大环线全景自驾14 日
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥16500</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <router-link id="store16"
        :to="{path:'/custom/store',query:{'store':'16'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/15.png"
              alt="">
            <span class="pic_site">美国</span>
          </dt>
          <dd class="description">
            美西三城+双国家公园+加州一号公路精彩自驾9天7晚
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥18900</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <router-link id="store17"
        :to="{path:'/custom/store',query:{'store':'17'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/16.png"
              alt="">
            <span class="pic_site">澳大利亚</span>
          </dt>
          <dd class="description">
            太平洋海岸自驾之旅13天10晚
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥18900</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <router-link id="store18"
        :to="{path:'/custom/store',query:{'store':'18'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/17.png"
              alt="">
            <span class="pic_site">印尼</span>
          </dt>
          <dd class="description">
            【童趣巴厘岛】夜游巴厘岛动物园（含晚餐）/阿勇河
            漂流/空中漫步/百度库/香料市场/海神庙
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥9050</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <router-link id="store19"
        :to="{path:'/custom/store',query:{'store':'19'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/18.png"
              alt="">
            <span class="pic_site">泰国</span>
          </dt>
          <dd class="description">
            【童趣巴厘岛】夜游巴厘岛动物园（含晚餐）/阿勇河
            漂流/空中漫步/百度库/香料市场/海神庙
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥9050</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <router-link id="store20"
        :to="{path:'/custom/store',query:{'store':'20'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/19.png"
              alt="">
            <span class="pic_site">泰国</span>
          </dt>
          <dd class="description">
            【网红巴厘岛】森林瀑布/网红秋千/漂浮下午茶/乌布
            皇宫/天空之门/莲花池台/水上皇宫/滑翔伞高空飞...
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥9630</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
      <router-link id="store21"
        :to="{path:'/custom/store',query:{'store':'21'}}">
        <dl class="product">
          <dt>
            <img style="width:6.7rem;height:3.8rem;"
              class="pic_image"
              src="../assets/img/custom/list/20.png"
              alt="">
            <span class="pic_site">印尼</span>
          </dt>
          <dd class="description">
            【畅游印尼双岛】巴厘岛+吉利岛
          </dd>
          <dd class="clearfix">
            <div class="fl">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_full.png"
                alt="">
              <img style="width:.2rem;height:.2rem;"
                src="../assets/img/custom/list/star_empty.png"
                alt="">
              <span style="color:#ef9a1a;font-size:.28rem;position:relative;top: 0.05rem;">4.8</span>
            </div>
            <div class="fr"
              style="color:#ef9a1a;">
              <span style="font-weight:bold;color:#ef9a1a;font-size:.28rem;">￥7800</span>/起
            </div>
          </dd>
        </dl>
      </router-link>
    </div>
    <div class="btn_container clearfix">
      <a class="btn_online fl"
        data-ajax="false"
        id="qa-wangqiao-btn">
        <img style="widht:.52rem;height:.52rem;"
          src="../assets/img/custom/btn1.png"
          alt="">
        在线咨询
      </a>
      <router-link :to="{path:'/custom/index'}"
        class="btn_custom fl">
        <img style="widht:.48rem;height:.48rem;"
          src="../assets/img/custom/btn2.png"
          alt="">
        立即定制
      </router-link>
    </div>
  </div>
</template>

<script>
  import "../assets/style/base.css";
  // import $ from 'jquery';
  export default {
    name: "",
    data() {
      return {

      };
    },
    created() {
      //实例创建钩子
    },
    beforeRouteLeave(to, from, next) {
      if (to.name == 'customstore') {
        var scrollTop = document.documentElement.scrollTop;
        localStorage.setItem('scrollTop', scrollTop)
      }
      next();
    },

    mounted() {
      this.setHeight();
      //首次渲染钩子
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
      //   }, 500)
      // })
    },
    activated() {
      //缓存页面访问钩子
      //debugger
      this.setHeight();
      // this.$store.commit("com_dialogSelect", {
      //   show: false //关闭弹窗
      // });
    },
    methods: {
      back() {
        this.$router.go(-1);//返回上一层
      },
      setHeight() {
        this.$nextTick(() => {
          setTimeout(function () {
            if (localStorage.getItem('scrollTop')) {
              console.log(localStorage.getItem('scrollTop'))
              document.documentElement.scrollTop = parseInt(localStorage.getItem('scrollTop'));
              document.body.scrollTop = parseInt(localStorage.getItem('scrollTop'));
              window.scroll(0, parseInt(localStorage.getItem('scrollTop')))
              localStorage.removeItem('scrollTop')
            }
          }, 100)

        })


      }
    }
  };
</script>


<style scoped>
  body {
    margin: 0;
  }
  body,
  html {
  }
  /* 头部banner */
  .banner {
    background: url("../assets/img/custom/list/banner.png") no-repeat -0.1rem center/7.75rem
      3.75rem;
    width: 100%;
    height: 3.75rem;
    position: relative;
  }
  .return {
    position: absolute;
    top: 0.2rem;
    left: 0rem;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: url("../assets/img/custom/back.png") no-repeat center
      center/0.24rem 0.41rem;
  }
  .title {
    position: absolute;
    top: 0.85rem;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    font: 0.34rem/0.36rem "";
    color: #fff;
  }
  .recommend {
    position: absolute;
    bottom: 0.6rem;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    height: 0.5rem;
    text-align: center;
    font: bold 0.38rem/0.5rem "";
    color: #fff;
  }
  /* 中间内容 */
  .ct {
    width: 100%;
    padding: 0.14rem 0.32rem;
    position: relative;
    padding-bottom: 1.2rem;
    background: #fff;
  }
  .product {
    margin: 0.2rem auto;
    width: 6.7rem;
  }
  .product dt {
    width: 100%;
    position: relative;
  }
  .pic_site {
    position: absolute;
    left: 0.08rem;
    bottom: 0.08rem;
    width: 2.03rem;
    height: 0.5rem;
    padding-left: 0.45rem;
    font: 0.24rem/0.5rem "";
    color: #fff;
    box-sizing: border-box;
    background: #000 url("../assets/img/custom/list/pic_site.png") no-repeat
      0.1rem 0.12rem/0.3rem 0.3rem;
    opacity: 0.7;
    border-radius: 5px;
  }
  .description {
    font: 0.26rem/0.38rem "";
    color: #000;
    height: 0.74rem;
    margin: 0.13rem 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  /* 底部定位按钮 */
  .btn_container {
    width: 100%;
    height: 1rem;
    position: fixed;
    bottom: 0;
    background: #fff;
  }
  .btn_container a {
    width: 3.75rem;
    display: inline-block;
    height: 1rem;
    box-sizing: border-box;
    text-align: center;
  }
  .btn_online {
    color: #5e5e5e !important;
    background: rgb(243, 243, 243);
    font: 0.32rem/1rem "";
  }
  .btn_custom {
    background: #ef9a1a;
    color: #fff !important;
    font: 0.32rem/1rem "";
  }
  .btn_custom img,
  .btn_online img {
    vertical-align: middle !important;
  }
</style>