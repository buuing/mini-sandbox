
# 在 docsify 中使用

以往大家在`markdown`里书写代码块的时候, 通常会使用下面这种方式

```html
^^^html
<div style="border: 1px solid red">这是一个盒子</div>
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

### 【引入CDN】

#### 在 `index.html` 中引入

```html
<script src="https://cdn.jsdelivr.net/combine/npm/mini-sandbox@${version},npm/mini-sandbox@${version}/dist/docsify-plugin.js"></script>
```

<br />

### 【简写用法】

#### 示例1: 创建一个空的 sandbox

`[demo1.html]` 这个中括号内的字符, 将会作为标签页的名称

```md
^^^html [demo1.html]

^^^
```

```html [demo1.html]

```

<br />

#### 示例2: 设置默认 css / js (只针对当前标签页生效)

在起始行写一个对象格式的数据 **`(不要换行)`**

```html
^^^html [demo2.html] { css: 'div { border: 1px solid red; }' }
<div>红盒子</div>
^^^
^^^html [demo3.html] { css: 'div { border: 1px solid blue; }', js: 'console.log("hello")' }
<div>蓝盒子</div>
^^^
```

```html [demo2.html] { css: 'div { border: 1px solid red; }' }
<div>红盒子</div>
```
```html [demo3.html] { css: 'div { border: 1px solid blue; }', js: 'console.log("hello")' }
<div>蓝盒子</div>
```

!> 但是需要注意: 标签名后面的对象数据 **不能换行!**

```js
// 错误示例
{ css: '.box { color: red text-align: center }' } // 错误, 注意css属性之间要加分号
{ css: 'span { color: red; }', css: 'a { color: blue; }' } // 错误, 对象不能拥有相同的key
{ js: 'console.log('hello')' } // 错误, 注意单双引号的嵌套
{ // 错误, 不能换行 (我知道这样写起来很爽, 但是我匹配不出来)
  css: `
    * {
      border: 1px solid red;
    }
  `,
  js: 'console.log("hello")'
}

-------------------------------------------------------------------------------------

// 以下为正确写法
{ css: '* { border: 1px solid red; }' }
{ css: 'div { border: 1px solid red; } .box { color: red; text-align: center; }' }
{ js: 'console.log("hello")' }
{ js: "console.log('hello')" }
{ js: 'console.log("hello")', css: '* { border: 1px solid red; }' }
```

<br />

#### 示例3: 使用全局变量代替行内对象

如果你觉得行内写一堆预置`css`或`js`太难受了, 可以像下面这样使用全局变量, 而且变量是可以复用的

##### 1. 首先你要去`index.html`里提前定义好变量名, 并挂载到`window`下面

```js
window.Demo1Config = {
  css: `
    .box {
      width: 100px;
      height: 100px;
      background: green;
      position: absolute;
    }
  `,
  js: `
    const box = document.querySelector('div')
    setInterval(() => {
      const left = Math.sin(Date.now() / 500) * 100 + 100
      box.style.left = left + 'px'
    }, 1000 / 60)
  `
}
```

##### 2. 然后使用该变量

变量可以写成`${window.Demo1Config}`, 也可以写成`${Demo1Config}`, 因为全局变量默认是从 window 下面寻找

```html
^^^html [demo4.html] ${window.Demo1Config}
<div class="box"></div>
^^^
```

```html [demo4.html] ${window.Demo1Config}
<div class="box"></div>
```

<br />
<br />
<br />

### 【完整用法】

#### 1. 找到 index.html

```js
window.$docsify = {
  ...
  executeScript: true, // 在 markdown 中使用 <script> 标签
  ...
}
```

#### 2. 把下面的代码放到 markdown 文档中

```md
<div id="my-sandbox"></div>

<script type="text/javascript">
new MiniSandbox({
  el: document.querySelector('#my-sandbox'),
  files: {
    'index.html': {
      defaultValue: "<style>\n  h2 {\n    color: red;\n  }\n</style>\n\n<div>\n  <h2>这是一个 Demo</h2>\n  <button id=\"btn\">点击 0</button>\n</div>\n\n<\script>\n  let num = 1\n  const btn = document.querySelector('#btn')\n  btn.addEventListener('click', e => {\n    btn.innerHTML = '点击 ' + num++\n  })\n<\/script>",
      css: '* { color: red }',
    },
    'test.html': {
      defaultValue: `<button onclick="alert('Hello')">按钮</button>`,
    }
  },
  publicResources: {
    css: '* { text-align: center }',
  },
  defaultConfig: {
    autoRun: true, // 是否自动保存
    editorRange: '55%', // 编辑区域的默认宽度占比
    height: '400px', // sandbox 高度
  },
})
</script>
```

#### 3. 然后你就能看到效果了

- 更多的使用示例, 请参考**【Demo & 演示】**页面
- 更详细的配置, 请参考**【Options & 配置选项】**页面

!> `提示`: 在 docsify 中, 同一个 md 页面下只有第一个`<script>`标签生效

<div id="my-sandbox"></div>
