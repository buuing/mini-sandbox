
示例 1

<!-- 
type: 'html'
name: 'index.html'
config: '{ css: '* { color: red; }' }'
value: `
<div>haha</div>

<script>
  console.log(123)
</script>
`
 -->

```html [index.html] { css: '* { color: red; }' }
<div>haha</div>

<script>
  console.log(123)
</script>
```


示例 2

<!-- 
type: 'html'
name: 'DemoPage'
config: {}
value: `<div v-for="item in [1,2,3]">{{item}}</div>`
 -->

```html [DemoPage]
<div v-for="item in [1,2,3]">{{item}}</div>
```

示例 3 (看看config能否换行, 如果不能就算了)

<!-- 
name: app.vue
config: {
  type: 'vue',
  cssLibs: ['https://unpkg.com/element-ui/lib/theme-chalk/index.css'],
  jsLibs: ['https://unpkg.com/element-ui/lib/index.js']
}
value: `
<template>
  <el-button>按钮</el-button>
</template>
`
 -->

```vue [app.vue] {
  type: 'vue',
  cssLibs: ['https://unpkg.com/element-ui/lib/theme-chalk/index.css'],
  jsLibs: ['https://unpkg.com/element-ui/lib/index.js']
}
<template>
  <el-button>按钮</el-button>
</template>
```

示例 4 (三个 tab 页在一起, 因为他们之间没有换行, 看看能不能在正则里把这三个匹配到一起, 这个是参考了 leetcode 题解编辑器中的代码块)

<!-- 
[
  {
    name: 'index.html'
    type: 'html'
    value: '<div class="box">haha</div>'
  },
  {
    name: 'style.css'
    type: 'css'
    value: '.box { color: red; }'
  },
  {
    name: 'app.js'
    type: 'js'
    value: 'console.log(document.querySelector('.box'))'
  }
]
 -->

```html [index.html]
<div class="box">haha</div>
```
```css [style.css]
.box { color: red; }
```
```js [app.js]
console.log(document.querySelector('.box'))
```


<!-- 
```html ${defaultConfig}
<div></div>
```

```html <firstConfig>
<div></div>
```

```html [defaultConfig]
<div></div>
``` -->



