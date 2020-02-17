import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

// modules
import mainRouter from '@/router/_main'
import adminRouter from '@/router/_admin'
import { login, dev, my, confirmMail, changeMail, resetPassword, confirmSchool } from '@/router/_other'

Vue.use(Router)

const routes = [
  mainRouter,
  adminRouter,
  login,
  dev,
  my,
  confirmSchool,
  confirmMail,
  changeMail,
  resetPassword
]

const router = new Router({routes, mode: 'history'})

router.beforeEach((to, from, next) => {
  // check admin access
  let isAdminRoute = to.fullPath.indexOf('/admin/') !== -1
  if (isAdminRoute && !store.getters.isLoggedIn) {
    next('/home')
  }

  next()
})

export default router
