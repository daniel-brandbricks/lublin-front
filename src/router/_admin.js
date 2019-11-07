// import store from '@/store';

import HelloWorld from '@/components/HelloWorld'
import Test from '@/views/Test'
import TestContent from '@/views/TestContent'

// official
import Www from '@/views/www/Www'
import SchoolAndClubList from '@/views/schools-and-clubs/SchoolAndClubList'
import SportObjectsList from '@/views/sport-objects/SportObjectsList'
import ParticipantGroups from '@/views/participant-groups/ParticipantGroups'
import SchoolAndClubForm from '@/views/schools-and-clubs/SchoolAndClubForm'
import SportObjectForm from '@/views/sport-objects/SportObjectForm'
import Dashboard from '@/views/dashboard/Dashboard'
import Leaders from '@/views/leaders/Leaders'
import Participants from '@/views/participants/Participants'
import Lessons from '@/views/lessons/Lessons'
import Calendar from '@/views/calendar/Calendar'
import Frequency from '@/views/fregucncy/Frequency'

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
      path: 'dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: 'www/:tab?',
      name: 'www',
      component: Www
    },

    // Schools And Clubs
    {
      path: 'schools-and-clubs/:tab?',
      name: 'schools.and.clubs',
      component: SchoolAndClubList
    },
    {
      path: 'school-or-club/:tab?/:id?',
      name: 'school.or.club',
      component: SchoolAndClubForm
    },

    // Sport Objects
    {
      path: 'sport-objects/:tab?',
      name: 'sport.objects',
      component: SportObjectsList
    },
    {
      path: 'sport-object/:tab?/:id?',
      name: 'sport.object',
      component: SportObjectForm
    },

    // Leaders
    {
      path: 'leaders/:tab?',
      name: 'leaders',
      component: Leaders
    },
    {
      path: 'leader/:id?',
      name: 'leader',
      // todo
      component: Leaders
    },

    // Participant Groups
    {
      path: 'participant-groups',
      name: 'participant.groups',
      component: ParticipantGroups
    },
    {
      path: 'participant-group/:id?',
      name: 'participant.group',
      // todo
      component: ParticipantGroups
    },

    // Participants
    {
      path: 'participants',
      name: 'participants',
      component: Participants
    },
    {
      path: 'participant/:id?',
      name: 'participant',
      // todo
      component: ParticipantGroups
    },

    // Lessons list
    {
      path: 'lessons',
      name: 'lessons',
      component: Lessons
    },
    {
      path: 'lesson/:id?',
      name: 'lesson',
      // todo
      component: ParticipantGroups
    },

    // Calendar
    {
      path: 'calendar/:tab?',
      name: 'calendar',
      component: Calendar
    },

    // Frequency
    {
      path: 'frequency',
      name: 'frequency',
      component: Frequency
    }
  ]
}

export default adminRouter
