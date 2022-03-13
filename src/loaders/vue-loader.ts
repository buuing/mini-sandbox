// @ts-ignore
import { parseComponent } from 'vue-template-compiler/browser'
import { transform } from '@babel/standalone'

const SandboxVueLoader = (value: string) => {
  const { template, script, styles } = parseComponent(value)
  const templateStr = template ? JSON.stringify(template.content) : '""'
  const scriptStr = transform(script?.content || '', { presets: ['es2015'] }).code
  const styleStr = styles.map((item: any) => item.content).join('\n')
  return `
    <style>${styleStr}</style>
    <div id="app"></div>
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
}

export default SandboxVueLoader
