<template>
  <!---->
  <section class="boxlist">

    <van-pull-refresh v-model="isLoading" @refresh="onLoad">
      <template v-for="(item,ind) in list">
        <div :key="ind" class="list-item">
          <p class="item-head">
            <span>订单号：{{item.order_id}}</span>
            <span>产品编号：{{item.product_id}}</span>
          </p>
          <div class="item-con">
            <div class="imgbox">
              <img :src="item.image.replace('https;','https:')" alt="">
            </div>
            <div class="con-right">
              <p v-if="item.product_name" v-html="(item.product_name).length>46?(item.product_name).substr(0,46)+'...':item.product_name"></p>
              <p>出行日期：{{item.product_departure_date.substr(0,10)}}</p>
            </div>
          </div>
          <p class="item-foot">
            <span>
              共计：<i>{{item.order_total}}</i>
            </span>
            <span>
              <button class="btn_pay">去支付</button>
              <button class="btn_else">去支付</button>
            </span>
          </p>
        </div>
      </template>
    </van-pull-refresh>

  </section>
</template>

<script>
  export default {
    components: {
    },
    prop:{
      listx : Object,
    },
    data() {
      return {
        list: [],
        isLoading: false,
      }
    },
    computed: {

    },
    watch:{

    },
    created(){
      this.onLoad();
    },
    mounted() {
    },
    methods: {
      onLoad() {
        let status=this.status;
        setTimeout(() => {
          this.list=[
            {
              "order_id":1111,
              "created":"2018-07-13 01:18:33",
              "status":{
                "code":2,
                "name":"已出行"
              },
              "order_total":"$547.00",
              "status_name":"Pending",
              "product_id":63,
              "product_name":"(6天) 美东经济6日游：世界的中心纽约，美国首都华盛顿，更有雄伟壮观的尼亚加拉大瀑布！【纽约、费城、华盛顿特区、康宁、尼亚加拉大瀑布、波士顿、漩涡公园】",
              "code":"US063",
              "image":"https;//www.tourscool.com/images/product/5b7e55a88be45_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2017-09-08 16:00:00"
            },
            {
              "order_id":1122,
              "created":"2018-07-20 07:16:04",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$645.00",
              "status_name":"",
              "product_id":141,
              "product_name":"(5天)华盛顿 出发美东豪华游【纽约、费城、 康宁玻璃中心、华盛顿特区、尼亚加拉大瀑布、波士顿】",
              "code":"US119",
              "image":"https;//www.tourscool.com/images/product/5b6176857cd65_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2016-12-14 16:00:00"
            },
            {
              "order_id":1123,
              "created":"2018-07-20 07:17:51",
              "status":{
                "code":3,
                "name":"已取消"
              },
              "order_total":"$0.00",
              "status_name":"Cancelled 已为您取消订单",
              "product_id":65,
              "product_name":"(6天) 波士顿出发 美东豪华6天：路将美东景色一网打尽: 纽约, 费城, 华盛顿特区, 康宁, 尼亚加拉大瀑布",
              "code":"6-65",
              "image":"https;//www.tourscool.com/images/product/5b7e56444226e_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2018-07-25 16:00:00"
            },
            {
              "order_id":1124,
              "created":"2018-07-20 07:31:48",
              "status":{
                "code":3,
                "name":"已取消"
              },
              "order_total":"$0.00",
              "status_name":"Cancelled 已为您取消订单",
              "product_id":65,
              "product_name":"(6天) 波士顿出发 美东豪华6天：路将美东景色一网打尽: 纽约, 费城, 华盛顿特区, 康宁, 尼亚加拉大瀑布",
              "code":"6-65",
              "image":"https;//www.tourscool.com/images/product/5b7e56444226e_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2018-07-25 16:00:00"
            },
            {
              "order_id":1125,
              "created":"2018-07-20 07:34:44",
              "status":{
                "code":3,
                "name":"已取消"
              },
              "order_total":"$0.00",
              "status_name":"Cancelled 已为您取消订单",
              "product_id":65,
              "product_name":"(6天) 波士顿出发 美东豪华6天：路将美东景色一网打尽: 纽约, 费城, 华盛顿特区, 康宁, 尼亚加拉大瀑布",
              "code":"6-65",
              "image":"https;//www.tourscool.com/images/product/5b7e56444226e_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2018-07-25 16:00:00"
            },
            {
              "order_id":1126,
              "created":"2018-07-20 07:36:36",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$770.00",
              "status_name":"",
              "product_id":65,
              "product_name":"(6天) 波士顿出发 美东豪华6天：路将美东景色一网打尽: 纽约, 费城, 华盛顿特区, 康宁, 尼亚加拉大瀑布",
              "code":"6-65",
              "image":"https;//www.tourscool.com/images/product/5b7e56444226e_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2018-07-25 16:00:00"
            },
            {
              "order_id":1127,
              "created":"2018-07-20 08:12:59",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$199.00",
              "status_name":"",
              "product_id":253,
              "product_name":"(3天) 大峡谷-拉斯维加斯超值团【洛杉矶、奥特莱斯、胡佛水坝、巧克力工厂、仙人掌花园】",
              "code":"US222",
              "image":"https;//www.tourscool.com/images/product/5b62aae60e9b1_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2017-04-10 16:00:00"
            },
            {
              "order_id":1128,
              "created":"2018-07-22 06:34:13",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$645.00",
              "status_name":"",
              "product_id":141,
              "product_name":"(5天)华盛顿 出发美东豪华游【纽约、费城、 康宁玻璃中心、华盛顿特区、尼亚加拉大瀑布、波士顿】",
              "code":"US119",
              "image":"https;//www.tourscool.com/images/product/5b6176857cd65_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2016-12-14 16:00:00"
            },
            {
              "order_id":1129,
              "created":"2018-07-25 02:53:27",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$1398.00",
              "status_name":"",
              "product_id":204,
              "product_name":"（10天）黄石美西轻松游【拉斯维加斯、大峡谷西缘、羚羊彩穴、黄石公园、总统巨石、纳帕酒庄、旧金山】",
              "code":"US174",
              "image":"https;//www.tourscool.com/images/product/5b5aaa0d77877_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2018-07-25 16:00:00"
            },
            {
              "order_id":1131,
              "created":"2018-07-26 09:22:32",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$3798.00",
              "status_name":"",
              "product_id":863,
              "product_name":"(8天) 檀香山出发-挪威游轮夏威夷航线 阳光和煦邮轮8天7夜：茂宜岛, 希洛, 可爱岛, 柯纳",
              "code":"US ",
              "image":"https;//www.tourscool.com/images/product/59f19e2108154_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2018-07-27 16:00:00"
            },
            {
              "order_id":1132,
              "created":"2018-07-26 10:35:35",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$1120.00",
              "status_name":"",
              "product_id":65,
              "product_name":"(6天) 波士顿出发 美东豪华6天：路将美东景色一网打尽: 纽约, 费城, 华盛顿特区, 康宁, 尼亚加拉大瀑布",
              "code":"6-65",
              "image":"https;//www.tourscool.com/images/product/5b7e56444226e_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2018-07-25 16:00:00"
            },
            {
              "order_id":1133,
              "created":"2018-07-26 11:00:30",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$770.00",
              "status_name":"",
              "product_id":383,
              "product_name":"（6天）美东精选豪华游：纽约，费城，华盛顿特区，康宁，尼加拉大瀑布，波士顿",
              "code":"6-383",
              "image":"https;//www.tourscool.com/images/product/5b641db91a93b_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2017-08-21 16:00:00"
            },
            {
              "order_id":1137,
              "created":"2018-07-27 05:23:29",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$770.00",
              "status_name":"",
              "product_id":65,
              "product_name":"(6天) 波士顿出发 美东豪华6天：路将美东景色一网打尽: 纽约, 费城, 华盛顿特区, 康宁, 尼亚加拉大瀑布",
              "code":"6-65",
              "image":"https;//www.tourscool.com/images/product/5b7e56444226e_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2018-07-25 16:00:00"
            },
            {
              "order_id":1140,
              "created":"2018-08-02 06:26:01",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$897.00",
              "status_name":"",
              "product_id":382,
              "product_name":"(6天) 年度爆款-美东精选接送超值游：畅游美东四大名城,震撼尼亚加拉大瀑布,奇幻康宁玻璃中心",
              "code":"6-382",
              "image":"https;//www.tourscool.com/images/product/5b5edf7e6ad0f_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2017-03-13 16:00:00"
            },
            {
              "order_id":1141,
              "created":"2018-08-02 06:30:57",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$868.00",
              "status_name":"",
              "product_id":252,
              "product_name":"（7天）美西大峡谷-南加主题项目游【旧金山、洛杉矶、拉斯维加斯、优胜美地、胡佛水坝、南加主题自选】",
              "code":"US221",
              "image":"https;//www.tourscool.com/images/product/5b7d5877a06a6_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2018-08-08 16:00:00"
            },
            {
              "order_id":1143,
              "created":"2018-08-13 05:14:33",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$578.00",
              "status_name":"",
              "product_id":17,
              "product_name":"(4天) 五彩黄石精品小环线：大提顿国家公园、黄石湖、大棱镜温泉、黄石瀑布、老忠实间歇泉、杰克逊小镇、大盐湖",
              "code":"US017",
              "image":"https;//www.tourscool.com/images/product/5b6aa975e1296_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2016-07-27 16:00:00"
            },
            {
              "order_id":1164,
              "created":"2018-08-20 06:56:15",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$645.00",
              "status_name":"",
              "product_id":381,
              "product_name":"(5天)美东新推豪华游：纽约，费城，华盛顿特区，康宁，尼加拉大瀑布",
              "code":"6-381",
              "image":"https;//www.tourscool.com/images/product/5b7e57410dc36_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2018-08-26 16:00:00"
            },
            {
              "order_id":1165,
              "created":"2018-08-20 07:25:43",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$638.00",
              "status_name":"",
              "product_id":382,
              "product_name":"(6天) 年度爆款-美东精选接送超值游：畅游美东四大名城,震撼尼亚加拉大瀑布,奇幻康宁玻璃中心",
              "code":"6-382",
              "image":"https;//www.tourscool.com/images/product/5b5edf7e6ad0f_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2017-03-13 16:00:00"
            },
            {
              "order_id":1166,
              "created":"2018-08-20 07:30:28",
              "status":{
                "code":2,
                "name":"已出行"
              },
              "order_total":"$0.00",
              "status_name":"To Void",
              "product_id":54,
              "product_name":"(4天)迈阿密欢乐巴士游：畅游 大沼泽国家公园,西礁岛,棕榈滩,罗德岱堡,海明威故居",
              "code":"6-54",
              "image":"https;//www.tourscool.com/images/product/5b7d5351b1345_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2016-11-16 16:00:00"
            },
            {
              "order_id":1167,
              "created":"2018-08-20 07:59:57",
              "status":{
                "code":3,
                "name":"已取消"
              },
              "order_total":"$0.00",
              "status_name":"Cancelled 已为您取消订单",
              "product_id":65,
              "product_name":"(6天) 波士顿出发 美东豪华6天：路将美东景色一网打尽: 纽约, 费城, 华盛顿特区, 康宁, 尼亚加拉大瀑布",
              "code":"6-65",
              "image":"https;//www.tourscool.com/images/product/5b7e56444226e_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2018-07-25 16:00:00"
            },
            {
              "order_id":1168,
              "created":"2018-08-20 08:13:16",
              "status":{
                "code":2,
                "name":"已出行"
              },
              "order_total":"$0.00",
              "status_name":"To Void",
              "product_id":65,
              "product_name":"(6天) 波士顿出发 美东豪华6天：路将美东景色一网打尽: 纽约, 费城, 华盛顿特区, 康宁, 尼亚加拉大瀑布",
              "code":"6-65",
              "image":"https;//www.tourscool.com/images/product/5b7e56444226e_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2018-07-25 16:00:00"
            },
            {
              "order_id":1182,
              "created":"2018-08-22 09:02:13",
              "status":{
                "code":2,
                "name":"已出行"
              },
              "order_total":"$0.00",
              "status_name":"To Void",
              "product_id":685,
              "product_name":"(7天) 美东深度两天名校游：纽约，费城，华盛顿，康宁玻璃中心，尼亚加拉大瀑布，波士顿",
              "code":"6-685",
              "image":"https;//www.tourscool.com/images/product/5b7e66cbea465_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2017-10-26 16:00:00"
            },
            {
              "order_id":1203,
              "created":"2018-08-27 09:05:34",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$1403.00",
              "status_name":"",
              "product_id":518,
              "product_name":"(10天)美西原生态体验豪华团: 绝美黄石公园,秀美太浩湖.撼人心魄大峡谷.摄影佳境羚羊彩穴.赌城拉斯维加斯",
              "code":"US478",
              "image":"https;//www.tourscool.com/images/product/5b7d562e35ce8_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2017-09-19 16:00:00"
            },
            {
              "order_id":1219,
              "created":"2018-09-03 06:07:24",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$128.00",
              "status_name":"",
              "product_id":571,
              "product_name":"(1天) 拉斯维加斯当地参团：羚羊彩穴，马蹄湾，格兰水坝精华游",
              "code":"4-571",
              "image":"https;//www.tourscool.com/images/product/5bf21f4fa3d5e_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2017-03-15 16:00:00"
            },
            {
              "order_id":1220,
              "created":"2018-09-03 06:54:01",
              "status":{
                "code":2,
                "name":"已出行"
              },
              "order_total":"$0.00",
              "status_name":"To Void",
              "product_id":571,
              "product_name":"(1天) 拉斯维加斯当地参团：羚羊彩穴，马蹄湾，格兰水坝精华游",
              "code":"4-571",
              "image":"https;//www.tourscool.com/images/product/5bf21f4fa3d5e_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2017-03-15 16:00:00"
            },
            {
              "order_id":1222,
              "created":"2018-09-03 07:38:38",
              "status":{
                "code":2,
                "name":"已出行"
              },
              "order_total":"$0.00",
              "status_name":"To Void",
              "product_id":571,
              "product_name":"(1天) 拉斯维加斯当地参团：羚羊彩穴，马蹄湾，格兰水坝精华游",
              "code":"4-571",
              "image":"https;//www.tourscool.com/images/product/5bf21f4fa3d5e_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2017-03-15 16:00:00"
            },
            {
              "order_id":1224,
              "created":"2018-09-03 11:50:32",
              "status":{
                "code":2,
                "name":"已出行"
              },
              "order_total":"$0.00",
              "status_name":"To Void",
              "product_id":571,
              "product_name":"(1天) 拉斯维加斯当地参团：羚羊彩穴，马蹄湾，格兰水坝精华游",
              "code":"4-571",
              "image":"https;//www.tourscool.com/images/product/5bf21f4fa3d5e_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2017-03-15 16:00:00"
            },
            {
              "order_id":1246,
              "created":"2018-09-14 08:18:42",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$1273.30",
              "status_name":"",
              "product_id":653,
              "product_name":"(11天)探寻美西生态巡游：优胜美地、羚羊彩穴、马蹄湾、黄石公园、大提顿、大峡谷、大盐湖、一号公路、金门大桥",
              "code":"US611",
              "image":"https;//www.tourscool.com/images/product/5b62ac3085a07_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2017-06-11 16:00:00"
            },
            {
              "order_id":1251,
              "created":"2018-09-20 03:08:34",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$641.52",
              "status_name":"",
              "product_id":70,
              "product_name":"(5天) 迈阿密+大沼泽国家公园+罗德岱堡+墨西哥白沙滩5日游 天天出发，畅游全美最好的沙滩-墨西哥湾白沙滩，探访冬季白宫-海湖庄园 免费机场/码头接送",
              "code":"6-70",
              "image":"https;//www.tourscool.com/images/product/5b7d547bc237e_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2018-03-13 16:00:00"
            },
            {
              "order_id":1284,
              "created":"2018-10-23 10:18:37",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$1348.00",
              "status_name":"",
              "product_id":818,
              "product_name":"(8天)【冬季黄石】黄石公园+羚羊彩穴+布莱斯峡谷+国王山庄+盐湖城+大峡谷",
              "code":"9-818",
              "image":"https;//www.tourscool.com/images/product/5bc7f43adde01_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2018-12-21 16:00:00"
            },
            {
              "order_id":1561,
              "created":"2019-01-10 08:00:14",
              "status":{
                "code":0,
                "name":"待支付"
              },
              "order_total":"$78.39",
              "status_name":"",
              "product_id":1740,
              "product_name":"新西兰北岛罗托鲁瓦天空缆车山顶自助午餐/晚餐/品酒·含天空缆车往返票",
              "code":"29-1740",
              "image":"https;//www.tourscool.com/images/product/5c2cacf4392c8_800_800.jpg",
              "type":"tour",
              "product_departure_date":"2019-01-14 16:00:00"
            }
          ];
          this.$toast('刷新成功');
          this.isLoading = false;
        }, 100);
      }
    }
  }

