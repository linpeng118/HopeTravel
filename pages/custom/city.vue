<template>
  <div class="custom-page"
       ref="refCustomPage">
    <div class="custom-content">
      <!-- header -->
      <normal-header v-if="!isApp"
                     :title="'私人定制'"
                     :transparent="isTransparent"
                     fixed />
      <!-- banner -->

      <div class="banner ">
        <div class="bannerbox2 mainbg"></div>
        <div class="bannerbox "></div>
        <div class="bannerbox3 "></div>
        <div class="tag-sel">
          <p class="ptype1 basebg" v-if="hidelist" @click="hidelist=false">
            <i class="iconadd"><img src="../../assets/imgs/icon_pos@2x.png" alt=""></i>
            <span class="span1">{{objpro.custom.ch_name||''}}</span>
            <span class="span2">{{objpro.custom.en_name||''}}</span>
            <i class="icondown"><img src="../../assets/imgs/newcustom/down.png" alt=""></i>
          </p>
          <p class="ptype2 basebg" v-if="!hidelist" @click="hidelist=true">
            <i class="iconadd"><img src="../../assets/imgs/icon_pos@2x.png" alt=""></i>
            <span class="span1">{{objpro.custom.ch_name}}</span>
            <span class="span2">{{objpro.custom.en_name}}</span>
            <i class="icondown"><img src="../../assets/imgs/newcustom/down.png" alt=""></i>
          </p>
          <div v-if="!hidelist" class="setlistbox">

            <p class="ptype3 basebg" @click="newitem(item.id)" v-for="(item,ind) in objlist" :key="ind" :style="ind+1!=objlist.length?'border-radius:0':''" >
              <i class="iconadd"><img src="../../assets/imgs/icon_pos@2x.png" alt="" style="opacity: 0"></i>
              <span class="span1">{{item.ch_name}}</span>
              <span class="span2">{{item.en_name||''}}</span>
              <i class="icondown">
                <img :style="objId==item.id?'opacity:1':'opacity:0'" src="../../assets/imgs/newcustom/checkmark@2x.png" alt="">
              </i>
            </p>

          </div>
        </div>
        <div class="tag-list">
          <div class="tagitem" @click="backelse(1)"><a>客人评价</a></div>
          <div class="tagitem" @click="backelse(2)"><a>经典路线</a></div>
          <div class="tagitem" @click="backelse(3)"><a>专属顾问</a></div>
        </div>
        <div class="form-wrap">
          <div class="setover" ref="boxover">
            <div class="setover2" ref="conover">
              <p class="from-swiper" v-for="item in swiperuser"
                 :key="item.name">
                <span class="basecolor">{{item.name}}&nbsp;&nbsp;{{item.phone.substr(0,3)}}****{{item.phone.substr(6,4)}}</span>
                <span>&nbsp;&nbsp;{{item.time}}&nbsp;&nbsp;</span>
                <span class="basecolor">咨询</span>
              </p>
            </div>

          </div>
          <div class="form">
            <!-- 地点 -->
            <div class="form-input">
              <div class="left-icon icon-addr"></div>
              <input type="text" placeholder="请填写您想去的目的地或景点" v-model="address" class="setinput">
            </div>
            <!-- 手机号码 -->
            <div class="form-input phone">
              <div class="left-icon icon-phone"></div>
              <div class="elsequ" @click="showsel=true">{{checkqu}}<van-icon name="arrow" /></div>
              <input type="text" placeholder="请填写您的电话号码" v-model="phone" class="setinput">
            </div>
            <!-- 验证码 -->
            <div class="form-input phone">
              <div class="left-icon"></div>
              <input type="text" placeholder="请输入验证码" v-model="code" class="setinput">
              <div class="code-icon" @click="getCode"
                   :class="concode?'basecolor baseboder':''">{{showText}}</div>
            </div>

            <!-- 定制按钮 -->
            <van-button class=" tours-button-no-bg btn-custom basebg" size="large" :loading="submiting" @click="onCustom">开始定制</van-button>
          </div>
        </div>
      </div>
      <!-- 静态-->
      <div class="descbox">
        <div class="descitem">
          <div class="desc-img" ><img class="img" src="../../assets/imgs/newcustom/904@2x.png" alt="" ></div>
          <div class="desc-pbox">
            <p>
              <span class="basecolor">8,000+</span>用户选择稀饭旅行</p>
            <p>专业团队为您提供优质服务</p>
          </div>
        </div>
        <div class="descitem">
          <div class="desc-img"><img class="img" src="../../assets/imgs/newcustom/906@2x.png" alt="" ></div>
          <div class="desc-pbox">
            <p><span class="basecolor">95%+</span>服务好评率</p>
            <p>管家式服务，出行有保障</p>
          </div>
        </div>
        <div class="ab-icom" @click="toList2()">
          <img class="abimg" src="../../assets/imgs/newcustom/921@2x.png" alt="">
        </div>
      </div>

      <!-- 客人评价 -->
      <div class="season-recommend" ref="pingjia" v-if="showpingjia">
        <div class="season-title">客人评价</div>
        <div class="season-wrap swiper-container"
             v-swiper:mySwiper="swiperOption" >
          <div class="swiper-wrapper setsw">
            <div class="swiper-slide"
                 v-for="(item,ind) in objpro.custom_view"
                 :key="ind">
              <div class="season-item">
                <img :src="item.master_image_url"
                     alt="img">
                <div class="season-body">
                  <p class="season-body-title basecolor">{{item.title||''}}</p>
                  <p class="season-body-else ">{{item.name}} | {{item.time.substr(0,7)}}</p>
                  <h3 class="season-body-desc no-wrap-line3">{{item.content}}</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination "></div>
        </div>
        <div class="btn-more baseboder basecolor" @click="toList">立即定制</div>
      </div>
      <!-- 经典路线 -->
      <div class="season-recommend" style=" height: auto!important;" ref="luxian" v-if="showpingjia2" >
        <div class="season-title">经典路线</div>
        <div class="season-item2" v-for="item in objpro.custom_spot" :key="item.id" @click="onSeasonRecommend(item)">
          <div class="imgbox">
            <img :src="item.image_url" alt="">
          </div>
          <p class="season-title2">{{item.title}}</p>
          <ul class="season-ul">
            <li><i class="basebg"></i>{{item.point1}}</li>
            <li><i class="basebg"></i>{{item.point2}}</li>
            <li><i class="basebg"></i>{{item.point3}}</li>
          </ul>
          <p class="season-price basecolor">参考价格：<span class="pricebig">￥ {{item.price}}</span> 人/起</p>
        </div>
        <div class="btn-more baseboder basecolor" @click="toList">立即定制</div>
        <div class="season-else"></div>

      </div>
      <!-- 专属顾问 -->
      <div class="season-recommend" ref="guwen">
        <div class="season-title">您的专属顾问</div>
        <div class="season-wrap swiper-container"
              v-swiper:mySwiper2="swiperOption2">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="swiper-else">
                <li>
                  <div class="imgbox">
                    <img src="../../assets/imgs/newcustom/872629054653392492(2)@2x.png" alt="">
                  </div>
                  <p class="pname">Elaine.江</p>
                  <p class="p2">旅游行业：4年</p>
                  <p class="p3">新西兰 / 澳洲 / 美国</p>
                </li>
                <li>
                  <div class="imgbox">
                    <img src="../../assets/imgs/newcustom/448d62ba3846963ad9ae26a18207118@2x.png" alt="">
                  </div>
                  <p class="pname">李汀</p>
                  <p class="p2">旅游行业：8年</p>
                  <p class="p3">东南亚 / 摩洛哥 / 土耳其</p>
                </li>
                <li>
                  <div class="imgbox">
                    <img src="../../assets/imgs/newcustom/237733491447598803(2)@2x.png" alt="">
                  </div>
                  <p class="pname">SKY.海</p>
                  <p class="p2">旅游行业：6年</p>
                  <p class="p3">海岛 / 日本 / 希腊</p>
                </li>
                <li>
                  <div class="imgbox">
                    <img src="../../assets/imgs/newcustom/44458612664068507@2x.png" alt="">
                  </div>
                  <p class="pname">Liang yu</p>
                  <p class="p2">旅游行业：6年</p>
                  <p class="p3">欧洲 / 新加坡 / 巴厘岛</p>
                </li>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="swiper-else">
                <li>
                  <div class="imgbox">
                    <img src="../../assets/imgs/newcustom/5d61d128-27aa-408c-be69-215c3d76c48a@2x.png" alt="">
                  </div>
                  <p class="pname">Nate.帆</p>
                  <p class="p2">旅游行业：5年</p>
                  <p class="p3">毛里求斯 / 迪拜 / 北欧</p>
                </li>
                <li>
                  <div class="imgbox">
                    <img src="../../assets/imgs/newcustom/672a1fe214ece9ef76207cd13b3c500@2x.png" alt="">
                  </div>
                  <p class="pname">Elliott</p>
                  <p class="p2">旅游行业：3年</p>
                  <p class="p3">美国 / 加拿大</p>
                </li>
                <li>
                  <div class="imgbox">
                    <img src="../../assets/imgs/newcustom/861493c6411cb005060fc0d3251dc38@2x.png" alt="">
                  </div>
                  <p class="pname">Gabriel</p>
                  <p class="p2">旅游行业：5年</p>
                  <p class="p3">澳洲</p>
                </li>
                <li>
                  <div class="imgbox">
                    <img src="../../assets/imgs/newcustom/wKgBs1cga7GAeyMaAAkpeo2rFFE86@2x.png" alt="">
                  </div>
                  <p class="pname">keith</p>
                  <p class="p2">旅游行业：5年</p>
                  <p class="p3">日本 / 韩国</p>
                </li>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="swiper-else">
                <li>
                  <div class="imgbox">
                    <img src="../../assets/imgs/newcustom/user8.png" alt="">
                  </div>
                  <p class="pname">Angie Xi </p>
                  <p class="p2">旅游行业：5年</p>
                  <p class="p3">美国/欧洲</p>
                </li>
                <li>
                  <div class="imgbox">
                    <img src="../../assets/imgs/newcustom/user12.png" alt="">
                  </div>
                  <p class="pname">郭雨 </p>
                  <p class="p2">旅游行业：8年</p>
                  <p class="p3"> 欧洲/非洲</p>
                </li>

              </div>
            </div>

          </div>
        </div>
        <div class="swiper-pagination" id="swiperelse" style="position: relative"></div>
        <div class="btn-more baseboder basecolor" @click="toList">立即定制</div>
      </div>
      <!--第二个from-->
      <div class="banner2 ">
        <div class="bannerbox2 mainbg"></div>
        <div class="bannerbox "></div>
        <div class="form-wrap">
          <h1 class="banner-title">私人定制</h1>
          <h3 class="banner-desc">旅游自由随心，体验独一无二</h3>
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

            <!-- 验证码 -->
            <div class="form-input phone">
              <div class="left-icon"></div>
              <input type="text" placeholder="请输入验证码" v-model="code1" class="setinput">
              <div class="code-icon" @click="getCode1"
                   :class="concode1?'basecolor baseboder':''">{{showText1}}</div>
            </div>
            <!-- 定制按钮 -->
            <van-button class=" tours-button-no-bg btn-custom basebg"
                        size="large"
                        :loading="submiting"
                        @click="onCustom2">开始定制</van-button>
          </div>
        </div>
      </div>
      <!-- 承诺/服务 -->
      <div class="features">
        <div class="features-list">
          <div class="item"
               v-for="item in featureList"
               :key="item.title">
            <img :src="item.img"
                 alt>
            <p class="features-item-title">{{item.title1}}</p>
            <p class="features-item-title">{{item.title2}}</p>
          </div>
        </div>
      </div>
      <van-popup v-model="showsel" position="right" style="width:100%;height: 100%;">
        <tel-code :pageparent="'/personal/addContacts'"
                  :dataObj="columns"
                  @selectCode="onChangequ"
                  @back="showsel=false">
        </tel-code>
      </van-popup>

    </div>
    <div class="back-top" v-if="!isApp"
         @click="showcall2()">
    </div>

    <!--<loading v-show="loading"></loading>-->
  </div>
