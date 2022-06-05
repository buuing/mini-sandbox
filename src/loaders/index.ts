import MiniSandbox from '../index'
import { ElementGenerator } from '../utils'
import { FileType } from '../type'

const reg = /\:\/\/.*/

export async function getCssLibs(this: MiniSandbox, config: FileType): Promise<string[]> {
  const { publicResources } = this
  return [
    ...await Promise.all(publicResources.cssLibs.map(src => this.getResource(src))),
    ...await Promise.all((config.cssLibs || []).map(src => this.getResource(src))),
    publicResources.css,
    config.css || '',
  ].filter(text => !!text).map(text => ElementGenerator(text, 'style'))
}

export async function getJsLibs(this: MiniSandbox, config: FileType): Promise<string[]> {
  const { publicResources } = this
  const scriptForLibs = config.jsLibs?.filter(src => reg.test(src)) || []
  return [
    ...await Promise.all(publicResources.jsLibs.map(src => this.getResource(src))),
    ...await Promise.all(scriptForLibs.map(src => this.getResource(src))),
  ].filter(text => !!text).map(text => ElementGenerator(text, 'script'))
}

export async function getScriptForTab(this: MiniSandbox, config: FileType): Promise<string> {
  const scriptForTab = config.jsLibs?.find(src => !reg.test(src)) || ''
  return scriptForTab && await this.getResource(scriptForTab)
}

export const getEsmsInitOptions = (esModules = {}) => {
  return `
    var __originPath__ = window.location.origin + window.location.pathname
    var __publicPath__ = __originPath__.slice(0, __originPath__.lastIndexOf('/') + 1)
    var __esModules__ = ${JSON.stringify(esModules)}
    var __files__ = {}
    for (const name in __esModules__) {
      __files__[__publicPath__ + name] = __esModules__[name]
    }
    __esModules__ = null
    window.esmsInitOptions = {
      shimMode: true,
      // polyfillEnable: ['css-modules', 'json-modules'],
      fetch: async (url, options) => {
        const content = __files__[url]
        if (content) {
          return new Response(new Blob([content], { type: 'application/javascript' }))
        }
        if (!parent.ldqResources) parent.ldqResources = {}
        const ldqResources = parent.ldqResources
        let text
        if (ldqResources[url]) {
          text = await ldqResources[url]
        } else {
          let _r
          ldqResources[url] = new Promise(resolve => _r = resolve)
          const res = await fetch(url, options)
          text = await res.text()
          _r(text)
        }
        const response = new Response(new Blob([text], { url, type: 'application/javascript' }))
        return response
      },
      disableCache: (url, options, source) => {
        if (__files__[url]) return true
      }
    }
  `
}
