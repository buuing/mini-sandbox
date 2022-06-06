import MiniSandbox from '../index'
import { ElementGenerator } from '../utils'
import { FileType } from '../type'

const reg = /\:\/\/.*/

export async function getCssLibs(this: MiniSandbox, config: FileType): Promise<string[]> {
  const { resource } = this
  return [
    ...await Promise.all(resource.cssLibs.map(src => this.getResource(src))),
    ...await Promise.all((config.cssLibs || []).map(src => this.getResource(src))),
    resource.css,
    config.css || '',
  ].filter(text => !!text).map(text => ElementGenerator(text, 'style'))
}

export async function getJsLibs(this: MiniSandbox, config: FileType): Promise<string[]> {
  const { resource } = this
  const scriptForLibs = config.jsLibs?.filter(src => reg.test(src)) || []
  return [
    ...await Promise.all(resource.jsLibs.map(src => this.getResource(src))),
    ...await Promise.all(scriptForLibs.map(src => this.getResource(src))),
  ].filter(text => !!text).map(text => ElementGenerator(text, 'script'))
}

export async function getScriptForTab(this: MiniSandbox, config: FileType): Promise<string> {
  const scriptForTab = config.jsLibs?.find(src => !reg.test(src)) || ''
  return scriptForTab && await this.getResource(scriptForTab)
}
