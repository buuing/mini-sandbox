import { EditorState, basicSetup } from '@codemirror/basic-setup'
import { EditorView, keymap } from '@codemirror/view'
import { indentWithTab } from '@codemirror/commands'
import { html } from '@codemirror/lang-html'
import { debounce, getQuery, setQuery, CSSLoader, JSLoader, encode, decode } from './utils'
import { ConfigType } from './type'
import { name, version } from '../package.json'
import './style.less'

export default class MiniSandbox {
  static version = version
  static encode = encode
  static decode = decode
  readonly version = version
  el!: HTMLDivElement
  config: Required<ConfigType>
  editor!: EditorView
  loading = false
  isClick = false
  iframe!: HTMLIFrameElement
  maskEl!: HTMLDivElement
  loadEl!: HTMLDivElement
  codeEl!: HTMLDivElement
  editorEl!: HTMLDivElement
  lineEl!: HTMLDivElement
  contentEl!: HTMLDivElement
  searchEl!: HTMLInputElement
  ldqStaticResources: string[] = []
  public run: Function

  constructor(config = {} as ConfigType) {
    this.config = {
      theme: 'light',
      defaultValue: '',
      cssLibs: [],
      jsLibs: [],
      css: '',
      js: '',
      autoRun: false,
      autoRunInterval: 300,
      codeOnUrl: false,
      urlField: 'code',
      height: 'auto',
      defaultEditorWidth: '50%',
      draggable: true,
      direction: 'row',
      ...config,
    }
    if (!config.el) throw new Error('缺少配置项 => el 属性')
    this.config.el = (typeof config.el === 'string' ? document.querySelector(config.el) : config.el) as HTMLDivElement
    if (!this.config.el) throw new Error(`获取元素失败 => ${config.el}`)
    // 运行
    this.run = debounce(this.render, config.autoRunInterval).bind(this)
    // 初始化
    this.init().then(() => {
      this.config.onLoad?.()
    })
  }

  public async init() {
    const { config } = this
    // 初始化dom结构
    this.initDom()
    // 初始化事件
    this.initEvent()
    // 初始化编辑器
    this.initCodeMirror()
    // 初始化静态资源
    await this.initStatisResources()
    // 初始化编辑器内容
    const query = getQuery()
    const htmlStr = query[config.urlField]
    if (htmlStr && config.codeOnUrl) {
      this.setValue(decode(htmlStr))
    } else if (config.defaultValue) {
      this.reset()
    } else {
      this.render()
    }
  }

  public reset() {
    this.setValue(this.config.defaultValue)
  }

