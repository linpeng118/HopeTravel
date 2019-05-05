<template>
  <section>
    <van-nav-bar class="login-header tours-no-bb"
                 ref="loginHeader"
                 :title="title"
                 :z-index="999"
                 @click-left="onClickLeft"
                 @click-right="onClickRight">
      <van-icon class="left-wrap" name="arrow-left" slot="left" />
      <van-icon class="right-wrap" slot="right" v-if="type!='list'">
        <div class="search active " v-if="checkuser.length==adult" >
          <div class="text ">{{$t('partcailComp.accomplish')}}</div>
        </div>
        <div class="search " v-else>
          <div class="text ">{{$t('partcailComp.accomplish')}}</div>
        </div>

      </van-icon>
    </van-nav-bar>
    <div v-if="$route.query.adult">
      <p v-if="adult" class="contancts-title">{{$t('pleaseChoose')}}{{adult}}{{$t('personalPage.travelPeople')}}</p>
    </div>
    <van-checkbox-group v-if="type!='list'" v-model="checkuser" class="checkboxall" :max="parseInt(adult)">
      <van-checkbox
         v-for="(item, index) in list"
        :key="index"
        :disabled="item.phone&&item.passport?false:true"
        :name="item">
        <span class="objitem">
            <i>
              {{item.lastname}}&nbsp;{{item.firstname}}
              <a>{{(item.six==0)?$t('woman'):$t('man')}}</a>
            </i>
            <template v-if="item.phone&&item.passport">
               <i>{{$t('passportNumber')}}&nbsp;&nbsp;{{item.passport}} </i>
               <i>{{$t('phoneNumber')}}&nbsp;&nbsp;{{item.phone}} </i>
            </template>
            <template v-else>
               <i style="color: red">{{$t('personalPage.addIncompleteInfo')}}</i>
            </template>
        </span>
        <nuxt-link :to="{path:'/personal/addContacts',query:{'id':item.customer_contract_id,'adult':$route.query.adult}}">
          <b class="bicon"><van-icon name="edit" color="#399EF6;"/></b>
        </nuxt-link>
      </van-checkbox>
    </van-checkbox-group>
    <ul v-else class="objitembox">
      <li v-for="(item, index) in list" :key="index">
         <span class="objitem">
            <i>
              {{item.lastname}}&nbsp;{{item.firstname}}
              <a>{{(item.six==0)?$t('woman'):$t('man')}}</a>
            </i>
            <template v-if="item.phone&&item.passport">
               <i>{{$t('passportNumber')}}&nbsp;&nbsp;{{item.passport}} </i>
               <i>{{$t('phoneNumber')}}&nbsp;&nbsp;{{item.phone}} </i>
            </template>
            <template v-else>
               <i style="color: red">{{$t('personalPage.addIncompleteInfo')}}</i>
            </template>
        </span>
        <nuxt-link :to="{path:'/personal/addContacts',query:{'id':item.customer_contract_id}}">
          <b class="bicon"><van-icon name="edit" color="#399EF6;"/></b>
        </nuxt-link>
      </li>

    </ul>
    <div class="btnbox">
      <nuxt-link class="changeuser-btn" tag="button" :to="{path:'/personal/addContacts'}">
        <van-icon name="plus" color="#fff;"/>&nbsp;{{$t('selectTravlerPage.addTravler')}}
      </nuxt-link>
    </div>
  </section>
</template>

<script>
  import {getcontants} from '@/api/contacts'

  export default {
    components: {

    },
    data() {
      return {
        checkuser:[],
        checker:this.$route.query.checker||[],
        list: [],
        type:this.$route.query.type||'',
        title:'选择出行人',
        adult:this.$route.query.adult||1,

      }
    },
    computed: {},
    created(){
    },
    mounted(){
     this.getlist();

    },

    methods: {
      //获得价格日历数据
      async getlist() {
        let {data, code, msg} = await getcontants()
        if(code === 0) {
          this.list = data;
          this.setcheck();
        }
        else if(code==401){

        }
        else {
          this.$dialog.alert({
            message: msg
          });
        }
      },
      onClickLeft(){
        this.$router.go(-1)
      },
      setcheck(){
        let objarr=[];
        var this_=this;
        this.checker=this.$route.query.checker;
        if(this.checker&&this.checker.length>0){
          for(let i=0;i<this_.checker.length;i++){
            for(let j=0;j<this_.list.length;j++){
             if(this_.list[j].customer_contract_id==this_.checker[i].id){
                this_.checkuser.push(this_.list[j]);
             }
            }
          }
        }

      },
      onClickRight(){
        if(this.checkuser.length==this.adult){
          var objarrx=[];
          for(let i=0;i<this.checkuser.length;i++){
            objarrx.push({
              id:this.checkuser[i].customer_contract_id,
              name:this.checkuser[i].lastname + this.checkuser[i].firstname,
            })
          }
          if(objarrx.length>0){
            this.$router.replace({ path: '/confirm_order', query: { checker: objarrx }})
          }
          else{
            this.$router.replace({ path: '/confirm_order'})
          }
        }

      },
    },
  }
</script>

<style lang="scss" scoped>
  .checkboxall{
    padding: 34px;
  }
  .objitembox{
    padding:  50px
  ;
  }
  .checkboxall>div{
    margin-bottom: 20px;
  }
  .objitem{
    display: inline-block;
    font-size: 28px;
    color: #9F9F9F;
    width: 550px;
  }
  .objitem i {
    display: inline-block;
    font-size: 28px;
    font-style: normal;
    width: 550px;
    line-height: 40px;
   }
  .objitem i:first-child{
    color: #191919;
    font-weight: bold;
    line-height: 70px;
  }
  .objitem>i:first-child>a {
    display: inline-block;
    font-size: 28px;
    color: #9F9F9F;
    font-weight: normal;
    font-style: normal;

  }
  .bicon {
    display: inline-block;
    font-size: 42px;
    line-height: 70px;
    color: #399EF6;
    font-weight: normal;
    font-style: normal;
    float: right;
    width: 50px;

  }
  .btnbox {
    text-align: center;
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
  .contancts-title{
    font-size: 28px;
    color: #EF9A1A;
    padding: 0 34px;
    line-height: 50px;
    padding-top: 20px;
  }
  .login-header {
    height: 88px;
    font-size: 32px;
    color: #191919;
    background-color: #fff;
    box-shadow:0px 4px 12px rgba(0,0,0,0.14);
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
        background:#D2D2D2;
        opacity:1;
        color: #fff;
        border-radius:18px;
      }
    }
  }
  .active{
    background-color: #399EF6!important;
  }
</style>
