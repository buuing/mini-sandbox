
# Examples & 示例

### 1. 创建一个空的模板

- **说明:**
  - 空的模板一般没啥用途
  - 这个demo就是单纯的**展示一下最基础的数据结构**
  - 当然也可以用来测试`mini-sandbox`是否安装成功

<div id="sandbox-demo1"></div>

```html
<div id="sandbox-demo1"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}"></script>
<script>
  new MiniSandbox({
    el: '#sandbox-demo1',
    files: {
      'index.html': {}
    }
  })
</script>
```

<br /><br /><br />

### 2. 单标签页: html+css+js

- **说明:**
  - 如果你只想展示一个组件, 那单个标签页就能满足你的需求, 你可以在 html 里用
    - `<style>`标签控制 css 样式
    - `<script>`标签控制 js 脚本
  - 并且这样会更有利于用户去实时编辑, 来看到效果

<div id="sandbox-demo2"></div>

```html
<div id="sandbox-demo2"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}"></script>
<script>
  new MiniSandbox({
    el: '#sandbox-demo2',
    files: {
      'index.html': {
        defaultValue: `<style>
  button {
    color: red;
  }
</style>

<button>测试</button>

<script>
  const btn = document.querySelector('button')
  btn.addEventListener('click', () => {
    alert('click 事件')
  })
<\/script>`
      }
    },
    defaultConfig: {
      height: '350px',
    }
  })
</script>
```

<br /><br /><br />

### 3. 单标签页: 内置默认 css/js

- **说明:**
  - 当前模板的内置 css 和 js, 是不会在**代码层面**体现的, 所以用户也是无法修改
  - 如果是`多标签页模式`, 你也可以放在`publicResources`下, 这样所有标签页都能享受到

<div id="sandbox-demo3"></div>

```html
<div id="sandbox-demo3"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}"></script>
<script>
  new MiniSandbox({
    el: '#sandbox-demo3',
    files: {
      'index.html': {
        defaultValue: '<div class="box">这是一个盒子</div>',
        css: `
          .box {
            width: 100px;
            height: 100px;
            background: #ccc;
          }
        `,
        js: `
          const box = document.querySelector('.box')
          box.addEventListener('click', e => {
            console.log(e)
            alert('嘿嘿😋')
          })
        `
      }
    }
  })
</script>
```


<br /><br /><br />

### 4. 多标签页: 拆分 html/css/js

- **说明:**
  - 这里我使用`title`属性, 用来设置标签页的显示名称:
    - `index.html` => `HTML`
    - `index.css` => `CSS`
    - `index.js` => `JS`
  - 需要注意`index.css`和`index.js`两个文件不是模板, 无法单独渲染. 所以他们只能作为依赖, 在`index.html`中引入


<div id="sandbox-demo4"></div>

```html
<div id="sandbox-demo4"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}"></script>
<script>
  new MiniSandbox({
    el: '#sandbox-demo4',
    files: {
      'index.html': {
        title: 'HTML',
        defaultValue: `<button>点击</button>`,
        cssLibs: ['index.css'],
        jsLibs: ['index.js'],
      },
      'index.css': {
        title: 'CSS',
        defaultValue: "button {\n  width: 100%;\n}\n"
      },
      'index.js': {
        title: 'JS',
        defaultValue: "const btn = document.querySelector('button')\nbtn.addEventListener('click', () => {\n  alert('这是一个按钮')\n})\n"
      }
    }
  })
</script>
```

<br /><br /><br />

### 5. 多标签页: 渲染多个模板

- **说明:**
  - 如果你想展示多个组件的使用, 那你可以像下面这样做成多个标签页来分别渲染

<div id="sandbox-demo5"></div>

```html
<div id="sandbox-demo5"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}"></script>
<script>
  new MiniSandbox({
    el: '#sandbox-demo5',
    files: {
      'h1': {
        defaultValue: `<!-- 标题 -->
<h1>H1</h1>
<h2>H2</h2>
<h3>H3</h3>
<h4>H4</h4>
<h5>H5</h5>
<h6>H6</h6>`
      },
      'button': {
        defaultValue: `<!-- 按钮 -->
<button onclick="alert('你好')">鼠标单击</button>
<button ondblclick="alert('嗨!~')">鼠标双击</button>`
      }
    },
    defaultConfig: {
      height: '350px'
    }
  })
</script>
```

<br /><br /><br />


### 6. 展示 HTML 组件库 的代码

- **说明:**
  - 这里以`Bootstrap5`为例, 你可以放置你自己想展示的组件库的 CDN 链接
  - 由于这两个标签页都是展示同一个组件库的组件, 所以静态资源放在`publicResources`里

<div id="sandbox-demo6"></div>

```html
<div id="sandbox-demo6"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}"></script>
<script>
  new MiniSandbox({
    el: '#sandbox-demo6',
    files: {
      'Buttons': {
        defaultValue: `<!-- 按钮组件 -->
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>`,
      },
      'Alert': {
        defaultValue: `<!-- 警告框组件 -->