</template>

<script>
  import {throttle as _throttle} from "lodash";
  import NormalHeader from "@/components/header/custom2";
  import transpTag from "@/components/tags/transparent";
  import {custom} from "@/api/custom";
  import {getcitylist} from "@/api/custom";
  import {getcustom} from "@/api/custom";
  import {isMobile} from "@/assets/js/utils";
  import Loading from '@/components/loading';
  import {mapMutations, mapState} from 'vuex';
  import {DLG_TYPE} from '@/assets/js/consts/dialog';
  import {getquhao} from '@/api/contacts'
  import onCustomerService from '@/assets/js/customerService.js'
  import {guojialist} from '@/api/contacts'
  import TelCode from '@/components/confirm_foot/telcode'
  import {getCusCode, login} from '@/api/member'
  import {LOGIN_TYPE, VERIFY_CODE, SMS_SCENE} from '@/assets/js/consts'
  const TIME = 60 // 倒计时时间
  export default {
    name: 'custom',
    components: {
      NormalHeader,
      transpTag,
      Loading,
      TelCode
    },
    data() {
      return {
        isApp: this.$route.query.platform,
        appVersion: this.$route.query.app_version,
        appLanguage: this.$route.query.language,
        appCurrency: this.$route.query.currency,
        appPhoneType: this.$route.query.phone_type,
        isTransparent: true, // 导航头是否透明
        showcall:false,
        showpingjia2:false,
        showpingjia:false,
        swiperOption: {
          centeredSlides: true, // 居中
          initialSlide:2,
          slidesPerView: "auto",
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          pagination:{
            el:'.swiper-pagination'
          }
        },
        swiperOption2: {
          loop: true,
          centeredSlides: true, // 居中
          initialSlide:0,
          slidesPerView: "auto",
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          pagination:{
            el:'#swiperelse'
          }
        },
        tagList: [
          {title: "客人评价"},
          {title: "经典路线"},
          {title: "专属顾问"}
        ],
        address: "",
        phone: "",
        wechat:'',
        address1: "",
        phone1: "",
        wechat1:'',
        tipMsg: "请输入想去的地址或景点",
        canSubmit: false,
        loading:false,
        submiting: false,
        featureList: [
          {
            img: require("../../assets/imgs/newcustom/891@2x.png"),
            title1: "全球出发",
            title2: "一人成团"
          },
          {
            img: require("../../assets/imgs/newcustom/890@2x.png"),
            title1: "私家路线",
            title2: "花样玩法"
          },
          {
            img: require("../../assets/imgs/newcustom/892@2x.png"),
            title1: "项目自选",
            title2: "费用透明",
          },
          {
            img: require("../../assets/imgs/newcustom/895@2x.png"),
            title1: "高额保险",
            title2: "安全出行"
          },
          {
            img: require("../../assets/imgs/newcustom/893@2x.png"),
            title1: "海归团队",
            title2: "专业定制"
          },
          {
            img: require("../../assets/imgs/newcustom/894@2x.png"),
            title1: "管家式",
            title2: "一对一服务"
          }
        ],
        swiperuser:[
          {name:'李先生',time:'12分钟前',phone:'137****1452'},
          {name:'赵小姐',time:'1小时前',phone:'150****0865'},
          {name:'钱先生',time:'30分钟前',phone:'170****4568'},
          {name:'孙小姐',time:'8分钟前',phone:'180****8046'},
          {name:'李小姐',time:'55分钟前',phone:'135****1245'},
          {name:'吴小姐',time:'27分钟前',phone:'186****3193'},
          {name:'郑先生',time:'2小时前',phone:'180****2589'},
          {name:'王小姐',time:'1天前',phone:'136****1254'},
          {name:'冯先生',time:'12小时前',phone:'187****6547'},
          {name:'陈小姐',time:'54分钟前',phone:'139****1478'},
          {name:'褚先生',time:'1分钟前',phone:'170****1456'},
          {name:'卫小姐',time:'20秒前',phone:'150****4587'},
          {name:'蒋先生',time:'9分钟前',phone:'137****1456'},
          {name:'沈小姐',time:'12分钟前',phone:'132****9632'},
          {name:'韩先生',time:'1小时前',phone:'137****4578'},
          {name:'杨小姐',time:'30分钟前',phone:'170****1456'},
          {name:'朱先生',time:'8分钟前',phone:'180****3194'},
          {name:'秦小姐',time:'55分钟前',phone:'135****1245'},
          {name:'尤先生',time:'27分钟前',phone:'150****7614'},
          {name:'许小姐',time:'2小时前',phone:'132****7895'},

        ],
        setInv:null,
        objId:this.$route.query.id,
        objpro:{
          custom:{},
          custom_spot:[],
          custom_view:[]
        },
        listdiqu:[],
        objlist:[],
        hidelist:true,
        showsel:false,//选择区号
        columns:[],
        checkqu:'86',
        timerx:'',
        concode:false,
        concode1:false,
        code:'',
        code1:'',
        timer: null,
        timer1: null,
        countDownTime: TIME, // 倒计时时间
        countDownTime1: TIME, // 倒计时时间
        codeType: VERIFY_CODE.START, // 获取验证码/倒计时/重新获取
        codeType1: VERIFY_CODE.START, // 获取验证码/倒计时/重新获取
      };
    },
    computed: {
      showText() {
        if (this.codeType === VERIFY_CODE.START) {
          clearInterval(this.timer)
          return this.$t('getVerifyCode')
        } else if (this.codeType === VERIFY_CODE.GETTING) {
          return `${this.countDownTime} s`+ this.$t('partcailComp.resetVerifyCode')
        } else {
          clearInterval(this.timer)
          return this.$t('partcailComp.resetVerifyCode')
        }
      },
      showText1() {
        if (this.codeType1 === VERIFY_CODE.START) {
          clearInterval(this.timer1)
          return this.$t('getVerifyCode')
        } else if (this.codeType1 === VERIFY_CODE.GETTING) {
          return `${this.countDownTime1} s`+ this.$t('partcailComp.resetVerifyCode')
        } else {
          clearInterval(this.timer1)
          return this.$t('partcailComp.resetVerifyCode')
        }
      }
    },
    watch:{
      'phone':function(val,old){
        if(old!=''){
          this.concode=true
        }
        else{
          this.concode=false
        }
      },
      'phone1':function(val,old){
        if(old!=''){
          this.concode1=true
        }
        else{
          this.concode1=false
        }
      }
    },
    activated(){
      this.getlist();
      this.getitem();
      this.getqu();
    },
    beforeMount() {
      // 判断是否APP
      if (this.isApp) {
        if (this.appVersion) {
          this.jsBridge = require("@/assets/js/jsBridge").default;
          this.vxSetPlatform(this.isApp)
          this.vxSetLanguage(this.appLanguage)
          this.vxSetCurrency(this.appCurrency)
          this.vxSetPhoneType(this.appPhoneType)
          this.vxSetAppVersion(this.appVersion)
        } else {
          this.appBridge = require("@/assets/js/appBridge").default;
        }
      }
    },
    mounted() {
      // 监听滚动
      this.$refs.refCustomPage.addEventListener(
        "scroll",
        this.scrollFn
      );

      let this_=this;
      this_.getlist();
      this_.getitem();
      this.getqu();

      if(this.setInv!=null){
        clearInterval(this.setInv)
      }
      this.setInv= setInterval(function(){ this_.setover();}, 1000);
    },
    beforeDestroy() {
      this.$refs.refCustomPage.removeEventListener('scroll', this.scrollFn)
    },
    methods: {
      ...mapMutations({
        vxSetPlatform: 'setPlatform', // 设置品台
        vxToggleDialog: 'toggleDialog', // 是否显示弹窗
        vxSetDlgType: 'setDlgType', // 设置弹窗类型
        vxSetLanguage: "setLanguage", // 设置语言
        vxSetCurrency: "setCurrency", // 设置货币
        vxSetPhoneType: "setPhoneType", // 设置机型
        vxSetAppVersion: "setAppVersion" // 设置版本
      }),


      //时间计数
      countDown() {
        this.timer = setInterval(() => {
          // console.log(this.countDownTime)
          if (this.countDownTime <= 0) {
            if(this.phone=='') {
              this.concode = false
            }
            else{
              this.concode = true
            }
            this.codeType = VERIFY_CODE.AGAIN
            this.countDownTime = TIME
            clearInterval(this.timer)
          } else {
            this.countDownTime--
          }
        }, 1000)
      },


      //时间计数
      countDown1() {
        this.timer1 = setInterval(() => {
          // console.log(this.countDownTime)
          if (this.countDownTime1 <= 0) {
            if(this.phone1=='') {
              this.concode1 = false
            }
            else{
              this.concode1 = true
            }
            this.codeType1 = VERIFY_CODE.AGAIN
            this.countDownTime1 = TIME
            clearInterval(this.timer1)
          } else {
            this.countDownTime1--
          }
        }, 1000)
      },

      // 获取验证码
      async getCode() {
        if (!this.phone||this.phone=='') {
          this.$toast(this.$t('partcailComp.enterPhone'))
          return
        }
        // 倒计时状态修改
        this.concode = false
        // 倒计时状态修改
        this.codeType = VERIFY_CODE.GETTING // 获取验证码
        try {
          const {code, msg} = await getCusCode({
            phone: `${this.checkqu}-${this.phone}`,
            scene: SMS_SCENE.LOGIN
          })
          if (code !== 0) {
            this.$toast(msg)
            this.resetTimer()
          }
          await this.countDown()
        } catch (error) {
          this.codeType = VERIFY_CODE.START
        }
      },


      // 获取验证码
      async getCode1() {
        if (!this.phone1||this.phone1=='') {
          this.$toast(this.$t('partcailComp.enterPhone'))
          return
        }
        // 倒计时状态修改
        this.concode1 = false
        // 倒计时状态修改
        this.codeType1 = VERIFY_CODE.GETTING // 获取验证码
        try {
          const {code, msg} = await getCusCode({
            phone: `${this.checkqu}-${this.phone1}`,
            scene: SMS_SCENE.LOGIN
          })
          if (code !== 0) {
            this.$toast(msg)
            this.resetTimer1()
          }
          await this.countDown1()
        } catch (error) {
          this.codeType1 = VERIFY_CODE.START
        }
      },

      // 重置定时器
      resetTimer() {
        this.codeType = VERIFY_CODE.START
        if(this.phone==''||!this.phone) {
          this.concode = false
        }
        else{
          this.concode = true
        }
        clearInterval(this.timer)
        this.countDownTime = 60
      },

      // 重置定时器
      resetTimer1() {
        this.codeType1 = VERIFY_CODE.START
        if(this.phone1==''||!this.phone1) {
          this.concode1 = false
        }
        else{
          this.concode1 = true
        }
        clearInterval(this.timer1)
        this.countDownTime1 = 60
      },

      //   得到详细信息
      async getitem(x) {
        this.loading=true;
        if(x){
          this.objId=x;
          this.hidelist=true;
        }
        if(this.objId){
          let {data, code} = await getcustom(x||this.objId)
          if(code === 0) {
            this.loading=false;
            this.objpro = data;
            this.showpingjia=true;
            this.showpingjia2=true;
            this.address=this.objpro.custom.ch_name
            this.address1=this.objpro.custom.ch_name
            this.setstyle();
          } else {
            this.loading=false;
            this.objpro = { custom:{},
              custom_spot:[],
              custom_view:[]};
          }
        }
      },

      async getlist() {
        let {data, code} = await getcitylist()
        if(code === 0) {
          this.objlist = data;
          if(!this.objId){
            this.objId=this.objlist[0].id;
            this.getitem();
          }
        }
      },
      // 得到区号
      async getqu() {

        let {data, code,msg,hot_country} = await guojialist()
        if (code === 0) {
          this._nomalLizePinyin(data,hot_country)
        }
        else {
        }

      },
      _nomalLizePinyin(data,hot) {
        let len = data.length;
        let len2 = hot.length;
        let obj = {
          '热门城市':[]
        };
        for(let i= 0; i<len2; i++) {
          obj['热门城市'].push({...hot[i]})
        }
        for(let i= 0; i<len; i++) {
          if(!obj[data[i].key]) {
            obj[data[i].key] = []
          }
          obj[data[i].key].push({...data[i]})
        }


        this.columns=obj
      },
      onChangequ(picker){
        this.checkqu=picker[0].telcode;
        this.showsel=false;
      },
      // 定制
      onCustom() {
        if (!this.address) {
          this.$toast("请输入想去的地址或景点");
          this.submiting = false;
          return;
        }
        if (!this.phone ) {
          this.$toast("请输入电话号码");
          this.submiting = false;
          return;
        }
        if (!this.code) {
          this.$toast("请输入验证码");
          this.submiting = false;
          return;
        }
        this.doCustom({
          destination: this.address,
          phone: this.checkqu+'-'+this.phone,
          wechat: '',
          code:this.code,
        });
      },
      // 电话咨询
      showcall2() {
        this.vxToggleDialog(true)
        this.vxSetDlgType(DLG_TYPE.PHONECUSTOM)
      },
      // 定制
      onCustom2() {
        if (!this.address1) {
          this.$toast("请输入想去的地址或景点");
          this.submiting = false;
          return;
        }
        if (!this.phone1) {
          this.$toast("请输入电话号码");
          this.submiting = false;
          return;
        }
        if (!this.code1) {
          this.$toast("请输入验证码");
          this.submiting = false;
          return;
        }
        this.doCustom({
          destination: this.address1,
          phone: this.checkqu+'-'+this.phone1,
          wechat: this.wechat1,
          code:this.code1,
        });
      },
      // 提交定制
      async doCustom(subData) {
        this.submiting = true;
        // console.log(1, subData);
        let {code, data, msg} = await custom(subData);
        this.$toast(msg);
        try {
          fbq('track', 'Lead')
        } catch (error) {
          console.log(error)
        }
        this.submiting = false;
        this.address1='';
        this.phone1='';
        this.wechat1='';
        this.address='';
        this.code='';
        this.code1='';
        this.phone='';
        this.wechat='';
      },
      // 季推荐
      onSeasonRecommend(item) {
        this.jumpToPage(item.url);
      },
      // 查看全部list
      toList() {
        this.backTop();
      },
      // 查看全部list
      toList2() {
        onCustomerService('custom')
      },
      // 故事
      onSlide(val) {
        this.jumpToPage(val.path);
      },
      /**
       * 页面跳转
       * @param {string} path 跳转的路劲
       */
      jumpToPage(path) {
        const myRouter = {
          path
        };
        if (this.isApp) {
          myRouter.query = {
            platform: this.isApp
          };
        }
        this.$router.push(myRouter);
      },
      newitem(x){
        this.$router.push('/custom/city?id='+x);
        this.getitem(x)

      },
      //循环滚动函数
      setover(){
        var this_=this;
        try {
          const h1 = this.$refs.boxover.offsetHeight;
          const hall = this.$refs.conover.offsetHeight;
          const mnow = parseInt(this.$refs.conover.style.marginTop);
          if((hall+mnow-h1)>0){
            this.$refs.conover.style.marginTop=(mnow-h1)+'px';
            this.$refs.conover.style.transition='all .8s';
          }
          else{
            this.$refs.conover.style.marginTop=0;
            this.$refs.conover.style.transition='none';
          }

        } catch(err) {
          if(this.setInv!=null){
            clearInterval(this.setInv)
          }
          this.setInv= setInterval(function(){ this_.setover();}, 1000);
        }

      },
      // 滚动函数
      scrollFn() {
        this.hidelist=true;
        const s1 = this.$refs.refCustomPage.scrollTop;
        if (this.isApp) {
          if (this.appVersion) {
            this.jsBridge.webCallHandler('webViewScrollViewDidScroll', {top: s1.toString()})
          } else {
            this.appBridge.webViewScrollViewDidScroll({top: s1.toString()});
          }
        }
        setTimeout(() => {
          const s2 = this.$refs.refCustomPage.scrollTop;
          const direct = s2 - s1;
          if (s1 === 0) {
            this.isTransparent = true;
          } else if (direct > 0) {
            this.isTransparent = false;
          } else if (direct < 0) {
            this.isTransparent = false;
          }
        }, 17);
      },
      // 返回顶部
      backTop() {

        clearInterval(this.timerx);
        this.timerx = setInterval(this.backFn, 20);
      },
      //拨打电话
      // 返回顶部
      backelse(x) {
        console.log('1')
        clearInterval(this.timerx);
        this.timerx = setInterval(this.backFnx(x), 20);
      },
      backFnx(x) {
        let scrollTop = null;
        if(x==1){
          scrollTop = this.$refs.pingjia.offsetTop;
        }
        else if(x==2){
          scrollTop = this.$refs.luxian.offsetTop;
        }
        else{
          scrollTop = this.$refs.guwen.offsetTop;
        }
        console.log(scrollTop)
        let ispeed = Math.floor(-scrollTop / 5);
        this.$refs.refCustomPage.scrollTop = scrollTop + ispeed;
        if (scrollTop + ispeed >= 0) {
          clearInterval(this.timerx);
        }

      },
      backFn() {
        let scrollTop = this.$refs.refCustomPage.scrollTop;
        let ispeed = Math.floor(-scrollTop / 5);
        this.$refs.refCustomPage.scrollTop = scrollTop + ispeed;
        if (scrollTop === 0) {
          clearInterval(this.timerx);
        }
      },
      setstyle(){
        let maincolor=this.objpro.custom.tone;
        let url=this.objpro.custom.m_head_image_url;
        if(document.all){
          window.style=".basecolor{color:"+maincolor+"!important;}.basebg{background-color:"+maincolor+"!important;}.baseboder{border:2px solid "+maincolor+"!important;}.mainbg{background: url('"+url+"') no-repeat 0 0px/100%!important;}";
          document.createStyleSheet("javascript:style");
        }
        else{
          let style = document.createElement('style');
          style.type = 'text/css';
          style.innerHTML=".basecolor{color:"+maincolor+"!important;}.basebg{background-color: "+maincolor+"!important;}.baseboder{border:2px solid "+maincolor+"!important;}.mainbg{background: url('"+url+"') no-repeat 0 0px/100%!important;}";
          document.getElementsByTagName('HEAD').item(0).appendChild(style);
        }
      },
      clickcall(x){
        // this.showcall=false;
        window.location.href='tel://'+x;
      }
    }
  };
