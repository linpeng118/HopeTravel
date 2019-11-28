<template>
    <div class="tabbar">
        <van-tabbar v-model="active" style="z-index:9999" active-color="#399EF6">
            <van-tabbar-item icon="wap-home" to="/">{{$t('personalPage.homepage')}}</van-tabbar-item>
            <van-tabbar-item icon="location-o" to="/search">{{$t('personalPage.myDistribution')}}</van-tabbar-item>
            <van-tabbar-item icon="chat-o" data-agl-cvt="1" :dot="dotShow!=1" @click="contactCustom">{{$t('onlineConsult')}}</van-tabbar-item>
            <van-tabbar-item icon="user-o" to="/personal">{{$t('personalPage.userCenter')}}</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
    import {
        replaceServerUrl
    } from '@/assets/js/utils'
    import {
        getCookie,
        getLocalStore,
        setLocalStore,
        getSessionStore,
        setSessionStore
    } from '@/assets/js/utils'
    export default {
        props: {
            Index: {
                type: Number,
                default: 0,
            },
        },
        data() {
            return {
                active: 0,
                dotShow: 1,
            }
        },
        mounted() {
            this.active = this.Index
            this.dotShow = getSessionStore('dotShow')
        },
        methods: {
            /**
             * 在线咨询
             */
            contactCustom() {
                this.dotShow = 1
                setSessionStore('dotShow', 1)
                setTimeout(() => {
                    this.dotShow = 0
                    setSessionStore('dotShow', 0)
                }, 7200000)
                let url = replaceServerUrl()
                window.open(url, '_blank')
            },
        },
    }

</script>
<style lang='scss'>
    .tabbar {
        z-index: 1000;
    }

</style>
