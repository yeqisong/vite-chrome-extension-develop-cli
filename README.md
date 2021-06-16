# vite-chrome-extension-develop-cli

Quickly build the basic project structure of chrome extension development.

本工具集成[vite-plugin-vue-crx3](https://github.com/yeqisong/vite-plugin-vue-crx3)插件，快速搭建基于 vite2+vue3 开发 chrome extension 的项目模板，安装相应的依赖，支持开发过程中热重载。

## 使用方式

### 安装本 cli

```bash
npm i -g vite-chrome-extension-develop-cli
```

### 使用 cli 快捷创建项目

```bash
crx init
```

crx 为 cli 命令，默认根据用户当前环境设置项目语言。可以使用-l 强制设置项目语言（目前支持 en、zh_CN 2 种语言）：

```bash
crx init -l en
```

创建项目时，如果当前命令目录为空，直接在当前目录创建项目；如果不为空，会新建一个项目目录来创建项目。

### 开始 chrome extension 开发

默认生产的项目目录结构如下：

```text
|-public // chrome 语言包放 public 里
|-src
|--|-manifest.json // 开发的入口文件，从中可解析真实的入口文件
|--|-assets
|--|-libs // Chrome 拓展相关的开发文件都放在一个文件夹下面
|--|--|-popup.html
|--|--|-newtab.html
|--|--|-newtab
|--|--|--|-main.js
|--|--|--|-App.vue
|--|-store // 把 store 拿出来，可以作为多页共享的数据
|--|-components // 一些常用的 vue 组件
|-vite.config.js
|-package.json
|-dist // 打包后的 Chrome 拓展源文件
```

可以根据自己习惯修改目录结构，Chrome extension 项目是一个多页面的 vue3 项目，修改目录结构后，在 src/manifest.json 中修改对应的源文件路径即可。

### 打包

在开发过程中，支持修改源文件后自动打包，并且 chrome 拓展和浏览器自动重载，使用：

```bash
npm run watch
```

开发完成后，要发布该拓展，使用：

```bash
npm run build
```
