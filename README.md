# day01
## 1. 创建项目, 并运行
	create-react-app react-admin
	npm start

## 2. 对项目进行git版本控制
	创建本地仓库------git init 
	创建远程仓库------网页操作
	将本地仓库推送到远程------git remote origin 
	创建dev分支并推送到远程
	克隆远程分支, 并创建本地dev分支

## 3. 设计源码的基本目录, 实现App基本组件效果
	assets          放图片等资源
	api             
	components      
	pages           放各个组件
	App.js          应用根文件
	index.js        入口文件

## 4. 引入antd, 实现按需打包和自定义主题
	下载antd和相关的工具包
	配置1: config-overrides.js
	配置2: package.json

## 5. 引入react-router-dom, 实现基本的一级路由
	<BrowserRouter>/<HashRouter>
	<Switch>
	<Route>
	一级路由: login/admin

## 6. 登陆的基本静态界面
	<Form>
	<Form.Item>
	<Input>
	<Icon>
	<Button>

## 7. 登陆的表单验证和数据收集
	配置对象: 属性名是一些特定的名称的对象
	验证需求:
		用户名: 长度>=4的字符串
		密码: 长度在4-8位的字符串
	包装Form组件: Form.create()(LoginForm)
	    包装组件向被包装组件(自己定义的class:LoginForm)传递了一个属性: form
		操作表单项(Field)数据: 读取/设置/重置
		对表达项数据进行实时验证
	form对象:
		this.props.form: 得到form对象
		getFieldDecorator(fieldName, options)(<Input/>): 包装Input组件生成一个新的包装组件
		getFieldValue(fieldName): 得到某个Field中的Input的value
		resetFields(): 重置所有输入框
		validateFields((err, values) => {}): 对所有的表单项进行验证
	表单验证方式:
		纯声明式验证
		半编程式验证