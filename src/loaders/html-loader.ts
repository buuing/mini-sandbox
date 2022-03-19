
import { LoaderFunctionType } from '../type'
import { ElementGenerator } from '../utils'
import BaseLoader from './base-loader'

const HTMLLoader: LoaderFunctionType = async function(content, config) {
  const cssLibs = await Promise.all((config.cssLibs || []).map(src => this.getResources(src, 'style')))
  cssLibs.push(ElementGenerator(config.css, 'style'))
  // 分离 js库 / js标签页 / js字符串
  const reg = /\:\/\/.*/
  const scriptForLibs = config.jsLibs?.filter(src => reg.test(src)) || []
  const jsLibs = await Promise.all(scriptForLibs.map(src => this.getResources(src, 'script')))
  const scriptForTab = config.jsLibs?.find(src => !reg.test(src)) || ''
  const esModuleForTab = scriptForTab && await this.getResources(scriptForTab)
  const script = ElementGenerator(config.js, 'script')
  // 重新设置模板
  content = `
    ${cssLibs.join('\n')}
    ${jsLibs.join('\n')}
    ${content}
    ${esModuleForTab}
    ${script}
  `
  return await BaseLoader.call(this, content, config)
}

export default HTMLLoader
