import { get } from '../utils'

export default function initMiniSandbox(hook: {
  beforeEach: (fn: (content: string) => string) => void
  doneEach: (fn: Function) => void
}) {
  const sandboxOptions = ((window as any).$docsify && (window as any).$docsify.sandboxOptions) || {}
  const options: Array<{
    [key: string]: {
      type: string,
      config: string,
      value: string
    }
  }> = []
  hook.beforeEach((content) => {
    let index = 0
    content += '\n'
    // 匹配混合代码块
    return content.replace(/```((?!```).+?(?!```)\n)```(?=\n(?!```))/gms, (res) => {
      const codeList = res.split(/```\n```/)
      const len = codeList.length
      const currOption = {}
      options[index] = currOption
      // 处理单一代码块
      codeList.forEach((code, i) => {
        if (i > 0) code = '```' + code
        if (i < len - 1) code += '```'
        const reg = /`{3}\s?([a-z]+)\s+\[([^\s]*)\]\s?(\$\{.*\}|\{.*\})?\n(.*?)`{3}/gms
        const [, type, filename, config, value] = (reg.exec(code) || []).map(_ => String(_))
        if (filename) {
          currOption[filename] = { type, config, value }
        }
      })
      if (!Object.keys(currOption).length) return res
      return `\n<div class="mini-sandbox-docsify" data-index="${index++}"></div>\n`
    })
  })
  hook.doneEach(function() {
    const arr = document.querySelectorAll('.mini-sandbox-docsify')
    for (const el of arr) {
      const currIndex = Number(el.getAttribute('data-index'))
      const currOption = options[currIndex]
      const files = {}
      // 处理 files 数据结构
      for (const filename in currOption) {
        const { type, config, value } = currOption[filename]
        const regConfig = /^\$\{(.*)\}$/.exec(config)
        let fileConfig
        try {
          if (regConfig) {
            let keyStr = regConfig[1]
            if (keyStr.indexOf('window.') === 0) keyStr = keyStr.slice(7)
            fileConfig = get(window, keyStr)
          } else if (typeof config === 'string' && config !== 'undefined') {
            fileConfig = window.eval(`(${config})`)
          }
        } catch (err) {
          console.error(config, err)
          fileConfig = {}
        }
        files[filename] = {
          type,
          ...fileConfig,
          defaultValue: value,
        }
      }
      // 渲染 mini-sandbox
      new (window as any).MiniSandbox({
        ...sandboxOptions,
        el,
        files,
      })
    }
  })
}

(window as any).$docsify.plugins = [].concat(
  (window as any).$docsify.plugins,
  initMiniSandbox as any,
)
