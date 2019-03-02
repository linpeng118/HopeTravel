<template>
  <div>
    <div class="banner">
      <a v-if="!isApp" class="return" @click="goBack" href="javascript:;"></a>
      <span class="title" style="line-height:.8rem;text-align:center;">加州一号公路+圣地亚哥经典自驾之旅10 日</span>
    </div>
    <div class="ct">
      <h5 class="ct_title">为什么值得去</h5>
      <p class="paragraph">自驾最美海岸公路，人生必去五十地之一；
        <br>告别繁琐路书攻略，专业自驾领队全程护航；
        <br>美西经典城市洛杉矶、拉斯维加斯，深度体验之旅；
        <br>美西最大的奥特莱斯，各种大牌特价，一天的轻松购物时间；
        <br>轻松纯玩自驾小分队，无旅游商店购物或额外收费项目；
        <br>拒绝团餐，精选特色餐厅，开启舌尖上的美利坚
        <br>超大SUV自驾向导24小时陪同，省心省力、安全无忧。
        <br>
      </p>
      <h5 class="ct_title">行程概览</h5>
      <p class="paragraph">出行方式：落地跟队自驾，全程专业自驾领队护航，省心省力，安全无忧
        <br>住宿品质：洛杉矶，拉斯维加斯为4星品质酒店，沿线小镇为精选特色Motel汽车旅馆
        <br>车辆配置：美式7座巨无霸SUV（参考车型：雪佛兰太浩/福特探索者/尼桑途乐）
        <br>自驾里程：大约2000公里
        <br>活动人数：4人起发团，12人+1领队满团（自驾）
        <br>
      </p>
      <h5 class="ct_title">行程详情</h5>
      <div class="date">
        <div class="day1">
          <h6 class="date_h6">成都- 旧金山San Francisco</h6>
          <p class="date_paragraph">参考航班：UA008 成都—旧金山 09:50—07:50
            <br>团员在旧金山机场集合，取车后在机场附近熟悉车队配合及当地交规。之后根据到达时间安排市区游览【九曲花街】鲜花中穿过曲折山道、【渔人码头】海滨娱乐场体验邓杰内斯蟹和蛤蜊巧达汤、【诺布山】感受45度斜坡上的富人区、【唐人街】看海外华侨在美帝建立的华人栖息地（视到达时间决定），或直接前往酒店休息。
            <br>参考酒店：Holiday Inn San Francisco-Fisherman's Wharf
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store14/14.1@2x.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store14/14.2@2x.png"
              alt
            >
          </div>
        </div>
        <div class="day2">
          <h6 class="date_h6">旧金山San Francisco - 蒙特雷Monterey（200公里，大约2小时车程）</h6>
          <p
            class="date_paragraph"
          >上午在旧金山市区参观【金门大桥】世界最大的单孔吊桥之一，淘金热时期，这座桥如同通往金矿的大门，《猩球崛起》、《X战警》等众多美国大片在此取景。下午前往蒙特利半岛著名的【17英里海岸】体验陆地，海洋，蓝天完美的接合（含门票）及【卡梅尔小镇】最具盛名的美国富人度假小镇之一，享受小资到极点的意大利生活。夜宿蒙特雷。
            <br>参考酒店：Hilton Garden Inn Monterrey
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store14/14.3@2x.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store14/14.4@2x.png"
              alt
            >
          </div>
        </div>
        <div class="day3">
          <h6 class="date_h6">蒙特雷Monterey-文图拉Ventura（430公里，大约4小时车程）</h6>
          <p class="date_paragraph">沿壮美的加州一号公路一路南行，参观【丹麦小镇-索尔万】被丹麦人称为比丹麦还丹麦的小镇，和美丽的海滨小城市【圣塔芭芭拉】。
            <br>参考酒店：Courtyard by Marriott Oxnard Ventura
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store14/14.5@2x.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store14/14.6@2x.png"
              alt
            >
          </div>
        </div>
        <div class="day4">
          <h6 class="date_h6">文图拉Ventura-拉斯维加斯Lsa Vegas（500公里，大约5小时车程）</h6>
          <p
            class="date_paragraph"
          >驱车前往沙漠上的海市蜃楼-【拉斯维加斯】。夜游 拉斯维加斯长街，观百乐宫音乐喷泉，身临其境火山爆发，观太阳马戏团大秀，逛全球奢侈品店数量最多的大街，感受世界赌城的纸醉金迷。
            <br>参考酒店：The Westin Las Vegas Hotel, Casino & Spa
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store14/14.7@2x.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store14/14.8@2x.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store14/14.9@2x.png"
              alt
            >
          </div>
        </div>
        <div class="day5">
          <h6 class="date_h6">拉斯维加斯Lsa Vegas （不用车，全天自由活动，活动费用自理）</h6>
          <p
            class="date_paragraph"
          >自由活动一天。您可以选择在大牌云集的【拉斯维加斯北奥特莱斯】自由购物，或参加赌城各项精彩活动，如：【实弹射击】、【高空跳伞】、【赛道飙车】等等。推荐世界著名太阳马戏团的O，Ka, Love, Zumanity等大秀；大卫科波菲尔魔术大秀。
            <br>参考酒店：The Westin Las Vegas Hotel, Casino & Spa
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store14/14.10@2x.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store14/14.11@2x.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store14/14.12@2x.png"
              alt
            >
          </div>
        </div>
        <div class="day6">
          <h6 class="date_h6">拉斯维加斯Lsa Vegas -棕榈泉奥特莱斯（440公里，大约4小时车程）</h6>
          <p class="date_paragraph">全天在美国西部最大的奥特莱斯-Desert Hills Premium Outlets自由购物，各大品牌应有尽有。
            <br>参考酒店：Homewood Suites by Hilton Palm Desert
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store14/14.13@2x.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store14/14.14@2x.png"
              alt
            >
          </div>
        </div>
        <div class="day7">
          <h6 class="date_h6">棕榈泉-圣地亚哥San Diego-洛杉矶Los Angeles（270公里，大约3小时车程）</h6>
          <p
            class="date_paragraph"
          >前往美国墨西哥边境上的美丽海滨军港城市-【圣地亚哥】。抵达后，参观美国海军【中途岛号航空母舰】（门票包含）、【胜利之吻雕像】、【科罗拉多大桥】和拥有上百年历史，梦露最爱的【科罗拉多度假酒店】。晚上返回洛杉矶入住酒店。
            <br>参考酒店：Best Western Plus Executive Inn
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store14/14.15@2x.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store14/14.16@2x.png"
              alt
            >
          </div>
        </div>
        <div class="day8">
          <h6 class="date_h6">洛杉矶 Los Angeles（市区内短途驾驶）</h6>
          <p
            class="date_paragraph"
          >白天游客到洛杉矶的必游之地-【好莱坞环球影城】游玩（门票已包含）。晚上参观【好莱坞星光大道】。这里有中国剧院、明星手印、奥斯卡金像奖颁奖礼的举行地点-【杜比剧院】等好莱坞著名景点。
            <br>参考酒店：Best Western Plus Executive Inn
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store14/14.17@2x.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store14/14.18@2x.png"
              alt
            >
          </div>
        </div>
        <div class="day9">
          <h6 class="date_h6">洛杉矶-成都</h6>
          <p class="date_paragraph">参考航班：UA009 洛杉矶—旧金山（中转）—成都 11:21—19:35+1</p>
        </div>
        <div class="day10">
          <h6 class="date_h6">成都</h6>
          <p class="date_paragraph">抵达成都，结束愉快的行程。</p>
        </div>
      </div>
      <p class="date_paragraph">注：以上行程中所列仅为参考时间，在不减少行程景点的前提下，公司有权对上述行程的次序、景点，依照当地情况进行调整！</p>
      <h5 class="ct_title">费用包含</h5>
      <p class="paragraph" style="border-bottom:none;">全程住宿：洛杉矶，拉斯维加斯为4星品质酒店，沿线小镇为精选特色Motel汽车旅馆；
        <br>含部分早餐（部分酒店提供早餐，具体以出团通知书为准）；
        <br>汽车租赁费、异地还车费及随车保险（不限里程、车损或盗抢不计免赔，第三者100万美元、各种税费）；
        <br>全程燃油费、过路费、停车费；
        <br>对讲机、中文导航仪租借费；
        <br>租车公司官方翻译件费用；
        <br>行程中所列景点首道门票：十七英里海岸、中途岛号航空母舰、环球影城。
        <br>全程领队司机兼导游服务费；
        <br>安盛（全球最大保险集团）天平智行天下旅游保险-皇冠计划（含国际救援）。
        <br>
      </p>
      <h5 class="ct_title">费用不含：</h5>
      <p class="paragraph" style="border-bottom:none;">护照、签证等相关证件的费用；
        <br>机票费用及超出机票包含免费行李的行李托运费；
        <br>午餐、晚餐及部分早餐餐食费用自理（走到哪吃到哪儿，丰简由己，午餐约10美金，晚餐约15美金+）；
        <br>停车费及违章罚款等费用（若产生请自理）；
        <br>自驾领队小费每人每天10美金；
        <br>行程中自由活动时的产生的一切费用请自理；
        <br>行程以外的一切私人消费，如酒店内的洗衣费、电话费、饮料、付费电视、行李搬运费以及吸烟罚款等费用，个人消费所引起的小费、出入境的行李海关课税、超重行李的托运费、管理费等；
        <br>不可抗拒的客观原因（如天灾、战争、罢工等）或航空公司航班延误、取消、领馆签证延误等非我公司原因引起的特殊情况，我公司有权变更或取消行程，由此产生的相关费用（如在外延期签证、食、宿、行一切费用）请自理；
        <br>本合同中未提及的其他费用。
        <br>
      </p>
      <h5 class="ct_title">行程须知：</h5>
      <p class="paragraph" style="border-bottom:none;">本产品报价是按照2位成人入住一间房计算的价格，如出现单男单女请补缴单房差。
        <br>驾车人员须有中国合法有效的驾照原件（驾车人员年龄要求在25岁-65岁之间，不驾车的除外）；
        <br>驾车人员须有本人名下有效的国际信用卡 (带有Visa、MasterCard标志，只有银联标志的信用卡无法取车。不驾车的除外)；
        <br>根据美国法律规定，12岁以下且身高不足1.5米的儿童须配置增高坐垫或座椅，费用请自理（建议自带）；
        <br>2-4人参团需至少1人开车，5-8人参团需至少2人开车；
        <br>当地酒店无统一星级评定标准，行程中所列酒店星级表示该酒店具备国内同级酒店的接待水准，具体可在网上查阅评价。
        <br>本活动招募人数不足4人时，我社将取消该行程，您可以选择延期出发、更改线路或退回所有费用；
        <br>本活动为深度自驾，日程中标注的部分酒店在旺季容易满房，部分景点也存在因为天气等原因关闭的情况，因此我社可能会根据实际情况，调整住宿地点（不改变酒店的等级），更换或取消参观某些景点，请谅解；
        <br>本活动落地参团，不包含机票。可代订灵活机票，直飞或转机，早到或延住，任您选择。
        <br>
      </p>
      <h5 class="ct_title">报名流程：</h5>
      <p
        class="paragraph"
        style="border-bottom:none;"
      >确定行程-填写报名表-交费-办理签证-签订旅游合同-等待成团通知-购买机票-行前说明会及目的地交规说明会-出发</p>
    </div>

    <div class="btn_container clearfix">
      <a target="_blank"@click="showcall=true" class="btn_online fl" id="qa-wangqiao-btn" >
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
        <a class="con-btn  " @click="clickcall('400-118-1388')" >中国咨询</a>
        <a class="con-btn  " @click="clickcall('（001）888-933-0336')" >美国咨询</a>
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
  background: url("../../assets/imgs/custom/store14/14.0.png") no-repeat center
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
