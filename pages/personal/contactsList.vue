<template>
  <section>
    <van-nav-bar class="login-header tours-no-bb"
                 ref="loginHeader"
                 :title="title"
                 :z-index="999"
                 @click-left="onClickLeft"
                 @click-right="onClickRight">
      <van-icon class="left-wrap" name="arrow-left" slot="left" />
      <van-icon class="right-wrap" slot="right">
        <div class="search">
          <div class="text">完成</div>
        </div>
      </van-icon>
    </van-nav-bar>
    <p v-if="adult" class="contancts-title">请选择{{adult}}位出行人</p>
    <van-checkbox-group v-model="checkuser" class="checkboxall" :max="adult">
      <van-checkbox
        v-for="(item, index) in list"
        :key="index"
        :disabled="item.phone&&item.passport?false:true"
        :name="item">
        <span class="objitem">
            <i>
              {{item.lastname}}&nbsp;{{item.firstname}}
              <a>{{(item.six==0)?'女':'男'}}</a>
            </i>
            <template v-if="item.phone&&item.passport">
               <i>护照号&nbsp;&nbsp;{{item.passport}} </i>
               <i>手机号&nbsp;&nbsp;{{item.phone}} </i>
            </template>
           <template v-else>
               <i style="color: red">信息不全，请补充</i>
            </template>
        </span>
        <b class="bicon"><van-icon name="edit" color="#399EF6;"/></b>
      </van-checkbox>
    </van-checkbox-group>

    <div class="btnbox">
      <nuxt-link class="changeuser-btn" tag="button" to="/personal/addContacts" ><van-icon name="plus" color="#fff;"/>&nbsp;新增旅客</nuxt-link>

    </div>
  </section>
</template>

<script>
  import {getcontacts} from '@/api/contacts'
  export default {
    components: {

    },
    data() {
      return {
        checkuser:[],
        list: [],
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
        let {data, code} = await getcontacts()
        if(code === 0) {
          // this.pricedate = data;
          console.log(data)
        } else {
          // this.pricedate = []
        }
        this.list=[
          {
            "customer_contract_id":907,
            "name_cn":"王五",
            "firstname":"si",
            "lastname":"green",
            "gender":"f",
            "phone":"86-18100000001",
            "dob":"1985-05-01",
            "email":"zhaos@163.com",
            "weight":null,
            "height":null,
            "passport":"",
            "nationality":"中国",
            "created":"2018-12-21 16:15:08",
            "last_updated":"2018-12-21 17:00:17",
            "customer_id":953,
            "six":0,
            "identity":"510123456789123456"
          },
          {
            "customer_contract_id":906,
            "name_cn":"赵四",
            "firstname":"vick",
            "lastname":"zhao",
            "gender":"f",
            "phone":"86-18100000001",
            "dob":"1985-05-01",
            "email":"zhaos@163.com",
            "weight":null,
            "height":null,
            "passport":"1234",
            "nationality":"中国",
            "created":"2018-12-21 16:10:02",
            "last_updated":"2018-12-21 16:44:41",
            "customer_id":953,
            "six":0,
            "identity":null
          },
          {
            "customer_contract_id":896,
            "name_cn":null,
            "firstname":"zhang",
            "lastname":"chunhua",
            "gender":null,
            "phone":"86-",
            "dob":"",
            "email":"",
            "weight":null,
            "height":null,
            "passport":"1234",
            "nationality":"",
            "created":"2000-01-01 00:00:00",
            "last_updated":"2018-11-29 12:29:20",
            "customer_id":953,
            "six":0,
            "identity":null
          }
        ]
      },
      onClickLeft(){
        this.$router.go(-1)
      },
      onClickRight(){

      },
    },
  }
</script>

<style lang="scss" scoped>
  .checkboxall{
    padding: 34px;
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
        background:rgba(57,158,246,1);
        opacity:1;
        color: #fff;
        border-radius:18px;
      }
    }
  }
</style>
