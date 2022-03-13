
# Demo & 演示

### 创建一个空的 Sandbox

```html
<div id="sandbox-demo1"></div>

<script>
  new MiniSandbox({
    el: '#sandbox-demo1',
    files: {
      'index.html': {}
    }
  })
</script>
```

<div id="sandbox-demo1"></div>

<br /><br /><br />

### 多个标签页渲染不同内容

```html
<div id="sandbox-demo2"></div>

<script>
  new MiniSandbox({
    el: '#sandbox-demo2',
    files: {
      '标题组件': {
        defaultValue: `
<h1>标题一</h1>
<h2>标题二</h2>
<h3>标题三</h3>
<h4>标题四</h4>
<h5>标题五</h5>
<h6>标题六</h6>
        `
      },
      '按钮组件': {
        defaultValue: `
<button onclick="alert('你好')">鼠标单击</button>
<button ondblclick="alert('嗨!~')">鼠标双击</button>
        `
      }
    }
  })
</script>
```

<div id="sandbox-demo2"></div>

<br /><br /><br />

### 内置 css 和 js 代码

```html
<div id="sandbox-demo3"></div>

<script>
  new MiniSandbox({
    el: '#sandbox-demo3',
    files: {
      'index.html': {
        defaultValue: '<div class="box">这是一个盒子</div>',
        css: `
          .box {
            width: 100px;
            height: 100px;
            background: #ccc;
          }
        `,
        js: `
          const box = document.querySelector('.box')
          box.addEventListener('click', e => {
            console.log(e)
            alert('嘿嘿😋')
          })
        `
      }
    }
  })
</script>
```

<div id="sandbox-demo3"></div>

<br /><br /><br />

### 展示任意 组件库 的代码

这里以 Bootstrap5 为例, 你可以放置你自己想展示的组件库 CDN 链接

```html
<div id="sandbox-demo4"></div>

<script>
  new MiniSandbox({
    el: '#sandbox-demo4',
    files: {
      'Buttons': {
        defaultValue: `
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
        `,
      },
      'Dropdowns': {
        defaultValue: `
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
        `
      }
    },
    publicResources: {
      css: 'body { margin: 10px }',
      cssLibs: ['https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'],
      jsLibs: ['https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'],
    }
  })
</script>
```

<div id="sandbox-demo4"></div>

<br /><br /><br />


<script>
  new MiniSandbox({
    el: '#sandbox-demo1',
    files: {
      'index.html': {}
    }
  })
  
  new MiniSandbox({
    el: '#sandbox-demo2',
    files: {
      '标题组件': {
        defaultValue: `
<h1>标题一</h1>
<h2>标题二</h2>
<h3>标题三</h3>
<h4>标题四</h4>
<h5>标题五</h5>
<h6>标题六</h6>
        `
      },
      '按钮组件': {
        defaultValue: `
<button onclick="alert('你好')">鼠标单击</button>
<button ondblclick="alert('嗨!~')">鼠标双击</button>
        `
      }
    }
  })

  new MiniSandbox({
    el: '#sandbox-demo3',
    files: {
      'index.html': {
        defaultValue: '<div class="box">这是一个盒子</div>',
        css: `
          .box {
            width: 100px;
            height: 100px;
            background: #ccc;
          }
        `,
        js: `
          const box = document.querySelector('.box')
          box.addEventListener('click', e => {
            console.log(e)
            alert('嘿嘿😋')
          })
        `
      }
    }
  })

  new MiniSandbox({
    el: '#sandbox-demo4',
    files: {
      'Buttons': {
        defaultValue: `
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
        `,
      },
      'Dropdowns': {
        defaultValue: `
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
        `
      }
    },
    publicResources: {
      css: 'body { margin: 10px }',
      cssLibs: ['https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'],
      jsLibs: ['https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'],
    }
  })
</script>
