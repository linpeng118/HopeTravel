<template>
  <div>
    <div class="banner">
      <a v-if="!isApp" class="return" @click="goBack" href="javascript:;"></a>
      <span class="title" style="line-height:.8rem;text-align:center;">黄石大提顿国家公园+洛杉矶8天6晚私家小团</span>
    </div>
    <div class="ct">
      <h5 class="ct_title">为什么值得去</h5>
      <p class="paragraph">黄石/大提顿小镇三晚住宿，愉快畅游公园N大景区
        <br>3车舒适纯玩自驾小团，无旅游商店购物和额外收费
        <br>洛杉矶1整天自由活动、感受天使之城的慢节奏
        <br>门票+巨无霸越野车+燃油+豪华保险套餐+机票全包
        <br>全程专业自驾领队24小时陪同，省心省力、安全无忧
        <br>
      </p>
      <h5 class="ct_title">行程概览</h5>
      <!-- <p class="paragraph">
            巴厘岛、科莫多国家公园、粉色沙滩、科莫多龙、浮潜
        </p>
        <h5 class="ct_title">
            行程详情
      </h5>-->
      <div class="date">
        <div class="day1">
          <h6 class="date_h6">国内-洛杉矶 （市区短途驾驶）</h6>
          <p
            class="date_paragraph"
          >搭乘国际航班飞抵天使之城洛杉矶，根据时间游玩【格里菲斯公园】，格里菲斯公园是世界著名的天文台之一，并与好莱坞山上的“HOLLYWOOD”标志遥遥相对，作为洛杉矶地标性的建筑，成为《007黄金眼》《变形金刚》等电影的外景拍摄地。黄昏时分在此眺望，万家灯火的洛杉矶笼罩在落日余晖之中更显辉煌壮阔。随后前往酒店休息，调整时差。
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store12/d1_1.png"
              alt
            >
          </div>
        </div>
        <div class="day2">
          <h6 class="date_h6">洛杉矶Los Angeles（自由活动）</h6>
          <p
            class="date_paragraph"
          >白天推荐在【环球影城】游玩（门票费用自理）。晚上参观【好莱坞星光大道】。这里有中国剧院、明星手印、奥斯卡金像奖颁奖礼的举行地点-【杜比剧院】等好莱坞著名景点！
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store12/d1_2.png"
              alt
            >
          </div>
        </div>
        <div class="day3">
          <h6 class="date_h6">洛杉矶 - 盐湖城 – 爱达何瀑布市（驾驶里程350公里 3.5小时车程）</h6>
          <p
            class="date_paragraph"
          >乘坐美国内陆段航班前往“2002年冬奥会举办城市”盐湖城，机场取车后，参观犹他州最热门的旅游景点【摩门教圣殿】（外观）、【犹他州议会大厦】（外观）。随后一路北上，夜宿爱达何瀑布市。
            <br>
            <br>参考酒店：爱达荷Shilo Inn idaho Falls或同级
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store12/d1_3.png"
              alt
            >
          </div>
        </div>
        <div class="day4">
          <h6 class="date_h6">爱达荷瀑布市 – 黄石国家公园（300公里 3小时车程）</h6>
          <p class="date_paragraph">驱车从西门进入【黄石国家公园】，上午游览【诺里斯间歇泉盆地】，下午主要游览【黄石大峡谷】，观看峡谷和瀑布。夜宿黄石小镇。
            <br>
            <br>参考酒店：黄石Yellowstone Lodge或同级
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store12/d1_4.png"
              alt
            >
          </div>
        </div>
        <div class="day5">
          <h6 class="date_h6">黄石国家公园 - 大提顿国家公园 - 杰克逊小镇（200公里 3小时车程）</h6>
          <p
            class="date_paragraph"
          >今天继续游览黄石公园，包括著名的【大棱镜彩泉】、【老忠实喷泉】、【黄石湖】等多处著名景观，下午从黄石公园南门出园，驾车参观【大提顿国家公园】、夜宿杰克逊小镇。
            <br>
            <br>参考酒店：杰克逊Hampton Inn Jackson Hole或同级
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store12/d1_5.png"
              alt
            >
          </div>
        </div>
        <div class="day6">
          <h6 class="date_h6">杰克逊 – 盐湖城 （450公里 5小时车程）</h6>
          <p class="date_paragraph">返回盐湖城。途中参观游玩【羚羊岛州立公园】，抵达后去盐湖城【奥特莱斯】尽情购物。
            <br>参考酒店：盐湖城Ramada Salt lake city或同
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store12/d1_6.png"
              alt
            >
          </div>
        </div>
        <div class="day7">
          <h6 class="date_h6">盐湖城 – 洛杉矶 - 国内</h6>
          <p class="date_paragraph">机场还车、启程回国
            <br>
          </p>
        </div>
        <div class="day8">
          <h6 class="date_h6">国内</h6>
          <p class="date_paragraph">抵达成都、回到温暖的家。
            <br>
          </p>
        </div>
      </div>

      <!-- <h5 class="ct_title">
            参考下榻酒店
        </h5>
        <h6 class="ct_subTitle">
            Hilton Tokyo Bay（东京湾希尔顿酒店）
        </h6>
        <p class="paragraph">
            东京湾希尔顿酒店是东京迪士尼度假区的官方酒店，坐落在东京湾的东岸，在 JR 舞滨站南口的 welcome center（营 业时间 8 点-15 点） 客人可以在此直接办理酒店入住手续以及行李寄存，行李会直接送往酒店。从酒店出发可乘坐 迪士尼小火车前往乐园，酒店亦提供免费接驳巴士到 JR 舞滨站。不论您是商务出差还是休闲旅游千叶东京湾希尔 顿酒店(Hilton Tokyo Bay Chiba)都是理想的下榻之处。附近很多景点，包括东京迪士尼乐园、东京迪士尼海洋和冲绳 迪斯尼伊克斯皮儿莉购物中心都离酒店不远，酒店的园景房一侧还可以看到迪士尼乐园的烟火。
        </p>
        <div>
            <img class="date-img" src="../../assets/imgs/custom/store12/d1_19.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store12/d1_20.png" alt="">
        </div>
        <h6 class="ct_subTitle">
            Kaneyamaen （鐘山苑）
        </h6>
        <p class="paragraph">
            鐘山苑有 106 间装修精美的客房，大部分都配有平板电视, 额外浴室, 空气净化器, 免费速溶咖啡, 免费茶水。 酒 店的娱乐设施相当齐全，包括温泉 , 室外游泳池, 水疗中心, 按摩, 花园。 钟山苑酒店地理位置优越，设施优良， 各方面均为理想之选。
        </p>
        <div>
            <img class="date-img" src="../../assets/imgs/custom/store12/d1_21.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store12/d1_22.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store12/d1_23.png" alt="">
        </div>
        <h6 class="ct_subTitle">
          Imperial Hotel Osaka（大阪帝国酒店）
        </h6>
        <p class="paragraph">
            大阪帝国酒店是一家享有盛誉的五星级酒店，坐落在以美丽樱花而闻名的大川河（Okawa River）河畔。 酒店设有众多娱乐设施 。Les Saison 餐厅享有城市全景，供应精致的法国美食。Kamon 餐厅供应新鲜的海产品和铁 板烧风格牛排。Jasmine Garden 餐厅供应奢华的中式菜肴。
        </p>
        <div>
            <img class="date-img" src="../../assets/imgs/custom/store12/d1_24.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store12/d1_25.png" alt="">
      </div>-->
      <h5 class="ct_title">费用包含</h5>
      <p
        class="paragraph"
        style="border-bottom:none;"
      >1. 全程经济舱机票：1.成都-洛杉矶 2.洛杉矶-盐湖城 3.盐湖城-洛杉矶 4.洛杉矶-成都
        <br>2. 全程住宿：精选Quality Inn、Days Inn、Best Westen或同级别3星品质酒店
        <br>3. 自助早餐：全程绝大多数酒店含早；
        <br>4. 汽车租赁费、异地还车费及随车保险（不限里程、车损或盗抢不计免赔，第三者100万美元、各种税费）；
        <br>5. 全程燃油费、过路费、停车费；
        <br>6. 对讲机、中文导航仪租借费；
        <br>7. 租车公司官方翻译件费用；
        <br>8. 行程中所列景点首道门票：黄石国家公园、大提顿国家公园、羚羊岛州立公园；
        <br>9. 全程领队司机兼导游服务费；
        <br>10. 安盛（全球最大保险集团）天平智行天下旅游保险-皇冠计划（含国际救援）
        <br>
      </p>
      <h5 class="ct_title">费用不含：</h5>
      <p class="paragraph" style="border-bottom:none;">1. 护照、签证等相关证件的费用；
        <br>2. 机票费用及超出机票包含免费行李的行李托运费；
        <br>3. 午餐、晚餐及部分早餐餐食费用自理（走到哪吃到哪儿，丰简由己，午餐约10美金，晚餐约15美金+）；
        <br>4. 停车费及违章罚款等费用（若产生请自理）；
        <br>5. 自驾领队小费每人每天10美金；
        <br>6. 行程中自由活动时的产生的一切费用请自理；
        <br>7. 行程以外的一切私人消费，如酒店内的洗衣费、电话费、饮料、付费电视、行李搬运费以及吸烟罚款等费用，个人消费所引起的小费、出入境的行李海关课税、超重行李的托运费、管理费等；
        <br>8. 不可抗拒的客观原因（如天灾、战争、罢工等）或航空公司航班延误、取消、领馆签证延误等非我公司原因引起的特殊情况，我公司有权变更或取消行程，由此产生的相关费用（如9. 在外延期签证、食、宿、行一切费用）请自理；
        <br>10. 本合同中未提及的其他费用。
        <br>
      </p>
      <h5 class="ct_title">服务标准说明：</h5>
      <p class="paragraph" style="border-bottom:none;">
        1.本产品报价是按照2位成人入住一间房计算的价格，如出现单男单女请补缴单房差。
        <br>驾车人员须有中国合法有效的驾照原件（驾车人员年龄要求在25岁-65岁之间，不驾车的除外）；
        2.驾车人员须有本人名下有效的国际信用卡 (带有Visa、MasterCard标志，只有银联标志的信用卡无法取车。不驾车的除外)；
        根据美国法律规定，12岁以下且身高不足1.5米的儿童须配置增高坐垫或座椅，费用请自理（建议自带）；
        <br>3. 2-4人参团需至少1人开车，5-8人参团需至少2人开车；
        <br>4. 当地酒店无统一星级评定标准，行程中所列酒店星级表示该酒店具备国内同级酒店的接待水准，具体可在网上查阅评价。
        <br>5. 本活动招募人数不足4人时，我社将取消该行程，您可以选择延期出发、更改线路或退回所有费用；
        <br>6. 本活动为深度自驾，日程中标注的部分酒店在旺季容易满房，部分景点也存在因为天气等原因关闭的情况，因此我社可能会根据实际情况，调整住宿地点（不改变酒店的等级），更换或取消参观某些景点，请谅解；
        <br>7. 本活动落地参团，不包含机票。可代订灵活机票，直飞或转机，早到或延住，任您选择。
        <br>
      </p>
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
        <a v-if="!isApp" class="con-btn  " @click="clickcall('400-118-1388')" >中国客服</a>
        <a v-if="!isApp" class="con-btn  " @click="clickcall('（001）888-933-0336')" >美国客服</a>
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
  background: url("../../assets/imgs/custom/store12/banner.png") no-repeat
    center center/750px 438px;
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
