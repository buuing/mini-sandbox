import { EditorState, basicSetup } from '@codemirror/basic-setup'
import { EditorView, keymap } from '@codemirror/view'
import { indentWithTab } from '@codemirror/commands'
import { html } from '@codemirror/lang-html'
import { debounce, getQuery, setQuery, ElementGenerator, FileLoader, encode, decode, define } from './utils'
import { OptionsType, PublicResourcesType, FileType, DefaultConfigType, EventsType, LoadersType } from './type'
import RightMenu from '@right-menu/core'
import { generateMenuOptions } from './config'
import HTMLLoader from './loaders/html-loader'
import { name, version } from '../package.json'
import './style/theme.less'
import './style/index.less'

type LocalFileType = Required<FileType> & {
  filename: string,
  value: string,
  type: string
}

export default class MiniSandbox {
  static version = version
  static encode = encode
  static decode = decode
  readonly version = version
  el!: HTMLDivElement
  files: { [filename: string]: LocalFileType } = {}
  fileList!: Required<LocalFileType>[]
  loaders!: LoadersType
  publicResources!: Required<PublicResourcesType>
  defaultConfig!: Required<DefaultConfigType>
  events!: Required<EventsType>
  editor!: EditorView
  fileIndex: number = 0
  currFile!: LocalFileType
  currTemplate!: LocalFileType
  templateTypeSet!: Set<string>
  loading = false
  isClick = false
  iframe!: HTMLIFrameElement
  maskEl!: HTMLDivElement
  loadEl!: HTMLDivElement
  codeEl!: HTMLDivElement
  editorEl!: HTMLDivElement
  lineEl!: HTMLDivElement
  renderEl!: HTMLDivElement
  searchEl!: HTMLInputElement
  ldqResources: string[] = []
  public run: Function

  constructor(options = {} as OptionsType) {
    // 初始化配置项
    this.initOptions(options)
    // 初始化一些 getter
    define(this, 'currFile', () => this.fileList[this.fileIndex])
    // 设置防抖
    this.run = debounce(this.render, this.defaultConfig.autoRunInterval).bind(this)
    // 初始化
    this.init().then(() => {
      this.events.onLoad?.()
    })
  }

  initOptions(options: OptionsType) {
    const query = getQuery()
    // 初始化loader
    this.loaders = {
      '.html': [HTMLLoader],
      ...options.loaders,
    }
    this.templateTypeSet = new Set(Object.keys(this.loaders).concat('.html'))
    // 初始化 files
    this.fileIndex = 0
    this.fileList = Object.keys(options.files || {}).map(filename => {
      const file = (options.files!)[filename]
      const htmlStr = decode(query[file.urlField || ''])
      const _file = {
        defaultValue: '',
        cssLibs: [],
        jsLibs: [],
        css: '',
        js: '',
        urlField: '',
        title: '',
        ...file,
        filename: filename.lastIndexOf('.') > -1 ? filename : filename + '.html',
        value: htmlStr || file.defaultValue || '',
        type: '',
      }
      _file.type = _file.filename.slice(_file.filename.lastIndexOf('.'))
      if (!this.currTemplate && this.templateTypeSet.has(_file.type)) {
        this.currTemplate = _file
      }
      this.files[filename] = _file
      return _file
    })
    // 初始化公共静态资源
    this.publicResources = {
      cssLibs: [],
      jsLibs: [],
      css: '',
      js: '',
      ...options.publicResources,
    }
    // 初始化默认配置
    this.defaultConfig = {
      theme: 'light',
      autoRun: true,
      autoRunInterval: 300,
      height: '300px',
      editorWidth: '50%',
      draggable: true,
      direction: 'row',
      ...options.defaultConfig,
    }
    this.events = {
      onFocus: () => {},
      onBlur: () => {},
      onChange: () => {},
      onLoad: () => {},
      ...options.events,
    }
    // 初始化 dom
    if (!options.el) throw new Error('缺少配置项 => el 属性')
    this.el = (typeof options.el === 'string' ? document.querySelector(options.el) : options.el) as HTMLDivElement
    if (!this.el) throw new Error(`获取元素失败 => ${options.el}`)
  }

  public async init() {
    // 初始化dom结构
    this.initDom()
    // 初始化事件
    this.initEvent()
    // 初始化编辑器
    this.initCodeMirror()
    // 初始化菜单栏
    this.initMenu()
    // 初始主题
    this.triggleTheme()
    // 初始化编辑器内容
    const currFile = this.currFile
    const query = getQuery()
    const htmlStr = query[currFile.urlField]
    if (htmlStr) {
      // 如果顶部 url 有值, 优先渲染
      this.setValue(decode(htmlStr))
    } else if (currFile.defaultValue) {
      // 如果当前tab页有默认值, 则重置
      this.reset()
    } else {
      // 否则就渲染
      this.render()
    }
  }

  // 重置
  public reset() {
    this.setValue(this.currFile.defaultValue)
  }

