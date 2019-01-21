import React, {Component} from 'react'
import {Icon, Button, Input, Form, Select, message} from 'antd'

import {reqCategorys, reqAddUpdateCategory} from '../../api'
import RichTextEditor from './rich-text-editor'
import PicturesWall from './pictures-wall'

/*
商品管理的添加和更新路由组件
 */
const Item = Form.Item
const Option = Select.Option

class ProductAddUpdate extends Component {

  state = {
    categorys: [], //一级分类列表
    subCategorys: [], //二级分类列表
  }

  //获取一级/二级分类列表
  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId)
    const categorys = result.data
    if (parentId==='0') {
      this.setState({
        categorys
      })
    } else {
      this.setState({
        subCategorys: categorys
      }, () => {
        if (categorys.length>0) {
          //利用form设置第二个框的value值
          this.props.form.setFieldsValue({
            category2: categorys[0]._id
          })
        }
      })
    }
  }

  //根据状态中的分类数组, 生成Option数组
  renderOptions = () => {
    const {categorys, subCategorys} = this.state
    const options = categorys.map(c => (
      <Option key={c._id} value={c._id}>{c.name}</Option>
    ))
    const subOptions = subCategorys.map(c => (
      <Option key={c._id} value={c._id}>{c.name}</Option>
    ))

    return {options, subOptions}
  }

  //显示二级分类列表
  showSubCategorys = (parentId) => {
    const product = this.props.location.state || {}
    product.categoryId = ''
    this.getCategorys(parentId)
  }

  //添加/更新商品
  submit = async () => {
    const {name, desc, price, category1, category2} = this.props.form.getFieldsValue()
    let pCategoryId, categoryId
    if (!category2 || category2==='未选择') { //当前添加的商品为一级分类下的商品
      pCategoryId = '0'
      categoryId = category1
    } else { //当前要添加的商品是二级分类下的商品
      pCategoryId = category1
      categoryId = category2
    }

    //得到富文本输入内容(标签对象就是组件对象)
    const detail = this.refs.editor.getContent()

    //得到所有上传图片的文件的数组
    const imgs = this.refs.imgs.getImgs()

    const product = {name, desc, price, pCategoryId, categoryId, detail, imgs}
    //如果是更新,指定_id属性
    const p = this.props.location.state
    if (p) { //有值说明是修改
      product._id = p._id
    }
    const result = await reqAddUpdateCategory(product)
    if (result.status===0) {
      message.success('保存商品成功')
      this.props.history.replace('/product/index')
    } else {
      message.error('保存商品失败, 请重新处理')
    }
  }

  componentDidMount () {
    this.getCategorys('0')

    //如果当前是更新, 商品的所属分类是二级(parentId!=='0'),就需要去获取二级分类列表
    const product = this.props.location.state
    if (product && product.pCategoryId!=='0') {
      this.getCategorys(product.pCategoryId)
    }
  }

  render() {

    const {options, subOptions} = this.renderOptions()

    const product = this.props.location.state || {}

    const {getFieldDecorator} = this.props.form

    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
    }

    let initValue1 = '未选择'
    let initValue2 = '未选择'
    if (product.pCategoryId==='0') {
      initValue1 = product.categoryId
    } else if (product.pCategoryId) {
      // console.log('product.categoryId', product.categoryId)
      initValue1 = product.pCategoryId
      initValue2 = product.categoryId || '未选择'
    }

    return (
      <div>
        <h2>
          <a href="javascript:" onClick={() => this.props.history.goBack()}><Icon type='arrow-left'/></a>
          &nbsp;&nbsp;
          {product._id ? '编辑商品' : '添加商品'}
        </h2>

        <Form>
          <Item {...formItemLayout} label="商品名称">
            {
              getFieldDecorator('name', {
                initialValue: product.name
              })(
                <Input placeholder="请输入商品名称"/>
              )
            }
          </Item>

          <Item {...formItemLayout} label="商品描述">
            {
              getFieldDecorator('desc', {
                initialValue: product.desc
              })(
                <Input placeholder="请输入商品描述"/>
              )
            }
          </Item>

          <Item {...formItemLayout} label="商品价格">
            {
              getFieldDecorator('price', {
                initialValue: product.price
              })(
                <Input placeholder="请输入商品价格" addonAfter='元'/>
              )
            }
          </Item>

          <Item {...formItemLayout} label="商品分类">
            {
              options.length>0 ?
              getFieldDecorator('category1', {
                initialValue: initValue1
              })(
                <Select style={{width: 200}} onChange={value => this.showSubCategorys(value)}>
                  {options}
                </Select>
              ) : null
            }
            &nbsp;&nbsp;
            {
              subOptions.length>0 ?
              getFieldDecorator('category2', {
                initialValue: initValue2
              })(
                <Select style={{width: 200}}>
                  {subOptions}
                </Select>
              ) : null
            }
          </Item>

          <Item {...formItemLayout} label="商品图片">
            <PicturesWall ref="imgs" imgs={product.imgs}/>
          </Item>

          <Item label="商品详情" labelCol={{span: 2}} wrapperCol={{span: 20}}>
            <RichTextEditor ref="editor" detail={product.detail}/>
          </Item>

          <Button type='primary' onClick={this.submit}>提交</Button>
        </Form>
      </div>
    )
  }
}

export default Form.create()(ProductAddUpdate)