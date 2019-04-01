<!--订单和行程的页脚组件-->
<template>
  <section>
    <div class="confirm-foot">
      <span class="confirm-price" v-if="showbtn">
        <i>{{pricelist.total_price}}</i>
        <i v-if="showpops" @click="showpops=false">明细
          <van-icon name="arrow-down"/>
        </i>
         <i v-else @click="showpops=true">明细
            <van-icon name="arrow-up"/>
        </i>
      </span>
      <span class="confirm-price" v-else>
        <i style="color: #bbb">0.00</i>
        <i style="color: #bbb">请选择相关信息</i>
      </span>
      <span :class="showbtn?'showbtn':''" class="confirm-next-btn" v-if="thisrouter=='date_trip'" @click="showbtn?islogin():''">下一步</span>
      <span v-else-if="showbtn2==false" class="confirm-next-btn">下一步</span>
      <span v-else class="confirm-next-btn showbtn" @click="addOrderx()" >下一步</span>
      <span class="contact-service" @click="contactCustom()">
        <i></i>
        <i>联系客服</i>
      </span>
    </div>
    <van-popup v-model="showpops" class="setbottom" position="bottom" :overlay="true">
      <paylist :payData="pricelist" :showmili="get_vuex_countprice.is_point?'1':'0'" @closepops="closepops"></paylist>
    </van-popup><!-- 加载态 -->
    <loading v-if="loading"></loading>
    <div style="display: none" v-if="showbtn2==true">
      <form :action="apiPath.payment+'/payment/mobile/checkout'" method="post">
        <input type="text" name="order_id" value="" ref="order_id">
        <input type="text" name="order_title" value="" ref="order_title">
        <input type="text" name="total_fee[CNY]" value="" ref="total_feecny">
        <input type="text" name="total_fee[USD]" value="" ref="total_feeusd">
        <input type="text" name="client_type" value="tourscool">
        <input type="text" name="jwt" ref="jwt" value="" >
        <input type="text" name="success_url"
               value="" ref="success_url">
        <input type="text" name="failure_url"
               value="" ref="failure_url">
        <input type="submit" ref="submitform">
      </form>
    </div>
  </section>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {DLG_TYPE} from '@/assets/js/consts/dialog'
  import paylist from './paylist'
  import {countprice} from '@/api/confirm_order'
  import {addorder} from '@/api/confirm_order'
  import Loading from '@/components/loading'
  import {getProfile} from '@/api/profile'
  import {SESSIONSTORE,PLATFORM} from '@/assets/js/config'
  import {getSessionStore} from '@/assets/js/utils'
  import {
    getCookieByKey
  } from '@/assets/js/utils'
  export default {
    layout: 'default',
    components: {
      paylist,Loading
    },
    props:{'addorder':Object},
    data() {
      return {
        //价格明细列表
        pricelist: [],
        showbtn: false,
        showpops: false,
        showbtn2:false,
        thisrouter: '',//当前路由
        submitdata:{
          order_id:'',
          order_title:'',
          'total_feecny':'',
          'total_feeusd':'',
        },
        loading:false,
        apiPath:require('@/apiConf.env'),
        //添加订单数据

      }
    },
    computed: {
      //获取计算价格参数
      get_vuex_countprice() {
        return this.$store.state.confirm.countprice;
      },
    },
    watch: {
      //监听计算价格参数
      get_vuex_countprice() {
        if (this.get_vuex_countprice.departure_date !='' && this.get_vuex_countprice.room_total != 0){
          this.getpricelist(this.get_vuex_countprice)
          this.showbtn = true;
        }
        else {
          this.showbtn = false;
        }
      },
      'addorder':{
        handler:function(val) {
          if(val.tongyi&&val.contact.phone!=''&&val.contact.name!=''&&val.contact.email!=''&&val.users.length){
            this.showbtn2=true;
          }
          else{
            this.showbtn2=false;
          }
        },
        deep: true    //深度监听

      }
    },
    mounted() {
      // this.$store.dispatch("initprice");
      this.checkrouter();//判断当前位置
      console.log(this.apiPath)
    },
    methods: {
      ...mapMutations({
        // vxSaveReservePro: 'product/saveReservePro',
        vxToggleLoginDlg: 'login/toggleDialog', // 是否显示弹窗
      }),
      // 获取价格明细
      async getpricelist(objdata) {
        let {data, code ,msg} = await countprice(objdata)
        if (code === 0) {
          this.pricelist=data;
          this.pricelist.adult=this.get_vuex_countprice.adult;
          this.pricelist.child=this.get_vuex_countprice.child;
          this.$store.commit("pricelist", this.pricelist);
        }
        else {
          this.$dialog.alert({
            message: msg
          });
          this.$store.commit("pricelist", {});
          // console.log('1')
          this.showbtn2=false;
          this.showbtn=false;

        }
      },
      closepops(data) {
        this.showpops = false;
      },//关闭弹层
      //判断当前页面位置
      checkrouter() {
        if ($nuxt.$route.path == '/confirm_order') {
          this.thisrouter = 'confirm_order'
        } else {
          this.thisrouter = 'date_trip'
        }
        // console.log(this.thisrouter)
      },
      subData(){
        this.$refs.submitform.click();
        this.loading = false;
      },
      async addOrderx(){
        this.loading = true;
        let referer_id = getSessionStore(SESSIONSTORE) || ''
        let platform = getSessionStore(PLATFORM) || ''
        let {data, code , msg} = await addorder(this.addorder, referer_id, platform)
        if (code === 0) {
          this.$refs.order_id.value=data.order_id;
          this.$refs.order_title.value=data.product_name;
          this.$refs.total_feecny.value=data.cny_price*100;
          this.$refs.total_feeusd.value=data.price*100;
          this.$refs.success_url.value='//'+window.location.host+"/personal/order_des?order_id="+data.order_id;
          this.$refs.failure_url.value='//'+window.location.host+"/personal/order?status=null";
          var token=getCookieByKey('token') ? getCookieByKey('token') : '';
          token=token.replace('Bearer ','');
          this.$refs.jwt.value=token;
          this.subData();
        }
        else {
          this.loading = false;
          this.$dialog.alert({
            message: msg
          });

        }
      },
      contactCustom() {
        window.location.href = 'http://p.qiao.baidu.com/cps/chat?siteId=12524949&userId=26301226'
      },
      //是否需要登录弹窗
      async islogin() {
        let {code} = await getProfile()
        if(code != 0) {
          this.vxToggleLoginDlg(true)
        }
        else{
          this.$router.push({
            path:"/confirm_order"
          })
        }

      },

    }
  }

