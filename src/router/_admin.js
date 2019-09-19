// import store from '@/store';

import HelloWorld from '@/components/HelloWorld'
import Test from '@/views/Test'

const adminRouter = {
  path: '/admin',
  // redirect: 'admin/home',
  component: () => import('./../templates/Admin.vue'),
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

export default adminRouter;