  // 初始化dom结构
  private initDom() {
    const { el, defaultConfig } = this
    this.addClass(el, 'mini-sandbox')
    el.setAttribute('package', `${name}@${version}`)
    this.setStyle(el, {
      height: defaultConfig.height,
      'flex-direction': defaultConfig.direction,
    })
    el.innerHTML = `
      <div class="sandbox-code" style="width: ${defaultConfig.editorWidth}">
        <div class="sandbox-head">
          <div class="sandbox-setting">
            <span class="sandbox-icon icon-active">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 14C9.55228 14 10 13.5523 10 13C10 12.4477 9.55228 12 9 12C8.44771 12 8 12.4477 8 13C8 13.5523 8.44771 14 9 14Z" fill="currentColor" /><path d="M16 13C16 13.5523 15.5523 14 15 14C14.4477 14 14 13.5523 14 13C14 12.4477 14.4477 12 15 12C15.5523 12 16 12.4477 16 13Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 11.1637 19.8717 10.3574 19.6337 9.59973C18.7991 9.82556 17.9212 9.94604 17.0152 9.94604C13.2921 9.94604 10.0442 7.91139 8.32277 4.89334C5.75469 6.22486 4 8.90751 4 12C4 16.4183 7.58172 20 12 20Z" fill="currentColor" /></svg>
            <span>
          </div>
          &ensp;
          <div class="sandbox-tab">
            ${this.fileList.map((file, index) => {
              const className = 'sandbox-tab-item' + (this.fileIndex === index ? ' sandbox-tab-active' : '')
              return `
                <div class="${className}" data-index="${index}">
                  <span>${file.title || file.filename}</span>
                  <!-- <span class="sandbox-icon icon-close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="currentColor" /></svg>
                  </span> -->
                </div>
              `
            }).join('\n')}
          </div>
        </div>
      </div>
      <div class="sandbox-gutter"></div>
      <div class="sandbox-render">
        <div class="sandbox-head">
          &ensp;
          <span class="sandbox-icon icon-active sandbox-reset" title="还原">
            <svg width="24" height="24" viewBox="0 1 24 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.3623 15.529L8.94804 16.9432L3.99829 11.9934L8.94804 7.0437L10.3623 8.45791L7.86379 10.9564H16.0018C18.2109 10.9564 20.0018 12.7472 20.0018 14.9564V16.9564H18.0018V14.9564C18.0018 13.8518 17.1063 12.9564 16.0018 12.9564H7.78965L10.3623 15.529Z" fill="currentColor" /></svg>
          </span>
          <span class="sandbox-icon icon-active sandbox-reload" title="刷新">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.1459 11.0499L12.9716 9.05752L15.3462 8.84977C14.4471 7.98322 13.2242 7.4503 11.8769 7.4503C9.11547 7.4503 6.87689 9.68888 6.87689 12.4503C6.87689 15.2117 9.11547 17.4503 11.8769 17.4503C13.6977 17.4503 15.2911 16.4771 16.1654 15.0224L18.1682 15.5231C17.0301 17.8487 14.6405 19.4503 11.8769 19.4503C8.0109 19.4503 4.87689 16.3163 4.87689 12.4503C4.87689 8.58431 8.0109 5.4503 11.8769 5.4503C13.8233 5.4503 15.5842 6.24474 16.853 7.52706L16.6078 4.72412L18.6002 4.5498L19.1231 10.527L13.1459 11.0499Z" fill="currentColor" /></svg>
          </span>
          <input class="sandbox-search" disabled spellcheck="false" />
          <!-- <span class="sandbox-icon icon-active sandbox-copy" title="复制链接">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.8284 12L16.2426 13.4142L19.071 10.5858C20.6331 9.02365 20.6331 6.49099 19.071 4.9289C17.509 3.3668 14.9763 3.3668 13.4142 4.9289L10.5858 7.75732L12 9.17154L14.8284 6.34311C15.6095 5.56206 16.8758 5.56206 17.6568 6.34311C18.4379 7.12416 18.4379 8.39049 17.6568 9.17154L14.8284 12Z" fill="currentColor" /><path d="M12 14.8285L13.4142 16.2427L10.5858 19.0711C9.02372 20.6332 6.49106 20.6332 4.92896 19.0711C3.36686 17.509 3.36686 14.9764 4.92896 13.4143L7.75739 10.5858L9.1716 12L6.34317 14.8285C5.56212 15.6095 5.56212 16.8758 6.34317 17.6569C7.12422 18.4379 8.39055 18.4379 9.1716 17.6569L12 14.8285Z" fill="currentColor" /><path d="M14.8285 10.5857C15.219 10.1952 15.219 9.56199 14.8285 9.17147C14.4379 8.78094 13.8048 8.78094 13.4142 9.17147L9.1716 13.4141C8.78107 13.8046 8.78107 14.4378 9.1716 14.8283C9.56212 15.2188 10.1953 15.2188 10.5858 14.8283L14.8285 10.5857Z" fill="currentColor" /></svg>
          </span> -->
          &ensp;
        </div>
        <iframe class="sandbox-body"></iframe>
        <div class="sandbox-loading"></div>
      </div>
      <div class="sandbox-mask"></div>
    `
    this.iframe = el.querySelector('iframe')!
    this.maskEl = el.querySelector('.sandbox-mask')!
    this.loadEl = el.querySelector('.sandbox-loading')!
    this.codeEl = el.querySelector('.sandbox-code')!
    this.lineEl = el.querySelector('.sandbox-gutter')!
    this.renderEl = el.querySelector('.sandbox-render')!
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
    // 绑定回车事件
    this.searchEl.addEventListener('keypress', e => {
      // if (e.keyCode === 13) this.setCode(this.searchEl.value)
    })
    // 点击 tab 标签页
    const tabBar = el.querySelector('.sandbox-tab')!
    tabBar.addEventListener('click', e => {
      const targetEl = (e['path'] as HTMLElement[]).find(dom => dom.className === 'sandbox-tab-item')
      if (targetEl) {
        this.fileIndex = Number(targetEl.getAttribute('data-index'))
        // 切换 tab 页面
        this.changeTab()
        // 设置样式
        const items = tabBar.children
        for (const item of items) {
          item.className = 'sandbox-tab-item'
        }
        this.addClass(targetEl!, 'sandbox-tab-active')
      }
    })
  }

