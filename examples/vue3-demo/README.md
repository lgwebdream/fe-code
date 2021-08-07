# vue-demo使用

## 演示项目

1. 在lib/vue项目中安装依赖

2. 在examples/vue-demo中安装依赖并启动

```BASH
yarn install
yarn serve
```

## 开发使用

1. 在lib/vue项目中安装依赖，并link

```BASH
yarn install
npm link
```

2. 在vue-demo项目中 安装依赖并link组件

```BASH
yarn install
yarn start # 自动关联lib/vue中的组件
```
