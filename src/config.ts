import MiniSandbox from './index'
import { DefaultConfigType } from './type'
import { version } from '../package.json'
import { OptionsType } from '@right-menu/core'

export const allIcon = {
  // add: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7Z" fill="currentColor" /></svg>',
  reset: '<svg width="24" height="24" viewBox="0 1 24 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.3623 15.529L8.94804 16.9432L3.99829 11.9934L8.94804 7.0437L10.3623 8.45791L7.86379 10.9564H16.0018C18.2109 10.9564 20.0018 12.7472 20.0018 14.9564V16.9564H18.0018V14.9564C18.0018 13.8518 17.1063 12.9564 16.0018 12.9564H7.78965L10.3623 15.529Z" fill="currentColor" /></svg>',
  reload: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.1459 11.0499L12.9716 9.05752L15.3462 8.84977C14.4471 7.98322 13.2242 7.4503 11.8769 7.4503C9.11547 7.4503 6.87689 9.68888 6.87689 12.4503C6.87689 15.2117 9.11547 17.4503 11.8769 17.4503C13.6977 17.4503 15.2911 16.4771 16.1654 15.0224L18.1682 15.5231C17.0301 17.8487 14.6405 19.4503 11.8769 19.4503C8.0109 19.4503 4.87689 16.3163 4.87689 12.4503C4.87689 8.58431 8.0109 5.4503 11.8769 5.4503C13.8233 5.4503 15.5842 6.24474 16.853 7.52706L16.6078 4.72412L18.6002 4.5498L19.1231 10.527L13.1459 11.0499Z" fill="currentColor" /></svg>',
  // code: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.325 3.05011L8.66741 20.4323L10.5993 20.9499L15.2568 3.56775L13.325 3.05011Z" fill="currentColor" /><path d="M7.61197 18.3608L8.97136 16.9124L8.97086 16.8933L3.87657 12.1121L8.66699 7.00798L7.20868 5.63928L1.04956 12.2017L7.61197 18.3608Z" fill="currentColor" /><path d="M16.388 18.3608L15.0286 16.9124L15.0291 16.8933L20.1234 12.1121L15.333 7.00798L16.7913 5.63928L22.9504 12.2017L16.388 18.3608Z" fill="currentColor" /></svg>',
  // copy: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 7H7V5H13V7Z" fill="currentColor" /><path d="M13 11H7V9H13V11Z" fill="currentColor" /><path d="M7 15H13V13H7V15Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M3 19V1H17V5H21V23H7V19H3ZM15 17V3H5V17H15ZM17 7V19H9V21H19V7H17Z" fill="currentColor" /></svg>',
  // maximize: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3H9V5H6.46173L11.3047 9.84298L9.8905 11.2572L5 6.3667V9H3V3Z" fill="currentColor" /><path d="M3 21H9V19H6.3764L11.3046 14.0718L9.89038 12.6576L5 17.548V15H3V21Z" fill="currentColor" /><path d="M15 21H21V15H19V17.5244L14.1332 12.6576L12.719 14.0718L17.6472 19H15V21Z" fill="currentColor" /><path d="M21 3H15V5H17.5619L12.7189 9.84301L14.1331 11.2572L19 6.39032V9H21V3Z" fill="currentColor" /></svg>',
  // minimize: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 9H3V7H7V3H9V9Z" fill="currentColor" /><path d="M9 15H3V17H7V21H9V15Z" fill="currentColor" /><path d="M21 15H15V21H17V17H21V15Z" fill="currentColor" /><path d="M15 9.00012H21V7.00012H17V3.00012H15V9.00012Z" fill="currentColor" /></svg>',
  'top-layout': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 11H6V9H18V11Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M2 16C2 17.6569 3.34315 19 5 19H19C20.6569 19 22 17.6569 22 16V8C22 6.34315 20.6569 5 19 5H5C3.34315 5 2 6.34315 2 8V16ZM5 17H19C19.5523 17 20 16.5523 20 16V8C20 7.44772 19.5523 7 19 7H5C4.44772 7 4 7.44771 4 8V16C4 16.5523 4.44772 17 5 17Z" fill="currentColor" /></svg>',
  'left-layout': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 9H6V15H8V9Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M2 8C2 6.34315 3.34315 5 5 5H19C20.6569 5 22 6.34315 22 8V16C22 17.6569 20.6569 19 19 19H5C3.34315 19 2 17.6569 2 16V8ZM5 7H19C19.5523 7 20 7.44771 20 8V16C20 16.5523 19.5523 17 19 17H5C4.44772 17 4 16.5523 4 16V8C4 7.44772 4.44772 7 5 7Z" fill="currentColor" /></svg>',
  'right-layout': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 9H18V15H16V9Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M22 8C22 6.34315 20.6569 5 19 5H5C3.34315 5 2 6.34315 2 8V16C2 17.6569 3.34315 19 5 19H19C20.6569 19 22 17.6569 22 16V8ZM19 7H5C4.44772 7 4 7.44771 4 8V16C4 16.5523 4.44772 17 5 17H19C19.5523 17 20 16.5523 20 16V8C20 7.44772 19.5523 7 19 7Z" fill="currentColor" /></svg>',
  'bottom-layout': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 13H6V15H18V13Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M2 8C2 6.34315 3.34315 5 5 5H19C20.6569 5 22 6.34315 22 8V16C22 17.6569 20.6569 19 19 19H5C3.34315 19 2 17.6569 2 16V8ZM5 7H19C19.5523 7 20 7.44771 20 8V16C20 16.5523 19.5523 17 19 17H5C4.44772 17 4 16.5523 4 16V8C4 7.44772 4.44772 7 5 7Z" fill="currentColor" /></svg>',
  // 'theme-dark': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.2256 2.00253C9.59172 1.94346 6.93894 2.9189 4.92893 4.92891C1.02369 8.83415 1.02369 15.1658 4.92893 19.071C8.83418 22.9763 15.1658 22.9763 19.0711 19.071C21.0811 17.061 22.0565 14.4082 21.9975 11.7743C21.9796 10.9772 21.8669 10.1818 21.6595 9.40643C21.0933 9.9488 20.5078 10.4276 19.9163 10.8425C18.5649 11.7906 17.1826 12.4053 15.9301 12.6837C14.0241 13.1072 12.7156 12.7156 12 12C11.2844 11.2844 10.8928 9.97588 11.3163 8.0699C11.5947 6.81738 12.2094 5.43511 13.1575 4.08368C13.5724 3.49221 14.0512 2.90664 14.5935 2.34046C13.8182 2.13305 13.0228 2.02041 12.2256 2.00253ZM17.6569 17.6568C18.9081 16.4056 19.6582 14.8431 19.9072 13.2186C16.3611 15.2643 12.638 15.4664 10.5858 13.4142C8.53361 11.362 8.73568 7.63895 10.7814 4.09281C9.1569 4.34184 7.59434 5.09193 6.34315 6.34313C3.21895 9.46732 3.21895 14.5326 6.34315 17.6568C9.46734 20.781 14.5327 20.781 17.6569 17.6568Z" fill="currentColor" /></svg>',
  // 'theme-light': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M11 0H13V4.06189C12.6724 4.02104 12.3387 4 12 4C11.6613 4 11.3276 4.02104 11 4.06189V0ZM7.0943 5.68018L4.22173 2.80761L2.80752 4.22183L5.6801 7.09441C6.09071 6.56618 6.56608 6.0908 7.0943 5.68018ZM4.06189 11H0V13H4.06189C4.02104 12.6724 4 12.3387 4 12C4 11.6613 4.02104 11.3276 4.06189 11ZM5.6801 16.9056L2.80751 19.7782L4.22173 21.1924L7.0943 18.3198C6.56608 17.9092 6.09071 17.4338 5.6801 16.9056ZM11 19.9381V24H13V19.9381C12.6724 19.979 12.3387 20 12 20C11.6613 20 11.3276 19.979 11 19.9381ZM16.9056 18.3199L19.7781 21.1924L21.1923 19.7782L18.3198 16.9057C17.9092 17.4339 17.4338 17.9093 16.9056 18.3199ZM19.9381 13H24V11H19.9381C19.979 11.3276 20 11.6613 20 12C20 12.3387 19.979 12.6724 19.9381 13ZM18.3198 7.0943L21.1923 4.22183L19.7781 2.80762L16.9056 5.6801C17.4338 6.09071 17.9092 6.56608 18.3198 7.0943Z" fill="currentColor" /></svg>',
}

