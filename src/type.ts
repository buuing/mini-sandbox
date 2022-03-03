
export type ConfigType = {
  el: string | HTMLDivElement
  theme?: 'light' | 'dark'
  defaultValue?: string
  cssLibs?: string[]
  jsLibs?: string[]
  css?: string
  js?: string
  autoRun?: boolean
  autoRunInterval?: number
  codeOnUrl?: boolean
  height?: string
  editorWidth?: string
  draggable?: boolean
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  onFocus: () => void
  onChange: () => void
  onLoad: () => void
}
