/*
包含n个接口请求函数的模块
函数返回值：promise对象
 */
import ajax from './ajax'
// const BASE_URL='http://localhost:4000'
const BASE_URL='/api'

// [1、根据经纬度获取位置详情]
export const reqAddress=(geohash)=>ajax(BASE_URL+'/position/'+geohash)
// [2、获取食品分类列表]
export const reqFoodCategorys=()=>ajax(BASE_URL+'/index_category')
// [3、根据经纬度获取商铺列表]
export const reqShops=(latitude,longitude)=>ajax(BASE_URL+'/shops',{latitude,longitude})
// [4、根据经纬度和关键字搜索商铺列表]
export const reqSearchShops=({geohash,keyword})=>ajax(BASE_URL+'/search_shops',{geohash,keyword})
// [5、获取一次性验证码]
//export const reqCaptcha=()=>ajax(BASE_URL+'/captcha')
// [6、用户名密码登陆]
export const reqPwdLogin=({name,pwd,captcha})=>ajax(BASE_URL+'/login_pwd',{name,pwd,captcha},'POST')
// [7、发送短信验证码]
export const reqSendcode=(phone)=>ajax(BASE_URL+'/sendcode',{phone})
// [8、手机号验证码登陆]
export const reqSmsLogin=({phone,code})=>ajax(BASE_URL+'/login_sms',{phone,code },'POST')
// [9、根据会话获取用户信息]
export const reqUserinfo=()=>ajax(BASE_URL+'/userinfo')
// [10、用户登出]
export const reqLogout=()=>ajax(BASE_URL+'/logout')