<div class="alert alert-primary" role="alert">
  消息
</div>
<div class="alert alert-success" role="alert">
  成功
</div>
<div class="alert alert-danger" role="alert">
  错误
</div>`
      }
    },
    publicResources: {
      css: 'body { margin: 10px }',
      cssLibs: ['https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'],
      jsLibs: ['https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'],
    }
  })
</script>
```

<br /><br /><br />

### 7. 单标签页: 展示 Vue 组件

- **说明:**
  - 如果你想展示 Vue 组件你只需要做两步即可
    1. 引入 sandbox 的 vue-loader, 并在`loaders`中配置
    2. 在`jsLibs`中引入 vue.js, 这样设计是为了方便你选择合适的 CDN 链接

<div id="sandbox-demo7"></div>

```html
<div id="sandbox-demo7"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}"></script>
<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}/dist/vue-loader.js"></script>
<script>
  new MiniSandbox({
    el: '#sandbox-demo7',
    files: {
      'Demo.vue': {
        defaultValue: "<template>\n  <button @click=\"num++\">count: {{num}}</button>\n</template>\n\n<script>\nexport default {\n  data () {\n    return {\n      num: 1\n    }\n  },\n}\n<\/script>\n\n<style>\n  button {\n    color: red;\n  }\n</style>\n",
      }
    },
    loaders: {
      '.vue': SandboxVueLoader
    },
    publicResources: {
      jsLibs: ['https://cdn.jsdelivr.net/npm/vue@2.6.14'], // vue的模板必须引入 vue.js
    }
  })
</script>
```

<div id="sandbox-demo5"></div>

<br /><br /><br />

### 8. 多标签页: 拆分 Vue 模板

- **说明:**
  - 如果你的 JS 逻辑非常多, 或者 CSS 样式特别长, 你可以把一个 Vue 的模板拆成两或三个标签页

<div id="sandbox-demo8"></div>

```html
<div id="sandbox-demo8"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}"></script>
<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}/vue-loader.js"></script>
<script>
  new MiniSandbox({
    el: '#sandbox-demo8',
    files: {
      'index.vue': {
        title: 'Template',
        defaultValue: "<template>\n  <button @click=\"num++\">count: {{num}}</button>\n</template>\n",
        cssLibs: ['index.css'],
        jsLibs: ['index.js'],
      },
      'index.js': {
        title: 'Script',
        defaultValue: `export default {
  data () {
    return {
      num: 1
    }
  },
}`
      },
      'index.css': {
        title: 'Style',
        defaultValue: `button { color: red; }`
      },
    },
    loaders: {
      '.vue': SandboxVueLoader
    },
    publicResources: {
      jsLibs: ['https://cdn.jsdelivr.net/npm/vue@2.6.14'], // vue的模板必须引入 vue.js
    }
  })
</script>
```

<br /><br /><br />

### 9. 展示 Vue 组件库 的代码

- **说明:**
  - 这里以`element-ui`为例, 演示应该如何展示 vue 组件的代码
  - 需要注意: `jsLibs`的引入顺序就是`<script>`加载的顺序, 所以 vue.js 要放在最前面

<div id="sandbox-demo9"></div>

```html
<div id="sandbox-demo9"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}"></script>
<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}/vue-loader.js"></script>
<script>
  new MiniSandbox({
    el: '#sandbox-demo9',
    files: {
      'Button.vue': {
        defaultValue: `<template>
  <el-row>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </el-row>
</template>`,
      }
    },
    loaders: {
      '.vue': SandboxVueLoader
    },
    publicResources: {
      cssLibs: [
        'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
      ],
      jsLibs: [
        'https://cdn.jsdelivr.net/npm/vue@2.6.14',
        'https://unpkg.com/element-ui/lib/index.js',
      ],
    }
  })
</script>
```

<br /><br /><br />


<!-- ======================================================================================================== -->
<!-- ======================================================================================================== -->
<!-- ======================================================================================================== -->
<!-- ======================================================================================================== -->
<!-- ======================================================================================================== -->
<!-- ======================================================================================================== -->
<!-- ======================================================================================================== -->
<!-- ======================================================================================================== -->
<!-- ======================================================================================================== -->
<!-- ======================================================================================================== -->
<!-- ======================================================================================================== -->

