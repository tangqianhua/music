// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import lazyLoad from 'vue-lazyload'

import store from './store'
import fastclick from 'fastclick'
// 解决移动端点击300毫秒的延迟
fastclick.attach(document.body)
Vue.config.productionTip = false
import 'common/stylus/index.styl'
/* eslint-disable no-new */
Vue.use(lazyLoad, {
    loading: require('common/image/default.png')
})
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
})