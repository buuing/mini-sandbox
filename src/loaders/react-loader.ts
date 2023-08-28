import { LoaderFunctionType } from './../type'
import { getCssLibs, getJsLibs, getEsmsInitOptions, getImportMap } from './index'
import { transform } from '@babel/standalone'
import BaseLoader from './base-loader'

const transformJSX = (value: string): string => transform(value, { presets: ['react'] }).code

const SandboxReactLoader: LoaderFunctionType = async function(value, config) {
  const cssLibs = await getCssLibs.call(this, config)
  const jsLibs = await getJsLibs.call(this, config)
  // 本地 esm 模块
  const esModules = { '__APP__.jsx': transformJSX(value) }
  const esmFiles = this.fileList.filter(file => file.module === 'esm')
  esmFiles.forEach(file => {
    if (file.filename === config.filename) return
    esModules[file.filename] = transformJSX(file.value)
  })
  const importMap = getImportMap.call(this, config)
  const content = `
    ${cssLibs.join('\n')}
    <div id="root"></div>
    ${jsLibs.join('\n')}
    <script>${getEsmsInitOptions(esModules)}</script>
    <script async>${await this.getResource('https://unpkg.com/mini-sandbox@0.3.17/es-module-shims.js')}</script>
    <script type="importmap-shim">${JSON.stringify(importMap)}</script>
    <script type="module-shim">
      import React from 'react'
      import ReactDOM from 'react-dom'
      import App from './__APP__.jsx'
      ReactDOM.render(/*#__PURE__*/React.createElement(App, null), document.getElementById("root"))
    </script>
  `
  return await BaseLoader.call(this, content, config)
}

export default SandboxReactLoader
