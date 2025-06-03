# Asset-based-Risk-Assessment-Platform-Frontend
HKU CS project proposal

## HOW TO DOWNLOAD AND USE
### Down load
打开Command Prompt,定位到想要放置的文件夹位置，运行
```
git clone https://github.com/Lillian-7798/Asset-based-Risk-Assessment-Platform-Frontend.git
```

### Use
本项目使用Vue3构建的项目，在运行之前需要先完成node.js和vue的安装配置，本人使用版本如下：

> node: v20.17.0

> @vue/cli 5.0.8

node.js可以用
```
node -v
```
命令来测试是否已经安装，安装教程可以参考：https://www.cnblogs.com/matanzhang/p/11441693.html


Vue可以用
```
Vue -version
```
Vue安装参考：https://cli.vuejs.org/zh/guide/installation.html

### Run
首先查看当前文件夹内是否存在node_modules文件夹，如下图：
![alt text](image.png)
如果不存在，需要执行
```
npm install
```

每次运行需要在Command Prompt中执行以下命令
```
cd arap
npm run serve
```
会出现如下情况：
![alt text]({61743D92-E48E-4925-A2AC-1A28CAA1F82D}.png)
复制地址在浏览器打开即可，记得不要删除当前terminal

## *[Important]* How to Push
! 不要把node_modules上传到github仓库

！如果有新增加插件/组件库，确保push了package.json文件，并且push之后在群里提醒大家下次运行前更新（删除node_modules文件夹，重新npm install就可以）

！push前可以选择新建一条分支上传之后处理冲突并且合并分支，或者push前先pull,在本地处理冲突后再上传。一定要再上传之前检查好本地代码是否是仓库代码的最新版本！不然仓库回滚起来比较麻烦。

（git pull/push命令简单介绍）
> git clone [url]: 克隆远程仓库到本地

> 在本地仓库文件夹下执行 git pull: 拉取远程仓库的最新版本到本地仓库

> git status: 查看仓库当前状态，显示你上次提交之后哪些文件存在更改、

> git add .: 添加当前目录下所有文件到暂存区

> git add [file] :添加指定文件到暂存区

> git commit -m "[message]" :提交暂存区的更改到本地仓库， [message]是提交附带的留言

> git push: 上传本地仓库的版本代码到远程仓库

## Dependence:
使用了element-plus组件库方便开发，参考 https://element-plus.org/zh-CN/component/overview.html

## How to write
访问网址的路由在arap/src/router/index.js中，默认访问/会跳转到/Login页面

网站的所有页面在arap/src/pages中，每个页面新建一个folder, 新建页面需要将其添加在router/index.js中，渲染页面=渲染该页面文件夹下的index.vue。可以通过修改index.vue文件达到修改页面的目的。

arap/src/components下有网站的Footer和Header。
