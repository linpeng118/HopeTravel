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
      <nuxt-link v-if="thisrouter=='date_trip'" class="confirm-next-btn" :class="showbtn?'showbtn':''" tag="span"
                 to="/confirm_order">下一步
      </nuxt-link>
      <span v-else-if="showbtn2==false" class="confirm-next-btn">下一步</span>
      <span v-else class="confirm-next-btn showbtn" @click="addOrderx()" >下一步</span>
      <span class="contact-service">
        <i><van-icon name="service-o" color="#399EF6" size="1.5em"/></i>
        <i>联系客服</i>
      </span>
    </div>
    <van-popup v-model="showpops" class="setbottom" position="bottom" :overlay="true">
      <paylist :payData="pricelist" @closepops="closepops"></paylist>
    </van-popup>

  </section>
</template>

<script>

  import paylist from './paylist'
  import {countprice} from '@/api/confirm_order'
  import {addorder} from '@/api/confirm_order'
  export default {
    components: {
      paylist
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
        if (this.get_vuex_countprice.departure_date != '' && this.get_vuex_countprice.room_total != 0){
          this.getpricelist(this.get_vuex_countprice)
          this.showbtn = true;
        }
        else {
          this.showbtn = false;
        }
      },
      'addorder'(val){
        if(val.tongyi&&val.contact.phone&&val.contact.name&&val.contact.email&&val.user){
          this.showbtn2=true;
        }
      }
    },
    mounted() {
      this.$store.dispatch("initprice");
      this.checkrouter();//判断当前位置

    },
    methods: {
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
          console.log(data)
          this.$dialog.alert({
            message: msg
          });
          this.$store.commit("countprice", {attributes:[]});
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
        console.log(this.thisrouter)
      },
      async addOrderx(){
        let {data, code , msg} = await addorder(this.addorder)
        if (code === 0) {
          console.log(data)
        }
        else {
          console.log(data)
          this.$dialog.alert({
            message: msg
          });
          this.$store.commit("countprice", {attributes:[]});
        }
      }

    }
  }

</script>

<style scoped>
  .confirm-foot {
    width: 750px;
    height: 120px;
    background-color: #fff;
    position: fixed;
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
