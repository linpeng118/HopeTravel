<template>
  <div class="product-detail-page"
    ref="refProductDetailPage">
    <product-detail-header :transparent="isTransparent"
      fixed />
    <div class="product-detail">
      <!-- banner -->
      <van-swipe class="banner"
        :autoplay="4000"
        indicator-color="white">
        <van-swipe-item v-for="image in product.images"
          :key="image">
          <div class="banner-img"
            :style="{background: `url(${image}) no-repeat 0 0/100% 100%`}"></div>
        </van-swipe-item>
        <div class="custom-indicator"
          slot="indicator">
          {{ current + 1 }}/4
        </div>
      </van-swipe>
      <!-- 产品 -->
      <div class="product">
        <!-- name -->
        <p class="name">
          {{product.name}}
        </p>
        <!-- 价格 -->
        <div class="price-wrap">
          <span class="price fs-48 fw-800">{{product.special_price ? product.special_price: product.default_price}}<span class="unit">&nbsp;起</span></span>
          <span class="default-price">{{product.special_price ? product.default_price: ''}}</span>
        </div>
      </div>
      <!-- 出发地结束地 -->
      <div class="destination mt-24">
        <div class="header" @click="onServerNode">
          <div class="item">
            <img src="../../assets/imgs/product/tick@2x.png"
              alt="icon">
            成团保障
          </div>
          <div class="item">
            <img src="../../assets/imgs/product/tick@2x.png"
              alt="icon">
            限时特价
          </div>
          <div class="item">
            <img src="../../assets/imgs/product/tick@2x.png"
              alt="icon">
            低价保证
          </div>
          <div class="item">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="city">
          <div class="from">
            <img src="../../assets/imgs/product/attention@2x.png"
              alt="from">
            <span class="title">出发地</span>
            <span class="addr">{{product.departure_city}}</span>
          </div>
          <div class="to">
            <img src="../../assets/imgs/product/attention@2x.png"
              alt="from">
            <span class="title">结束地</span>
            <span class="addr">{{product.end_city}}</span>
          </div>
        </div>
      </div>
      <van-actionsheet v-model="showServiceNode"
        title="服务说明">
        <p>一些内容</p>
      </van-actionsheet>
      <!-- 团期价格 -->
      <div class="group-price mt-24">
        <div class="title">
          <img src="../../assets/imgs/product/price@2x.png"
            alt="icon">
          团期价格
        </div>
        <div class="content mt-12">
          <div class="item"
            v-for="item in top_price[0].days"
            :key="item.day">
            <p class="time">
              {{top_price[0].month}}/{{item.day}}&nbsp;{{getWeek(top_price[0].years, top_price[0].month, item.day)}}
            </p>
            <span class="price">
              {{item.price}}
            </span>
          </div>
          <div class="item more">
            更多团期
          </div>
        </div>
      </div>

      <!-- 稀饭推荐 -->
      <div class="recommend mt-24">
        <div class="title">
          <img src="../../assets/imgs/product/price@2x.png"
            alt="icon">
          稀饭推荐
        </div>
        <div class="content mt-12">
          <ul>
            <li>提供买二送二优惠， 四人一房享受“买二</li>
            <li>三大接团点：唐人街，法拉盛，纽泽西</li>
            <li>畅游：美加两国8大名城</li>
            <li>三大接团点：唐人街，法拉盛，纽泽西</li>
            <li>畅游：美加两国8大名城</li>
          </ul>
        </div>
      </div>
      <!-- tab-list -->
      <div class="tab-list mt-24">
        <div class="tab-item"
          v-for="tab in tabList"
          :key="tab.name"
          :class="{'active': activeTab===tab.id}"
          @click="clickTab(tab)">
          {{tab.name}}
        </div>
      </div>
      <!-- 产品特色 -->
      <div class="features"
        ref="refFeatures">
      </div>
      <!-- 行程概要 -->
      <div class="trip"
        ref="refTrip">
        <div class="header-wrap">
          <h3 class="header-title">行程概要</h3>
          <div class="header-content">
            <div class="item">
              <img src="../../assets/imgs/product/trip_1@2x.png"
                alt="trip">
              <p>3天行程</p>
            </div>
            <div class="item">
              <img src="../../assets/imgs/product/trip_2@2x.png"
                alt="trip">
              <p>12个景点</p>
            </div>
            <div class="item">
              <img src="../../assets/imgs/product/trip_3@2x.png"
                alt="trip">
              <p>中英双语</p>
            </div>
          </div>
        </div>
        <div class="content-wrap">
          <div class="content-title">行程详情</div>
          <div class="content"
            v-for="item in itinerary.items"
            :key="item.product_itinerary_id">
            <div class="title-wrap">
              <span class="icon">D1</span>
              <span class="title-s">{{item.title}}</span>
            </div>
            <div class="detail">
              <div class="summarize-wrap">
                <h3 class="title">
                  <img src="../../assets/imgs/product/text@2x.png"
                    alt="icon">&nbsp;概况
                </h3>
                <div class="body">
                  {{item.content}}
                </div>
              </div>
              <div class="attractions-wrap"
                v-for="attr in item.attractions"
                :key="attr.tour_city_id">
                <h3 class="title">
                  <img src="../../assets/imgs/product/text@2x.png"
                    alt="icon">&nbsp;{{attr.name}}
                </h3>
                <div class="body">
                  <div class="attr-imgs">
                    <prod-detail-img-item :proData="attr.images" />
                  </div>
                  <div class="desc">
                    {{attr.content}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 费用明细 -->
      <div class="cost"
        ref="refCost"></div>
      <!-- 其他 -->
      <div class="other"
        ref="refOther"></div>
    </div>
  </div>
</template>

<script>
  import ProductDetailHeader from '@/components/header/productDetail'
  import ProdDetailImgItem from '@/components/items/prodDetailImgItem'

  export default {
    components: {
      ProductDetailHeader,
      ProdDetailImgItem
    },
    data() {
      return {
        isTransparent: true, // 导航头是否透明
        current: 0, // 导航页数
        tabList: [
          {id: 1, name: '产品特色', ref: 'refFeatures'},
          {id: 2, name: '3天行程', ref: 'refTrip'},
          {id: 3, name: '费用明细', ref: 'refCost'},
          {id: 4, name: '注意事项', ref: 'refOther'},
        ],
        activeTab: 1, // 选中的tab
        showServiceNode: false, // 显示服务说明
        product: {
          'product_id': 141,
          'default_price': '$238',
          'code': 'US119',
          'product_entity_type': 1,
          'product_type': 1,
          'max_num_guest': 4,
          'min_num_guest': 1,
          'max_child_age': 2,
          'sales': 3,
          'self_support': 0,
          'name': '(5天)【华盛顿出发美东豪华游】<纽约+费城+康宁玻璃中心+华盛顿特区+尼亚加拉大瀑布+波士顿>',
          'small_description': '★ 畅游名城：纽约，费城，华盛顿，尼加拉瓜大瀑布，波士顿。 ★ 震撼体验：多种角度欣赏尼亚加拉瀑布的风采，体验视觉与听觉的双震撼； ★ 独特文化：虽一眼看完的景物，却可以让人深深感受到背后的历史渊源，费城独立厅带你感受人们对民主和自由的向往； ★ 特色风味：波士顿当地龙虾卷+特制面包里的新英格兰蛤蜊巧达浓汤； ',
          'icons_show': ["限时", "满减"],
          'icons_tour': [
            {
              "title": "买二送一",
              "content": "是指三人共同享用一个酒店标准间的价格，不提供加床"
            },
            {
              "title": "买二送二",
              "content": "是指四人共同享用一个酒店标准间的价格，不提供加床"
            },
            {
              "title": "畅销行程",
              "content": ""
            },
            {
              "title": "低价保证",
              "content": ""
            },
            {
              "title": "即时确认",
              "content": "该产品下单即可确认出行"
            }
          ],
          images: [
            'http://www.24.tourscool.net/images/product/5b6176857cfd5_600_338.jpg',
            'http://www.24.tourscool.net/images/product/5b6176857d077_600_338.png',
            'http://www.24.tourscool.net/images/product/5b6176857d228_600_338.jpg',
            'http://www.24.tourscool.net/images/product/5b6176857d2a7_600_338.jpg'
          ],
          'departure_city': '华盛顿',
          'end_city': '纽约',
          'special_price': '',
          'feature_images': Array[2],
          'is_kids': false,
          'is_single_pu': true,
          'is_favorite': false,
          'duration_days': 5
        },
        expense: {
          "package_include": "* 4晚酒店（标准间） * 专业双语导游服务 * 豪华空调大巴",
          "package_exclude": "* 任何国际或国内机票，提早或延迟返回所产生之一切费用; * 行程中一切餐饮费用，但本公司领队会沿途代为安排; * 各观光景点之门劵，入场费和行程以外之观光节目; * 旅客在外贵客一切私人性之花费，例如电话费，收费电视等; * 司机和导游小费10$/天（按团天数算）; * 各类保险, 签证费用, 各类税项; * 出发前、后因私人、政治或者自然因素而本公司不能控制而引致的各项费用; * 其他自费项目，请您参考： 纽约： 大都会艺术博物馆：成人$25.00/人；小孩(12岁以下)免费；老人(65岁以上)$17.00/人 新世贸大楼：成人$37.00/人；小孩(3-12岁)$31.00/人；老人(65岁以上)$35.00/人 自由女神游船：成人$29.00/人；小孩(3-12岁)$17.00/人；老人(65岁以上)$24.00/人 无畏号航舰博物馆：成人$33.00/人；小孩(3-12岁)$24.00/人；老人(65岁以上)$31.00/人 华盛顿： 总统蜡像馆：成人$23.00/人；小孩(3-12岁)$17.00/人；老人(65岁以上)$23/人 康宁： 康宁玻璃中心：成人$19.50/人；小孩(12岁以下)免费；老人(65岁以上)$16.50/人 罗德岛： 听涛山庄：成人$24.00/人；小孩(3-12)$8.00/人；老人(65岁以上)$24.00/人 耶鲁大学： 耶鲁大学校园游：成人$11.00/人；小孩(3-12)$7.00/人；老人(65岁以上)$11.00/人 尼加拉瀑布： 尼亚加拉瀑布深度游：成人$25.00/人；小孩(3-12岁)$15.00/人；老人(65岁以上)$22.00/人 “雾中少女号”观瀑船：成人$19.25/人；小孩(3-12岁)$11.20/人；老人(65岁以上)$19.25/人 瀑布电影(IMAX电影)：成人$12.00/人；小孩(3-12岁)$8.00/人；老人(65岁以上)$12.00/人 尼亚加拉大瀑布快艇（11月 - 4月）：成人$66.00/人；小孩(3-12岁)$56.00/人；老人(55岁以上)$56.00/人 波士顿： 波士顿观港船：成人$22.00/人；小孩(3-12岁)$17.00/人；老人(65岁以上)$20.00/人 波士顿龙虾餐：成人$32.00/人；小孩(3-12岁)$32.00/人；老人(65岁以上)$32.00/人 ",
          "price_notice": "* 三人或四人同住一个房间时，享受买二送一/买二送二的优惠。 * 三人或四人同住一个房间的费用等于两人同住一个房间的费用。即三人/间（总价）=四人/间（总价）=双人/间（总价） * 享受买二送一/买二送二的贵宾，当您进行预定时，请务必填写实际的参团人数和参团人员信息，以便我们在处理订单时确保为所有参团贵宾预留巴士座位。 * 注意：以上价格均为“买2送1”或“买2送2”调整后的价格。 *凡享受买二送一/买二送二优惠的客人，如提前取消，我们会按照取消条款来操作。若未提前取消，且在出团当日未参团，地接社将以现金的方式额外收取罚金。 * 单人间价格是指一人单住一个酒店标准间的价格。 * 双人/三人/四人间是指两人/三人/四人共同入住一个酒店标准间的价格。 * 三人/四人间价格不包括在房间里另加床位的价格, 另加床位要在登记时单独提出要求。 * 请注意：由于酒店标准间空间及所加床位有限，请客人自行向酒店服务台咨询加床事宜，稀饭网不能保证加床成功。 * 单人配房是指当一位客人入住一个酒店标准间时，如果想要与其他客人拼房，稀饭网协助安排，但不能保证拼房成功。",
          "standard_price": {
            "price_adult": "",
            "price_kids": "",
            "price_single": "$645",
            "price_single_pu": "$540",
            "price_double": "$475",
            "price_triple": "$317",
            "price_quad": "$238",
            "price_five": "",
            "price_six": "",
            "price_seven": "",
            "price_eight": ""
          }
        },
        notice: [
          {
            "title": "接送机",
            "content": "上车注意事项： 1:00pm 航天航空博物馆 National Air and Space Museum (601 Independence Ave SW, Washington, DC 20024). 送机提示 1. 行程结束后，提供当日巴士返回华盛顿（715 H Street At 7th St NW Washington, DC 20001）回程巴士没有导游陪同，最终下车地址以当天安排为准。 2. 免费送往纽约三大机场，请订7:00pm以后的航班。"
          },
          {
            "title": "预定须知",
            "content": "* 行程中所列景点，参访的先后顺序或因实际情况进行调整； * 如遇景点、节假日休息（关门），导游会根据实际情况调整行程。 * 所有行程本公司以其丰富之经验精心设计，本公司将竭尽所能以求行程之安全及住宿之旅馆按照行程所列来进行，但如因本公司无法控制之因素而必须改变行程更换旅馆，本公司当竭尽所能安排，但不须为任何变动复制。 * 为适应各地交通时间及政治因素之可能变动，并为维护团体之最高利益，本公司之领队有权视当时之情况保留所有行程之变动权及更换同等级旅馆之权利。 * 有关之旅行安全问题，各航空公司班机取消或误点、游轮公司、汽车公司或各大饭店原有其个别之条例，直接对旅客负责，如遇交通延误，行李遗失或损坏，意外等事情，当根据各公司所定条例为解决之根据与本公司无涉。 * 旅途中所订之餐馆及游览等，均为本公司依丰富之经验所订，不得因个人之特殊要求更改，如欲变其所增加之费用，则由各自负责。 * 为维护团体之最高利益，诺是任何旅客有妨碍团体之正常活动及利益的情况发生，本公司之领队人员有权取消之继续参加旅程之资格，自该旅客离团之时起，一切行动均与本公司无涉。 * 如遇罢工，政治因素，天气不良或其他人力不可抗拒之因素而导致行程延误而引起之额外费用，则由全体团员分担。 * 出发日期不同，出发行程顺序有改变。 * 需跟团上导游购买门票，不可自行带票或使用City Pass	.	* 游客因个人原因临时自愿放弃游览，酒店住宿、交通等费用均不退还。"
          },
          {
            "title": "注意事项",
            "content": "* 如果您需要预订机票等其他交通方式，我们建议您在收到我们的行程预订确认邮件后再预订。您的行程预订通常会在1-2个工作日内得到确认。请注意合理安排您行程的时间。您搭乘飞机时，请随时扣紧安全带，以免乱流影响安全。 * 请您提前到达上车地点候车。如果遇到不可抗力（如天气，修路，罢工，旅游车特殊情况）导致的车辆晚点，请您见谅。行程的先后顺序和行程内容，可能因为您的出发时间稍作调整，请以参团当天导游安排为准。 * 酒店每间房间只安排一张或两张床；如果您需要加床，请自行咨询酒店服务台(有些产品不支持四人同房，详见价格明细处)。 住宿酒店时，请您随时将房门扣上安全锁；听到警报器响时，请由紧急出口迅速离开。 * 团体需一起活动，若您在中途需离队，请您务必征得导游同意，以免发生意外。夜间或自由活动时间若您需自行外出，请告知导游或团友，并应特别注意安全。当您行走于雪地及陡峭之路时，请小心谨慎。请遵守观光区、餐厅、饭店、游乐设施等各种场所的注意事项。请自备胃肠药、感冒药、晕车药、私人习惯性药物等。 * 圣诞节、新年、国庆日、劳动节或其他长周末假期，团费会有适当的调整，请您在预订前先行确认。如遇特别情形(如天气、修路、罢工、封山、旅游车特殊状况等)，为保障旅客权益，本公司保留调整或取消行程的最终解释权。 * 春夏两季：请您注意穿着轻便的衣物和舒适的鞋子。秋冬两季：请您注意穿着厚实的衣物和保暖的鞋子。 * 为保障您的个人财产安全，我们建议您在旅行期间随身携带个人贵重物品，不要将贵重物品遗留在大巴/酒店/景点/餐馆等地点；在任何情况及任何地点下失窃，造成个人财产损失，稀饭旅行网、地接社及司机、导游等均不负任何责任，请您悉知。请身体状况特殊的客人(老弱病残孕)一定要在自身的身体允许的情况下参团，如果因为自身原因导致一些突发情况、疾病的产生或复发等状况，稀饭旅行网、地接社及司机、导游等均不负任何责任，请您悉知。"
          },
          {
            "title": "预定程序及电子票",
            "content": "1.在您提交预订单后，系统会立即发送一封“预约申请”的邮件至您的注册邮箱，请查收并核对相关预订信息。2.在您提交预订信息的1 - 2个工作日内，您会收到我们发送的确认邮件。3.一旦您的行程所有事项安排妥当后，我们会向您的注册邮箱发送[电子票]。请您在收到电子票后仔细核对相关信息。电子票包括您的订购行程信息、订单号、参团注意事项以及地接社的紧急联络方式等。4.为保证您顺利参团，请务必在出发前打印您的电子票，并于出团当日携带好电子票以及其他有效证件参团。如有紧急情况，可联系地接社或稀饭旅行网客服。"
          },
          {
            "title": "订购条例",
            "content": "- 订购必须经过一定的购买流程。我们会在1－2个工作日内通过电子邮件与您进行确认。- 请您尽快预订，因为价格可能在不同时间会有所不同。例如，在公众假期价格会有涨幅。- 请在预订前仔细阅读 取消和修改条例 。- 请在预订前仔细阅读 客户协议 。- 为了确保您的安全及旅途愉快，当地旅行团供应商会保留对行程安排进行更改的权利。"
          }
        ],
        // 行程详情
        itinerary: {
          "total_attractions": 2,
          "provider_language": "英文",
          "duration": "5天",
          "duration_days": 5,
          "items": [
            {
              "product_itinerary_id": 30850,
              "title": "华盛顿特区",
              "image_alt": "",
              "image": "http://www.24.tourscool.net/images/tourCity/57747e0c2e0bf.jpg",
              "content": "活动时间：7-9小时路程：60英里。（40分钟）参观【美国航空航天博物馆】，记载了航天事业的发展史，从1903年莱特兄弟的飞行器到现在的外太空探索，第一架横跨太平洋的圣路易斯精神号，还有太空舱和太空站内部结构。是一部完整的航空发展史记载，并且陈列着数以百计的'古董'退役飞机。世界名人堂【总统馆】与总统奥巴马，川普等名人合影，当然少不了模拟总统办公室啦。（15分钟）【美国国会大厦】（外观），美国国会、参议院、众议院的所在地。（25分钟）【白宫】（外观）是美国历届总统的住所和办公地。于【林肯纪念堂】瞻仰这位受人爱戴的前总统；装饰精美的墙上镌刻着出自这位杰出人物的名言警句，令人产生醍醐灌顶之感，《阿甘正传》等多部电影均有在此取景。由林璎设计的【越南战争纪念碑】上刻着烈士的名字，简单而感人。【朝鲜战争纪念堂】缅怀逝去的先烈，栩栩如生的士兵雕塑，描述了战争的紧张和壮烈。车上途经【杰弗逊纪念堂】，【华盛顿纪念碑】，【二战纪念碑】等。",
              "hotel": "Hilton/Radisson/Wyndham/Four Points/Crowne Plaza/Courtyard/Holiday Inn或同级 ",
              "sort_order": 1,
              "product_id": 141,
              "language_id": 3,
              "meal": {
                "breakfast": {
                  "contain_meal": "1",
                  "remark": "面包"
                },
                "lunch": {
                  "contain_meal": "2",
                  "remark": ""
                },
                "dinner": {
                  "contain_meal": "2",
                  "remark": ""
                }
              },
              "attractions": [
                {
                  "tour_city_id": 1,
                  "name": "包伟湖",
                  "content": "",
                  "image": "5bbdf87120aa3.png",
                  "images": [
                    "http://www.24.tourscool.net/images/tourCity/5bbdf87120aa3.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf6e570e02.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf880af29f.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf8a18a924.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf8e980447.png"
                  ]
                },
                {
                  "tour_city_id": 256,
                  "name": "国际间谍博物馆",
                  "content": "",
                  "image": "57747e0c2e0bf_1.jpg",
                  "images": [
                    "http://www.24.tourscool.net/images/tourCity/5bbdf87120aa3.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf6e570e02.png"
                  ]
                }
              ]
            },
            {
              "product_itinerary_id": 30851,
              "title": "华盛顿 - 康宁玻璃中心 - 尼亚加拉大瀑布",
              "image_alt": "",
              "image": "http://www.24.tourscool.net/images/tourCity/57747e0c2e0bf_1.jpg",
              "content": "活动时间：11-13小时。路程：350英里。早上驱车前往（60分钟）“西方景德镇”世界玻璃之都【康宁玻璃中心】，现场的热玻璃表演技术，让人大开眼界；您还将了解到3000多年前，古埃及人如何制作出人类历史上的第一个玻璃面具。傍晚抵达【尼加拉瀑布】，最著名的自然景观，并被列为世界7大奇迹之一。（30分钟）观看【室内巨幕Imax电影】，这部投资一千五百万的电影向您讲述了尼加拉瀑布多姿多彩的传奇故事。（60分钟）搭乘【雾中少女号游船】开往离瀑布最近的位置，近距离感受到大自然无穷的威力。（游船冬季关闭，您还可以体验惊险刺激的快艇船【Jet Boat】，穿梭于波涛起伏的瀑布间，水花迎面扑来，紧张刺激，更增加一份震撼力。如因天气原因，可能会关闭）。之后您可以选择：A.在尼加拉市自由活动。B：自费深度游（$25/人，含古堡门票$12）。参观尼加拉【军事要塞古堡】。战争古堡是一个富有历史价值的景点，它的背后就是一望无际的美国五大湖之一的安大略湖。天气晴朗的话，可以看到远处的多伦多。（受日落时间及交通规定的约束，观赏夜景的完整性在某些夏夜会受到限制。受季节性限制，当天如果无法完成行程，会在第二天重新回到瀑布继续行程）",
              "hotel": "Adam's Mark/Radisson/ RIT/Rochester Plaza/Park Plaza/Holiday Inn/Clarion Hotel或同级",
              "sort_order": 2,
              "product_id": 141,
              "language_id": 3,
              "meal": {
                "breakfast": {
                  "contain_meal": "2",
                  "remark": ""
                },
                "lunch": {
                  "contain_meal": "2",
                  "remark": ""
                },
                "dinner": {
                  "contain_meal": "2",
                  "remark": ""
                }
              },
              "attractions": [
                {
                  "tour_city_id": 1,
                  "name": "包伟湖",
                  "content": "",
                  "image": "5bbdf87120aa3.png",
                  "images": [
                    "http://www.24.tourscool.net/images/tourCity/5bbdf87120aa3.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf6e570e02.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf880af29f.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf8a18a924.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf8e980447.png"
                  ]
                },
                {
                  "tour_city_id": 256,
                  "name": "国际间谍博物馆",
                  "content": "",
                  "image": "57747e0c2e0bf_1.jpg",
                  "images": [
                    "http://www.24.tourscool.net/images/tourCity/5bbdf87120aa3.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf6e570e02.png"
                  ]
                }
              ]
            },
            {
              "product_itinerary_id": 30852,
              "title": "纽约上州 - 波士顿",
              "image_alt": "",
              "image": "http://www.24.tourscool.net/images/tourCity/57747e0c2e0bf_2.jpg",
              "content": "活动时间：11-13小时.路程：350英里。早上离开酒店，沿着伊利运河的方向，横跨纽约上州，感受到美国的辽阔，下午到达麻省剑桥市，（45分钟）参观【哈佛大学】最古老的校园区，与闻名世界的谎言雕像－哈佛雕像合影，参观哈佛图书馆（外观）。（15分钟）留影于【麻省理工学院】主教学楼。（10分钟）波士顿中心【三一教堂】、华裔著名建筑大师贝聿铭设计的【汉考克摩天大楼】楼中楼。车上途经古老的【波士顿公园】、【天鹅湖公园】、【普天寿大楼】，【波士顿图书馆】，金色圆顶的【州议会大楼】。（70分钟）晚上享受极富盛名的新鲜【波士顿龙虾大餐】。",
              "hotel": "Sheraton/ Doubletree/Radisson/Courtyard/Four Points/Wyndham/Holiday Inn或同级",
              "sort_order": 3,
              "product_id": 141,
              "language_id": 3,
              "meal": {
                "breakfast": {
                  "contain_meal": "2",
                  "remark": ""
                },
                "lunch": {
                  "contain_meal": "2",
                  "remark": ""
                },
                "dinner": {
                  "contain_meal": "2",
                  "remark": ""
                }
              },
              "attractions": [
                {
                  "tour_city_id": 1,
                  "name": "包伟湖",
                  "content": "",
                  "image": "5bbdf87120aa3.png",
                  "images": [
                    "http://www.24.tourscool.net/images/tourCity/5bbdf87120aa3.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf6e570e02.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf880af29f.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf8a18a924.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf8e980447.png"
                  ]
                },
                {
                  "tour_city_id": 256,
                  "name": "国际间谍博物馆",
                  "content": "",
                  "image": "57747e0c2e0bf_1.jpg",
                  "images": [
                    "http://www.24.tourscool.net/images/tourCity/5bbdf87120aa3.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf6e570e02.png"
                  ]
                }
              ]
            },
            {
              "product_itinerary_id": 30853,
              "title": "波士顿 - 纽约",
              "image_alt": "",
              "image": "http://www.24.tourscool.net/images/tourCity/57747e0c2e0bf_3.jpg",
              "content": "活动时间：（10-11小时）。路程：250英里（波士顿-纽约）（60分钟）乘坐【波士顿海港游船】，尽情游览波士顿港湾。（60分钟）漫步于古老的【昆西市场】，感受波士顿古老的文化遗产，还可以选购各种商品和纪念品。几十家餐厅的午餐选择，品尝各种地道美食，在导游的介绍下，当然不能够错过著名的波士顿蛤蜊汤。下午回纽约送往酒店。（如果时间允许下我们将加游听涛山庄(夏季) ，州议会大厦(冬季) ，和耶鲁大学。）",
              "hotel": "Sheraton/Radisson /Crowne Plaza /Courtyard/Holiday Inn或同级",
              "sort_order": 4,
              "product_id": 141,
              "language_id": 3,
              "meal": {
                "breakfast": {
                  "contain_meal": "2",
                  "remark": ""
                },
                "lunch": {
                  "contain_meal": "2",
                  "remark": ""
                },
                "dinner": {
                  "contain_meal": "2",
                  "remark": ""
                }
              },
              "attractions": [
                {
                  "tour_city_id": 1,
                  "name": "包伟湖",
                  "content": "",
                  "image": "5bbdf87120aa3.png",
                  "images": [
                    "http://www.24.tourscool.net/images/tourCity/5bbdf87120aa3.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf6e570e02.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf880af29f.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf8a18a924.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf8e980447.png"
                  ]
                },
                {
                  "tour_city_id": 256,
                  "name": "国际间谍博物馆",
                  "content": "",
                  "image": "57747e0c2e0bf_1.jpg",
                  "images": [
                    "http://www.24.tourscool.net/images/tourCity/5bbdf87120aa3.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf6e570e02.png"
                  ]
                }
              ]
            },
            {
              "product_itinerary_id": 30854,
              "title": "纽约市区游览 - 家园",
              "image_alt": "",
              "image": "http://www.24.tourscool.net/images/tourCity/57747e0c31daf.jpg",
              "content": "活动时间: 11-13小时。路程: 60英里。（30分钟）领略繁华的【时代广场】（50分钟）乘船于【哈德逊河】上游览【曼哈顿】，从平面的角度再次感受曼哈顿繁荣富裕，并与【自由女神】像和【布鲁克林桥】摄影留念。（60分钟）深入参观【大无畏号】航空母舰和【协和号】超音速客机和各种战机，领略世界第一军事强国的超强实力（50分钟）乘坐电梯，上到纽约市第一地标-【新世贸中心一号大楼的顶楼】，在高空中鸟览灯红酒绿的曼哈顿，可见所有著名大楼【帝国大厦】和【联合国大厦】，【川普大厦】；下楼后，参观造价40亿美元的【飞鸟车站】，建于旧世贸大两个纪念水池。（40分钟）漫步世界金融中心【纽约股票交易所】所在地【华尔街】、世界文化遗产【三一教堂】、与象征牛市的【铜牛雕塑】合影。在车上途经游览：【第五大道】、【洛克菲勒中心】、等著名景点…… 如果时间允许，我们将加游大都会博物馆。行程结束后，提供当日巴士返回华盛顿（715 H Street At 7th St NW Washington, DC 20001）回程巴士没有导游陪同，最终下车地址以当天安排为准。或免费送往纽约三大机场（请订7:00PM以后的航班）。",
              "hotel": "",
              "sort_order": 5,
              "product_id": 141,
              "language_id": 3,
              "meal": {
                "breakfast": {
                  "contain_meal": "1",
                  "remark": "飞飞"
                },
                "lunch": {
                  "contain_meal": "2",
                  "remark": ""
                },
                "dinner": {
                  "contain_meal": "2",
                  "remark": ""
                }
              },
              "attractions": [
                {
                  "tour_city_id": 1,
                  "name": "包伟湖",
                  "content": "",
                  "image": "5bbdf87120aa3.png",
                  "images": [
                    "http://www.24.tourscool.net/images/tourCity/5bbdf87120aa3.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf6e570e02.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf880af29f.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf8a18a924.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf8e980447.png"
                  ]
                },
                {
                  "tour_city_id": 256,
                  "name": "国际间谍博物馆",
                  "content": "",
                  "image": "57747e0c2e0bf_1.jpg",
                  "images": [
                    "http://www.24.tourscool.net/images/tourCity/5bbdf87120aa3.png",
                    "http://www.24.tourscool.net/images/tourCity/5bbdf6e570e02.png"
                  ]
                }
              ]
            }
          ]
        },
        attributes: [
          {
            "title": "奥兰多十三大主题乐园或三大特色一日游任选其一（第一天）",
            "items": [
              {
                "id": 397,
                "title": "Disney Epoct（未来世界）"
              },
              {
                "id": 398,
                "title": "Disney Hollywood Studio（好莱坞影城）"
              },
              {
                "id": 399,
                "title": "Disney Animal Kingdom （动物王国）"
              },
              {
                "id": 403,
                "title": "Aquatica Orlando（海洋世界水上乐园）"
              }
            ]
          }
        ],
        attributes_override: [
          {
            "title": "瀑布酒店升级",
            "items": [
              {
                "id": 393,
                "title": "升级酒店到Quality Inn At The Falls或同級"
              },
              {
                "id": 394,
                "title": "不升级"
              },
              {
                "id": 395,
                "title": "升级到Doubletree by Hilton Niagara Falls/Sheraton at the Niagara Falls或同级"
              }
            ]
          }
        ],
        transfer: [
          {
            "product_departure_id": 236,
            "time": "1:00PM",
            "product_id": 141,
            "region": "华盛顿",
            "address": "航天航空博物馆 National Air and Space Museum ",
            "full_address": "601 Independence Ave SW, Washington, DC 20024"
          }
        ],
        top_price: [
          {
            "years": "2018",
            "month": "12",
            "days": [
              {
                "day": 23,
                "price": "$645",
                "status": true
              },
              {
                "day": 24,
                "price": "$645",
                "status": true
              },
              {
                "day": 25,
                "price": "$645",
                "status": true
              },
              {
                "day": 26,
                "price": "$645",
                "status": true
              },
              {
                "day": 27,
                "price": "$645",
                "status": true
              }
            ]
          }
        ]
      }
    },
    computed: {},
    mounted() {},
    methods: {
      // 跳转至注册页
      toRegist() {
        this.$router.push({
          path: '/login/regist'
        })
      },
      /**
       * 年月日转周几
       * @params year
       * @params month
       * @params day
       */
      getWeek(year, month, day) {
        const date = `${year}/${month}/${day}`
        let week = new Date(date).getDay()
        switch (week) {
          case 0:
            return '周末'
            break;
          case 1:
            return '周一'
            break;
          case 2:
            return '周二'
            break;
          case 3:
            return '周三'
            break;
          case 4:
            return '周四'
            break;
          case 5:
            return '周五'
            break;
          case 6:
            return '周六'
            break;
          default:
            console.log(`${week} is not found`)
            break;
        }
      },
      onServerNode() {
        this.showServiceNode = true
      },
      clickTab(tab) {
        console.log('tab', tab)
        this.activeTab = tab.id
        // TODO:滚动到相应位置
      }
    },
  }
</script>

<style lang="scss" scoped>
  .product-detail-page {
    height: 100vh;
    font-size: 0;
    background: #f2f2f2;
    .product-detail {
      .banner {
        height: 434px;
        width: 100%;
        .banner-img {
          height: 434px;
          width: 100vw;
        }
        .custom-indicator {
          font-size: 20px;
        }
      }
      .product {
        padding: 20px 24px;
        height: 236px;
        background: #fff;
        .name {
          height: 138px;
          color: #3e3e3e;
          letter-spacing: 8px;
          font-size: 32px;
          font-family: Microsoft YaHei UI;
        }
        .price-wrap {
          margin-top: 2px;
          .price {
            color: #fb605d;
            .unit {
              font-size: 24px;
            }
          }
          .default-price {
            font-size: 24px;
            font-weight: 300;
            color: #989898;
            text-decoration: line-through;
          }
        }
      }
      .destination {
        height: 208px;
        background: #fff;
        padding: 0 32px;
        .header {
          height: 82px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #e4e4e4;
          .item {
            font-size: 28px;
            font-weight: 300;
            color: rgba(91, 91, 91, 1);
            letter-spacing: 4px;
            img {
              vertical-align: middle;
              width: 28px;
              height: 28px;
            }
          }
        }
        .city {
          padding: 20px 0;
          .from,
          .to {
            img {
              width: 40px;
              height: 40px;
              vertical-align: top;
            }
            .title {
              height: 38px;
              font-size: 28px;
              font-weight: 400;
              line-height: 44px;
              font-family: Microsoft YaHei;
              color: rgba(0, 0, 0, 1);
              letter-spacing: 2px;
            }
            .addr {
              margin-left: 40px;
              font-size: 28px;
              font-family: Microsoft YaHei UI;
              font-weight: 300;
              line-height: 44px;
              color: rgba(91, 91, 91, 1);
              letter-spacing: 4px;
            }
          }
        }
      }
      // 公共部分
      .group-price,
      .recommend {
        padding: 20px 28px 20px 32px;
        background: #fff;
        .title {
          height: 40px;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 40px;
          color: rgba(62, 62, 62, 1);
          img {
            vertical-align: middle;
            height: 28px;
            width: 28px;
          }
        }
      }
      .group-price {
        // height: 272px;
        .content {
          .item {
            display: inline-block;
            margin: 10px 6px 0 0;
            width: 166px;
            height: 80px;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            text-align: center;
            font-family: PingFang SC;
            overflow: hidden;
            &.more {
              color: #1592e6;
              font-size: 24px;
              line-height: 80px;
            }
            .time {
              font-size: 24px;
              font-weight: 400;
              line-height: 40px;
              color: rgba(62, 62, 62, 1);
              letter-spacing: 2px;
            }
            .price {
              font-size: 24px;
              font-weight: 400;
              color: rgba(251, 96, 93, 1);
              letter-spacing: 2px;
            }
          }
        }
      }
      .recommend {
        .content {
          padding: 0 34px;
          ul > li {
            list-style: disc;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 300;
            line-height: 40px;
            color: rgba(57, 158, 246, 1);
          }
        }
      }
      .tab-list {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .tab-item {
          flex: 0 0 25%;
          text-align: center;
          height: 80px;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 300;
          color: rgba(64, 64, 64, 1);
          &.active {
            border-bottom: 2px dashed #1592e6;
          }
        }
      }
      .features {
        height: 1520px;
        background: url("../../assets/imgs/product/bg_features.png") no-repeat 0 0/100%
          100%;
      }
      .trip {
        .header-wrap {
          padding: 34px 28px 0 32px;
          text-align: center;
          .header-title {
            height: 44px;
            font-size: 32px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 44px;
            color: rgba(25, 25, 25, 1);
          }
          .header-content {
            padding: 54px 0 28px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-bottom: 2px solid #c9c9c9;
            .item {
              img {
                width: 60px;
                height: 60px;
              }
              p {
                margin-top: 12px;
                font-size: 24px;
                font-family: Microsoft YaHei UI;
                font-weight: 400;
                line-height: 44px;
                color: #191919;
              }
            }
          }
        }
        .content-wrap {
          .content-title {
            text-align: center;
            margin-top: 36px;
            height: 44px;
            font-size: 32px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 44px;
            color: rgba(25, 25, 25, 1);
          }
          .content {
            margin-top: 46px;
            padding-left: 30px;
            .title-wrap {
              .icon {
                padding: 4px 12px;
                text-align: center;
                background: #f48206;
                border-radius: 20px;
                font-size: 24px;
                color: #fff;
              }
              .title-s {
                margin-left: 16px;
                font-size: 28px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 40px;
                color: rgba(25, 25, 25, 1);
              }
            }
            .detail {
              .summarize-wrap,
              .attractions-wrap {
                .title {
                  height: 40px;
                  font-size: 28px;
                  font-family: PingFang SC;
                  font-weight: 300;
                  line-height: 44px;
                  color: #191919;
                  img {
                    vertical-align: middle;
                    width: 28px;
                    height: 28px;
                  }
                }
                .body {
                  font-size: 24px;
                  font-family: PingFang SC;
                  font-weight: 300;
                  line-height: 40px;
                  color: #5e5e5e;
                  position: relative;
                  &::before {
                    content: "";
                    position: absolute;
                    left: 14px;
                    top: 0;
                    width: 2px;
                    background: #8f8f8f;
                    height: 100%;
                  }
                }
              }
              .summarize-wrap {
                margin-top: 22px;
                .body {
                  padding: 12px 18px 24px 33px;
                }
              }
              .attractions-wrap {
                .body {
                  padding: 12px 0 24px 33px;
                  overflow: hidden;
                  .attr-imgs {
                    height: 220px;
                  }
                  .desc {
                    margin-top: 22px;
                    font-size: 24px;
                    font-family: PingFang SC;
                    font-weight: 300;
                    line-height: 40px;
                    color: #5e5e5e;
                  }
                }
              }
            }
          }
        }
      }
      .cost {
      }
      .other {
      }
    }
  }
</style>
