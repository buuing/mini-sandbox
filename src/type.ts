import MiniSandbox from './index'

export type GetObjectItemType<T> = T extends object ? T[keyof T] : never
export type GetArrayItemType<T> = T extends any[] ? T[number] : never

// 公共静态资源
export type ResourceType = {
  cssLibs?: string[]
  jsLibs?: string[]
  css?: string
  js?: string
}

// tab页类型
export type FileType = {
  title?: string
  defaultValue?: string
  cssLibs?: ResourceType['cssLibs']
  jsLibs?: ResourceType['jsLibs']
  css?: ResourceType['css']
  js?: ResourceType['js']
  urlField?: string
  module?: 'iife' | 'esm'
  hidden?: boolean
  // disabled?: boolean
}

export type LoaderFunctionType = (
  this: MiniSandbox,
  context: string,
  config: FileType
) => (string | Promise<string>)

export type LoadersType = {
  [key: string]: LoaderFunctionType[]
}

// 默认配置
export type DefaultConfigType = {
  theme?: 'light' | 'dark'
  autoRun?: boolean
  autoRunInterval?: number
  height?: string
  editorRange?: string
  renderRange?: string
  draggable?: boolean
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  toolbar: Array<'reset' | 'reload' | 'left-layout' | 'right-layout' | 'top-layout' | 'bottom-layout'>
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
    [filename: string]: FileType
  },
  loaders: LoadersType
  resource?: ResourceType
  defaultConfig?: DefaultConfigType
  events?: EventsType
}
