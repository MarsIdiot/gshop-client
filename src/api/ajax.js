/*..
ajax请求函数模块
返回值：promise对象——异步返回的数据：response.data

 */
import axios from 'axios'
export default  function ajax(url,data={},type='GET') {

    // 成功执行resove(),失败执行reject()
    return new Promise(function (resolve, reject) {

      let promise

      if (type === 'GET') {
        // 准备url query参数数据
        let dataStr = '' //数据拼接字符串
        Object.keys(data).forEach(key => {
          dataStr += key + '=' + data[key] + '&'
        })
        if (dataStr !== '') {
          dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
          url = url + '?' + dataStr
        }
        // 发送get请求
        promise = axios.get(url)
      } else {
        // 发送post请求
        promise = axios.post(url, data)
      }

      promise.then(response => {

        resolve(response.data)
      })
        .catch(error => {
          reject(error)
        })
    })
  }


