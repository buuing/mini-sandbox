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
    <script>
      ${script}
    </script>
  `
  return await BaseLoader.call(this, content, config)
}

export default SandboxReactLoader
