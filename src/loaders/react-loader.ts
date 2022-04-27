import { LoaderFunctionType } from './../type'
import { getCssLibs, getJsLibs } from './index'
import { transform } from '@babel/standalone'
import BaseLoader from './base-loader'

const SandboxReactLoader: LoaderFunctionType = async function(value, config) {
  const cssLibs = await getCssLibs.call(this, config)
  const jsLibs = await getJsLibs.call(this, config)
  const esModules = { '__APP__.jsx': transform(value, { presets: ['react'] }).code }
  const content = `
    ${cssLibs.join('\n')}
    <div id="root"></div>
    ${jsLibs.join('\n')}
    <script>
      const files = ${JSON.stringify(esModules)}
      window.esmsInitOptions = {
        shimMode: true,
        polyfillEnable: ['css-modules', 'json-modules'],
        fetch: async (url, options) => {
          for (const filename in files) {
            if (new RegExp(\`/\${filename}$\`).test(url)) {
              return new Response(new Blob([files[filename]], { type: 'application/javascript' }))
            }
          }
          return fetch(url, options)
        },
      }
    </script>
    ${await this.getResources('https://cdn.jsdelivr.net/npm/es-module-shims@1.5.4/dist/es-module-shims.min.js', 'script')}
    <script type="importmap-shim">${JSON.stringify(config['importMap'] || {})}</script>
    <script type="module-shim">
      import React from 'react'
      import ReactDOM from 'react-dom'
      import App from './__APP__.jsx'
      ReactDOM.render(/*#__PURE__*/React.createElement(App, null), document.getElementById("root"))
    </script>
  `
  return await BaseLoader.call(this, content, config)
}

export default SandboxReactLoader
