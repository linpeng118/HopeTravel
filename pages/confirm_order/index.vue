<template>
  <section class="neuHeader">
    <van-nav-bar class="login-header tours-no-bb"
      ref="loginHeader"
      :title="$t('confirmPage.title')"
      :z-index="999"
      :fixed="true"
      @click-left="onClickLeft"
      @click-right="onClickRight">
      <van-icon class="left-wrap"
        name="arrow-left"
        slot="left" />
    </van-nav-bar>
    <div v-if="!isLoginkeyword">
      <login-line></login-line>
    </div>
    <section class="section0">
      <!-- 未登录显示 -->
      <!--页头信息-->
      <section>
        <div class="confirm-title">
          <p>{{product.name_short}}</p>
          <p>{{product.name}}</p>
          <p>{{showtype}}</p>
        </div>
      </section>
      <!--接送服务-->
      <section v-if="pricelist.transfer && pricelist.transfer.length">
        <div class="confirm-item">
          <p class="item-title"><span style="color: #f44;padding-left:0">* </span>{{$t('confirmPage.transferTitle')}}</p>
          <template v-for="(item,ind) in pricelist.transfer">
            <p v-if="countprice.product_departure==item.product_departure_id"
              :key="ind"
              class="item-con"
              @click="showchecktime=true">
              <span>{{item.time}}&nbsp;{{item.region}}&nbsp;{{item.address}}&nbsp;{{item.full_address}}</span>
              <span></span>
              <van-icon color="#404040"
                name="arrow"
                size="1.2em" />
            </p>
          </template>
          <p class="item-con"
            v-if="countprice.product_departure==''"
            @click="showchecktime=true">
            <span>{{$t('confirmPage.noTransfer')}}</span>
            <span></span>
            <van-icon color="#404040"
              name="arrow"
              size="1.2em" />
          </p>
        </div>
        <!--接送时间和地点弹出层-->
        <van-popup class="setprop"
          v-model="showchecktime"
          position="center"
          :overlay="true">
          <div class="item-title">
            <p>
              <span>{{$t('confirmPage.transferTitle')}}</span>
              <span style="float:right;color:#399EF6"
                @click="checktime()">{{$t('sured')}}</span>
            </p>
          </div>
          <van-radio-group v-model="countprice.product_departure"
            class="radiobox">
            <!--<van-radio name="" class="radioitem">{{$t('confirmPage.nocheckPlane')}}</van-radio>-->
            <template v-for="(item,ind) in pricelist.transfer">
              <van-radio class="radioitem"
                :key="ind"
                :name="item.product_departure_id">
                {{item.time||''}}&nbsp;{{item.region||''}}&nbsp;{{item.address||''}}&nbsp;{{item.full_address||''}}
              </van-radio>
            </template>
          </van-radio-group>
        </van-popup>
      </section>
      <!--行程选择-->
      <section>
        <div class="confirm-item"
          v-if="pricelist.attributes&&pricelist.attributes.length">
          <p class="item-title"><span style="color: #f44;padding-left:0">* </span>{{$t('confirmPage.tripSel')}}</p>
          <template v-for="(attrx,ind) in showtrvel">
            <div :key="ind">
              <p class="item-tip">{{attrx.title}}</p>
              <p class="item-con"
                @click="checktrver(attrx,ind)">
                <template v-if="!attrx.itemsx">
                  <span>{{$t('confirmPage.noSeltrip')}}</span>
                  <span></span>
                </template>
                <template v-else>
                  <span>{{attrx.itemsx.title}}</span>
                  <span>{{attrx.itemsx.price}}</span>
                </template>
                <van-icon color="#404040"
                  name="arrow"
                  size="1.2em"></van-icon>
              </p>
            </div>
          </template>
          <!--行程选择弹出层-->
          <van-popup v-model="showchecktrver"
            class="setprop"
            position="center"
            :overlay="true">
            <div class="item-title">
              <p>
                <span>{{seltrvel.title}}</span>
                <span @click="checktrverend()"
                  style="float:right;color:#399EF6">{{$t('sured')}}</span>
              </p>
            </div>
            <van-radio-group v-model="checktrvel"
              class="radiobox">
              <template v-for="(item,index) in seltrvel.items">
                <van-radio class="radioitem"
                  :key="index"
                  :name="item.id">
                  {{item.title}}
                </van-radio>
              </template>
            </van-radio-group>
          </van-popup>
        </div>
      </section>
      <!--游客信息-->
      <section v-if="isLogin">
        <div class="confirm-item"
          @click="setsave()">
          <p class="item-title">游客信息
            <span>务必确认填写信息与出游证件一致</span></p>
          <ul>
            <template v-for="(item,ind) in paramcontanct">
              <nuxt-link v-if="item.name"
                :key="ind"
                class="user-item"
                tag="li"
                :to="{path:'/personal/addContacts',query:{'id':item.id,'checker':paramcontanct,'isLogin':isLogin}}">
                <span>出行人{{ind+1}}<i>{{item.name}}</i></span>
                <span>
                  <i>
                    <van-icon name="edit" />
                  </i>
                </span>
              </nuxt-link>
            </template>
          </ul>
          <div class="btnbox">
            <nuxt-link class="changeuser-btn"
              tag="button"
              :to="{path:'/personal/contactsList',query:{'adult':countprice.adult+countprice.child,'checker':paramcontanct,'isLogin':isLogin}}">选择出行人</nuxt-link>
          </div>
        </div>
      </section>
      <section v-else>
        <div class="confirm-item"
          @click="setsave()">
          <p class="item-title">游客信息<span>务必确认填写信息与出游证件一致</span></p>
          <van-collapse v-model="activeNames">
            <van-collapse-item v-for="x of countprice.adult"
              :key="x+'2'"
              :name="x">
              <div slot="title" class="contitle">游客{{x}} <i class="i1">成人</i></div>
              <addcon @traveuser="truser" :ind="x"></addcon>
            </van-collapse-item>
            <van-collapse-item v-for="x of countprice.child"
              :key="x+'3'"
              :name="x+countprice.adult">
              <div slot="title"
                class="contitle">游客{{x+countprice.adult}} <i class="i2">儿童</i></div>
              <addcon @traveuser="truser"
                :ind="x+countprice.adult"></addcon>
            </van-collapse-item>
          </van-collapse>
        </div>
      </section>
      <!--联系人信息-->
      <section>
        <div class="confirm-item contact">
          <p class="item-title">{{$t('contactInfo')}}</p>
          <van-field :label="$t('orderDetailPage.contact')"
            required
            clearable
            v-model="contact.name"
            :placeholder="$t('confirmPage.enterConName')" />
          <div class="van-cell van-cell--required van-field">
            <div class="van-cell__title van-field__label">
              <span>{{$t('phoneNumberCode')}}</span>
            </div>
            <div class="van-cell__value">
              <div class="van-field__body">
                <i class="setvan"
                  @click="showsel=true">+{{checkqu}}
                  <van-icon name="arrow" /></i>
                <input type="text"
                  v-model="contact.phone"
                  :placeholder="$t('confirmPage.mustTipsInfo')"
                  class="van-field__control">
              </div>
            </div>
          </div>
          <van-field :label="$t('email')"
            required
            clearable
            v-model="contact.email"
            :placeholder="$t('confirmPage.mustTipskp')" />
          <van-popup v-model="showsel"
            position="right"
            style="width:100%;height: 100%;background-color:rgba(0,0,0,0)!important;">
            <tel-code :pageparent="'/personal/addContacts'"
              :dataObj="columns"
              @selectCode="onChangequ"
              @back="showsel=false">
            </tel-code>
          </van-popup>
        </div>
      </section>
      <!--优惠信息-->
      <section v-if="isLogin">
        <div class="confirm-item">
          <p class="item-title">{{$t('confirmPage.saveInfo')}}</p>
          <div class="item-con"
            v-if="pricelist&&pricelist.points&&pricelist.points.point">
            <span>
              <i class="seti">{{$t('confirmFootComp.riceGrains')}}</i>
              <i class="seti2"
                style="color: #bbb">
                {{$t('confirmPage.saveInfoTip1')}}{{pricelist.points.total_point}}，{{$t('confirmPage.saveInfoTip2')}}{{pricelist.points.point}}{{$t('confirmPage.saveInfoTip3')}}{{pricelist.points.discount}}
              </i>
            </span>
            <van-switch v-model="countprice.is_point"
              style="float: right"
              size="2em" />
          </div>
          <p v-if="couponDetails&&couponDetails.length"
            class="item-con"
            @click="getCouponList('show')"
            style="border: 1px solid #ebedf0">
            <span>
              <i class="seti">{{$t('coupons')}}</i>
              <i v-if="showsetcou!=''"
                class="seti2"
                style="color: #1989fa">{{showsetcou}}</i>
              <i v-else
                class="seti2"
                style="color: #bbb">{{$t('confirmPage.notsel')}}</i>
            </span>
            <span></span>
            <van-icon color="#404040"
              name="arrow"
              size="1.2em"
              class="settopicon" />
          </p>
        </div>
        <van-action-sheet v-model="showcheckCou"
          :title="$t('coupons')"
          class="service-note">
          <van-radio-group v-model="setcou"
            @change="setcouponx()">
            <div class="setcheck">
              <span>{{$t('confirmPage.yetNotSelCop')}}</span>
              <van-radio name="null"> </van-radio>
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
              <div class="cupright">
                <van-radio :name="index"></van-radio>
              </div>
            </div>
          </van-radio-group>
        </van-action-sheet>
      </section>
      <!--预定留言-->
      <section>
        <div class="confirm-item">
          <p class="item-title">{{$t('confirmPage.leaveMessage')}}</p>
          <div class="item-con"
            style="padding-left: 0">
            <van-field type="textarea"
              :placeholder="$t('confirmPage.tipsRequire')"
              rows="2"
              autosize
              maxlength="200"
              :input="maxlength(comment)"
              v-model="comment" />
            <p>{{characterLength}}/200</p>
          </div>
        </div>
      </section>
      <!--同意用户协议-->
      <section>
        <div class="confirm-item">
          <div class="item-con">
            <!-- <van-checkbox v-model="tongyi"> -->
              <i class="agreea">
                {{$t('confirmPage.newAcceptRead')}}
              </i>
              <nuxt-link :to="{path:'/protocol/more'}"
                v-if="product.product_entity_type==1">
                <a class="agreea"
                  style="color: #216BFF">{{$t('agreeXifanServerM')}}</a>
              </nuxt-link>
              
              <nuxt-link :to="{path:'/protocol/alone'}"
                v-if="product.product_entity_type==0">
                <a class="agreea"
                  style="color: #216BFF">{{$t('agreeXifanServerA')}}</a>
              </nuxt-link>
              <i class="agreea">
                等内容
                </i>
            <!-- </van-checkbox> -->
          </div>
        </div>
      </section>
      <!--foot-->
      <section>
        <confirm-foot :orderInfo="getaddoder()"></confirm-foot>
      </section>
    </section>
  </section>
