/*
用来发送ajax请求的函数模块
内部封装axios
函数的返回值为promise对象
目标:
  1. 请求错误统一处理
  2. 异步返回的是data,而不是response
解决:
  自定义promise对象
 */
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data={}, method='GET') {

  return new Promise((resolve, reject) => {
    let promise
    //使用axios执行异步请求
    if (method==='GET') {
      promise = axios.get(url, {params: data})
    } else {
      promise = axios.post(url, data)
    }

    promise.then(response => {
      //如果成功了,调用resolve()
      resolve(response.data) //异步得到的就是data数据了
    }).catch(error => {
      //如果请求失败,显示提示:请求出错
      message.error('请求出错了')
    })
  })
}