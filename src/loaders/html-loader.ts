
import { LoaderFunctionType } from '../type'
import { ElementGenerator } from '../utils'
import BaseLoader from './base-loader'

const HTMLLoader: LoaderFunctionType = async function(content, config) {
  const cssLibs = await Promise.all((config.cssLibs || []).map(src => this.getResources(src, 'style')))
  const jsLibs = await Promise.all((config.jsLibs || []).map(src => this.getResources(src, 'script')))
  cssLibs.push(ElementGenerator(config.css, 'style'))
  jsLibs.push(ElementGenerator(config.js, 'script'))
  content = await BaseLoader.call(this, content, config)
  return `
    ${cssLibs.join('\n')}
    ${content}
    ${jsLibs.join('\n')}
  `
}

export default HTMLLoader
