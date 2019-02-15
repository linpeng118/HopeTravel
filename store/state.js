import {
  getCookieByKey
} from '@/assets/js/utils'
import {
  DLG_TYPE
}
from '@/assets/js/consts/dialog'
export default {
  token: process.client ? (getCookieByKey('token') ? getCookieByKey('token') : '') : '',
  deviceType: {},
  isShowDlg: false, // 是否显示弹窗
  dlgType: DLG_TYPE.NORMAL, // 显示的弹窗类型
  currency: process.client ? (getCookieByKey('currency') ? getCookieByKey('currency') : 'CNY') : 'CNY', // 货币类型
}
