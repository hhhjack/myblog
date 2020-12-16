# myblog
nodejs+express+mongodb



### 项目要求

注册页：填写用户名、账号、密码、上传头像

登录页：填写账号、密码

发布文章页：填写文章标题、文章内容

文章列表页：显示文章标题、文章作者、文章发布时间、分页

文章详情页：显示文章标题、文章坐着、文章发布时间、文章内容、点击编辑按钮能修改文章、点击删除按钮能删除文章

文章评论



### ejs文件

- <% %>: 包含的是js代码，如if-else

- <%= %> : 用于显示替换过的html特殊字符的内容，如上面的<%= title %>即显示的是由js文件中res.render()函数传递过来的title的值

- <%- %>：用来包含一段html的原始内容，比如所有页面通常会有一个共用的信息，比如一些包含的css文件，比如页面顶端的一些显示，为了避免在每个ejs文件里重复写，我们可以单独写一个header.ejs文件，然后在其他ejs文件里通过<%- include header %>来直接调用这个文件，其效果相当于将整个header.ejs文件复制过去



- ejs文件存放在views文件夹中，顾名思义，它们负责的是每个页面的样式的;我们在使用express建立项目时，命令里的-e事实上就是制定了使用ejs作为模板引擎



### res & req

- 在html的表单属性中会指明用哪种方法发送请求<form method=' '，可能是get也可能是post
- 博客内容通过post方法提交
- 查询时的字段通过get方法提交
- req.query: 处理get请求，获取get请求参数。
- req.body: 处理post请求
- req.params: 处理形如/:xxx形式的get或者post请求




# API 文档

## 注册

- url: http://127.0.0.1/api/reg
- method: post
- {
    username: '',
    email: '',
    password: ''
}
- 返回值：code
    - 0: username为空
    - 1：email为空
    - 2：password为空
- 3：数据库发生错误
    - 500：用户名已存在
    - 200：注册成功



## 上传头像

- url: http://127.0.0.1/api/upload
- method: post
- {
   photofile: 
  }
- 返回值：
  - 0：上传失败
  - 1：写入失败
  - 200：上传成功




## 登陆

- url: http://127.0.0.1/api/login
- method: post
- {
    username: '',
    password: ''
}
- 返回值
    - 0：用户不存在
    - 1：密码错误
    - 200： 登陆成功



## 获取头像

- url: http://127.0.0.1/api/login/:username
- method: get
- 



## 分页查询

- url: http://127.0.0.1/api/home/pagelist

- method: post

- {

  ​	page: '',

  ​	rows: ''

  }

- 返回值

  - 0：已经到最后一个页面

  - 200：

    {
        time: 2020-12-04T12:10:35.234Z,
        _id: 5fca27cff732d76348dd8dab,
        title: '1241' ,

    ​	author: '123'

     },

    page: ''



## 发布文章

- url:  http://127.0.0.1/api/home/publish/:username

- method: post

- {

  ​	title: "",

  ​	content: ""

  }

- 返回值：

  - 0：文章名不能为空
  - 1：内容不能为空
  - 2： 数据库发生错误
  - 200： success



## 查询文章详情

- url: http://127.0.0.1/api/home/detail/:id

- method: get

- 返回值：

  - 0： 未找到该文章

  - 200： success

    {

    ​	time: 2020-12-10T08:43:04.370Z,
      _id: 5fd1df989d0c2929cc71c02f,
      title: '关于疫情的感悟',
      author: '123',
      content: '饿啊温热威锋网',
      comments: []

    }



## 删除文章

- url: http://127.0.0.1/api/home/del/:id
- method: get
- 返回值：
  - 0: 删除失败
  - 200：删除成功



## 修改文章

- url: http://127.0.0.1/api/home/edit/:id

- method: post

- {

  ​	title: '',

  ​	content: ''

  }

- 返回值：

  - 0: 修改失败
  - 200：修改成功



## 添加评论

- url: http://127.0.0.1/api/home/comment/:id/:username

- method: post

- {

  ​	message: ''

  }

- 返回值：

  - 0: 修改失败
  - 200：修改成功