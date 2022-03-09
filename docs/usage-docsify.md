
# 在 docsify 中使用

以往大家在`markdown`里书写代码块的时候, 通常会使用下面这种方式

```html
^^^html
<div>这是一个盒子</div>
^^^
```

虽然这样可以清晰的展示代码结构, 却无法`动态渲染`效果和`调试代码`.

即便是有`codepen`这样的工具, 可以通过嵌入 iframe 来使用, 但国内访问网速慢是他最大的痛点

为了解决这个问题, 我在`docsify`里集成了`Mini-Sandbox`, 引入插件即可实现代码的`在线编辑`和`实时渲染`

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

### 在 index.html 中引入

> 待完善

<br />

### 使用简写方式

#### 示例1: 创建一个空的 sandbox

```
^^^html [demo1.html]

^^^
```

```html [demo1.html]

```

<br />

#### 示例2: 增加默认 css 样式

```html
^^^html [demo2.html] { css: 'div { border: 1px solid red; }' }
<div>这是一个盒子</div>
^^^
```

```html [demo2.html] { css: 'div { border: 1px solid red; }' }
<div>这是一个盒子</div>
```

<br />
<br />
<br />

### 使用完整方式

> 开发中...

<!-- ```sandbox.my-sandbox
<mini-sandbox>
  
</mini-sandbox>
``` -->