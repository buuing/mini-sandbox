import { get } from '../utils'

export default function initMiniSandbox(hook: {
  beforeEach: (fn: (content: string) => string) => void
  doneEach: (fn: Function) => void
}) {
  const options: Array<string[]> = []; let index = 0
  const sandboxOptions = (window as any).$docsify && (window as any).$docsify.sandboxOptions || {}
  hook.beforeEach((content) => {
    // const reg = /```([^`]+)```\n{1}(?=```)|(?<=```\n{1})```([^`]+)```/g
    // content = content.replace(reg, (res, ...arg) => {
    //   console.log(arg)
    //   return ''
    // })
    content = content.replace(/`{3}\s?([a-z]+)\s+\[(.*?)\]\s?(\$\{.*?\}|\{.*?\})?\n(.*?)`{3}/gms, (res, ...arg) => {
      options[index] = arg.slice(0, -2).map(_ => String(_))
      return `<div class="mini-sandbox-docsify" data-index="${index++}"></div>`
    })
    return content
  })
  hook.doneEach(function() {
    const arr = document.querySelectorAll('.mini-sandbox-docsify')
    for (const el of arr) {
      const currIndex = Number(el.getAttribute('data-index'))
      const [type, filename, config, value] = options[currIndex]
      const regConfig = /^\$\{(.*)\}$/.exec(config)
      let fileConfig = {}
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
      console.log(filename)
      new (window as any).MiniSandbox({
        ...sandboxOptions,
        el: el,
        files: {
          [filename]: {
            type,
            ...fileConfig,
            defaultValue: value,
          },
        },
      })
    }
  })
}

(window as any).$docsify.plugins = [].concat(
  (window as any).$docsify.plugins,
  initMiniSandbox as any,
)
