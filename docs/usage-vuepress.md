
# 在 vuepress 中使用

以往大家在`markdown`里书写代码块的时候, 通常会使用下面这种方式

```html
^^^html
<div style="border: 1px solid red">这是一个盒子</div>
^^^
```

虽然这样可以清晰的展示代码结构, 却无法`动态渲染`效果和`调试代码`.

即便是有`codepen`这样的工具, 可以通过嵌入 iframe 来使用, 但国内访问网速慢是他最大的痛点

为了解决这个问题, 我在`vuepress`里集成了`Mini-Sandbox`, 引入插件即可实现代码的`在线编辑`和`实时渲染`

```html [index.html]
<style>
  h2 {
    color: red;
  }
</style>

<div>
  <h2>这是一个 Demo</h2>
  <button id="btn">点击 0</button>
</div>

<script>
  let num = 1
  const btn = document.querySelector('#btn')
  btn.addEventListener('click', e => {
    btn.innerHTML = '点击 ' + num++
  })
</script>
```

<br />

### 【安装 & 使用】

####  1. 使用 npm 安装

```shell
npm i vuepress-plugin-mini-sandbox@latest
```

#### 2. 找到 `.vuepress/config.js` 文件

```js
module.exports = {
  plugins: [
    'vuepress-plugin-mini-sandbox'
  ]
}
```

#### 3. 然后**重新启动 vuepress**

!> 因为你修改的是配置文件, `否则插件不会生效`

#### 4. 在页面中使用

```
^^^html [index.html]
<style>
  h2 {
    color: red;
  }
</style>

<div>
  <h2>这是一个 Demo</h2>
  <button id="btn">点击 0</button>
</div>

<script>
  let num = 1
  const btn = document.querySelector('#btn')
  btn.addEventListener('click', e => {
    btn.innerHTML = '点击 ' + num++
  })
</script>
^^^
```