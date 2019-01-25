import {
  getCookieByKey
} from '@/assets/js/utils'

export default {
  token: process.client ? getCookieByKey('token') : '',
  deviceType: {}
}
