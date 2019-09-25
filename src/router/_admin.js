// import store from '@/store';

import HelloWorld from '@/components/HelloWorld'
import Test from '@/views/Test'
import TestContent from '@/views/TestContent'

// official
import SchoolsAndClubsList from '@/views/SchoolsAndClubsList'
import Www from '@/views/www/Www'

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
      path: 'schools-and-clubs',
      name: 'schools.and.clubs',
      component: SchoolsAndClubsList
    },
    {
      path: 'www',
      name: 'www',
      component: Www
    }
  ]
}

export default adminRouter
