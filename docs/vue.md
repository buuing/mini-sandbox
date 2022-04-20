
# Vue Single File Component

### 【展示 Vue Template】

- **说明:**
  - 如果你想展示 Vue 组件你只需要做两步即可
    1. 引入 sandbox 的 vue-loader, 并在`loaders`中配置
    2. 在`jsLibs`中引入 vue.js, 这样设计是为了方便你选择合适的 CDN 链接

<div id="sandbox-demo7"></div>

```html
<div id="sandbox-demo7"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}"></script>
<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}/dist/vue-loader.js"></script>
<script type="text/javascript">
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
    },
    defaultConfig: {
      height: '450px'
    }
  })
</script>
```

<div id="sandbox-demo5"></div>

<br /><br /><br />

### 【拆分 Vue 模板】

- **说明:**
  - 如果你的 JS 逻辑非常多, 或者 CSS 样式特别长, 你可以把一个 Vue 的模板拆成两或三个标签页

<div id="sandbox-demo8"></div>

```html
<div id="sandbox-demo8"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}"></script>
<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}/dist/vue-loader.js"></script>
<script type="text/javascript">
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

### 【展示 Vue 组件库 的代码】

- **说明:**
  - 这里以`element-ui`为例, 演示应该如何展示 vue 组件库的代码
  - 需要注意: `jsLibs`的引入顺序就是`<script>`加载的顺序, 所以 vue.js 要放在最前面

<div id="sandbox-demo9"></div>

```html
<div id="sandbox-demo9"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}"></script>
<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}/dist/vue-loader.js"></script>
<script type="text/javascript">
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
```

<br /><br /><br />
