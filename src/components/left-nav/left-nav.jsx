import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd'

import menuList from '../../config/menuConfig'
import './left-nav.less'
import logo from '../../assets/images/logo.png'

/*
 左侧导航组件
 */
const SubMenu = Menu.SubMenu
const Item = Menu.Item

class LeftNav extends Component {

  getNodes = (list) => {
    return list.reduce((pre, item) => {
      if (item.children) {
        const subMenu = (
          <SubMenu key={item.key} title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
            {this.getNodes(item.children)}
          </SubMenu>
        )
        pre.push(subMenu)

        //计算得到当前请求路径的父菜单的key
        const path = this.props.location.pathname
        const cItem = item.children.find((child => child.key===path))
        if (cItem) {
          this.openKey = item.key
        }
      } else {
        const menuItem = (
          <Item key={item.key}>
            <NavLink to={item.key}>
              <Icon type={item.icon}/>{item.title}
            </NavLink>
          </Item>
        )
        pre.push(menuItem)
      }
      return pre
    }, [])
  }

  /*
  直接拷贝的分析案例----并没有被调用
   得到当前用户需要显示的所有menu元素的列表
   使用递归调用
   */
  getMenuNodes = (menus) => {
    return menus.reduce((pre, item) => {
      if (item.children) {
        const subMenu = (
          <SubMenu key={item.key} title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
            {
              this.getMenuNodes(item.children)
            }
          </SubMenu>
        )
        pre.push(subMenu)
      } else {
        const menuItem = (
          <Item key={item.key}>
            <NavLink to={item.key}>
              <Icon type={item.icon}/>{item.title}
            </NavLink>
          </Item>
        )
        pre.push(menuItem)
      }
      return pre
    }, [])
  }

  //第一次render前,初始化数据,只调用一次
  componentWillMount() {
    this.menuNodes = this.getNodes(menuList)
  }

  render() {
    //当前请求的路径
    const path = this.props.location.pathname

    return (
      <div className='left-nav'>
        <NavLink to="/home">
          <div className="logo">
            <img src={logo} alt="logo"/>
            <h1>硅谷后台</h1>
          </div>
        </NavLink>

        <Menu mode="inline" theme="dark"
              defaultSelectedKeys={[path]}
              defaultOpenKeys={[this.openKey]}>
          {this.menuNodes}
        </Menu>
      </div>
    )
  }
}

//将一个非路由组件包装生成一个路由组件, 向非路由组件传递路由组件才有的3个属性: history/location/match
export default withRouter(LeftNav)