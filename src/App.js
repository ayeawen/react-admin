import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from  'react-router-dom'

import Admin from './pages/admin/admin'
import Login from './pages/login/login'

/*
 应用根组件

 请求路径与路由路径的匹配: 逐层匹配
 */
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}
