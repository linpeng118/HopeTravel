<template>
    <div class="tag" :class="className" @click="onTag(tag)">{{tag.title || tag.content || tag.name}}
    </div>
</template>

<script>
    export default {
        components: {},
        props: {
            tag: {
                type: Object,
                require: true,
                default: () => ({})
            },
            className: {
                type: String,
                default: 'normal'
            },
            isKeywords: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {}
        },
        computed: {},
        mounted() {},
        methods: {
            onTag(tag) {
                if (this.isKeywords) {
                    this.$emit('callOnTagKeywords', tag.name)
                } else {
                    let {
                        category,
                        product_type,
                        span_city,
                        start_city
                    } = tag
                    this.$emit('callOnTag', {
                        category,
                        product_type,
                        span_city,
                        start_city
                    }, tag)
                }
            }
        },
    }

</script>

<style lang="scss" scoped>
    .tag {
        display: inline-block;
        margin: 0 15px 16px 0;
        padding: 14px 20px;
        font-size: 24px;
        border-radius: 30px;

        &.normal {
            color: #191919;
            background: #f1f1f1;
        }

        &.active {
            color: #f1f1f1;
            background: #399ef6;
        }
    }

</style>
