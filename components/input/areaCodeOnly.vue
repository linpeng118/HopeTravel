<template>
  <div class="area-code-only-comp">
    <!-- 区号 -->
    <div class="area-code clearfix">
      <h3 class="title">国家/地区</h3>
      <span class="desc">{{areaName}} {{proAreaCode}}</span>
      <van-icon class="icon-arrow fr"
        name="arrow"
        @click="onAreaArrow" />
    </div>
    <!-- 区号面板 -->
    <van-popup v-model="isShowList"
      position="right"
      style="width:100%;height: 100%;">
      <!-- <tel-code :pageparent="'/personal/addContacts'"
        :dataObj="moreLists"
        @selectCode="selectCode"
        ref="moreList2"
        @back="toggleAreaList">
      </tel-code> -->
      <newtel-code :pageparent="'/personal/addContacts'"
                 :dataObj="getCountryCode"
                 @selectCode="selectCode"
                 ref="moreList2"
                 @back="toggleAreaList">
      </newtel-code>
    </van-popup>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
  // import TelCode from '@/components/confirm_foot/telcode'
  import NewtelCode from '@/components/confirm_foot/newTelCode'
  // import {guojialist} from '@/api/contacts'
  import {getquhao,getLocationsCountry} from '@/api/contacts'
  export default {
    components: {
      // TelCode
      NewtelCode
    },
    props: {
      proAreaCode: {
        type: String,
        default: '86'
      }
    },
    data() {
      return {
        isShowList: false,
        areaName: '中国大陆',
        // 区号列表数据
        moreLists: {},
        countryList:{},//国家列表
        telList:{},//区号列表
        basicTelList:[],//合并国家和区号的缓存列表
      }
    },
    computed:{
      ...mapGetters([
        'getCountryCode'
      ])
    },
    mounted() {
      // this.init()
      if(!this.getCountryCode.hasOwnProperty('热门')){
        this.gotCountry();
        this.gotQuhao();
      }
      
    },
    beforeRouteEnter(to, from, next) {
      console.log(from)
      
      next(vm=>{
        vm.pushpath=from.path;
        vm.getcontant();
      // vm.gotCountry();
      // vm.gotQuhao();
        next();
      })
    },
    methods: {
      /* async init() {
        获取国家列表
        let {data, code, msg, hot_country} = await guojialist()
        if (code === 0) {
         this._nomalLizePinyin(data, hot_country)
        } else {
          console.log('error:', msg)
        }
      }, */
      /* //格式化拼音列表
      _nomalLizePinyin(data, hot) {
        let len = data.length;
        let len2 = hot.length;
        let obj = {
          '热门城市': []
        };
        for (let i = 0; i < len2; i++) {
          obj['热门城市'].push({...hot[i]})
        }
        for (let i = 0; i < len; i++) {
          if (!obj[data[i].key]) {
            obj[data[i].key] = []
          }
          obj[data[i].key].push({...data[i]})
        }
        this.moreLists = obj
      }, */
      ...mapMutations({
        vxSaveCountryCode: 'common/saveCountryCode'
      }),
      //格式化拼音列表
      _nomalLizePinyin(data,hot) {
        let len = data.length;
        

        console.log(data,hot);
      
        let len2 = hot.length;
        
          let obj = {
          '热门':[],
          // '列表':[]
        };
        let arr = {};
        for(let i= 0; i<len2; i++) {
          obj['热门'].push({...hot[i]})
        }
        for(let i= 0; i<len; i++) {
          if(!obj[data[i].name_pinyin]) {
            obj[data[i].name_pinyin] = []
          }
          obj[data[i].name_pinyin].push({...data[i]})
                     
          }
          return obj;
      },
      toggleAreaList() {
        this.isShowList = !this.isShowList
      },
      onAreaArrow() {
        this.isShowList = true
      },
      selectCode(area) {
        console.log('area: ', area);
        this.areaCode = area[0].tel_code
        this.areaName = area[0].name
        this.$emit('update:proAreaCode', area[0].tel_code)
        this.toggleAreaList()
      },
      //得到国家列表
      async gotCountry(){
        let {data, code,msg} = await getLocationsCountry()
       
        if (code === 0) {

          let hot_data = data.hot_data;
          let localList = data.list;
          this.local_List = data.list;
          this.hot_List = data.hot_data;
          console.log(this.local_List);
          ///api/locations&&/api/country/telcodes 数据合并
      //api/locations id name name_pinyin
      ///api/country/telcodes countryName tel_code
      //合并后格式为 id name name_pinyin tel_code
          for (let key in this.local_List) {
           this.basicTelList.map((val)=>{
             if(val.countryName == this.local_List[key].name){
               localList[key].tel_code = val.tel_code;
             }
           })
         }
         for (let key in this.hot_List) {
          
           this.basicTelList.map((val)=>{
             if(val.countryName == this.hot_List[key].name){
               hot_data[key].tel_code = val.tel_code;
             }
           })
         }
          console.log('合并测试数据',this.basicTelList);
          
         this.countryList = this._nomalLizePinyin(localList,hot_data);
          this.vxSaveCountryCode(this.countryList)
        console.log('this.countryList',this.countryList);
        }
        else {

        }

      },
      //得到区号所对应的列表
      async gotQuhao(){
        let {data, code,msg} = await  getquhao()
       
        if (code === 0) {
       
          this.basicTelList = data;
          
        }
        else {

        }

      },
    },
  }
</script>

<style lang="scss" scoped>
  .area-code-only-comp {
    width: 100%;
    font-size: 0;
    .area-code {
      height: 84px;
      padding: 24px;
      font-size: 0;
      border-bottom: 1px solid rgba(222, 222, 222, 1);
      .title {
        display: inline-block;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(19, 19, 19, 1);
      }
      .desc {
        margin-left: 10px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(197, 197, 197, 1);
      }
      .icon-arrow {
        padding: 2px 20px;
        font-size: 30px;
      }
    }
  }
</style>