  private initDom() {
    const { config } = this
    const el = this.el = this.config.el as HTMLDivElement
    this.addClass(el, 'mini-sandbox')
    el.setAttribute('package', `${name}@${version}`)
    this.setStyle(el, {
      height: config.height,
      'flex-direction': config.direction,
    })
    el.innerHTML = `
      <div class="sandbox-code" style="width: ${config.defaultEditorWidth}">
        <div class="sandbox-head">
          <div class="sandbox-setting">≡</div>
          &ensp;
          <div class="sandbox-tab">
            <div class="sandbox-tab-item sandbox-tab-active">index.html</div>
          </div>
        </div>
      </div>
      <div class="sandbox-gutter"></div>
      <div class="sandbox-content">
        <div class="sandbox-head">
          &ensp;
          <span class="sandbox-icon sandbox-reset" title="还原">
            <?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path fill-rule="evenodd" clip-rule="evenodd" d="M44 40.8361C39.1069 34.8632 34.7617 31.4739 30.9644 30.6682C27.1671 29.8625 23.5517 29.7408 20.1182 30.303V41L4 23.5453L20.1182 7V17.167C26.4667 17.2172 31.8638 19.4948 36.3095 24C40.7553 28.5052 43.3187 34.1172 44 40.8361Z" fill="none" stroke="#333" stroke-width="3" stroke-linejoin="round"/></svg>
          </span>
          <span class="sandbox-icon sandbox-reload" title="刷新">
            <?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 8V24" stroke="#333" stroke-width="3" stroke-linecap="butt" stroke-linejoin="round"/><path d="M6 24L6 40" stroke="#333" stroke-width="3" stroke-linecap="butt" stroke-linejoin="round"/><path d="M6 24C6 33.9411 14.0589 42 24 42C28.8556 42 33.2622 40.0774 36.5 36.9519" stroke="#333" stroke-width="3" stroke-linecap="butt" stroke-linejoin="round"/><path d="M42.0007 24C42.0007 14.0589 33.9418 6 24.0007 6C18.9152 6 14.3223 8.10896 11.0488 11.5" stroke="#333" stroke-width="3" stroke-linecap="butt" stroke-linejoin="round"/></svg>
          </span>
          <input class="sandbox-search" spellcheck="false" />
          <span class="sandbox-icon sandbox-copy" title="复制链接">
            <?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M0 0H48V48H0V0Z" fill="white" fill-opacity="0.01"/><g><g><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M12 9.92704V7C12 5.34315 13.3431 4 15 4H41C42.6569 4 44 5.34315 44 7V33C44 34.6569 42.6569 36 41 36H38.0174" stroke="#333" stroke-width="3"/><rect x="4" y="10" width="34" height="34" rx="3" fill="none" stroke="#333" stroke-width="3" stroke-linejoin="round"/></g><g><g><path d="M18.4396 23.1098L23.7321 17.6003C25.1838 16.1486 27.5693 16.1806 29.0604 17.6717C30.5515 19.1628 30.5835 21.5483 29.1319 23L27.2218 25.0228" stroke="#333" stroke-width="3" stroke-linecap="butt" stroke-linejoin="round"/><path d="M13.4661 28.7469C12.9558 29.2573 11.9006 30.2762 11.9006 30.2762C10.4489 31.7279 10.4095 34.3152 11.9006 35.8063C13.3917 37.2974 15.7772 37.3294 17.2289 35.8777L22.3931 31.1894" stroke="#333" stroke-width="3" stroke-linecap="butt" stroke-linejoin="round"/><path d="M18.6631 28.3283C17.9705 27.6357 17.5927 26.7501 17.5321 25.8547C17.4624 24.8225 17.8143 23.7774 18.5916 23" stroke="#333" stroke-width="3" stroke-linecap="butt" stroke-linejoin="round"/><path d="M22.3218 25.8611C23.8129 27.3522 23.8449 29.7377 22.3932 31.1894" stroke="#333" stroke-width="3" stroke-linecap="butt" stroke-linejoin="round"/></g></g></g></g></svg>
          </span>
          &ensp;
        </div>
        <iframe class="sandbox-iframe"></iframe>
        <div class="sandbox-loading"></div>
      </div>
      <div class="sandbox-mask"></div>
    `
    this.iframe = el.querySelector('.sandbox-iframe')!
    this.maskEl = el.querySelector('.sandbox-mask')!
    this.loadEl = el.querySelector('.sandbox-loading')!
    this.codeEl = el.querySelector('.sandbox-code')!
    this.lineEl = el.querySelector('.sandbox-gutter')!
    this.contentEl = el.querySelector('.sandbox-content')!
    this.searchEl = el.querySelector('.sandbox-search')!
    // 重置
    el.querySelector('.sandbox-reset')?.addEventListener('click', () => {
      this.reset()
    })
    // 刷新
    el.querySelector('.sandbox-reload')?.addEventListener('click', () => {
      this.render()
    })
    // 复制
    el.querySelector('.sandbox-copy')?.addEventListener('click', () => {
      this.searchEl.select()
      document.execCommand('copy')
    })
    this.searchEl.addEventListener('keypress', e => {
      if (e.keyCode === 13) this.setCode(this.searchEl.value)
    })
    const tabBar = el.querySelector('.sandbox-tab')!
    tabBar.addEventListener('click', e => {
      const targetEl = e.target as HTMLDivElement
      if (targetEl !== tabBar) {
        const items = tabBar.children
        for (const item of items) {
          item.className = 'sandbox-tab-item'
        }
        this.addClass(targetEl, 'sandbox-tab-active')
      }
    })
  }

