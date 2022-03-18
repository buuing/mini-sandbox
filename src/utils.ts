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

export const ElementGenerator = (innerText: string | undefined, type?: 'style' | 'script') => type
  ? (
      {
        style: `<style>${innerText || ''}<\/style>`,
        script: `<script type="text/javascript">${innerText || ''}<\/script>`,
      }[type]
    )
  : innerText

export const FileLoader = (src: string, type: 'style' | 'script') => {
  return fetch(src).then(res => res.text()).then(innerText => ElementGenerator(innerText, type))
}

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

export const isExpectType = (param: any, ...types: string[]) => {
  return types.some(type => Object.prototype.toString.call(param).slice(8, -1).toLowerCase() === type)
}

export const get = (data: object, strKeys: string) => {
  const keys = strKeys.split('.')
  for (const key of keys) {
    const res = data[key]
    if (!isExpectType(res, 'object', 'array')) return res
    data = res
  }
  return data
}
