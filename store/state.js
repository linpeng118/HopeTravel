import {
  getCookieByKey
} from '@/assets/js/utils'
import {
  DLG_TYPE
} from '@/assets/js/consts/dialog'

export default {
  token: '',
  deviceType: {},
  isShowDlg: false, // 是否显示弹窗
  dlgType: DLG_TYPE.NORMAL, // 显示的弹窗类型
  closeDown: 'no',
  currency: 'CNY', // 货币类型
  language: 'zh-CN',
  phoneType: '',
  platform: 'mobile',
  appVersion: '0.0.0'
}
