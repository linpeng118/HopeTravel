<template>
  <div>
    <div class="banner">
      <a v-if="!isApp" class="return" @click="goBack" href="javascript:;"></a>
      <span class="title" style="line-height:.8rem;text-align:center;">日本美食之旅</span>
    </div>
    <div class="ct">
      <h5 class="ct_title">为什么值得去</h5>
      <p class="paragraph">如果你喜欢日本美食，一定听过“寿司之神”“天妇罗之神”“鳗鱼之神”这将会是一场吃货的朝圣之旅，精致的小团行程。</p>
      <h5 class="ct_title">行程概览</h5>
      <!-- <p class="paragraph">
            巴厘岛、科莫多国家公园、粉色沙滩、科莫多龙、浮潜
        </p>
        <h5 class="ct_title">
            行程详情
      </h5>-->
      <div class="date">
        <div class="day1">
          <h6 class="date_h6">成都 – 东京</h6>
          <p
            class="date_paragraph"
          >上午，前往成都双流国际机场。为了不耽误您的行程，请您准时按照出团通知书的时间抵达集合地点。办理登机手 续，准备起飞。参考航空为四川航空。 参考航班时间：成都-东京 3U8085 12:35-19:00 下午，抵达东京成田国际机场。飞行时间大约为 5.5 小时，东京位于东九区，比中国快一个小时。 东京成田机场提取行李后，我们的司机将在机场接您和同伴，前往酒店。 随后，您可自由活动。
            <br>
            <br>
            <br>早餐：自理 午餐：飞机上 晚餐：自理 住宿：东京王子大饭店
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store8/d1_1.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store8/d1_2.png"
              alt
            >
          </div>
        </div>
        <div class="day2">
          <h6 class="date_h6">东京</h6>
          <p
            class="date_paragraph"
          >一天时间游玩东京市内，开启日本美食之旅。 浅草寺，东京最著名、最古老的寺庙，也是日本的门脸、浅草的象征。特别推荐，浅草寺附近的网红抹茶冰淇淋， 这里有世界上纯度最高的抹茶冰淇淋哦！随后前往银座，以高级购物商店闻名，与巴黎的香榭丽舍大道，纽约的第 五大道并列为世界三大繁华中心。银座附近也有超级多美食，包括大名鼎鼎的寿司之神。下午前往东京塔。塔上设 有展望台，整个东京都的景色尽收眼底，天气晴好的时候可远眺富士山。动漫迷还可自行前往三楼的海贼王主题公 园/主题餐厅。晚餐推荐：野田岩鳗鱼麻布饭仓本店（鳗鱼之神）。野田本店的鳗鱼，最后一步的烧鳗都是由金本老 先生亲自掌勺。“杀鳗三年，串鳗八年，烧鳗一生” 。人均 300 元，好吃到哭泣。
            <br>
            <br>
            <br>早餐：酒店含早 午餐：自理 晚餐：自理 住宿：东京王子大饭店
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store8/d1_3.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store8/d1_4.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store8/d1_5.png"
              alt
            >
          </div>
        </div>
        <div class="day3">
          <h6 class="date_h6">东京 – 富士山</h6>
          <p
            class="date_paragraph"
          >上午驱车前往富士山，车程大约 1.5 小时。 如果天气好的话，我们将上山到五合目，瞭望富士山壮阔景色。（如果因天气原因受限，我们将抵达一合目观赏） 富士山是日本第一高峰，也是世界上最大的活火山之一，海拔 3776 米，屹立于本州中南部，距东京 80 公里。这 座被日本人奉为“圣岳”的山峰自 1707 年最后一次喷发后休眠至今。随后前往新仓山浅间公园——富士山最佳拍 摄角度之一地。接下来抵达忍野八海，这里因错落有致地散布着八个清泉故而得名且名扬四方。据说忍野八海在 1200 年前就有了，是富士山融化的雪水经流经地层过滤而成的八个清澈的淡泉水，品尝一口，清冽爽口。这里的 泉水豆腐、巨峰葡萄、海鲜棒、草饼也非常有名，各位美食达人不要错过！
            <br>
            <br>
            <br>早餐：酒店含早 午餐：自理 晚餐：酒店含晚餐 住宿：富士山鐘山苑温泉酒店
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store8/d1_6.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store8/d1_7.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store8/d1_8.png"
              alt
            >
          </div>
        </div>
        <div class="day4">
          <h6 class="date_h6">江之岛 – 镰仓高校 – 横滨 – 东京</h6>
          <p
            class="date_paragraph"
          >江之岛被视为湘南地区最具代表性的观光胜地，岛屿和海岸以桥梁相连，从陆地步行即可前往江之岛。此外，镰 仓不仅面朝大海，而且三面环山，在复杂的地形中，坐落着许多神社和佛寺，其中又以镰仓大佛最为出名，其悠 久的历史与深厚的文化令人赞叹不已。横滨中华街是日本乃至亚洲最大的唐人街，与神户南京町、长崎新地中华 街一起并称为日本的三大中华街。山下公园紧连横滨港口，为横滨市特有的海滨公园，它以最佳散步地而著称。 晚餐推荐：天妇罗是山居。早乙女先生（天妇罗之神）的天妇罗都是按照秒来计算，食物的火候都在他掌握之 中，一切有条不紊，堪称绝技。
            <br>
            <br>
            <br>早餐：酒店含早 午餐：自理 晚餐：自理 住宿：东京半岛酒店
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store8/d1_9.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store8/d1_10.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store8/d1_11.png"
              alt
            >
          </div>
        </div>
        <div class="day5">
          <h6 class="date_h6">东京</h6>
          <p
            class="date_paragraph"
          >本日东京全天自由活动。 晚餐推荐：数寄屋桥次郎（寿司之神）。奥巴马访日时吃过的唯一一家寿司店，奥巴马说这是他吃过的最好吃的寿 司。米其林毫不吝啬的给了小野二郎的这家寿司店三颗星。握好的寿司放进嘴里，肉和饭浑然融入一体，完全不会 散掉，入嘴即化，还没来得及咀嚼，整个寿司的香味就已经很自然的扩散到整个嘴里。食材本身的鲜、香、弹、糯 在舌尖一丝丝的渗透、一层层的绽放。对食材非常敏感的食客一定会捕捉到这种幸福感，真实确切，毫无风花雪月、 虚而不实。（如若没有预约到座位，可推荐前往天本寿司用餐）
            <br>
            <br>
            <br>早餐：酒店含早 午餐：自理 晚餐：自理 住宿：东京半岛酒店
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store8/d1_12.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store8/d1_13.png"
              alt
            >
          </div>
        </div>
        <div class="day6">
          <h6 class="date_h6">东京 – 成都</h6>
          <p
            class="date_paragraph"
          >本日东京全天自由活动。 司机将会按照航班起飞时间，送您和同伴前往机场，搭乘航班回国。 参考航班时间：东京-成都 3U8086 20:30-01:35+1
            <br>
            <br>
            <br>早餐：酒店含早 午餐：自理 晚餐：自理 住宿：无
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store8/d1_14.png"
              alt
            >
          </div>
        </div>
        <div class="day7">
          <h6 class="date_h6">抵达成都</h6>
          <p class="date_paragraph">预计时间，凌晨 01:35 抵达成都双流国际机场，结束日本米其林美食之旅
            <br>
          </p>
        </div>
      </div>

      <h5 class="ct_title">参考下榻酒店</h5>
      <h6 class="ct_subTitle">Tokyo Prince Hotel（东京王子大饭店）</h6>
      <p
        class="paragraph"
      >东京王子大饭店环境清幽，一片绿意，让人忘却都市的喧嚣。以东京塔为背景，东京王子大饭店地理位置优越， 交通方便，是商务和观光住宿的绝佳选择。从 客房俯瞰色彩斑斓的喷泉和随着四季变化的庭园，仿佛能听到微风 吹过树梢的声音。远离都市的喧嚣，东京王子大饭店将带给您一段惬意的时光。 靠近东京市中心和六本木、虎之门、霞关、大手町等地区。东京王子大饭店毗邻四个地铁站，通往市区、羽田机 场和成田机场均十分便捷。</p>
      <div>
        <img
          class="date-img"
          src="../../assets/imgs/custom/store8/d1_15.png"
          alt
        >
        <img
          class="date-img"
          src="../../assets/imgs/custom/store8/d1_16.png"
          alt
        >
      </div>
      <h6 class="ct_subTitle">Kaneyamaen （鐘山苑）</h6>
      <p
        class="paragraph"
      >鐘山苑有 106 间装修精美的客房，大部分都配有平板电视, 额外浴室, 空气净化器, 免费速溶咖啡, 免费茶水。 酒 店的娱乐设施相当齐全，包括温泉 , 室外游泳池, 水疗中心, 按摩, 花园。 钟山苑酒店地理位置优越，设施优良， 各方面均为理想之选。</p>
      <div>
        <img
          class="date-img"
          src="../../assets/imgs/custom/store8/d1_17.png"
          alt
        >
        <img
          class="date-img"
          src="../../assets/imgs/custom/store8/d1_18.png"
          alt
        >
        <img
          class="date-img"
          src="../../assets/imgs/custom/store8/d1_19.png"
          alt
        >
      </div>
      <h6 class="ct_subTitle">The Peninsula Tokyo（东京半岛酒店）</h6>
      <p
        class="paragraph"
      >东京半岛酒店地段优越，座落于丸之内商业区，与东京皇居隔街相望，距离银座购物中心仅有数分钟路程。它拥有 无与伦比的城市景观、奢华舒适的住宿、精良先进的设施、品质非凡的餐饮和富有传奇色彩的半岛酒店服务。半岛 酒店客房一直以来以客房宽敞，设施先进而闻名于东京。酒店拥有全城无可比拟的美景，皇宫花园和日比谷公园就 近在眼前。知名室内设计师桥本夕纪夫选用大地色、木材、漆器和大理石进行混搭，并在设计中充分考虑到各项设 施的功能性，为宾客营造奢华舒适的居住环境，被赞为“国际设计闪耀日式精彩”。</p>
      <div>
        <img
          class="date-img"
          src="../../assets/imgs/custom/store8/d1_20.png"
          alt
        >
        <img
          class="date-img"
          src="../../assets/imgs/custom/store8/d1_21.png"
          alt
        >
      </div>
      <h5 class="ct_title">费用包含</h5>
      <p class="paragraph" style="border-bottom:none;">1、成都-东京，往返经济舱机票含税；
        <br>2、两晚东京王子大饭店住宿（含早餐）；
        <br>3、一晚富士山温泉酒店住宿（含早、晚餐）；
        <br>4、两晚东京半岛酒店住宿（含早餐） ；
        <br>5、接送机服务；
        <br>6、专属正规合法 7座豪华商务车，三天私人包车；
        <br>7、司兼导服务，司兼导住宿补贴；
        <br>8、司导小费；
        <br>9、一次野田岩鳗鱼麻布饭仓本店预约；
        <br>10、一次天妇罗是山居预约；
        <br>11、东京塔大展望台门票每人一张；
        <br>12、境外旅游意外险每人一份。
        <br>
      </p>
      <h5 class="ct_title">费用不含：</h5>
      <p class="paragraph" style="border-bottom:none;">1、护照费用及公证认证费用；
        <br>2、酒店内电话、传真、洗熨、收费电视、饮料等费用；
        <br>3、费用包含中未提到的其他一切费用；
        <br>4、餐饮，洗衣，理发，电话，饮料，烟酒，付费电视，行李搬运等私人费用；
        <br>5、签证相关费用；
        <br>6、旅游费用不包括旅游者因违约、自身过错、自由活动期间内行为或自身疾病引起的人身和财产损失；
        <br>7、单房差；
        <br>8、包车每天时间为 10 小时，最远路程 300KM，超时费为 350 元/小时。
        <br>
      </p>
      <h5 class="ct_title">服务标准说明：</h5>
      <p class="paragraph" style="border-bottom:none;">1、 行程说明：
        <br>&nbsp; &nbsp; 1) 本社有权根据景点节假日休息（关门）调整行程游览先后顺序，但游览内容不会减少，标准不会降低；
        <br>&nbsp; &nbsp; 2) 根据国际航班团队搭乘要求，通常须提前 3-3.5 小时到达机场办理登机手续；
        <br>2、 酒店标准：
        <br>行程中所入住酒店，如若出现无房，将更换为同级别酒店入住；
        <br>3、 购物说明：
        <br>&nbsp; &nbsp; 1) 全程无任何强制购物；
        <br>&nbsp; &nbsp; 2) 游客在行程中为自愿购物，若商品出现质量问题，旅行社不承担任何责任；
        <br>4、 保险说明：
        <br>&nbsp; &nbsp; 1) 我社所上境外旅游意外伤害保险，医疗 30 万；推荐客人根据自身情况额外补上医疗 50 万或 70 万保险；
        <br>&nbsp; &nbsp; 2) 旅游意外伤害险不包括游客自身携带疾病、旧病复发，且在出团日前 180 天内未经过治疗的疾病；（如心脏病 复发、高血压、糖尿病并发症、移植手术复发、孕妇、精神病发作等等）
        <br>5、 退费说明：
        <br>&nbsp; &nbsp; 1) 如遇天气、战争、罢工、地震等人力不可抗力因素无法游览，我社将按照旅行社协议，退还未游览景点门票费 用，但赠送项目费用不退；
        <br>&nbsp; &nbsp; 2) 游客因个人原因临时自愿放弃游览，酒店住宿、餐、车等费用均不退还；
        <br>6、 补费说明：
        <br>&nbsp; &nbsp; 1) 如遇航空公司政策性调整机票价格，请按规定补交差价。一经出票，不得改签换人退票；
        <br>&nbsp; &nbsp; 2) 如果旅游目的地国家政策性调整门票或其他相关价格，请按规定补交差价；
        <br>7、 其他说明：质量反馈表，我社处理游客意见，以游客交回的《团 队质量反馈表》为依据，请您秉着公平、公正、 实事求是的原 则 填写《团队质量反馈表》；
        <br>8、 其他未尽事宜请参照出行合同相关条约
        <br>
      </p>
    </div>
    <footer-custom></footer-custom>
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
              <div class="elsequ2" @click="showsel=true">{{checkqu}}<van-icon name="arrow" /></div>
              <input type="text" style="border-bottom: 1px solid #C9C9C9;color: #000" placeholder="请填写您的电话号码" v-model="phone1"
                     class="setinput2">
              <div class="right basecolor">*</div>
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
    <van-popup v-model="showsel" position="bottom" :overlay="true">
      <van-picker v-if="columns.length" :columns="columns" @confirm="onChangequ" @cancel="showsel=false" show-toolbar title="选择区号"/>
    </van-popup>
  </div>
