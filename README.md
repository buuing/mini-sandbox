
<div align="center" style="display: flex; flex-direction: column; align-items: center;">
  <h1 style="margin: 10px 0 0">mini-sandbox</h1>
  <p>一个基于 CodeMirror 6 封装的 HTML 在线编辑插件</p>
  <p>
    <a href="https://github.com/buuing/mini-sandbox/stargazers" target="_black">
      <img src="https://img.shields.io/github/stars/buuing/mini-sandbox?color=%236a90e1&logo=github&style=flat-square" alt="stars" />
    </a>
    <a href="https://www.npmjs.com/package/mini-sandbox" target="_black">
      <img src="https://img.shields.io/npm/dm/mini-sandbox?color=%23ffba15&logo=npm&style=flat-square" alt="npm" />
    </a>
    <a href="https://www.jsdelivr.com/package/npm/mini-sandbox" target="_black">
      <img src="https://data.jsdelivr.com/v1/package/npm/mini-sandbox/badge" alt="jsdelivr" />
    </a>
    <a href="https://github.com/buuing" target="_black">
      <img src="https://img.shields.io/badge/Author-%20buuing%20-6a90e1.svg?&logo=github&style=flat-square" alt="author" />
    </a>
    <a href="https://github.com/buuing/mini-sandbox/blob/master/LICENSE" target="_black">
      <img src="https://img.shields.io/github/license/buuing/mini-sandbox?color=%236a90e1&logo=github&style=flat-square" alt="license" />
    </a>
  </p>
</div>

<br />

## Feature & 功能亮点

- 可以在线编辑 `html` | `css` | `js` 代码, 并实时预览代码效果
- 代码可以自动保存到页面的 URL 上, 分享网址即可分享代码

<br />

## Document & 官方文档

- [官方文档 & 演示地址](https://buuing.github.io/mini-sandbox)

<br />

## Usage & 使用

### 通过 CDN 链接使用

```html
<div id="my-sandbox"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@latest"></script>
<script>
  new MiniSandbox({
    el: '#my-sandbox',
    defaultValue: `<button onclick="alert('Hellow')">按钮</button>`,
  })
</script>
```

### 通过 npm 包下载使用

1. 安装

```shell
npm i mini-sandbox@latest
```

2. 使用

```html
<div id="my-sandbox"></div>
```

```js
import MiniSandbox from 'mini-sandbox'

new MiniSandbox({
  el: '#my-sandbox',
  defaultValue: `<button onclick="alert('Hellow')">按钮</button>`,
})
```

<br />

## Config & 配置项

| 参数 | 说明 |
| - | - |
| `el`: string \| HTMLDivElement | 必传项, 因为在线编辑器必须得有一个容器 |
| `defaultValue`?: string | 编辑器默认值, 只有在 codeOnUrl = false 或地址栏的 code 参数不存在时才生效 |
| `cssLibs`?: string[] | 默认引入的 css 库 |
| `jsLibs`?: string[] | 默认引入的 js 库 |
| `css`?: string | 默认加载的 css 样式, 引入顺序在 cssLibs 的后面 |
| `js`?: string | 默认加载的 js 代码, 引入顺序在 jsLibs 的后面 |
| `autoRun`?: boolean | 每次修改后是否自动运行, 默认等于 false |
| `autoRunInterval`?: number | 每次自动运行的时间间隔, 单位为毫秒, 默认等于 300 |
| `codeOnUrl`?: boolean | 是否将代码编译到地址栏中: www.abc.com?code=XXX, 默认为 false |
| `urlField`?: string | 代码编译到 url 上所使用的字段, 默认为 'code' |
| `defaultEditorWidth`?: string | 编辑器默认的宽度占比, 默认编辑器和渲染区域各占 50% |
| `height`?: string | 在线编辑器的高度, 默认为 auto |
| `draggable`?: boolean | 是否可以左右拖动布局, 默认为 true |
| `direction`?: 'row' \| 'row-reverse' | 编辑器和渲染区域的排列方向, 分别为: 从左向右 \| 从右向左, 默认为 'row' |
| `onChange`?: () => void | 编辑器的内容发生变化时触发 |
| `onLoad`?: () => void | 在线编辑器初始化完成后触发 (因为 css 库和 js 库的加载是异步的) |
<!-- | `theme`?: 'light' | 'dark' | 当前主题色, 默认等于 'light' | -->
<!-- | `onFocus`?: () => void | 编辑器获得焦点后触发 | -->

<br />

## 友情链接

- [🎁 lucky-canvas 一个跨平台、兼容多端的【大转盘 / 九宫格 / 老虎机】抽奖插件](https://github.com/LuckDraw/lucky-canvas)

<br />
