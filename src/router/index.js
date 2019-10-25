import Vue from 'vue'
import Router from 'vue-router'
import appRoutes from './appRoutes'
Vue.use(Router)

const createRouter = () => new Router({
  mode: 'hash', //history,hash
  base: process.env.BASE_URL,
  routes: appRoutes
})

const router = createRouter()

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// reset router
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
export default router
