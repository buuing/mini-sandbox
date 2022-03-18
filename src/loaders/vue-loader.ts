// @ts-ignore
import { parseComponent } from 'vue-template-compiler/browser'
import { transform } from '@babel/standalone'
import { LoaderFunctionType } from '../type'
import { ElementGenerator } from '../utils'
import BaseLoader from './base-loader'

const SandboxVueLoader: LoaderFunctionType = async function(value, config) {
  // css静态资源
  const cssLibs = await Promise.all((config.cssLibs || []).map(src => this.getResources(src, 'style')))
  cssLibs.push(ElementGenerator(config.css, 'style'))
  // js脚本
  const reg = /\:\/\/.*/
  const scriptForLibs = config.jsLibs?.filter(src => reg.test(src)) || []
  const jsLibs = await Promise.all(scriptForLibs.map(src => this.getResources(src, 'script')))
  const scriptForTab = config.jsLibs?.find(src => !reg.test(src)) || ''
  const esModuleForTab = scriptForTab && await this.getResources(scriptForTab)
  // 解析模板
  const { template, script, styles } = parseComponent(value)
  const templateStr = template ? JSON.stringify(template.content) : '""'
  const scriptStr = transform(script?.content || esModuleForTab || 'export default {}', { presets: ['es2015'] }).code
  const styleStr = styles.map((item: any) => item.content).join('\n')
  // 渲染模板
  const content = `
    ${cssLibs.join('\n')}
    <style>${styleStr}</style>
    <div id="app"></div>
    ${jsLibs.join('\n')}
    <script>
      setTimeout(() => {
        try {
          var exports = {};
          ${scriptStr}
          var component = exports.default;
          component.template = component.template || ${templateStr}
        } catch (err){
          console.error(err)
        }
        new Vue(component).$mount('#app')
      })
    </script>
  `
  return await BaseLoader.call(this, content, config)
}

export default SandboxVueLoader
