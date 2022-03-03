import { EditorState, basicSetup } from '@codemirror/basic-setup'
import { EditorView, keymap } from '@codemirror/view'
import { indentWithTab } from '@codemirror/commands'
import { html } from '@codemirror/lang-html'
import { debounce, getQuery, setQuery, CSSLoader, JSLoader, encode, decode } from './utils'
import { ConfigType } from './type'
import { name, version } from '../package.json'
import './style.css'

export default class MiniPlayground {
  static version = version
  static encode = encode
  static decode = decode
  readonly version = version
  el!: HTMLDivElement
  config: ConfigType
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
  ldqStaticResources: string[] = []

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
      height: 'auto',
      editorWidth: '50%',
      draggable: true,
      direction: 'row',
      ...config,
    }
    if (!config.el) throw new Error('缺少配置项 => el 属性')
    this.config.el = (typeof config.el === 'string' ? document.querySelector(config.el) : config.el) as HTMLDivElement
    if (!this.config.el) throw new Error(`获取元素失败 => ${config.el}`)
    // 初始化
    this.init().then(() => {
      this.config.onLoad?.()
    })
  }

  public async init() {
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
    const htmlStr = query['code']
    if (htmlStr && this.config.codeOnUrl) {
      this.setValue(decode(htmlStr))
    } else if (this.config.defaultValue) {
      this.setValue(this.config.defaultValue)
    } else {
      this.render()
    }
  }

  private initDom() {
    const { config } = this
    const el = this.el = this.config.el as HTMLDivElement
    this.addClass(el, 'mini-playground')
    el.setAttribute('package', `${name}@${version}`)
    this.setStyle(el, {
      height: config.height!,
    })
    el.innerHTML = `
      <div class="playground-code" style="width: ${config.editorWidth}">
        <div class="playground-tab">
          <div class="playground-tab-item">HTML</div>
          <div class="playground-tab-item playground-tab-active">Vue</div>
          <div class="playground-tab-item">React</div>
          <div class="playground-tab-item">UniApp</div>
          <div class="playground-tab-item">Taro</div>
        </div>
      </div>
      <div class="playground-gutter"></div>
      <div class="playground-content">
        <iframe class="playground-iframe" width="100%" height="100%"></iframe>
        <div class="playground-loading"></div>
      </div>
      <div class="playground-mask"></div>
    `
    this.iframe = el.querySelector('.playground-iframe')!
    this.maskEl = el.querySelector('.playground-mask')!
    this.loadEl = el.querySelector('.playground-loading')!
    this.codeEl = el.querySelector('.playground-code')!
    this.lineEl = el.querySelector('.playground-gutter')!
    this.contentEl = el.querySelector('.playground-content')!
    const tabBar = el.querySelector('.playground-tab')!
    tabBar.addEventListener('click', e => {
      const targetEl = e.target as HTMLDivElement
      if (targetEl !== tabBar) {
        const items = tabBar.children
        for (const item of items) {
          item.className = 'playground-tab-item'
        }
        this.addClass(targetEl, 'playground-tab-active')
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
      this.codeEl.style.width = (e.clientX - boxX - lineX) / boxW * 100 + '%'
    })
  }

  private initCodeMirror() {
    const render = debounce(this.render, this.config.autoRunInterval).bind(this)
    const handleChange = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        this.config.onChange?.()
        render()
      }
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

  public getCode() {
    return encode(this.getValue())
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
    if (this.config.codeOnUrl) {
      setQuery({ code: encode(htmlStr) })
    }
    this.renderIframe(htmlStr)
  }

  private async initStatisResources() {
    const ldqStaticResources = window['ldqStaticResources'] || {}
    await Promise.all([
      ...(this.config.cssLibs || [])
        .filter(src => !ldqStaticResources[src])
        .map(async src => (ldqStaticResources[src] = await CSSLoader(src))),
      ...(this.config.jsLibs || [])
        .filter(src => !ldqStaticResources[src])
        .map(async src => (ldqStaticResources[src] = await JSLoader(src))),
    ])
    window['ldqStaticResources'] = ldqStaticResources
    this.ldqStaticResources = [
      ...(this.config.cssLibs || []).map(src => ldqStaticResources[src]),
      ...(this.config.jsLibs || []).map(src => ldqStaticResources[src]),
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
          <title>Mini Playground</title>
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
