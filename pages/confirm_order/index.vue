<template>
  <section class="section0">
    <!--页头信息-->
    <section>
      <div class="confirm-title">
        <p>{{product.name}}</p>
        <p v-html="settitletip()"></p>
      </div>
    </section>
    <!--接送服务-->
    <section>
      <div class="confirm-item">
        <p class="item-title">接送时间和地点</p>
        <p class="item-con" @click="showchecktime=true">
          <span>{{checktimeval}}</span>
          <span></span>
          <van-icon color="#404040" name="arrow" size="1.2em"/>
        </p>
      </div>
      <!--接送时间和地点弹出层-->
      <van-popup v-model="showchecktime" position="center" :overlay="true">
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
              {{item.time}} {{item.full_address}}
            </van-radio>
          </template>
        </van-radio-group>
      </van-popup>
    </section>

    <!--行程选择-->
    <section>
      <div class="confirm-item" v-if="pricelist.attributes">
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
        <van-popup v-model="showchecktrver" position="center" :overlay="true">
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
      <div class="confirm-item">
        <p class="item-title">游客信息
          <span>务必确认填写信息与出游证件一致</span></p>
        <ul>
          <li class="user-item">
            <span>出行人1<i>张三</i></span>
            <span><i><van-icon name="edit"/></i></span>
          </li>
        </ul>
        <div class="btnbox">
          <button class="changeuser-btn">
            选择出行人
          </button>
        </div>
      </div>
    </section>
    <!--联系人信息-->
    <section>
      <div class="confirm-item">
        <p class="item-title">联系人信息</p>
        <van-field
          label="联系人"
          placeholder="填写联系人姓名"
        />
        <div data-v-0ea3802e="" class="van-cell van-field">
          <div class="van-cell__title">
            <span>手机号码</span>
          </div>
          <div class="van-cell__value">
            <div class="van-field__body">

            <i class="setvan" @click="showsel=true">+86<van-icon name="arrow" /></i>
            <input type="text" placeholder="必填，用于接收信息" class="van-field__control">
            </div>
          </div>
        </div>
        <van-field label="邮箱" placeholder="必填，用于接收电子客票"/>

        <van-popup v-model="showsel" position="bottom" :overlay="true">
          <van-picker :columns="columns" show-toolbar title="选择区号"/>
        </van-popup>
      </div>
    </section>
    <!--优惠信息-->
    <section>
      <div class="confirm-item">
        <p class="item-title">优惠信息</p>
        <div class="item-con">
         <span>
           <i class="seti">米粒</i>
           <i class="seti" style="color: #bbb">共有米粒574，本次可用500米粒抵用$5</i>
         </span>
           <van-switch
             v-model="checked"
             style="float: right"
             size="2em"
           />
        </div>

      </div>
    </section>
    <!--预定留言-->
    <section>
      <div class="confirm-item">
        <p class="item-title">预定留言</p>
        <div class="item-con">
          <van-field
            type="textarea"
            placeholder="选填，你可备注预定相关要求"
            rows="2"
            autosize
          />
        </div>
      </div>
    </section>
    <!--同意用户协议-->
    <section>
      <div class="confirm-item">
        <div class="item-con">
          <van-checkbox v-model="checked">我已阅读并接受<a style="color: #216BFF">《稀饭旅行用户服务条款》</a></van-checkbox>
        </div>
      </div>
    </section>
    <!--foot-->
    <section>
      <confirm-foot></confirm-foot>
    </section>
  </section>

</template>

<script>

  import ConfirmFoot from '@/components/confirm_foot/foot.vue'

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
        checked:true,
        columns: ['杭州', '宁波', '温州', '嘉兴', '湖州','杭州', '宁波', '温州', '嘉兴', '湖州','杭州', '宁波', '温州', '嘉兴', '湖州'],
        showsel:false,
      }
    },
    computed: {
      //获取计算价格参数
      get_vuex_countprice() {
        return this.$store.state.confirm.countprice;
      },
      //产品
      product(){
        return this.$store.state.confirm.product;
      },
      //获取价格数据
      get_vuex_pricelist() {
        return this.$store.state.confirm.pricelist;
      },
    },
    watch:{
      get_vuex_countprice(val){
        this.countprice=val;
      },

      'get_vuex_pricelist' : {
        handler:function(val) {
          this.pricelist=val;
          this.setshowtrvel();
        },
        deep: true    //深度监听

      },
    },
    created(){
      this.pricelist=this.get_vuex_pricelist;

    },
    mounted() {
    },
    methods: {
      //获得价格日历数据
      async getpricedate(id) {
        // let {data, code} = await getdateTrip(id)
        // if(code === 0) {
        //   // this.pricedate = data;
        //   console.log(this.pricedate)
        // } else {
        //   // this.pricedate = []
        // }
      },
      //设置页头数据
      settitletip() {
        let date = new Date(this.countprice.departure_date).getTime();
        let date1 = this.timeFormat(date);
        if (this.product.product_entity_type == 1 && this.product.self_support == 0) {
          return date1 + '  ' + this.countprice.adult + '成人  ' + this.countprice.child + '儿童  ' + this.countprice.room_total + '房间  '
        } else {
          return date1 + '  ' + this.countprice.adult + '成人  ' + this.countprice.child + '儿童  '
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
      //确认选择形成之后
      checktrverend(){
        var this_=this;
        let obj={
          option_id:this_.seltrvel.id,
          option_val_id:this_.checktrvel
        }
        for(let i=0;i<this_.checkedtrvel.length;i++){
          if(this_.checkedtrvel[i].option_id==this_.seltrvel.id){
            this_.checkedtrvel.splice(i, 1);
          }
        }
        this_.checkedtrvel.push(obj);
        this_.$store.commit("countprice", {attributes:this.checkedtrvel});
        this.showchecktrver=false;
      },
      //设置页面显示行程
      setshowtrvel(){

        var obj=[];
        var this_=this;
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
        console.log(this_.showtrvel)
        }


    }
  }

</script>

<style scoped>

  .section0 {
    background-color: #f3f3f3;
    width: 750px;
    box-sizing: border-box;
    padding: 20px 32px 200px 32px;
  }

  .confirm-title p:nth-child(1) {
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
    line-height: 250%;
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
    width: 500px;
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


</style>
