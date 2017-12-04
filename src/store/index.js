import vue from 'vue'
import Vuex from 'vuex'

import * as actions from './action.js'
import mutations from './mutation.js'
import * as getters from './getters.js'
import state from './state.js'

import createLogger from 'vuex/dist/logger' //  打印出报告

//  如果是 npm run dev   就为true     npm run build   就为false
const debug = process.env.NODE_ENV !== 'production'
vue.use(Vuex)
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    strict: debug, //  是否启用严格模式
    plugins: debug ? [createLogger()] : []
})