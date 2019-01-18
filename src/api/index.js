/*
包含n个接口请求函数的模块
对ajax模块进一步的封装, 让发请求的调用代码更简洁
函数返回的依然是promise对象

//根据接口文档定义定义接口请求函数!!!!!!!!!!!!!!!!!!
 */

import ajax from './ajax'
import jsonp from 'jsonp'

//登录
export const reqLogin = (username, password) => ajax('./login', {username, password}, "POST")

//添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

//获取一级/二级分类列表
export const reqCategorys = (parentId) => ajax('/manage/category/list', {parentId})
//添加分类
export const reqAddCategory = (parentId, categoryName) => ajax('/manage/category/add', {parentId, categoryName}, 'POST')
//更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax('/manage/category/update', {categoryId, categoryName}, 'POST')

//请求获取天气信息
export function reqWeather (city) {
  return new Promise(function (resolve, reject) {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    //发异步http请求, 一般的get请求
    jsonp(url, {param: 'callback'}, (error, data) => {
      console.log(error, data)
      if (!error) { //如果成功了,调用resolve传递数据
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else { //如果失败了,显示提示
        alert('请求天气接口出错了!!!')
      }
    })
  })
}

