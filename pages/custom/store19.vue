<template>
  <div>
    <div class="banner">
      <a v-if="!isApp" class="return" @click="goBack" href="javascript:;"></a>
      <span
        class="title"
        style="line-height:.8rem;text-align:center;"
      >童趣巴厘岛 成人总价：9050 元/人 儿童总价：5050 元/人</span>
    </div>
    <div class="ct">
      <h5 class="ct_title">为什么值得去</h5>
      <p class="paragraph">带着孩子去感受大自然，触摸花草树木，拥抱每一个生命
        <br>巴厘岛拥有生态极好的动物园、大象公园，更可以在园内享用晚餐
        <br>去阿勇河漂流，让孩子学会勇敢面对自然
        <br>去海神庙祈拜，让孩子懂得尊重异国文化
        <br>去树顶冒险公园，让孩子在每一步中茁壮成长
        <br>
      </p>
      <h5 class="ct_title">行程概览</h5>
      <p class="paragraph">夜游巴厘岛动物园（含晚餐）/阿勇河漂流/空中漫步/百度库/香料市场/海神庙</p>
      <h5 class="ct_title">行程详情</h5>
      <div class="date">
        <div class="day1">
          <h6 class="date_h6">成都-巴厘岛</h6>
          <!-- <p class="date_paragraph">
                    双流国际机场集合
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_1.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_2.png" alt="">
          </div>-->
        </div>
        <div class="day2">
          <h6 class="date_h6">抵达巴厘岛，上午自由活动，下午自由活动，傍晚夜游巴厘岛动物园（含晚餐）</h6>
          <!-- <p class="date_paragraph">
                    CA429（01:50/15:50） 成都-悉尼抵达【悉尼】，在机场办理取车手续，驾车前往酒店。休息缓解长途飞行的疲惫。熟悉一下车况和交通，为接下来几天的自驾之旅做好准备。晚上夜赏【悉尼歌剧院】外观，【海港大桥】外观。<br><br><br>
                    参考酒店：Admiral Collingwood Lodge（科林伍德海军上将旅馆） <br>
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_1.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_2.png" alt="">
          </div>-->
        </div>
        <div class="day3">
          <h6 class="date_h6">上午自由活动，下午阿勇河漂流</h6>
          <!-- <p class="date_paragraph">
                  早起后，一大早先到【悉尼鱼市】，品尝悉尼最正宗的海鲜美食。随后前往【乔治街】参观维多利亚女王大厦，继续向北前往【岩石区】，这里是悉尼最受欢迎的地方之一。历史与现代在这片土地上完美交融，呈现独一无二的风情。午餐后前往【麦考利夫人座椅】，这里是观赏悉尼歌剧院、悉尼海港大桥的最佳地点。晚餐后，前往沙质柔软、蓝天碧海，风景优美的【邦迪海滩】，欣赏悉尼落日美景。<br><br><br>
                  参考酒店：Admiral Collingwood Lodge（科林伍德海军上将旅馆）<br>
                </p>
                <div>
                    <img style="width:6.22rem;margin-top:.2rem;" src="../../assets/imgs/custom/store19/d1_3.png" alt="">
                    <img style="width:6.22rem;margin-top:.2rem;" src="../../assets/imgs/custom/store19/d1_4.png" alt="">
          </div>-->
        </div>
        <div class="day4">
          <h6 class="date_h6">TREE TOP空中漫步+百度库+香料市场+海神庙（含午餐）</h6>
          <!-- <p class="date_paragraph">
                    早上从悉尼出发前往【猎人谷】，参观【猎人谷花园C】开放时间：9:00-17:00。猎人谷是新南威尔士最好的葡萄酒产区，这里没有“猎人”，只有美丽的风景，葡萄酒的香味以及蹦蹦跳跳的袋鼠。在这里可以免费试品红酒，还可以在餐厅点个餐搭配红酒。推荐三个酒庄（自费）：Margan Wines、Tyrrell Wine 、Esca Bimbadgen。美食推荐（自费）：Circa 1876餐厅尽享三道主菜的晚餐今晚入住的酒店是当地袋鼠的栖息地，所以也可以选择早早来到酒店休息，和袋鼠们来一次亲密接触。<br><br><br>
                    参考酒店： Chateau Elan At The Vintage（复古之伊兰堡酒店）<br>
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_5.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_6.png" alt="">
          </div>-->
        </div>
        <div class="day5">
          <h6 class="date_h6">自由活动</h6>
          <!-- <p class="date_paragraph">
                   早起后从猎人谷出发，前往【斯蒂芬斯港】，抵达斯蒂芬斯港搭乘小型游船参加【海豚巡游C】。随后前往最为广阔的【斯多克顿海滩】，在海滩上您可以自费乘坐四轮驱动车享受在海滩上奔驰的独特乐趣也可以在海滩上自由漫步，在斯蒂芬斯港体验海天一色的美景。<br><br><br>
                   参考酒店： Anchorage Port Stephens（安克雷奇斯蒂芬斯港酒店）4星<br>
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_7.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_8.png" alt="">
          </div>-->
        </div>
        <div class="day6">
          <h6 class="date_h6">巴厘岛-成都</h6>
          <!-- <p class="date_paragraph">
                    早起后从斯蒂芬斯港出发，沿着海岸线一路北上。自驾到【海豹岩】，可以看到壮观的海景和悬崖海岸，运气好的话，还可以看到海豹。下午开车沿着海岸，前往【麦觉理小镇】。麦觉理小镇是澳洲最美的小镇之一。下午前往【佛林恩斯海滩】【灯塔海滩Tacking Point Lighthouse】。<br><br><br>
                    参考酒店：HW Boutique Hotel（HW精品酒店）  4星<br>
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_9.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_10.png" alt="">
          </div>-->
        </div>
        <!-- <div class="day7">
                <h6 class="date_h6">麦觉理港-拜伦湾（395公里，4.5小时）</h6>
                <p class="date_paragraph">
                   从麦觉理港出发，途径【格拉夫顿】小镇，在这里休息吃午餐。然后继续前行，抵达【拜伦湾】。格拉夫顿是克拉伦斯河流域的商业中心，拥有许多历史建筑和绿树成荫的街道。也被称为蓝花楹城，每年的10月或者11月都会举行蓝花楹节。同时这里的赛马也是非常有名气的，每年7月的第二个星期四都会举行赛马。<br><br><br>
                   参考酒店：Byron Palms Guesthouse（拜伦棕榈宾馆）4星<br>
                </p>

            </div>
            <div class="day8">
                <h6 class="date_h6">拜伦湾-黄金海岸（95公里，1小时）</h6>
                <p class="date_paragraph">
                    从拜伦湾出发，1个小时，抵达【黄金海岸】。前往【海洋世界C】尽情玩耍。傍晚来到【Q1大厦观景台C】360度俯瞰整个黄金海岸的美景。<br><br><br>
                    参考酒店：TL Warmest Homestay（提沃姆斯特民宿）4星<br>
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_11.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_12.png" alt="">
                </div>

            </div>
            <div class="day9">
                <h6 class="date_h6">黄金海岸（55公里，1小时）</h6>
                <p class="date_paragraph">
                    今天一天前往【华纳电影世界C】。黄金海岸最受欢迎的主题公园之一，电影迷、亲子行必去景点。16项精心设计的游乐设施满足各类人群的游玩需要，全天6场不同主题的表演让你如同置身好莱坞经典电影场景中。<br><br><br>
                    参考酒店：TL Warmest Homestay（提沃姆斯特民宿）4星<br>
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_13.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_14.png" alt="">
                </div>
            </div>
            <div class="day10">
                <h6 class="date_h6">黄金海岸-布里斯班（95公里，1小时）-凯恩斯（内陆飞机）</h6>
                <p class="date_paragraph">
                    早起后，驾车前往布里斯班机场办理还车手续。乘坐内陆飞机飞往凯恩斯<br>
                    参考航班：TT486 <br>
                    布里斯班-凯恩斯国际机场<br>
                    11:20-13:45<br>
                    抵达凯恩斯后，下午可以选择在泻湖游泳，或者在酒店的公共泳池休闲。傍晚在滩步道散步休闲<br><br><br>
                    参考酒店：Shangri-La Hotel The Marina Cairns（凯恩斯香格里拉大酒店）5星<br>
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_15.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_16.png" alt="">
                </div>
            </div>
            <div class="day11">
                <h6 class="date_h6">凯恩斯翡翠岛一日游（C）</h6>
                <p class="date_paragraph">
                    行程参考：<br>
                    08:15 自行前往凯恩斯码头，在“翡翠岛＂柜台办理船票（同时领取午餐券）。在登船截止时间08:50之前登船。 <br>
                    09:00 乘坐游船出发前往翡翠岛（只需45分钟），途中沿着海岸线平静的水域内行驶，欣赏山清水秀的景致。<br>
                    09:45 抵达翡翠岛。前往“海滩游玩设备租赁”处(靠近码头旁)领取浮潜用具，自由安排海上蹦床、玻璃底船游览等活动的时间。 注意：租用岛上的任何设备时都需每人交纳AUD25或信用卡刷卡作为押金。押金会在返回租用品时（与租用前物品同等状态）退还。 <br>
                    12:00 在“海滩游玩设备租赁”处领取午餐。 <br>
                    16:10 回到栈桥码头区准备登船（在16:20前结束登船）<br>
                    16:30 游船离开翡翠岛 <br>
                    17:15 返回凯恩斯<br><br><br>
                    参考酒店：Shangri-La Hotel The Marina Cairns（凯恩斯香格里拉大酒店）5星<br>
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_17.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_18.png" alt="">
                </div>
            </div>
            <div class="day12">
                <h6 class="date_h6">凯恩斯-悉尼-成都</h6>
                <p class="date_paragraph">
                    早起后，前往凯恩斯机场，搭乘内陆航班前往悉尼,随后从悉尼乘坐班机回到成都。参考航班： CA430 (21:40/05:40+1)悉尼-成都  <br>
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_13.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_14.png" alt="">
                </div>
            </div>
            <div class="day13">
                <h6 class="date_h6">成都</h6>
                <p class="date_paragraph">
                    抵达成都，结束澳大利亚太平洋海岸自驾之旅。<br>
                </p>
                <div>
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_13.png" alt="">
                    <img class="date-img" src="../../assets/imgs/custom/store19/d1_14.png" alt="">
                </div>
        </div>-->
      </div>

      <!-- <h5 class="ct_title">
            车辆配置
        </h5>
        <p class="paragraph">
            美式7座SUV/MPV（参考车型：道奇 Grand Caravan /雪佛兰 Suburban /福特 Explorer）；
        </p>
        <div>
            <img class="date-img" src="../../assets/imgs/custom/store19/d1_15.png" alt="">
      </div>-->
      <h5 class="ct_title">酒店信息</h5>
      <h6 class="ct_subTitle">RIMBA Jimbaran BALI by AYANA / 巴厘岛金巴兰RIMBA酒店</h6>
      <p class="paragraph">巴厘岛金巴兰RIMBA酒店-全新时尚5星级住宿
        <br>时尚方舟造型的RIMBA酒店西大堂以摩登创新理念将整个大堂营造成如一船舶被一公顷水体包围氛围。水观台环绕大堂休息长廊，傍晚时分水体与夕阳余晖的折射形成独特神奇大堂落日美景。从RIMBA大堂眺望出去，壮观的泳池就像是层层叠叠的巴厘岛梯田，坐落于森林中，水面印出夕阳幻化的色彩。RIMBA共有403间客房和套房，设计摩登时尚具有活力，惊叹美景和一流服务自成一格，设计尤其着重天然建材的再利用。
        <br>▪ 度假村免费网络
        <br>▪ 专属私人海滩，库布沙滩俱乐部
        <br>▪ 12 座泳池
        <br>▪ 19 家不同风味的餐厅酒吧，3家特色各异餐厅供您享用早餐
        <br>▪ 世界顶级海水浴水疗池，岩石水疗别墅治疗室，RIMBA屋顶水疗by Thermes Marins Spa Bali
        <br>▪ 18洞高尔夫推杆场和网球场
        <br>▪ 2家健身中心和3公里慢跑道
        <br>▪ 2家儿童俱乐部，儿童滑水道泳池及保姆服务
        <br>▪ 著名岩石酒吧VIP通道
        <br>▪ 住店客人享有岩石酒吧座位预约权(16:00-17:00)，可预约住店客人专属区域座位
        <br>▪ 12家购物精品店
        <br>
      </p>
      <!-- <h6 class="ct_subTitle">
          Imperial Hotel Osaka（大阪帝国酒店）
        </h6>
        <p class="paragraph">
            大阪帝国酒店是一家享有盛誉的五星级酒店，坐落在以美丽樱花而闻名的大川河（Okawa River）河畔。 酒店设有众多娱乐设施 。Les Saison 餐厅享有城市全景，供应精致的法国美食。Kamon 餐厅供应新鲜的海产品和铁 板烧风格牛排。Jasmine Garden 餐厅供应奢华的中式菜肴。
        </p>
        <div>
            <img class="date-img" src="../../assets/imgs/custom/store19/d1_24.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store19/d1_25.png" alt="">
      </div>-->
      <h5 class="ct_title">费用包含</h5>
      <p class="paragraph" style="border-bottom:none;">往返机票含税
        <br>4晚RIMBA Jimbaran BALI by AYANA山景房
        <br>接送机
        <br>夜游巴厘岛动物园（含晚餐）
        <br>阿勇河漂流半天
        <br>TREE TOP空中漫步+百度库+香料市场+海神庙
        <br>一次印尼午餐料理
        <br>*独家赠送：赠送一次双人下午茶；赠送一次双人海水浴疗（仅限17岁以上参加）
        <br>
      </p>
      <!-- <h5 class="ct_title">
            费用不含：
        </h5>
        <p class="paragraph" style="border-bottom:none;">
            1、护照、签证等相关证件的费用；<br>
            2、机票及超出机票包含免费行李的行李托运费；<br>
            3、全程餐食自理（当地美食，丰简由己，早餐约10澳币，午餐约15澳币，晚餐约15澳币）；<br>
            4、停车费、违章罚款及违法驾车造成的保险覆盖范围之外的损失等费用请自理（如在非铺装道路驾车、酒驾、鲁莽驾驶、危险驾驶等行为造成的损失）；<br>
            5、自驾领队小费每人每天12澳币(行前由领队统一收齐)；<br>
            6、行程中自由活动时产生的一切费用请自理；<br>
            7、行程以外的一切私人消费，如酒店内的洗衣费、电话费、饮料、付费电视、行李搬运费以及吸烟罚款等费用，个人消费所引起的小费、出入境的行李海关课税、超重行李的托运费、管理费等；<br>
            8、不可抗拒的客观原因（如天气变化、天灾、战争、罢工等）或航空公司航班延误、取消、领馆签证延误等非我公司原因引起的特殊情况，我公司有权变更或取消行程，由此产生的相关费用（如在外延期签证、食、宿、行一切费用）请自理。<br>
            9、自费项目费用参考：<br>
            【Circa 1876餐厅】参考55澳币/人<br>
        </p>
        <h5 class="ct_title">
            报名须知：
        </h5>
        <p class="paragraph" style="border-bottom:none;">
            1、本产品报价是按照2位成人入住1间房计算的价格，如出现单男单女请补缴单房差。<br>
            2、驾车人员须有中国合法有效的驾照原件（驾车人员年龄要求在25岁-65岁之间，不驾车的除外）；<br>
            3、驾车人员须有本人名下有效的国际信用卡 (带有Visa、MasterCard或American Express 等标志，只有银联标志的信用卡无法取车。不驾车的除外)；*根据澳大利亚法律规定，儿童须配置增高坐垫或座椅，费用请自理（建议自带）；<br>
            4、当地酒店无统一星级评定标准，行程中所列酒店星级表示该酒店具备国内同级酒店接待水准，具体可网上查阅评价。<br>
            5、本活动招募人数不足8人时，我社将在出发前30日通知取消该行程，您可选择延期出发、更改线路或退回所有费用；<br>
            6、本活动为深度自驾，日程中标注的部分酒店在旺季容易满房，部分景点也存在因为天气等原因关闭的情况，因此我社可能会根据实际情况，调整住宿地点（不改变酒店的等级），更换或取消参观景点，请谅解。<br>
            7、本活动落地参团，不包含机票。可代订灵活机票，直飞或转机，早到或延住，任您选择！<br>
            8、1人参团需开车，2-3人参团需至少1人开车，4-5人参团需至少2人开车。自驾领队在各车轮流驾驶/乘坐，确保各车行驶安全。<br>
            9、本旅行社有权根据当日实际情况对行程顺序组合进行调整。<br>
        </p>
        <h5 class="ct_title">
            报名流程：
        </h5>
        <p class="paragraph" style="border-bottom:none;">
            确定行程-填写报名表-交费-办理签证-签订旅游合同-等待成团通知-购买机票-行前说明会及目的地交规说明会-出发
      </p>-->
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
  background: url("../../assets/imgs/custom/store19/banner.png") no-repeat
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
