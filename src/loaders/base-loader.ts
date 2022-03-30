import { LoaderFunctionType } from '../type'

const BaseLoader: LoaderFunctionType = async function(context) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mini Sandbox</title>
      <\/head>
      <body>
        ${context}
      <\/body>
    <\/html>
  `
}

export default BaseLoader
