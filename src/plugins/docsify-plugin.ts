import { get } from '../utils'

export default function initMiniSandbox(hook: {
  beforeEach: (fn: (content: string) => string) => void
  doneEach: (fn: Function) => void
}) {
  const options: Array<string[]> = []; let index = 0
  // const $sandbox = (window as any).$docsify.miniSandbox
  hook.beforeEach((content) => {
    content = content.replace(/```\s?([a-z]+)\s+\[(.*)\]\s?(\$\{.*\}|\{.*\})?\n([^`]*)\n```/gm, (res, ...arg) => {
      options[index] = arg.slice(0, -2).map(_ => String(_))
      return `<div class="mini-sandbox-docsify" data-index="${index++}"></div>`
    })
    return content
  })
  hook.doneEach(function() {
    const arr = document.querySelectorAll('.mini-sandbox-docsify')
    for (const el of arr) {
      const currIndex = Number(el.getAttribute('data-index'))
      const [type, fileName, config, value] = options[currIndex]
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
      new (window as any).MiniSandbox({
        el: el,
        files: {
          [fileName]: {
            type,
            ...fileConfig,
            defaultValue: value,
          },
        },
        // defaultConfig: {
        //   ...$sandbox && $sandbox.defaultConfig,
        // },
      })
    }
  })
}

(window as any).$docsify.plugins = [].concat(
  (window as any).$docsify.plugins,
  initMiniSandbox as any,
)
