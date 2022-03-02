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
  config: ConfigType
  editor!: EditorView
  loading = false
  isClick = false
  iframe!: HTMLIFrameElement
  boxEl!: HTMLDivElement
  maskEl!: HTMLDivElement
  loadEl!: HTMLDivElement
  codeEl!: HTMLDivElement
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
      editorWidth: '50%',
      height: 'auto',
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

  async init() {
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

  initDom() {
    (this.config.el as HTMLDivElement).innerHTML = `
      <div class="mini-playground" package="${name}@${version}">
        <div class="mini-playground-body">
          <div class="mini-playground-code" style="width: ${this.config.editorWidth}"></div>
          <div class="mini-playground-gutter"></div>
          <div class="mini-playground-content">
            <iframe id="mini-playground-iframe" width="100%" height="100%"></iframe>
            <div class="mini-playground-loading"></div>
          </div>
          <div class="mini-playground-mask"></div>
        </div>
      </div>
    `
    this.iframe = document.querySelector('#mini-playground-iframe')!
    this.boxEl = document.querySelector('.mini-playground-body')!
    this.maskEl = document.querySelector('.mini-playground-mask')!
    this.loadEl = document.querySelector('.mini-playground-loading')!
    this.codeEl = document.querySelector('.mini-playground-code')!
    this.lineEl = document.querySelector('.mini-playground-gutter')!
    this.contentEl = document.querySelector('.mini-playground-content')!
  }

  initEvent() {
    let boxW: number, boxX: number, lineX: number
    this.lineEl.addEventListener('mousedown', e => {
      lineX = e.offsetX
      this.isClick = true
      const { x, width } = this.boxEl.getBoundingClientRect()
      boxW = width
      boxX = x
      this.maskEl.style.display = 'block'
    })
    this.boxEl.addEventListener('mouseup', e => {
      this.isClick = false
      this.maskEl.style.display = 'none'
    })
    this.boxEl.addEventListener('mousemove', e => {
      if (!this.isClick) return
      this.codeEl.style.width = (e.clientX - boxX - lineX) / boxW * 100 + '%'
    })
  }

  initCodeMirror() {
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
  }

  setValue(value: string) {
    this.editor.dispatch({
      changes: {
        from: 0,
        to: this.editor.state.doc.length,
        insert: value,
      },
    })
  }

  getValue() {
    return this.editor.state.doc.toString()
  }

  setStyle(key: string, value: string | number) {
    const cm = document.querySelector('.CodeMirror') as HTMLDivElement
    if (!cm) return
    cm.style[key] = value
  }

  getBase64() {
    const htmlStr = this.getValue()
    return encode(htmlStr)
  }

  render() {
    this.triggleLoading(true)
    const htmlStr = this.getValue()
    if (this.config.codeOnUrl) {
      setQuery({ code: encode(htmlStr) })
    }
    this.renderIframe(htmlStr)
  }

  async initStatisResources() {
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

  triggleLoading(status: boolean) {
    this.loadEl.style.display = status ? 'block' : 'none'
  }

  async renderIframe(context: string) {
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