</script>

<style lang="scss" scoped>
  .boxlist{
    padding:28px 32px;
    width: 100%;
    box-sizing: border-box;
  }
  .list-item{
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 24px;
    background:rgba(255,255,255,1);
    opacity:1;
    border-radius:8px;
  }
  .item-head{
    width: 100%;
    height: 72px;
    padding: 0 32px;
    box-sizing: border-box;

  }
  .item-con{
    width: 100%;
    height: 186px;
    border-top:1px solid rgba(228,228,228,1);
    border-bottom:1px solid rgba(228,228,228,1);
    padding: 22px 32px;
    box-sizing: border-box;
  }
  .item-foot{
    width: 100%;
    height: 84px;
    padding: 0 32px;
    box-sizing: border-box;
  }
  .item-foot span:nth-child(1){
    color:#989898;
    line-height:84px;
    font-size: 20px;
    float: left;
    width: 50%;
  }
  .item-foot span:nth-child(2){
    float: right;
    line-height:84px;
    width: 50%;
    text-align: right;
    height: 84px;
  }
  .item-foot>span:nth-child(1)>i{
    color:#FF5454;
    font-size: 32px;
    font-style: normal;
  }
  .btn_pay{
    width:120px;
    height:44px;
    background:rgba(255,84,84,1);
    opacity:1;
    float: right;
    margin-top: 20px;
    text-align: center;
    line-height: 44px;
    font-size: 24px;
    color: #fff;
    border-radius:22px;
  }

  .btn_else{
    width:120px;
    height:44px;
    background:#989898;
    opacity:1;
    float: right;
    margin-top: 20px;
    text-align: center;
    line-height: 44px;
    font-size: 24px;
    color: #fff;
    border-radius:22px;
  }

  .item-head span:nth-child(1){
    width: 50%;
    height: 72px;
    line-height: 72px;
    float: left;
    color: #399EF6;
    font-size: 22px;

  }
  .item-head span:nth-child(2){
    width: 50%;
    height: 72px;
    line-height: 72px;
    float: right;
    color: #5E5E5E;
    text-align: right;
    font-size: 22px;
    }
  .imgbox{
    width: 208px;
    height: 144px;
    background-color: #333;
    float: left;
  }
  .imgbox img{
    width: 208px;
    height: 144px;
  }
  .con-right{
    width: 388px;
    float: right;
    height: 144px;
  }
  .con-right p:nth-child(1){
    color:#191919;
    font-size: 24px;
    height: 100px;
    margin-bottom: 20px;
  }
  .con-right p:nth-child(2){
    color: #989898;
    font-size: 24px;
  }



</style>
