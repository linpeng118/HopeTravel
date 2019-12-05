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
      let _obj = {
        'weixin': '微信好友',
        'qq': 'QQ好友',
        'sinaweibo':'新浪微博',
        'm': '文章链接'
      }
      lists.forEach(item => {
        item.image = require(`../../../assets/imgs/union/${item.platform}@2x.png`)
        item.title = _obj[item.platform]
      })
      return lists
    },
    ...mapMutations({
      changeShareReport: 'saleUnion/changeShareReport'
    })
  }
}