  private initEvent() {
    if (!this.config.draggable) {
      this.addClass(this.lineEl, 'no-dragging')
      return
    }
    let boxW: number, boxX: number, lineX: number
    this.lineEl.addEventListener('mousedown', e => {
      lineX = e.offsetX
      this.isClick = true
      const { x, width } = this.el.getBoundingClientRect()
      boxW = width
      boxX = x
      this.maskEl.style.display = 'block'
    })
    this.el.addEventListener('mouseup', e => {
      this.isClick = false
      this.maskEl.style.display = 'none'
    })
    this.el.addEventListener('mousemove', e => {
      if (!this.isClick) return
      let val: number = 0.5
      switch (this.config.direction) {
        case 'row':
          val = (e.clientX - boxX - lineX) / boxW
          break
        case 'row-reverse':
          val = 1 - (e.clientX - boxX + lineX) / boxW
          break
      }
      this.codeEl.style.width = val * 100 + '%'
    })
  }

  private handleChange() {
    const { config } = this
    const htmlStr = this.getValue()
    const codeStr = encode(htmlStr)
    this.searchEl.value = codeStr
    if (config.codeOnUrl) {
      setQuery({ [config.urlField]: codeStr })
    }
    config.autoRun && this.run()
    config.onChange?.()
  }

  private initCodeMirror() {
    const handleChange = EditorView.updateListener.of((update) => {
      if (update.docChanged) this.handleChange()
    })
    this.editor = new EditorView({
      state: EditorState.create({
        extensions: [
          basicSetup,
          keymap.of([indentWithTab]),
          html(),
          handleChange,
        ],
      }),
      parent: this.codeEl,
    })
    this.editorEl = this.el.querySelector('.cm-editor') as HTMLDivElement
  }

  public setValue(value: string) {
    this.editor.dispatch({
      changes: {
        from: 0,
        to: this.editor.state.doc.length,
        insert: value,
      },
    })
    this.run()
  }

  public getValue() {
    return this.editor.state.doc.toString()
  }

  public getString() {
    return JSON.stringify(this.getValue())
  }

  public setCode(code: string) {
    return this.setValue(decode(code))
  }

  public getCode(value?: string) {
    return encode(value || this.getValue())
  }

  public setStyle(el: HTMLDivElement, styles: { [key: string]: string | number }) {
    for (const key in styles) {
      el.style[key] = styles[key]
    }
  }

  private addClass(el: HTMLDivElement, className: string) {
    el.classList.add(className)
  }

  public render() {
    this.triggleLoading(true)
    const htmlStr = this.getValue()
    this.renderIframe(htmlStr)
  }

  private async initStatisResources() {
    const { config } = this
    const ldqStaticResources = window['ldqStaticResources'] || {}
    await Promise.all([
      ...(config.cssLibs || [])
        .filter(src => !ldqStaticResources[src])
        .map(async src => (ldqStaticResources[src] = await CSSLoader(src))),
      ...(config.jsLibs || [])
        .filter(src => !ldqStaticResources[src])
        .map(async src => (ldqStaticResources[src] = await JSLoader(src))),
    ])
    window['ldqStaticResources'] = ldqStaticResources
    this.ldqStaticResources = [
      ...(config.cssLibs || []).map(src => ldqStaticResources[src]),
      ...(config.jsLibs || []).map(src => ldqStaticResources[src]),
    ]
  }

  private triggleLoading(status: boolean) {
    this.loadEl.style.display = status ? 'block' : 'none'
  }

  private async renderIframe(context: string) {
    const { config } = this
    // reload iframe
    await new Promise<void>(resolve => {
      this.iframe.onload = async() => {
        resolve()
        this.triggleLoading(false)
      }
      this.iframe.contentWindow?.location.reload()
    })
    const iframe = this.iframe
    const iframeDocument = iframe.contentWindow?.document
    if (!iframeDocument) return
    // download static resources
    const staticResources = [
      ...Object.values(window['ldqStaticResources'] || {}),
    ]
    iframeDocument.open()
    iframeDocument.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Mini Sandbox</title>
          ${staticResources.join('\n')}
          ${config.css && '<style>' + config.css + '</style>'}
          ${config.js && '<script>' + config.js + '</script>'}
        <\/head>
        <body>
          ${context}
        <\/body>
      <\/html>
    `)
    iframeDocument.close()
  }
}
