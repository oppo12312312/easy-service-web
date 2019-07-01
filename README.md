<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-05-31 13:39:47
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-21 15:27:05
 -->

## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
npm run build

### Run your tests
npm run test

### Lints and fixes files
npm run lint

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 代码结构说明

## page页面
每一个page： 拥有自己的index.vue scss service
比如授权统计 statistical（此设计有个好处是一个名称，找到所有与之相关的代码）
### 页面首页
@/page/statistical/index.vue
### 页面样式
@/assets/page/statistical/index.scss
### 页面中的细分组件（如果存在）
@/page/statistical/consumption.vue
### 页面中的细分组件的样式（如果存在）
@/assets/page/statistical/consumption.scss
### 页面接口请求
@/service/statistical.js

### 以上模式不是适用于所有的情况，比如A、B页面均使用了某个组件
#### 这种组件会有两种情况，
#### 1、通用组件，与业务没什么关系，这样的组件放在@/components
#### 2、与业务关联组件，这种组件一定会表现出与A或则B业务其中一个更高的关联性，与谁高就放到谁里面

## 通用
### 通用组件，与业务无关联
@/components/
### 通用组件样式
@/assets/components/
### 通用样式
@/assets/base/
### 通用js
@/common
### 一切模式都是为了 低耦合、易维护、易扩展、用最少的代码以最优雅的方式做最多的事情，如果能做到更好，把以上的结构改了又何妨





