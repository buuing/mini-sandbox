import MiniSandbox from '../index'
import { ElementGenerator } from '../utils'
import { FileType } from '../type'

const reg = /\:\/\/.*/

export async function getCssLibs(this: MiniSandbox, config: FileType): Promise<string[]> {
  const { publicResources } = this
  return [
    ...await Promise.all(publicResources.cssLibs.map(src => this.getResources(src, 'style'))),
    ...await Promise.all((config.cssLibs || []).map(src => this.getResources(src, 'style'))),
    ElementGenerator(publicResources.css, 'style'),
    ElementGenerator(config.css || '', 'style'),
  ]
}

export async function getJsLibs(this: MiniSandbox, config: FileType): Promise<string[]> {
  const { publicResources } = this
  const scriptForLibs = config.jsLibs?.filter(src => reg.test(src)) || []
  return [
    ...await Promise.all(publicResources.jsLibs.map(src => this.getResources(src, 'script'))),
    ...await Promise.all(scriptForLibs.map(src => this.getResources(src, 'script'))),
  ]
}

export async function getScriptForTab(this: MiniSandbox, config: FileType): Promise<string> {
  const scriptForTab = config.jsLibs?.find(src => !reg.test(src)) || ''
  return scriptForTab && await this.getResources(scriptForTab)
}
