
<div align="center" style="display: flex; flex-direction: column; align-items: center;">
  <h1 style="margin: 10px 0 0">mini-playground</h1>
  <p>一个基于 CodeMirror 6 封装的 HTML 在线编辑插件</p>
  <p>
    <a href="https://github.com/buuing/mini-playground/stargazers" target="_black">
      <img src="https://img.shields.io/github/stars/buuing/mini-playground?color=%236a90e1&logo=github&style=flat-square" alt="stars" />
    </a>
    <a href="https://github.com/buuing" target="_black">
      <img src="https://img.shields.io/badge/Author-%20buuing%20-6a90e1.svg?&logo=github&style=flat-square" alt="author" />
    </a>
    <a href="https://github.com/buuing/mini-playground/blob/master/LICENSE" target="_black">
      <img src="https://img.shields.io/github/license/buuing/mini-playground?color=%236a90e1&logo=github&style=flat-square" alt="license" />
    </a>
    <a href="https://www.npmjs.com/package/mini-playground" target="_black">
      <img src="https://img.shields.io/npm/dm/mini-playground?color=%23ffba15&logo=npm&style=flat-square" alt="npm" />
    </a>
    <a href="https://www.jsdelivr.com/package/npm/mini-playground" target="_black">
      <img src="https://data.jsdelivr.com/v1/package/npm/mini-playground/badge" alt="jsdelivr" />
    </a>
  </p>
</div>

<br />

## Feature & 功能亮点

- 可以在线编辑 html | css | js 代码, 并实时预览代码效果
- 代码可以自动保存到页面的 URL 上, 分享网址即可分享代码

<br />

## Document & 官方文档

- 暂无

<br />

## Usage & 使用

### 通过 CDN 链接使用

```html
<div id="my-playground"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-playground@latest"></script>
<script>
  new MiniPlayground({
    el: '#my-playground'
  })
</script>
```

### 通过 npm 包下载使用

1. 安装

```shell
npm i mini-playground@latest
```

2. 使用

```html
<div id="my-playground"></div>
```

```js
import MiniPlayground from 'mini-playground'

new MiniPlayground({
  el: '#my-playground'
})
```


<br />

## Demo & 演示

- [演示链接]()

```html
<div id="my-playground"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-playground@latest"></script>
<script>
  new MiniPlayground({
    el: '#my-playground',
    defaultValue: `<style>
  h2 {
    color: red;
  }
<\/style>

<div>
  <h2>这是一个 Demo</h2>
  <button onclick="handleClick()">按钮</button>
</div>

<script>
  let num = 0
  function handleClick() {
    alert(num++)
  }
<\/script>`, // 编辑器的默认内容
    cssLibs: [], // css静态资源
    jsLibs: [], // js静态资源
    autoSave: true, // 是否自动保存
    autoSaveInterval: 250, // 自动保存的时间间隔
    codeOnUrl: true, // 代码是否保存到地址栏上
    editorWidth: '60%', // 编辑区域的默认宽度占比
  })
</script>
```

<br />

## 友情链接

- [🎁 lucky-canvas 一个跨平台、兼容多端的【大转盘 / 九宫格】抽奖插件](https://github.com/LuckDraw/lucky-canvas)

<br />

## 历史版本更新

- **`v0.1.1`**
  - [x] 增加 iframe 渲染时的 loading 动画
  - [x] 修复 jsLibs 返回了错误 Promise 的问题

- **`v0.1.0`**
  - [x] 完成 css / js 资源的全局缓存, 减少网络请求
  - [x] 增加配置项: 是否自动保存, 触发保存的时间间隔
  - [x] 增加配置项: 编辑区域的默认宽度占比
  - [x] 增加配置项: 代码是否保存到 url 地址栏中

- **`v0.0.3`**
  - [x] 增加配置项: cssLibs 和 jsLibs 静态资源的配置

<br />
