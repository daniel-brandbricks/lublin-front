// import store from '@/store';

import HelloWorld from '@/components/HelloWorld'
import Test from '@/views/Test'
import TestContent from '@/views/TestContent'

// official
import Www from '@/views/www/Www'
import SchoolAndClubList from '@/views/schools-and-clubs/SchoolAndClubList'
import SportObjects from '@/views/sport-objects/SportObjects'
import ParticipantGroups from '@/views/participant-groups/ParticipantGroups'
import SchoolAndClubForm from '@/views/schools-and-clubs/SchoolAndClubForm'

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

    // Schools And Clubs
    {
      path: 'schools-and-clubs/:tab',
      name: 'schools.and.clubs',
      component: SchoolAndClubList
    },
    {
      path: 'school-or-club',
      name: 'school.or.club',
      component: SchoolAndClubForm
    },

    // Sport Objects
    {
      path: 'sport-objects',
      name: 'sport.objects',
      component: SportObjects
    },

    // Participant Groups
    {
      path: 'participant-groups',
      name: 'participant.groups',
      component: ParticipantGroups
    },
  ]
}

export default adminRouter
