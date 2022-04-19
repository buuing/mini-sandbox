

# React 模板

### 【展示 React 组件】

- **说明:**
  - 用来展示 React 组件

<div id="sandbox-demo10"></div>

```html
<div id="sandbox-demo10"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}"></script>
<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}/dist/react-loader.js"></script>
<script type="text/javascript">
  new MiniSandbox({
    el: '#sandbox-demo10',
    files: {
      'app.jsx': {
        defaultValue: `import React from 'react'
import ReactDOM from 'react-dom'

function App () {
  return <div> Hello world! </div>
}

ReactDOM.render(<App />, document.getElementById("root"))
`,
        importMap: {
          "imports": {
            "react": "https://ga.jspm.io/npm:react@17.0.2/index.js",
            "react-dom": "https://ga.jspm.io/npm:react-dom@17.0.2/index.js"
          },
          "scopes": {
            "https://ga.jspm.io/": {
              "object-assign": "https://ga.jspm.io/npm:object-assign@4.1.1/index.js",
              "scheduler": "https://ga.jspm.io/npm:scheduler@0.20.2/index.js",
              "scheduler/tracing": "https://ga.jspm.io/npm:scheduler@0.20.2/tracing.js"
            }
          }
        }
      },
    },
    loaders: {
      '.jsx': SandboxReactLoader
    },
  })
</script>
```
