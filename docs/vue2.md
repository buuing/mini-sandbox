
# Vue2 Single File Component

?> 该页面所展示的全部沙箱, 均是使用的 `vue2-loader`

> **`vue-loader` 与 `vue2-loader` 的区别**  

| 区别 | 在哪里配置 CDN 链接 | 支持的 CDN 格式 | 如何引入 |
| :-: |  :-: |  :-: | :-: |
| vue-loader | publicConfig > jsLibs | umd / iife | 内置 script 标签, 不能手动引入 |
| **vue2-loader** | **publicConfig > importMap** | **esm** | **选择性的通过 import 引入指定插件** |

<br />

### 【Vue 模板】

- **说明:**
  - 如果你想展示 Vue 组件你只需要做两步即可
    1. 引入 sandbox 的 vue2-loader, 并在`loaders`中配置
    2. 并在`publicConfig`中配置`importMap`

!> 需要注意: `importMap`里面只能配置esm模块, umd和cjs均不能被引用

<div id="sandbox-demo21"></div>

```html
<div id="sandbox-demo21"></div>

<script src="https://unpkg.com/mini-sandbox@${version}"></script>
<script src="https://unpkg.com/mini-sandbox@${version}/dist/vue2-loader.js"></script>
<script type="text/javascript">
  new MiniSandbox({
    el: '#sandbox-demo21',
    files: {
      'Demo.vue': {
        defaultValue: `
<template>
  <div>
    {{ time }}
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      time: moment().format('YYYY-MM-DD')
    }
  },
}
<\/script>

<style>
  * { color: red }
</style>
        `.trim(),
      }
    },
    loaders: {
      '.vue': SandboxVue2Loader
    },
    publicConfig: {
      importMap: {
        "imports": {
          "vue": "https://unpkg.com/vue@2.6.14/dist/vue.esm.browser.min.js",
          "moment": "https://ga.jspm.io/npm:moment@2.29.3/moment.js",
        },
      }
    },
    defaultConfig: {
      height: '460px'
    }
  })
</script>
```

<br />
