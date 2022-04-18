import { LoaderFunctionType } from './../type'
import { getCssLibs, getJsLibs } from './index'
import { transform } from '@babel/standalone'
import BaseLoader from './base-loader'

const SandboxReactLoader: LoaderFunctionType = async function(value, config) {
  const cssLibs = await getCssLibs.call(this, config)
  const jsLibs = await getJsLibs.call(this, config)
  const script = transform(value, { presets: ['react'] }).code
  const content = `
    ${cssLibs.join('\n')}
    <div id="root"></div>
    ${jsLibs.join('\n')}
    ${await this.getResources('https://cdn.jsdelivr.net/npm/es-module-shims@1.5.4/dist/es-module-shims.min.js', 'script')}
    <script type="importmap-shim">${JSON.stringify(config['importMap'] || {})}</script>
    <script type="module-shim">
      ${script}
    </script>
  `
  return await BaseLoader.call(this, content, config)
}

export default SandboxReactLoader
