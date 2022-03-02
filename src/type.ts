
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
  editorWidth?: string
  height?: string
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  onChange: () => void
  onLoad: () => void
}
