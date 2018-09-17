/*
路由器对象模块
 */

import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

//引入路由组件
/*import MiSite from '../pages/MiSite/MiSite.vue'
import Search from '../pages/Search/Search.vue'
import  Order from  '../pages/Order/Order.vue'
import  Profile from  '../pages/Profile/Profile.vue'*/

const MiSite=()=>import('../pages/MiSite/MiSite.vue')
const Search=()=>import('../pages/Search/Search.vue')
const Order=()=>import('../pages/Order/Order.vue')
const Profile=()=>import('../pages/Profile/Profile.vue')


import Login from '../pages/Login/Login.vue'

// 商家页面路由组件
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRating from '../pages/Shop/ShopRating/ShopRating.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'

export default new VueRouter({
  routes:[
    {
      path:'/miSite',
      component:MiSite,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/search',
      component:Search,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/order',
      component:Order,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/profile',
      component:Profile,
      meta:{
        showFooter:true
      }
    },

    {
      path:'/login',
      component:Login
    },
    //配置商家主页路由
    {
      path:'/shop',
      component:Shop,
      children: [
        {
          path:'/shop/goods',
          component:ShopGoods
        },
        {
          path:'/shop/ratings',
          component:ShopRating
        },
        {
          path:'/shop/info',
          component:ShopInfo
        },
        //配置自动到goods
        {
          path:'',
          redirect:'/shop/goods',
        }

      ]
    },
    //配置自动定位首页
    {
      path:'/',
      redirect:'/miSite',
    }

  ]
})
