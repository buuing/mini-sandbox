import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string'

export const has = (data: object, key: string | number): boolean => {
  return Object.prototype.hasOwnProperty.call(data, key)
}

export const debounce = (fn: Function, wait = 250) => {
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
    const [key, val] = item.split('=')
    query[key] = val
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

export const FileLoader = (src: string) => fetch(src).then(res => res.text())
export const CSSLoader = (src: string) => fetch(src).then(res => res.text()).then(str => `<style>${str}<\/style>`)
export const JSLoader = (src: string) => fetch(src).then(res => res.text()).then(str => `<script type="text/javascript">${str}<\/script>`)

export const encode = (value: string) => {
  return compressToEncodedURIComponent(value)
}

export const decode = (value: string) => {
  return decompressFromEncodedURIComponent(value) || ''
}
