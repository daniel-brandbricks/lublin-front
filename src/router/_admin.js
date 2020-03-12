// import store from '@/store';

// import HelloWorld from '@/components/HelloWorld'
// import Test from '@/views/dev/Test'
import TestContent from '@/views/TestContent'

// official
import Www from '@/views/www/Www'
import SchoolAndClubList from '@/views/schools-and-clubs/SchoolAndClubList'
import SportObjectsList from '@/views/sport-objects/SportObjectsList'
import ParticipantGroups from '@/views/participant-groups/ParticipantGroups'
import SchoolAndClubForm from '@/views/schools-and-clubs/SchoolAndClubForm'
import SportObjectForm from '@/views/sport-objects/SportObjectForm'
import Dashboard from '@/views/dashboard/Dashboard'
import LeadersList from '@/views/leaders/LeadersList'
import ParticipantList from '@/views/participants/ParticipantList'
import LessonsList from '@/views/lessons/LessonsList'
import LessonForm from '@/views/lessons/LessonForm'
import Calendar from '@/views/calendar/Calendar'
import Frequency from '@/views/fregucncy/Frequency'
import CoAdministrators from '@/views/co-administrators/CoAdministrators'
import Messages from '@/views/messages/Messages'
import Dictionary from '@/views/dictionary/Dictionary'
import MTSF from '@/views/MTSF/MTSF'
import Events from '@/views/events/Events'
import Reports from '@/views/reports/Reports'
import ParticipantGroupsForm from '@/views/participant-groups/ParticipantGroupsForm'
import History from '@/views/history/History'
import LeaderForm from '@/views/leaders/LeaderForm'
import ParticipantForm from '@/views/participants/ParticipantForm'
import CoAdministrator from '@/views/co-administrators/CoAdministrator'
import Profile from '@/views/Profile'
import CmsFormMainData from '@/views/www/components/CmsFormMainData'
import MenuItemData from '@/views/www/components/MenuItemData'

const adminRouter = {
  path: '/admin',
  // redirect: 'admin/home',
  component: () => import('./../templates/Admin.vue'),
  children: [
    // {
    //   path: 'home',
    //   name: 'home',
    //   component: HelloWorld
    // },
    // {
    //   path: 'test',
    //   name: 'test',
    //   component: Test
    // },
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
    {
      path: 'www/cms-section/:id?',
      name: 'cms.section',
      component: CmsFormMainData
    },
    {
      path: 'www/menu/item-data/:id?',
      name: 'menu.item.data',
      component: MenuItemData
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
      component: LeadersList
    },
    {
      path: 'leader/:tab/:id?',
      name: 'leader',
      component: LeaderForm
    },

    // Participant Groups
    {
      path: 'participant-groups',
      name: 'participant.groups',
      component: ParticipantGroups
    },
    {
      path: 'participant-group/:tab?/:id?',
      name: 'participant.group',
      component: ParticipantGroupsForm
    },

    // Participants
    {
      path: 'participants',
      name: 'participants',
      component: ParticipantList
    },
    {
      path: 'participant/:tab?/:id?',
      name: 'participant',
      component: ParticipantForm
    },

    // Lessons list
    {
      path: 'lessons/:tab?',
      name: 'lessons',
      component: LessonsList
    },
    {
      path: 'lesson/:tab?/:id?',
      name: 'lesson',
      component: LessonForm
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
    },
    // MTSF List
    {
      path: 'mtsf',
      name: 'mtsf',
      component: MTSF
    },

    // Event List
    {
      path: 'events/:tab?',
      name: 'events',
      component: Events
    },
    {
      path: 'event/:id?',
      name: 'event',
      // todo
      component: ParticipantGroups
    },

    // Reports
    {
      path: 'reports/:tab?',
      name: 'reports',
      component: Reports
    },

    // Dictionary
    {
      path: 'dictionary/:tab?',
      name: 'dictionary',
      component: Dictionary
    },

    // History
    {
      path: 'history/:tab?',
      name: 'history',
      component: History
    },

    // CO-ADMINISTRATOR
    {
      path: 'co-administrators',
      name: 'co.administrators',
      component: CoAdministrators
    },
    {
      path: 'co-administrator/:id?',
      name: 'co.administrator',
      component: CoAdministrator
    },

    // Messages
    {
      path: 'messages',
      name: 'messages',
      component: Messages
    },

    // Profile
    {
      path: 'profile',
      name: 'profile',
      component: Profile
    }
  ]
}

export default adminRouter
