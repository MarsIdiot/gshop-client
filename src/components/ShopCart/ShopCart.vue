<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="showToggle">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight:totalPrice}">
              <i class="iconfont icon-shopping_cart" :class="{highlight:totalPrice}"></i>
            </div>
            <div class="num" v-show="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalPrice}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}} 元</div>
        </div>
        <div class="content-right">
          <!--not-enough-->
          <div class="pay" :class="totalPrice>=info.minPrice ? 'enough' : 'not-enough'">
            {{payText}}
          </div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-show="totalCount&&isShowList">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click.prevent="clearCart">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(cartFood, index) in cartFoods" :key="index">
                <span class="name">{{cartFood.name}}</span>
                <div class="price"><span>￥{{cartFood.price*cartFood.count}}</span></div>
                <div class="cartcontrol-wrapper"><!--
                <div class="cartcontrol">
                  <div class="iconfont icon-remove_circle_outline"></div>
                  <div class="cart-count">{{cartFood.count}}</div>
                  <div class="iconfont icon-add_circle"></div>
                </div>-->
                  <CartControl :food="cartFood"/>

                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>

    </div>
    <div class="list-mask" v-show="totalCount&&isShowList" @click="showToggle"></div>
  </div>
</template>
<script>
  import {mapState,mapGetters} from 'vuex'
  import CartControl from '../../components/Cartcontrol/CartControl.vue'

  import BScroll from 'better-scroll'

  import { MessageBox } from 'mint-ui';
  export default {
    data(){
      return{
        isShowList:false,
      }
    },
    computed:{
      ...mapState(['cartFoods','info']),
      ...mapGetters(['totalPrice','totalCount']),

      //支付信息
      payText(){
        const {totalPrice,totalCount,info}=this
        if(totalCount===0){
          return '￥'+info.minPrice+'元起送'
        }else if(totalPrice<info.minPrice){
          const price=info.minPrice-totalPrice
          return '还差￥'+price+'元起送'
        }else {
          return '结算'
        }
      }
    },

    methods:{
      //清空购物车
      clearCart(){
        MessageBox.confirm('确定清空购物车吗?').then(action => {
          this.$store.dispatch('clearCart')
        },()=>{});
      },

      //列表显示/隐藏
      showToggle(){
        //当totalCount>0是才切换
        if(this.totalCount>0){
          this.isShowList=!this.isShowList
        }

        if(this.isShowList){

            this.$nextTick(()=>{
              //实现BScroll单例
              if(!this.scroll){
                this.scroll= new BScroll('.list-content',{
                  click:true
                })
              }else {
                this.scroll.refresh()//让滚动条刷新一下：重新统计列表内容
              }
          })

        }
      }
    },

    components:{
      CartControl
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highlight
              background $green
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #ffffff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 5px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          font-size 16px
          font-weight 700
          color #fff
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align bottom
          margin-bottom 15px
          margin-left -45px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          color #fff
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background $green
          transition all 0.4s linear
    .shopcart-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform translateY(-100%)
      &.move-enter-active, &.move-leave-active
        transition transform .3s
      &.move-enter, &.move-leave-to
        transform translateY(0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)

      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px

  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    backdrop-filter blur(10px)
    opacity 1
    background rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity 0
      background rgba(7, 17, 27, 0)
</style>
