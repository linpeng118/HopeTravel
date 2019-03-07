<template>
  <div>
    <div class="banner">
      <a v-if="!isApp" class="return" @click="goBack" href="javascript:;"></a>
      <span class="title">一城一岛</span>
    </div>
    <div class="ct">
      <h5 class="ct_title">为什么值得去</h5>
      <p class="paragraph">一次出行，两种感受。城市与海岛的完美结合。亲子、蜜月、购物、发呆，所有的感官一次聚合，所有的需求一次满足</p>
      <h5 class="ct_title">行程概览</h5>
      <p class="paragraph">鱼尾狮、哈芝巷、乌节路、牛车水、小印度、夜间动物园、环球影城、民丹岛、滨海湾购物</p>
      <h5 class="ct_title">行程详情</h5>
      <div class="date">
        <div class="day1">
          <h6 class="date_h6">成都双流国际机场集合 / 具体出团时间以出团通知书为准</h6>
          <p class="date_paragraph">晚上，我们将在成都双流国际机场集合。为了不耽误您的行程，请您准时按照出团通知书的时间抵
            <br>达集合地点。办理登机手续，准备起飞。
            <br>
            <br>早餐：自理 午餐：自理 晚餐：飞机上 住宿：飞机上
          </p>
          <div>
            <img class="date-img" src="../../assets/imgs/custom/store5/5.1.png" alt>
          </div>
        </div>
        <div class="day2">
          <h6 class="date_h6">成都双流国际机场 – 新加坡</h6>
          <p class="date_paragraph">
            清晨，我们将抵达新加坡樟宜国际机场。飞行时间大约为5小时，新加坡与中国同在东八区，没有
            时差。我们的司机将在机场，接您和同伴，前往酒店。（视房态情况，酒店为您提前办理入住手续）来一份新加坡早餐吧。您可以在樟宜机场内用餐，也可以在市区来一碗儷芳粥品，这家粥铺给人最深刻的印象是粥的糯滑米粒富有弹性，你还可以选择配粥的菜品，有菜，鸡肉，鱼，鲑鱼片等等。粥店上午7点开始营业。早餐后，推荐先来到滨海湾鱼尾狮。作为新加坡地标性景点，不得不来打卡留恋。随后，可以来到不远处的景观摩天轮，乘坐摩天轮攀上最高 165 米之巅，让人顿时有种 “会当凌
            绝顶，一览众山小” 之感。午餐，美食推荐—结霜桥叻沙。叻沙是新加坡的一道特色菜肴，主要材料有米粉、豆芽菜、蛤蜊，再加上当地的特制调料，一口下去，最先滑过舌尖的是淡淡的椰浆味。随后还有浓浓的香味和辣椒的刺激充满你的味觉。（注意哦：每月第一周和第三周的周三店家休息）。下午，来到最具人气的哈芝巷。哈芝巷位于小印度地区，这里有很多特色小店。出售服饰，精品，咖啡，独立设计师作品等，受到无数文艺青年喜爱。即使对购物不感兴趣，点杯咖啡，拍拍照片，也是不错的选择。下午茶，甜品推荐—阿秋甜品。特色甜品：榴莲杨枝甘露、木瓜鲜奶雪蛤、芦荟草莓。（下午2点可正常办理入住手续，您也可以自由安排时间，在酒店休息。）晚餐，美食推荐—大华猪肉粿条面（米其林一星）。仅售三款美食：粿条汤，肉脞面，肉丸汤。（注意哦：每月的第一个和第三个星期一店家休息）
            <br>
            <br>早餐：自理 午餐：自理 晚餐：自理 住宿：新加坡香格里拉酒店
          </p>
          <div>
            <img class="date-img" src="../../assets/imgs/custom/store5/5.2.png" alt>
            <img class="date-img" src="../../assets/imgs/custom/store5/5.3.png" alt>
            <img class="date-img" src="../../assets/imgs/custom/store5/5.4.png" alt>
          </div>
        </div>
        <div class="day3">
          <h6 class="date_h6">新加坡</h6>
          <p
            class="date_paragraph"
          >早餐，在酒店享用。用完早餐后，您可步行大约8分钟来到乌节路购物中心自由活动。随后，来到牛车水（中国城）。狭窄的店前五脚基、昏暗的小巷和街头小贩喧闹的叫卖声依然保留了牛车水的历史风貌。牛车水的历史痕迹随处可见，而现代化景观也紧紧相随。家族经营的金店、药铺和茶馆忙碌着招揽生意，与相邻的新潮酒吧和时尚生活店和谐相依并存。午餐，美食推荐—香港油鸡饭面（米其林一星）。推荐菜单：油鸡 , 叉烧饭 , 烧肉饭 ,油鸡饭 , 油鸡叉烧饭。午饭后，可推荐在小印度地区观光。小印度是新加坡最具活力的地区之一。沿着实龙岗路和周边的几条街道前行，欣赏兴都庙、华人寺庙、回教堂和基督教堂和谐并存的特色。南印度素食、北印度唐杜里烧烤美食、印度煎饼和拉茶等本地美食必将令您胃口大开。欣赏烹茶高手如何拉制热奶茶，堪称一种奇妙无比的表演技术。晚餐，美食推荐—黄亚细肉骨茶餐室。黄亚细肉骨茶餐室开在新加坡的仰光路。名气足够大，泰国前总理还曾专程到此觅食，连口味刁钻的美食家蔡澜也对它赞美有加。招牌的肉骨茶，地道的潮州风味，排骨汤很清，只加了大蒜、酱油、桂皮和沙捞越胡椒，不同于福建派的浓汤。夜晚，特别推荐—夜间动物园。1994 年开业的夜间野生动物园毗邻新加坡动物园Singapore Zoo，是全球首个展示夜间动物的野生动物园。但是，夜间动物园更像是个野生动物游乐园。130多个品种的 2500 多只动物，在夜间，带给您不一样的体验。
            <br>
            <br>早餐：酒店含早 午餐：自理 晚餐：自理 住宿：新加坡香格里拉酒店
          </p>
          <div>
            <img class="date-img" src="../../assets/imgs/custom/store5/5.5.png" alt>
            <img class="date-img" src="../../assets/imgs/custom/store5/5.6.png" alt>
          </div>
        </div>
        <div class="day4">
          <h6 class="date_h6">新加坡（环球影城）</h6>
          <p
            class="date_paragraph"
          >早餐，在酒店享用。用完早餐后，我们将前往圣淘沙环球影城，开心游玩一整天。新加坡环球影城设有七个电影主题区，每个主题区的设计都别具一格。您将在“好莱坞”区发现著名的好莱坞星光大道，当您进入“纽约”区时，迷人的城市天际线尽在眼前，包括地铁入口的实体模型。您还能进入电影场景，体验飓风的破坏力，感受史蒂文·斯皮尔伯格 (Steven Spielberg) 电影中的特效。
            <br>
            <br>早餐：酒店含早 午餐：自理 晚餐：自理 住宿：新加坡香格里拉酒店
          </p>
          <div>
            <img class="date-img" src="../../assets/imgs/custom/store5/5.7.png" alt>
            <img class="date-img2" src="../../assets/imgs/custom/store5/5.8.png" alt>
            <img class="date-img2" src="../../assets/imgs/custom/store5/5.9.png" alt>
          </div>
        </div>
        <div class="day5">
          <h6 class="date_h6">民丹岛</h6>
          <p
            class="date_paragraph"
          >早餐，在酒店享用。用完早餐后，我们将前往民丹岛。民丹岛是印度尼西亚的岛屿之一。离新加坡很近，乘搭渡轮只需45分钟左右。因为地理位置接近赤道，民丹岛终年阳光普照，年平均温在26度左右。海水清澈蔚蓝，沙滩白净，海洋生态则相当富。
            <br>
            <br>早餐：酒店含早 午餐：自理 晚餐：自理 住宿：民丹岛悦椿酒店
          </p>
          <div>
            <img class="date-img" src="../../assets/imgs/custom/store5/5.10.png" alt>
            <img class="date-img" src="../../assets/imgs/custom/store5/5.11.png" alt>
            <img class="date-img" src="../../assets/imgs/custom/store5/5.12.png" alt>
          </div>
        </div>
        <div class="day6">
          <h6 class="date_h6">民丹岛</h6>
          <p
            class="date_paragraph"
          >早餐，在酒店享用。用完早餐后，民丹岛自由活动。民丹岛是印度尼西亚的岛屿之一。离新加坡很近，乘搭渡轮只需45分钟。因为地理位置接近赤道，民丹岛终年阳光普照，年平均温在26度左右。海水清澈蔚蓝，沙滩白净，海洋生态则相当丰富。
            <br>
            <br>早餐：酒店含早 午餐：自理 晚餐：自理 住宿：民丹岛悦椿酒店
          </p>
        </div>
        <div class="day7">
          <h6 class="date_h6">新加坡 – 成都</h6>
          <p
            class="date_paragraph"
          >早餐，在酒店享用。用完早餐后，我们将乘坐渡轮返回新加坡。 午餐，美食推荐—文东记海南鸡饭。一家很受当地人推崇的海南鸡饭店，据说刘德华每次到新加坡必会去吃文东记 的海南鸡饭。鸡肉滑嫩多汁，鸡皮也很 Q，饭粒呈金黄色，充满了鸡的香味，蘸上浓稠的黑酱油和店里特质的辣椒 酱，更显美味。再配上一碗清鸡汤，就是很满足的一顿。 下午，自由安排。 购物推荐—滨海湾金沙购物商城（有逾 170 个奢华品及高端品牌旗舰店、复式商铺或三层商铺。知名品牌如 Bottega Veneta、Chaumet、Parmigiani、Fleurier 和 Roger Dubuis 专为这里的商铺特别设计了限量版商品。）、 怡丰城（怡丰 城最大的特色就是商品种类包罗万有，选择面向多而广，全家男女老幼都可找到符合需求的商铺。）。 晚上，我们的司机将送您前往机场。 参考航班时间：新加坡-成都 SQ5138 17:45-22:10
            <br>
            <br>早餐：酒店含早 午餐：自理 晚餐：自理 住宿：飞机上
          </p>
          <div>
            <img class="date-img" src="../../assets/imgs/custom/store5/5.13.png" alt>
            <img class="date-img3" src="../../assets/imgs/custom/store5/5.14.png" alt>
            <img class="date-img3" src="../../assets/imgs/custom/store5/5.15.png" alt>
            <img class="date-img3" src="../../assets/imgs/custom/store5/5.16.png" alt>
            <img class="date-img3" src="../../assets/imgs/custom/store5/5.17.png" alt>
          </div>
        </div>
      </div>
      <p class="date_paragraph">注：以上行程中所列仅为参考时间，在不减少行程景点的前提下，公司有权对上述行程的次序、景点，依照当地情况进行调整！</p>
      <h5 class="ct_title" style="margin-top: 0.3rem;">酒店信息</h5>
      <h6 class="ct_subTitle">新加坡香格里拉酒店 / Shangri-La Hotel Singapore</h6>
      <p
        class="paragraph"
      >新加坡香格里拉大酒店坐落在占地15英亩的热带花园中，距离喧嚣的乌节路仅有7分钟的路程。米其林星级的香宫餐厅（Shang Palace）供应粤菜。The Line和NAMI Restaurant and Bar餐厅和酒吧分别供应国际美食和日式料理。Waterfall Ristorante Italiano意大利你厅小酌一杯，还可以在香格里拉ShopHouse西饼屋享用手工糕点。
        <br>花园翼城市景观房
      </p>
      <div style="text-align: center">
        <img class="date-img" src="../../assets/imgs/custom/store5/5.18.png" alt>
        <img class="date-img3" src="../../assets/imgs/custom/store5/5.19.png" alt>
        <img class="date-img3" src="../../assets/imgs/custom/store5/5.20.png" alt>
      </div>

      <h6 class="ct_subTitle">民丹岛悦椿度假村 / Angsana Bintan</h6>
      <p
        class="paragraph"
      >民丹岛悦椿度假村静静地依偎在印度尼西亚民丹岛西北角上僻静的丹戎塞得海湾怀抱中，美丽的海湾，婆娑的椰树、辽阔的大海和古老的远山丛林。在她那充满神秘魅力的自然环境中为您营造一种逍遥自在的休闲生活，将给予您在时尚度假胜地享受轻松假期的百分百承诺。
        <br>清凉岛屿房
      </p>
      <div style="text-align: center">
        <img class="date-img" src="../../assets/imgs/custom/store5/5.21.png" alt>
        <img class="date-img3" src="../../assets/imgs/custom/store5/5.22.png" alt>
        <img class="date-img3" src="../../assets/imgs/custom/store5/5.23.png" alt>
      </div>

      <h5 class="ct_title">费用包含</h5>
      <p class="paragraph" style="border-bottom:none;">1. 成都往返新加坡经济舱机票含税；
        <br>2. 3晚新加坡香格里拉酒店住宿；
        <br>3. 2晚民丹岛悦椿度假村住宿；
        <br>4. 每日早餐；
        <br>5. 境外全程接送机服务；
        <br>6. 新加坡段司导服务；
        <br>7. 新加坡酒店往返环球影城接送服务；
        <br>8. 新加坡酒店往返民丹岛码头车船接送；
        <br>9. 摩天轮门票、夜间动物园门票、环球影城门票、环球影城快速通道票。
        <br>
      </p>
      <h5 class="ct_title">费用不含</h5>
      <p class="paragraph" style="border-bottom:none;">1. 护照费用及公证认证费用；
        <br>2. 酒店内电话、传真、洗熨、收费电视、饮料等费用；
        <br>3. 费用包含中未提到的其他一切费用；
        <br>4. 洗衣，理发，电话，饮料，烟酒，付费电视，行李搬运等私人费用；
        <br>5. 签证相关费用；
        <br>6. 旅游费用不包括旅游者因违约、自身过错、自由活动期间内行为或自身疾病引起的人身和财产损失。
        <br>7. 单房差。
      </p>
    </div>
    <div class="btn_container clearfix">
      <a target="_blank" @click="toList2()" class="btn_online fl" id="qa-wangqiao-btn" >
        <img style="widht:.52rem;height:.52rem;" src="../../assets/imgs/custom/btn1.png" alt="">
        在线咨询
      </a>
      <a @click="showform=true" class="btn_custom fl">
        <img style="widht:.48rem;height:.48rem;" src="../../assets/imgs/custom/btn2.png" alt="">
        立即定制
      </a>
    </div>
    <van-popup v-model="showcall" style="background-color: rgba(0,0,0,0)" position="center" :overlay="true">
      <div class="connectbox">
        <p class="titlex ">联系我们</p>

        <a class="con-btn  " @click="toList2()">在线咨询</a>
      </div>
    </van-popup>
    <van-popup v-model="showform" style="background-color: rgba(0,0,0,0)" position="center" :overlay="true">
      <div class="banner2 ">
        <div class="form-wrap">
          <span class="banner-title">私人定制</span>
          <span class="banner-desc">旅游自由随心，体验独一无二</span>
          <div class="form">
            <!-- 地点 -->
            <div class="form-input">
              <div class="left-icon icon-addr"></div>
              <van-cell-group class="transparent-input tours-input-no-bg">
                <van-field v-model="address1"
                           style="border-bottom: 1px solid #C9C9C9;color:#000"
                           placeholder="请填写您想去的目的地或景点" />
              </van-cell-group>

            </div>
            <!-- 手机号码 -->
            <div class="form-input phone">
              <div class="left-icon icon-phone"></div>
              <van-cell-group class="transparent-input tours-input-no-bg">
                <van-field v-model="phone1" style="border-bottom: 1px solid #C9C9C9;color: #000"
                           placeholder="请填写您的电话号码" />
              </van-cell-group>
              <div class="right ">*</div>
            </div>
            <!-- 微信 -->
            <div class="form-input wechat">
              <div class="left-icon icon-wx"></div>
              <van-cell-group class="transparent-input tours-input-no-bg">
                <van-field v-model="wechat1" style="border-bottom: 1px solid #C9C9C9;color: #000"
                           placeholder="请填写您的微信号码" />
              </van-cell-group>
              <div class="right ">*</div>
            </div>
            <!-- 定制按钮 -->
            <van-button class=" tours-button-no-bg btn-custom "
                        size="large"
                        :loading="submiting"
                        @click="onCustom()">开始定制</van-button>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
  import {custom} from "@/api/custom";
  export default {
    name: "component_name",
    data() {
      return {
        isApp: this.$route.query.platform,
        showcall:false,
        address1:"",
        phone1:'',
        wechat1:'',
        submiting: false,
        showform:false,

      };
    },
    methods: {
      goBack() {
        window.history.go(-1);
      },
      clickcall(x){
        // this.showcall=false;
        window.location.href='tel://'+x;
      },
      // 查看全部list
      toList2() {
        window.location.href = 'http://p.qiao.baidu.com/cps/chat?siteId=12918104&userId=26301226'
      },
      onCustom() {
        if (!this.address1) {
          this.$toast("请输入想去的地址或景点");
          this.submiting = false;
          return;
        }
        if (!this.phone1 && !this.wechat1) {
          this.$toast("请输入电话号码或者微信号码至少一个");
          this.submiting = false;
          return;
        }
        this.doCustom({
          destination: this.address1,
          phone: this.phone1,
          wechat: this.wechat1,
        });
      },
      // 提交定制
      async doCustom(subData) {
        this.submiting = true;
        let {code, data, msg} = await custom(subData);
        this.$toast(msg);
        this.submiting = false;
        this.showform = false;
        this.address1='';
        this.phone1='';
        this.wechat1='';
      },

    }
  };
