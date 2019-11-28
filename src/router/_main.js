// import store from '@/store';

import Home from '@/views/dev/Home'
import Test from '@/views/dev/Test'

const mainRouter = {
  path: '/',
  // redirect: '/home',
  component: () => import('./../templates/Main.vue'),
  children: [
    {
      path: 'home',
      name: 'home',
      component: Home
    },
    {
      path: 'test',
      name: 'test',
      component: Test
    }
  ]
}

export default mainRouter
