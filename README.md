# gshop

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

/*
*学习笔记
*/

/*
*day01  2018.9.3
@autor:tianlang.zhou
*/
  任务：资源准备(iconfont)、项目搭建(基本目录、stylus的使用)、利用路由搭建基本导航界面
  一直被css困扰，很是苦恼
  
  
/*
*day01  2018.9.3
@autor:tianlang.zhou
*/
  页面排版格式不对——终于解决了！！
  原因：mixins.styl文件中的bottom-border-1px($color)缩进错误。
      导致带有此class的每个元素，在Y方向被压缩为原来的一半
  由于此问题，困扰了一下午+一上午，差点崩溃了。
