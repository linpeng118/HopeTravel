<template>
    <div class="create">
        <header-bar title="评价"></header-bar>
        <div class="create__top">
            <!--首评-->
            <div class="create__head" v-if="!isAppend">
                <div class="leftPart">
                    <img :src="$route.query.image" alt="" />
                    <van-rate v-model="form.score[0].score" allow-half void-icon="star" color="#EF9A1A" void-color="#eee" :size="16" v-if="template==2" />
                    <h2 v-if="template==1">说说这次旅行中最有意思的事情...</h2>
                </div>
                <span v-if="template==2">{{parseFloat(form.score[0].score).toFixed(1)}}</span>
            </div>
            <!--追评-->
            <div class="create__append create__head" v-if="isAppend">
                <div class="leftPart">
                    <img :src="$route.query.image" alt="" />
                    <font>已评分</font>
                    <van-rate v-model="queryScore" allow-half void-icon="star" color="#EF9A1A" void-color="#eee" :size="16" readonly />
                </div>
                <span>{{parseFloat($route.query.score).toFixed(1)}}</span>
            </div>
            <!--追加提示-->
            <p class="appendTit" v-if="isAppend">追加一下你的美图和旅行感受吧~</p>
            <!--评论内容-->
            <textarea class="create__content" v-model="form.comment.content" :placeholder="placeholder"></textarea>

            <!--上传-->
            <div class="create__upload" v-if="form.image.length<1">
                <div class="create__upload__tip">
                    <div class="create__upload__tip__img">
                        <van-icon name="photo-o" />
                        <span>添加图片</span>
                        <input @change="filesHandle" class="fileFirst" type="file" value="" accept="image/*" />
                    </div>
                    <h4><b>10</b>米粒/张</h4>
                </div>
                <p>最多可以上传9张图片</p>

            </div>
            <!--图片展示列表-->
            <ul class="create__upload__list" v-if="form.image.length">
                <li v-for="(item,index) in form.image" :key="index">
                    <div class="img-box">
                        <img :src="item" alt="" />
                    </div>
                    <van-icon class="close" name="clear" @click.stop="fileRemoveHandel(item,index)" />
                </li>
                <li class="btn create__upload__tip__img" v-if="form.image.length<9">
                    <van-icon name="photo-o" />
                    <span>{{form.image.length}} / 9</span>
                    <input @change="filesHandle" type="file" accept="image/*" />
                </li>
            </ul>
        </div>

        <!--多维评分-->
        <ul class="rateList__bars" v-if="template==1 && !isAppend">
            <li v-for="(item,index) in form.score" :key="index">
                <b>{{item.name}}</b>
                <van-rate v-model="item.score" allow-half void-icon="star" color="#EF9A1A" void-color="#eee" :size="20" v-if="true" />
            </li>
        </ul>

        <!--协议提示-->
        <div class="create__tips">点击发布即表示同意<b @click="$router.push('/protocol/upload_user')">用户上传图片和视频使用协议</b></div>

        <!--发布按钮-->
        <div class="create__btn">
            <button @click="publishHandle()">发布</button>
        </div>

    </div>
</template>

<script>
    import {
        getCookieByKey
    } from '@/assets/js/utils'
    import {
        TOKEN,
    } from '@/assets/js/config'
    import axios from 'axios'
    import HeaderBar from '@/components/header/sale_union'
    import {
        getTemplate,
        publishComment
    } from '@/api/comment'
    export default {
        name: 'commentDetail',
        components: {
            HeaderBar
        },
        data() {
            return {
                isAppend: this.$route.query.comment_id ? true : false, //是否为追评
                template: this.$route.query.template, //1.多日游 2.单日游
                /*提交评论数据*/
                form: {
                    "comment": {
                        "parent_id": this.$route.query.comment_id || 0,
                        "template_id": this.$route.query.template,
                        "product_id": this.$route.query.product_id,
                        "order_id": this.$route.query.order_id,
                        "order_product_id": this.$route.query.order_product_id,
                        "content": ""
                    },
                    "image": [],
                    "video": [],
                    "score": [{
                        "dimension_id": 1,
                        "score": 1
                    }]
                }
            }
        },
        computed: {
            /*路由query score格式化*/
            queryScore() {
                return parseFloat(this.$route.query.score)
            },
            placeholder() {
                return this.isAppend ? '对评价内容进行补充，更全面的描述，晒更多的美图' : '评价符合规则，评价超过30字审核通过后即可获得50米粒，上传美图越多得米粒越多哟~评价内容被点赞达到一定数量还可以额外获得米粒'
            }
        },
        mounted() {
            this.fetchTemplate() //初始-获取评论模板信息
        },

        methods: {
            /**
             * 获取评论模板信息
             */
            async fetchTemplate() {
                let res = await getTemplate(this.template)
                /*设置默认评分 5*/
                res.data && res.data.dimension && res.data.dimension.length && res.data.dimension.map(value => {
                    this.$set(value, 'score', 5)
                })
                this.$set(this.form, 'score', res.data.dimension)
            },
            /**
             * 文件监听
             */
            filesHandle(e) {
                let file = e.target.files[0],
                    reader = new FileReader(),
                    that = this
                reader.readAsDataURL(file)
                reader.onload = function(e) {
                    var dx = (e.total / 1024) / 1024;
                    if (dx >= 5) {
                        that.$toast('文件大小不能超过5M~')
                        return
                    }
                    that.fileUpload(file)
                }
            },
            /**
             * 文件上传
             */
            fileUpload(file) {
                let formData = new FormData()
                formData.append('uploadFile', file)
                let url = process.env.NODE_ENV === 'production' ? `https://assets.tourscool.jp/upload.php?t=${+new Date()}` : `http://www.htw.tourscool.net/upload.php?t=${+new Date()}`
                /*上传至服务器*/
                axios({
                    url,
                    method: 'post',
                    data: formData,
                    headers: {
                        'Authorization': getCookieByKey(TOKEN) || ''
                    }
                }).then(res => {
                    if (res.data.code == 700) {
                        this.$toast('页面已失效~')
                        this.$router.go(-1)
                        return
                    }
                    if (res.data.code != 0) {
                        this.$toast(res.data.msg || '上传失败，请重试~')
                        return
                    }

                    this.form.image.push(res.data.data.url)
                })
            },
            /**
             * 文件移除
             */
            fileRemoveHandel(item, index) {
                this.form.image.splice(index, 1)
            },
            /**
             * 发布
             */
            async publishHandle() {
                if (!this.form.comment.content) {
                    this.$toast('请填写您的评价~')
                    return
                }
                let res = await publishComment(this.form)
                if (res.code != 0) {
                    this.$toast('发布失败了~请检查网络重试')
                    return
                }
                this.$toast('发布成功，感谢您的评价~')
                let href = window.location.href.slice(-1)
                if(href == '#'){
                this.$router.go(-2)
                } else {
                this.$router.go(-1)
                }
            }
        }
    }