</template>

<script>
  import ConfirmFoot from '@/components/confirm_foot/foot.vue'
  import {getquhao} from '@/api/contacts'
  import {orderCouponList} from '@/api/confirm_order'
  import {getProfile} from '@/api/profile'
  import {getSessionStore} from '@/assets/js/utils'
  import {guojialist} from '@/api/contacts'
  import TelCode from '@/components/confirm_foot/telcode'
  import {mapMutations, mapState} from 'vuex'
  import addcon from '@/components/confirm_foot/addcon'
  import loginLine from '@/components/header/loginLine'
  export default {
    components: {
      ConfirmFoot,
      TelCode,
      addcon,
      loginLine,
    },
    data() {
      return {
        countprice: {}, //vuex里面的价格计算参数
        pricelist: {}, //vuex里面的价格返回参数
        showchecktime: false, //是否显示选择出发时间组件
        showchecktrver: false, //是否显示行程组件
        seltrvel: {}, //某一组行程数据的值
        checktrvel: '', //弹层临时选择的trvel
        checkedtrvel: [], //所选择的所有行程数据的值
        showtrvel: [], //行程选项页面显示值
        activeind: 0,
        activeNames: [1],
        // 静态参数
        columns: [],
        showsel: false,
        paramcontanct: this.$route.query.checker || [],
        checkqu: '86',
        tongyi: true,
        comment: '',
        contact: {name: '', phone: '', email: ''},
        showcheckCou: false,
        couponDetails: [], //我的优惠卷列表
        setcou: '',
        showsetcou: '',
        setsaveuser: false,
        product: {},
        showtype: '',
        xname: '',
        profile: '', //用户信息
        isLogin: this.$route.query.isLogin || false, // 默认false-->游客
        isLoginkeyword: true,
        usertraver: [], //未登录的用户
        characterLength: '',
      }
    },
    computed: {
      //获取计算价格参数
      get_vuex_countprice() {
        return this.$store.state.confirm.countprice
      },
      get_vuex_pricelist() {
        return this.$store.state.confirm.pricelist
      },
      ...mapState({
        vxReservePro: state => state.product.reservePro,
      }),
    },
    watch: {
      get_vuex_countprice(val) {
        this.countprice = val
        this.checkedtrvel = val.attributes
      },
      get_vuex_pricelist: {
        handler: function(val) {
          this.pricelist = val
          this.setshowtrvel()
        },
        deep: true, //深度监听
      },
      'countprice.is_point'(val) {
        this.$store.commit('countprice', {is_point: val})
      },
    },
    mounted() {
      setTimeout(() => {
        let obj = getSessionStore('pricelist') ? JSON.parse(getSessionStore('pricelist')) : {}
        this.$store.commit('pricelist', obj)
        let objw = getSessionStore('countprice') ? JSON.parse(getSessionStore('countprice')) : {}
        this.$store.commit('countprice', objw)
        this.product = JSON.parse(JSON.stringify(this.vxReservePro))
        this.countprice = this.$store.state.confirm.countprice
        this.pricelist = this.get_vuex_pricelist
        this.init()
        this.getqu()
        this.settitletip()
      }, 20)
    },

    methods: {
      maxlength(value) {
        this.characterLength = value.length
        let second = 6
        const timer = setInterval(() => {
          second--
          if (value.length == 200 && second) {
            this.$toast('最多200个汉字')
          } else {
            clearInterval(timer)
            this.$toast.clear()
          }
        }, 500)
      },
      async init() {
        // 1. 是否有token。有就请求个人信息；无则return
        let res = await getProfile()
        let {code, data} = res
        if (code === 0) {
          this.isLoginkeyword = true
          this.isLogin = true
          this.profile = data
          this.vxSetProfile(data)
          this.xname = this.product.name
          this.getCouponList()
          if (
            this.countprice.savephone == '' ||
            this.countprice.savephone == undefined ||
            this.countprice.savephone == 'undefined'
          ) {
            this.$store.commit('countprice', {
              savename: data.nickname || data.chinese_name,
              saveemail: data.email,
              savephone: data.phone,
            })
            this.countprice.savename = data.nickname || data.chinese_name
            this.countprice.savephone = data.phone
            this.countprice.saveemail = data.email
            this.contact = {name: data.nickname || data.chinese_name, phone: data.phone, email: data.email}
          } else {
            this.contact = {
              name: this.countprice.savename,
              phone: this.countprice.savephone,
              email: this.countprice.saveemail,
            }
          }
        } else {
          this.isLoginkeyword = false
          this.profile = {}
        }
      },

      //获得价格日历数据
      async getpricedate(id) {
        let {data, code} = await getdateTrip(id)
        if (code === 0) {
          this.pricedate = data
        } else {
          // this.pricedate = []
        }
      },
      //获得可用优惠卷列表
      async getCouponList(type) {
        let this_ = this
        let objdata = {
          product_id: this.product.product_id,
          departure: this.countprice.departure_date,
          price: this.pricelist.price,
        }
        let {data, code} = await orderCouponList(objdata)
        if (code === 0) {
          this.couponDetails = data || []
        } else {
          this.couponDetails = []
        }
        if (type) {
          this.showcheckCou = true
        } else {
          if (this_.couponDetails && this_.couponDetails.length && this_.countprice.coupon_cus_id == '') {
            for (let i = 0; i < this_.couponDetails.length; i++) {
              if (this_.couponDetails[i].is_best === true) {
                this_.setcou = i
                this_.showsetcou = this_.couponDetails[i].title
                this_.$store.commit('countprice', {coupon_cus_id: this_.couponDetails[i].coupon_customer_id})
              }
            }
          } else if (this_.couponDetails && this_.couponDetails.length && this_.countprice.coupon_cus_id != '') {
            for (let i = 0; i < this_.couponDetails.length; i++) {
              if (this_.couponDetails[i].coupon_customer_id == this_.countprice.coupon_cus_id) {
                this_.setcou = i
                this_.showsetcou = this_.couponDetails[i].title
              }
            }
          }
        }
      },
      //设置页头数据
      settitletip() {
        this.countprice = this.get_vuex_countprice
        let date = new Date(this.countprice.departure_date.replace(/-/g, '/')).getTime()
        let date1 = this.timeFormat(date)
        if (this.product.product_entity_type == 1 && this.product.self_support == 0) {
          this.showtype =
            date1 +
            '  ' +
            this.countprice.adult +
            '成人  ' +
            this.countprice.child +
            '儿童  ' +
            this.countprice.room_total +
            '房间  '
        } else {
          this.showtype = date1 + '  ' + this.countprice.adult + '成人  ' + this.countprice.child + '儿童  '
        }
      },
      timeFormat(timestamp) {
        let time = new Date(timestamp)
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let date = time.getDate()
        return year + '年' + (month < 10 ? '0' + month : month) + '月' + (date < 10 ? '0' + date : date) + '日'
      },
      //选择行程以后
      checktime() {
        this.$store.commit('countprice', {product_departure: this.countprice.product_departure})
        this.showchecktime = false
      },
      //选择行程之前
      checktrver(item, index) {
        this.seltrvel = item
        this.checktrvel = ''
        for (let i = 0; i < this.checkedtrvel.length; i++) {
          if (this.checkedtrvel[i].option_id == this.seltrvel.id) {
            this.checktrvel = this.checkedtrvel[i].option_val_id
          }
        }
        this.showchecktrver = true
      },
      //确认行程形成之后
      checktrverend() {
        var this_ = this
        let obj = null
        for (let i = 0; i < this_.checkedtrvel.length; i++) {
          if (this_.checkedtrvel[i].option_id == this_.seltrvel.id) {
            this_.checkedtrvel.splice(i, 1)
          }
        }
        if (this_.checktrvel != '') {
          obj = {
            option_id: this_.seltrvel.id,
            option_val_id: this_.checktrvel,
          }
          this_.checkedtrvel.push(obj)
        }

        this_.$store.commit('countprice', {attributes: this.checkedtrvel})
        this.showchecktrver = false
      },
      //设置页面显示行程
      setshowtrvel() {
        var obj = []
        var this_ = this
        if (!this_.pricelist.coupons.id) {
          this_.showsetcou = ''
          this_.setcou = ''
        } else {
          this_.showsetcou = this_.pricelist.coupons.title
          for (let i = 0; i < this_.couponDetails.length; i++) {
            if (this_.couponDetails[i].coupon_id == this_.pricelist.coupons.id) {
              this_.setcou = i
            }
          }
        }
        for (let i = 0; i < this_.pricelist.attributes.length; i++) {
          let item = this_.pricelist.attributes[i]
          item.itemsx = null
          obj.push(item)
        }
        for (let i = 0; i < this_.pricelist.attributes_override.length; i++) {
          let item = this_.pricelist.attributes_override[i]
          item.itemsx = null
          obj.push(item)
        }
        this_.showtrvel = obj
        for (let i = 0; i < this_.showtrvel.length; i++) {
          let itemx = this_.showtrvel[i]
          for (let j = 0; j < this_.checkedtrvel.length; j++) {
            if (itemx.id == this_.checkedtrvel[j].option_id) {
              let kitem = this_.showtrvel[i].items
              for (let k = 0; k < kitem.length; k++) {
                if (kitem[k].id == this_.checkedtrvel[j].option_val_id) {
                  this_.showtrvel[i].itemsx = kitem[k]
                }
              }
            }
          }
        }
      },
      onClickLeft() {
        let href = window.location.href.slice(-1)
        if (href == '#') {
          this.$router.go(-2)
        } else {
          this.$router.go(-1)
        }
      },
      onClickRight() {
        this.$router.replace({
          path: `/login?redirect=${this.$route.fullPath}`,
        })
      },
      // 得到区号
      async getqu() {
        let {data, code, msg, hot_country} = await guojialist()
        if (code === 0) {
          this._nomalLizePinyin(data, hot_country)
        } else {
        }
      },
      _nomalLizePinyin(data, hot) {
        let len = data.length
        let len2 = hot.length
        let obj = {
          热门城市: [],
        }
        for (let i = 0; i < len2; i++) {
          obj['热门城市'].push({...hot[i]})
        }
        for (let i = 0; i < len; i++) {
          if (!obj[data[i].key]) {
            obj[data[i].key] = []
          }
          obj[data[i].key].push({...data[i]})
        }

        this.columns = obj
      },
      onChangequ(picker) {
        this.checkqu = picker[0].telcode
        this.showsel = false
      },
      getaddoder() {
        let objarr = []
        for (let i = 0; i < this.paramcontanct.length; i++) {
          objarr.push(this.paramcontanct[i].id)
        }
        let date = null
        if (this.countprice.departure_date) {
          date = this.countprice.departure_date
        }
        let point = this.pricelist.points ? this.pricelist.points.point : 0
        let objcontact = {
          phone: this.checkqu + '-' + this.contact.phone,
          name: this.contact.name,
          email: this.contact.email,
        }
        var addorder = {
          product_id: this.$store.state.product.reservePro.product_id,
          depart_date: date,
          rooms: this.countprice.room_attributes,
          value_added_services: this.countprice.attributes,
          flight_id: this.countprice.product_departure,
          total_kids: this.countprice.child,
          total_adult: this.countprice.adult,
          room_total: this.countprice.room_total,
          tongyi: this.tongyi, //用户协议
          comment: this.comment,
          users: this.isLogin ? objarr : this.usertraver,
          contact: objcontact,
          integral: this.countprice.is_point ? point : '', //积分
          coupon_cus_id: this.countprice.coupon_cus_id,
        }
        return addorder
      },
      setcouponx: function(x) {
        let this_ = this
        if (this_.setcou === 'null' || this_.setcou === '') {
          this_.showsetcou = ''
          this_.$store.commit('countprice', {coupon_cus_id: ''})
        } else {
          this_.showsetcou = this_.couponDetails[this_.setcou].title
          this_.$store.commit('countprice', {coupon_cus_id: this_.couponDetails[this_.setcou].coupon_customer_id})
        }
        this.showcheckCou = false
      },
      setsave() {
        this.$store.commit('countprice', {
          savename: this.contact.name,
          saveemail: this.contact.email,
          savephone: this.contact.phone,
        })
      },
      truser: function(x) {
        this.usertraver[x.ind] = x.val
        console.log(this.usertraver)
      },
      ...mapMutations({
        vxSetProfile: 'profile/setProfile',
      }),
    },
  }
