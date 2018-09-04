/*
路由器对象模块
 */

import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

//引入路由组件
import MiSite from '../pages/MiSite/MiSite.vue'
import Search from '../pages/Search/Search.vue'
import  Order from  '../pages/Order/Order.vue'
import  Profile from  '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'

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

    //配置自动定位首页
    {
      path:'/',
      redirect:'/miSite',
    }

  ]
})
