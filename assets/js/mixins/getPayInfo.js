import {mapMutations,mapGetters} from 'vuex'
import {getPayInfo} from '@/api/sale_union'
export const payInfo = {
  data(){
    return {
      fillInfo: {
        userName: '',
        cardId: '',
        smsCode: '',
        phone: ''
      }
    }
  },
  mounted(){
    console.log('我的1')
    if(JSON.stringify(this.payInfo) === '{}'){
      this.init()
    }
  },
  computed: {
    ...mapGetters([
      'payInfo'
    ])
  },
  methods: {
    async init() {
      let {code,data} = await getPayInfo()
      let _obj = {}
      if(code === 0) {
        _obj= data
        this.fillInfo = {
          userName: data.chinese_name,
          cardId: data.idcard_no,
          smsCode: '',
        }
      }
      this.vxSetPayInfo(_obj)
    },
    ...mapMutations({
      vxSetPayInfo: 'saleUnion/setPayInfo'
    })
  }
}
