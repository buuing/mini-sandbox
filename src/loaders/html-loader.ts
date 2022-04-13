import { LoaderFunctionType } from '../type'
import { ElementGenerator } from '../utils'
import BaseLoader from './base-loader'

const HTMLLoader: LoaderFunctionType = async function(content, config) {
  const { publicResources } = this
  const reg = /\:\/\/.*/
  const scriptForLibs = config.jsLibs?.filter(src => reg.test(src)) || []
  const cssLibs = [
    ...await Promise.all(publicResources.cssLibs.map(src => this.getResources(src, 'style'))),
    ...await Promise.all((config.cssLibs || []).map(src => this.getResources(src, 'style'))),
    ElementGenerator(publicResources.css, 'style'),
    ElementGenerator(config.css || '', 'style'),
  ]
  const jsLibs = [
    ...await Promise.all(publicResources.jsLibs.map(src => this.getResources(src, 'script'))),
    ...await Promise.all(scriptForLibs.map(src => this.getResources(src, 'script'))),
  ]
  // 分离 js 标签页
  let scriptForTab = config.jsLibs?.find(src => !reg.test(src)) || ''
  scriptForTab = scriptForTab && await this.getResources(scriptForTab)
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
      ${publicResources.js}
      ${config.js}
    </script>
    <script type="module-shim">
      ${scriptForTab}
    </script>
  `
  return await BaseLoader.call(this, content, config)
}

export default HTMLLoader
