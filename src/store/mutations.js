/**
 * 直接更新数据状态的函数对象
 */

import  Vue from 'vue'
import {RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  SAVE_USERINFO,
  RECEIVE_USERINFO,
  LOGOUT,

  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,

  INCREASE_FOODCOUNT,
  DECREASE_FOODCOUNT,

  RECEIVE_SEARCHSHOPS,
} from './mutation-types'
export default {
  [RECEIVE_ADDRESS](state,{address}){
    state.address=address
  },
  [RECEIVE_CATEGORYS](state,{categorys}){
    state.categorys=categorys
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops=shops
  },
  [SAVE_USERINFO](state,{userInfo}){
    state.userInfo=userInfo
  },
  [RECEIVE_USERINFO](state,{userInfo}){
    state.userInfo=userInfo
  },
  [LOGOUT](state){
    state.userInfo={}
  },
  /*
  mockjs数据
   */
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },

  [INCREASE_FOODCOUNT](state,{food}) {
    if(!food.count){//第一次
      Vue.set(food,'count',1)
    }else {
      food.count++
    }
  },
  [DECREASE_FOODCOUNT](state, {food}) {
    if(food.count){//大于等于1才减
      food.count--
    }
  },


  [RECEIVE_SEARCHSHOPS](state, {rearchShops}) {
    state.rearchShops=rearchShops
  },

}
