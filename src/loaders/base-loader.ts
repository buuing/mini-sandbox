import { LoaderFunctionType } from '../type'
import { ElementGenerator } from '../utils'

const BaseLoader: LoaderFunctionType = async function(context) {
  const { publicResources } = this
  const cssLibs = await Promise.all(publicResources.cssLibs.map(src => this.getResources(src, 'style')))
  const jsLibs = await Promise.all(publicResources.jsLibs.map(src => this.getResources(src, 'script')))
  cssLibs.push(ElementGenerator(publicResources.css, 'style'))
  const script = ElementGenerator(publicResources.js, 'script')
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mini Sandbox</title>
        ${cssLibs.join('\n')}
      <\/head>
      <body>
        ${jsLibs.join('\n')}
        ${context}
        ${script}
      <\/body>
    <\/html>
  `
}

export default BaseLoader
