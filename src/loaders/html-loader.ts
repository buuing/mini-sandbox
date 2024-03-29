import { LoaderFunctionType } from '../type'
import BaseLoader from './base-loader'
import { getCssLibs, getJsLibs, getScriptForTab, getEsmsInitOptions, getImportMap } from './index'

const HTMLLoader: LoaderFunctionType = async function(content, config) {
  const cssLibs = await getCssLibs.call(this, config)
  const jsLibs = await getJsLibs.call(this, config)
  const scriptForTab = await getScriptForTab.call(this, config)
  // 获取本地 esm 模块
  const esModules = {}
  const esmFiles = this.fileList.filter(file => file.module === 'esm')
  esmFiles.forEach(file => {
    esModules[file.filename] = file.value
  })
  const importMap = getImportMap.call(this, config)
  // 重新设置模板
  content = content.replace(/<script.*(type\=["module"|'module']).*>/, (res) => {
    return res.replace(/type=["module"|'module']/, () => 'type="module-shim"')
  })
  content = `
    ${cssLibs.join('\n')}
    ${jsLibs.join('\n')}
    <script>${getEsmsInitOptions(esModules)}</script>
    <script async>${await this.getResource('https://unpkg.com/mini-sandbox@0.3.17/es-module-shims.js')}</script>
    ${config['importMap'] ? '<script type="importmap-shim">' + JSON.stringify(importMap) + '</script>' : ''}
    ${content}
    <script>
      !(function () { ${this.publicConfig.js} })();
      !(function () { ${config.js} })();
    </script>
    ${scriptForTab ? '<script type="module-shim">' + scriptForTab + '</script>' : ''}
  `
  return await BaseLoader.call(this, content, config)
}

export default HTMLLoader
