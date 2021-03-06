import axios from 'axios'
import store from '@/store'
import {
    getCookieByKey,
    setCookieByKey
}
from '@/assets/js/utils'
import {
    TOKEN,
    LANGUAGE,
    CURRENCY,
    PLATFORM,
    PHONE_TYPE,
    APP_VERSION
} from '@/assets/js/config'
// 使用UI库的弹窗
import {
    Notify
} from 'vant';

// 创建axios实例
let httprequest = axios.create({
        // timeout: 1000 * 20, // 超时时间设为20s
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json; charset=utf-8', // json格式通信
        }
    })
    // 修改默认配置-post请求头的设置
    // httprequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    // 临时测试用，
    // httprequest.defaults.headers.post['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuMTkwOjkwMDFcL2FwaVwvdG91clwvdjFcL29hdXRoXC9sb2dpbiIsImlhdCI6MTU1MjkwMjQ2MywiZXhwIjoxNTUyOTAyNzYzLCJuYmYiOjE1NTI5MDI0NjMsImp0aSI6InZYdWtGWmwxdmx6dHdwNlEiLCJzdWIiOjEwMzUsInBydiI6IjFkMGEwMjBhY2Y1YzRiNmM0OTc5ODlkZjFhYmYwZmJkNGU4YzhkNjMiLCJ1aWQiOjEwMzV9.6MUo75YSNQ_Uo46ZnRqvhwjBAw-wPZ1_56QXkxBHJk';

// 请求拦截器（有些请求需要登录态才能访问）
httprequest.interceptors.request.use(
    config => {
        console.log('Making request to ' + config.url)
        if (process.client) {
            // TODO:这里不能动态获取到store中的数据,使用axios问题
            let token = getCookieByKey(TOKEN) || '';
            let currency = getCookieByKey(CURRENCY) || store().state.currency; // 货币类型获取
            let language = getCookieByKey(LANGUAGE) || store().state.language; // 语言
            let platform = getCookieByKey(PLATFORM) || store().state.platform; // 平台
            let phoneType = getCookieByKey(PHONE_TYPE) || store().state.phoneType; // 机型
            let appVersion = getCookieByKey(APP_VERSION) || store().state.appVersion; // APP版本
            // console.log('language', language)
            if (token || currency || language || platform) {
                config.headers['Authorization'] = token
                config.headers['Currency'] = currency
                config.headers['Language'] = language
                config.headers['Platform'] = platform
                config.headers['Phone-Type'] = phoneType
                config.headers['App-Version'] = appVersion
            }
            // 请求接口添加时间戳
            if (config.method == 'post') {
                config.data = {
                    ...config.data,
                }
            } else if (config.method == 'get') {
                config.params = {
                    t: +(Date.parse(new Date()) / 1000),
                    ...config.params
                }
            }
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 相应拦截器
httprequest.interceptors.response.use(
    // 请求成功
    res => {

        if (res.status === 200) {
            // 700：必须重新登录；401：返回了新的token
            if (res.data.code === 700 && res.config.url.indexOf('profile') < 0 && res.config.url.indexOf('coupon') < 0) {
                if (res.config.url.indexOf('order') > -1) {
                    window.location.href = '/personal'
                } else {
                    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname + window.location.search)
                }

            } else if (res.data.code === 401) {
                const token = res.data.data.token
                res.config.headers['Authorization'] = token
                setCookieByKey(TOKEN, token)
                return axios(res.config)
            } else {
                return Promise.resolve(res.data)
            }
        }
        return Promise.reject(res.data)
    },
    // 请求失败
    error => {
        const {
            response
        } = error;
        ('err response', response)
        if (response) {
            // 请求已发出，但是不在2xx的范围
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            // store.commit('changeNetwork', false);
        }
    }
)

export default httprequest

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            toLogin();
            break;
            // 403 token过期
            // 清除token并跳转登录页
        case 403:
            tip('登录过期，请重新登录');
            // localStorage.removeItem(TOKEN);
            // store.commit('loginSuccess', null);
            // setTimeout(() => {
            //   toLogin();
            // }, 1000);
            break;
            // 404请求不存在
        case 404:
            tip('请求的资源不存在');
            break;
        default:
            tip(`错误码：${status}，${other}`);
    }
}

/**
 * 提示函数
 * 禁止点击蒙层、显示三秒后关闭
 */
const tip = msg => {
    Notify({
        message: msg,
        duration: 3000,
    });
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    this.$router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}