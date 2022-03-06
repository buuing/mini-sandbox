
export type ConfigType = {
  el: string | HTMLDivElement
  theme?: 'light' | 'dark'
  defaultValue?: string
  // 静态资源
  cssLibs?: string[]
  jsLibs?: string[]
  css?: string
  js?: string
  // 编辑器属性
  autoRun?: boolean
  autoRunInterval?: number
  // 代码保存到网址
  codeOnUrl?: boolean
  urlField?: string
  // dom属性
  height?: string
  defaultEditorWidth?: string
  draggable?: boolean
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  // 回调
  onFocus: () => void
  onChange: () => void
  onLoad: () => void
}
