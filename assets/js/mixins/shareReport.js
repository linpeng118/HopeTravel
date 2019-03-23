import {mapMutations,mapGetters} from 'vuex'
import {getShareReport} from '@/api/sale_union'
export const shareReport = {
  mounted(){
    if(JSON.stringify(this.shareReport) === '{}'){
      this.shareInit()
    }
  },
  computed: {
    ...mapGetters([
      'shareReport'
    ])
  },
  methods: {
    async shareInit() {
      let {code,data} = await getShareReport()
      let _obj = {}
      if(code === 0) {
        _obj.total = data.total
        _obj.platform = this._normalizeData(data.platform)
      }
      this.changeShareReport(_obj)
    },
    _normalizeData(lists){
      lists.forEach(item => {
        // if(item)
        item.image = require(`../../../assets/imgs/union/${item.platform}@2x.png`)
        item.title = item.platform === 'weixin' ? '微信好友' : item.platform ==='qq' ? 'QQ好友' : '新浪微博'
      })
      return lists
    },
    ...mapMutations({
      changeShareReport: 'saleUnion/changeShareReport'
    })
  }
}