  private initMenu() {
    // 绑定菜单事件
    new RightMenu({
      el: this.el.querySelector('.sandbox-setting') as HTMLElement,
      theme: 'mac',
      mode: 'click',
    }, generateMenuOptions.call(this))
  }

  private initEvent() {
    const { defaultConfig } = this
    if (!defaultConfig.draggable) {
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
      switch (defaultConfig.direction) {
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
    const { defaultConfig, events } = this
    const currFile = this.currFile
    const htmlStr = this.getValue()
    const codeStr = encode(htmlStr)
    // 替换输入框
    this.searchEl.value = '127.0.0.1:3000/' + encodeURIComponent(this.currTemplate.filename)
    // 替换字符串缓存
    currFile.value = htmlStr
    // 替换顶部 url
    if (currFile.urlField) setQuery({ [currFile.urlField]: codeStr })
    // 是否自动运行
    defaultConfig.autoRun && this.run()
    // 触发 change 回调
    events.onChange?.()
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
    this.setStyle(this.editorEl, {
      'font-size': '14px',
    })
  }

  private changeTab() {
    const currFile = this.currFile
    if (this.templateTypeSet.has(currFile.type)) {
      this.currTemplate = currFile
    }
    this.setValue(currFile.value || currFile.defaultValue)
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

  public getJSONString() {
    return JSON.stringify(this.getValue()).replace(/<\/script>/g, '<\\/script>')
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

  private addClass(el: HTMLElement, className: string) {
    el.classList.add(className)
  }

  public render() {
    const { currTemplate } = this
    this.triggleLoading(true)
    if (currTemplate) {
      this.renderIframe(currTemplate.value)
    }
  }

  public async getResources(src: string, type?: 'style' | 'script') {
    if (!window['ldqResources']) window['ldqResources'] = {}
    const ldqResources = window['ldqResources']
    const localFile = this.files[src]
    if (localFile) {
      ldqResources[src] = ElementGenerator(localFile.value, type)
    }
    if (!ldqResources[src]) {
      if (!type) return console.error('type 不可为空')
      ldqResources[src] = await FileLoader(src, type)
    }
    return ldqResources[src]
  }

  private triggleLoading(status: boolean) {
    this.loadEl.style.display = status ? 'block' : 'none'
  }

  private async renderIframe(context: string) {
    const { loaders } = this
    const currTemplate = this.currTemplate
    // 等待 iframe 刷新
    await new Promise<void>(resolve => {
      this.iframe.addEventListener('load', () => resolve())
      this.iframe.contentWindow?.location.reload()
    })
    // 重新获取 iframe
    const iframe = this.iframe
    const iframeDocument = iframe.contentWindow?.document
    if (!iframeDocument) return
    // 渲染模板
    const value = loaders[currTemplate.type]
    let fileLoaders = Array.isArray(value) ? value : [value]
    fileLoaders = fileLoaders.slice().reverse().filter(loader => typeof loader === 'function')
    let template = context
    for (const loader of fileLoaders) {
      template = await Promise.resolve(loader.call(this, template, currTemplate))
    }
    iframeDocument.open()
    iframeDocument.write(template)
    iframeDocument.close()
    this.triggleLoading(false)
  }

  // 切换主题
  triggleTheme(theme = this.defaultConfig.theme) {
    if (this.el.classList.value.indexOf('sandbox-theme-light') > -1) {
      this.el.classList.remove('sandbox-theme-light')
      this.el.classList.add('sandbox-theme-dark')
    } else {
      this.el.classList.remove('sandbox-theme-dark')
      this.el.classList.add('sandbox-theme-light')
    }
  }
}
