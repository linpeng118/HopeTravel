<!--订单和行程的页脚组件-->
<template>
  <section>
    <div class="confirm-foot">
      <span class="confirm-price">
        <i>$421569.33</i>
        <i>明细
          <van-icon name="arrow-up" />
          <van-icon name="arrow-down" />
        </i>
      </span>
      <span class="confirm-next-btn" :class="showbtn?'showbtn':''">下一步</span>
      <span class="contact-service">
        <i> <van-icon name="service-o" color="#399EF6" size="1.5em"/></i>
        <i>联系客服</i>
      </span>
    </div>
  </section>
</template>

<script>
  import {countprice} from '@/api/confirm_order'
  export default {
    data() {
      return {
        //价格明细列表
        pricelist:[],
        showbtn:false
      }
    },
    computed:{
      //获取计算价格参数
      get_vuex_countprice() {
        return this.$store.state.confirm.countprice;
      },
    },
    watch:{
      //监听计算价格参数
      get_vuex_countprice() {
        if(this.get_vuex_countprice.departure_date!=''&&this.get_vuex_countprice.room_total!=0){
          this.getpricelist(this.get_vuex_countprice)
          this.showbtn=true;
        }
        else{
          this.showbtn=false;
        }

      },
    },
    mounted(){
      this.$store.dispatch("initprice");
    },
    methods: {
      // 获取价格明细
      async getpricelist(objdata){
        let {data, code} = await countprice(objdata)
        if(code === 0) {
          console.log(data)
        }
        else {
        }
      }
    }
  }

</script>

<style scoped>
  .confirm-foot{
    width: 750px;
    height: 120px;
    background-color: #fff;
    position: fixed;
    box-sizing: border-box;
    padding: 20px 32px;
    left: 0;
    bottom: 0;
  }
  .confirm-next-btn{
    width:308px;
    height:80px;
    display: inline-block;
    background:#BBBBBB;
    opacity:1;
    border-radius:8px;
    color: #fff;
    text-align: center;
    font-size: 32px;
    line-height: 80px;
    float: right;
  }
  .confirm-price{
    height: 80px;
    display: inline-block;
    line-height: 20px;
    float: left;
    width: 240px;
    color: #FB605D;
  }
  .confirm-price>i:nth-child(1){
    font-style: normal;
    display: inline-block;
    font-size: 32px;
    text-align: left;
    font-weight: bold;
    width: 100%;
    height: 30px;
  }
  .confirm-price>i:nth-child(2){
    font-style: normal;
    display: inline-block;
    font-size: 24px;
    text-align: left;
    width: 100%;
    height: 20px;
  }
  .contact-service{
    width: 100px;
    height: 80px;
    display: inline-block;
    float: right;
    margin-right: 20px;
    font-size: 22px;
  }
  .contact-service i:nth-child(1){
    width: 100px;
    height: 40px;
    display: inline-block;
    text-align: center;
    line-height: 40px;
  }
  .contact-service i:nth-child(2){
    font-style: normal;
    width: 100px;
    color: #399EF6;
    font-size: 22px;
    display: inline-block;
    text-align: center;
    line-height: 40px;

  }
  .showbtn{
    background:rgba(251,96,93,1) !important;
  }


</style>
