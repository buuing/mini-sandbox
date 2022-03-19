// @ts-ignore
import { transform } from '@babel/standalone'

const SandBoxReactLoader = (value: string) => {
  const script = transform(value, {
    presets: ['react'],
  }).code
  return `
    <div id="container"></div>
    <script>
      setTimeout(() =>   {
        ${script}
      })
    </script>
  `
}

export default SandBoxReactLoader
