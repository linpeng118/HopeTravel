<template>
  <div>
    <div class="banner">
      <a v-if="!isApp" class="return" @click="goBack" href="javascript:;"></a>
      <span class="title" style="line-height:.8rem;text-align:center;">臻品新西兰南岛12日自驾游</span>
    </div>
    <div class="ct">
      <h5 class="ct_title">行程经典概况：</h5>
      <p class="paragraph">奇景南岛自驾2300公里，慢行漫游，享受田园诗意；
        <br>高性价比当地特色酒店，优先入住最佳景观房型
        <br>拒绝团餐、寻觅博采众家之长的“环太平洋”美食料理
        <br>深入极限运动天堂皇后镇，重温《魔戒》如画奇景
        <br>全程深度游玩纯净南岛风光，提供更多的自由活动时间
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
          <h6 class="date_h6">国内-基督城</h6>
          <p
            class="date_paragraph"
          >参考航班：CZ3418-成都双流19:45-广州白云22:05，CZ617-广州白云+1-00:50-基督城+1-16:10注：本航班是以成都出发为例的参考航班，出发航班以实际购买为准。本行程为基督城落地参团，实际参团旅行从Day2行程开始。
            <br>
            <br>用餐：客人自理
            <br>参考酒店：飞机上
            <br>
          </p>
        </div>
        <div class="day2">
          <h6 class="date_h6">基督城</h6>
          <p class="date_paragraph">当天抵达【基督城】，抵达后办理租车手续，在机场简单路段熟悉车队配合及导航仪、对讲机使用后，驾车前往住宿地休息，调整时差。
            <br>
            <br>用餐：客人自理
            <br>参考酒店：BreakFree on Cashel
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_1.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_2.png"
              alt
            >
          </div>
        </div>
        <div class="day3">
          <h6 class="date_h6">基督城—霍基蒂卡</h6>
          <p
            class="date_paragraph"
          >早上从基督城出发，一路向西，你会看到旁边山坡上各种怪石，这儿就是【城堡山】，电影《纳尼亚传奇》曾在附近取景，巨石形态各异，令人震撼，是所有抱石（bouldering）和攀岩（Rock Climbing）爱好者的好去处，也是世界上最好的抱石和攀岩胜地之一。接着抵达【亚瑟隘口国家公园】、我们精选了一段轻松简单的徒步道，和您一起流连于瀑布和山峦间；最后我们到达【薄饼岩景区】，观赏千层石岩和奇特的垂直喷水石洞。通过风景秀丽的西海岸公路，傍晚时分抵达玉石小镇【霍基蒂卡】。
            <br>
            <br>用餐：客人自理
            <br>参考酒店：Jade Court Motor Lodge
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_3.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_4.png"
              alt
            >
          </div>
        </div>
        <div class="day4">
          <h6 class="date_h6">霍基蒂卡-福克斯冰川</h6>
          <p
            class="date_paragraph"
          >早起后在【霍基蒂卡】海边游玩欣赏日出美景，接着一路南行，感受风景绝美的【新西兰6号公路】，途径【弗朗兹约瑟夫冰川】，最后抵达【福克斯冰川】。我们精选的冰川徒步道路，带您近距离感受湛蓝色冰川的独特魅力。晚上入住福克斯冰川小镇。
            <br>
            <br>用餐：客人自理
            <br>参考酒店：Lake Matheson Motel
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_5.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_6.png"
              alt
            >
          </div>
        </div>
        <div class="day5">
          <h6 class="date_h6">福克斯冰川-瓦纳卡湖</h6>
          <p
            class="date_paragraph"
          >早起后前往【马修森湖】，平静的马修森湖湖面以倒映出库克山和塔斯曼山而闻名，清晨是游览此地的最佳时光。我们不妨来一次步行环湖，体验在森林里醉氧的感觉。然后驾车沿着6号公路继续行驶，经过【哈威亚湖】抵达【瓦纳卡湖】。一路上，【哈威亚湖】还没欣赏完，一个转弯【瓦纳卡湖】又出现在了眼前。俩湖连在一起，你们也许会一路“哇”着过来喔。瓦纳卡群山环抱，高山深湖点缀其间，因而被公认为新西兰风景最优美的地区之一，更是四季宜人的度假胜地。
            <br>
            <br>用餐：客人自理
            <br>参考酒店：Manuka Crescent Motel
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_7.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_8.png"
              alt
            >
          </div>
        </div>
        <div class="day6">
          <h6 class="date_h6">瓦纳卡湖-皇后镇</h6>
          <p class="date_paragraph">早餐后前往【箭镇】，参观70年代首批华人登录【奥塔哥淘金遗址】。傍晚入住【皇后镇】。
            <br>
            <br>用餐：客人自理
            <br>参考酒店：Pinewood Lodge
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_9.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_10.png"
              alt
            >
          </div>
        </div>
        <div class="day7">
          <h6 class="date_h6">皇后镇=蒂阿瑙</h6>
          <p
            class="date_paragraph"
          >今天全天自由活动。推荐行程（以下活动项目均为自选参与项目，报价不包含，我方可提前代订）：皇后镇常被人们誉为新西兰的“冒险之都”，这里有将皇后镇全景尽收眼底的【天空缆车】和被美国广播公司评为“世界最佳景致餐厅”的【平流层餐厅】。周边可以参与各种运动项目和欣赏无限风光:【卡瓦劳大桥】—世界蹦极跳的发源地；或者飞机带你飞至瓦卡蒂普湖盆地（Wakatipubasin）上方，来一场【双人跳伞】，速降过程中可以360度俯瞰壮观的山脉和湖泊美景；乘上【喷射快艇】，在激流中快速穿梭于高山峡谷间；在皇冠峰体验新西兰最高商用机场起飞的【滑翔伞】；或者体验【飞机驾驶】，在这儿只要20分钟就能学会，你可以操控起飞、航行和降落，当然有经验丰富的驾驶员坐在你的身边保证你的安全。这一切得一切都会让你大呼过瘾。自由活动结束后我们将前往蒂阿瑙。
            <br>
            <br>用餐：客人自理
            <br>参考酒店：Pinewood Lodge
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_11.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_12.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_13.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_14.png"
              alt
            >
          </div>
        </div>
        <div class="day8">
          <h6 class="date_h6">蒂阿瑙-米尔福德峡湾-皇后镇</h6>
          <p
            class="date_paragraph"
          >从蒂阿瑙出发，转向94号公路，沿着南岛绝美的米尔福德公路，途径新西兰第三大湖【蒂阿瑙湖】和平静清澈的【镜湖】，抵达【米尔福德峡湾】。在所有宣传新西兰旅游的书籍和画册中，米尔福德峡湾大概是被使用频率最高的图片。这是一段奇妙的高山之旅，自驾前往的游客可在沿途收获迷人的风景，随处下车拍照就是一张明信片。*坐游轮游玩【米尔福德峡湾】，航线一直通往塔斯曼海。游轮会在多个点停靠，以便游客在最佳角度观赏瀑布和企鹅、海豚、海豹等各种海洋动物。（行程升级）PS：米尔福德公路受天气情况影响较大，如遇封路，该日行程变更为皇后镇自由活动
            <br>
            <br>用餐：客人自理
            <br>参考酒店：Pinewood Lodge
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_15.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_16.png"
              alt
            >
          </div>
        </div>
        <div class="day9">
          <h6 class="date_h6">皇后镇-库克山</h6>
          <p
            class="date_paragraph"
          >从皇后镇启程，在中途参观当地【水果小镇Cromwell】，Cromwell主要的产业是水果种植，如果你在夏季来到这里，你会感受到路边水果摊的美味诱惑，这里有地道的水果冰淇淋，还有新西兰著名的麦卢卡蜂蜜产品，也是旅行伴手礼的好选择。随后沿着风光秀美的【普卡基湖】西岸公路前往【库克山国家公园】，体验全球徒步圣地的魅力，步道沿途除了有库克山峰和周围群峰美景相伴，春夏两季青翠的高山草地上还有百合等无数美丽的花朵灿烂相迎，雄伟的【胡克冰川、塔斯曼冰川】近在咫尺，为本已美如画卷的风景又添上了浓重的一笔。此外，这里也是全球第一个【星空保护区】，只要天气晴朗，就能看到非常多的星星和银河，十分壮观。夜宿库克山附近小镇。
            <br>
            <br>用餐：客人自理
            <br>参考酒店：Mountain Chalets Motel
            <br>
          </p>

          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_17.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_18.png"
              alt
            >
          </div>
        </div>
        <div class="day10">
          <h6 class="date_h6">库克山-基督城（350公里 4小时20分 ）</h6>
          <p
            class="date_paragraph"
          >早餐后前往鼎鼎大名的【蒂卡普】小镇，我们到声名远播的【牧羊人教堂】进行祈福，教堂周边的静谧景致如童话一般的美好。接着前往新西兰著名的观星圣地【约翰山顶】，到山顶的“Astro Café”既可以观景，又可以享用餐点，喝个咖啡点些小食，非常惬意。傍晚回到【基督城】
            <br>
            <br>用餐：客人自理
            <br>参考酒店：BreakFree on Cashel
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_19.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_20.png"
              alt
            >
          </div>
        </div>
        <div class="day11">
          <h6 class="date_h6">基督城-国内</h6>
          <p
            class="date_paragraph"
          >参考航班：CZ618-基督城 21:30-广州白云+1-5:30早餐后，推荐游玩【大教堂广场】、【硬纸板教堂】(外观参观)。此外基督城也是新西兰的时尚之都，您也可以选择去【Northlands 北岛购物中心】尽情购物。当晚到达机场办理还车手续，登机回国！
            <br>
            <br>用餐：客人自理
            <br>参考酒店：飞机上
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_21.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store11/d1_22.png"
              alt
            >
          </div>
        </div>
        <div class="day12">
          <h6 class="date_h6">国内</h6>
          <p class="date_paragraph">参考航班：CZ3401-广州白云-8:00+1-成都双流+1-10:30 当天抵达成都，完美结束行程，安全回家。
            <br>
            <br>参考酒店：无
            <br>
          </p>
        </div>
      </div>

      <!-- <h5 class="ct_title">
            酒店信息
        </h5>
        <h6 class="ct_subTitle">
            阿雅娜科莫多维艾齐洙沙滩度假村
        </h6>
        <p class="paragraph">
            欢迎来到阿雅娜科莫多维艾齐洙沙滩度假村。AYANA在巴厘岛和雅加达的酒店以出众的酒店设计、卓越的美食和无与伦比的服务标准闻名于世。阿雅娜科莫多维艾齐洙沙滩度假村于2018年9月开业，拥有13间套房和192间高级客房。受到光线，舒适和开放式生活的启发，每间当代风格的客房都拥有完美的海景，并设有大窗户，可欣赏热带日落的金色光芒，欣赏标志性的库库桑岛。度假村置身于联合国教科文组织世界遗产科莫多公园的环抱中，于得天独厚的地理位置尽享无与伦比的自然风光，丰富多彩的海洋美景令人心驰神往，仅存于当地的科莫多龙让人惊叹不已。
        </p>
        <div>
            <img class="date-img" src="../../assets/imgs/custom/store11/d1_20.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store11/d1_21.png" alt="">   
        </div>
        <h6 class="ct_subTitle">
            巴厘岛阿雅娜度假别墅
        </h6>
        <p class="paragraph">
            度假村位于悬崖峭壁之畔，78栋私人悬崖边别墅均提供绝对私密的环境和具有国际资质的管家提供的贴心服务。　　　　巴厘岛阿雅娜度假别墅享有度假村提供的17所餐厅、酒吧及咖啡屋，Dava莲花餐厅供应一流的新鲜牛排和海鲜烧烤，马丁尼酒吧提供受50种经典和现代式马丁尼鸡尾酒。岩石酒吧是巴厘岛标志性日落观赏地点，入住度假村的客人皆享优先进入岩石酒吧的VIP特权。
        </p>
        <div>
            <img class="date-img" src="../../assets/imgs/custom/store11/d1_22.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store11/d1_23.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store11/d1_24.png" alt="">   
      </div>-->
      <h5 class="ct_title">费用包含</h5>
      <p class="paragraph" style="border-bottom:none;">1、全程住宿：全程为精选当地特色酒店或民宿；
        <br>2、汽车租赁费及随车保险（车辆碰撞险、车辆盗抢险、第三者责任险、境外租车补充全险）（4人一车）；
        <br>3、AXA安盛集团（全球最大保险集团）皇冠级个人旅游保险（含国际救援）；
        <br>4、全程燃油费/停车费/高速通行费/对讲机租赁费/中文导航；
        <br>5、租车公司所需驾照官方翻译件；
        <br>6、行程中所列景点首道门票（特殊说明为自费项目的除外）升级包含米尔福德峡湾游船；
        <br>7、全程优秀中/英双语领队服务费。
        <br>
      </p>
      <h5 class="ct_title">费用不含：</h5>
      <p class="paragraph" style="border-bottom:none;">1、护照、签证等相关证件的费用；
        <br>2、机票及超出机票包含免费行李的行李托运费；
        <br>3、全程餐食自理（新西兰四面环海，丰简由己，早餐约10新西兰元，午餐约20新西兰元，晚餐约20新西兰元。我们提供的酒店大都有厨房，游客可采购当地新鲜特色食材，享受烹饪乐趣）；
        <br>4、停车费、违章罚款及违法驾车造成的保险覆盖范围之外的损失等费用请自理（如在非铺装道路驾车、酒驾、鲁莽驾驶、危险驾驶等行为造成的损失）；
        <br>5、领队服务费每人每天 12 新西兰元；
        <br>6、行程中自由活动时的产生的一切费用请自理；
        <br>7、行程以外的一切私人消费，如酒店内的洗衣费、电话费、饮料、付费电视、行李搬运费以及吸烟罚款等费用，个人消费所引起的小费、出入境的行李海关课税、超重行李的托运费、管理费等；
        <br>8、不可抗拒的客观原因（如天气变化、天灾、战争、罢工等）或航空公司航班延误、取消、领馆签证延误等非我公司原因引起的特殊情况，我公司有权变更或取消行程，由此产生的相关费用（如在外延期签证、食、宿、行一切费用）请自理。
        <br>
      </p>
      <h5 class="ct_title">行程须知：</h5>
      <p class="paragraph" style="border-bottom:none;">
        1、本产品报价是按照2位成人入住1间房计算的价格，如出现单男单女请补缴单房差。
        <br>2、驾车人员须有中国合法有效的驾照原件（驾车人员年龄要求在25岁-65岁之间，不驾车的除外）；
        <br>3、驾车人员须有本人名下有效的国际信用卡 (带有Visa、MasterCard或American Express 等标志，只有银联标志的信用卡无法取车。不驾车的除外)；*根据新西兰法律规定，儿童须配置增高坐垫或座椅，费用请自理（建议自带）；
        <br>4、当地酒店无统一星级评定标准，行程中所列酒店星级表示该酒店具备国内同级酒店的接待水准，具体可在网上查阅评价。
        <br>5、本活动招募人数不足8人时，我社将在出发前20日通知取消该行程，您可以选择延期出发、更改线路或退回所有费用；
        <br>6、本活动为深度自驾，日程中标注的部分酒店在旺季容易满房，部分景点也存在因为天气等原因关闭的情况，因此我社可能会根据实际情况，调整住宿地点（不改变酒店的等级），更换或取消参观景点，请谅解。
        <br>7、本活动落地参团，不包含机票。可代订灵活机票，直飞或转机，早到或延住，任您选择！
        <br>8、1人参团需开车，2-3人参团需至少1人开车，4-5人参团需至少2人开车。自驾领队在各车轮流驾驶/乘坐，确保各车行驶安全。
        <br>9、本旅行社有权根据当日实际情况对行程顺序组合进行调整。
        <br>10、如存在下列情况者，因乙方服务能力所限无法接待：
        <br>（一）病患者、孕妇及行动不便者：1）传染性疾病患者，如传染性肝炎、活动期肺结核、伤寒等传染病人；2）心血管疾病患者，如严重高血压、心功能不全、心肌缺氧、心肌梗塞等病人；3）脑血管疾病患者，如脑栓塞、脑出血、脑肿瘤等病人；4）呼吸系统疾病患者，如肺气肿、肺心病等病人；5）精神病患者，如癫痫及各种精神病人；6）严重贫血病患者，如血红蛋白量水平在50克/升以下的病人；7）大中型手术的恢复期病患者；8）孕妇及行动不便者。
        <br>（二）老年人：1）70周岁以上老年人预订出游，须与乙方签订《健康证明》并有家属或朋友（因服务能力所限无法接待的人除外）陪同方可出游。2）因服务能力所限，无法接待80周岁以上的旅游者报名出游，敬请谅解。
        <br>（三）未成年人：1）未满18周岁的旅游者请由家属（因服务能力所限无法接待的人除外）陪同参团。2）因服务能力所限，无法接待18周岁以下旅游者单独报名出游，敬请谅解。3）因服务能力所限，无法接待2周岁以下儿童报名出游，敬请谅解。四）法律规定的限制出境人员。
        注：本产品最终解释权归创世旅行所有。
        <br>
      </p>
    </div>

    <div class="btn_container clearfix">
      <a
        target="_blank"
        href="http://p.qiao.baidu.com/cps/chat?siteId=12918104&userId=26301226"
        class="btn_online fl"
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
  methods: {
    goBack() {
      window.history.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/custom/index";
.banner {
  background: url("../../assets/imgs/custom/store11/banner.png") no-repeat
    center center/750px 438px;
  width: 750px;
  height: 438px;
  position: relative;
}
</style>