// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*
入口
 */
import Vue from 'vue'
import App from './App'

//引入路由  注册路由
import router from './router'

//引入vuex,注册store
import  store from './store'

//引入mint-ui的button组件
import {Button} from 'mint-ui'

//注册button组件
Vue.component(Button.name, Button)//mt-button

//加载mockServer即可
import './mock/mockServer.js'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  /*components: { App },
  template: '<App/>'*/
  render:h=>h(App),
  router ,//注册路由
  store
})
