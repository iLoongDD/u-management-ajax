# u-management-ajax

一、内容

1、主要是一个基于node的express+mongoose+ejs的用户管理系统，实现数据的增删改查，初学者作品，不过该有的都有。

2、刚开始看的时候，就去github上下载了别人的项目研究，说是实现了数据的增删改查，运行一看，果真是实现了数据的增删改查，简单粗暴，一点点样式格式都没有。

3、首先我是一个注重美观的人，所以我的页面最起码是可以看的，不会只有一个框在那边，大家放心食用

4、由于是第一个作品，学了半个月吧，有不合适的地方大家可以指出来

5、刚学了git教程，容我乱蹦跶会。

二、食用流程

1、首先你得安装nodejs+mongodb+express(4.X),这个我就帮不了你们了

2、进入项目路径cd u-management&&npm install,安装所需要的模块

3、进入mongodb的bin目录下启动数据库，cd bin , mongod --dbpath ../u-management/(设置u-management文件夹为我们工程的存储目录并启动数据库，所以你得先建一个u-management文件夹，如果不是在mongodb路径下，记得修改上面的文件夹路径)

4、数据库准备好了，启动项目 npm start，在浏览器输入localhost:3000查看（首页只有一个人员管理是可以点击的，其他的只是为美观，大家无视）

5、目前项目中所有的数据交互都是通过模板渲染，每次都需要重新加载整个页面，我想大家都知道有ajax的存在，最近正在整体修改，实现数据的局部刷新

三、实现ajax弹框添加更新数据，传送：https://github.com/hddck/user-management-node