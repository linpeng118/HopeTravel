<template>
  <div>
    <div class="banner">
      <a v-if="!isApp" class="return" @click="goBack" href="javascript:;"></a>
      <span class="title">快乐活</span>
    </div>
    <div class="ct">
      <h5 class="ct_title">为什么值得去</h5>
      <p class="paragraph">成都直飞苏梅岛，阳光沙滩一瞬即达。精选度假村，W酒店下午茶苏梅本岛+隐谧离岛，更多私密，更多奢享 潜最美丽的海底，享最细腻的沙滩</p>
      <h5 class="ct_title">行程概览</h5>
      <p class="paragraph">2晚苏梅岛+3晚涛岛 机票，酒店，接送，下午茶</p>
      <h5 class="ct_title">行程详情</h5>
      <div class="date">
        <div class="day1">
          <h6 class="date_h6">成都双流国际机场 – 苏梅岛 / 具体出团时间以出团通知书为准</h6>
          <p
            class="date_paragraph"
          >早晨，我们将在成都双流国际机场集合。为了不耽误您的行程，请您准时按照出团通知书的时间抵达集合地点。办理登机手续，准备起飞。搭乘航空为曼谷航空，直飞苏梅岛。
            <br>参考航班时间：成都-苏梅岛 PG832 05:30-07:50，飞行时间约为3.5小时。苏梅岛与北京时间，时差为1小时。抵达苏梅岛后，司机接机，送到酒店休息。自由活动。
            <br>
            <br>早餐：自理 午餐：自理 晚餐：自理 住宿：诺富特度假村
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store4/4.1.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store4/4.2.png"
              alt
            >
          </div>
        </div>
        <div class="day2">
          <h6 class="date_h6">苏梅岛</h6>
          <p
            class="date_paragraph"
          >上午自由活动。下午特别为您安排了W酒店W RETREAT ——时尚七彩缤纷下午茶。做为引领时尚潮流W RETREAT 在苏梅岛也是非常独树一帜的。海天一线无敌海景让多少来苏梅岛的网红们趋之若鹜，每天位置都很难订，一位难求。WRETREAT的下午茶几乎成为所有来苏梅旅游度假必来的圣地。我们的司机将接您前往W度假村，品尝精致的下午茶点，随后再送您返回酒店。
            <br>
            <br>早餐：酒店含早 午餐：自理 下午茶：W酒店下午茶 晚餐：自理 住宿：诺富特度假村
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store4/4.3.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store4/4.4.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store4/4.5.png"
              alt
            >
          </div>
        </div>
        <div class="day3">
          <h6 class="date_h6">苏梅岛 – 涛岛</h6>
          <p
            class="date_paragraph"
          >上午自由活动。中午，司机在酒店接您和同伴前往码头，搭乘渡轮前往涛岛。船程约1.5小时。涛岛相对于苏梅本岛来说，更加原始，商业更不发达，正因如此，涛岛保持的较原始的美貌，很多小伙伴会义无反顾的喜欢上这里。涛岛以潜水，以及潜水学校著名。除了潜水，这里还可以体验：泰拳、攀岩、自由潜、风筝冲浪、尾波滑水、海钓、烹饪等等丰富活动。下午自由活动。
            <br>
            <br>早餐：酒店含早 午餐：自理 晚餐：自理 住宿：涛岛海滩度假别墅
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store4/4.6.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store4/4.7.png"
              alt
            >
          </div>
        </div>
        <div class="day4">
          <h6 class="date_h6">涛岛</h6>
          <p class="date_paragraph">自由活动。
            <br>
            <br>早餐：酒店含早 午餐：自理 晚餐：自理 住宿：涛岛海滩度假别墅
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store4/4.8.png"
              alt
            >
            <img
              class="date-img2"
              src="../../assets/imgs/custom/store4/4.9.png"
              alt
            >
            <img
              class="date-img2"
              src="../../assets/imgs/custom/store4/4.10.png"
              alt
            >
          </div>
        </div>
        <div class="day5">
          <h6 class="date_h6">涛岛</h6>
          <p class="date_paragraph">自由活动。
            <br>
            <br>早餐：酒店含早 午餐：自理 晚餐：自理 住宿：涛岛海滩度假别墅
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store4/4.11.png"
              alt
            >
            <img
              class="date-img2"
              src="../../assets/imgs/custom/store4/4.12.png"
              alt
            >
            <img
              class="date-img2"
              src="../../assets/imgs/custom/store4/4.13.png"
              alt
            >
          </div>
        </div>
        <div class="day6">
          <h6 class="date_h6">涛岛 – 苏梅岛 – 成都</h6>
          <p class="date_paragraph">上午自由活动。
            <br>下午，司机将在酒店接您，前往涛岛码头，搭乘渡轮返回苏梅岛。抵达苏梅岛码头后，司机将送您
            <br>和同伴前往苏梅岛机场，搭乘航班返回成都。
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store4/4.14.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store4/4.15.png"
              alt
            >
          </div>
        </div>
      </div>
      <p class="paragraph">注：以上行程中所列仅为参考时间，在不减少行程景点的前提下，公司有权对上述行程的次序、景点，依照当地情况进行调整！</p>
      <h5 class="ct_title" style="margin-top: 0.3rem;">酒店信息</h5>
      <h6 class="ct_subTitle">苏梅岛查汶海滩坎达布里诺富特度假村</h6>
      <p
        class="paragraph"
      >苏梅岛查汶海滩坎达布里诺富特度假村坐落于查汶海滩，优越的地理位置使它成为苏梅岛一个令人向往的住宿选择。 酒店距离苏梅岛机场仅有1km。在该地区观光很容易，Star Pilates & Fitness by Lisa、拉瓦那度假村SPA和艾兰达草本水疗都在酒店附近。从酒店出发可方便前往市内的众多著名景点，包括金泰菩泰式按摩、EasyFly - Indoor Skydiving和Escapade Samui。</p>
      <div style="text-align: center">
        <img
          class="date-img"
          src="../../assets/imgs/custom/store4/4.16.png"
          alt
        >
        <img
          class="date-img"
          src="../../assets/imgs/custom/store4/4.17.png"
          alt
        >
        <img
          class="date-img"
          src="../../assets/imgs/custom/store4/4.18.png"
          alt
        >
      </div>

      <h6 class="ct_subTitle">涛岛海滩度假别墅</h6>
      <p
        class="paragraph"
      >涛岛海滩度假别墅坐落在涛岛的私家海滩上，位于鲨鱼湾，周围环绕着棕榈树林。酒店靠近Mae Haad Pier码头。涛岛海滩度假别墅提供舒适私密的环境，设有宽敞的室外休息区、私人浴室、乡村风格的木制家具、电视、迷你吧和吹风机。提供带私人阳台的宽敞别墅和覆盖公共区域的免费有线网络连接。客人可在酒店内享受传统的泰式按摩服务。旅游咨询台可安排各种活动，如徒步旅行、划独木舟、山地自行车和瑜伽课程。前台可提供浮潜设备。</p>
      <div style="text-align: center">
        <img
          class="date-img"
          src="../../assets/imgs/custom/store4/4.19.png"
          alt
        >
        <img
          class="date-img"
          src="../../assets/imgs/custom/store4/4.20.png"
          alt
        >
        <img
          class="date-img"
          src="../../assets/imgs/custom/store4/4.21.png"
          alt
        >
      </div>

      <h6 class="ct_subTitle">涛岛度假别墅潜水实拍图</h6>
      <div style="text-align: center">
        <img
          class="date-img"
          src="../../assets/imgs/custom/store4/4.22.png"
          alt
        >
        <img
          class="date-img"
          src="../../assets/imgs/custom/store4/4.23.png"
          alt
        >
      </div>

      <h5 class="ct_title">费用包含</h5>
      <p class="paragraph" style="border-bottom:none;">1. 成都往返苏梅岛经济舱机票含税；
        <br>2. 苏梅岛往返涛岛渡轮船票含税；
        <br>3. 2晚苏梅岛查汶海滩坎达布里诺富特度假村住宿；
        <br>4. 3晚涛岛海滩度假别墅住宿；
        <br>5. 每日早餐；
        <br>6. 苏梅岛W酒店下午茶（双人份）；
        <br>7. 境外全程接送机服务。
        <br>
      </p>
      <h5 class="ct_title">费用不含</h5>
      <p class="paragraph" style="border-bottom:none;">1. 护照费用；
        <br>2. 酒店内电话、传真、洗熨、收费电视、饮料等费用；
        <br>3. 费用包含中未提到的其他一切费用；
        <br>4. 洗衣，理发，电话，饮料，烟酒，付费电视，行李搬运等私人费用；
        <br>5. 旅游费用不包括旅游者因违约、自身过错、自由活动期间内行为或自身疾病引起的人身和财产损失；
        <br>6. 单房差；
        <br>7. 签证费。
        <br>
      </p>
    </div>

    <div class="btn_container clearfix">
      <a
        target="_blank"
        class="btn_online fl"
        id="qa-wangqiao-btn"
        @click="onlineCounsel"
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
import onCustomerService from '@/assets/js/customerService.js'

export default {
  name: "component_name",
  data() {
    return {
      isApp: this.$route.query.platform,
    };
  },
  methods: {
    goBack() {
      window.history.go(-1);
    },
    // 在线咨询
    onlineCounsel() {
      onCustomerService()
    },
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/style/custom/index';

.banner {
  background: url("../../assets/imgs/custom/store4/4.0.png") no-repeat center
    center/750px 438px;
  width: 750px;
  height: 438px;
  position: relative;
}
</style>