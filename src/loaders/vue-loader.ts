// @ts-ignore
import { parseComponent } from 'vue-template-compiler/browser'
import { transform } from '@babel/standalone'

const SandboxVueLoader = (value: string) => {
  // styles
  const { template, script, styles } = parseComponent(value)
  console.log(value, { template, script, styles })
  const templateStr = template ? JSON.stringify(template.content) : '""'
  const scriptStr = transform(script?.content || '', { presets: ['es2015'] }).code
  const styleStr = styles.map((item: any) => item.content).join('\n')
  console.log(styleStr)
  return `
    <style>${styleStr}</style>
    <div id="app"></div>
    <script>
      window.addEventListener('load', () => {
        try {
          var exports = {};
          ${scriptStr}
          var component = exports.default;
          // 如果定义了 template函数, 则无需 template
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
