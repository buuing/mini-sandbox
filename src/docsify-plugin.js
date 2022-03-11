
export default function initMiniSandbox(hook) {
  const isExpectType = (param, ...types) => {
    return types.some(type => Object.prototype.toString.call(param).slice(8, -1).toLowerCase() === type)
  }
  const get = (data, strKeys) => {
    const keys = strKeys.split('.')
    for (const key of keys) {
      const res = data[key]
      if (!isExpectType(res, 'object', 'array')) return res
      data = res
    }
    return data
  }
  const options = []; let index = 0
  const $sandbox = window.$docsify.miniSandbox
  hook.beforeEach(function(content) {
    content = content.replace(/```\s?([a-z]+)\s+\[(.*)\]\s?(\$\{.*\}|\{.*\})?\n([^`]*)\n```/gm, (res, ...arg) => {
      options[index] = arg.slice(0, -2).map(_ => String(_))
      return `<div class="mini-sandbox-docsify" data-index="${index++}"></div>`
    })
    return content
  })
  hook.doneEach(function() {
    const arr = document.querySelectorAll('.mini-sandbox-docsify')
    for (const el of arr) {
      const currIndex = el.getAttribute('data-index')
      let [type, fileName, config, value] = options[currIndex]
      const regConfig = /^\$\{(.*)\}$/.exec(config)
      try {
        if (regConfig) {
          let keyStr = regConfig[1]
          if (keyStr.indexOf('window.') === 0) keyStr = keyStr.slice(7)
          config = get(window, keyStr)
        } else if (typeof config === 'string' && config !== 'undefined') {
          config = window.eval(`(${config})`)
        }
      } catch (err) {
        console.error(config, err)
        config = {}
      }
      new window.MiniSandbox({
        el: el,
        files: {
          [fileName]: {
            type,
            ...config,
            defaultValue: value,
          },
        },
        defaultConfig: {
          ...$sandbox && $sandbox.defaultConfig,
        },
      })
    }
  })
}

window.$docsify.plugins = [].concat(
  window.$docsify.plugins,
  initMiniSandbox,
)
