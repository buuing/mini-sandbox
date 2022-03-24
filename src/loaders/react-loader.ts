import { LoaderFunctionType } from './../type'
import { transform } from '@babel/standalone'
import BaseLoader from './base-loader'

const SandboxReactLoader: LoaderFunctionType = async function(value, config) {
  const script = transform(value, {
    presets: ['react'],
  }).code
  const reg = /\:\/\/.*/
  const scriptForLibs = config.jsLibs?.filter(src => reg.test(src)) || []
  const jsLibs = await Promise.all(scriptForLibs.map(src => this.getResources(src, 'script')))
  const content = `
    <div id="container"></div>
    ${jsLibs.join('\n')}
    <script>
      ${script}
    </script>
  `
  return await BaseLoader.call(this, content, config)
}

export default SandboxReactLoader
