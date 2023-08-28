import MiniSandbox from './index'

export type GetObjectItemType<T> = T extends object ? T[keyof T] : never
export type GetArrayItemType<T> = T extends any[] ? T[number] : never

export type TagType = ['head', object, string]

// 公共设置
export type PublicConfigType = {
  cssLibs?: string[]
  jsLibs?: string[]
  css?: string
  js?: string
  head?: Array<TagType>
  body?: Array<TagType>
  importMap?: {
    'imports': object,
    'scopes'?: object
  },
}

// tab页类型
type FileType = {
  title?: string
  defaultValue?: string
  cssLibs?: PublicConfigType['cssLibs']
  jsLibs?: PublicConfigType['jsLibs']
  css?: PublicConfigType['css']
  js?: PublicConfigType['js']
  head?: PublicConfigType['head']
  body?: PublicConfigType['body']
  importMap?: PublicConfigType['importMap']
  urlField?: string
  module?: '' | 'iife' | 'esm'
  template?: boolean
  hidden?: boolean
  // disabled?: boolean
}

export type LocalFileType = Required<Omit<FileType, 'importMap'>> & {
  filename: string,
  value: string,
  type: string
}

export type LoaderFunctionType = (
  this: MiniSandbox,
  context: string,
  config: LocalFileType
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
  toolbar?: Array<'reset' | 'reload' | 'left-layout' | 'right-layout' | 'top-layout' | 'bottom-layout'>
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
  publicConfig?: PublicConfigType
  defaultConfig?: DefaultConfigType
  events?: EventsType
}
