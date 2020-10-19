import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

// modules
import { mainRouter, buildRouter } from '@/router/_main'
import adminRouter from '@/router/_admin'
import { login, dev, my, confirmMail, changeMail, resetPassword, confirmSchool } from '@/router/_other'
import _auth from '@/store/_auth'

Vue.use(Router)

const routes = [
  mainRouter,
  buildRouter,
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

function getCookie (name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return false
}

router.beforeEach((to, from, next) => {
  // check admin access
  let isAdminRoute = to.fullPath.indexOf('/admin/') !== -1
  if (isAdminRoute) {
    var res = getCookie('authl')
    if (res !== '1') {
      console.log('home here')
      // next('/home')
    }
  }

  next()
})

export default router
