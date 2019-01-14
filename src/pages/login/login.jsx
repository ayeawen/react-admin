import React, {Component} from 'react'
import {Form, Input, Icon, Button} from 'antd'

import './index.less'
import logo from '../../assets/images/logo.png'

/*
 用户登陆的路由组件
 */
export default class Login extends Component {

  render () {
    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="硅谷后台管理系统"/>
          React项目: 后台管理系统
        </div>
        <div className="login-content">
          <div className="login-box">
            <div className="title">用户登录</div>
            <LoginForm/>
          </div>
        </div>
      </div>
    )
  }
}

/*
 包含<Form>被包装组件
 */
class LoginForm extends Component {

  loginSubmit = () => {
    //只有当验证没有错误时, 才输出输入的数据
    this.props.form.validateFields((error, values) => {
      if (!error) {
        console.log('收集表单数据', values)
      } else {
        this.props.form.resetFields() //重置所有输入框
      }
    })
  }

  checkPassword = (rule, value, callback) => {
    //如果不满足要求, 通过调用callback()来指定对应的message
    if (!value) {
      callback('请输入密码')
    } else if (value.length<4 || value.length>8) {
      callback('密码必须是4-8位')
    } else {
      callback() //如果不传参数代表成功
    }
  }

  render(){
    const {getFieldDecorator} = this.props.form

    return (
      <Form className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            initialValue: 'admin', // input的默认值
            rules: [{ //声明式验证配置
              type: 'string',
              required: true,
              message: '请输入用户名'
            },{
              min: 4,
              message: '用户名必须是大于等于4位'
            }]
          })(
            <Input placeholder="用户名" prefix={<Icon type="user"/>}/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{
              validator: this.checkPassword //(半)编程式验证
            }]
          })(
            <Input placeholder="请输入密码" type="password" prefix={<Icon type="safety"/>}/>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="login-form-button" onClick={this.loginSubmit}>登录</Button>
        </Form.Item>
      </Form>
    )
  }
}

//包装包含<Form>的组件, 生成一个新的组件
//包装组件会向被包装的组件传递一个属性form
LoginForm = Form.create()(LoginForm)