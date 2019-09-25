import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

// modules
import mainRouter from '@/router/_main'
import adminRouter from '@/router/_admin'
import { login, dev, my } from '@/router/_other'

Vue.use(Router)

const routes = [
  mainRouter,
  adminRouter,
  login,
  dev,
  my
]

console.log(routes)

const router = new Router({routes, mode: 'history'})

router.beforeEach((to, from, next) => {

  // check admin access
  let isAdminRoute = to.fullPath.indexOf('/admin/') !== -1
  if (isAdminRoute && !store.getters.isLoggedIn) {
    next('/login');
  }

  console.log('before each route')
  next()
})

export default router
