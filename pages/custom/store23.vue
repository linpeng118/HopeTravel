<template>
  <div>
    <div class="banner">
      <a v-if="!isApp" class="return" @click="goBack" href="javascript:;"></a>
      <span class="title">阳光美西 一号公路自驾游</span>
    </div>
    <div class="ct">
      <h5 class="ct_title">为什么值得去</h5>
      <div class="paragraph">
        <p>推荐理由</p>
        <p>这里是美国西海岸，有加州的阳光海滩，有绵延的公路海岸线、有各异的风情小镇、有回归童趣的游乐园；</p>
        <p>这里是一号公路，是被美国国家地理杂志评为一生中不可错过的50个景点之一；</p>
        <p>乘车走在美国西海岸的一号公路上，是一种享受，是一种态度，是一种洗礼，一种向往，是一种人、海和阳光的融合，是您不可错过的一次旅程。 </p>
      </div>
      <h5 class="ct_title">行程概览</h5>
      <p class="paragraph"></p>
      <h5 class="ct_title">行程详情</h5>
      <div class="date">
        <div class="day1">
          <h6 class="date_h6">北京——旧金山</h6>
          <div class="date_paragraph">
            <p style="font-weight: bold">参考航班：CA985 1600 1220</p>
            <p>抵达机场后，取车开启一号公路的自驾之旅。午饭后前往旧金山的第一站是金门大桥，橘红色的大桥跨越了旧金山湾和金门海峡，是旧金山的象征。《猩球崛起》、《X战警》等众多美国大片中也常常出现大桥的身影。之后在渔人码头感受最纯正的美式海鲜市场和应季海鲜。</p>
            <br><br>
            早餐：自理      午餐：（含餐）      晚餐：（含餐）    住宿：四星
          </div>
          <div class="imgbox">
            <img class="date-img" src="../../assets/imgs/custom/store23/img6.jpg" alt="">
          </div>
        </div>
        <div class="day2">
          <h6 class="date_h6">旧金山-蒙特雷（2小时）</h6>
          <div class="date_paragraph">
            早上自驾从旧金山前往蒙特雷，途中您可以看到鸽子角灯塔，是喜欢拍照星人的打卡胜地。还会途经蒙特雷湾，可以在这里观鲸捕鱼，欣赏美丽的景色，再来到蒙特雷的渔人码头，体验不同于旧金山的渔港，享用晚餐。
            <br><br>
            早餐：（含餐）      午餐：（含餐）      晚餐：（含餐）    住宿：四星
          </div>
          <div class="imgbox">
            <img src="../../assets/imgs/custom/store23/img9.jpg" alt="">
          </div>
        </div>
        <div class="day3">
          <h6 class="date_h6">蒙特雷-途中（或者SANTA MARIA，或者其他地方，根据酒店情况）</h6>
          <div class="date_paragraph">
            上午游览蒙特雷湾水族馆，这里依海而建，是美国最大、世界最好的水族馆之一，午饭后开始游览一号公路的精华所在——17里湾风景线，这里风景绝美，建议多些时间在此自驾游玩，沿17里向南自驾便可来到美丽的卡梅尔小镇。当然您也可以选择在卡梅尔小镇度过一个舒适的下午时光。您可以安安静静地享受细软的沙滩和壮美的海岸线景色，感受浓浓的波希米亚与加州风情，体验这里浓厚的艺术氛围
            <br><br>
            早餐：（含餐）      午餐：（含餐）      晚餐：（含餐）    住宿：四星
          </div>
          <div class="imgbox">
            <img src="../../assets/imgs/custom/store23/img3.jpg" alt="">
            <img src="../../assets/imgs/custom/store23/img2.jpg" alt="">
          </div>
        </div>
        <div class="day4">
          <h6 class="date_h6">途中-圣塔芭芭拉-索尔万-洛杉矶</h6>
          <div class="date_paragraph">
            出发前往西班牙风情的圣芭芭拉。可以游览著名的县法院、滨海区等景点，然后前往索尔万。走进小镇，仿佛来到一个北欧城镇，眼前所见全部都是木质建筑，在这里除了教堂不会见到其他高楼或水泥建筑。房屋都是典型的丹麦风格，红格的、绿顶的、白墙的、蓝盖的，再配着老式的风车和肃穆的教堂，街道两旁净是鲜花绿草，让人仿佛置身童话世界。后再乘车前往天使之城-洛杉矶。入住酒店休息。
            <br><br>
            早餐：（含餐）      午餐：（含餐）      晚餐： （含餐）    住宿：四星
          </div>
          <div class="imgbox">
            <img src="../../assets/imgs/custom/store23/img14.jpg" alt="">
          </div>
        </div>
        <div class="day5">
          <h6 class="date_h6">洛杉矶-圣地亚哥-洛杉矶</h6>
          <div class="date_paragraph">
            酒店内早餐后，乘车前往美墨边境城市，游览美丽的南加州海岸线——圣地亚哥。抵达后游览美丽而充满乐趣的历史古城-【圣地亚哥老城】，美国太平洋舰队的最大军港-【圣地亚哥港】，有机会一睹世界强大的航母停靠港。游玩结束，驱车返回洛杉矶入住酒店休息。
            <br><br>
            早餐：（含餐）      午餐：（含餐）      晚餐：（含餐）    住宿：四星
          </div>
          <div class="imgbox">
            <img src="../../assets/imgs/custom/store23/img10.jpg" alt="">
          </div>
        </div>
        <div class="day6">
          <h6 class="date_h6">洛杉矶</h6>
          <div class="date_paragraph">
            早餐后，乘车前往游览环球影城。乘电动拖车赴各电影拍摄布景区，真实感受旧金山大地震、洪水爆发、大白鲨食人等场景的惊心动魄，并乘船回到恐龙时代的侏罗纪公园，以及体验芝加哥大火的热浪冲击等。下午参观比华利山庄、好莱坞明星大道，中国大戏院等景点。晚餐后，入住酒店休息
            <br><br>
            早餐：（含餐）      午餐：（含餐）      晚餐：（含餐）    住宿：四星
          </div>
          <div class="imgbox">
            <img src="../../assets/imgs/custom/store23/img4.jpg" alt="">
          </div>
        </div>
        <div class="day7">
          <h6 class="date_h6">洛杉矶</h6>
          <div class="date_paragraph">
            早餐后，乘车前往圣塔莫尼卡。参观被称为是圣塔莫尼卡象征的圣塔莫尼卡码头，玩具博物馆科天使阁楼，第三街步行区，这里有一条车辆无法通行的专门用来游行表演的街道。(Santa Monica )一个悠闲的小镇,位于加州的洛杉矶，这里有洛杉矶最有名的海滩之一的Santa Monica State Beach和著名的圣塔莫尼卡码头，还有在Santa Monica Place的步行购物街那里卖的东西，代表了世界上最新的休闲潮流，是休闲服装的购物天堂。
            <br><br>
            早餐：（含餐）      午餐：（含餐）      晚餐： （含餐）    住宿：四星
          </div>
          <div class="imgbox">
            <img src="../../assets/imgs/custom/store23/img12.jpg" alt="">
          </div>
        </div>
        <div class="day8">
          <h6 class="date_h6">洛杉矶———北京</h6>
          <div class="date_paragraph">
            <p>CA888 1130 1510+1</p>
            <p>早餐后乘车前往洛杉矶国际机场回京。</p>
            <br><br>
            早餐：（含餐）      午餐： 自理      晚餐：自理
          </div>
        </div>
        <div class="day9">
          <h6 class="date_h6">北京</h6>
          <div class="date_paragraph">

            <p>抵达北京</p>

          </div>
        </div>

      </div>

      <h5 class="ct_title">一号公路定制游</h5>
      <p class="paragraph" style="border-bottom:none;">
        <span style="font-weight: bold">境外地接价:</span><br>
        4人费用：2325美金/人（包含机票费用：参考费用810美金/人）
        <br>全程单房差 550美金/人
        <br>
        <span style="font-weight: bold">参考酒店（具体以预定为准）</span>
        <br>旧金山：Crowne Plaza Sfo 4*或同级
        <br>蒙特雷：Hilton Garden Inn Monterey 4*或同级
        <br>索尔万(隆波克）：Embassy Suites Lompoc 4*或同级
        <br>洛杉矶： Courtyard 4*或同级
      </p>
      <p class="paragraph" style="border-bottom:none;">
        <span style="font-weight: bold">旅游费用包含：</span>
        <br>1.境外用车  7座VAN
        <br>2.境外住宿  包含全程7晚住宿
        <br>3. 境外用餐  酒店内早餐或外早，正餐建议客人自理，导游协助
        <br>4. 司导服务  专业中文导游兼司机，服务费，小费、水费、住宿补助等
        <br>5. 游览项目  17英里，赫氏古堡，环球影城一日游门票
        <br>6. 旅游保险	境外旅游意外伤害险
        <br>
      </p>
      <p class="paragraph" style="border-bottom:none;">
        <span style="font-weight: bold">旅游费用不含：</span>
        <br>
        全程正餐；护照费，签证费；自愿购买的旅游意外伤害保险；国内地面服务费；行李物品保管费及托运行李超重费；个人消费所需费用；各种洗衣、电话、饮料等个人消费；行程之外的观光节目报价；全程司机；因交通延阻、罢工、大风、大雾、航班取消或更改时间等不可抗力原因所引致的额外费用；旅游费用包含内容以外的所有费用。
      </p>
      <p>注：酒店，机票价格随时有波动，故以上价格供参考。</p>
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
  @import '../../assets/style/custom/index';

  .banner {
    background: url("../../assets/imgs/custom/2.jpg") no-repeat center
    center/750px 438px;
    width: 750px;
    height: 438px;
    position: relative;
  }
  .imgbox{
    width: 625px;height: auto;
    img{
      width: 625px;
      height: auto;
    }
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
