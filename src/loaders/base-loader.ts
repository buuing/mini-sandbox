import { LoaderFunctionType } from '../type'

const BaseLoader: LoaderFunctionType = async function(context, config) {
  const { publicConfig } = this
  const headStr = [...publicConfig.head, ...config.head].map(([name, attr, content]) => {
    let attrStr = ''
    for (const key in attr) {
      attrStr += ` ${key}="${attr[key]}"`
    }
    return `<${name}${attrStr}>${content}</${name}>`
  })
  return `
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Mini Sandbox</title>
      ${headStr}
    <\/head>
    <body>
      ${context}
    <\/body>
  `
}

export default BaseLoader
