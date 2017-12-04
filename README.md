## vue全家桶制作音乐播放器,调用QQ音乐api
## 技术栈
<pre>
axios
vuex
vue-router
better-scroll
webpack
express
</pre>
> 作者：TQH
## 源代码
源代码地址：[GitHub]()  
## 预览图
![Vue音乐播放器]()
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
### 目录结构
<pre>

├── README.md           
├── config             // 项目不同环境的配置
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── api         // 接口
│   │	├── config.js
│   │	├── recommend.js
│   │	├── singer.js
│   │	└── song.js
│   ├── base     // 子组件
│   │	├── listView
│   │	├── loading
│   │	├── header.vue
│   │	├── progress-bar
│   │	├── scroll
│   │	├── song-list
│   │	├── slider
│   ├── commom          // 公共样式
│   │	├── fonts
│   │	├── images
│   │	├── js
│   │	├── syulus
│   ├── components   //  父组件
│   ├── router   //  路由
│   ├── store   //  vuex状态管理器
│   │	├── action.js
│   │	├── getters.js
│   │	├── index.js
│   │	├── mutation-type.js
│   │	├── mutation.js
│   │	├── state.js
│   ├── App.vue        
│   └── main.js        // Webpack 预编译入口
</pre>
### 已实现功能：

- [x]   歌手列表
- [x]   歌手详情
- [x]   随机播放
- [x]   循环播放
- [x]   顺序播放
- [x]   播放详情页
- [x]   切换拖拽

### 运行项目
```
npm install
npm run dev
```
