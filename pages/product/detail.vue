<template>
  <div class="product-detail-page" ref="refProductDetailPage">
    <product-detail-header class="product-detail-header"
      fixed
      @callOnRight="onHeaderRight"
      @callOnLeft="onHeaderLeft"
      @goTo="gotoRegion"
      :review="!!reviews.product"
      :area="areaNav"
      ref="refProdctDetailHeader" />
    <div class="product-detail" ref="refProductDetail">
      <!-- banner -->
      <div class="banner-wrap" v-if="product" ref="refBanner">
        <van-swipe class="banner" :autoplay="60000000" @change="onBannerChange" :show-indicators="false">
          <van-swipe-item v-if="product.videos && product.videos.length">
            <div class="video-box" @click="playVideo">
              <img src="../../assets/imgs/product/icon_video@2x.png" alt="">
            </div>
            <div class="banner-img">
              <img :src="product.videos[0].cover" />
            </div>
          </van-swipe-item>
          <van-swipe-item v-for="image in product.images" :key="image">
            <div class="banner-img">
              <img :src="image" alt="image" />
            </div>
          </van-swipe-item>
        </van-swipe>
        <!-- banner页数 -->
        <div class="custom-indicator">
          <span><img src="../../assets/imgs/product/icon_img@2x.png" />{{product.images && product.images.length }}</span>
          <span v-if="product.videos && product.videos.length"><img src="../../assets/imgs/product/icon_video_s@2x.png" />{{product.videos.length}}</span>
        </div>
        <!-- 产品编号 产品类型-->
        <div class="serial-num">
          <span>{{product.departure_city | departureCity}}地{{ $t("dateTripPage.startOff")}} {{product.tour_category}}</span>
          <span>{{ $t("productDetailPage.productId") }}：{{ product.product_id }}</span>
        </div>
      </div>
      <!-- 产品 -->
      <div class="product" ref="refProductd">
        <div ref="refRivewTop">
          <div class="product-box">
            <!-- name部分 -->
            <div class="name">
              <div class="title"><span class="prod-tag" v-if="product.self_support">{{ $t("selfSupport") }}</span>{{ product.name_short || product.name }}</div>
              <div class="name_short" v-if="product.name_short">{{ product.name }}</div>
            </div>
            <div class="tag-box" v-if="product.tags">
              <span v-for="tag in product.tags.tag_attribute" :key="'tag' + tag">{{tag}}</span>
            </div>
            <div class="price-box">
              <div>
                <strong>{{product.special_price || product.default_price}}</strong> 起/人
              </div>
              <div>
                <span v-if="product.comment_score !== '0.0'" class="score">{{ product.comment_score }}分</span>
                <span v-if="product.comment_count"> | {{product.comment_count}}条评论</span>
                <span v-if="product.sales" style="margin-left:10px">{{ product.sales }}人出行</span>
              </div>
            </div>
            <div class="showapp" v-if="product.is_newer_discount" @click="downloadApp">
              App下单立减{{product.newer_min_discount}}起,更有新人优惠等你拿
            </div>
            <div class="mili-box" v-if="product.self_support || product.product_entity_type == 1">
              <span class="label">米粒</span>
              <span>米粒可抵用{{product.point_percent}}</span>
            </div>
          </div>
          <!-- 活动优惠券服务 -->
          <div class="product-main-box" v-if="couponDetailList.length || product.tags.tag_market.length || product.tags.tag_service.length">
            <van-cell is-link v-if="couponDetailList.length" @click="changeStatusPopup('couponShow')">
              <template slot="title">
                <div class="popup-item">
                  <span class="custom-title">领券</span>
                  <span class="coupon" v-for="coupon in couponDetailList" :key="coupon.id">{{coupon.title}}</span>
                </div>
              </template>
            </van-cell>
            <template v-if="product.tags">
              <van-cell is-link v-if="product.tags.tag_market && product.tags.tag_market.length" @click="changeStatusPopup('marketShow')">
                <template slot="title">
                  <div class="popup-item">
                    <span class="custom-title">活动</span>
                    <span class="text" v-for="market in product.tags.tag_market" :key="'market' + market">{{market}}</span>
                  </div>
                </template>
              </van-cell>
            </template>
            <template v-if="product.tags">
              <van-cell is-link v-if="product.tags.tag_service && product.tags.tag_service.length" @click="changeStatusPopup('serviceShow')">
                <template slot="title">
                  <div class="popup-item">
                    <span class="custom-title">服务</span>
                    <span class="text" v-for="service in product.tags.tag_service" :key="'service' + service">
                      <van-icon name="checked" color="#3ED68F" size="16" />{{service}}
                    </span>
                  </div>
                </template>
              </van-cell>
            </template>
          </div>
          <!-- 团期价格 -->
          <div class="nav-title">
            <span>{{ $t("productDetailPage.groupPrice") }}</span>
          </div>
          <div class="product-main-box"> 
            <div class="time-price">
              <van-row :gutter="10">
                <van-col span="6" v-for="priceItem in topPriceList" :key="priceItem.year + priceItem.month + priceItem.day">
                  <div class="items-tp" @click="onGroupPriceDate(priceItem)">
                    <div>
                      {{ priceItem.month }}/{{ priceItem.day }} 
                      {{ getWeek(priceItem.year, priceItem.month, priceItem.day)}}
                    </div>
                    <div class="p-text">
                      {{priceItem.price}} 
                      <span class="special" v-if="priceItem.is_special">特</span>
                      <span class="soldout" v-if="priceItem.is_soldout">罄</span>
                    </div>
                  </div>
                </van-col>
                <van-col span="6">
                  <div class="more-pt" @click="onGroupPriceMore">更多团期 <img src="../../assets/imgs/product/icon_more@2x.png" alt=""></div>
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
        <!-- 评价 -->
        <div class="nav-title" v-if="reviews.product" ref="refComment">
          <div>{{ $t("comment.rate") }} <span class="sorct">{{ reviews.product.comment_score }}</span></div>
          <div class="m-lst" @click="gotoReview">{{ $t("seeAll") }}({{ reviews.product.comment_count }}) <van-icon name="arrow" /></div>
        </div>
        <div class="product-main-box" v-if="reviews.product">
          <div class="comment-wrapper">
            <div class="tags-line">
              <span v-if="reviews.product.top">{{getTagName('top')}}{{ reviews.product.top }}</span>
              <span v-if="reviews.product.good">{{getTagName('good')}}{{ reviews.product.good }}</span>
              <span v-if="reviews.product.image">{{getTagName('image')}}{{ reviews.product.image }}</span>
              <span v-if="reviews.product.append">{{getTagName('append')}}{{ reviews.product.append }}</span>
              <!-- <span v-if="reviews.product.bad">{{getTagName('bad')}}{{ reviews.product.bad }}</span> -->
            </div>
            <div class="comment-main">
              <div class="title">
               <div>
                  <img :src="reviews.comment.face" alt="">
                  {{reviews.comment.user_name}}
               </div>
               <div>
                  {{reviews.comment.created.split(' ')[0]}}
               </div>
              </div>
              <div class="content">
                {{reviews.comment.content}}
              </div>
            </div>
          </div>
        </div>
        <div class="qa-kf" @click="onlineCounsel()">
          <img src="../../assets/imgs/product/icon_comment@2x.png" width="30">对行程有疑问？请<span>稀饭助手饭饭</span>为您解答
        </div>
        <!-- 行程概要 -->
        <div class="nav-title">
          <span>{{ $t("productDetailPage.travelProfile") }}</span>
          <div class="m-lst" @click="changeStatusPopup('itineraryShow')">{{ $t("seeAll") }}<van-icon name="arrow" /></div>
        </div>
        <div class="product-main-box">
          <van-row gutter="10">
            <template v-for="itinerary in itineraryList">
              <van-col span="12" :key="itinerary.icon" class="trip-box" v-if="itinerary.text != '暂无'">
                <div class="items">
                  <span>{{itinerary.type}}</span>{{itinerary.text}}
                </div>
              </van-col>
            </template>
          </van-row>
        </div>
        <!-- 稀饭推荐 -->
        <div class="nav-title">
          <div>{{ $t("tours.torusRecommend") }}</div>
        </div>
        <div class="product-main-box">
          <div class="recommend" v-html="product.small_description">
          </div>
        </div>
      </div>
      <div style="height:6px; background: #EBEBEB" ref="refDetailHeight"></div>
      <!-- 产品描述部分 -->
      <van-sticky :offset-top="44">
        <div class="product-tab">
          <van-row>
            <template v-for="(tab, index) in tabList">
              <van-col :key="'tabList' + index" :span="product.feature_images.length ? 6 : 8" v-if="tab.isShow" @click="changeProductTab(tab)">
                <span :class="{ active: activeTab === tab.id }">
                  {{tab.name}}
                </span>
              </van-col>
            </template>
          </van-row>
        </div>
      </van-sticky>
      <div class="collapse-d-ps">
        <div class="product-feature" v-if="product.feature_images.length" ref="refProductFeature">
          <h1 class="title">产品特色</h1>
          <div v-for="image in product.feature_images" :key="'feature_images' + image">
            <img v-lazy="image">
          </div>
        </div>
        <div ref="refProductTab"></div>
        <!-- 行程天数 -->
        <div class="product-info-xc" v-if="itinerary" ref="refProductInfo">
          <h1 class="title">{{itinerary.items.length}}天行程</h1>
          <div class="duration-box" :class="isShowProductDetail ? 'show' : ''" v-for="(items, index) in itinerary.items" :key="'itineraryitems' + index">
            <div class="days">
              Day{{index+1}}
            </div>
            <div class="detail">
              <h3 class="name">{{items.title}}</h3>
              <div class="tips" v-if="items.attractions">
                <span v-for="attraction in items.attractions" :key="'attraction' + attraction.tour_city_id">
                  {{attraction.name}} 
                </span>
              </div>
              <div class="meal">
                <span>{{items.meal | changMealText}}</span>
              </div>
              <template v-if="isShowProductDetail">
                <div class="product-main-box">
                  <h4 class="title">概述</h4>
                  <div class="content" v-html="items.content"></div>
                </div>
                <template v-if="items.attractions">
                  <div class="point-box" v-for="(points,index) in items.attractions" :key="'points' + index" @click="changePointShow(points)">
                    <div class="img-box" v-if="points.images && points.images.length">
                      <img v-lazy="points.images[0]" alt="">
                    </div>
                    <div class="rightb">
                      <h4 class="title">{{points.name}}</h4>
                      <div class="scort" v-if="points.score">
                        {{points.score}}
                      </div>
                      <div v-html="points.content" class="info-title van-multi-ellipsis--l2"></div>
                    </div>
                    <div class="note-b">
                      <img src="../../assets/imgs//product/icon_point_1.png" alt="">
                      景点
                    </div>
                  </div>
                </template>
                <div class="point-box" v-if="items.hotel">
                  <div class="rightb">
                    <h4 class="title">酒店</h4>
                    <div class="info-title-hotel" v-html="items.hotel">
                    </div>
                  </div>
                  <div class="note-b">
                    <img src="../../assets/imgs//product/icon_hotel_1.png" alt="">
                    酒店
                  </div>
                </div> 
                <div class="point-box" v-if="items.meal">
                  <div class="rightb">
                    <h4 class="title">餐饮</h4>
                    <div class="info-title">
                      {{items.meal | changMealText}}
                    </div>
                  </div>
                  <div class="note-b">
                    <img src="../../assets/imgs//product/icon_meal_1.png" alt="">
                    餐饮
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="qa-kf">
            对行程不满意？您还可以找<nuxt-link to="/custom">稀饭定制师</nuxt-link>
          </div>
        </div>
        <div class="price-inexclude" ref="refPriceExplain">
          <!-- 费用说明 -->
          <template v-if="expense.standard_price">
            <h1 class="title">费用说明</h1>
            <div class="newData" >
              <h3 class="title-s">
                {{$t('productDetailPage.groupCostDetail')}}
              </h3>
              <div class="price-sm">
                <template v-for="(standard, key) in expense.standard_price">
                  <div class="item" :key="key" v-if="standard">
                    <p>{{standard.toString().split('.')[0]}}/人</p>
                    <p class="tips">{{key | changeStandarPrice}}</p>
                  </div>
                </template>
              </div>
            </div>
          </template>
          <div class="price-tips-box">
            <h3 class="title-s">价格说明</h3>
            <div v-html="expense.price_notice" class="notice-p"></div>
          </div>
          <!-- 新数据（包含与不包含）表格显示 -->
          <div class="newData" v-if="expense.package_include_list.length>0 || expense.package_exclude_list.length>0">
            <h3 class="title-s" v-if="expense.package_include_list.length>0">
              {{$t('productDetailPage.feeIncludes')}}
            </h3>
            <ul class="price-newInclude">
              <li v-for="(item,index) in expense.package_include_list" :key="index">
                <span class="title">{{item.title}}</span>
                <span class="content">{{item.content}}</span>
              </li>
            </ul>
            <h3 class="title-s" v-if="expense.package_exclude_list.length>0">
              {{$t('productDetailPage.feeExcludes')}}
            </h3>
            <ul class="price-newExclude">
              <li v-for="(item,index) in expense.package_exclude_list" :key="index">
                <span class="title">{{item.title}}</span>
                <span class="content">{{item.content}}</span>
              </li>
            </ul>
          </div>
          <!-- 兼容旧数据（包含与不包含） -->
          <div class="newData" v-else>
            <div class="price-include">
              <h3 class="title-s">{{$t('productDetailPage.feeIncludes')}}</h3>
              <div class="text" v-html="expense.package_include"></div>
            </div>
            <van-collapse v-model="priceExclude" class="price-exclude">
              <van-collapse-item name="exclude">
                <span v-html="expense.package_exclude"></span>
                <template slot="title">
                  <strong>{{$t('productDetailPage.feeExcludes')}}</strong> <van-icon name="play" class="arrow" />
                </template>
                <div slot="right-icon"></div>
              </van-collapse-item>
            </van-collapse>
          </div>
          <div class="own_expense" v-if="expense.own_expense">
            <template v-if="expense.own_expense.list_data">
              <h3>自费项目</h3>
              <div class="expense">
                <table>
                  <tr>
                    <th>项目名称</th>
                    <th>成人 <span>({{expense.own_expense.adult_desc}})</span></th>
                    <th>儿童 <span>({{expense.own_expense.child_desc}})</span></th>
                    <th>老人 <span>({{expense.own_expense.old_desc}})</span></th>
                  </tr>
                  <template v-for="(item,index) in expense.own_expense.list_data">
                    <tr :key="index" v-if="isputAway || index < 7">
                      <td>{{item.project_name}}</td>
                      <td>{{item.adult_price}}</td>
                      <td>{{item.child_price}}</td>
                      <td>{{item.old_price}}</td>
                    </tr>
                  </template>
                </table>
                <template v-if="expense.own_expense.list_data && expense.own_expense.list_data.length > 7">
                  <div class="expense_opt">
                    <div @click="putAway">
                      <span>{{isputAway ? '收起' : '展开'}}</span>
                      <van-icon name="play" :class="isputAway ? 'rotate': ''" />
                    </div>
                  </div>
                </template>
              </div>
            </template>   
          </div>
        </div>
        <!-- 注意事项 -->
        <div class="notice mt-24" ref="refNotice">
          <h1 class="title">购买须知</h1>
          <van-collapse v-model="activeNames" accordion>
            <van-collapse-item :name="item.key" v-for="(item, index) in notice" :key="index">
              <div slot="title">{{item.title}} <van-icon name="play" /></div>
              <div slot="right-icon"></div>
              <div>
                <span v-html="item.content"></span>
              </div>
            </van-collapse-item>
          </van-collapse>
        </div>
        <!--引导二维码-->
        <div style="height:6px; background: #EBEBEB"></div>
        <div class="code-two">
          <div class="img-box">
            <img
              src="../../assets/imgs/product/img_qr_code@2x.png"
              alt=""
              class="code"
            />
            <div>
              {{ $t("productDetailPage.xifanlvxing") }}
            </div>
          </div>
          <div class="word-explain">
            <h2>{{ $t("productDetailPage.jiebanlvyou") }}</h2>
            <p>{{ $t("productDetailPage.pingtuan") }}</p>
            <p>{{ $t("productDetailPage.playTogether") }}</p>
            <p>{{ $t("productDetailPage.helpTogether") }}</p>
          </div>
          <div
            class="btn-box"
            v-clipboard:copy="'zmcslxs'"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >
            复制公众号
          </div>
        </div>
        <div style="height:6px; background: #EBEBEB"></div>
      </div>
      
    </div>
    <div class="product-bottom-oper">
      <div class="btn-operate" v-for="tabbar in operateTabbar" :key="tabbar.name" @click="onOperate(tabbar)" :class="product.is_favorite && tabbar.type === 'attention'?'active': ''">
        <van-icon :name="tabbar.icon" size="18" />
        <div>{{tabbar.name}}</div>
      </div>
      <div class="reserve">
        <van-button class="btn-reserve"
          size="large"
          @click="btnReserve">
          {{product.is_soldout? $t("productDetailPage.orderNotice"): $t("productDetailPage.orderNow")}}</van-button>
      </div> 
    </div>

    <!--视频弹出框-->
    <van-popup v-model="isVideoShow" class="video-box">
      <van-nav-bar title="视频播放" left-arrow @click-left="pausePlay" />
      <div class="video" v-if="product.videos && product.videos.length">
        <div class="video-main video-div">
          <video
            ref="productVideo"
            :src="product.videos[0].video"
            controls="auto"
            loop="true"
            playsinline="true"
            preload="auto"
          >
            暂时不支持播放该视频
          </video>
        </div>
      </div>
    </van-popup>
    <!-- 优惠券弹框 -->
    <van-action-sheet v-model="couponShow" :title="$t('coupons')" class="service-note" close-icon="cross">
      <div class="cup-item" v-for="(coupon, index) in couponDetailList" :key="'couponD' + coupon.id">
        <div class="main-box">
          <div class="cupleft">
            <div class="price">
              <span>{{coupon.minus_label.substring(0, 1)}}</span>{{coupon.minus_label.substring(1)}}
            </div>
            <p @click="changeCouponShow(coupon, index)">使用说明 <van-icon name="arrow-down" /></p>
          </div>
          <div class="cupcon">
            <div class="title">{{coupon.full_label}}</div>
            <p>{{coupon.period_label}}</p>
            <p>{{coupon.date_label}}</p>
          </div>
          <div class="cupright" @click="getcouponobj(coupon)" :class="coupon.is_received ? 'over' : ''">
            {{coupon.is_received ? '已领取': '领取'}}
          </div>
        </div>
        <div class="detail" v-if="coupon.select">
          <p v-for="(rules, index) in coupon.rules" :key="'rules' + rules">{{index+1}}.{{rules}}</p>
        </div>
      </div>
    </van-action-sheet>
    <!-- 活动 -->
    <van-action-sheet v-model="marketShow" title="活动说明" class="service-note" close-icon="cross">
      <div class="market-item" v-for="market in product.tags.tag_market" :key="'marketdetail' + market">
        <van-icon name="passed" size="20" color="#FB605D" /> {{market}}
      </div>
    </van-action-sheet>
    <!-- 服务 -->
    <van-action-sheet v-model="serviceShow" title="服务说明" class="service-note" close-icon="cross">
      <div class="market-item" v-for="service in product.tags.tag_service" :key="'servicedetail' + service">
        <van-icon name="passed" size="20" color="#FB605D" /> {{service}}
      </div>
    </van-action-sheet>
    <!-- 行程概要 -->
    <van-action-sheet v-model="itineraryShow" :title="$t('productDetailPage.travelProfile')" class="service-note" close-icon="cross">
      <div class="market-item itinerary-box">
        <template v-for="itinerary in itineraryList">
          <div class="items" :key=" 'detail'+itinerary.icon" v-if="itinerary.text != '暂无'">
            <div class="title">
              <img :src="require(`../../assets/imgs/product/${itinerary.icon}.png`)" alt="">
              {{itinerary.type}}
            </div>
            <div class="name">
              <template v-if="itinerary.allName">
                <span v-if="itinerary.allName">{{itinerary.allName}}</span>
              </template>
              <template v-else>
                {{itinerary.text}}
              </template>
            </div>
          </div>
        </template>
      </div>
    </van-action-sheet>
    <!-- 右上角更多操作 -->
    <transition name="fade">
      <div class="show-more" v-show="showMore" ref="refLayerHomeSearch">
        <div class="show-more-item" @click="onHomePage">
          <van-icon name="wap-home-o" size="16" />
          <span class="item-title">{{ $t("productDetailPage.homePage") }}</span>
        </div>
        <div class="show-more-item" @click="onDest">
          <van-icon name="location-o" size="16" />
          <span class="item-title">{{
            $t("productDetailPage.destination")
          }}</span>
        </div>
        <div class="show-more-item" @click="onPersonal">
          <van-icon name="manager-o" size="16" />
          <span class="item-title">{{ $t("productDetailPage.personal") }}</span>
        </div>
        <div class="show-more-item" @click="onFollow">
          <van-icon name="star-o" size="16" />
          <span class="item-title">{{ $t("productDetailPage.myFollow") }}</span>
        </div>
      </div>
    </transition>
    <!-- 恢复预定通知 -->
    <van-action-sheet v-model="showSoldOut" title="恢复预定通知" class="sold-out" close-icon="cross">
      <div class="sold-out-content">
        <h3 class="title">{{$t('productDetailPage.soldOutDesc')}}</h3>
        <p class="desc mt-30">{{$t('productDetailPage.emailOrPhone')}}</p>
        <div class="account-wrap mt-30">
          <van-cell-group class="account-input">
            <van-field class="tours-input"
              v-model="account"
              :placeholder="$t('plhdNameEmail')">
            </van-field>
          </van-cell-group>
          <van-button class="account-btn"
            slot="button"
            size="small"
            @click="btnOrder">{{$t('submit')}}</van-button>
        </div>
      </div>
    </van-action-sheet>
    <!-- 景点详情弹出层 -->
    <van-popup v-model="pointShow" class="point-wrapper" :lock-scroll="false">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="images in pointDetails.images" :key="'pointDetails'+images" class="item-box">
          <img v-lazy="images">
        </van-swipe-item>
      </van-swipe>
      <div class="content" v-html="pointDetails.content"></div>
    </van-popup>
    <drift-aside ref="driftAside"
      :showContactCall="false"
      @backTop="backTop"></drift-aside>

    <!-- 侧边栏 -->
    <div class="aside-box" v-if="showDetailProduct">
      <div class="detail-jt" :class="isShowProductDetail ? 'cul': ''" @click="changeDetailOrsmp">
        <span>{{isShowProductDetail? '详': '简'}}</span>/{{isShowProductDetail? '简': '详'}}
      </div>
    </div>
  </div>
