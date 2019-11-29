// import store from '@/store';

import Home from '@/views/dev/Home'
import Test from '@/views/dev/Test'
import SportEvents from '@/views/dev/SportEvents'
import SportProjects from '@/views/dev/SportProjects'

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
    },
    {
      path: 'sport-projects',
      name: 'sportProjects',
      component: SportProjects
    },
    {
      path: 'sport-events',
      name: 'sportEvents',
      component: SportEvents
    }
  ]
}

export default mainRouter
