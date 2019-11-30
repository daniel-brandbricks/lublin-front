// import store from '@/store';

import Home from '@/views/dev/Home'
import Test from '@/views/dev/Test'
import Sports from '@/views/dev/Sports'
import SportsInner from '@/views/dev/SportsInner'
import SportEvents from '@/views/dev/SportEvents'
import SportEventsInner from '@/views/dev/SportEventsInner'
import SportProjects from '@/views/dev/SportProjects'
import SportClasses from '@/views/dev/SportsClasses'
import SKS from '@/views/dev/SKS'

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
      path: 'sports',
      name: 'sports',
      component: Sports
    },
    {
      path: 'sports-inner',
      name: 'sportsInner',
      component: SportsInner
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
    },
    {
      path: 'sport-events-inner',
      name: 'sportEventsInner',
      component: SportEventsInner
    },
    {
      path: 'sport-classes',
      name: 'sportClasses',
      component: SportClasses
    },
    {
      path: 'sks',
      name: 'sks',
      component: SKS
    }
  ]
}

export default mainRouter
