<template>
  <div>
    <div class="banner">
        <a v-if="!isApp" class="return" @click="goBack" href="javascript:;"></a>
        <span class="title" style="line-height:.8rem;text-align:center;">花开异国 东京+关西</span>
    </div>
    <div class="ct">
        <h5 class="ct_title">
            为什么值得去
        </h5>
        <p class="paragraph">
            如果是第一次去日本，更推荐经典的关西线大阪-京都-奈良。大阪，有关西最大购物圣地心斋桥，亲子游可以去环球影城玩个痛快；京都，漫步在花见小路偶遇风情艺妓，适合穿和服出游；奈良，有网红ins最火的公园喂小鹿，拍摄圣地。这条线路，特别适合那些喜欢充实旅程，吃喝玩乐都要过瘾，一路人文＋风景体验不停的人！
        </p>
        <h5 class="ct_title">
            行程概览
        </h5>
        <p class="paragraph">

        </p>
        <h5 class="ct_title">
            行程详情
        </h5>
        <div class="date">
            <div class="day1">
                <h6 class="date_h6">成都——东京入住东京王子酒店</h6>
                <p class="date_paragraph">
                    上午，前往成都双流国际机场。为了不耽误您的行程，请您准时按照出团通知书的时间抵达集合地点。办理登机 手续，准备起飞。参考航空为四川航空。参考航班时间：成都-东京3U8085  11:45-17:55 下午，抵达东京成田国际机场。飞行时间大约为 5 小时，东京位于东九区，比中国快一个小时。 东京成田机场提取行李后，我们的司机将在机场接您和同伴，前往酒店。随后，您可自由活动。
                    <br><br>
                    早餐：自理      午餐：飞机上      晚餐：自理      住宿：东京王子酒店
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store6/6.1.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store6/6.2.png" alt="">
                </div>
            </div>
            <div class="day2">
                <h6 class="date_h6">东京浅草寺-银座-皇居-台场市区一日游</h6>
                <p class="date_paragraph">
                    浅草寺-银座-皇居-台场 早餐后来到东京最著名、最古老的寺庙—浅草寺。每年都有许多人前来寺庙祈福保平安。随后前往银座享用午 餐。银座与巴黎香榭丽舍大街、纽约第五大道齐名，是世界三大繁华购物街之一。午餐后，前往皇居。皇居是日 本天皇居住的地方，位于东京中心，周围护城河环绕，风景优美。这里保留着江户城石墙遗迹，春秋季节是赏花 和红叶的好去处。最后，前往台场观光。滨海沿线有散步道可以观赏海景，还能眺望彩虹大桥、自由女神像。
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store6/6.3.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store6/6.4.png" alt="">
                </div>
            </div>
            <div class="day3">
                <h6 class="date_h6">东京驱车前往富士山一日游，入住温泉酒店</h6>
                <p class="date_paragraph">
                    上午驱车前往富士山，车程大约 1.5 小时。 如果天气好的话，我们将上山到五合目，瞭望富士山壮阔景色。（如果因天气原因受限，我们将抵达一合目观赏） 富士山是日本第一高峰，也是世界上最大的活火山之一，海拔 3776 米，屹立于本州中南部，距东京 80 公里。这 座被日本人奉为“圣岳”的山峰自 1707 年最后一次喷发后休眠至今。山顶上的两个火山口形成了两个美丽的火山 湖，山麓处还有火山喷发后留下的千姿百态的山洞，有些仍在不断喷气。富岳风穴内的洞壁上则结满了钟乳石似 的冰柱，被称为“万年雪”。坐落在顶峰上的圣庙──久须志神社和浅间神社则是富士箱根伊豆国立公园的主要风 景区。富士山北麓有富士五湖，湖光山色十分宜人。河口湖中所映的富士山倒影，被称作富士山奇景之一。 特别为您安排河口湖缆车，欣赏富士山景色。随后回到酒店，享用温泉。
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store6/6.5.png" alt="">
                </div>
            </div>
            <div class="day4">
                <h6 class="date_h6">富士山 – 京都（二年坂-三年坂-清水寺-花见小路-祗园角大阪环球影城）</h6>
                <p class="date_paragraph">
                    二年坂-三年坂-清水寺-花见小路-祗园角 早餐后，驱车前往京都。抵达京都后，前往酒店。二年坂/三年坂观光。二年坂有各种日式小吃店、和风杂货店、宫 崎骏动画周边的“橡子共和国”，三年坂有玩偶店、和服店和清水烧瓷器店，是京都买手信的好地方。随后前往清水 寺，这里是京都最古老的寺院，与金阁寺、二条城并称为京都三大名胜，1994 年列入世界文化遗产名录。随后前往 花见小路，这里是日本最古老的花街，这里保留了江户时期的民宅建筑，也是现在为数不多的尚能看到艺伎的场所。 在花见小路的南端，有一处专门表演京都传统艺能的剧场——祇园角，是体验艺伎演出的好去处。同时，这里也是 电影《艺妓回忆录》的取景地之一，许多到访游客会选择和服变装后来这里拍照，颇有一番意境。
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store6/6.6.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store6/6.7.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store6/6.8.png" alt="">
                </div>
            </div>
            <div class="day5">
                <h6 class="date_h6">大阪 – 奈良 – 京都 （高台寺-岚山-奈良公园-春日大社）</h6>
                <p class="date_paragraph">
                    高台寺-岚山-奈良公园-春日大社 早餐后，前往高台寺。高台寺建于 1605 年，开山堂、灵屋、伞亭、时雨亭等都是国宝级古迹，建造的寺院非常壮 观。这里也是观赏红叶的好去处（10 月下旬-12 月上旬）。随后前往岚山景区。景区集中了许多古刹和神社。 奈良公园位于奈良市区的东侧、春日山脚下，是一个占地广大的开放式公园。春季嫩枝发芽、秋季满园枫叶的奈良 公园都令人心旷神怡，而在其他季节也很适合悠闲自在地漫步。虽然在奈良很容易看到小鹿，但奈良公园仍然是鹿 群最集中的地方。 春日大社是日本神道教的宗教参拜场所，建立于 710 年，已经被列入世界文化遗产的名录。它供奉的是藤原家的四 位守护神灵，如今是全日本重要的祭祀场所。整个神社依靠在春日山山脚下，周围被苍翠秀丽的植被所环抱着，春 日山向来禁止砍伐，因此这里的一切都显得自然而古意。
                    <br><br> 早餐：酒店含早      午餐：自理      晚餐：自理      住宿：大阪帝国酒店
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store6/6.9.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store6/6.10.png" alt="">
                </div>
            </div>
            <div class="day6">
                <h6 class="date_h6">大阪（大阪城公园-天守阁-心斋桥-道顿崛-梅田蓝天大厦）</h6>
                <p class="date_paragraph">
                    大阪城公园-天守阁-心斋桥-道顿崛-梅田蓝天大厦 大阪城公园位于大阪的中央，园内的标志性景观是大阪城天守阁，还有可以欣赏四季花卉的西之丸庭园和梅林，软 式棒球场、野外音乐堂、橄榄球足球场等公共设施也很齐全。大阪城公园内植被茂盛，每到花季会有成群游客。 随后前往心斋桥自由购物，品尝道顿崛丰富美食。晚上在梅田蓝天大厦观赏夜景。
                    <br><br> 早餐：酒店含早      午餐：自理      晚餐：自理      住宿：大阪帝国酒店
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store6/6.11.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store6/6.12.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store6/6.13.png" alt="">
                </div>
            </div>
            <div class="day7">
                <h6 class="date_h6">大阪—成都全天自由活动</h6>
                <p class="date_paragraph">
                    今天为全天自由活动时间。 您可以在大阪自由购物、自由观光、自由玩耍。 傍晚时，我们的司机将在酒店接您前往机场。搭乘航班回国。参考航班为四川航空。 参考航班时间：大阪-成都  3U8088  20:25-23:35
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store6/6.14.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store6/6.15.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store6/6.16.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store6/6.17.png" alt="">
                </div>
            </div>

        </div>
        <p class="date_paragraph">注：以上行程中所列仅为参考时间，在不减少行程景点的前提下，公司有权对上述行程的次序、景点，依照当地情况进行调整！</p>
        <h5 class="ct_title" style="margin-top: 0.3rem;">
            参考下榻酒店
        </h5>
        <h6 class="ct_subTitle">
            Tokyo Prince Hotel（东京王子酒店）
        </h6>
        <p class="paragraph">
            东京王子酒店在 2017 年 4 月新装修，提供现代化的住宿。客人可以欣赏到 3 分钟步行路程处的东京塔（Tokyo Tower）的景色。Tokyo Prince Hotel 设有额外收费的季节性室外游泳池，提供 Spa 护理服务，设有内部购物商场。 餐厅提供西式菜肴；Shimizu Japanese Restaurant 日式餐厅供应寿司和热天妇罗。酒店设有 Marronnier Chinese Restaurant 餐厅和 Garden Islands Beer Restaurant 餐厅。Windsor Main Bar 酒吧和 Pikake Tea Salon 茶苑提供饮品。
        </p>
        <div style="text-align: center">
            <img class="date-img" src="../../assets/imgs/custom/store6/6.18.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store6/6.19.png" alt="">
        </div>


        <p class="paragraph">
            鐘山苑有 106 间装修精美的客房，大部分都配有平板电视, 额外浴室, 空气净化器, 免费速溶咖啡, 免费茶水。 酒 店的娱乐设施相当齐全，包括温泉 , 室外游泳池, 水疗中心, 按摩, 花园。 钟山苑酒店地理位置优越，设施优良， 各方面均为理想之选。
        </p>
        <div style="text-align: center">
            <img class="date-img" src="../../assets/imgs/custom/store6/6.20.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store6/6.21.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store6/6.22.png" alt="">
        </div>

        <h6 class="ct_subTitle">
            Seikoro Ryokan（晴鸭楼日式旅馆）
        </h6>
        <p class="paragraph">
            晴鸭楼日式旅馆位于京都，距离京都火车站有 7 分钟车程。所有客房都配备了熨烫设施和带有线频道的平面电视。 连接浴室提供免费洗浴用品和浴缸。公共澡堂区配有 SPA 设施和木制浴缸。旅馆亦提供行李寄存服务并设有一间礼 品店。旅馆供应日式或西式早餐。晚餐时段，客人可以在传统的日式环境中享用正宗的当地菜肴。 Ryokan 旅馆距离三十三间堂和清水寺有 5 分钟车程。京都国家博物馆和七条火车站（Shichijo Train Station）距离旅 馆约有 10 分钟步行路程。
        </p>
        <div style="text-align: center">
            <img class="date-img" src="../../assets/imgs/custom/store6/6.23.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store6/6.24.png" alt="">
        </div>

        <h6 class="ct_subTitle">
            Imperial Hotel Osaka（大阪帝国酒店）
        </h6>
        <p class="paragraph">
            大阪帝国酒店是一家享有盛誉的五星级酒店，坐落在以美丽樱花而闻名的大川河（Okawa River）河畔。 酒店设有众多娱乐设施 。Les Saison 餐厅享有城市全景，供应精致的法国美食。Kamon 餐厅供应新鲜的海产品和铁 板烧风格牛排。Jasmine Garden 餐厅供应奢华的中式菜肴。
        </p>
        <div style="text-align: center">
            <img class="date-img" src="../../assets/imgs/custom/store6/6.25.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store6/6.26.png" alt="">
        </div>

        <h5 class="ct_title">
            费用包含
        </h5>
        <p class="paragraph" style="border-bottom:none;">
            1、成都-东京，大阪-成都，经济舱机票含税；<br>
            2、两晚东京王子酒店住宿（含早餐）；<br>
            3、一晚富士山温泉酒店住宿（含早、晚餐）；<br>
            4、一晚京都晴鸭楼日式旅馆住宿（含早、晚餐）<br>
            5、两晚大阪帝国酒店住宿（含早餐）；<br>
            6、接送机服务；<br>
            7、专属豪华商务车，五天包车；<br>
            8、司兼导贴心服务，司兼导住宿补贴；<br>
            9、富士山河口湖登山缆车；<br>
            10、门票（春日大社，梅田蓝天大厦展望台，高台寺，清水寺，祗园角，天守阁）<br>
        </p>
        <h5 class="ct_title">
            费用不含
        </h5>
        <p class="paragraph" style="border-bottom:none;">
            1、护照费用及公证认证费用；<br>
            2、酒店内电话、传真、洗熨、收费电视、饮料等费用；<br>
            3、费用包含中未提到的其他一切费用；<br>
            4、洗衣，理发，电话，饮料，烟酒，付费电视，行李搬运等私人费用；<br>
            5、签证相关费用；<br>
            6、旅游费用不包括旅游者因违约、自身过错、自由活动期间内行为或自身疾病引起的人身和财产损失；<br>
            7、单房差。<br>
        </p>
        <h5 class="ct_title">
            服务标准说明：
        </h5>
        <p class="paragraph" style="border-bottom:none;">
            1、 行程说明：<br>
            &nbsp;&nbsp;1)  本社有权根据景点节假日休息（关门）调整行程游览先后顺序，但游览内容不会减少，标准不会降低；<br>
            &nbsp;&nbsp;2)  根据国际航班团队搭乘要求，通常须提前 3-3.5 小时到达机场办理登机手续；<br><br>
            2、 酒店标准：行程中所入住酒店，如若出现无房，将更换为同级别酒店入住；<br><br>
            3、 购物说明：<br>
            &nbsp;&nbsp;1)  全程无任何强制购物；<br>
            &nbsp;&nbsp;2)  游客在行程中为自愿购物，若商品出现质量问题，旅行社不承担任何责任；<br><br>
            4、 保险说明：<br>
            &nbsp;&nbsp;1)  我社所上境外旅游意外伤害保险，医疗 30 万；推荐客人根据自身情况额外补上医疗 50 万或 70 万保险；<br>
            &nbsp;&nbsp;2)  旅游意外伤害险不包括游客自身携带疾病、旧病复发，且在出团日前 180 天内未经过治疗的疾病；（如心脏病 复发、高血压、糖尿病并发症、移植手术复发、孕妇、精神病发作等等）<br><br>
            5、 退费说明：<br>
            &nbsp;&nbsp;1)  如遇天气、战争、罢工、地震等人力不可抗力因素无法游览，我社将按照旅行社协议，退还未游览景点门票费 用，但赠送项目费用不退；<br>
            &nbsp;&nbsp;2)  游客因个人原因临时自愿放弃游览，酒店住宿、餐、车等费用均不退还；<br><br>
            6、 补费说明：<br>
            &nbsp;&nbsp;1)  如遇航空公司政策性调整机票价格，请按规定补交差价。一经出票，不得改签换人退票；<br>
            &nbsp;&nbsp;2)  如果旅游目的地国家政策性调整门票或其他相关价格，请按规定补交差价；<br><br>
            7、 其他说明：质量反馈表，我社处理游客意见，以游客交回的《团队质量反馈表》为依据，请您秉着公平、公正、 实事求是的原则填写《团队质量反馈表》；<br><br>
            8、 其他未尽事宜请参照出行合同相关条约。<br>
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
    mounted() {
      this.getqu();
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
  background: url("../../assets/imgs/custom/store6/6.0.png") no-repeat center
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