</script>

<style lang="scss" scoped>
@import "../../assets/style/custom/index";

.banner {
  background: url("../../assets/imgs/custom/store5/5.0.png") no-repeat center
    center/750px 438px;
  width: 750px;
  height: 438px;
  position: relative;
}
.connectbox{
  width:586px;
  background-color: #fff;
  border-radius:20px;
  box-shadow:0px 0px 20px rgba(0,0,0,0.16);
  text-align: center;
  padding-bottom: 40px;
  .titlex{
    border-radius:20px 20px 0 0;
    background-color:#ef9a1a;
    height:80px;
    width: 100%;
    line-height: 80px;
    font-size: 32px;
    text-align: center;
    color: #fff;
    display: block;
  }
  .con-btn{
    display: block;
    border: 2px solid #ef9a1a;
    color:#ef9a1a;
    width:410px;
    height:80px;
    border-radius:20px;
    line-height: 72px;
    text-align: center;
    font-size: 32px;
    margin-top: 40px;
    margin-left: 88px;
  }

}
.banner2 {
  padding: 160px 32px 0;
  height: 924px;
  position: relative;
  .bannerbox{
    position: absolute;
    width: 100%;
    z-index: 10;
    height: 858px;
    float: left;
    margin-top:-120px;
    margin-left: -32px;
    opacity: 0.3;
    background-color: #000;
  }
  .bannerbox2{
    z-index: 10;
    margin-top:-120px;
    position: absolute;
    margin-left: -32px;
    width: 100%;
    height: 858px;
    float: left;
  }
  .form-wrap {
    z-index: 30;
    position: relative;
    margin-top: 30px;
    padding: 20px 32px;
    width: 686px;
    height: 656px;
    background: rgba(255, 255, 255, 0.87);
    border-radius: 12px;
    .banner-title {
      display: block;
      height: 74px;
      line-height: 74px;
      font-size: 46px;
      font-weight: 100;
      color: rgba(0, 0, 0, 1);
      text-stroke: 1 rgba(255, 255, 255, 1);
      position: relative;

    }
    .banner-desc {
      display: block;
      height: 40px;
      line-height: 40px;
      font-size: 28px;
      font-weight: 300;
      color: rgba(0, 0, 0, 1);
    }
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
        border-radius: 22px;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-content: center;
        .left-icon {
          width: 74px;
          position: relative;
          &.icon-addr {
            background: url("../../assets/imgs/newcustom/910@2x.png") no-repeat
            center center/40px 50px;
          }
          &.icon-phone {
            background: url("../../assets/imgs/newcustom/911@2x.png") no-repeat
            center center/40px 44px;
          }
          &.icon-wx {
            background: url("../../assets/imgs/newcustom/863@2x.png") no-repeat
            center center/45px 36px;
          }
          &::after {
            content: "";
            display: inline-block;
            position: absolute;
            right: 0;
            width: 2px;
            background: #d6d6d6;
          }
        }
        .transparent-input {
          flex: 1;
          color:#000;
          input{
            font-size: 30px;
          }
        }
        .right {
          flex: 0 0 30px;
          height: 28px;
          color: #ef9a1a;
          align-self: center;
          line-height: 100%;
          font-size: 28px;
        }
      }
      .phone,
      .wechat {
        margin-top: 24px;
      }
      .btn-custom {
        margin-top: 62px;
        background-color: #ef9a1a;
        color: #fff;
        border: none;
      }
    }
  }
}
</style>
