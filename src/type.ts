
// 公共静态资源
export type ResourceType = {
  cssLibs?: string[]
  jsLibs?: string[]
  css?: string
  js?: string
}

// tab页类型
export type FileType = {
  type: string
  defaultValue?: string
  cssLibs?: ResourceType['cssLibs']
  jsLibs?: ResourceType['jsLibs']
  css?: ResourceType['css']
  js?: ResourceType['js']
  urlField?: string
}

// 默认配置
export type DefaultConfigType = {
  theme?: 'light' | 'dark'
  autoRun?: boolean
  autoRunInterval?: number
  height?: string
  editorWidth?: string
  draggable?: boolean
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
}

// 事件
export type EventsType = {
  onFocus: () => void
  onBlur: () => void
  onChange: () => void
  onLoad: () => void
}

export type OptionsType = {
  el: string | HTMLDivElement
  files?: {
    [fileName: string]: FileType
  },
  resource?: ResourceType
  defaultConfig?: DefaultConfigType
  events?: EventsType
}
