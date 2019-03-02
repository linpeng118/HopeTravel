<template>
  <div>
    <div class="banner">
      <a v-if="!isApp" class="return" @click="goBack" href="javascript:;"></a>
      <span class="title" style="line-height:.8rem;text-align:center;">臻品新西兰南北双岛11日自驾游</span>
    </div>
    <div class="ct">
      <h5 class="ct_title">为什么值得去</h5>
      <p class="paragraph">奇景南岛自驾1800公里，慢行漫游，享受田园诗意；
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
          <h6 class="date_h6">国内-奥克兰</h6>
          <p
            class="date_paragraph"
          >国内城市飞奥克兰，搭乘国际航班需要提前3小时抵达机场。注：本航班是以成都出发为例的参考航班，出发航班以实际购买为准。本行程为基督城落地参团，实际参团旅行从Day2行程开始。
            <br>
            <br>用餐：客人自理
            <br>参考酒店：飞机上
            <br>
          </p>
        </div>
        <div class="day2">
          <h6 class="date_h6">奥克兰(市区短途驾驶 约100KM)</h6>
          <p
            class="date_paragraph"
          >抵达“千帆之都”——奥克兰，在机场提车，并熟悉车辆设备、与领队的配合协同、以及当地右舵驾驶习惯和交通规则。奥克兰市区观光。从在著名的【皇后街】开始，感受当地日常生活。经过有丰富历史的卡郎干哈帕路和时尚的庞森比村庄，横跨海港大桥一览怀塔玛塔湾的美景。参观【海港码头】。来到奥克兰地标建筑【天空塔】（门票自理）登上328米高的观景台, 360 度俯瞰整个奥克兰市的景观。然后开车前往预订酒店休息。
            <br>
            <br>
            <br>用餐：客人自理
            <br>参考酒店：Scenic Hotel Auckland或同级
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store9/d1_1.png"
              alt
            >
          </div>
        </div>
        <div class="day3">
          <h6 class="date_h6">奥克兰-马塔马塔(霍比特人村)-罗托鲁瓦</h6>
          <p
            class="date_paragraph"
          >上午前往马塔马塔小镇，参观隐匿于美丽峰峦之间的【霍比特人村】沿途尽是新西兰地区绵延起伏的山峦和无数青翠的牧场，“中土世界”的壮丽风景一路伴随。晚上抵达罗托鲁瓦。晚上推荐体验【地狱之门泥浆浴】（费用自理）或者【波利尼西亚温泉浴】（费用自理）
            <br>
            <br>用餐：客人自理
            <br>参考酒店：Sudima Hotel Lake Rotorua或同级
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store9/d1_2.png"
              alt
            >
          </div>
        </div>
        <div class="day4">
          <h6 class="date_h6">罗托鲁瓦-怀托摩萤火虫洞-奥克兰</h6>
          <p
            class="date_paragraph"
          >上午我们将参观【怀欧塔普地热公园】（诺克斯夫人间歇泉（Lady Knox Geyser），每天10点15分 喷发，建议9:30到场。），怀欧塔普地热公园至今已上千年。它被认为是新西兰最多姿多彩和变化多端的地热景观，主要以沸腾泥潭、矿石梯田和喷泉为特色景观。下午【怀托摩萤火虫洞】游玩，成千上万的萤火虫在岩洞内熠熠生辉，灿若繁星，有人把这种自然奇观称为“世界第九大奇迹”。然后驱车返回奥克兰，沿途尽是新西兰地区绵延起伏的山峦和无数青翠的牧场，“中土世界”的壮丽风景一路伴随。傍晚回到奥克兰。
            <br>
            <br>用餐：客人自理
            <br>参考酒店：Sudima Hotel Auckland Airport
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store9/d1_3.png"
              alt
            >
          </div>
        </div>
        <div class="day5">
          <h6 class="date_h6">奥克兰 皇后镇</h6>
          <p
            class="date_paragraph"
          >参考航班：NZ617(10:35/12:25)提前2小时抵达机场办理登机手续以及还车。从奥克兰乘班机直接飞往南岛大本营——皇后镇。下午自由活动。傍晚搭乘皇后镇的【天际缆车】前往平流层餐厅享用【海鲜大餐】，欣赏瓦卡蒂普湖绝美景象。（赠送缆车+海鲜大餐）
            <br>
            <br>用餐：skyline晚餐
            <br>参考酒店：Ramada Queenstown或同级
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store9/d1_4.png"
              alt
            >
          </div>
        </div>
        <div class="day6">
          <h6 class="date_h6">皇后镇</h6>
          <p
            class="date_paragraph"
          >全天自由活动推荐行程（以下活动项目均为自选参与项目，报价不包含，我方可提前代订）：皇后镇常被人们誉为新西兰的“冒险之都”，周边可以参与各种运动项目和欣赏无限风光:【卡瓦劳大桥】—世界蹦极跳的发源地；或者飞机带你飞至瓦卡蒂普湖盆地（Wakatipubasin）上方，来一场【跳伞】，速降过程中可以360度俯瞰壮观的山脉和湖泊美景；乘上【喷射快艇】，在激流中快速穿梭于高山峡谷间；在皇冠峰体验新西兰最高商用机场起飞的【滑翔伞】；或者体验【飞机驾驶】，在这儿只要20分钟就能学会，你可以操控起飞、航行和降落，当然有经验丰富的驾驶员坐在你的身边保证你的安全。这一切得一切都会让你大呼过瘾。
            <br>
            <br>用餐：客人自理
            <br>参考酒店：Ramada Queenstown或同级
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store9/d1_5.png"
              alt
            >
          </div>
        </div>
        <div class="day7">
          <h6 class="date_h6">皇后镇-瓦纳卡</h6>
          <p
            class="date_paragraph"
          >早餐后，可自驾前往【格林诺奇】，然后前往【箭镇】保持着它的历史特点。有60多处19世纪以来的历史建筑。淘金的历史在很久以前就结束了(但是你仍然有机会在河里淘到金子)，因此箭镇现在主要以旅游为主。前往【瓦纳卡】“孤独的树”是瓦纳卡湖标志性的景色。
            <br>
            <br>用餐：客人自理
            <br>参考酒店：Manuka Crescent Motel或同级
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store9/d1_6.png"
              alt
            >
          </div>
        </div>
        <div class="day8">
          <h6 class="date_h6">瓦纳卡-特威泽尔</h6>
          <p class="date_paragraph">早餐后，可以自费参加【瓦纳卡体验开飞机】。
            <br>用餐：客人自理
            <br>参考酒店：Mountain Chalets Motel或同级
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store9/d1_7.png"
              alt
            >
          </div>
        </div>
        <div class="day9">
          <h6 class="date_h6">特威泽尔-库克山-蒂卡波-基督城</h6>
          <p
            class="date_paragraph"
          >蒂卡波湖的特别之处在于湖水的颜色-乳蓝色。我们将游览著名的【好牧羊人教堂】，好牧羊人教堂以一只牧羊犬的雕塑而命名，是对过去开创农田和Mackenzie地区的先驱者的一个称颂，永远铭记下他们的丰功伟绩，十分有纪念意义。许多新人选择在这里办婚礼。游览完好牧羊人教堂之后,我们将驱车前往基督城。
            <br>
            <br>用餐：客人自理
            <br>参考酒店：City Centre Motel或同级
            <br>
          </p>
          <div>
            <img
              class="date-img"
              src="../../assets/imgs/custom/store9/d1_8.png"
              alt
            >
          </div>
        </div>
        <div class="day10">
          <h6 class="date_h6">基督城-国内</h6>
          <p
            class="date_paragraph"
          >参考航班：基督城-广州 CZ618（21:30/05:30+1）早餐后，推荐游玩【大教堂广场】、【硬纸板教堂】(外观参观)。此外基督城也是新西兰的时尚之都，您也可以选择去【Northlands 北岛购物中心】尽情购物。当晚到达机场办理还车手续，登机回国！
            <br>
            <br>用餐：客人自理
            <br>参考酒店：飞机上
            <br>
          </p>
        </div>
        <div class="day11">
          <h6 class="date_h6">国内</h6>
          <p class="date_paragraph">参考航班：广州-成都CZ3401（08:00/10:30）
            <br>结束新西兰南北岛11天自驾行程
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
            <img class="date-img" src="../../assets/imgs/custom/store9/d1_20.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store9/d1_21.png" alt="">
        </div>
        <h6 class="ct_subTitle">
            巴厘岛阿雅娜度假别墅
        </h6>
        <p class="paragraph">
            度假村位于悬崖峭壁之畔，78栋私人悬崖边别墅均提供绝对私密的环境和具有国际资质的管家提供的贴心服务。　　　　巴厘岛阿雅娜度假别墅享有度假村提供的17所餐厅、酒吧及咖啡屋，Dava莲花餐厅供应一流的新鲜牛排和海鲜烧烤，马丁尼酒吧提供受50种经典和现代式马丁尼鸡尾酒。岩石酒吧是巴厘岛标志性日落观赏地点，入住度假村的客人皆享优先进入岩石酒吧的VIP特权。
        </p>
        <div>
            <img class="date-img" src="../../assets/imgs/custom/store9/d1_22.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store9/d1_23.png" alt="">
            <img class="date-img" src="../../assets/imgs/custom/store9/d1_24.png" alt="">
      </div>-->
      <h5 class="ct_title">费用包含</h5>
      <p class="paragraph" style="border-bottom:none;">1、全程住宿：全程为精选当地特色酒店或民宿；
        <br>2、汽车租赁费及随车保险（车辆碰撞险、车辆盗抢险、第三者责任险、境外租车补充全险）（4人一车）；
        <br>3、AXA安盛集团（全球最大保险集团）皇冠级个人旅游保险（含国际救援）；
        <br>4、全程燃油费/停车费/高速通行费/对讲机租赁费/中文导航；
        <br>5、租车公司所需驾照官方翻译件；
        <br>6、行程中所列景点首道门票（特殊说明为自费项目的除外）；行程升级赠送skyline晚餐；
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
        <a v-if="!isApp" class="con-btn  " @click="clickcall('400-118-1388')" >中国咨询</a>
        <a v-if="!isApp" class="con-btn  " @click="clickcall('（001）888-933-0336')" >美国咨询</a>
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
  background: url("../../assets/imgs/custom/store9/banner.png") no-repeat center
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
