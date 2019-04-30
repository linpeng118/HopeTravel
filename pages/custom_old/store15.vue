<template>
  <div>
    <div class="banner">
      <a v-if="!isApp" class="return" @click="goBack" href="javascript:;"></a>
      <span class="title" style="line-height:.8rem;text-align:center;">美西国家公园
        <br>大环线全景自驾14日
      </span>
    </div>
    <div class="ct">
      <!-- <h5 class="ct_title">
            为什么值得去
        </h5>
        <p class="paragraph">
            黄石/大提顿小镇三晚住宿，愉快畅游公园N大景区<br>
            3车舒适纯玩自驾小团，无旅游商店购物和额外收费<br>
            洛杉矶1整天自由活动、感受天使之城的慢节奏<br>
            门票+巨无霸越野车+燃油+豪华保险套餐+机票全包<br>
            全程专业自驾领队24小时陪同，省心省力、安全无忧<br>
      </p>-->
      <h5 class="ct_title">行程概览</h5>
      <p class="paragraph">大峡谷国家公园+拱门国家公园+布莱斯国家公园+死亡谷国家公园；
        <br>游览摄影圣地-羚羊谷+马蹄湾+美国西部永恒的象征-纪念碑谷+阿甘路；
        <br>穿越66号公路时光隧道，重回美国西部牛仔风行时代；
        <br>美西经典城市洛杉矶三晚、拉斯维加斯两晚，深度体验之旅；
        <br>美西最大的奥特莱斯，各种大牌特价，一天的轻松购物时间；
        <br>轻松纯玩自驾小分队，无旅游商店购物或额外收费项目；
        <br>全程专业自驾向导7X24小时陪同，省心省力、安全无忧。
        <br>
      </p>
      <h5 class="ct_title">行程基本信息：</h5>
      <p class="paragraph">出行方式：落地跟队自驾，全程专业自驾领队护航，省心省力，安全无忧
        <br>住宿品质：洛杉矶，拉斯维加斯为4星品质酒店，沿线小镇为精选特色Motel汽车旅馆
        <br>车辆配置：美式7座巨无霸SUV（参考车型：雪佛兰太浩/福特探索者/尼桑途乐）
        <br>自驾里程：大约4400公里
        <br>活动人数：4人起发团，12人+1领队满团（自驾）
        <br>
      </p>
      <h5 class="ct_title">行程详情：</h5>
      <div class="date">
        <div class="day1">
          <h6 class="date_h6">成都- 旧金山 参考航班：MU2855 成都—洛杉矶 09:30—11:00</h6>
          <p
            class="date_paragraph"
          >飞抵天使之城洛杉矶，根据时间安排到酒店休息或游玩LAX最热闹的海滨圣地【圣莫妮卡海滩】，这里不仅有各色餐厅、商店更是休闲度假的好去处，还是一个完美的购物天堂。【唐人街】坐落在洛杉矶市中心，是华人聚居的地方，有浓郁的中华文化，最受人好评的莫过于饮茶加晚餐的中国餐馆。
            <br>
            <br>参考酒店：Best Western Plus Executive Inn
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_1.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_2.png"
              alt
            >
          </div>
        </div>
        <div class="day2">
          <h6 class="date_h6">洛杉矶Los Angeles - 里奇克莱斯特 Ridgecrest（250公里，大约2.5小时车程）</h6>
          <p
            class="date_paragraph"
          >早上参观【好莱坞星光大道】 (Walk Of Fame) 位于加利福尼亚州，包括了超过2500枚五尖水磨石及黄铜的“星星”，镶嵌在沿着“好莱坞大道”15个街区和“藤街”3个街区的人行道上。“星星”代表着对娱乐产业有杰出成就的人的永恒纪念。这里还有中国剧院、明星手印、奥斯卡金像奖颁奖礼的举行地点-【杜比剧院】（外部参观）等好莱坞著名景点。夜宿死亡谷国家公园西门里奇克莱斯特小镇。
            <br>参考酒店：：Heritage Inn And Suites Ridgecrest
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_3.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_4.png"
              alt
            >
          </div>
        </div>
        <div class="day3">
          <h6 class="date_h6">里奇克莱斯特 Ridgecrest-死亡谷国家公园-拉斯维加斯（350公里，大约3.5小时车）</h6>
          <p
            class="date_paragraph"
          >早餐后驾车穿行游览美国最大的国家公园【死亡谷国家公园】、金黄的沙丘、一望无际的荒地、深切的峡谷、挺拔的高山以及山谷让您切身感受美国西部的狂野。参观结束后前往沙漠上的海市蜃楼-【拉斯维加斯】。夜游 拉斯维加斯长街，观百乐宫音乐喷泉，身临其境火山爆发，观太阳马戏团大秀，逛全球奢侈品店数量最多的大街，感受世界赌城的纸醉金迷。
            <br>
            <br>参考酒店：The Westin Las Vegas Hotel, Casino & Spa
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_5.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_6.png"
              alt
            >
          </div>
        </div>
        <div class="day4">
          <h6 class="date_h6">拉斯维加斯Lsa Vegas（不用车，全天自由活动，所以活动自由选择是否参加，费用自理）</h6>
          <p
            class="date_paragraph"
          >自由活动一天。您可以选择在大牌云集的【拉斯维加斯北奥特莱斯】自由购物，或参加赌城各项精彩活动，如【实弹射击】、【直升机空览大峡谷】、【赛道飙车】等等。推荐世界著名太阳马戏团的O，Ka, Love, Zumanity等大秀；大卫科波菲尔魔术大秀。
            <br>
            <br>参考酒店：The Westin Las Vegas Hotel, Casino & Spa
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_7.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_8.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_9.png"
              alt
            >
          </div>
        </div>
        <div class="day5">
          <h6 class="date_h6">拉斯维加斯Lsa Vegas - 潘圭奇Panguitch（460公里，大约4.5小时车程）</h6>
          <p
            class="date_paragraph"
          >【布莱斯国家公园】是位于美国犹他州西南部的国家公园。其独特的地理结构称为岩柱，由风、河流里的水与冰侵蚀和湖床的沉积岩组成。位于其内的红色、橙色与白色的岩石形成了奇特的自然景观，因此其被誉为“天然石俑的殿堂”。游玩后夜宿潘圭奇小镇。
            <br>
            <br>参考酒店：Best Western Plus Bryce Canyon Grand Hotel
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_10.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_11.png"
              alt
            >
          </div>
        </div>
        <div class="day6">
          <h6 class="date_h6">潘圭奇Panguitch- 莫阿布Moab（400公里，大约4小时车程）</h6>
          <p
            class="date_paragraph"
          >参观【死马点州立公园】这个地名听起来就像武侠小说一样，有点那么传奇的味道。接着到达世界上最大的自然沙岩拱门集中地之一【拱门国家公园】浏览，感受大自然的鬼斧神工。夜宿莫阿布小镇。
            <br>
            <br>参考酒店：Comfort Inn Green River
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_12.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_13.png"
              alt
            >
          </div>
        </div>
        <div class="day7">
          <h6 class="date_h6">莫阿布Moab- 佩吉Page（440公里，大约4.5小时车程）</h6>
          <p
            class="date_paragraph"
          >途经有西部永恒象征之称的【纪念碑谷】、通过著名的【阿甘路】，抵达今晚的住宿地-佩吉镇。参观科罗拉多河大拐弯-【马蹄湾】。傍晚在蜿蜒在亚利桑那州和犹他州之间的天然水库【鲍威尔湖】欣赏日落。
            <br>
            <br>参考酒店：Sleep Inn & Suites
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_14.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_15.png"
              alt
            >
          </div>
        </div>
        <div class="day8">
          <h6 class="date_h6">佩吉Page - 威廉姆斯小镇（270公里，大约3小时车程）</h6>
          <p
            class="date_paragraph"
          >参观地球上十大最奇特的地貌之一【羚羊峡谷】羚羊峡谷的出口只有一人多宽，山洪从这里喷涌而出。而这里的光线也千变万化，只有正午很短的一段时间阳光才能透过几处间隙照到谷底。接着前往世界七大奇景之一的【大峡谷国家公园】(Grand Canyon South Rim)南缘。感受经过数十亿年，被大自然切割成的大峡谷的气势磅礴和鬼斧神工。夜宿大峡谷南门外威廉姆斯小镇。
            <br>
            <br>参考酒店：Holiday Inn Express & Suites Williams
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_16.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_17.png"
              alt
            >
          </div>
        </div>
        <div class="day9">
          <h6 class="date_h6">威廉姆斯-棕榈泉奥特莱斯（600公里，大约6小时车程）</h6>
          <p
            class="date_paragraph"
          >驱车前往棕榈泉，途径昔日66号公路重镇【赛利格曼】、【金曼】、【奥特曼】小镇游玩。这一段66号体验，仿佛让你掉进了时光隧道一般，回到西部牛仔风行的时代。公路小镇旁贩卖冒著气泡水的酒馆，霓虹灯闪烁的汽车旅馆，古式而老旧的加油站，西部的传奇逸事在眼前一一上演。怀旧的人肯定会爱上66号公路所营造的气氛，不妨任选一间奇特的小咖啡馆停歇，喝杯咖啡，享受这单纯而节奏缓慢的往日情怀。傍晚入住棕榈泉附近酒店。
            <br>
            <br>参考酒店：Homewood Suites by Hilton Palm Desert
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_18.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_19.png"
              alt
            >
          </div>
        </div>
        <div class="day10">
          <h6 class="date_h6">棕榈泉奥特莱斯自由活动</h6>
          <p class="date_paragraph">全天在美国西部最大的奥特莱斯-Desert Hills Premium Outlets自由购物。
            <br>
            <br>参考酒店：Homewood Suites by Hilton Palm Desert
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_20.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_21.png"
              alt
            >
          </div>
        </div>
        <div class="day11">
          <h6 class="date_h6">棕榈泉-洛杉矶 Los Angeles（180公里，大约2小时车程）</h6>
          <p class="date_paragraph">返回天使之城【洛杉矶】，也有繁华的商业街和众多美食供您品尝。下午前往【格里菲斯公园】，俯瞰洛杉矶的壮美夜景。
            <br>
            <br>参考酒店：Best Western Plus Executive Inn
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_22.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_23.png"
              alt
            >
          </div>
        </div>
        <div class="day12">
          <h6 class="date_h6">洛杉矶Los Angeles</h6>
          <p
            class="date_paragraph"
          >全天在游客到洛杉矶的必游之地-【好莱坞环球影城】游玩（门票已包含）。准备迎接好莱坞环球影城终极体验——好莱坞环球影城汇集众多刺激有趣的娱乐设施，将给您充满精彩与刺激的一天：惊心动魄的主题公园娱乐设施，精彩秀场以及真实的电影拍摄现场，环球城市大道更是汇集了众多洛杉矶精品商店、餐厅和影院。好莱坞环球影城独一无二的精彩体验将为您和您的家人带来无限欢畅感受！
            <br>
            <br>参考酒店：Best Western Plus Executive Inn
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_24.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store15/d1_25.png"
              alt
            >
          </div>
        </div>
        <div class="day13">
          <h6 class="date_h6">洛杉矶-成都</h6>
          <p class="date_paragraph">参考航班：MU2856 洛杉矶—成都 13:30—22:20+1
            <br>
          </p>
        </div>
        <div class="day14">
          <h6 class="date_h6">成都</h6>
          <p class="date_paragraph">抵达成都，结束愉快的行程。
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
            <img class="date-img" src="../../assets/imgs/custom/store15/d1_19.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store15/d1_20.png" alt="">   
        </div>
        <h6 class="ct_subTitle">
            Kaneyamaen （鐘山苑） 
        </h6>
        <p class="paragraph">
            鐘山苑有 106 间装修精美的客房，大部分都配有平板电视, 额外浴室, 空气净化器, 免费速溶咖啡, 免费茶水。 酒 店的娱乐设施相当齐全，包括温泉 , 室外游泳池, 水疗中心, 按摩, 花园。 钟山苑酒店地理位置优越，设施优良， 各方面均为理想之选。
        </p>
        <div>
            <img class="date-img" src="../../assets/imgs/custom/store15/d1_21.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store15/d1_22.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store15/d1_23.png" alt="">   
        </div>
        <h6 class="ct_subTitle">
          Imperial Hotel Osaka（大阪帝国酒店） 
        </h6>
        <p class="paragraph">
            大阪帝国酒店是一家享有盛誉的五星级酒店，坐落在以美丽樱花而闻名的大川河（Okawa River）河畔。 酒店设有众多娱乐设施 。Les Saison 餐厅享有城市全景，供应精致的法国美食。Kamon 餐厅供应新鲜的海产品和铁 板烧风格牛排。Jasmine Garden 餐厅供应奢华的中式菜肴。 
        </p>
        <div>
            <img class="date-img" src="../../assets/imgs/custom/store15/d1_24.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store15/d1_25.png" alt="">  
      </div>-->
      <h5 class="ct_title">费用包含</h5>
      <p class="paragraph" style="border-bottom:none;">1.全程住宿：洛杉矶，拉斯维加斯为4星品质酒店，沿线小镇为精选特色Motel汽车旅馆；
        <br>2.含部分早餐（部分酒店提供早餐，具体以出团通知书为准）；
        <br>3.汽车租赁费、异地还车费及随车保险（不限里程、车损或盗抢不计免赔，第三者100万美元、各种税费）；
        <br>4.全程燃油费、过路费、停车费；
        <br>5.对讲机、中文导航仪租借费；
        <br>6.租车公司官方翻译件费用；
        <br>7.行程中所列景点首道门票：死亡谷国家公园、布莱斯峡谷国家公园、死马点州立公园、拱门国家公园、纪念碑谷、大峡谷国家公园、羚羊谷、环球影城门票；
        <br>8.全程领队司机兼导游服务费；
        <br>9.安盛（全球最大保险集团）天平智行天下旅游保险-皇冠计划（含国际救援）。
        <br>
      </p>
      <h5 class="ct_title">费用不含：</h5>
      <p class="paragraph" style="border-bottom:none;">1.护照、签证等相关证件的费用；
        <br>2.机票费用及超出机票包含免费行李的行李托运费；
        <br>3.午餐、晚餐及部分早餐餐食费用自理（走到哪吃到哪儿，丰简由己，午餐约10美金，晚餐约15美金+）；
        <br>4.停车费及违章罚款等费用（若产生请自理）；
        <br>5.自驾领队小费每人每天10美金；
        <br>6.行程中自由活动时的产生的一切费用请自理；
        <br>7.行程以外的一切私人消费，如酒店内的洗衣费、电话费、饮料、付费电视、行李搬运费以及吸烟罚款等费用，个人消费所引起的小费、出入境的行李海关课税、超重行李的托运费、管理费等；
        <br>8.不可抗拒的客观原因（如天灾、战争、罢工等）或航空公司航班延误、取消、领馆签证延误等非我公司原因引起的特殊情况，我公司有权变更或取消行程，由此产生的相关费用（如在外延期签证、食、宿、行一切费用）请自理；
        <br>9.本合同中未提及的其他费用。
        <br>
      </p>
      <h5 class="ct_title">行程须知：</h5>
      <p class="paragraph" style="border-bottom:none;">1.本产品报价是按照2位成人入住一间房计算的价格，如出现单男单女请补缴单房差。
        <br>2.驾车人员须有中国合法有效的驾照原件（驾车人员年龄要求在25岁-65岁之间，不驾车的除外）；
        <br>3.驾车人员须有本人名下有效的国际信用卡 (带有Visa、MasterCard标志，只有银联标志的信用卡无法取车。不驾车的除外)；
        <br>4.根据美国法律规定，12岁以下且身高不足1.5米的儿童须配置增高坐垫或座椅，费用请自理（建议自带）；
        <br>5.2-4人参团需至少1人开车，5-8人参团需至少2人开车；
        <br>6.当地酒店无统一星级评定标准，行程中所列酒店星级表示该酒店具备国内同级酒店的接待水准，具体可在网上查阅评价。
        <br>7.本活动招募人数不足4人时，我社将取消该行程，您可以选择延期出发、更改线路或退回所有费用；
        <br>8.本活动为深度自驾，日程中标注的部分酒店在旺季容易满房，部分景点也存在因为天气等原因关闭的情况，因此我社可能会根据实际情况，调整住宿地点（不改变酒店的等级），更换或取消参观某些景点，请谅解；
        <br>9.本活动落地参团，不包含机票。可代订灵活机票，直飞或转机，早到或延住，任您选择。
        <br>
      </p>
      <h5 class="ct_title">报名流程：</h5>
      <p
        class="paragraph"
        style="border-bottom:none;"
      >确定行程-填写报名表-交费-办理签证-签订旅游合同-等待成团通知-购买机票-行前说明会及目的地交规说明会-出发</p>
    </div>

    <div class="btn_container clearfix">
      <a
        target="_blank"
        class="btn_online fl"
        data-ajax="false"
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
@import "../../assets/style/custom/index";
.banner {
  background: url("../../assets/imgs/custom/store15/banner.png") no-repeat
    center center/750px 438px;
  width: 750px;
  height: 438px;
  position: relative;
}
</style>