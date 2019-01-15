<template>
  <!--价格日历-->
  <section>
    <date-trip :product="product"></date-trip>
  </section>
</template>

<script>
  import dateTrip from './dateTrip'
  export default {
    components: {
      dateTrip,
    },
    data() {
      return {
        priceData:[
          {
            "years":"2018",
            "month":"12",
            "days":[
              {
                "day":23,
                "price":"$798.4",
                "is_special":1,
                "status":true
              },
              {
                "day":25,
                "price":"$798.4",
                "is_special":1,
                "status":true
              },
              {
                "day":28,
                "price":"$998",
                "status":true
              },
              {
                "day":29,
                "price":"$998",
                "status":true
              },
              {
                "day":30,
                "price":"$998",
                "status":true
              }
            ]
          },
          {
            "years":"2019",
            "month":"1",
            "days":[
              {
                "day":12,
                "price":"$998",
                "status":true
              },
              {
                "day":19,
                "price":"$998",
                "status":true
              },
              {
                "day":26,
                "price":"$998",
                "status":true
              }
            ]
          },
          {
            "years":"2019",
            "month":"2",
            "days":[
              {
                "day":1,
                "price":"$998",
                "status":true
              },
              {
                "day":2,
                "price":"$998",
                "status":true
              },
              {
                "day":3,
                "price":"$998",
                "status":true
              },
              {
                "day":5,
                "price":"$998",
                "status":true
              },
              {
                "day":7,
                "price":"$998",
                "status":true
              },
              {
                "day":16,
                "price":"$998",
                "status":true
              },
              {
                "day":23,
                "price":"$998",
                "status":true
              }
            ]
          },
          {
            "years":"2019",
            "month":"3",
            "days":[
              {
                "day":2,
                "price":"$998",
                "status":true
              }
            ]
          }
        ],
        //产品
        product: {
          "product_id": 141,
          "default_price": "$238",
          "code": "US119",
          "product_entity_type": 1,
          "product_type": 1,
          "max_num_guest": 4,
          "min_num_guest": 1,
          "max_child_age": 2,
          "sales": 3,
          "self_support": 0,
          "name": "(5天)【华盛顿出发美东豪华游】<纽约+费城+康宁玻璃中心+华盛顿特区+尼亚加拉大瀑布+波士顿>",
          "small_description": "★ 畅游名城：纽约，费城，华盛顿，尼加拉瓜大瀑布，波士顿。 ★ 震撼体验：多种角度欣赏尼亚加拉瀑布的风采，体验视觉与听觉的双震撼； ★ 独特文化：虽一眼看完的景物，却可以让人深深感受到背后的历史渊源，费城独立厅带你感受人们对民主和自由的向往； ★ 特色风味：波士顿当地龙虾卷+特制面包里的新英格兰蛤蜊巧达浓汤； ",
          "icons_show": ["限时", "满减"],
          "icons_tour": [
            {
              "title": "买二送一",
              "content": "是指三人共同享用一个酒店标准间的价格，不提供加床"
            },
            {
              "title": "买二送二",
              "content": "是指四人共同享用一个酒店标准间的价格，不提供加床"
            },
            {
              "title": "畅销行程",
              "content": ""
            },
            {
              "title": "低价保证",
              "content": ""
            },
            {
              "title": "即时确认",
              "content": "该产品下单即可确认出行"
            }
          ],
          "images": [
            "http://www.24.tourscool.net/images/product/5b6176857cfd5_600_338.jpg",
            "http://www.24.tourscool.net/images/product/5b6176857d077_600_338.png",
            "http://www.24.tourscool.net/images/product/5b6176857d228_600_338.jpg",
            "http://www.24.tourscool.net/images/product/5b6176857d2a7_600_338.jpg"
          ],
          "departure_city": "华盛顿",
          "end_city": "纽约",
          "special_price": "",
          "feature_images": [
            "http://www.24.tourscool.net/images/product/5ba9aede9f341_600_338.jpg",
            "http://www.24.tourscool.net/images/product/5ba9aede9ed93_600_338.jpg"
          ],
          "is_kids": false,
          "is_single_pu": true,
          "is_favorite": false,
          "duration_days": 5
        },

      "attributes"
    :
      [
        {
          "title": "奥兰多十三大主题乐园或三大特色一日游任选其一（第一天）",
          "items": [
            {
              "id": 397,
              "title": "Disney Epoct（未来世界）"
            },
            {
              "id": 398,
              "title": "Disney Hollywood Studio（好莱坞影城）"
            },
            {
              "id": 399,
              "title": "Disney Animal Kingdom （动物王国）"
            },
            {
              "id": 403,
              "title": "Aquatica Orlando（海洋世界水上乐园）"
            }
          ]
        }
      ],
        "attributes_override"
    :
      [
        {
          "title": "瀑布酒店升级",
          "items": [
            {
              "id": 393,
              "title": "升级酒店到Quality Inn At The Falls或同級"
            },
            {
              "id": 394,
              "title": "不升级"
            },
            {
              "id": 395,
              "title": "升级到Doubletree by Hilton Niagara Falls/Sheraton at the Niagara Falls或同级"
            }
          ]
        }
      ],
        "transfer"
    :
      [
        {
          "product_departure_id": 236,
          "time": "1:00PM",
          "product_id": 141,
          "region": "华盛顿",
          "address": "航天航空博物馆 National Air and Space Museum ",
          "full_address": "601 Independence Ave SW, Washington, DC 20024"
        }
      ],
        "top_price"
    :
      [
        {
          "years": "2018",
          "month": "12",
          "days": [
            {
              "day": 23,
              "price": "$645",
              "status": true
            },
            {
              "day": 24,
              "price": "$645",
              "status": true
            },
            {
              "day": 25,
              "price": "$645",
              "status": true
            },
            {
              "day": 26,
              "price": "$645",
              "status": true
            },
            {
              "day": 27,
              "price": "$645",
              "status": true
            }
          ]
        }
      ]
    }

      }
    },
    created() {

    },
    mounted(){
    },
    methods: {

    }


  }

</script>

<style scoped>

</style>
