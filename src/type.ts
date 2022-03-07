
export type FileType = {
  type: string
  defaultValue?: string
  cssLibs?: string[]
  jsLibs?: string[]
  css?: string
  js?: string
}

export type ConfigType = {
  el: string | HTMLDivElement
  theme?: 'light' | 'dark'
  files?: {
    [fileName: string]: FileType
  },
  // 公共静态资源
  cssLibs?: FileType['cssLibs']
  jsLibs?: FileType['jsLibs']
  css?: FileType['css']
  js?: FileType['js']
  // 沙盒属性
  autoRun?: boolean
  autoRunInterval?: number
  codeOnUrl?: keyof ConfigType['files'] | ''
  urlField?: string
  // dom属性
  height?: string
  defaultEditorWidth?: string
  draggable?: boolean
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  // 回调
  onFocus: () => void
  onBlur: () => void
  onChange: () => void
  onLoad: () => void
}
