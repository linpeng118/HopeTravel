<template>
  <div>
    <div class="banner">
      <a v-if="!isApp" class="return" @click="goBack" href="javascript:;"></a>
      <span v-if="!isApp" class="title">旅行故事</span>
      <span class="site">目的地：欧洲</span>
    </div>
    <div class="ct">
      <h5 class="ct_h5">一路向北 · 退役空姐的欧洲之旅</h5>
      <p class="paragraph">
        <strong>第一站：神秘的阿拉伯国家——阿联酋·迪拜</strong>
        心仪的地方很多，不过选择中东作为这次出行的第一站，是因为从中东转机去往欧洲会非常方便，缩短了从大陆直飞欧洲的
        时间，很符合我想要慢下来的节奏。
      </p>
      <div>
        <img
          style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
          src="../../assets/imgs/custom/story1/1@2x.png"
          alt
        >
      </div>
      <p class="paragraph">
        下了飞机，开车前往预定好的酒店Bab Al Shams Desert Resort & Spa（巴卜阿尔沙姆斯沙漠度假村），大部分人一想到迪
        拜酒店，立刻连接到七星级的帆船酒店或者是建于海底的亚特兰蒂斯酒店，足够奢华，但却少了些许迪拜应有的异域特色。
        而mark帮我选的这家度假酒店，传统的阿拉伯风格建筑坐落于沙漠之中，庭院内郁郁葱葱的花园，尤其是伴随着落日的余
        晖，格外美丽。
      </p>
      <div>
        <img
          style="width:6.68rem;height:3.64rem;margin-top:.2rem;"
          src="../../assets/imgs/custom/story1/2@2x.png"
          alt
        >
      </div>
      <p
        class="paragraph"
      >日本的感觉和国内真的对比特别明显，感觉所有的人都在尽力保证不去做一些打扰到别人的举动，尤其是搭乘公共交通的时候，打电话是极其不礼貌的举动，所以我都有默默把手机调整成静音。</p>
      <p class="paragraph">路上熙熙攘攘的上班族，超级干净的马路，配上现代化的建筑，彬彬有礼的服务体验，让你瞬间融入这种环境。</p>
      <div>
        <img
          style="width:100%;margin-top:.2rem;"
          src="../../assets/imgs/custom/story1/3@2x.png"
          alt
        >
      </div>
      <p class="paragraph">
        逃离城市，来到酒店躲进这个充满阿拉伯气息的“隐世之地”，酒店清幽的风拂过面庞，扫去沙漠中的热气，整个人都放松下
        来。
        <br>天色渐渐暗了，灯火若隐若现，躺在沙发上抬着头看着天空，有一种陌生又熟悉的感觉，可能是太多次的俯看大地，都快忘
        记抬头仰视这片纯净的星空了。
        <br>

        <strong>迪拜是一般沙漠一半海水的地方。</strong>
        清晨的沙漠，划过脚背的沙子还有些凉爽，远处的起起伏伏望不到尽头，逐渐与天空贴在一起。
      </p>
      <div>
        <img
          style="width:100%;margin-top:.2rem;"
          src="../../assets/imgs/custom/story1/4@2x.png"
          alt
        >
      </div>
      <p class="paragraph">
        迪拜德拉鱼市场
        <br>繁华的迪拜是世界的迪拜，与我而言，更愿意追寻真实的迪拜生活。迪拜德拉鱼市场是迪拜很有魅力的文化遗产之一，也是
        我想要记录的回忆之一，据说这个市场要从每天的清晨一直忙碌到深夜，可以说是迪拜最大也是最繁忙的鱼类市场了呢！
        各类新鲜的鱼和蔬菜犹如彩色的万花筒一般有序的成列在喧嚣的市场里。卖鱼的摊主真的非常臭美，又特别喜欢拉人合照，
        熙熙攘攘的市场里，伴随着灵动的各类海鲜、摊主热情的推销，这儿是我见过最有活力的市场，也是最有趣的市场。
      </p>
      <div>
        <img
          style="width:100%;margin-top:.2rem;"
          src="../../assets/imgs/custom/story1/5@2x.png"
          alt
        >
      </div>
      <p class="paragraph">
        迪拜运河
        <br>河水非常清澈的迪拜运河，随处都有海鸥在飞，小船摇摇荡荡就是一圈。河岸两侧分别是新兴的Bur Dubai和象征着迪拜历史
        的旧城区Deira。
        <br>这条河水可以说是迪拜的“母亲河”，迪拜酋长谢赫穆罕默德曾说：“迪拜河塑造了迪拜，成为其经年以来生存、发展和蜕变的
        源泉，它是迪拜的心脏和灵魂。”运河缓缓的流淌，日光铺满两边的建筑，仿佛感受着迪拜的历史脉搏。
      </p>
      <div>
        <img
          style="width:100%;margin-top:.2rem;"
          src="../../assets/imgs/custom/story1/p6@2x.png"
          alt
        >
      </div>
      <p class="paragraph">
        <strong>第二站：迷幻的派对天堂——西班牙·ibiza</strong>
        西班牙是个很神奇的国度，总会让你来了又想来。这次西班牙之行被种草Ibiza小岛，一直听闻这是一个很美的岛屿，全球最
        浪的岛屿，因为这里有着7*24小时的派对，很像我的管家Mark基本上7*24小时的一直守护我的行程。
      </p>
      <div>
        <img
          style="width:100%;margin-top:.2rem;"
          src="../../assets/imgs/custom/story1/p7@2x.png"
          alt
        >
      </div>
      <p class="paragraph">
        Ibiza岛的老城区，保留着西方独有的风情，整个古城都是石砖路和暖黄色的城墙，就好像豆腐块状一样，似乎能够让你触摸
        到它往日的辉煌。如今老城里的房间大多已多是商用，聚集了工艺品店、画廊、珠宝店、服装店、咖啡屋等等，抬头看得见
        阳台种植的小花，特色的店面，独具一格的手工艺品，让老城散发出更迷人的艺术气息，非常值得一逛！
      </p>
      <div>
        <img
          style="width:100%;margin-top:.2rem;"
          src="../../assets/imgs/custom/story1/p8@2x.png"
          alt
        >
      </div>
      <p class="paragraph">
        而这座迷人的老城，也是电音爱好者的圣地。热情洋溢的西班牙永远不缺欢声笑语，而我也相信爱笑的女孩运气一定不会
        差，这里或许缺少繁华和先进，但是这儿满满溢出来的幸福感超越了全世界！
      </p>
      <div>
        <img
          style="width:100%;margin-top:.2rem;"
          src="../../assets/imgs/custom/story1/p9@2x.png"
          alt
        >
      </div>
      <p
        class="paragraph"
      >Ibiza小岛不大，却让我遇见了很多有趣的小伙伴，四处走走，全是颜值爆表身材火辣的帅哥美女，在这儿我只想用力的去享受这种自由的感觉，在这样的海边，尽情的听音乐喝酒，尽情的放纵，什么不去想！</p>
      <div>
        <img
          style="width:100%;margin-top:.2rem;"
          src="../../assets/imgs/custom/story1/p10@2x.png"
          alt
        >
      </div>
      <p
        class="paragraph"
      >这个小岛拥有着西班牙人独有的性感狂野，却也清新质朴的让人沉迷。被种草是因为派对王国，被圈粉却也是因为这是一座生机勃勃的古老城市。这样的反差感，让我为之迷恋</p>
      <div>
        <img
          style="width:100%;margin-top:.2rem;"
          src="../../assets/imgs/custom/story1/p11@2x.png"
          alt
        >
      </div>
      <p class="paragraph">
        <strong>第三站：浪漫的法兰西——法国·巴黎</strong>
        作为法兰西的心脏和灵魂，巴黎是一座浪漫的城市。塞纳河从城中流过，流过左岸的雅致流过右岸的繁华，徜徉在卢浮宫徘
        徊在凡尔赛，你会有一千种喜欢巴黎的理由。
        <br>海明威说：“如果你年轻时有幸停留巴黎，那么你的余生无论去往哪里，巴黎永远会与你在一起，因为它是一席流动的盛宴”
      </p>
      <div>
        <img
          style="width:100%;margin-top:.2rem;"
          src="../../assets/imgs/custom/story1/p12@2x.png"
          alt
        >
      </div>
      <p class="paragraph">第三站：浪漫的法兰西——法国·巴黎
        <br>老爷车观光之旅
        <br>这一次来巴黎，大部分的时间，想要亲自触碰这个优雅又悠久的城市。我想，没有什么能够比乘坐一款灵活的老爷车穿梭在巴黎的街道，身旁还有一位幽默风趣又绅士的司机小哥，更能体会法国的浪漫风情了。
      </p>
      <div>
        <img
          style="width:100%;margin-top:.2rem;"
          src="../../assets/imgs/custom/story1/p13@2x.png"
          alt
        >
      </div>
      <p class="paragraph">
        这是一个慢节奏的城市，最适合漫步街头，看着人们在铁塔下亲吻，在塞纳河畔消磨午后，在每一个街角相遇，在每一个路
        口你侬我侬。你可以在香榭丽舍大街随意找一家咖啡店，点上一杯咖啡配一块少女心爆棚的马卡龙，阳光洒在复古的建筑
        上，扑面而来的人文气息，这便是巴黎。
      </p>
      <p class="paragraph">
        <strong>第四站——荷兰·阿姆斯特丹</strong>
        旅行就被这样的慢节奏感动了，可能是之前的工作的缘故，每天都特别忙碌，根本没有办法停下里好好的看看这个世界的风
        景。
        <br>在阿姆斯特丹的几天，我感觉这个城市没有什么非常特别的景点，但是哪里都很美，都想要记录下来，复古的欧洲建筑，闲
        逛几步就能看见的运河，很美。于是拿起了相机，印象和记忆交织，最后落于一张张照片，成为我眼中的阿姆斯特丹。
      </p>
      <div>
        <img
          style="width:100%;margin-top:.2rem;"
          src="../../assets/imgs/custom/story1/p14@2x.png"
          alt
        >
      </div>
      <p
        class="paragraph"
      >这一路，走的路线完全随了我的心愿，去的地方吃到的美食看到的风景都是独属于我的旅行，未曾想过会遇见这么多美好的事物，遇见一路上可爱有趣的小伙伴，遇见了更好的自己，我想这一切都从遇见稀饭旅行开始。
        <br>旅行真的是人生中最美好的事情，没有之一。
      </p>
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
      <a href="/custom" class="btn_custom fl">
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
      isApp: this.$route.query.platform,
    };
  },
  methods:{
      goBack(){
          window.history.go(-1); 
      }
  }
};
</script>
<style>
body {
  margin: 0;
  color: #404040;
}
.ct img {
  width: 100% !important;
  height: auto !important;
}
.banner {
  background: url("../../assets/imgs/custom/story1/banner.png") no-repeat center
    center/750px 708px;
  width: 750pxm;
  height: 708px;
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
.site {
  position: absolute;
  bottom: 23px;
  left: 30px;
  display: inline-block;
  width: 202px;
  height: 50px;
  background: #fff;
  opacity: 0.8;
  border-radius: 5px;
  text-align: center;
  font: 30px/50px "";
  color: #000;
}
.ct {
  padding: 14px 32px;
  position: relative;
  padding-bottom: 120px;
  background: #fff;
}
.ct_h5 {
  font: 36px/46px "";
  color: #356371;
}
.paragraph {
  font: 26px/40px "";
  color: #484848;
  margin: 10px 0;
  text-align: justify;
  margin: 20px 0;
}
.btn_container {
  width: 750px;
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
strong {
  color: #000;
  font-size: 28px;
  margin: 20px 0 10px;
  display: block;
}
</style>