</template>

<script>
import ProductDetailHeader from '@/components/header/productDetail'
import { couponDetail, getcouponobj, getProfile } from "@/api/profile"
import { mapMutations, mapState, mapGetters } from "vuex"
import { DLG_TYPE } from "@/assets/js/consts/dialog"
import DriftAside from '@/components/drift_aside'
import {
  getCookie,
  getCookieByKey,
  getLocalStore,
  setLocalStore,
  getSessionStore,
  setSessionStore,
  replaceServerUrl
} from '@/assets/js/utils'
import {
addOrDelFavorite,
schedule,
getisproduct
} from "@/api/products";
import {SESSIONSTORE, PLATFORM, CURRENCY} from '@/assets/js/config'
export default {
  layout: 'default',
  head() {
    return {
      title: `${this.product.name || '产品详情'}`,
      meta: [
        {
          name: 'description',
          content: this.product.name || '',
          hid: 'description',
        },
      ],
    }
  },
  components: {
    ProductDetailHeader, DriftAside
  },
  filters: {
    departureCity(value) {
      const _arr = value.split('/')
      return _arr.length > 1 ? `${_arr[0]}等${_arr.length}` : value
    },
    changMealText(value){
      const _obj = {
        breakfast: '早',
        lunch: '中',
        dinner: '晚'
      }
      let _arr = []
      for(let key in value) {
        if(value[key].contain_meal == 1) {
          _arr.push(_obj[key])
        }
      }
      return _arr.length ? _arr.length === 3 ? '包含三餐' : `含${_arr.join('/')}餐` : '三餐自理'
    },
    changeStandarPrice(key){
      const _obj = {
        price_single: '单人一间',
        price_single_pu: '单人标配',
        price_double: '双人一间',
        price_triple: '三人一间',
        price_quad: '四人一间',
        price_five: '五人一间',
        price_six: '六人一间',
        price_seven: '七人一间',
        price_eight: '八人一间',
        price_kids: '儿童价格',
        price_adult: '成人价格'
      }
      return _obj[key]
    }
  },
  async asyncData({$axios, query, store,req, redirect}) {
    let productId = '', attributes = [], attributes_override = {}, expense ={}, itinerary ={}, notice = [], product ={}, top_price = [], transfer = [], reviews= {}
    productId = Number(query.productId)
     try {
        let currency = getCookie(CURRENCY, req && req.headers && req.headers.cookie)
        let cookie = getCookie('token', req && req.headers && req.headers.cookie) || store.state.token
        // top=7是产品团期产品总共会传递过来的条数
        let {code, msg, data} = await $axios.$get(`/api/product/${productId}/newdetail?top=7`, 
          {
            headers: {
              Platform: store.state.platform,
              'Phone-Type': store.state.phoneType,
              'App-Version': store.state.phoneType,
              Language: store.getters.language,
              Currency: currency || store.state.currency,
              Authorization: cookie
            },
          })
        if (code === 0) {
          attributes = data.attributes // 增值服务
          attributes_override = data.attributes_override // 属性覆盖
          expense = data.expense // 费用说明对象
          itinerary = data.itinerary // 行程详情
          notice = data.notice // 注意事项
          product = data.product // 产品信息
          top_price = data.top_price[0] ? data.top_price : [] // 团期价格
          transfer = data.transfer
          reviews = data.reviews //评论版块
        } else {
          console.log('error:', msg)
        }
      } catch (error) {
        console.log('detail-error', error)
      }

      return {
        attributes,
        attributes_override,
        expense,
        itinerary,
        notice,
        product,
        top_price,
        transfer,
        reviews,
        productId
      }
  },
  data(){
    return {
      isTransparent: false, // 导航头是否透明
      isVideoShow: false, // 是否显示视频
      couponDetailList: [], //可用优惠卷列表-详情版
      couponShow: false, // 显示优惠券弹框
      marketShow: false, // 显示活动弹框
      serviceShow: false, // 显示活动弹框
      itineraryShow: false, // 行程概要弹框
      activeTab: 1, // 产品概述中选中的tab
      isShowProductDetail: false,
      priceExclude: [], // 不包含面板
      isputAway: false, //费用明细 自费项目 是否收起
      activeNames: '', // 购买须知
      showMore: false,// 右上角更多显示
      profileInfo: {},
      showDetailProduct: false, // 是否显示简和详
      showSoldOut: false,
      account: '', // 邮箱或手机号
      pointShow: false, // 显示景点详情
      pointDetails: {},
      areaNav: 'product',
      chnageTab: false // 是否切换到导航的最右边
    }
  },
  computed: {
    topPriceList() {
      let newData = []
      this.top_price.map(item => {
        if (item.days && item.days.length) {
          item.days.forEach(day => {
            newData.push({
              year: item.years,
              month: item.month,
              ...day
            })
          })
        }
      })
      return newData
    },
    // 行程概要数据整合 注意如果要增加数据一定概要记得配置icon
    itineraryList(){
      const _obj = {
        breakfast_meal: '早餐',
        lunch_meal: '午餐',
        dinner_meal: '晚餐'
      }, meal = {
        breakfast_meal: this.itinerary.itinerary_resume.breakfast_meal,
        lunch_meal: this.itinerary.itinerary_resume.lunch_meal,
        dinner_meal: this.itinerary.itinerary_resume.dinner_meal,
      }
      let _meal = []
      let num = 0
      for(let key in meal) {
        num += meal[key]
        if(meal[key]){
          _meal.push(`${meal[key]}次${_obj[key]}`)
        }
      }
      let mealAllName = num ? `${num}次包含：${_meal.join('，')}` : ''

      const _arr = [
        {
          type: '住宿',
          text: this.itinerary.itinerary_resume.hotel_resume,
          icon: 'icon_hotel'
        },
        {
          type: '景点',
          text: `共${this.itinerary.itinerary_resume.tour_city_list.length}个景点`,
          allName: this.itinerary.itinerary_resume.tour_city_list.join('，'),
          icon: 'icon_resume'
        },
        {
          type: '用餐',
          text: `${this.itinerary.itinerary_resume.breakfast_meal + this.itinerary.itinerary_resume.dinner_meal + this.itinerary.itinerary_resume.lunch_meal}次包含 ${this.itinerary.itinerary_resume.not_include_meal}次自理`,
          allName: mealAllName,
          icon: 'icon_meal'
        },
        {
          type: '车程',
          text: `${this.itinerary.itinerary_resume.driving_time_resume}`,
          icon: 'icon_car'
        },
        {
          type: '出发',
          text: `${this.product.departure_city_list.length > 1 ? this.product.departure_city_list[0] + '等多地出发' : this.product.departure_city_list + '出发'}`,
          allName: `${this.product.departure_city_list.length > 1 ? this.product.departure_city_list.join('，') : ''}`,
          icon: 'icon_start'
        },
        {
          type: '结束',
          text: `${this.product.end_city_list.length > 1 ? this.product.end_city_list[0] + '等多地结束' : this.product.end_city_list + '结束'}`,
          allName: `${this.product.end_city_list.join('，')}`,
          icon: 'icon_end'
        },
        {
          type: '天数',
          text: `${this.itinerary.duration}`,
          icon: 'day',
          icon: 'icon_day'
        },
        {
          type: '服务语言',
          text: `${this.itinerary.provider_language}`,
          icon: 'icon_language'
        }
      ]
      return _arr
    },
    hasFeature() {
      return (
        this.product &&
        this.product.feature_images &&
        this.product.feature_images.length
      );
    },
    // 产品部分导航
    tabList() {
      return [
        {
          id: 1,
          name: this.$t("productDetailPage.productFeature"),
          ref: "refFeatures",
          isShow: this.hasFeature
        },
        {
          id: 2,
          name: this.itinerary.items.length + '天行程',
          ref: "refDays",
          isShow: true
        },
        {
          id: 3,
          name: this.$t("costDetail"),
          ref: "refCost",
          isShow: true
        },
        {
          id: 4,
          name: this.$t("productDetailPage.notice"),
          ref: "refNotice",
          isShow: true
        }
      ];
    },
    operateTabbar(){
      return  [
        {
          type: 'attention',
          name: this.$t("productDetailPage.follow"),
          icon: this.product.is_favorite ? 'star': 'star-o'
        },
        {
          type:'tel',
          name: this.$t("phoneConsult"),
          icon: 'phone-o'
        },
        {
          type:'online',
          name: this.$t("onlineConsult"),
          icon: 'service-o'
        }
      ]
    } 
  },
  watch: {
    isVideoShow(newValue, oldValue) {
      if (newValue) {
        console.log("播放");
        this.$nextTick(() => {
          this.$refs.productVideo.play()
        }, 50);
      } else {
        console.log("暂停");
        this.$refs.productVideo.pause()
      }
    }
  },
  created(){
    this.isputAway = this.expense.own_expense && this.expense.own_expense.list_data && (this.expense.own_expense.list_data.length > 4 ? false: true)
  },
  async mounted(){
    await this.getcoupondetail()
    this.getUserInfo()
    document.addEventListener('scroll',(e) => {
      this.showMore = false
      const h2 = this.$refs.refBanner && this.$refs.refBanner.getBoundingClientRect().height || 0
      const h3 = this.$refs.refRivewTop && this.$refs.refRivewTop.getBoundingClientRect().height || 0
      const h4 = this.$refs.refProductd && this.$refs.refProductd.getBoundingClientRect().height || 0
      const h5 = this.$refs.refProductFeature && this.$refs.refProductFeature.getBoundingClientRect().height || 0
      const h6 = this.$refs.refProductInfo && this.$refs.refProductInfo.getBoundingClientRect().height || 0
      const h7 = this.$refs.refPriceExplain && this.$refs.refPriceExplain.getBoundingClientRect().height || 0
      const scrolltopTemp = document.documentElement.scrollTop || document.body.scrollTop
      const reviewBox = h2 + h3 -78
      const detailBox = h4 + h2 - 78
      const infoBox = h4 + h2 + h5 - 78
      const priceBox = infoBox + h6
      const explainBox = priceBox + h7      
      if( detailBox <= scrolltopTemp){
        this.showDetailProduct = true
      } else {
        this.showDetailProduct = false
      }
      if(scrolltopTemp > reviewBox) {
        this.areaNav ='review'
      } 
      if(scrolltopTemp > detailBox) {
        this.areaNav ='detail'
        this.activeTab = 1
      } 
      if(scrolltopTemp <= reviewBox) {
        this.areaNav ='product'
      }
      if(scrolltopTemp >= infoBox) {
        this.activeTab = 2
      }

      if(scrolltopTemp >= priceBox) {
        this.activeTab = 3
      }
      if(scrolltopTemp >= explainBox) {
        this.activeTab = 4
      }
      if(this.chnageTab){
        this.activeTab = 4
      }
    })
    document.addEventListener('click',(e) => {
      this.$nextTick(() => {
        if(this.$refs.refProductDetail){
          if(this.$refs.refProductDetail.contains(e.target)){
            this.showMore = false
          }
        }
      }, 50)
    })
  },
  methods: {
     ...mapMutations({
      vxSaveReservePro: "product/saveReservePro",
      vxToggleDialog: "toggleDialog", // 是否显示弹窗
      vxSetDlgType: "setDlgType", // 设置弹窗类型
      vxToggleLoginDlg: "login/toggleDialog"
    }),
    getUserInfo(){
      getProfile().then(res => {
        if(res.code === 0) {
          this.profileInfo = res.data
        }
      })
    },
    backTop() {
      let timer = setInterval(() => {
        let speed = Math.floor(-this.$refs.refProductDetailPage.scrollTop / 3)
        this.$refs.refProductDetailPage.scrollTop = this.$refs.refProductDetailPage.scrollTop + speed
        if (this.$refs.refProductDetailPage.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 17)
    },
    changePointShow(points){
      this.pointDetails= points
      this.pointShow = true
    },
    // 导航去不同的区域
    gotoRegion(type){
      let top = 0
      var L = document.documentElement.scrollTop||document.body.scrollTop
      let h = {
        top: 0,
        height: 0
      }
      if(type == 'review') {
        h = this.$refs.refComment && this.$refs.refComment.getBoundingClientRect()
      } else if (type == 'detail') {
        h = this.$refs.refDetailHeight && this.$refs.refDetailHeight.getBoundingClientRect()
      }
      this.areaNav = type
      top = h.top + L - h.height * 2
      if(type == 'product') {
        top = 0
      }
      window.scroll({
        top,
        behavior: 'smooth'
      })
    },
    // 预定
    async btnOrder() {
      const data = {
        productId: this.productId,
        account: this.account,
      }
      const {code, msg} = await schedule(data)
      if (code === 0) {
        this.showSoldOut = false
      }
      this.$toast(msg)
    },
    // 返回首页
    onHomePage() {
      this.jumpTo("/");
    },
    // 搜索页面
    onDest() {
      this.jumpTo("/search");
    },
    // 个人中心页面
    onPersonal() {
      this.jumpTo("/personal");
    },
    // 显示右上角更多操作
    onHeaderRight() {
      this.showMore = !this.showMore
    },
    // 收藏页面
    async onFollow() {
      if (!this.profileInfo.customer_id) {
        this.vxToggleLoginDlg(true)
      } else {
        this.$router.push('/personal/follow')
      }
    },
    onHeaderLeft() {
      if (this.$route.query.sem) {
        this.$router.push('/')
      } else {
        let href = window.location.href.slice(-1)
        if (href == '#') {
          this.$router.go(-2)
        } else {
          this.$router.go(-1)
        }
      }
    },
    onBannerChange(){},
    // 简详切换
    changeDetailOrsmp(){
      const h = this.$refs.refProductTab && this.$refs.refProductTab.getBoundingClientRect()
      const L = document.documentElement.scrollTop||document.body.scrollTop
      window.scroll({
        top: h.top + L - 80,
        behavior: 'smooth'
      })
      this.isShowProductDetail = !this.isShowProductDetail
    },
    onOperate(item) {
      if(item.type == 'attention') {
        this.attentionProduct();
      } else if(item.type == 'tel'){
        this.telCounsel()
      } else if(item.type == 'online') {
        this.onlineCounsel()
      }
    },
    gotoReview(){
      this.$router.push(`/comment/detail/${this.productId}`)
    },
    // 关注与取关
    async attentionProduct(){
      console.log(this.profileInfo);
      
      if (!this.profileInfo.customer_id) {
        this.vxToggleLoginDlg(true)
      } else {
        // console.log(this.product.is_favorite);
        let type = this.product.is_favorite
        let {code,data,msg} = await addOrDelFavorite({
          product_id: this.productId,
          favorite: type
        })
        if(code == 0) {
          this.product.is_favorite = !this.product.is_favorite
        }
        this.$toast(msg);
      }
    },
    // 领取某张优惠卷
    async getcouponobj(coupon) {
      if (!this.profileInfo.customer_id) {
        this.vxToggleLoginDlg(true)
      } else {
        if(!coupon.is_received){
          const { code, data, msg } = await getcouponobj({
            product_id: this.productId,
            id: coupon.id
          });
          if (code === 0) {
            this.$toast(this.$t("productDetailPage.getSuccess"));
            coupon.is_received = !coupon.is_received
          } else {
            this.$toast(msg);
          }
        }
      } 
    },
    // 点击导航
    changeProductTab(tab){
      this.chnageTab = false
      const h2 = this.$refs.refBanner && this.$refs.refBanner.getBoundingClientRect().height || 0
      const h3 = this.$refs.refRivewTop && this.$refs.refRivewTop.getBoundingClientRect().height || 0
      const h4 = this.$refs.refProductd && this.$refs.refProductd.getBoundingClientRect().height || 0
      const h5 = this.$refs.refProductFeature && this.$refs.refProductFeature.getBoundingClientRect().height || 0
      const h6 = this.$refs.refProductInfo && this.$refs.refProductInfo.getBoundingClientRect().height || 0
      const h7 = this.$refs.refPriceExplain && this.$refs.refPriceExplain.getBoundingClientRect().height || 0
  
      const scrolltopTemp = document.documentElement.scrollTop || document.body.scrollTop
      const detailBox = h4 + h2 - 78
      const infoBox = h4 + h2 + h5 - 78
      const priceBox = infoBox + h6
      const explainBox = priceBox + h7
      
      let top = 0
      // 1 产品特色 2 行程 3 费用明细 4 购买须知
      if(tab.id == 1) {
        top = detailBox
      } else if(tab.id == 2) {
        top = infoBox
      } else if(tab.id == 3) {
        top = priceBox
      } else if(tab.id == 4) {
        top = explainBox
        this.chnageTab = true
      }

      window.scroll({
        top,
        behavior: 'smooth'
      })
      this.activeTab = tab.id
    },
    // 电话咨询
    telCounsel() {
      this.vxToggleDialog(true);
      this.vxSetDlgType(DLG_TYPE.PHONE);
    },
    // 视频播放
    playVideo() {
      this.isVideoShow = true;
      this.$nextTick(() => {
        this.$refs.productVideo.play()
      }, 50);
    },
    // 暂停视频
    pausePlay() {
      this.$nextTick(() => {
        this.$refs.productVideo.pause()
      }, 50);
      this.isVideoShow = false
    },
    downloadApp() {
      try {
        _hmt.push(["_trackEvent", "download", "app", "from mobile"])
      } catch (error) {
        console.log(error);
      }
      window.open("https://api.tourscool.com/api/tour/v1/download", "_blank")
    },
    // 期团选中日期跳转
    async onGroupPriceDate(data) {
      if (this.product.is_soldout) {
        this.showSoldOut = true
        return;
      } else {
        // 暂存需要定制的商品信息
        await this.vxSaveReservePro({
          ...this.product
        });
        // 跳转至订单页面
        this.$router.push({
          path: "/date_trip",
          query: {
            year: data.year,
            month: data.month,
            day: data.day
          }
        });
      }
    },
    // 更多期团
    onGroupPriceMore() {
      this.btnReserve();
    },
    // 获取优惠卷列表展开
    async getcoupondetail() {
      const { code, data, msg } = await couponDetail({
        product_id: this.productId
      })
      if (code === 0) {
        this.couponDetailList = data || []
      }
    },
    changeStatusPopup(key){
      this[key] = true
    },
    // 在线咨询
    onlineCounsel() {
      let url = replaceServerUrl()
      window.open(url, "_self")
    },
    //点击收起
    putAway(){
      this.isputAway = !this.isputAway
    },
    // 年月日转周几
    getWeek(year, month, day) {
      let date = `${year}/${month}/${day}`;
      let week = new Date(date).getDay();
      switch (week) {
        case 0:
          return this.$t("weekend");
          break;
        case 1:
          return this.$t("monday");
          break;
        case 2:
          return this.$t("tuesday");
          break;
        case 3:
          return this.$t("wednesday");
          break;
        case 4:
          return this.$t("thursday");
          break;
        case 5:
          return this.$t("friday");
          break;
        case 6:
          return this.$t("saturday");
          break;
        default:
          break;
      }
    },
    // 优惠券详情展示
    changeCouponShow(coupon, index){
      this.$set(this.couponDetailList[index], 'select', !coupon.select)   
    },
    // 评论tag字段解析
    getTagName(value) {
      const obj= {
        top: '精华',
        good: '好评',
        bad: '差评',
        image: '有图',
        append: '追评'
      }
      return obj[value]
    },
    onCopy(e) {
      this.$toast(this.$t("shareComp.copySuccess"));
    },
    // 复制失败
    onError(e) {
      this.$toast(this.$t("shareComp.copyFail"));
    },
    // 立即定制
    async btnReserve() {
      // 已售罄
      if (this.product.is_soldout) {
        this.showSoldOut = true;
        return;
      }
      // 暂存需要定制的商品信息
      await this.vxSaveReservePro({
        ...this.product
      });
      // 跳转至订单页面
      this.jumpTo("/date_trip");
    },
    // 页面跳转
    jumpTo(path) {
      this.$router.push({
        path
      });
    },
  }
};
</script>

<style scoped lang="scss">
@import "~/assets/style/product/detail.scss";
.product-detail-page{
  position: relative;
  .video-box {
    width: 100vw;
    height: 100vh;
    font-size: 24px;
    margin-top: -2px;
  }
  .video {
    position: fixed;
    top: 88px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
  }
  .video-main {
    margin-top: 200px;
    font-size: 0;
    font-family: none;
    white-space: nowrap;
    overflow: hidden;
  }
  video {
    width: 100%;
    height: 100%;
  }
}
</style>
<style>
.notice .van-cell, .price-exclude .van-cell{
  padding:  20px 0;
}
.notice [class*=van-hairline]::after{
  opacity: 0;
}
.collapse-d-ps .van-collapse-item__content{
  padding: 20px 0;
  font-size: 24px;
  font-weight: normal !important;
}
</style>
