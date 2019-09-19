import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'

// modules
import mainRouter from '@/router/_main'
import adminRouter from '@/router/_admin'
import { login, dev } from '@/router/_other'

Vue.use(Router)

const routes = [
  mainRouter,
  adminRouter,
  login,
  dev
]

console.log(routes)

const router = new Router({routes, mode: 'history'})

router.beforeEach((to, from, next) => {
  console.log('before each route')
  next()
})

export default router
