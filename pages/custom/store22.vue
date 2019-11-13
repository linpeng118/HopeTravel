<template>
  <div>
    <div class="banner">
      <a v-if="!isApp" class="return" @click="goBack" href="javascript:;"></a>
      <span class="title">畅玩美国东海岸12天</span>
    </div>
    <div class="ct">
      <h5 class="ct_title">为什么值得去</h5>
      <div class="paragraph">
        <p>推荐理由</p>
        <p>【纽约】——世界中心</p>
        <p>纽约市就像一首交响曲，喧嚣、匆忙、活力跃动，令人筋疲力尽但又变化无穷。</p>
        <p>【费城】——友爱之城 </p>
        <p>历史悠久、生机勃勃的费城，有时在这里能够比首都还能更好地接触到美国早期历史。</p>
        <p>【华盛顿】——美国首都</p>
        <p>无关政治派别，任是谁都很难不爱上这个国家的首都。这个有很多正待你去发现。</p>
        <p>【布法罗】——体会万马奔腾的恢弘气势！</p>
        <p>亲历自然界七大奇迹之一的尼亚加拉大瀑布，感受心灵的震颤；乘坐雾中少女号游船，近距离观赏大瀑布。</p>
      </div>
      <h5 class="ct_title">行程概览</h5>
      <p class="paragraph"></p>
      <h5 class="ct_title">行程详情</h5>
      <div class="date">
        <div class="day1">
          <h6 class="date_h6">北京——纽约</h6>
          <div class="date_paragraph">
            <p>搭乘国际航班前往纽约。</p>
            <p style="font-weight: bold">参考航班：CA981（13:00-14:30）飞行时间13小时30分钟</p>
            <p>纽约是美国第一大城市，也是美国商业、金融及贸易中心，以其繁华每年吸引无数游客来此参观。</p>
            <p>抵达后入住酒店内休息。</p>
            <p style="font-weight: bold;">参考酒店：DoubleTree by Hilton Fort Lee - George Washington Bridge或同级</p>
            <br><br>
            早餐：自理      午餐：自理      晚餐：自理      住宿：国际四星
          </div>
        </div>
        <div class="day2">
          <h6 class="date_h6">纽约</h6>
          <div class="date_paragraph">
            早餐后，纽约市区观光：世界金融中心华尔街。华尔街位于被誉为美国的象征、纽约的精华的曼哈顿岛最南端，它以其魔幻般的巨大威力，对世界经济产生着巨大的影响。联合国大厦（外观）：耸立在曼哈顿岛东岸、横跨纽约市东河两岸的联合国总部是和平的象征和希望的灯塔。百老汇大街：世界上还没有一条街道像百老汇大道（Broadway）那样使人充满幻想。 洛克菲勒中心（外观）：洛克菲勒中心已发展成为了掌领纽约主导权的标志性存在的建筑。是世界上最大的商业和娱乐中心之一。
            您还可在象征美国自由精神的标志--自由女神像前摄影留念。每一个景点，都必给您留下不可磨灭的印象。 时代广场：纽约通常称公园为“广场”，而这里既不是公园，也不是四方形的广场，而是一块三角地带。
            <p style="font-weight: bold">参考酒店：DoubleTree by Hilton Fort Lee - George Washington Bridge或同级</p>
            <br><br>
            早餐：含餐      午餐：含餐      晚餐：含餐      住宿：国际四星
          </div>
          <div class="imgbox">
            <img src="../../assets/imgs/custom/store22/img11.jpg" alt="">
          </div>
        </div>
        <div class="day3">
          <h6 class="date_h6">纽约-woodbury-纽约</h6>
          <p class="date_paragraph">早餐后，车程前往美东购物圣地【woodbury】美东最大的奥莱，Woodbury Common Premium Outlets 有DIOR  GUCCI CHANNEL的折扣，和所有中档牌子 200多个牌子是折扣店。 新泽西有个jersy garden mall 这里有很多折扣商品，衣服和鞋子免税，中档牌子较全。为亲朋好友挑选礼物。晚餐后入住酒店休息。
            <br>参考酒店：DoubleTree by Hilton Fort Lee - George Washington Bridge或同级
            <br>
            <br><br>
            早餐：含餐      午餐：含餐      晚餐：含餐      住宿：国际四星
          </p>
          <div class="imgbox">
            <img
              class="date-img"
              src="../../assets/imgs/custom/store22/img13.jpg"
              alt
            >

          </div>
        </div>
        <div class="day4">
          <h6 class="date_h6">纽约 - 费城 - 华盛顿</h6>
          <p
            class="date_paragraph"
          >早餐后，乘车前往华盛顿, 途经美国旧国都费城，1776年美国发表独立宣言，脱离英国统治即建都于费城，参观费城【独立宫】、【独立广场】、【自由钟】及旧国会大厦等。 抵达后游览华盛顿市内的林阴大道，整齐宽阔、建筑宏伟华丽；参观在英美战争后被火熏黑的墙面，被刷成白色的总统府——【白宫】（外观，约30分钟）--美国的督府的心脏所在地；巍严耸立高169米的【华盛顿纪念碑】；宏伟壮丽的【国会大厦】（外观，约30分钟）、以及一座古希腊式的白色雄伟建筑【林肯纪念堂】（约40分钟）、风格独特的《独立宣言》撰写者【杰佛逊纪念堂】（约30分钟）等。

            <br>
            <br>参考酒店：Sheraton College Park North Hotel或同级
            <br>
            <br>早餐：含餐      午餐：含餐      晚餐：含餐      住宿：国际四星
          </p>
          <div class="imgbox">
            <img
              class="date-img"
              src="../../assets/imgs/custom/store22/img14.jpg"
              alt
            >

          </div>
        </div>
        <div class="day5">
          <h6 class="date_h6">华盛顿-布法罗  （拉车时间较长）</h6>
          <p class="date_paragraph">
            早餐后开车前往布法罗，抵达后入住酒店休息
            <br>参考酒店：Hyatt Place Buffalo/Amherst或同级
            <br>
            <br>
            <br>早餐：含餐      午餐：含餐      晚餐：含餐      住宿：国际四星
          </p>
          <div>

          </div>
        </div>
        <div class="day6">
          <h6 class="date_h6">布法罗-尼亚加拉大瀑布</h6>
          <p class="date_paragraph">早餐后，欣赏【尼亚加拉大瀑布】乘“坐雾中少女号游船”，该瀑布位于加拿大和美国交界的尼亚加拉河中段地区，有着世界七大奇景之一的美誉，与南美的伊瓜苏瀑布及非洲的维多利亚瀑布合称世界三大瀑布。它宏伟的气势，丰沛而浩瀚的水汽，震撼了所有的游人。后入住酒店休息。
            <br>
            <br>参考酒店：Hyatt Place Buffalo/Amherst或同级
            <br>
            <br>早餐：含餐      午餐：含餐      晚餐：含餐      住宿：国际四星
          </p>
          <div class="imgbox">
            <img
              class="date-img"
              src="../../assets/imgs/custom/store22/img17.jpg"
              alt
            >
          </div>
        </div>
        <div class="day7">
          <h6 class="date_h6">布法罗-纽约（拉车时间较长）</h6>
          <p
            class="date_paragraph"
          >早餐后开车前往纽约，抵达后入住酒店休息
            <br>
            <br>
            <br>参考酒店：DoubleTree by Hilton Fort Lee - George Washington Bridge或同级
            <br><br>早餐：含餐      午餐：含餐      晚餐：含餐      住宿：国际四星
          </p>
        </div>
        <div class="day8">
          <h6 class="date_h6">纽约-波士顿</h6>
          <p
            class="date_paragraph"
          >早餐后乘车前往波士顿，抵达后驱车前往查尔斯河，查尔斯河从市中心延伸到剑桥市，河面宽阔，两岸排列着哈佛，MIT和波士顿大学等名校以及摩天大楼，俨然成为波士顿的平面地标。河南岸是波士顿城区，那里有古老的灯塔山老建筑聚集区，也有着摩天大楼聚集的CBD区。河北岸则是著名的剑桥镇，学术氛围浓厚，哈佛大学与麻省理工学院均座落于此。站在联通城区与剑桥的朗费洛桥，新老波士顿的历史沧桑尽收眼底。它蜿蜒六英里，波士顿城因此而妩媚生动起来。然后前往自由之路，它是一条从波士顿公园到查尔斯顿之间的一条由红砖铺成的，曲折延伸3公里多的街道，沿途多为17、18世纪的房舍、教堂和独立战争遗址，是波士顿历史发展的重要之路，也是波士顿政府极力推广的旅游景点。
            <br>游览结束后入住酒店休息。
            <br>
            <br>参考酒店：Crowne Plaza Boston - Woburn或同级
            <br><br>早餐：含餐      午餐：含餐      晚餐：含餐      住宿：国际四星
          </p>
          <div class="imgbox">
            <img
              class="date-img"
              src="../../assets/imgs/custom/store22/img15.jpg"
              alt
            >
          </div>
      </div>
        <div class="day9">
          <h6 class="date_h6">波士顿-纽约</h6>
          <p
            class="date_paragraph"
          >早餐后，乘车前往纽约，行程途中，经过耶鲁大学，是一所坐落于美国康涅狄格州纽黑文的顶尖私立研究型大学，被公认为全美乃至世界最好的私立大学之一；是八所常春藤盟校中最重视本科教育的一所大学；也是美国最具影响力的顶尖私立大学之一；还是美国建立的第三所大学。它与哈佛大学、普林斯顿大学齐名，历年来共同角逐美国大学本科生院和研究生院前三名的位置。在耶鲁您可以感受世界名校的教育文化。
            <br>游览结束后入住酒店休息。
            <br>
            <br>参考酒店：DoubleTree by Hilton Fort Lee - George Washington Bridge或同级
            <br><br>早餐：含餐      午餐：含餐      晚餐：含餐      住宿：国际四星
          </p>
          <div class="imgbox">
            <img
              class="date-img"
              src="../../assets/imgs/custom/store22/img12.jpg"
              alt
            >
          </div>
        </div>
        <div class="day10">
          <h6 class="date_h6">纽约</h6>
          <p
            class="date_paragraph"
          >早餐后，乘车前往【美国自然历史博物馆】是世界上规模最大的自然史博物馆，因为博物馆奇妙夜等电影，这里广为大家熟知，展品确实极其丰富，占地面积为7公顷。该博物馆是一座综合罗马与文艺复兴样式的雄伟大厦，始建于1869年，迄今已有100多年的馆史。这里还是《博物馆奇妙夜》、《侏罗纪公园》等电影的拍摄地以及《老友记》中Ross工作的地方，所以每年吸引着无数自然、电影爱好者前来游览欣赏。
            <br>
            <br>
            <br>参考酒店：DoubleTree by Hilton Fort Lee - George Washington Bridge或同级
            <br><br>早餐：含餐      午餐：含餐      晚餐：含餐      住宿：国际四星
          </p>
          <div class="imgbox">
            <img
              class="date-img"
              src="../../assets/imgs/custom/store22/img16.jpg"
              alt
            >
          </div>
        </div>
        <div class="day11">
        <h6 class="date_h6">纽约————北京</h6>
        <p
          class="date_paragraph"
        >根据航班前往机场送机。
          <br>
          <br>
          <br>参考航班：CA982（16:50-18:20+1）飞行时间13小时30分钟
          <br><br>早餐：含餐      午餐：自理      晚餐：自理      住宿：飞机上
        </p>
      </div>
        <div class="day12">
          <p
            class="date_paragraph"
          >抵达北京，结束愉悦的行程，回到温馨的家
            <br>
            <br>
            <br>参考航班：CA982（16:50-18:20+1）飞行时间13小时30分钟
            <br>
          </p>
        </div>

      </div>

      <h5 class="ct_title">费用报价：2764美金/人（按8人核算）</h5>
      <p class="paragraph" style="border-bottom:none;">
        <span style="font-weight: bold">费用包含（美金）</span><br>
        1. 大交通：922元/人   北京—纽约往返国际航班机票（含税费，以具体时间为准）
        <br>2. 酒店：648元/人     1295元（包含行程中10晚酒店标准间住宿）
        <br>3. 用餐：321元/人      6早18正餐，早餐25元/人，中餐9元/人，晚餐10元/人
        <br>4. 当地用车：684元/人  12-15座高顶奔驰5465元/辆（按8人核算，不足人数请补足车费
        <br>5. 景点门票：57元/人   自由女神游船-不上岛14 +美国自然历史博物馆23+ 雾中少女号游船20
        <br>6. 导游：30元/人      240元/团  （当地中文导游服务）（按8人核算，不足人数请补足费用）
        <br>7. 司机导游住宿：36元/人  290元/团（司机导游分开住宿）（按8人核算，不足人数请补足费用）
        <br>8. 小费：55元        5元/天*11天=55元
        <br>9. 其他：11元/人     每人每天一瓶矿泉水
        <br>
      </p>
      <p class="paragraph" style="border-bottom:none;">
        <span style="font-weight: bold">费用不含</span><br>
        1.签证费用；
        <br>2. 出入境个人物品海关征税；
        <br>3. 超重行李的托运费、保管费;
        <br>4. 因交通延阻、罢工、天气、机器故障等不可抗力原因所导致的额外费用；
        <br>5. 酒店内洗衣、理发、电话、传真、收费电视、饮品、烟酒等个人消费;
        <br>6. 自由活动期间的用车服务; 提供导游服务的产品在自由活动期间无陪同服务;
        <br>7. “费用包含”中不包含的其它项目。
        <br>
      </p>
    </div>

    <footer-custom></footer-custom>
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
  import FooterCustom from '@/components/footer/custom'

  export default {
    name: "component_name",
    components:{
      FooterCustom
    },
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
  @import '../../assets/style/custom/index';
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
    background: url("../../assets/imgs/custom/1.jpg") no-repeat center
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
