
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


### 测试3, 配置内置css和js

```html [demo-css-js] { css: 'div { color: red }', js: 'console.log("测试4")' }
<div>这是一个盒子</div>
```

### 测试4, 配置改用全局变量

```html [test.html] ${ldqConfig}
<div>这是一个盒子</div>
```


### 测试5, 两个代码块分两个盒子显示

- 因为这两个代码块中间有空行, 所以分成两个盒子渲染

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


### 测试6, 两个代码块合并在一起显示

- 这两个代码块是连在一起的, 所以他们两个在同一个盒子中, 表现为 2 个标签页

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

### 测试7, 三个代码块合并在一起显示

- 这三个代码块是连在一起的, 所以他们三个在同一个盒子中, 表现为 3 个标签页

```html [demo1]
<div style="border: 1px solid red">红盒子</div>
```
```html [demo2]
<div style="border: 1px solid blue">蓝盒子</div>
```
```html [demo3]
<div style="border: 1px solid green">绿盒子</div>
```

### 测试8, 代码块中夹杂着反引号

- 这个应该要匹配到, 因为中间并没有被连续三个反引号打断

```js [aaa.js]
const a = `ad`
const b = `${a}123`
```
