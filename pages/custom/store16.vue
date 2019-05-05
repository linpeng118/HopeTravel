<template>
  <div>
    <div class="banner">
      <a v-if="!isApp" class="return" @click="goBack" href="javascript:;"></a>
      <span class="title" style="line-height:.8rem;text-align:center;">美西三城+双国家公园+加州一号公路精彩自驾9天7晚</span>
    </div>
    <div class="ct">
      <h5 class="ct_title">活动详情</h5>
      <p class="paragraph">活动名称：美西三城+双国家公园+加州一号公路精彩自驾9天7晚（3-2-1）
        <br>出发日期：2018年2月17日出发(大年初二)
        <br>自驾方式：跟队自驾，全程专业自驾向导领航，省心省力，安全无忧；
        <br>自驾里程：约3300公里；
        <br>车辆配置：美式7座SUV/MPV（参考车型：道奇 Grand Caravan /雪佛兰 Suburban /福特 Explorer）；
        <br>包含项目：豪华保险/全部门票/高速费/导航仪/全程租车/酒店住宿/全程燃油。绝无旅游商店购物或强制额外自费项目，纯玩儿！纯玩儿！纯玩儿！
        <br>
      </p>
      <h5 class="ct_title">行程特色</h5>
      <p class="paragraph">三车纯玩小队+专业自驾向导全程领航，不走回头路，省心省力！
        <br>美西三大独特风格城市旧金山、拉斯维加斯、洛杉矶完整体验；
        <br>加州一号公路沿途两晚住宿，轻松自由感受公路、海洋与阳光的完美融合；
        <br>国家地理杂志推荐的人生必去50个地方-大苏尔+卡梅尔小镇深度探索；
        <br>死亡谷+优胜美地国家公园，美西最经典的双国家公园深度体验；
        <br>洛杉矶市区最大的卡马里奥奥特莱斯自由购物，绝对满足亲友代购任务～；
        <br>全部门票+美式7座SUV/MPV+燃油+高速通行费+豪华保险+导航+对讲机全部包含；
        <br>
      </p>
      <h5 class="ct_title">详细行程</h5>
      <div class="date">
        <div class="day1">
          <h6 class="date_h6">成都-洛杉矶 市区驾驶</h6>
          <p
            class="date_paragraph"
          >飞抵天使之城洛杉矶，视到达时间，直接入住酒店休息或夜游【格里菲斯公园】（若当天时间来不及，【格里菲斯公园】将于DAY7游览）。格里菲斯公园是世界著名的天文台之一，并与好莱坞山上的“HOLLYWOOD”标志遥遥相对，作为洛杉矶地标性的建筑，成为《007黄金眼》《变形金刚》等电影的外景拍摄地。黄昏时分在此眺望，万家灯火的洛杉矶笼罩在落日余晖之中更显辉煌壮阔。随后前往酒店休息，调整时差。</p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store16/d1_1.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store16/d1_2.png"
              alt
            >
          </div>
        </div>
        <div class="day2">
          <h6 class="date_h6">洛杉矶-拉斯维加斯 （480公里 4.5小时）</h6>
          <p
            class="date_paragraph"
          >早晨前往好莱坞区域，游览【星光大道】，大道上几千颗印有明星手印的星形奖章璀璨夺目，吸引着世界各地的影迷前来瞻仰。接着参观奥斯卡颁奖典礼的永久举办地【杜比剧院】（外观参观），亲临感受好莱坞明星的闪耀光芒。随后驱车前往【拉斯维加斯】，深度游览赌城最繁华的拉斯维加斯大道，炫彩夺目的赌城夜景定能给您留下深刻印象。</p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store16/d1_3.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store16/d1_4.png"
              alt
            >
          </div>
        </div>
        <div class="day3">
          <h6 class="date_h6">拉斯维加斯-死亡谷国家公园-贝克斯菲尔德 （570公里 6小时）</h6>
          <p
            class="date_paragraph"
          >早餐后驱车2小时到达美国本土48州面积最大的国家公园【死亡谷国家公园】（门票包含），使死亡谷出名的是会走路的石头，但这一现象至今原因不明。行驶在一段似乎没有尽头的公路上，掠过黑漆漆的整齐如刀割一般的荒原山崖，耳畔阵阵风声呼啸而过，一切都是如此沉寂，你却会油生肃然起敬之感，这或许就是大自然的力量和感召力。夜宿死亡谷西门外的城镇贝克斯菲尔德。</p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store16/d1_5.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store16/d1_6.png"
              alt
            >
          </div>
        </div>
        <div class="day4">
          <h6 class="date_h6">贝克斯菲尔德-优胜美地-格罗夫兰 （400公里 5小时）</h6>
          <p
            class="date_paragraph"
          >今天我们将游览美国西部最美丽，参观人数最多的国家公园之一【优胜美地国家公园】（门票包含），令人叹为观止的雄伟高山，山花烂漫的广阔草地，高耸挺拔的红衫森林，怪石嶙峋的峡谷，银装素裹的冰川，清澈见底的宝蓝色湖泊，潺潺的溪水，神秘的野生动物，蓝天白云和无比清新的空气都让他享有盛名。世界知名的户外服装品牌North Face的品牌Logo，就是由优胜美地的【半圆顶】而来。参观结束后，夜宿公园西门外小镇格罗夫兰。</p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store16/d1_7.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store16/d1_8.png"
              alt
            >
          </div>
        </div>
        <div class="day5">
          <h6 class="date_h6">格罗夫兰-旧金山-蒙特雷小镇 （450公里 4.5小时）</h6>
          <p
            class="date_paragraph"
          >早餐后，我们将前往【旧金山】，旧金山拥有40多个街区，每个街区都有与众不同的气质，融合了现代与古典的精致街道、遍布街头的维多利亚式建筑或者希腊罗马式艺术宫，都是你探访美好的地方。我们将在“世界上最弯曲的街道”【九曲花街】体验时速不超过5英里盘旋而下的乐趣；在旧金山的象征-【金门大桥】最好的观景点，欣赏壮美的大桥全景。参观结束后，前往加州一号公路的蒙特雷小镇入住休息。</p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store16/d1_9.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store16/d1_10.png"
              alt
            >
          </div>
        </div>
        <div class="day6">
          <h6 class="date_h6">蒙特雷-圣玛利亚 （370公里 5小时）</h6>
          <p
            class="date_paragraph"
          >先参观【17里湾】（门票包含）海岸，沿途您不仅能看到数处著名海滩，还不时可见壮观的豪华别墅和高尔夫球场。其中的圆石滩高尔夫林克斯球场还在2005年美国杂志《高尔夫大师》的最佳球场评选中位列美国第一位。接着游览以优美的自然环境和优雅的艺术氛围著名的【卡梅尔小镇】，接着沿壮美的加州一号公路一路南行，游览被美国《国家地理》选为“旅人一生要去的50个地方”之一【Big Sur大苏尔】，左面是平地而起斜插蓝天的山峰，右面是一片无垠的蔚蓝，整个海岸线都是鬼斧神工的岩石，清澈的海水拍打岩石，激起朵朵白色浪花，海鸟排成一排从水面掠过，而加州秃鹫怪叫着盘旋在空中。这里从未被污染过的原始自然美，无愧为大海和陆地最绮丽的分界线。夜宿一号公路小镇圣玛利亚。</p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store16/d1_11.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store16/d1_12.png"
              alt
            >
          </div>
        </div>
        <div class="day7">
          <h6 class="date_h6">圣玛利亚-圣塔芭芭拉-洛杉矶 （280公里 3小时）</h6>
          <p
            class="date_paragraph"
          >早餐后，游览被加州阳光宠爱的宁静小城【圣塔芭芭拉】，体验浪漫的西班牙风情。接着来到洛杉矶最大的【卡马里奥奥特莱斯】自由购物，这里设有160家名店,汇集众多高端品牌，户外环境设计独特，每天打折高达65%。下午结束欢乐的购物行程，入住洛杉矶酒店。</p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store16/d1_13.png"
              alt
            >
            <img
              class="date-img"
              src="../../assets/imgs/custom/store16/d1_14.png"
              alt
            >
          </div>
        </div>
        <div class="day8">
          <h6 class="date_h6">洛杉矶-成都</h6>
          <p class="date_paragraph">还车后，结束美国的行程，飞往国内</p>
        </div>
        <div class="day9">
          <h6 class="date_h6">成都</h6>
        </div>
      </div>

      <h5 class="ct_title">车辆配置</h5>
      <p class="paragraph">美式7座SUV/MPV（参考车型：道奇 Grand Caravan /雪佛兰 Suburban /福特 Explorer）；</p>
      <div>
        <img
          class="date-img"
          src="../../assets/imgs/custom/store16/d1_15.png"
          alt
        >
      </div>

      <h5 class="ct_title">费用详情</h5>
      <h6 class="ct_subTitle">一、签证/签注（可选项目）</h6>
      <p
        class="paragraph"
      >签证及服务费用：人民币1300元/人（含使馆签证费、1对1签证辅导、翻译、填表、快递等费用，以上费用为美国使馆收取和旅行社实际支出，拒签恕不退还。）</p>
      <h6 class="ct_subTitle">二、旅行费用（含机票的价格）：</h6>
      <p class="paragraph">4人成团，每人价格：15800元</p>

      <!-- <h6 class="ct_subTitle">
            Kaneyamaen （鐘山苑）
        </h6>
        <p class="paragraph">
            鐘山苑有 106 间装修精美的客房，大部分都配有平板电视, 额外浴室, 空气净化器, 免费速溶咖啡, 免费茶水。 酒 店的娱乐设施相当齐全，包括温泉 , 室外游泳池, 水疗中心, 按摩, 花园。 钟山苑酒店地理位置优越，设施优良， 各方面均为理想之选。
        </p>
        <div>
            <img class="date-img" src="../../assets/imgs/custom/store16/d1_21.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store16/d1_22.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store16/d1_23.png" alt="">
        </div>
        <h6 class="ct_subTitle">
          Imperial Hotel Osaka（大阪帝国酒店）
        </h6>
        <p class="paragraph">
            大阪帝国酒店是一家享有盛誉的五星级酒店，坐落在以美丽樱花而闻名的大川河（Okawa River）河畔。 酒店设有众多娱乐设施 。Les Saison 餐厅享有城市全景，供应精致的法国美食。Kamon 餐厅供应新鲜的海产品和铁 板烧风格牛排。Jasmine Garden 餐厅供应奢华的中式菜肴。
        </p>
        <div>
            <img class="date-img" src="../../assets/imgs/custom/store16/d1_24.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store16/d1_25.png" alt="">
      </div>-->
      <h5 class="ct_title">费用包含</h5>
      <p class="paragraph" style="border-bottom:none;">1、全程住宿：全程为精选当地特色酒店或民宿；
        <br>2、汽车租赁费及随车保险（车辆碰撞险、车辆盗抢险、第三者责任险、境外租车补充全险）（4人一车）；
        <br>3、AXA安盛集团（全球最大保险集团）皇冠级个人旅游保险（含国际救援）；
        <br>4、全程燃油费/停车费/高速通行费/对讲机租赁费/中文导航；
        <br>5、租车公司所需驾照官方翻译件；
        <br>6、行程中所列景点首道门票：优胜美地国家公园、死亡谷国家公园、17里湾；
        <br>7.成都往返洛杉矶经济舱机票：（参考航班：2月17日 成都19:15 - 洛杉矶 19:40 四川航空3U8699 2月24日 洛杉矶23:50 - 成都+2 10:45 四川航空 3U8700）
        <br>
      </p>
      <h5 class="ct_title">费用不含：</h5>
      <p class="paragraph" style="border-bottom:none;">1、护照、签证等相关证件的费用；
        <br>2、机票及超出机票包含免费行李的行李托运费；
        <br>3、全程餐食自理（丰俭由己，早餐约8美元，午餐约15美元，晚餐约20美元。）；
        <br>4、停车费、违章罚款及违法驾车造成的保险覆盖范围之外的损失等费用请自理（如在非铺装道路驾车、酒驾、鲁莽驾驶、危险驾驶等行为造成的损失）；
        <br>5、行程中自由活动时的产生的一切费用请自理；
        <br>6、行程以外的一切私人消费，如酒店内的洗衣费、电话费、饮料、付费电视、行李搬运费以及吸烟罚款等费用，个人消费所引起的小费、出入境的行李海关课税、超重行李的托运费、管理费等；
        <br>7、不可抗拒的客观原因（如天气变化、天灾、战争、罢工等）或航空公司航班延误、取消、领馆签证延误等非我公司原因引起的特殊情况，我公司有权变更或取消行程，由此产生的相关费用（如在外延期签证、食、宿、行一切费用）请自理。
        <br>8、自驾领队服务费每人每天10美元。
        <br>
      </p>
      <h5 class="ct_title">行程须知：</h5>
      <p class="paragraph" style="border-bottom:none;">1、本产品报价是按照2位成人入住1间房计算的价格，如出现单男单女请补缴单房差。
        <br>2、驾车人员须有中国合法有效的驾照原件（驾车人员年龄要求在25岁-65岁之间，不驾车的除外）；
        <br>3、驾车人员须有本人名下有效的国际信用卡 (带有Visa、MasterCard或American Express 等标志，只有银联标志的信用卡无法取车。不驾车的除外)；*根据新西兰法律规定，儿童须配置增高坐垫或座椅，费用请自理（建议自带）；
        <br>4、当地酒店无统一星级评定标准，行程中所列酒店星级表示该酒店具备国内同级酒店的接待水准，具体可在网上查阅评价。
        <br>5、本活动招募人数不足4人时，我社将在出发前10日通知取消该行程，您可以选择延期出发、更改线路或退回所有费用；
        <br>6、本活动为深度自驾，日程中标注的部分酒店在旺季容易满房，部分景点也存在因为天气等原因关闭的情况，因此我社可能会根据实际情况，调整住宿地点（不改变酒店的等级），更换或取消参观景点，请谅解。
        <br>7、本活动落地参团，不包含机票。可代订灵活机票，直飞或转机，早到或延住，任您选择！
        <br>8、2-3人参团需至少1人开车，4-5人参团需至少2人开车。自驾领队在各车轮流驾驶/乘坐，确保各车行驶安全。
        <br>9、本旅行社有权根据当日实际情况对行程顺序组合进行调整。
        <br>10、如存在下列情况者，因乙方服务能力所限无法接待：
        <br>（一）病患者、孕妇及行动不便者：1）传染性疾病患者，如传染性肝炎、活动期肺结核、伤寒等传染病人；2）心血管疾病患者，如严重高血压、心功能不全、心肌缺氧、心肌梗塞等病人；3）脑血管疾病患者，如脑栓塞、脑出血、脑肿瘤等病人；4）呼吸系统疾病患者，如肺气肿、肺心病等病人；5）精神病患者，如癫痫及各种精神病人；6）严重贫血病患者，如血红蛋白量水平在50克/升以下的病人；7）大中型手术的恢复期病患者；8）孕妇及行动不便者。
        <br>（二）老年人：1）70周岁以上老年人预订出游，须与乙方签订《健康证明》并有家属或朋友（因服务能力所限无法接待的人除外）陪同方可出游。2）因服务能力所限，无法接待80周岁以上的旅游者报名出游，敬请谅解。
        <br>（三）未成年人：1）未满18周岁的旅游者请由家属（因服务能力所限无法接待的人除外）陪同参团。2）因服务能力所限，无法接待18周岁以下旅游者单独报名出游，敬请谅解。3）因服务能力所限，无法接待2周岁以下儿童报名出游，敬请谅解。四）法律规定的限制出境人员。
        <br>
      </p>
      <h5 class="ct_title">报名流程：</h5>
      <p
        class="paragraph"
        style="border-bottom:none;"
      >确定行程-填写报名表-交费-办理签证-签订旅游合同-等待成团通知-购买机票-行前说明会及目的地交规说明会-出发</p>
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
  import onCustomerService from '@/assets/js/customerService.js'
  
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
@import "../../assets/style/custom/index";
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
  background: url("../../assets/imgs/custom/store16/banner.png") no-repeat
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
