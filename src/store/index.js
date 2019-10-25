import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  let moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const one = moduleName.indexOf('/index')
  const value = modulesFiles(modulePath)
  if (one !== -1) {
    moduleName = moduleName.replace(/\/index/, '')
    modules[moduleName] = value.default
  }
  return modules
}, {})
const store = new Vuex.Store({ modules })
export default store
