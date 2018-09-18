import Vue from 'vue'
//import moment from 'moment'
import format from 'date-fns/format'

Vue.filter('date-format',function (value,formatStr='YYYY-MM-DD HH:mm:ss') {
  //return moment(value).format(formatStr)//此处如果不传formatStr的值，则用默认的'YYYY-MM-DD HH:mm:ss'
  return format(value,formatStr)
})


