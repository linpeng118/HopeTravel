<template>
    <div class="drift-wrap">
        <div v-if="showContactCall">
            <div>
                <a @click="contactCustom" data-agl-cvt="1"><img src="../../assets/imgs/home/icon_contact.png" alt=""></a>
            </div>
            <div @click="showcall" data-agl-cvt="2">
                <img src="../../assets/imgs/home/icon_phone.png" alt="">
            </div>
        </div>
        <div @click="backTop" v-if="isShowDrift">
            <img src="../../assets/imgs/home/icon_back_top.png" alt="">
        </div>
        <!--显示电话号码-->
    </div>
</template>

<script>
    import {
        DLG_TYPE
    } from '@/assets/js/consts/dialog'
    import {
        mapMutations,
        mapState,
        mapGetters
    } from 'vuex'
    export default {
        name: 'drift_aside',
        props: {
            isHome: {
                type: Boolean,
                default: false,
            },
            showContactCall: {
                type: Boolean,
                default: true,
            },
        },
        data() {
            return {
                isShowDrift: false, // 是否显示
                scrollTop: 0, // 滚动的距离
                isTel: false, // 电话号码显示
            }
        },
        mounted() {
            // 监听滚动
            if (!this.isHome) {
                window.addEventListener('scroll', this.scrollFn)
            }
        },
        destroyed() {
            // 移除监听
            if (!this.isHome) {
                window.removeEventListener('scroll', this.scrollFn)
            }
        },
        methods: {
            ...mapMutations({
                vxSaveReservePro: 'product/saveReservePro',
                vxToggleDialog: 'toggleDialog', // 是否显示弹窗
                vxSetDlgType: 'setDlgType', // 设置弹窗类型
            }),
            backTop() {
                if (!this.isHome) {
                    let timer = setInterval(() => {
                        let speed = Math.floor(-this.scrollTop / 3)
                        document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop + speed
                        if (this.scrollTop === 0) {
                            clearInterval(timer)
                        }
                    }, 17)
                } else {
                    this.$emit('backTop')
                }
            },
            callPhone() {
                this.isTel = !this.isTel
            },
            scrollFn() {
                if (!this.isHome) {
                    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                    let height = document.body.clientHeight
                    this.scrollTop = scrollTop

                    if (this.scrollTop > height) {
                        this.isShowDrift = true
                    } else {
                        this.isShowDrift = false
                    }
                }
            }, // 电话咨询
            showcall() {
                this.vxToggleDialog(true)
                this.vxSetDlgType(DLG_TYPE.PHONE)
            },

            homeScrollShow() {
                this.isShowDrift = true
            },
            homeScrollHide() {
                this.isShowDrift = false
            },
            contactCustom() {
              console.log('contactCustom');
              
            },
        },
    }

</script>

<style type="text/scss" lang="scss" scoped>
    .drift-wrap {
  width: 88px;
  position: fixed;
  right: 10px;
  bottom: 200px;
  font-size: 36px;
  z-index: 100;
  img {
    height: 88px;
    width: 88px;
  }
  .van-popup {
    border-radius: 16px;
  }
  .tel-list {
    .center-tel {
      width: 500px;
      font-size: 28px;
      color: #5a5a5a;
      dd {
        display: flex;
        display: -webkit-flex;
        height: 170px;
        padding: 0 50px;
        border-bottom: 1px solid #d8d8d8;
        justify-content: space-around;
        -webkit-justify-content: space-around;
        align-items: center;
        -webkit-align-items: center;
        &:last-child {
          border-bottom: none;
        }
        .big-icon {
          font-size: 50px;
          border-radius: 50%;
          border: 2px solid #707070;
          padding: 10px;
          margin-right: 20px;
        }
        .tel-box {
          flex: 1;
          a {
            color: #000;
            /*font-weight: bold;*/
          }
        }
      }
    }
  }
}
</style>
