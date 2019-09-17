import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import HelloWorld from '@/components/HelloWorld'
import Test from '@/views/Test'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'primary',
    component: () => import(/* webpackChunkName: "about" */ './../templates/Default.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: HelloWorld
      },
      {
        path: '/test',
        name: 'test',
        component: Test
      },
    ]
  }
]

const router = new Router({routes, mode: 'history'})

router.beforeEach((to, from, next) => {
  console.log('before each route')
  next()
})

export default router
