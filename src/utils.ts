// @ts-ignore
// import { parseComponent } from 'vue-template-compiler/browser'
// import { transform } from '@babel/standalone'
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string'

export const has = (data: object, key: string | number): boolean => {
  return Object.prototype.hasOwnProperty.call(data, key)
}

export const debounce = (fn: Function, wait = 300) => {
  let timer: number = 0
  return function(this: unknown) {
    if (timer) window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      fn.apply(this, arguments)
      clearTimeout(timer)
    }, wait)
  }
}

export const getQuery = (search = window.location.search) => {
  const query = {}
  const str = search.split('?')[1]
  if (!str) return query
  str.split('&').forEach(item => {
    const index = item.indexOf('=')
    query[item.slice(0, index)] = item.slice(index + 1)
  })
  return query
}

export const setQuery = (query: { [key: string]: string | number }) => {
  const oldQuery = getQuery()
  const arr = []
  for (const key in query) {
    oldQuery[key] = query[key]
  }
  for (const key in oldQuery) {
    arr.push(`${key}=${oldQuery[key]}`)
  }
  const search = '?' + arr.join('&')
  history.pushState(null, '', search)
}

export const CSSLoader = (src: string) => fetch(src).then(res => res.text()).then(str => `<style>${str}<\/style>`)
export const JSLoader = (src: string) => fetch(src).then(res => res.text()).then(str => `<script type="text/javascript">${str}<\/script>`)

const resLoader = { style: CSSLoader, script: JSLoader }
export const FileLoader = (type: 'style' | 'script', src: string) => resLoader[type](src)

export const encode = (value: string) => {
  return encodeURIComponent(compressToEncodedURIComponent(value))
}

export const decode = (value: string) => {
  return decompressFromEncodedURIComponent(decodeURIComponent(value)) || ''
}

export const define = (obj: object, key: string, cb: () => void) => {
  Object.defineProperty(obj, key, {
    set: () => {
      throw new Error('Assignment to constant variable.')
    },
    get: cb,
  })
}

// const getScript = (script: string, template: any): string => {
//   return `
//     try {
//       var exports = {};
//       ${script}
//       var component = exports.default;
//       // 如果定义了 template函数, 则无需 template
//       component.template = component.template || ${template}
//     } catch (err){
//       console.error(err)
//     }
//     new Vue(component).$mount('#app')
//   `
// }

// export const VueLoader = (value: string) => {
//   // styles
//   const { template, script } = parseComponent(value)
//   const templateStr = template ? JSON.stringify(template.content) : '""'
//   const scriptStr = transform(script?.content || '', { presets: ['es2015'] }).code
//   return getScript(scriptStr, templateStr)
// }