export function generateMenuOptions(this: MiniSandbox): OptionsType {
  const hideLayout = ['100%', '0%'].indexOf(this.defaultConfig.editorRange) > -1
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
      type: 'ul',
      text: '布局',
      disabled: hideLayout,
      children: hideLayout
        ? []
        : [
            {
              type: 'li',
              text: '左右布局',
              callback: () => {
                if (this.defaultConfig.direction.indexOf('row') === -1) {
                  this.triggleDirection('row')
                }
              },
            },
            {
              type: 'li',
              text: '上下布局',
              callback: () => {
                if (this.defaultConfig.direction.indexOf('column') === -1) {
                  this.triggleDirection('column')
                }
              },
            },
            {
              type: 'li',
              text: '翻转布局',
              callback: () => {
                const obj = {
                  row: 'row-reverse',
                  'row-reverse': 'row',
                  column: 'column-reverse',
                  'column-reverse': 'column',
                }
                const newDirection = obj[this.defaultConfig.direction]
                this.triggleDirection(newDirection as DefaultConfigType['direction'])
              },
            },
          ],
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
          callback: () => console.log(this.getJSONString()),
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
          text: '📋 开源协议 MIT License',
          callback: () => window.open('https://github.com/buuing/mini-sandbox/blob/master/LICENSE'),
        },
      ],
    },
  ]
}
