// @ts-ignore
import { parseComponent } from 'vue-template-compiler/browser'
import { transform } from '@babel/standalone'
import { LoaderFunctionType } from '../type'
import { getCssLibs, getJsLibs, getScriptForTab } from './index'
import BaseLoader from './base-loader'

const SandboxVueLoader: LoaderFunctionType = async function(value, config) {
  const cssLibs = await getCssLibs.call(this, config)
  const jsLibs = await getJsLibs.call(this, config)
  const scriptForTab = await getScriptForTab.call(this, config)
  // 解析模板
  const { template, script, styles } = parseComponent(value)
  const templateStr = template ? JSON.stringify(template.content) : '""'
  const scriptStr = transform(script?.content || scriptForTab || 'export default {}', { presets: ['es2015'] }).code
  const styleStr = styles.map((item: any) => item.content).join('\n')
  // 渲染模板
  const content = `
    ${cssLibs.join('\n')}
    <style>${styleStr}</style>
    <div id="app"></div>
    ${jsLibs.join('\n')}
    <script>
      try {
        var exports = {};
        ${scriptStr}
        var component = exports.default;
        component.template = component.template || ${templateStr}
      } catch (err) {
        console.error(err)
      }
      new Vue(component).$mount('#app')
    </script>
  `
  return await BaseLoader.call(this, content, config)
}

export default SandboxVueLoader
