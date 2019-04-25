<template>
  <section>
    <van-nav-bar class="login-header tours-no-bb"
                 ref="loginHeader"
                 title="确认订单"
                 :z-index="999"
                 @click-left="onClickLeft">
      <van-icon class="left-wrap" name="arrow-left" slot="left" />
    </van-nav-bar>
    <section class="section0">

      <!--页头信息-->
      <section>
        <div class="confirm-title">
          <p>{{xname}}</p>
          <p>{{showtype}}</p>
        </div>
      </section>
      <!--接送服务-->
      <section>
        <div class="confirm-item">
          <p class="item-title">接送时间和地点</p>
          <template v-for="(item,ind) in pricelist.transfer">
            <p v-if="countprice.product_departure==item.product_departure_id" :key="ind" class="item-con" @click="showchecktime=true">
              <span>{{item.time}}&nbsp;{{item.region}}&nbsp;{{item.address}}&nbsp;{{item.full_address}}</span>
              <span></span>
              <van-icon color="#404040" name="arrow" size="1.2em"/>
            </p>
          </template>
          <p class="item-con" v-if="countprice.product_departure==''" @click="showchecktime=true">
            <span>暂未选择接送机服务</span>
            <span></span>
            <van-icon color="#404040" name="arrow" size="1.2em"/>
          </p>
        </div>
        <!--接送时间和地点弹出层-->
        <van-popup class="setprop" v-model="showchecktime" position="center" :overlay="true">
          <div class="item-title">
            <p>
              <span>接送时间和地点</span>
              <span style="float:right;color:#399EF6" @click="checktime()">确认</span>
            </p>
          </div>
          <van-radio-group v-model="countprice.product_departure" class="radiobox">
            <van-radio name="" class="radioitem">不选择接送机</van-radio>
            <template v-for="(item,ind) in pricelist.transfer">
              <van-radio class="radioitem" :key="ind" :name="item.product_departure_id">
                {{item.time||''}}&nbsp;{{item.region||''}}&nbsp;{{item.address||''}}&nbsp;{{item.full_address||''}}
              </van-radio>
            </template>
          </van-radio-group>
        </van-popup>
      </section>
      <!--行程选择-->
      <section>
        <div class="confirm-item" v-if="pricelist.attributes&&pricelist.attributes.length>0">
          <p class="item-title">行程选项</p>
          <template v-for="(attrx,ind) in showtrvel">
            <div :key="ind">
              <p class="item-tip">{{attrx.title}}</p>
              <p class="item-con" @click="checktrver(attrx,ind)">
                <template v-if="!attrx.itemsx">
                  <span>暂未选择行程</span>
                  <span></span>
                </template>
                <template v-else>
                  <span>{{attrx.itemsx.title}}</span>
                  <span><i :style="attrx.itemsx.prefix=='+'?'color:#24E44A':'color:#D51D28'">{{attrx.itemsx.prefix}} </i>{{attrx.itemsx.price}}</span>
                </template>
                <van-icon color="#404040" name="arrow" size="1.2em"></van-icon>
              </p>
            </div>
          </template>
          <!--行程选择弹出层-->
          <van-popup v-model="showchecktrver" class="setprop" position="center" :overlay="true">
            <div class="item-title">
              <p>
                <span>{{seltrvel.title}}</span>
                <span @click="checktrverend()" style="float:right;color:#399EF6">确认</span>
              </p>
            </div>
            <van-radio-group v-model="checktrvel" class="radiobox">
              <van-radio name="" class="radioitem">暂不选择行程</van-radio>
              <template v-for="(item,index) in seltrvel.items">
                <van-radio class="radioitem" :key="index" :name="item.id">
                  {{item.title}}
                </van-radio>
              </template>
            </van-radio-group>
          </van-popup>

        </div>
      </section>
      <!--游客信息-->
      <section>
        <div class="confirm-item" @click="setsave()">
          <p class="item-title">游客信息
            <span>务必确认填写信息与出游证件一致</span></p>
          <ul>
            <template v-for="(item,ind) in paramcontanct">
              <nuxt-link v-if="item.name" :key="ind" class="user-item" tag="li" :to="{path:'/personal/addContacts',query:{'id':item.id,'checker':paramcontanct}}" >
                <span>出行人{{ind+1}}<i>{{item.name}}</i></span>
                <span><i><van-icon name="edit"/></i></span>
              </nuxt-link>
            </template>
          </ul>
          <div class="btnbox">
            <nuxt-link class="changeuser-btn" tag="button" :to="{path:'/personal/contactsList',query:{'adult':countprice.adult+countprice.child,'checker':paramcontanct}}" >选择出行人</nuxt-link>
          </div>
        </div>
      </section>
      <!--联系人信息-->
      <section>
        <div class="confirm-item">
          <p class="item-title">联系人信息</p>
          <van-field
            label="联系人"
            v-model="contact.name"
            placeholder="填写联系人姓名"
          />
          <div data-v-0ea3802e="" class="van-cell van-field">
            <div class="van-cell__title">
              <span>手机号码</span>
            </div>
            <div class="van-cell__value">
              <div class="van-field__body">
                <i class="setvan" @click="showsel=true">+{{checkqu}}<van-icon name="arrow" /></i>
                <input type="text" v-model="contact.phone" placeholder="必填，用于接收信息" class="van-field__control">
              </div>
            </div>
          </div>
          <van-field label="邮箱" v-model="contact.email" placeholder="必填，用于接收电子客票"/>
          <van-popup v-model="showsel" position="bottom" :overlay="true">
            <van-picker :columns="columns" @confirm="onChangequ" show-toolbar title="选择区号"/>
          </van-popup>
        </div>
      </section>
      <!--优惠信息-->
      <section >
        <div class="confirm-item">
          <p class="item-title">优惠信息</p>
          <div class="item-con" v-if="pricelist.points&&pricelist.points.point">
         <span>
           <i class="seti">米粒</i>
           <i class="seti" style="color: #bbb">
             共有米粒{{pricelist.points.total_point}}，本次可用{{pricelist.points.point}}米粒抵用{{pricelist.points.discount}}
           </i>
         </span>
            <van-switch
              v-model="countprice.is_point"
              style="float: right"
              size="2em"
            />
          </div>
          <p v-if="couponDetails&&couponDetails.length" class="item-con" @click="getCouponList('show')" style="border: 1px solid #ebedf0">
            <span>
              <i class="seti">优惠券</i>
              <i v-if="showsetcou!=''" class="seti" style="color: #1989fa">{{showsetcou}}</i>
              <i v-else class="seti" style="color: #bbb">暂未选择</i>
            </span>
            <span></span>
            <van-icon color="#404040" name="arrow" size="1.2em" class="settopicon"/>
          </p>
        </div>
          <van-actionsheet v-model="showcheckCou" title="优惠券" class="service-note">
          <van-radio-group v-model="setcou" @change="setcouponx()">
              <div class="setcheck">
                <span>暂不选择任何优惠券</span>
                <van-radio name="null" style="width: 30%;float: right;display: inline-block"> </van-radio>
              </div>
              <div class="cup-item"
                   v-for="(item,index) in couponDetails"
                   :key="index">
                <div class="cupleft">
                  <p class="p1">{{item.minus_label}}</p>
                  <p class="p2">{{item.full_label}}</p>
                </div>
                <div class="cupcon">
                  <p class="p1">{{item.title}}</p>
                  <p class="p2">{{item.date_label}}</p>
                  <p class="p2">{{item.period_label}}</p>
                </div>
                <div class="cupright" >
                  <van-radio :name="index"></van-radio>
                </div>
              </div>
          </van-radio-group>
          </van-actionsheet>

      </section>
      <!--预定留言-->
      <section>
        <div class="confirm-item">
          <p class="item-title">预订留言</p>
          <div class="item-con">
            <van-field
              type="textarea"
              placeholder="选填，你可备注预订相关要求"
              rows="2"
              autosize
              v-model="comment"
            />
          </div>
        </div>
      </section>
      <!--同意用户协议-->
      <section>
        <div class="confirm-item">
          <div class="item-con">
            <van-checkbox v-model="tongyi">我已阅读并接受
              <nuxt-link :to="{path:'/protocol/user'}">
                <a style="color: #216BFF">《稀饭旅行用户服务条款》</a>
              </nuxt-link>
              </van-checkbox>
          </div>
        </div>
      </section>
      <!--foot-->
      <section>
        <confirm-foot :addorder="getaddoder()"></confirm-foot>
      </section>
    </section>
  </section>
