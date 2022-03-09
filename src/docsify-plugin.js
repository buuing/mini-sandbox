
export default function initMiniSandbox(hook) {
  let options = [], index = 0
  const $sandbox = $docsify.miniSandbox
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
      if (regConfig) {
        const key = regConfig[1]
        config = $sandbox && $sandbox.data && $sandbox.data[key]
      } else if (typeof config === 'string' && config !== 'undefined') {
        try {
          config = new Function('return ' + config)()
        } catch (err) {
          console.error(config, err)
          config = {}
        }
      }
      new MiniSandbox({
        el: el,
        files: {
          [fileName]: {
            type,
            ...config,
            defaultValue: value,
          }
        },
        defaultConfig: {
          ...$sandbox && $sandbox.defaultConfig
        }
      })
    }
  })
}

$docsify.plugins = [].concat(
  $docsify.plugins,
  initMiniSandbox,
)
