/**
 * 包含n个基于state的计算属性对象
 */

export default {
  totalPrice(state){
    return state.cartFoods.reduce((preTotal,food)=>preTotal+food.count*food.price,0)

  },
  totalCount(state){
    return state.cartFoods.reduce((preTotal,food)=>preTotal+food.count,0)
  }
}
