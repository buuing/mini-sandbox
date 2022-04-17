import { LoaderFunctionType } from '../type'
import BaseLoader from './base-loader'
import { getCssLibs, getJsLibs, getScriptForTab } from './index'

const HTMLLoader: LoaderFunctionType = async function(content, config) {
  const cssLibs = await getCssLibs.call(this, config)
  const jsLibs = await getJsLibs.call(this, config)
  const scriptForTab = await getScriptForTab.call(this, config)
  // 获取本地 esm 模块
  const esmFiles = this.fileList.filter(file => file.module === 'esm')
  const esModules = {}
  esmFiles.forEach(file => {
    esModules[file.filename] = file.value
  })
  // 重新设置模板
  content = content.replace(/<script.*(type\="module").*>/, (res) => {
    return res.replace(/type="module"/, () => 'type="module-shim"')
  })
  content = `
    ${cssLibs.join('\n')}
    ${jsLibs.join('\n')}
    <script>
      const files = ${JSON.stringify(esModules)}
      window.esmsInitOptions = {
        shimMode: true,
        polyfillEnable: ['css-modules', 'json-modules'],
        fetch: async (url, options) => {
          for (const filename in files) {
            if (new RegExp(\`/\${filename}$\`).test(url)) {
              return new Response(new Blob([files[filename]], { type: 'application/javascript' }))
            }
          }
          return fetch(url, options)
        },
      }
    </script>
    ${await this.getResources('https://cdn.jsdelivr.net/npm/es-module-shims@1.5.4/dist/es-module-shims.min.js', 'script')}
    <script type="importmap-shim">${JSON.stringify(config['importmap'] || {})}</script>
    ${content}
    <script>
      ${this.publicResources.js}
      ${config.js}
    </script>
    <script type="module-shim">
      ${scriptForTab}
    </script>
  `
  return await BaseLoader.call(this, content, config)
}

export default HTMLLoader
