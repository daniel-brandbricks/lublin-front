// import store from '@/store';

import HelloWorld from '@/components/HelloWorld'
import Test from '@/views/Test'
import TestContent from '@/views/TestContent'

// official
import Www from '@/views/www/Www'
import SchoolsAndClubs from '@/views/schools-and-clubs/SchoolsAndClubs'
import SportObjects from '@/views/sport-objects/SportObjects'

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
    },
    {
      path: 'test-content',
      name: 'test.content',
      component: TestContent
    },

    // official

    {
      path: 'www',
      name: 'www',
      component: Www
    },
    {
      path: 'schools-and-clubs',
      name: 'schools.and.clubs',
      component: SchoolsAndClubs
    },

    {
      path: 'sport-objects',
      name: 'sport.objects',
      component: SportObjects
    },
  ]
}

export default adminRouter
