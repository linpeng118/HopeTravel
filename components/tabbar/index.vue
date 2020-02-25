<template>
    <div class="tabbar">
        <van-tabbar v-model="active" style="z-index:9999" active-color="#00ABF9">
            <van-tabbar-item to="/">
                <span>{{$t('personalPage.homepage')}}</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon.active : icon.inactive"
                >
            </van-tabbar-item>
            <van-tabbar-item to="/search">
                <span>{{$t('personalPage.myDistribution')}}</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon.active2 : icon.inactive2"
                >
            </van-tabbar-item>
            <van-tabbar-item data-agl-cvt="1" :dot="dotShow!=1" @click="contactCustom">
                <span>{{$t('onlineConsult')}}</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon.active3 : icon.inactive3"
                >
            </van-tabbar-item>
            <van-tabbar-item icon="user-o" to="/personal">
                <span>{{$t('personalPage.userCenter')}}</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon.active4 : icon.inactive4"
                >
            </van-tabbar-item>
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
                icon: {
                    active: require('../../assets/imgs/home/home-active.png'),
                    inactive: require('../../assets/imgs/home/home.png'),
                    active2: require('../../assets/imgs/home/destination-active.png'),
                    inactive2: require('../../assets/imgs/home/destination.png'),
                    active3: require('../../assets/imgs/home/help-active.png'),
                    inactive3: require('../../assets/imgs/home/help.png'),
                    active4: require('../../assets/imgs/home/personal-active.png'),
                    inactive4: require('../../assets/imgs/home/personal.png'),
                },
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
    .tabbar .van-tabbar-item__icon img{
        height: 46px;
    }
    .tabbar .van-tabbar-item{
        color: #aeaeae;
    }
</style>