<script>

  // 1. 创建一个空的模板 |||||||||||||||||||||||||||||||||||||||
  new MiniSandbox({
    el: '#sandbox-demo1',
    files: {
      'index.html': {}
    }
  })

  // 2. 单标签页: html+css+js |||||||||||||||||||||||||||||||||||||||
  new MiniSandbox({
    el: '#sandbox-demo2',
    files: {
      'index.html': {
        defaultValue: `<style>
  button {
    color: red;
  }
</style>

<button>测试</button>

<script>
  const btn = document.querySelector('button')
  btn.addEventListener('click', () => {
    alert('click 事件')
  })
<\/script>`
      }
    },
    defaultConfig: {
      height: '350px',
    }
  })

  // 3. 单标签页: 内置默认 css/js |||||||||||||||||||||||||||||||||||||||
  new MiniSandbox({
    el: '#sandbox-demo3',
    files: {
      'index.html': {
        defaultValue: '<div class="box">这是一个盒子</div>',
        css: `
          .box {
            width: 100px;
            height: 100px;
            background: #ccc;
          }
        `,
        js: `
          const box = document.querySelector('.box')
          box.addEventListener('click', e => {
            console.log(e)
            alert('嘿嘿😋')
          })
        `
      }
    }
  })

  // 4. 多标签页: 拆分 html/css/js |||||||||||||||||||||||||||||||||||||||
  new MiniSandbox({
    el: '#sandbox-demo4',
    files: {
      'index.html': {
        title: 'HTML',
        defaultValue: `<button>点击</button>`,
        cssLibs: ['index.css'],
        jsLibs: ['index.js'],
      },
      'index.css': {
        title: 'CSS',
        defaultValue: "button {\n  width: 100%;\n}\n"
      },
      'index.js': {
        title: 'JS',
        defaultValue: "const btn = document.querySelector('button')\nbtn.addEventListener('click', () => {\n  alert('这是一个按钮')\n})\n"
      }
    }
  })

  // 5. 多标签页: 渲染多个模板 |||||||||||||||||||||||||||||||||||||||
  new MiniSandbox({
    el: '#sandbox-demo5',
    files: {
      'h1': {
        defaultValue: `<!-- 标题 -->
<h1>H1</h1>
<h2>H2</h2>
<h3>H3</h3>
<h4>H4</h4>
<h5>H5</h5>
<h6>H6</h6>`
      },
      'button': {
        defaultValue: `<!-- 按钮 -->
<button onclick="alert('你好')">鼠标单击</button>
<button ondblclick="alert('嗨!~')">鼠标双击</button>`
      }
    },
    defaultConfig: {
      height: '350px'
    }
  })

  // 6. 展示 HTML 组件库 的代码 |||||||||||||||||||||||||||||||||||||||
  new MiniSandbox({
    el: '#sandbox-demo6',
    files: {
      'Buttons': {
        defaultValue: `<!-- 按钮组件 -->
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>`,
      },
      'Alert': {
        defaultValue: `<!-- 警告框组件 -->
<div class="alert alert-primary" role="alert">
  消息
</div>
<div class="alert alert-success" role="alert">
  成功
</div>
<div class="alert alert-danger" role="alert">
  错误
</div>`
      }
    },
    publicResources: {
      css: 'body { margin: 10px }',
      cssLibs: ['https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'],
      jsLibs: ['https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'],
    }
  })

  // 7. 展示 Vue 模板组件 |||||||||||||||||||||||||||||||||||||||
  new MiniSandbox({
    el: '#sandbox-demo7',
    files: {
      'Demo.vue': {
        defaultValue: "<template>\n  <button @click=\"num++\">count: {{num}}</button>\n</template>\n\n<script>\nexport default {\n  data () {\n    return {\n      num: 1\n    }\n  },\n}\n<\/script>\n\n<style>\n  button {\n    color: red;\n  }\n</style>\n",
      }
    },
    loaders: {
      '.vue': SandboxVueLoader
    },
    publicResources: {
      jsLibs: ['https://cdn.jsdelivr.net/npm/vue@2.6.14'], // vue的模板必须引入 vue.js
    }
  })

  // 8. 多标签页: 拆分 Vue 模板 |||||||||||||||||||||||||||||||||||||||
  new MiniSandbox({
    el: '#sandbox-demo8',
    files: {
      'index.vue': {
        title: 'Template',
        defaultValue: "<template>\n  <button @click=\"num++\">count: {{num}}</button>\n</template>\n",
        cssLibs: ['index.css'],
        jsLibs: ['index.js'],
      },
      'index.js': {
        title: 'Script',
        defaultValue: `export default {
  data () {
    return {
      num: 1
    }
  },
}`
      },
      'index.css': {
        title: 'Style',
        defaultValue: `button {
  color: red;
}`
      },
    },
    loaders: {
      '.vue': SandboxVueLoader
    },
    publicResources: {
      jsLibs: ['https://cdn.jsdelivr.net/npm/vue@2.6.14'], // vue的模板必须引入 vue.js
    }
  })

  // 9. 展示 Vue 组件库 的代码 |||||||||||||||||||||||||||||||||||||||
  new MiniSandbox({
    el: '#sandbox-demo9',
    files: {
      'Button.vue': {
        defaultValue: `<template>
  <el-row>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </el-row>
</template>`,
      },
    },
    loaders: {
      '.vue': SandboxVueLoader
    },
    publicResources: {
      cssLibs: [
        'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
      ],
      jsLibs: [
        'https://cdn.jsdelivr.net/npm/vue@2.6.14',
        'https://unpkg.com/element-ui/lib/index.js',
      ],
    }
  })
</script>