</script>

<style scoped>
  .confirm-foot {
    width: 750px;
    height: 120px;
    background-color: #fff;
    position: fixed;
    z-index: 99;
    box-sizing: border-box;
    padding: 20px 32px;
    left: 0;
    bottom: 0;
  }

  .confirm-next-btn {
    width: 308px;
    height: 80px;
    display: inline-block;
    background: #BBBBBB;
    opacity: 1;
    border-radius: 8px;
    color: #fff;
    text-align: center;
    font-size: 32px;
    line-height: 80px;
    float: right;
  }

  .confirm-price {
    height: 80px;
    display: inline-block;
    line-height: 20px;
    float: left;
    width: 240px;
    color: #FB605D;
  }

  .confirm-price > i:nth-child(1) {
    font-style: normal;
    display: inline-block;
    font-size: 32px;
    text-align: left;
    font-weight: bold;
    width: 100%;
    height: 30px;
  }

  .confirm-price > i:nth-child(2) {
    font-style: normal;
    display: inline-block;
    font-size: 24px;
    text-align: left;
    width: 100%;
    height: 20px;
  }

  .contact-service {
    width: 100px;
    height: 80px;
    display: inline-block;
    float: right;
    margin-right: 20px;
    font-size: 22px;
  }

  .contact-service i:nth-child(1) {
    width: 100px;
    height: 40px;
    background: url("../../assets/imgs/kefu.png") no-repeat;
    background-size: 32px;
    background-position: center;
    display: inline-block;
    text-align: center;
    line-height: 40px;
  }

  .contact-service i:nth-child(2) {
    font-style: normal;
    width: 100px;
    color: #399EF6;
    font-size: 22px;
    display: inline-block;
    text-align: center;
    line-height: 40px;

  }

  .showbtn {
    background: rgba(251, 96, 93, 1) !important;
  }

  .setbottom {
    background: rgba(251, 96, 93, 0) !important;
  }


</style>
