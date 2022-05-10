
# Vue Single File Component

<br />

### 【展示 Vue Template】

- **说明:**
  - 如果你想展示 Vue 组件你只需要做两步即可
    1. 引入 sandbox 的 vue-loader, 并在`loaders`中配置
    2. 在`jsLibs`中引入 vue.js, 这样设计是为了方便你选择合适的 CDN 链接

<div id="sandbox-demo7"></div>

<!-- 
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
 -->

<div id="sandbox-demo5"></div>

<br />

### 【拆分 Vue 模板】

- **说明:**
  - 如果你的 JS 逻辑非常多, 或者 CSS 样式特别长, 你可以把一个 Vue 的模板拆成两或三个标签页

<div id="sandbox-demo8"></div>

<!-- 
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
 -->

<br />

### 【展示 Vue 组件库 的代码】

- **说明:**
  - 这里以`element-ui`为例, 演示应该如何展示 vue 组件库的代码
  - 需要注意: `jsLibs`的引入顺序就是`<script>`加载的顺序, 所以 vue.js 要放在最前面

<div id="sandbox-demo9"></div>

<!-- 
```html
<div id="sandbox-demo9"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}"></script>
<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}/dist/vue-loader.js"></script>
<script type="text/javascript">
  new MiniSandbox({
    el: '#sandbox-demo9',
    files: {
        'App.vue': {
          defaultValue: `
<template>
  <div>
    <el-row>
      <el-button size="mini" type="primary">按钮一</el-button>
      <el-button size="mini" type="success">按钮二</el-button>
      <el-button size="mini" type="info">按钮三</el-button>
      <el-button size="mini" type="warning">按钮四</el-button>
      <el-button size="mini" type="danger">按钮五</el-button>
    </el-row>
    <el-row>
      <el-tag type="primary">标签一</el-tag>
      <el-tag type="success">标签二</el-tag>
      <el-tag type="info">标签三</el-tag>
      <el-tag type="warning">标签四</el-tag>
      <el-tag type="danger">标签五</el-tag>
    </el-row>
    <el-row>
      <el-alert title="成功提示的文案" type="success"></el-alert>
      <el-alert title="消息提示的文案" type="info"></el-alert>
      <el-alert title="警告提示的文案" type="warning"></el-alert>
      <el-alert title="错误提示的文案" type="error"></el-alert>
    </el-row>
    <el-row>
      <el-badge :value="12" class="item">
        <el-button size="small">评论</el-button>
      </el-badge>
      <el-badge :value="3" class="item">
        <el-button size="small">回复</el-button>
      </el-badge>
      <el-badge :value="1" class="item" type="primary">
        <el-button size="small">评论</el-button>
      </el-badge>
      <el-badge :value="2" class="item" type="warning">
        <el-button size="small">回复</el-button>
      </el-badge>
    </el-row>
  </div>
</template>

<script>
  export default {}
<\/script>

<style>
  .el-row { margin: 15px 10px; }
  .el-row>*:not(button) { margin-right: 15px; }
  .el-alert { margin: 10px 0; }
</style>`.trim(),
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
    },
    defaultConfig: {
      height: '500px'
    }
  })
</script>
```
 -->

<br />