</template>
<script>
  import {custom} from "@/api/custom";
  import {getquhao} from '@/api/contacts'
  import onCustomerService from '@/assets/js/customerService.js'
  import FooterCustom from '@/components/footer/custom'

  export default {
    name: "component_name",
    components:{
      FooterCustom
    },
    data() {
      return {
        isApp: this.$route.query.platform,
        showcall:false,
        address1:"",
        phone1:'',
        wechat1:'',
        submiting: false,
        showform:false,
        showsel:false,//选择区号
        columns:[],
        checkqu:'86',
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
        onCustomerService('custom')
      },
      // 得到区号
      async getqu() {
        let this_=this;
        let {data, code, msg} = await getquhao();
        if(code === 0) {
          this_.columns = data.map(v => {
            this.$set(v, 'text',  v.tel_code+'('+v.countryName+')')
            return v
          })
          console.log(this_.columns)
        }
        else {
          this.$dialog.alert({
            message: msg
          });
        }
      },
      mounted() {
        this.getqu();
      },
      onChangequ(picker){
        this.checkqu=picker.tel_code;
        this.showsel=false;
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
          phone: this.checkqu+'-'+this.phone1,
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
.elsequ2{
  width: 2.5rem;
  display: inline-block;
  text-align: center;
  line-height: 80px;
  height: 80px;
  font-size: 30px;
  color: #333;
  i{
    position: relative;
    top: 5px;
  }
}
.setinput2{
  border: none;
  border-bottom:2px solid #C9C9C9;
  text-align: left;
  font-size: 30px;
  color: #474747;
  width: 515px;
  height: 80px;
  line-height: 80px;
  background: none;
}
.banner {
  background: url("../../assets/imgs/custom/store8/banner.png") no-repeat center
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
