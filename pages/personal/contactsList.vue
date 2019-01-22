<template>
  <section>
    <van-checkbox-group v-model="checkuser" :max="2">
      <van-checkbox
        v-for="(item, index) in list"
        :key="index"
        :name="item">
        <span class="objitem">
            <i> {{item.name_cn}} </i>
            <i> {{item.phone}} </i>
        </span>

      </van-checkbox>
    </van-checkbox-group>
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
        list: ['a', 'b', 'c'],
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
        // let {data, code} = await getcontacts()
        // if(code === 0) {
        //   // this.pricedate = data;
        //   console.log(data)
        // } else {
        //   // this.pricedate = []
        // }
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
            "passport":"1234",
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
    },
  }
</script>

<style lang="scss" scoped>


</style>
