import MiniSandbox from './index'
import { version } from '../package.json'
import { OptionsType } from '@right-menu/core'

export function generateMenuOptions(this: MiniSandbox): OptionsType {
  return [
    {
      type: 'li',
      text: '重置',
      callback: () => this.reset(),
    },
    {
      type: 'li',
      text: '另存为...',
      disabled: true,
      callback: () => {},
    },
    { type: 'hr' },
    {
      type: 'ul',
      text: '外观',
      children: [
        {
          type: 'li',
          text: '放大',
          callback: () => {
            const fontSize = ~~this.editorEl.style.fontSize.replace(/[a-z]/g, '')
            this.setStyle(this.editorEl, { 'font-size': `${fontSize + 1}px` })
          },
        },
        {
          type: 'li',
          text: '缩小',
          callback: () => {
            const fontSize = ~~this.editorEl.style.fontSize.replace(/[a-z]/g, '')
            this.setStyle(this.editorEl, { 'font-size': `${fontSize - 1}px` })
          },
        },
        {
          type: 'li',
          text: '重置缩放',
          callback: () => this.setStyle(this.editorEl, { 'font-size': '14px' }),
        },
      ],
    },
    {
      type: 'li',
      text: '翻转布局',
      callback: () => {
        const { defaultConfig } = this
        if (defaultConfig.direction === 'row') {
          defaultConfig.direction = 'row-reverse'
        } else if (defaultConfig.direction === 'row-reverse') {
          defaultConfig.direction = 'row'
        }
        this.setStyle(this.el, {
          'flex-direction': defaultConfig.direction,
        })
      },
    },
    {
      type: 'li',
      text: '切换主题',
      disabled: true,
      callback: () => this.triggleTheme(),
    },
    { type: 'hr' },
    {
      type: 'ul',
      text: '调试工具',
      children: [
        {
          type: 'li',
          text: '打印 JSON 字符串',
          callback: () => console.log(JSON.stringify(this.getValue()).replace(/<\/script>/g, '<\\/script>')),
        },
      ],
    },
    {
      type: 'ul',
      text: '关于 Mini Sandbox',
      children: [
        {
          type: 'li',
          text: 'version@' + version,
          disabled: true,
          callback: () => {},
        },
        { type: 'hr' },
        {
          type: 'li',
          text: '官方文档',
          callback: () => window.open('https://buuing.github.io/mini-sandbox'),
        },
        {
          type: 'li',
          text: 'Github 仓库',
          callback: () => window.open('https://github.com/buuing/mini-sandbox'),
        },
        {
          type: 'li',
          text: 'Bug 反馈',
          callback: () => window.open('https://github.com/buuing/mini-sandbox/issues'),
        },
        { type: 'hr' },
        {
          type: 'li',
          text: '📋 开源协议 License',
          callback: () => window.open('https://github.com/buuing/mini-sandbox/blob/master/LICENSE'),
        },
      ],
    },
  ]
}
