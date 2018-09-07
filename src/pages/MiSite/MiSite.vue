<template>

    <section class="msite">
      <!--首页头部-->
      <HeaderTop :title="address.name">
        <span class="header_search" slot="left">
          <i class="iconfont icon-sousuo"></i>
        </span>
        <span class="header_login"  slot="right">
          <router-link to="/login" class="header_login_text">{{phoneOrName||'登录|注册'}}</router-link>
        </span>
      </HeaderTop>
      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container" v-if="categorys.length">
          <div class="swiper-wrapper" >
            <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
                <div class="food_container">
                  <img :src="baseImageUrl+category.image_url">
                  <!--https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg-->
                </div>
                <span>{{category.title}}</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
        </div>
        <img src="./images/msite_back.svg" alt="back" v-else/>
      </nav>
      <!--首页附近商家-->
      <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-xuanxiang"></i>
          <span class="shop_header_title">附近商家</span>
        </div>
        <ShopList/>
      </div>
    </section>
</template>

<script>
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'

  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import ShopList from '../../components/ShopList/ShopList.vue'
  export default {
    name: "MiSite",
    data(){
      return{
        baseImageUrl:'https://fuss10.elemecdn.com'
      }
    },
    mounted() {
      this.$store.dispatch("getCategorys")
      this.$store.dispatch("getShops")

    },
    watch: {
      categorys(){
        this.$nextTick(()=>{//界面更新就立即调用
        //创建Swiper实例对象，来实现轮播
        new Swiper('.swiper-container', {
          //direction: 'vertical',
          loop: true,
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
        })
      })
      }
    },
    computed: {
      ...mapState(['address', 'categorys', 'shops', 'userInfo']),

      //食品分类信息——一维数组拆分为二维数组
      categorysArr() {
        //需要拆分的数组
        const {categorys} = this
        //创建大的数组，用于存下的数组[][]
        const arr = []
        //创建小的数组，用于存category的数组[]
        let minArr = [] //此处不能用const,需要创建新的
        categorys.forEach(c => {
          //判断小数组是否装满了n个，此处设置为8，满了之后创建新的小数组
          if (minArr.length === 8) {
            minArr = []
          }
          //判断是否为空，为空则装入大数组
          if (minArr.length === 0) {
            arr.push(minArr)
          }
          //将元素存入小数组
          minArr.push(c)
        })
        return arr
      },
      //判断登录的用户是手机号登录还是密码登录
      phoneOrName() {
        const {userInfo} = this
          if (userInfo.name) {//手机用户，用户名显示id
            return userInfo.name
          } else  {//密码登录，用户名显示name
            return userInfo.phone
          }
        }
    },
    components:{
      HeaderTop,
      ShopList
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
