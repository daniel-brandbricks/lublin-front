<template>
<div  class="container">
  <b-row class="justify-content-center">
    <b-col cols="12">
      <TabLinks :links="tabLinks"></TabLinks>
      <template>
        <FormMainData :participantGroup="participantGroup" @childSubmit="submit" ref="FormMainData"
                      :key="$route.params.tab+'FormMainData'" v-show="$route.params.tab === 'main-data'"/>
<!--        Component for ParticipantEntity   -->
        <FormParticipants :participantGroup="participantGroup" :isValidForm="isValidForm" @childSubmit="submit" ref="FormParticipants"
                          :key="$route.params.tab+'FormParticipants'" v-show="$route.params.tab === 'participants'"/>
<!--        Component for todo Entity isValidForm for ALL  -->
        <FormActivities :participantGroup="participantGroup" @childSubmit="submit" ref="FormActivities"
                        :key="$route.params.tab+'FormActivities'" v-show="$route.params.tab === 'activities'"/>
<!--        Component for todo Entity   -->
        <FormCalendar :participantGroup="participantGroup" @childSubmit="submit" ref="FormCalendar"
                        :key="$route.params.tab+'FormCalendar'" v-show="$route.params.tab === 'calendar'"/>
<!--        Component for todo Entity   -->
        <FormFrequency :participantGroup="participantGroup" @childSubmit="submit" ref="FormFrequency"
                        :key="$route.params.tab+'FormFrequency'" v-show="$route.params.tab === 'frequency'"/>
<!--        Component for todo Entity   -->
        <FormMTSF :participantGroup="participantGroup" @childSubmit="submit" ref="FormMTSF"
                        :key="$route.params.tab+'FormMTSF'" v-show="$route.params.tab === 'mtsf'"/>
      </template>
    </b-col>
  </b-row>
</div>
</template>

<script>

import TabLinks from '@/components/TabLinks'
import EventBusEmit from '@/mixins/event-bus-emit'
import FormMixin from '@/mixins/form-mixin'

import FormParticipants from '@/views/participant-groups/components/FormParticipants'
import FormMainData from '@/views/participant-groups/components/FormMainData'
import FormActivities from '@/views/participant-groups/components/FormActivities'
import FormCalendar from '@/views/schools-and-clubs/components/FormCalendar'
import FormFrequency from '@/views/schools-and-clubs/components/FormFrequency'
import FormMTSF from '@/views/participant-groups/components/FormMTSF'

import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'ParticipantGroupsForm',
  components: {
    TabLinks,
    Treeselect,
    FormMainData,
    FormParticipants,
    FormActivities,
    FormCalendar,
    FormFrequency,
    FormMTSF
  },
  mixins: [EventBusEmit, FormMixin],
  data () {
    return {

      participantGroup: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        participants: [
          1
        ],

        // checkbox
        selectedGender: [],
        selectedType: [],
        genderOptions: [
          {text: 'kobieta', value: 0},
          {text: 'mężczyzna', value: 1}
        ],

        // treeselect
        disciplines: [
          {id: 1, label: 'Basen'},
          {id: 2, label: 'Siłownia'},
          {id: 3, label: 'Bieg'}
        ],
        categories: [
          {id: 1, label: 'pierwsza'},
          {id: 2, label: 'druga'},
          {id: 3, label: 'cos cos'}
        ],
        classes: [
          {id: 1, label: '2b'},
          {id: 2, label: '6a'},
          {id: 3, label: '8c'}
        ]
      },

      tabLinks: [
        {
          title: 'Dane ogólne',
          link: 'participant.group',
          tab: 'main-data'
        },
        {
          title: 'Zawodnicy',
          link: 'participant.group',
          tab: 'participants',
          method: 'checkValidMainForm'
        }
      ],

      selectedDiscipline: null,
      selectedCategory: null,
      selectedClass: null,
      // temp

      isValidForm: false
    }
  },
  methods: {
    // todo add, remove
    addParticipant (participantDefault) {
      let copy = {...participantDefault}
      this.participantGroup.participants.push(copy)
    },
    removeParticipant (index) {
      this.participantGroup.participants.splice(index, 1)
    },
    checkValidMainForm () {
      this.$refs.FormMainData.checkValidForm()
        .then((result) => {
          this.isValidForm = result
        })
    },
    goToFormTab (tabName, params = {}) {
      this.checkValidMainForm()
      let defaultParams = {...{'tab': tabName, 'id': this.id}, ...params}
      this.$router.push({name: 'participant.group', params: defaultParams})
    },
    submit () {
      let participant = this.participant
      console.log(this.participant)

      const method = this.id === undefined ? 'postParticipant' : 'putParticipant'
      this.$store.dispatch(method, participant)
        .then(() => {
          this.postSubmitRedirect('participant.groups')
        })
        .catch((error) => {
          this.postSubmitError(error)
        })
    }
  },
  created () {
    if (this.$route.params.tab === undefined) {
      this.$router.push({name: 'participant.group', params: {'tab': 'main-data'}})
    }
    if (this.id) {
      this.$store.dispatch('getParticipant', {id: this.id})
        .then((response) => {
          this.participantGroup = response

          this.tabLinks = [
            {
              title: 'Dane ogólne',
              link: 'participant.group',
              tab: 'main-data'
            },
            {
              title: 'Zawodnicy',
              link: 'participant.group',
              tab: 'checkValidMainForm'
            },
            {
              title: 'Zajęcia',
              link: 'participant.group',
              tab: 'activities'
            },
            {
              title: 'Kalendarz',
              link: 'participant.group',
              tab: 'calendar'
            },
            {
              title: 'Frekwencja',
              link: 'participant.group',
              tab: 'frequency'
            },
            {
              title: 'MTSF',
              link: 'participant.group',
              tab: 'mtsf'
            }
          ]
        })
    }

    /** @buttonLink route name || false if button must be hidden */
    this.changeAdminNavbarButton({buttonLink: false})
    let breadcrumbs = [{text: 'Lista zawodników', to: {name: 'participant.groups', params: {'tab': 'confirmed'}}},
      {text: this.id ? this.participantGroup.name : 'Nowa', active: true}]
    this.changeAdminNavbarBreadcrumbs(breadcrumbs)
  }
}
</script>

<style scoped>

</style>