</script>
<style lang="scss" scoped>
    .create {
        padding-top: 46PX;
        font-size: 24px;
        background: #F1F1F1;
        min-height: 100vh;

        .appendTit {
            color: #8F8F8F;
            font-size: 20px;
            line-height: 44px;
            margin-top: 30px;
        }

        .create__top {
            padding: 36px 30px 30px;
            background: #fff;

            /**/
            .create__head {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .leftPart {
                    display: flex;
                    align-items: center;

                    font {
                        font-size: 28px;
                        color: #131313;
                        margin-right: 14px;
                    }

                    img {
                        width: 100px;
                        height: auto;
                        margin-right: 26px;
                    }

                    h2 {
                        font-size: 28px;
                        color: #131313;
                        width: 500px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }

                span {
                    color: #EF9A1A;
                    font-size: 32px;
                }
            }

            /**/
            .create__content {
                width: 100%;
                height: 218px;
                margin: 46px 0;
                resize: none;
                border: 0;
                font-size: 24px;
                line-height: 44px;
            }

            /**/
            .create__upload__tip__img {
                width: 160px;
                height: 160px;
                border: 1px dashed #A5A5A5;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
                color: #8F8F8F;

                i {
                    font-size: 60px;
                    color: #8F8F8F;
                    margin-bottom: 10px;
                }

                .fileFirst {
                    width: 160px;
                    height: 160px;
                    position: absolute;
                    left: 0;
                    top: 0;
                    opacity: 0;
                }
            }

            .create__upload__tip {
                text-align: center;
                color: #8F8F8F;

                h4 {
                    font-weight: 500;
                    margin-top: 14px;
                    font-size: 20px;

                    b {
                        color: #EF9A1A;
                    }
                }
            }

            .create__upload {
                display: flex;
                align-items: center;

                p {
                    margin-left: 36px;
                    color: #8F8F8F;
                }
            }

            .create__upload__list {
                display: flex;
                flex-wrap: wrap;

                li {
                    width: 160px;
                    height: 160px;
                    position: relative;
                    margin-right: 14px;
                    margin-bottom: 20px;

                    &:nth-child(4n) {
                        margin-right: 0;
                    }

                    &.btn {
                        position: relative;

                        input {
                            position: absolute;
                            left: 0;
                            right: 0;
                            top: 0;
                            bottom: 0;
                            opacity: 0;
                        }
                    }

                    .img-box {
                        width: 160px;
                        overflow: hidden;
                        height: 160px;

                        img {
                            width: 100%;
                            height: auto;
                            display: flex;
                            font-size: 0;
                        }
                    }

                    .close {
                        position: absolute;
                        font-size: 40px;
                        right: -10px;
                        top: -10px;
                        color: #8F8F8F;
                    }

                }
            }

        }

        /**/
        .rateList__bars {
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 36px 30px 0;
            background: #fff;
            margin-top: 20px;

            li {
                display: flex;
                font-size: 30px;
                margin-bottom: 40px;
                align-items: center;

                &:last-child {
                    margin-bottom: 0;
                }

                b {
                    font-weight: 400;
                    color: #131313;
                    margin-right: 44px;
                }
            }
        }

        /**/
        .create__tips {
            font-size: 20px;
            color: #8F8F8F;
            background: #fff;
            padding: 60px 36px 36px;

            b {
                color: #399EF6;
            }
        }

        /**/
        .create__btn {
            width: 100%;
            text-align: center;
            margin-top: 40px;
            padding-bottom: 40px;

            button {
                width: 596px;
                height: 84px;
                line-height: 84px;
                text-align: center;
                background: rgba(57, 158, 246, 1);
                border-radius: 10px;
                color: #fff;
                font-size: 36px;
            }
        }

    }

</style>