</script>
<style>
  body {
    overflow: scroll !important;
    position: relative !important;
  }
  .confirm-item .van-cell--required::before {
    content: '* ';
    font-size: 20px;
    font-weight: bold;
  }
  .confirm-item.contact .van-cell--required .van-cell__title span {
    margin-left: 5px;
  }
</style>
<style lang="scss" scoped>
  body {
    overflow: scroll !important;
    position: relative !important;
  }
  .neuHeader {
    padding-top: 88px;
  }
  .checkcoubtn {
    width: 440px;
    height: 72px;
    margin-left: 130px;
    line-height: 72px;
    text-align: center;
    font-size: 32px;
    color: #fff;
    margin-top: 50px;
    background: rgba(57, 158, 246, 1);
    opacity: 1;
    border-radius: 36px;
  }
  .service-note {
    padding: 0 0 50px 40px;
    bottom: 165px;
  }
  .setcheck {
    margin-top: 20px;
    display: flex;
    align-items: center;
    span {
      font-size: 24px;
      flex: 1;
    }
    div {
      width: 120px;
      text-align: right;
      margin-right: 80px;
      float: right;
    }
  }
  .cup-class {
    font-size: 24px;
    line-height: 32px;
    color: rgba(112, 112, 112, 1);
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .cup-item {
    width: 670px;
    height: 140px;
    margin-top: 30px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 12px rgba(65, 63, 63, 0.16);
    opacity: 1;
    border-radius: 8px;
    .cupleft {
      padding-top: 20px;
      float: left;
      width: 228px;
      height: 140px;
      text-align: center;
      background-image: url('../../assets/imgs/color.png');
      background-repeat: no-repeat;
      background-position: 0;
      background-size: 228px 140px;
      .p1 {
        font-size: 40px;
        font-weight: bold;
        line-height: 52px;
        color: rgba(255, 255, 255, 1);
      }
      .p2 {
        font-size: 24px;
        font-weight: 400;
        line-height: 32px;
        color: rgba(255, 255, 255, 1);
      }
    }
    .cupcon {
      float: left;
      width: 280px;
      height: 140px;
      text-align: left;
      padding-left: 20px;
      padding-top: 18px;
      .p1 {
        font-size: 24px;
        font-weight: bold;
        line-height: 36px;
        color: #707070;
      }
      .p2 {
        font-size: 20px;
        line-height: 28px;
        color: #707070;
      }
    }
    .cupright {
      float: left;
      width: 120px;
      height: 140px;
      text-align: right;
      padding-top: 35px;
      .btn1 {
        width: 120px;
        height: 40px;
        background: linear-gradient(180deg, rgba(27, 141, 255, 1) 0%, rgba(53, 201, 255, 1) 100%);
        opacity: 1;
        border-radius: 40px;
        display: block;
        font-size: 24px;
        line-height: 40px;
        color: rgba(255, 255, 255, 1);
      }
      .btn2 {
        width: 120px;
        display: block;
        height: 40px;
        border: 2px solid rgba(194, 194, 194, 1);
        border-radius: 40px;
        font-size: 24px;
        line-height: 40px;
        color: rgba(194, 194, 194, 1);
      }
    }
  }
  .setprop {
    width: 90%;
    border-radius: 8px;
    padding-bottom: 30px;
  }
  .section0 {
    background-color: #f3f3f3;
    width: 750px;
    box-sizing: border-box;
    padding: 20px 32px 200px 32px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .section0.not-login {
    padding-top: 88px;
  }
  .confirm-title p:nth-child(1) {
    font-size: 28px;
    font-weight: bold;
    line-height: 40px;
    color: rgba(45, 45, 45, 1);
    opacity: 1;
  }
  .confirm-title p:nth-child(2) {
    padding-top: 8px;
    width: 100%;
    font-size: 24px;
    font-weight: 400;
    line-height: 34px;
    color: rgba(45, 45, 45, 1);
    opacity: 1;
  }
  .confirm-title p:nth-child(3) {
    width: 100%;
    font-size: 24px;
    line-height: 60px;
    color: rgba(168, 168, 168, 1);
    opacity: 1;
  }
  .confirm-item {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
    opacity: 1;
    font-size: 24px;
    border-radius: 8px;
    margin-bottom: 28px;
    margin-top: 20px;
  }
  .item-title {
    width: 100%;
    padding: 0 24px;
    line-height: 70px;
    box-sizing: border-box;
    color: rgba(19, 19, 19, 1);
    font-weight: bold;
    font-size: 32px;
    border-bottom: 2px solid #dedede;
  }
  .item-con {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 24px;
    font-size: 28px;
    position: relative;
  }
  .item-con p {
    font-size: 14px;
    color: #9f9f9f;
    position: absolute;
    right: 5px;
    bottom: 20px;
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
    color: #ff9100;
    text-align: right;
  }

  .item-con i {
    top: 6px;
  }
  .item-tip {
    box-sizing: border-box;
    margin: 20px 8px 0 8px;
    padding-left: 15px;
    background: rgba(241, 241, 241, 1);
    opacity: 1;
    line-height: 48px;
    font-size: 24px;
    color: rgba(142, 142, 142, 1);
  }
  .user-item {
    border-bottom: 1px solid #dedede;
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
    color: #9f9f9f;
    font-size: 24px;
    font-style: normal;
    padding-left: 20px;
  }
  .user-item span:nth-child(2) {
    width: 80px;
    height: 80px;
    line-height: 80px;
    float: right;
    color: #399ef6;
  }
  .user-item > span:nth-child(2) {
    font-size: 48px;
    line-height: 220%;
  }
  .item-title > span {
    color: #989898;
    font-size: 20px;
    padding-left: 20px;
  }
  .item-title > p > span:nth-child(2) {
    font-size: 24px;
    font-weight: normal;
  }
  .changeuser-btn {
    width: 464px;
    height: 72px;
    background: rgba(57, 158, 246, 0);
    border: 2px solid rgba(57, 158, 246, 1);
    opacity: 1;
    border-radius: 36px;
    line-height: 67px;
    font-size: 28px;
    color: #399ef6;
    margin: 28px 0;
  }
  .btnbox {
    text-align: center;
  }
  .radioitem {
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
    font-style: normal;
    font-size: 24px;
  }
  .setvan i {
    top: 6px;
  }
  .seti {
    font-style: normal;
    display: inline-block;
    width: 100%;
    font-size: 24px;
  }
  .seti2 {
    font-style: normal;
    display: inline-block;
    width: 100%;
    font-size: 22px;
  }
  .radiobox {
    max-height: 800px;
    overflow-y: scroll;
  }
  .login-header {
    height: 88px;
    font-size: 32px;
    color: #191919;
    background-color: #fff;
    border-bottom: 1px solid rgb(238, 238, 238);
    transition: all 0.5s;
    .right-wrap {
      .search {
        width: 92px;
        height: 36px;
        background: rgba(57, 158, 246, 1);
        opacity: 1;
        color: #fff;
        border-radius: 18px;
      }
    }
  }
  .settopicon {
    top: -8.5px !important;
  }
  .agreea {
    font-size: 24px;
    font-weight: normal;
    font-style: normal;
  }
  .contitle {
    font-size: 24px;
    font-weight: bold;
    color: #3e3e3e;
    padding-left: 30px;
  }
  .contitle .i1 {
    padding: 0 3px;
    display: inline-block;
    font-size: 20px;
    color: #fff;
    font-style: normal;
    background: rgba(67, 183, 231, 1);
    opacity: 1;
    border-radius: 8px;
  }
  .contitle .i2 {
    padding: 0 3px;
    display: inline-block;
    font-size: 20px;
    color: #fff;
    font-style: normal;
    background: rgb(15, 207, 22);
    opacity: 1;
    border-radius: 8px;
  }
</style>
