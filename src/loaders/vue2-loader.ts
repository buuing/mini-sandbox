// @ts-ignore
import { parseComponent } from 'vue-template-compiler/browser'
import { transform } from '@babel/standalone'
import { LoaderFunctionType } from '../type'
import { getCssLibs, getJsLibs, getScriptForTab, getEsmsInitOptions, getImportMap } from './index'
import BaseLoader from './base-loader'

const transformVue = (value: string) => transform(value, { presets: ['es2016'] }).code

const SandboxVueLoader: LoaderFunctionType = async function(value, config) {
  const cssLibs = await getCssLibs.call(this, config)
  const jsLibs = await getJsLibs.call(this, config)
  const scriptForTab = await getScriptForTab.call(this, config)
  // 解析 vue 模板
  const genVueTemplate = (value: string) => {
    const component = parseComponent(value)
    const { template, script, styles } = component
    const templateStr = template ? JSON.stringify(template.content) : '""'
    const scriptStr = transformVue(script?.content || scriptForTab || 'export default {}')
    const styleStr = styles.map((item: any) => item.content).join('\n')
    return {
      templateStr,
      scriptStr,
      styleStr,
    }
  }
  // 本地 esm 模块
  const { scriptStr, templateStr, styleStr } = genVueTemplate(value)
  const esModules = { '__APP__.vue': scriptStr }
  const esmFiles = this.fileList.filter(file => file.module === 'esm')
  esmFiles.forEach(file => {
    if (file.filename === config.filename) return
    esModules[file.filename] = genVueTemplate(file.value)
  })
  const importMap = getImportMap.call(this, config)
  // 渲染模板
  const content = `
    ${cssLibs.join('\n')}
    <style>${styleStr}</style>
    <div id="app"></div>
    ${jsLibs.join('\n')}
    <script>${getEsmsInitOptions(esModules)}</script>
    <script async>${await this.getResource('https://unpkg.com/mini-sandbox@0.3.17/es-module-shims.js')}</script>
    <script type="importmap-shim">${JSON.stringify(importMap)}</script>
    <script type="module-shim">
      import Vue from 'vue'
      import App from './__APP__.vue'
      App.template = App.template || ${templateStr}
      new Vue({
        el: '#app',
        components: { App },
        template: '<App />'
      })
    </script>
  `
  return await BaseLoader.call(this, content, config)
}

export default SandboxVueLoader
