import { get } from '../utils'

export default function initMiniSandbox(hook: {
  beforeEach: (fn: (content: string) => string) => void
  doneEach: (fn: Function) => void
}) {
  let options: string[][][] = []
  let c = ''

  const sandboxOptions = ((window as any).$docsify && (window as any).$docsify.sandboxOptions) || {}

  hook.beforeEach((content) => {
    const reg = /```((?!```).+?(?!```)\n)```(?=\n(?!```))/gms
    const codeList = content.match(reg)

    if (codeList) {
      options = codeList.map((code, index) => {
        const everyCodetoList = code.split(/```\n```/)
        const temp: string[][] = []

        everyCodetoList.forEach((s) => {
          const array = /[`{3}]?\s?([a-zA-Z]+)\s+?\[(.*?)\]\s+(\{.*?\})?(.*?)(?=\n)/gs.exec(s)
          if (array) {
            const [, type, name, config, value] = array
            temp.push([type, name, config, value])
          }
        })
        c += `<div class="mini-sandbox-docsify" data-index="${index}"></div>`
        return temp
      })
    }

    // 这行代码临时放这里, 先别删: content = content.replace(/```\s?([a-z]+)\s+\[(.*)\]\s?(\$\{.*\}|\{.*\})?\n([^`]*)\n```/gm, (res, ...arg) => {
    // content = content.replace(/`{3}\s?([a-z]+)\s+\[([^\s]*)\]\s?(.*?\})?\n(.*?)`{3}/gms, (res, ...arg) => {
    //   options[index] = arg.slice(0, -2).map(_ => String(_))
    //   return `<div class="mini-sandbox-docsify" data-index="${index++}"></div>`
    // })
    // console.log(options)
    return c
  })
  hook.doneEach(function() {
    const arr = document.querySelectorAll('.mini-sandbox-docsify')

    for (const el of arr) {
      const currIndex = Number(el.getAttribute('data-index'))
      const temp = options[currIndex]

      if (!temp.length) continue

      const fileObj = {}
      temp.forEach(codeTemp => {
        const [type, filename, config, value] = codeTemp
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
        fileObj[filename] = {
          type,
          ...fileConfig,
          defaultValue: value,
        }
      })

      new (window as any).MiniSandbox({
        ...sandboxOptions,
        el: el,
        files: {
          ...fileObj,
        },
      })
    }
  })
}

(window as any).$docsify.plugins = [].concat(
  (window as any).$docsify.plugins,
  initMiniSandbox as any,
)
