<template>
  <div>
    <div class="banner">
        <a v-if="!isApp" class="return" @click="goBack" href="javascript:;"></a>
        <span class="title" style="line-height:.8rem;text-align:center;">（富士山下）<br>东京.关西 7D6N</span>
    </div>
    <div class="ct">
        <h5 class="ct_title">
            为什么值得去
        </h5>
        <p class="paragraph">
            如果是第一次去日本，更推荐经典的关西线大阪-京都-奈良。大阪，有关西最大购物圣地心斋桥，亲子游可以去环球影城玩个痛快；京都，漫步在花见小路偶遇风情艺妓，适合穿和服出游；奈良，有网红ins最火的公园喂小鹿，拍摄圣地。这条线路，特别适合那些喜欢充实旅程，吃喝玩乐都要过瘾，一路人文＋风景体验不停的人！行程中的双乐园跟能让还孩子玩个够
        </p>
        <h5 class="ct_title">
            行程概览
        </h5>
        <!-- <p class="paragraph">
            巴厘岛、科莫多国家公园、粉色沙滩、科莫多龙、浮潜
        </p>
        <h5 class="ct_title">
            行程详情
        </h5> -->
        <div class="date">
            <div class="day1">
                <h6 class="date_h6">成都——东京入住东京湾希尔顿酒店</h6>
                <p class="date_paragraph">
                    上午，前往成都双流国际机场。为了不耽误您的行程，请您准时按照出团通知书的时间抵达集合地点。办理登机手 续，准备起飞。参考航空为四川航空。 参考航班时间：成都-东京  3U8085  11:45-17:55 下午，抵达东京成田国际机场。飞行时间大约为 5 小时，东京位于东九区，比中国快一个小时。 东京成田机场提取行李后，我们的司机将在机场接您和同伴，前往酒店。 随后，您可自由活动。<br><br><br>
                    早餐：自理      午餐：飞机上      晚餐：自理      住宿：东京湾希尔顿<br>
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store7/d1_1.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store7/d1_2.png" alt="">
                </div>
            </div>
            <div class="day2">
                <h6 class="date_h6">游玩东京迪士尼乐园</h6>
                <p class="date_paragraph">
                    一天时间游玩东京迪士尼乐园（或东京迪士尼海洋乐园） 。 带小孩子的家庭推荐游玩东京迪士尼乐园，喜欢刺激一点项目的推荐游玩东京迪士尼海洋乐园。<br><br><br>
                    早餐：酒店含早      午餐：自理      晚餐：自理      住宿：东京湾希尔顿<br>
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store7/d1_3.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store7/d1_4.png" alt="">
                </div>
            </div>
            <div class="day3">
                <h6 class="date_h6">东京驱车前往富士山一日游，入住温泉酒店</h6>
                <p class="date_paragraph">
                   上午驱车前往富士山，车程大约 1.5 小时。 如果天气好的话，我们将上山到五合目，瞭望富士山壮阔景色。（如果因天气原因受限，我们将抵达一合目观赏） 富士山是日本第一高峰，也是世界上最大的活火山之一，海拔 3776 米，屹立于本州中南部，距东京 80 公里。这 座被日本人奉为“圣岳”的山峰自 1707 年最后一次喷发后休眠至今。山顶上的两个火山口形成了两个美丽的火山 湖，山麓处还有火山喷发后留下的千姿百态的山洞，有些仍在不断喷气。富岳风穴内的洞壁上则结满了钟乳石似 的冰柱，被称为“万年雪”。坐落在顶峰上的圣庙──久须志神社和浅间神社则是富士箱根伊豆国立公园的主要风 景区。富士山北麓有富士五湖，湖光山色十分宜人。河口湖中所映的富士山倒影，被称作富士山奇景之一。 特别为您安排河口湖缆车，欣赏富士山景色。随后回到酒店，享用温泉。<br><br><br>

                    早餐：酒店含早      午餐：自理      晚餐：酒店含晚餐      住宿：富士山鐘山苑温泉酒店<br>
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store7/d1_5.png" alt="">
                </div>
            </div>
            <div class="day4">
                <h6 class="date_h6">富士山 – 大阪</h6>
                <p class="date_paragraph">
                    早餐后，乘坐新干线前往大阪。车程大约 2 小时左右。 大阪城公园位于大阪的中央，园内的标志性景观是大阪城天守阁，还有可以欣赏四季花卉的西之丸庭园和梅林，软 式棒球场、野外音乐堂、橄榄球足球场等公共设施也很齐全。大阪城公园内植被茂盛，每到花季会有成群游客。 随后前往心斋桥自由购物，品尝道顿崛丰富美食。晚上在梅田蓝天大厦观赏夜景。<br><br>
                    早餐：酒店含早      午餐：自理      晚餐：自理      住宿：大阪帝国酒店<br>
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store7/d1_6.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store7/d1_7.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store7/d1_8.png" alt="">
                </div>
            </div>
            <div class="day5">
                <h6 class="date_h6">大阪环球影城</h6>
                <p class="date_paragraph">
                   一天时间游玩大阪环球影城。 搭乘各种惊险刺激的游乐设施，还可以进入哈利波特的魔法世界。 日本环球影城是以好莱坞电影为主题的大型主题乐园。你可以通过乘坐各种惊险的游乐设施、观看精彩绚丽的表演 秀来体验电影场景，如飞檐走壁的蜘蛛侠、侏罗纪公园里的恐龙、突然袭船的大白鲨、近在咫尺的终结者等。 全新的小黄人主题园区开张，人气高涨。除了可以搭乘设施在小黄人的世界里穿梭，还可以遇上比如小黄人街头演 出、特别表演等，再买些可爱的小黄人主题小吃，完全沉浸在电影的奇妙世界中。<br><br>
                    早餐：酒店含早      午餐：自理      晚餐：自理      住宿：大阪帝国酒店<br>
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store7/d1_9.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store7/d1_10.png" alt="">
                </div>
            </div>
            <div class="day6">
                <h6 class="date_h6">大阪 – 奈良 – 京都 – 大阪传统文化一日游</h6>
                <p class="date_paragraph">
                    奈良公园位于奈良市区的东侧、春日山脚下，是一个占地广大的开放式公园。春季嫩枝发芽、秋季满园枫叶的奈良 公园都令人心旷神怡，而在其他季节也很适合悠闲自在地漫步。虽然在奈良很容易看到小鹿，但奈良公园仍然是鹿 群最集中的地方。 春日大社是日本神道教的宗教参拜场所，建立于 710 年，已经被列入世界文化遗产的名录。它供奉的是藤原家的四 位守护神灵，如今是全日本重要的祭祀场所。整个神社依靠在春日山山脚下，周围被苍翠秀丽的植被所环抱着，春 日山向来禁止砍伐，因此这里的一切都显得自然而古意。 随后前往高台寺，二年坂/三年坂，清水寺，花见小路游玩。还可以自行租赁和服拍照哦。 晚上观看祗园角传统文化表演。 <br><br>
                   早餐：酒店含早      午餐：自理      晚餐：自理      住宿：大阪帝国酒店<br>
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store7/d1_11.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store7/d1_12.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store7/d1_13.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store7/d1_14.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store7/d1_15.png" alt="">
                </div>
            </div>
            <div class="day7">
                <h6 class="date_h6">大阪—成都</h6>
                <p class="date_paragraph">
                    今天为全天自由活动时间。 您可以在大阪自由购物、自由观光、自由玩耍。 傍晚时，我们的司机将在酒店接您前往机场。搭乘航班回国。参考航班为四川航空。 参考航班时间：大阪-成都  3U8088  20:25-23:35<br><br>
                    早餐：酒店含早      午餐：自理      晚餐：自理      住宿：无<br>
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store7/d1_16.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store7/d1_17.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store7/d1_18.png" alt="">
                </div>
            </div>
        </div>

        <h5 class="ct_title">
            参考下榻酒店
        </h5>
        <h6 class="ct_subTitle">
            Hilton Tokyo Bay（东京湾希尔顿酒店）
        </h6>
        <p class="paragraph">
            东京湾希尔顿酒店是东京迪士尼度假区的官方酒店，坐落在东京湾的东岸，在 JR 舞滨站南口的 welcome center（营 业时间 8 点-15 点） 客人可以在此直接办理酒店入住手续以及行李寄存，行李会直接送往酒店。从酒店出发可乘坐 迪士尼小火车前往乐园，酒店亦提供免费接驳巴士到 JR 舞滨站。不论您是商务出差还是休闲旅游千叶东京湾希尔 顿酒店(Hilton Tokyo Bay Chiba)都是理想的下榻之处。附近很多景点，包括东京迪士尼乐园、东京迪士尼海洋和冲绳 迪斯尼伊克斯皮儿莉购物中心都离酒店不远，酒店的园景房一侧还可以看到迪士尼乐园的烟火。
        </p>
        <div>
            <img class="date-img" src="../../assets/imgs/custom/store7/d1_19.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store7/d1_20.png" alt="">
        </div>
        <h6 class="ct_subTitle">
            Kaneyamaen （鐘山苑）
        </h6>
        <p class="paragraph">
            鐘山苑有 106 间装修精美的客房，大部分都配有平板电视, 额外浴室, 空气净化器, 免费速溶咖啡, 免费茶水。 酒 店的娱乐设施相当齐全，包括温泉 , 室外游泳池, 水疗中心, 按摩, 花园。 钟山苑酒店地理位置优越，设施优良， 各方面均为理想之选。
        </p>
        <div>
            <img class="date-img" src="../../assets/imgs/custom/store7/d1_21.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store7/d1_22.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store7/d1_23.png" alt="">
        </div>
        <h6 class="ct_subTitle">
          Imperial Hotel Osaka（大阪帝国酒店）
        </h6>
        <p class="paragraph">
            大阪帝国酒店是一家享有盛誉的五星级酒店，坐落在以美丽樱花而闻名的大川河（Okawa River）河畔。 酒店设有众多娱乐设施 。Les Saison 餐厅享有城市全景，供应精致的法国美食。Kamon 餐厅供应新鲜的海产品和铁 板烧风格牛排。Jasmine Garden 餐厅供应奢华的中式菜肴。
        </p>
        <div>
            <img class="date-img" src="../../assets/imgs/custom/store7/d1_24.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store7/d1_25.png" alt="">
        </div>
        <h5 class="ct_title">
            费用包含
        </h5>
        <p class="paragraph" style="border-bottom:none;">
            1、成都-东京，大阪-成都，经济舱机票含税；<br>
            2、两晚东京湾希尔顿酒店住宿（含早餐） ；<br>
            3、一晚富士山温泉酒店住宿（含早、晚餐）；<br>
            4、三晚大阪帝国酒店住宿（含早餐） ；<br>
            5、接送机服务； <br>
            6、专属豪华商务车，四天包车； <br>
            7、司兼导服务，司兼导住宿补贴； <br>
            8、新干线车票； <br>
            9、东京迪士尼门票； <br>
            10、大阪环球影城门票； <br>
            11、富士山河口湖登山缆车； <br>
            12、门票（春日大社，梅田蓝天大厦展望台，高台寺，清水寺，祗园角，天守阁）<br>
        </p>
        <h5 class="ct_title">
            费用不含：
        </h5>
        <p class="paragraph" style="border-bottom:none;">
            1、护照费用及公证认证费用； <br>
            2、酒店内电话、传真、洗熨、收费电视、饮料等费用； <br>
            3、费用包含中未提到的其他一切费用； <br>
            4、洗衣，理发，电话，饮料，烟酒，付费电视，行李搬运等私人费用； <br>
            5、签证相关费用； <br>
            6、旅游费用不包括旅游者因违约、自身过错、自由活动期间内行为或自身疾病引起的人身和财产损失； <br>
            7、单房差。<br>
        </p>
        <h5 class="ct_title">
            服务标准说明：
        </h5>
        <p class="paragraph" style="border-bottom:none;">
            1、 行程说明： <br>
            &nbsp; &nbsp; 1)  本社有权根据景点节假日休息（关门）调整行程游览先后顺序，但游览内容不会减少，标准不会降低； <br>
            &nbsp; &nbsp;    2)  根据国际航班团队搭乘要求，通常须提前 3-3.5 小时到达机场办理登机手续； <br>
            2、 酒店标准：<br>行程中所入住酒店，如若出现无房，将更换为同级别酒店入住； <br>
            3、 购物说明： <br>
            &nbsp; &nbsp;    1)  全程无任何强制购物；<br>
             &nbsp; &nbsp;   2)  游客在行程中为自愿购物，若商品出现质量问题，旅行社不承担任何责任； <br>
            4、 保险说明：<br>
            &nbsp; &nbsp;    1)  我社所上境外旅游意外伤害保险，医疗 30 万；推荐客人根据自身情况额外补上医疗 50 万或 70 万保险；<br>
            &nbsp; &nbsp;    2)  旅游意外伤害险不包括游客自身携带疾病、旧病复发，且在出团日前 180 天内未经过治疗的疾病；（如心脏病 复发、高血压、糖尿病并发症、移植手术复发、孕妇、精神病发作等等） <br>
            5、 退费说明： <br>
             &nbsp; &nbsp;   1)  如遇天气、战争、罢工、地震等人力不可抗力因素无法游览，我社将按照旅行社协议，退还未游览景点门票费 用，但赠送项目费用不退；<br>
            &nbsp; &nbsp;    2)  游客因个人原因临时自愿放弃游览，酒店住宿、餐、车等费用均不退还； <br>
            6、 补费说明：<br>
            &nbsp; &nbsp;    1)  如遇航空公司政策性调整机票价格，请按规定补交差价。一经出票，不得改签换人退票； <br>
            &nbsp; &nbsp;    2)  如果旅游目的地国家政策性调整门票或其他相关价格，请按规定补交差价； <br>
            7、 其他说明：质量反馈表，我社处理游客意见，以游客交回的《团     队质量反馈表》为依据，请您秉着公平、公正、 实事求是的原     则  填写《团队质量反馈表》；<br>
            8、 其他未尽事宜请参照出行合同相关条约<br>
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
        window.location.href = 'http://p.qiao.baidu.com/cps/chat?siteId=12918104&userId=26301226'
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
@import '../../assets/style/custom/index';
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
  background: url("../../assets/imgs/custom/store7/banner.png") no-repeat center
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
