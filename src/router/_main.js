// import store from '@/store';

import HelloWorld from '@/components/HelloWorld'
import Test from '@/views/Test'

const mainRouter = {
  path: '/',
  // redirect: '/home',
  component: () => import('./../templates/Main.vue'),
  children: [
    {
      path: 'home',
      name: 'home',
      component: HelloWorld
    },
    {
      path: 'test',
      name: 'test',
      component: Test
    }
  ]
}

export default mainRouter
