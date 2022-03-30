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
    ElementGenerator(config.css, 'style'),
  ]
  const jsLibs = [
    ...await Promise.all(publicResources.jsLibs.map(src => this.getResources(src, 'script'))),
    ...await Promise.all(scriptForLibs.map(src => this.getResources(src, 'script'))),
  ]
  // 分离 js 标签页
  const scriptForTab = config.jsLibs?.find(src => !reg.test(src)) || ''
  const esModuleForTab = scriptForTab && await this.getResources(scriptForTab)
  // 重新设置模板
  content = `
    ${cssLibs.join('\n')}
    ${jsLibs.join('\n')}
    ${content}
    <script>
      ${publicResources.js}
      ${esModuleForTab}
      ${config.js}
    </script>
  `
  return await BaseLoader.call(this, content, config)
}

export default HTMLLoader
