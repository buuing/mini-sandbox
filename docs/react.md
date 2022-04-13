

# React 模板

### 【展示 React 组件】

- **说明:**
  - 用来展示 React 组件

<div id="sandbox-demo10"></div>

```html
<div id="sandbox-demo10"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}"></script>
<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}/react-loader.js"></script>
<script type="text/javascript">
  new MiniSandbox({
    el: '#sandbox-demo10',
    files: {
      'app.jsx': {
        defaultValue: `function App () {
  return <div> Hello world! </div>
}

ReactDOM.render(<App />, document.getElementById("root"))
`,
        jsLibs: [
          'https://unpkg.com/react@17/umd/react.production.min.js',
          'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js'
        ],
      },
    },
    loaders: {
      '.jsx': SandboxReactLoader
    },
  })
</script>
```
