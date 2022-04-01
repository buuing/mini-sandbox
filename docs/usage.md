
# 在 javascript 中使用

[filename](../demo.html ':include')

### 【通过 CDN 链接使用】

```html
<div id="my-sandbox"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}"></script>
<script>
  new MiniSandbox({
    el: '#my-sandbox',
    files: {
      'index.html': {
        defaultValue: `<button onclick="alert('Hello')">按钮</button>`,
      }
    },
  })
</script>
```

<br />

### 【通过 NPM 包下载】

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
  files: {
    'index.html': {
      defaultValue: `<button onclick="alert('Hello')">按钮</button>`,
    }
  }
})
```
