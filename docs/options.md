

# Options & 配置选项

> 介绍 MiniSandbox 所有的配置选项, 下面以【在 js 中使用】为例进行代码演示

<br />

### el: string | HTMLDivElement

?> **`必传项`** 因为 Sandbox 需要一个容器

```js
new MiniSandbox({
  // 可以是类名, 或者id
  el: '#my-sandbox',

  // 也可以是 dom 元素
  el: document.querySelector('#my-sandbox')
})
```

<br />

### files: object

?> **`必传项`** 因为至少得有一个 tab 标签页


- **属性:**
  - `defaultValue?: string` 编辑器的默认值
  - `cssLibs?: string[]` 默认引入的 css 库
  - `jsLibs?: string[]` 默认引入的 js 库
  - `css?: string` 默认加载的 css 样式, 引入顺序在 cssLibs 的后面
  - `js?: string` 默认加载的 js 代码, 引入顺序在 jsLibs 的后面
  - `importMap?: object` 默认定义的 esm 模块
  - `urlField?: string` 代码编译到 url 上所使用的字段, 默认为空

```js
new MiniSandbox({
  el: '#my-sandbox',
  files: {
    // 其中对象的键, 会被定义为 fileName, 也就是标签页的名字
    'index.html': {
      defaultValue: `<button onclick="alert('hello')">按钮</button>`
      css: `
        div {
          border: 1px solid red;
        }
      `,
      js: `
        window.onload = () => {
          console.log('你好鸭~')
        }
      `,
    }
  }
})
```

<br />

### publicConfig: object

?> **`可选项`** 作为当前 Sandbox 下的公共资源, 但是需要注意: 当前 Sandbox 下的所有 tab 标签页都会加载这些资源

- **属性:**
  - `cssLibs?: string[]` 默认引入的 css 库
  - `jsLibs?: string[]` 默认引入的 js 库
  - `css?: string` 默认加载的 css 样式, 引入顺序在 cssLibs 的后面
  - `js?: string` 默认加载的 js 代码, 引入顺序在 jsLibs 的后面
  - `importMap?: object` 默认定义的 esm 模块

```js
new MiniSandbox({
  el: '#my-sandbox',
  files: {
    'index.html': {}
  },
  publicConfig: {
    cssLibs: [],
    jsLibs: [],
    css: `
      div {
        border: 1px solid red;
      }
    `,
    js: `
      window.onload = () => {
        console.log('你好鸭~')
      }
    `,
  }
})
```


<br />

### defaultConfig: object

?> **`可选项`** 用来设置一些 Sandbox 的默认配置

- **属性:**

  - `height?: string` Sandbox 的高度, 默认为 '300px'
  - `autoRun?: boolean` 每次修改后是否自动运行, 默认等于 true
  - `autoRunInterval?: number` 每次自动运行的时间间隔, 单位为毫秒, 默认等于 300
  - ~~`editorWidth?: string` 编辑区域默认的宽度占比, 默认编辑区域宽 50%~~ &ensp;*(版本大于`v0.3.4`后改为`editorRange`)*
  - `editorRange?: string` 编辑区域默认占比, 默认情况下编辑区域占 50%
  - `draggable?: boolean` 是否可以左右拖动布局, 默认为 true
  - `direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'` 控制上下/左右布局, 默认为 'row'

```js
new MiniSandbox({
  el: '#my-sandbox',
  files: {
    'index.html': {}
  },
  defaultConfig: {
    height: '300px',
    autoRun: true,
    autoRunInterval: 300,
    editorRange: '55%',
    draggable: true,
    direction: 'row'
  }
})
```

<br />

### events: object

?> **`可选项`** Sandbox 事件的触发回调函数

- **属性:**

  - `onLoad?: () => void` 在线编辑器初始化完成后触发 (因为 css 库和 js 库的加载是异步的)
  - `onChange?: () => void` 编辑器的内容发生变化时触发

```js
new MiniSandbox({
  el: '#my-sandbox',
  files: {
    'index.html': {}
  },
  events: {
    onLoad: () => {},
    onChange: () => {},
  }
})
```