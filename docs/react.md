

# React Single File Component

- 因为 `React SFC` 里使用了 import, 所以你的代码必须遵守 ES Module 语法规范
- 这也意味着你引入的第三方包/插件, 也必须是 ES Module 模块
- 友情提示: `jsLibs` 引入的是 umd 模块, `importMap` 引入的是 esm 模块

<br />

### 【展示代码片段】

- **说明:**
  - 用来展示 React 代码片段

<div id="sandbox-demo10"></div>

```html
<div id="sandbox-demo10"></div>

<script src="https://unpkg.com/mini-sandbox@${version}"></script>
<script src="https://unpkg.com/mini-sandbox@${version}/dist/react-loader.js"></script>
<script type="text/javascript">
  new MiniSandbox({
    el: '#sandbox-demo10',
    files: {
      'App.jsx': {
        defaultValue: `
import React, { useState } from 'react'

function App() {
  const [num, setNum] = useState(0)
  const increase = () => setNum(num + 1)
  return <button onClick={increase}>
    点击 {num}
  </button>
}

export default App
        `.trim(),
      },
    },
    loaders: {
      '.jsx': SandboxReactLoader
    },
    publicConfig: {
      importMap: {
        "imports": {
          "react": "https://esm.sh/react@17.0.2/index.js",
          "react-dom": "https://esm.sh/react-dom@17.0.2/index.js"
        },
        "scopes": {
          "https://esm.sh/": {
            "object-assign": "https://esm.sh/object-assign@4.1.1/index.js",
            "scheduler": "https://esm.sh/scheduler@0.20.2/index.js",
            "scheduler/tracing": "https://esm.sh/scheduler@0.20.2/tracing.js"
          }
        }
      }
    }
  })
</script>
```

<br />


### 【引入本地组件】

- 说明
  - **子组件**被引入时, 需要设置两个属性 `module` 和 `template`
  - **子组件**的 `module` 属性需要设置为 `'esm'`, 让我知道他是一个 esm 模块
  - **子组件**的 `template` 属性需要设置为 `false`, 表示子组件不会单独渲染

<div id="sandbox-demo13"></div>

```html
<div id="sandbox-demo13"></div>

<script src="https://unpkg.com/mini-sandbox@${version}"></script>
<script src="https://unpkg.com/mini-sandbox@${version}/dist/react-loader.js"></script>
<script type="text/javascript">
  new MiniSandbox({
    el: '#sandbox-demo13',
    files: {
      'App.jsx': {
        defaultValue: `
import React from 'react'
import Child from './Child.jsx'

export default function App() {
  return <div>
    父组件
    <Child msg={666} />
  </div>
}
        `.trim(),
      },
      'Child.jsx': {
        module: 'esm',
        template: false,
        defaultValue: `
import React from 'react'

export default function Child(props) {
  return <h1>
    子组件, {props.msg}
  </h1>
}
        `.trim(),
      }
    },
    loaders: {
      '.jsx': SandboxReactLoader
    },
    publicConfig: {
      importMap: {
        "imports": {
          "react": "https://esm.sh/react@17.0.2/index.js",
          "react-dom": "https://esm.sh/react-dom@17.0.2/index.js",
        },
        "scopes": {
          "https://esm.sh/": {
            "object-assign": "https://esm.sh/object-assign@4.1.1/index.js",
            "scheduler": "https://esm.sh/scheduler@0.20.2/index.js",
            "scheduler/tracing": "https://esm.sh/scheduler@0.20.2/tracing.js"
          }
        }
      }
    },
  })
</script>
```


<br />

### 【引入第三方组件】

- 说明
  - 这里以 `lucky-canvas` 这个抽奖组件为例, 演示如何展示一个 npm 组件
  - 需要注意: `importMap` 中的配置, 必须是 ES Module 模块

<div id="sandbox-demo11"></div>

```html
<div id="sandbox-demo11"></div>

<script src="https://unpkg.com/mini-sandbox@${version}"></script>
<script src="https://unpkg.com/mini-sandbox@${version}/dist/react-loader.js"></script>
<script type="text/javascript">
  new MiniSandbox({
    el: '#sandbox-demo11',
    files: {
      'App.jsx': {
        defaultValue: `
import React, { useState, useRef } from 'react'
import { LuckyWheel } from '@lucky-canvas/react'

