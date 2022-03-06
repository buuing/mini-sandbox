
export type ConfigType = {
  el: string | HTMLDivElement
  theme?: 'light' | 'dark'
  defaultValue?: string
  // 静态资源
  cssLibs?: string[]
  jsLibs?: string[]
  css?: string
  js?: string
  // 沙盒属性
  autoRun?: boolean
  autoRunInterval?: number
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
