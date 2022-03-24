
### 普通的代码块, 不需要匹配到

```html
<div style="border: 1px solid red">这是一个盒子</div>
```

### 测试1, 单行代码

```html [test]
<div style="border: 1px solid red">这是一个盒子</div>
```

### 测试2, 多行代码

```html [index.html]
<style>
  .box {
    border: 1px solid red;
  }
</style>

<div class="box">这是一个盒子</div>
```

### 测试3, 同时显示两个


```html [demo1]
<div style="border: 1px solid red">这是一个盒子</div>
```

```html [demo2]
<style>
  .box {
    border: 1px solid red;
  }
</style>
<div class="box">这是一个盒子</div>
```

### 测试4, 配置内置css和js

```html [demo-css-js] { css: 'div { color: red }', js: 'console.log("测试4")' }
<div>这是一个盒子</div>
```

### 测试5, 配置改用全局变量

```html [test.html] ${ldqConfig}
<div>这是一个盒子</div>
```

### 测试6, vue模板 (暂未增加vue-loader, 所以先注释掉export)

```vue [App.vue] { jsLibs: ['https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js'] }
<template>
  <div>111</div>
</template>

<script>
// export default {}
</script>

<style></style>
```

### 测试7, 两个代码块分开显示


```html [demo1]
<div style="border: 1px solid red">这是一个盒子</div>
```

```html [demo2]
<style>
  .box {
    border: 1px solid red;
  }
</style>
<div class="box">这是一个盒子</div>
```


### 测试8, 两个代码块合并显示

```html [testeight-demo1]
<div style="border: 1px solid red">这是一个盒子</div>
```
```html [testeight-demo2]
<style>
  .box {
    border: 1px solid red;
  }
</style>
<div class="box">这是一个盒子</div>
```

### 测试9, 两个代码块合并显示

```html [testnight-demo1]
<div style="border: 1px solid blue">这是一个盒子</div>
```
```html [testnight-demo2]
<style>
  .box {
    border: 1px solid blue;
  }
</style>
<div class="box">这是一个盒子</div>
```