export default function App() {
  const [blocks] = useState([
    { padding: '10px', background: '#869cfa' }
  ])
  const [prizes] = useState([
    { background: '#e9e8fe', fonts: [{ text: '0' }] },
    { background: '#b8c5f2', fonts: [{ text: '1' }] },
    { background: '#e9e8fe', fonts: [{ text: '2' }] },
    { background: '#b8c5f2', fonts: [{ text: '3' }] },
    { background: '#e9e8fe', fonts: [{ text: '4' }] },
    { background: '#b8c5f2', fonts: [{ text: '5' }] },
  ])
  const [buttons] = useState([
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
        `.trim(),
      },
    },
    loaders: {
      '.jsx': SandboxReactLoader
    },
    publicConfig: {
      importMap: {
        "imports": {
          "react": "https://esm.sh/react@17.0.2/index.js",
          "react-dom": "https://esm.sh/react-dom@17.0.2/index.js",
          "@lucky-canvas/react": "https://unpkg.com/@lucky-canvas/react@0.1.13/dist/index.esm.js"
        },
        "scopes": {
          "https://esm.sh/": {
            "object-assign": "https://esm.sh/object-assign@4.1.1/index.js",
            "scheduler": "https://esm.sh/scheduler@0.20.2/index.js",
            "scheduler/tracing": "https://esm.sh/scheduler@0.20.2/tracing.js"
          }
        }
      }
    },
    defaultConfig: {
      height: '500px',
      editorRange: '60%'
    }
  })
</script>
```

<br />

### 【引入 Antd 组件库】

- **说明:**
  - 这里以 `ant design` 为例, 演示如何展示一个 react ui 组件库的代码
  - `dist/antd.js` 是一个 umd 模块, 这里我借助 `ga.jspm.io` 把他转成 esm 模块
  - 由于 `moment` 是 `antd` 的依赖项, 所以同样需要配置在 `importMap` 里面

<div id="sandbox-demo12"></div>

```html
<div id="sandbox-demo12"></div>

<script src="https://unpkg.com/mini-sandbox@${version}"></script>
<script src="https://unpkg.com/mini-sandbox@${version}/dist/react-loader.js"></script>
<script type="text/javascript">
    new MiniSandbox({
    el: '#sandbox-demo12',
    files: {
      'App.jsx': {
        defaultValue: `
import React, { useState } from 'react'
import antd from 'antd'
const { Button, Pagination, Badge, Space, Switch, Alert } = antd

export default function App() {
  const [show, setShow] = useState(true)
  return <>
    {/* 按钮组件 */}
    <Space>
      <Button type="primary">普通按钮</Button>
      <Button type="primary" loading>加载中</Button>
      <Button type="primary" danger>危险按钮</Button>
      <Button type="link">文字按钮</Button>
      <Button>默认按钮</Button>
    </Space>
    <Button type="primary" block>超长按钮</Button>
    {/* 徽章组件 */}
    <Space>
      <Switch checked={show} onChange={() => setShow(!show)} />
      <Badge count={show ? 25 : 0} />
      <Badge
        count={show ? 109 : 0}
        style={{ backgroundColor: '#52c41a' }}
      />
    </Space>
    {/* 分页组件 */}
    <div>
      <Pagination
        showSizeChanger
        defaultCurrent={3}
        total={500}
      />
    </div>
    {/* 警告提示 */}
    <Alert message="Success Tips" type="success" showIcon />
    <Alert message="Informational Notes" type="info" showIcon />
    <Alert message="Warning" type="warning" showIcon closable />
    <Alert message="Error" type="error" showIcon />
  </>
}
        `.trim(),
      },
    },
    loaders: {
      '.jsx': SandboxReactLoader
    },
    publicConfig: {
      importMap: {
        "imports": {
          "react": "https://esm.sh/react@17.0.2/index.js",
          "react-dom": "https://esm.sh/react-dom@17.0.2/index.js",
          "antd": "https://esm.sh/antd@4.20.1/dist/antd.js",
          "moment": "https://esm.sh/moment@2.29.3/moment.js",
        },
        "scopes": {
          "https://esm.sh/": {
            "object-assign": "https://esm.sh/object-assign@4.1.1/index.js",
            "scheduler": "https://esm.sh/scheduler@0.20.2/index.js",
            "scheduler/tracing": "https://esm.sh/scheduler@0.20.2/tracing.js",
          }
        }
      },
      cssLibs: ['https://unpkg.com/antd@4.20.1/dist/antd.min.css'],
      css: `body { padding: 10px; } #root>div { margin: 10px 0; }`
    },
    defaultConfig: {
      editorRange: '60%',
      height: '840px'
    }
  })
</script>
```

<br />
