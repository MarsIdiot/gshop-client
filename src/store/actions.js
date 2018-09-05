/**
 * 通过mutations间接更新数据状态
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types'

//引入api
import {
  reqAddress,
  reqFoodCategorys,
  reqShops
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

}
