

# React Single File Component

- 因为 `React SFC` 里使用了 import, 所以你的代码必须遵守 ES Module 语法规范
- 这也意味着你引入的第三方包/插件, 也必须是 ES Module 模块
- 友情提示: `jsLibs` 引入的是 umd 模块, `importMap` 引入的是 esm 模块

<br />

### 【展示 React 代码】

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
  return <div>Hello world!</div>
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

<br /><br /><br />

### 【展示 React 组件】

- 说明
  - 这里以 `lucky-canvas` 这个抽奖组件为例
  - 需要注意: `importMap` 中的配置, 必须是 ES Module 模块

<div id="sandbox-demo11"></div>

```html
<div id="sandbox-demo11"></div>

<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}"></script>
<script src="https://cdn.jsdelivr.net/npm/mini-sandbox@${version}/dist/react-loader.js"></script>
<script type="text/javascript">
  new MiniSandbox({
    el: '#sandbox-demo11',
    files: {
      'app.jsx': {
        defaultValue: `import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { LuckyWheel } from '@lucky-canvas/react'

function App () {
  const [blocks, setBlocks] = useState([
    { padding: '10px', background: '#869cfa' }
  ])
  const [prizes, setPrizes] = useState([
    { background: '#e9e8fe', fonts: [{ text: '0' }] },
    { background: '#b8c5f2', fonts: [{ text: '1' }] },
    { background: '#e9e8fe', fonts: [{ text: '2' }] },
    { background: '#b8c5f2', fonts: [{ text: '3' }] },
    { background: '#e9e8fe', fonts: [{ text: '4' }] },
    { background: '#b8c5f2', fonts: [{ text: '5' }] },
  ])
  const [buttons, setBottons] = useState([
    { radius: '40%', background: '#617df2' },
    { radius: '35%', background: '#afc8ff' },
    {
      radius: '30%', background: '#869cfa',
      pointer: true,
      fonts: [{ text: '开始', top: '-10px' }]
    }
  ])
  const myLucky = useRef()
  return <div>
    <LuckyWheel
      ref={myLucky}
      width={'200px'}
      height={'200px'}
      blocks={blocks}
      prizes={prizes}
      buttons={buttons}
      onStart={() => { // 点击抽奖按钮会触发star回调
        myLucky.current.play()
        setTimeout(() => {
          const index = Math.random() * 6 >> 0
          myLucky.current.stop(index)
        }, 2500)
      }}
      onEnd={prize => { // 抽奖结束会触发end回调
        alert('恭喜你抽到 ' + prize.fonts[0].text + ' 号奖品')
      }}
    />
  </div>
}

ReactDOM.render(<App />, document.getElementById("root"))
`,
        importMap: {
          "imports": {
            "react": "https://ga.jspm.io/npm:react@17.0.2/index.js",
            "react-dom": "https://ga.jspm.io/npm:react-dom@17.0.2/index.js",
            "@lucky-canvas/react": "https://cdn.jsdelivr.net/npm/@lucky-canvas/react@0.1.7/dist/index.esm.js"
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
    defaultConfig: {
      height: '500px',
      editorWidth: '60%'
    }
  })
</script>
```

<br /><br /><br />
