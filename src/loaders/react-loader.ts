import { LoaderFunctionType } from './../type'
import { transform } from '@babel/standalone'
import { ElementGenerator } from '../utils'
import BaseLoader from './base-loader'

const SandboxReactLoader: LoaderFunctionType = async function(value, config) {
  const { publicResources } = this
  const reg = /\:\/\/.*/
  const scriptForLibs = config.jsLibs?.filter(src => reg.test(src)) || []
  const script = transform(value, { presets: ['react'] }).code
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
  const content = `
    ${cssLibs.join('\n')}
    <div id="container"></div>
    ${jsLibs.join('\n')}
    <script>
      ${script}
    </script>
  `
  return await BaseLoader.call(this, content, config)
}

export default SandboxReactLoader