</script>

<style lang="scss" scoped>

  .custom-page {
    height: 100vh;
    font-size: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .custom-content {
      background: #f1f1f1;
      .banner {
        padding: 154px 32px 0;
        position: relative;
        border-top: 1px solid rgba(0,0,0,0);
        height: 858px;
        .tag-sel {
          position: relative;
          z-index: 36;
          width: auto;
          margin-bottom: 100px;
          .ptype1{
            width: auto;
            display: inline-block;
            padding: 15px 20px;
            border-radius:30px;
            color: #fff;
            height: 80px;
            line-height: 40px;
            box-sizing: border-box;
            .span1{
              font-weight: bold;
              font-size: 36px;
              position: relative;
              width: 180px;
              text-align: center;
              top: -5px;
              color: #fff;
              border-right: 2px solid #fff;
              padding-right: 20px;
              margin-right: 20px;
              display: inline-block;
            }
            .span2{
              font-weight: bold;
              position: relative;
              top: -5px;
              width: 220px;
              text-align: center;
              display: inline-block;
              font-size: 36px;
              color: #fff;
              opacity: .6;
            }
            .iconadd{
              display: inline-block;
              padding-top: 10px;
              padding-right:20px ;
              img{
                width: 35px;
              }
            }
            .icondown{
              display: inline-block;
              padding-left: 20px;
              img{
                width: 30px;
              }
            }
          }
          .ptype2{
            width: auto;
            display: inline-block;
            padding: 15px 20px;
            border-radius:30px 30px 0 0;
            color: #fff;

            height: 80px;
            line-height: 40px;
            box-sizing: border-box;
            .span1{
              font-weight: bold;
              font-size: 36px;
              position: relative;
              text-align: center;
              top: -5px;
              width: 180px;
              color: #fff;
              border-right: 2px solid #fff;
              padding-right: 20px;
              margin-right: 20px;
              display: inline-block;
            }
            .span2{
              font-weight: bold;
              position: relative;
              top: -5px;
              width: 220px;
              display: inline-block;
              text-align: center;
              font-size: 36px;
              color: #fff;
              opacity: .6;
            }
            .iconadd{
              display: inline-block;
              padding-top: 10px;
              padding-right:20px ;
              img{
                width: 35px;
              }
            }
            .icondown{
              display: inline-block;
              padding-left: 20px;
              img{
                width: 30px;
              }
            }
          }
          .ptype3{
            width: auto;
            display: inline-block;
            padding: 15px 20px;
            border-radius:0 0 30px 30px;
            color: #fff;
            height: 80px;
            line-height: 40px;
            box-sizing: border-box;
            .span1{
              font-weight: bold;
              font-size: 36px;
              position: relative;
              top: -5px;
              width: 180px;
              text-align: center;
              color: #fff;
              border-right: 2px solid #fff;
              padding-right: 20px;
              margin-right: 20px;
              display: inline-block;

            }
            .span2{
              font-weight: bold;
              position: relative;
              top: -5px;
              text-align: center;
              width: 220px;
              display: inline-block;
              font-size: 36px;
              color: #fff;
              opacity: .6;
            }
            .iconadd{
              display: inline-block;
              padding-top: 10px;
              padding-right:20px ;
              img{
                width: 35px;
              }
            }
            .icondown{
              display: inline-block;
              padding-left: 20px;
              img{
                width: 30px;
              }
            }
          }
          .setlistbox{
            float: left;
            position: absolute;
          }
        }
        .tag-list {
          position: relative;
          z-index: 30;
          margin-top: 120px;
          .tagitem{
            width:210px;
            font-size:28px;
            height:62px;
            text-align: center;
            color: #fff;
            line-height: 62px;
            display: inline-block;
            background:rgba(255,93,132,0);
            border:2px solid rgba(255,255,255,1);
            box-shadow:0px 0px 12px rgba(0,0,0,0.4);
            opacity:1;
            border-radius:38px;
            a{
              color: #fff
            }
          }
          .tagitem:nth-child(2){
            margin: 0 26px;
          }
        }
        .form-wrap {
          position: relative;
          z-index: 30;
          margin-top: 40px;
          padding: 20px 50px;
          width: 686px;
          box-sizing: border-box;
          height: 646px;
          background: rgba(255, 255, 255, 1);
          border-radius: 12px;
          .setover{
            width: 100%;
            height: 60px;
            overflow: hidden;
          }
          .setover2{
            width: 100%;
            height: auto;

          }
          .swiper-slidex2{
            height: 60px!important;
          }
          .from-swiper{
            width: 100%;
            height: 60px;
            font-size: 24px;
            text-align: center;
            color: #9C9C9C;
            line-height: 60px;
          }
          .title-s {
            font-size: 24px;
            font-weight: 300;
            line-height: 34px;
            color: rgba(152, 152, 152, 1);
          }

          .form {
            margin-top: calc(58px - 20px);
            .form-input {
              width: 586px;
              height: 100px;
              background: rgba(0, 0, 0, 0);
              display: flex;
              display: -webkit-flex;
              justify-content: space-between;
              -webkit-justify-content: space-between;
              align-content: center;
              .left-icon {
                width: 70px;
                &.icon-addr {
                  background: url("../../assets/imgs/newcustom/886@2x.png") no-repeat;
                  background-position: 0 25px;
                  background-size: 48px 59px;
                }
                &.icon-phone {
                  background: url("../../assets/imgs/newcustom/888@2x.png") no-repeat;
                  background-position: 0 25px;
                  background-size: 48px 52px;
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
              .setinput{
                border: none;
                border-bottom:2px solid #C9C9C9;
                text-align: left;
                font-size: 32px;
                color: #474747;
                width: 515px;
                height: 100px;
                line-height: 100px;
                background: none;
              }

            }
            .phone,
            .wechat {
              margin-top: 24px;
            }
            .btn-custom {
              margin-top: 62px;
              border: none;
              background-color: #d9d9d9;
            }
          }
        }
        .bannerbox{
          position: absolute;
          width: 100%;
          z-index: 10;
          height: 858px;
          float: left;
          margin-top:-154px;
          margin-left: -32px;
          opacity: 0.3;
          background-color: #000;
        }
        .bannerbox3{
          position: absolute;
          background:url("../../assets/imgs/newcustom/jianbian1.png") no-repeat;
          background-size: 750px 858px;
          background-position: center;
          width: 100%;
          z-index: 10;
          height: 858px;
          float: left;
          margin-top:-154px;
          margin-left: -32px;

        }
        .bannerbox2{
          z-index: 10;
          margin-top:-154px;
          position: absolute;
          margin-left: -32px;
          width: 100%;
          height: 858px;
          float: left;
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
            height: 74px;
            line-height: 74px;
            font-size: 46px;
            font-weight: 100;
            color: rgba(0, 0, 0, 1);
            -webkit-text-stroke: 1 rgba(255, 255, 255, 1);
            text-stroke: 1 rgba(255, 255, 255, 1);
            position: relative;

          }
          .banner-desc {
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
                display: 0 0 74px;
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
              .setinput {
                border: none;
                border-bottom: 2px solid #c9c9c9;
                text-align: left;
                font-size: 32px;
                color: #474747;
                width: 515px;
                height: 100px;
                line-height: 100px;
                background: none;
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
                align-self: center;
                line-height: 100%;
                color: #fff;
                font-size: 28px;
              }
            }
            .phone,
            .wechat {
              margin-top: 24px;
            }
            .btn-custom {
              margin-top: 62px;
              border: none;
              background-color: #d9d9d9;
            }
          }
        }
      }
      .descbox{
        width:750px;
        height:294px;
        background:rgba(255,255,255,1);
        opacity:1;
        margin-top: 280px;
        padding-top: 30px;
        .descitem{
          margin-left: 40px;
          margin-bottom: 20px;
          .desc-img{
            width:108px;
            display: inline-block;
            height: 94px;
          }
          .desc-img:nth-child(1) .img{
            width: 108px;

          }
          .desc-img:nth-child(1) .img{
            width: 86px;
          }
          .desc-pbox{
            width: 420px;
            display: inline-block;
            margin-left: 24px;
            p:nth-child(1){
              color: #262626;
              font-size: 32px;
              padding-bottom: 10px;
            };
            p:nth-child(2){
              color: #BEBEBE;
              font-size: 24px;
            }
          }

        }
        .ab-icom{
          position: fixed;
          right:16px;
          bottom:30%;
          width: 136px;
          height: 136px;
          z-index: 999;
          background:url("../../assets/imgs/newcustom/538@2x.png") no-repeat;
          background-size: 136px;
          background-position: center;
          text-align: center;
          padding-top: 42px;
          .abimg{
            width: 59px;
            height: 51px;
          }
        }

      }
      // 当季推荐
      .season-recommend {
        height: 930px;
        background-color: #fff;
        margin-top: 40px;
        overflow: hidden;
        .season-title {
          margin-top: 30px;
          margin-bottom: 40px;
          text-align: center;
          height: 44px;
          font-size: 36px;
          font-weight: bold;
          color: #000;
        }
        .season-item2{
          width: 686px;
          border-radius: 12px;
          overflow: hidden;
          height: 666px;
          margin: 32px;
          box-shadow:0px 0px 12px rgba(0,0,0,0.16);
          .imgbox{
            border-radius: 12px 12px 0 0;
            overflow: hidden;
          }
          .imgbox>img{
            width: 686px;
            height: 364px;
          }
          .season-title2{
            padding: 0 24px;
            height:68px;
            line-height: 68px;
            font-weight: bold;
            text-align: left;
            font-size: 28px;
            display: block;
            color: #000;
          }
          .season-ul{
            border-bottom:1px solid rgba(228,228,228,1);
            margin: 0 24px;
            padding: 10px 0 20px 0;
            width: 638px;
          }

          .season-ul li{
            list-style-type:none;
            color: #666;
            font-size: 22px;
            line-height:40px;
            i{
              width: 6px;
              height: 6px;
              border-radius: 6px;
              display: inline-block;
              position: relative;
              top: -5px;
              margin-right: 10px;
            }
          }
          .season-price{
            line-height: 80px;
            padding-left: 24px;
            height: 100px;
            font-size: 24px;
          }
        }
        .season-else{
          width: 100%;
          height: 50px;
        }
        .season-wrap {
          margin-top: 28px;
        }
        .swiper-slidex2{
          height: 60px!important;
        }
        .setsw{
          .swiper-slide{
            width: 640px !important;
            transition: all 0.5s;
            &:not(.swiper-slide-active) {
              transform: translate3d(0, 40px, 0);
            }
          }
        }
        .swiper-container {
          .swiper-slide {
            margin: 0 10px;
            font-size: 38px;
            height: 668px;
            .season-item {
              font-size: 0;
              background: #fff;
              height: 628px;
              border-radius: 12px;
              overflow: hidden;
              box-shadow:0px 0px 12px rgba(0,0,0,0.16);
              img {
                width: 640px;
                height: 356px;
              }
              .season-body {
                padding: 22px 69px;
                .season-body-title {
                  padding: 0;
                  background-color: #fff!important;
                  width:502px;
                  height:68px;
                  line-height: 68px;
                  text-align: center;
                  font-size: 28px;
                  margin-top: -60px;
                  z-index: 1000;
                  position: relative;
                  display: block;
                  font-weight: 400;
                  border-radius:48px 48px 0 0;
                }
                .season-body-else{
                  color: #484848;
                  font-size: 24px;
                  text-align: center;
                  line-height: 50px;
                  height: 50px;
                }

                .season-body-desc {
                  margin-top: 12px;
                  padding-bottom: 16px;
                  border-bottom: 2px silid #e4e4e4;
                  height: 96px;
                  font-size: 22px;
                  font-weight: 300;
                  line-height: 32px;
                  color: #989898;
                }
                .season-body-price {
                  margin-top: 16px;
                  height: 34px;
                  font-size: 24px;
                  line-height: 34px;
                  color: #399ef6;
                }
              }
            }
            .swiper-else li{
              padding-top: 20px;
              width: 50%;
              height: 300px;
              text-align: center;
              display: inline-block;
              float: left;
              .imgbox{
                width: 187px;
                height: 187px;

                border-radius: 187px;
                margin: 0 auto;
                overflow: hidden;
                img{
                  width: 187px;
                  height: 187px;
                }

              }
              .pname{
                margin: 0 auto;
                margin-top: -35px;
                width: 154px;
                height: 42px;
                line-height: 42px;
                color: #fff;
                z-index:200;
                position:relative;
                background: -o-linear-gradient(49deg, #5D98FF 0%, #DA8EFF 100%);
                background: linear-gradient(41deg, #5D98FF 0%, #DA8EFF 100%);
                border-radius:22px;
                font-size: 28px;
                text-align: center;
              }
              .p2{
                text-align: center;
                line-height: 40px;
                color: #9C9C9C;
                font-size: 22px;
              }
              .p3{
                text-align: center;
                color: #2893FE;
                line-height: 50px;
                font-size: 26px;
              }
            }
          }
          .swiper-pagination{
            width: 100%;
            height: 20px;
            margin-top: -20px;
            position: relative!important;
          }
          .swiper-slidex2{
            height: 60px!important;
          }
        }
        .btn-more {
          margin: 14px auto 0;
          width: 586px;
          height: 78px;
          box-sizing: border-box;
          line-height: 72px;
          font-size: 28px;
          background:#fff;
          text-align: center;
          border-radius: 36px;
        }
      }
      .features {
        height: 720px;
        width: 100%;
        text-align: center;
        overflow: hidden;
        .features-title {
          margin-top: 80px;
          height: 58px;
          font-size: 44px;
          line-height: 58px;
          color: #383a3e;
        }
        .features-desc {
          margin-top: 8px;
          height: 38px;
          font-size: 28px;
          color: rgba(158, 184, 195, 1);
          letter-spacing: 15px;
        }
        .features-list {
          margin-top: 12px;
          display: flex;
          display: -webkit-flex;
          flex-wrap: wrap;
          -webkit-flex-wrap: wrap;
          .item {
            flex: 0 0 33.3%;
            width: 33.3%;
            margin-top: 56px;
            img {
              width: 124px;
              height: 124px;
            }
            .features-item-title {
              line-height: 42px;
              height: 42px;
              font-size: 28px;
              color: #414141;
            }
          }
        }
      }
      .story-title {
        padding: 44px 0 4px 42px;
        span {
          width: 128px;
          height: 44px;
          font-size: 32px;
          font-weight: 400;
          color: #131313;
          &.gray {
            color: #989898;
          }
        }
      }
      .story-wrap {
        margin-top: 24px;
        background: #fff;
        height: 640px;
        overflow: hidden;
        .story-item-title,
        .story-item-pos,
        .story-item-desc {
          padding: 0 34px;
        }
        .story-item-title {
          margin-top: 32px;
          height: 40px;
          font-size: 28px;
          line-height: 40px;
          color: #000;
        }
        .story-item-pos {
          margin-top: 8px;
          height: 34px;
          font-size: 24px;
          color: #484848;
        }
        .story-item-line {
          width: 686px;
          margin-top: 20px;
          margin-left: 34px;
          border-bottom: 2px solid #e4e4e4;
        }
        .story-item-desc {
          margin-top: 20px;
          height: 64px;
          font-size: 24px;
          line-height: 30px;
        }
      }
      .show-banner {
        margin-top: 28px;
      }
    }
    .back-top {
      position: fixed;
      z-index: 999;
      right: 16px;
      bottom: 20%;
      width: 136px;
      height: 136px;
      background: url("../../assets/imgs/newcustom/callphone.png") no-repeat center
      center/100%;
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
        height:80px;
        line-height: 80px;
        font-size: 32px;
        text-align: center;
        color: #fff;
      }
      .con-btn{
        display: block;
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
    .pricebig{
      font-size: 36px;
    }
    .elsequ{
      width: 2.5rem;
      display: inline-block;
      text-align: center;
      line-height: 100px;
      height: 100px;
      font-size: 34px;
      color: #333;
      i{
        position: relative;
        top: 5px;
      }
    }
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
  }
  .code-icon{
    padding: 0 10px;
    height:52px;
    background:rgba(255,255,255,0);
    border:2px solid rgba(210,210,210,1);
    opacity:1;
    border-radius:8px;
    line-height: 47px;
    text-align: center;
    font-size:26px;
    color:rgba(210,210,210,1);
    position: absolute;
    right:50px;
    margin-top: 25px;
  }


</style>

