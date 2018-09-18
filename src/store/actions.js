/**
 * 通过mutations间接更新数据状态
 */
import {
  RECEIVE_ADDRESS,
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

  CLEAR_CART,
} from './mutation-types'

//引入api
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserinfo,
  reqLogout,

  reqShopInfo,
  reqShopGoods,
  reqShopRatings,

  reqSearchShops,


} from '../api'
export default {

  //获取地址
  async getAddress({commit,state}){
    //发送异步请求
    const geohash=state.latitude+','+state.longitude
    const result= await reqAddress(geohash)
    //提交一个mutation
    if(result.code===0){
      const address=result.data
      commit(RECEIVE_ADDRESS,{address})
    }
  },

  //获取食品分类信息
  async getCategorys({commit}){
    //发送异步请求
    const result= await reqFoodCategorys()
    //提交一个mutation
    if(result.code===0){
      const categorys=result.data
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },

  //获取商家列表信息
  async getShops({commit,state}){
    //发送异步请求
    const latitude=state.latitude
    const longitude=state.longitude
    const result= await reqShops(latitude,longitude)
    //提交一个mutation
    if(result.code===0){
      const shops=result.data
      commit(RECEIVE_SHOPS,{shops})
    }
  },
  //同步保存用户信息
   saveUserInfo({commit},userInfo){
    //提交一个mutation
      commit(SAVE_USERINFO,{userInfo})
  },
  //自动的登陆
  async getUserInfoLogin({commit}){
    //发送异步请求
    const result= await reqUserinfo()
    //提交一个mutation
    if(result.code===0){
      const userInfo=result.data
      commit(RECEIVE_USERINFO,{userInfo})
    }
  },

  //登出
  async logout({commit}){
    //发送异步请求
    const result= await reqLogout()
    //提交一个mutation
    if(result.code===0){
      commit(LOGOUT)
    }
  },

  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if(result.code===0) {
      const info = result.data
      info.score = 7
      commit(RECEIVE_INFO, {info})
    }
  },
  // 异步获取商家评价列表
  async getShopRatings({commit}, callBack) {
    const result = await reqShopRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      callBack&&callBack()
    }
  },
  // 异步获取商家商品列表
  async getShopGoods({commit},callback) {
    const result = await reqShopGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      callback&&callback()
    }
  },

  //同步更新food
   updateCartcontrol({commit},{isAdd,food}) {
    //如果isAdd为true,则增加，否则减少
    if(isAdd){
      commit(INCREASE_FOODCOUNT, {food})
    }else {
      commit(DECREASE_FOODCOUNT, {food})
    }
  },



  //获取搜索商家列表信息
  async getSearchShops({commit,state},keyword){
    //发送异步请求
    const geohash=state.latitude+','+state.longitude
    const result= await reqSearchShops({geohash,keyword})
    //提交一个mutation
    if(result.code===0){
      const rearchShops=result.data
      commit(RECEIVE_SEARCHSHOPS,{rearchShops})
    }
  },

  //同步清空购物车
  clearCart({commit}){
    commit(CLEAR_CART)
  }

}