</template>

<script>

  import ConfirmFoot from '@/components/confirm_foot/foot.vue'
  import {getquhao} from '@/api/contacts'
  import {orderCouponList} from '@/api/confirm_order'
  import {getSessionStore} from '@/assets/js/utils'
  export default {
    components: {
      ConfirmFoot
    },
    data() {
      return {
        countprice:{},//vuex里面的价格计算参数
        pricelist:{},//vuex里面的价格返回参数
        showchecktime:false,//是否显示选择出发时间组件
        checktimeval:'暂未选择接送机服务',
        showchecktrver:false,//是否显示行程组件
        seltrvel:{},//某一组行程数据的值
        checktrvel:'',//弹层临时选择的trvel
        checkedtrvel:[],//所选择的所有行程数据的值
        showtrvel:[],//行程选项页面显示值
        activeind:0,
        // 静态参数
        columns: [],
        showsel:false,
        paramcontanct:this.$route.query.checker||[],
        checkqu:'86',
        tongyi:true,
        comment:'',
        contact:{"name":"","phone":"","email":""},
        showcheckCou:false,
        couponDetails:[],//我的优惠卷列表
        setcou:'',
        showsetcou:'',
        setsaveuser:false,
        product: {},
        showtype:'',
        xname:'',
      }
    },
    computed: {
      //获取计算价格参数
      get_vuex_countprice() {
        return this.$store.state.confirm.countprice;
      },
      get_vuex_pricelist() {
        return this.$store.state.confirm.pricelist;
      },
    },
    watch:{
      get_vuex_countprice(val){
        this.countprice=val;
        this.checkedtrvel=val.attributes;
      },
      'get_vuex_pricelist' : {
        handler:function(val) {
          this.pricelist=val;
          this.setshowtrvel();
        },
        deep: true    //深度监听
      },
      'countprice.is_point'(val){
        this.$store.commit("countprice", {is_point:val});
      },
    },
    beforeRouterEnter(to,form,next){
      if(form.path.indexOf('personal')!=-1){
        next(vm=>{
          vm.setsaveuser=true;
        })
      }
      else{
        next();
      }
    },
    mounted() {
      let obj=getSessionStore('pricelist') ? JSON.parse(getSessionStore('pricelist')) : {};
      let this_=this;
      this.$store.commit("pricelist",obj);
      let objw=getSessionStore('countprice') ? JSON.parse(getSessionStore('countprice')) : {};
      this.$store.commit("countprice",objw);
      this.product = this.$store.state.product.reservePro;
      setTimeout(function () {
        this_.xname=this_.$store.state.product.reservePro.name;
        this_.getCouponList();
      },100)

      this.pricelist=this.get_vuex_pricelist;
      this.getqu();
      this.settitletip();
      this.contact={"name":this.countprice.savename,"phone":this.countprice.savephone,"email":this.countprice.saveemail}
    },

    methods: {
      //获得价格日历数据
      async getpricedate(id) {
        let {data, code} = await getdateTrip(id)
        if(code === 0) {
          this.pricedate = data;
        } else {
          // this.pricedate = []
        }
      },

      //获得可用优惠卷列表
      async getCouponList(type) {
        let this_=this;
        let objdata = {
          product_id:this.product.product_id,
          departure:this.countprice.departure_date,
          price:this.pricelist.price,
        }
        let {data, code} = await orderCouponList(objdata)
        if(code === 0) {
          this.couponDetails = data;
        }
        else {
          this.couponDetails = [];
        }
        if(type){
          this.showcheckCou=true;
        }
        else{
          if(this_.couponDetails&&this_.couponDetails.length&&this_.countprice.coupon_cus_id==''){
            for(let i=0;i<this_.couponDetails.length;i++){
              if(this_.couponDetails[i].is_best === true){
                this_.setcou=i;
                this_.showsetcou=this_.couponDetails[i].title;
                this_.$store.commit("countprice", {coupon_cus_id:this_.couponDetails[i].coupon_customer_id});
              }
            }
          }
          else if(this_.couponDetails&&this_.couponDetails.length&&this_.countprice.coupon_cus_id!=''){
            for(let i=0;i<this_.couponDetails.length;i++){
              if(this_.couponDetails[i].coupon_customer_id == this_.countprice.coupon_cus_id){
                this_.setcou=i;
                this_.showsetcou=this_.couponDetails[i].title;
              }
            }
          }
        }
      },
      //设置页头数据
      settitletip() {
        this.countprice=this.get_vuex_countprice;
        let date = new Date((this.countprice.departure_date).replace(/-/g, "/")).getTime();
        let date1 = this.timeFormat(date);
        if (this.product.product_entity_type == 1 && this.product.self_support == 0) {
          this.showtype = date1 + '  ' + this.countprice.adult + '成人  ' + this.countprice.child + '儿童  ' + this.countprice.room_total + '房间  '
        } else {
          this.showtype =  date1 + '  ' + this.countprice.adult + '成人  ' + this.countprice.child + '儿童  '
        }
      },
      timeFormat(timestamp) {
        let time = new Date(timestamp);
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let date = time.getDate();
        return year + '年' + (month < 10 ? '0' + month : month) + '月' + (date < 10 ? '0' + date : date) + '日';
      },
      //选择行程以后
      checktime(){
        if(this.countprice.product_departure==''){
          this.checktimeval='暂不需要接送机服务'
        }
        else{
          for(let i=0;i<this.pricelist.transfer.length;i++){
            var obj=this.pricelist.transfer[i];
            if(obj.product_departure_id==this.countprice.product_departure){
              this.checktimeval=obj.time+"  "+obj.full_address
            }
          }
        }
        this.$store.commit("countprice", {product_departure:this.countprice.product_departure});
        this.showchecktime=false;
      },
      //选择行程之前
      checktrver(item){
        this.seltrvel=item;
        let this_=this;
        this.checktrvel='';
        for(let i=0;i<this_.checkedtrvel.length;i++){
          if(this_.checkedtrvel[i].id==this_.seltrvel.id){
           this.checktrvel=this_.checkedtrvel[i].option_val_id
          }
        }
        this.showchecktrver=true;
      },
      //确认行程形成之后
      checktrverend(){
        var this_=this;
        let obj=null;
        for(let i=0;i<this_.checkedtrvel.length;i++){
          if(this_.checkedtrvel[i].option_id==this_.seltrvel.id){
            this_.checkedtrvel.splice(i, 1);
          }
        }
        if(this_.checktrvel!=''){
          obj={
            option_id:this_.seltrvel.id,
            option_val_id:this_.checktrvel
          }
          this_.checkedtrvel.push(obj);
        }

        this_.$store.commit("countprice", {attributes:this.checkedtrvel});
        this.showchecktrver=false;
      },
      //设置页面显示行程
      setshowtrvel(){
        var obj=[];
        var this_=this;
        if(!this_.pricelist.coupons.id){
          this_.showsetcou='';
          this_.setcou=''
        }
        else{
          this_.showsetcou=this_.pricelist.coupons.title;
          for(let i=0;i<this_.couponDetails.length;i++){
            if(this_.couponDetails[i].coupon_id == this_.pricelist.coupons.id){
              this_.setcou=i;

            }
          }
        }
         for(let i=0;i<this_.pricelist.attributes.length;i++){
           let item=this_.pricelist.attributes[i];
           item.itemsx=null;
           obj.push(item);
          }
         this_.showtrvel=obj;
         for(let i=0;i<this_.showtrvel.length;i++){
          let itemx=this_.showtrvel[i];
          for(let j=0;j<this_.checkedtrvel.length;j++){
            if(itemx.id==this_.checkedtrvel[j].option_id){
              let kitem=this_.pricelist.attributes[i].items;
              for(let k=0;k<kitem.length;k++){
                if(kitem[k].id==this_.checkedtrvel[j].option_val_id){
                  this_.showtrvel[i].itemsx=kitem[k]
                }
              }
            }
          }
        }

        },
      onClickLeft(){
        this.$router.go(-1)
      },
      // 得到区号
      async getqu() {
        let {data, code, msg} = await getquhao();
        if(code === 0) {
          this.columns = data.map(v => {
            this.$set(v, 'text',  '+'+v.tel_code+'('+v.countryName+')')
            return v
          })
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
      getaddoder(){
         let objarr=[];
         for(let i=0;i<this.paramcontanct.length;i++){
           objarr.push(this.paramcontanct[i].id)
         }
         let date=null;
         if(this.countprice.departure_date){
           date=this.countprice.departure_date;
         }
         let point=this.pricelist.points?this.pricelist.points.point:0;
         var addorder={
          product_id:this.product.product_id,
          depart_date:date,
          rooms:this.countprice.room_attributes,
          value_added_services:this.countprice.attributes,
          flight_id:this.countprice.product_departure,
          total_kids:this.countprice.child,
          total_adult:this.countprice.adult,
          room_total:this.countprice.room_total,
          tongyi:this.tongyi,//用户协议
          comment:this.comment,
          users:objarr,
          contact:this.contact,
          integral:this.countprice.is_point?point:'',//积分
          coupon_cus_id: this.countprice.coupon_cus_id
        }
         return addorder
      },
      setcouponx:function(x){
        let this_=this;
        if(this_.setcou === 'null'){
          this_.showsetcou='';
          this_.$store.commit("countprice", {coupon_cus_id:''});
        }
        else{
          this_.showsetcou=this_.couponDetails[this_.setcou].title;
          this_.$store.commit("countprice", {coupon_cus_id:this_.couponDetails[this_.setcou].coupon_customer_id});
        }
        this.showcheckCou=false;
      },
      setsave(){
        console.log("1")
        this.$store.commit("countprice", {
          savename:this.contact.name,
          saveemail:this.contact.email,
          savephone:this.contact.phone,
        });
      },
    }
  }

</script>

<style lang="scss" scoped>

  .checkcoubtn{
    width:440px;
    height:72px;
    margin-left: 130px;
    line-height: 72px;
    text-align: center;
    font-size:32px;
    color: #fff;
    margin-top: 50px;
    background:rgba(57,158,246,1);
    opacity:1;
    border-radius:36px;
  }
  .service-note{
    padding: 0 0 50px 40px;
  }
  .setcheck{
    span{
      font-size: 24px;
    }
    div{
      width:120px;
      text-align: right;
      margin-right: 80px;
      float: right;

    }
  }
  .cup-class{
    font-size:24px;
    line-height:32px;
    color:rgba(112,112,112,1);
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .cup-item{
    width:670px;
    height:140px;
    margin-top: 30px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 12px rgba(65,63,63,0.16);
    opacity:1;
    border-radius:8px;
    .cupleft{
      padding-top: 20px;
      float: left;
      width:228px;
      height: 140px;
      text-align: center;
      background-image:url('../../assets/imgs/color.png');
      background-repeat: no-repeat;
      background-position: 0;
      background-size: 228px 140px;
      .p1{
        font-size:40px;
        font-weight:bold;
        line-height:52px;
        color:rgba(255,255,255,1);
      }
      .p2{
        font-size:24px;
        font-weight:400;
        line-height:32px;
        color:rgba(255,255,255,1);
      }

    }
    .cupcon{
      float: left;
      width:280px;
      height: 140px;
      text-align: left;
      padding-left: 20px;
      padding-top: 18px;
      .p1{
        font-size:24px;
        font-weight:bold;
        line-height:36px;
        color:#707070;
      }
      .p2{
        font-size:20px;
        line-height:28px;
        color:#707070;
      }
    }
    .cupright{
      float: left;
      width:120px;
      height: 140px;
      text-align: right;
      padding-top: 35px;
      .btn1{
        width:120px;
        height:40px;
        background:linear-gradient(180deg,rgba(27,141,255,1) 0%,rgba(53,201,255,1) 100%);
        opacity:1;
        border-radius:40px;
        display: block;
        font-size:24px;
        line-height:40px;
        color:rgba(255,255,255,1);
      }
      .btn2{
        width:120px;
        display: block;
        height:40px;
        border:2px solid rgba(194,194,194,1);
        border-radius:40px;
        font-size:24px;
        line-height:40px;
        color:rgba(194,194,194,1);
      }
    }
  }
  .setprop{
    width: 90%;
    border-radius: 12px;
    padding-bottom: 30px;
  }

  .section0 {
    background-color: #f3f3f3;
    width: 750px;
    box-sizing: border-box;
    padding: 20px 32px 200px 32px;
  }

  .confirm-title p:nth-child(1) {
    padding-top: 10px;
    width: 100%;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    color: rgba(19, 19, 19, 1);
    opacity: 1;
  }

  .confirm-title p:nth-child(2) {
    width: 100%;
    font-size: 22px;
    line-height: 60px;
    color: rgba(168, 168, 168, 1);
    opacity: 1;
  }

  .confirm-item {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
    opacity: 1;
    border-radius: 8px;
    margin-bottom: 28px;
  }

  .item-title {
    width: 100%;
    padding: 0 24px;
    line-height: 70px;
    box-sizing: border-box;
    color: rgba(19, 19, 19, 1);
    font-weight: bold;
    font-size: 24px;
    border-bottom: 2px solid #DEDEDE;
  }

  .item-con {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 24px;
    font-size: 24px;
  }

  .item-con span:nth-child(1) {
    display: inline-block;
    width: 430px;
    font-size: 24px;
    color: rgba(19, 19, 19, 1);
  }

  .item-con span:nth-child(2) {
    width: 150px;
    font-size: 24px;
    display: inline-block;
    color: #FF9100;
    text-align: right;
  }

  .item-con i {
    top: 6px;
  }
  .item-tip {
    box-sizing: border-box;
    margin: 20px 24px 0 24px;
    padding-left: 20px;
    background: rgba(241, 241, 241, 1);
    opacity: 1;
    line-height: 48px;
    font-size: 22px;
    color: rgba(142, 142, 142, 1);
  }
  .user-item {
    border-bottom: 1px solid #DEDEDE;
    margin: 0 24px;
  }
  .user-item span:nth-child(1) {
    width: 500px;
    height: 80px;
    line-height: 80px;
    font-size: 24px;
    color: #191919;
  }
  .user-item span:nth-child(1) i {
    color: #9F9F9F;
    font-size: 24px;
    font-style: normal;
    padding-left: 20px;
  }
  .user-item span:nth-child(2) {
    width: 80px;
    height: 80px;
    line-height: 80px;
    float: right;
    color: #399EF6;
  }
  .user-item>span:nth-child(2)  {
   font-size: 48px;
    line-height: 220%;
  }
  .item-title > span {
    color: #989898;
    font-size: 20px;
    padding-left: 20px;
  }
  .changeuser-btn {
    width: 464px;
    height: 72px;
    background: rgba(57, 158, 246, 1);
    opacity: 1;
    line-height: 72px;
    font-size: 24px;
    color: #fff;
    margin: 28px 0;
    border-radius: 8px;

  }
  .btnbox {
    text-align: center;
  }
  .radioitem{
    font-size: 24px;
    width: 650px;
    padding: 20px 24px;
  }
  .setvan {
    width: 120px;
    display: inline-block;
    border-right: 1px solid #dedede;
    text-align: center;
    margin-right: 12px;
  }
  .setvan i {
    top: 6px;
  }
  .seti {
    font-style: normal;
    display: inline-block;
    width: 100%;
  }
  .radiobox{
    max-height: 800px;
    overflow-y: scroll;

  }
  .login-header {
    height: 88px;
    font-size: 32px;
    color: #191919;
    background-color: #fff;
    border-bottom:1px solid rgb(238, 238, 238);
    transition: all 0.5s;
  .left-wrap {
    color: #404040;
    font-size: 32px;
  }
  .right-wrap {
  .search {
    width:92px;
    height:36px;
    background:rgba(57,158,246,1);
    opacity:1;
    color: #fff;
    border-radius:18px;
  }
  }
  }
.settopicon{
  top: -8.5px!important;
}


</style>
