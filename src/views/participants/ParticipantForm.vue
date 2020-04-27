<template>
  <div class="container">
    <b-row class="justify-content-center" v-if="$route.params.id !== undefined">
      <b-col cols="12">
        <TabLinks :links="tabLinks"/>
      </b-col>
    </b-row>

    <FormMainData :participant="participant" @childSubmit="submit" ref="FormMainData" :years="years"
                  :key="$route.params.tab+'FormMainData'" v-show="$route.params.tab === 'main-data'"/>
    <FormParticipantGroups :participant="participant" ref="ParticipantList"
                           :key="$route.params.tab+'ParticipantList'"
                           v-if="$route.params.tab === 'participants-list'"/>
    <FormLessons :participant="participant" ref="LessonForm"
                 :key="$route.params.tab+'LessonForm'" v-if="$route.params.tab === 'lessons'"/>
    <FormCalendar :participant="participant.id" @childSubmit="submit" ref="FormCalendar"
                  :key="$route.params.tab+'FormCalendar'" v-if="participant.id && $route.params.tab === 'calendar'"/>
    <FormMTSF :participant="participant" @childSubmit="submit" ref="FormMTSF"
                  :key="$route.params.tab+'FormMTSF'" v-if="participant.id && $route.params.tab === 'mtsf'"/>
  </div>
</template>

<script>
  import TabLinks from '@/components/TabLinks'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'
  import FormParticipantGroups from '@/views/participants/components/FormParticipantGroups'
  import FormLessons from '@/views/participants/components/FormLessons'
  import FormMTSF from '@/views/participants/components/FormMTSF'
  import FormCalendar from '@/views/participants/components/FormCalendar'

  import FormMainData from '@/views/participants/components/FormMainData'
  import {YEARS} from '../../config/AppConfig'

  export default {
    name: 'ParticipantForm',
    components: {
      TabLinks,
      FormMainData,
      FormParticipantGroups,
      FormLessons,
      FormCalendar,
      FormMTSF
    },
    mixins: [EventBusEmit, FormMixin],
    data() {
      return {
        tabLinks: [
          {
            link: 'participant',
            tab: 'main-data'
          }
        ],
        years: YEARS,

        participant: {
          id: this.id,
          active: true,
          firstName: '',
          lastName: '',
          pesel: '',
          year: null,
          sex: 1,
          school: {
            id: null
          },
          // category: {
          //   id: null
          // },
          // class: {
          //   id: null
          // },

          disciplines: []
        },

        participantYearsSelected: [],
        genderOptions: [
          {text: 'kobieta', value: 0},
          {text: 'mężczyzna', value: 1}
        ],

        isValidForm: false
      }
    },
    computed: {},
    methods: {
      setDataFromExistedParticipant(participant) {
        let disciplines = participant.disciplines || []
        for (let index in disciplines) {
          this.participantYearsSelected.push({years: disciplines[index].year})
        }
      },
      prepareToSubmit(participant) {
        let disciplines = participant.disciplines || []
        let disciplinesPrepared = []
        for (let disciplinesIndex in disciplines) {
          disciplinesPrepared.push(disciplines[disciplinesIndex].id)
        }
        participant.disciplines = disciplinesPrepared

        let participantGroups = participant.participantGroups || []
        let participantGroupsPrepared = []
        for (let index in participantGroups) {
          participantGroupsPrepared.push(participantGroups[index].participantGroup.id)
        }
        participant.participantGroups = participantGroupsPrepared

      },
      checkValidMainForm() {
        this.$refs.FormMainData.checkValidForm()
          .then((result) => {
            this.isValidForm = result
          })
      },
      addDiscipline() {
        this.participant.disciplines.push({})
      },
      removeDiscipline(index) {
        this.participant.disciplines.splice(index, 1)
      },
      prepareParticipant(participant) {
        this.participant = participant
      },
      submit() {
        let participant = {...this.participant}
        this.prepareToSubmit(participant)
        console.log(participant)

        const method = this.id === undefined ? 'postParticipant' : 'putParticipant'
        this.$store.dispatch(method, participant)
          .then(() => {
            this.postSubmitRedirect('participants')
          })
          .catch((error) => {
            this.postSubmitError(error)
          })
      }
    },
    created() {
      if (this.$route.params.tab === undefined) {
        this.$router.push({name: 'participant', params: {'tab': 'main-data'}})
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})
      let breadcrumbs = [
        {text: 'Zawodnicy', to: {name: 'participants'}},
        {text: 'Nowy', active: true}
      ]
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)

      if (this.id) {
        this.$store.dispatch('getParticipant', {id: this.id})
          .then((response) => {
            this.prepareParticipant(response)
            this.setDataFromExistedParticipant(response)

            this.tabLinks = [
              {
                title: 'Dane ogólne',
                link: 'participant',
                tab: 'main-data'
              },
              {
                title: 'Lista Zawodników',
                link: 'participant',
                tab: 'participants-list'
              },
              {
                title: 'Zajęcia',
                link: 'participant',
                tab: 'lessons'
              },
              {
                title: 'Kalendarz',
                link: 'participant',
                tab: 'calendar'
              },
              // {
              //   title: 'Frekwencja',
              //   link: 'participant',
              //   tab: 'frequency'
              // },
              {
                title: 'MTSF',
                link: 'participant',
                tab: 'mtsf'
              }
            ]

            let fullName = response.firstName + ' ' + response.lastName
            let breadcrumbs = [
              {text: 'Zawodnicy', to: {name: 'participants'}},
              {text: fullName, active: true}
            ]
            this.changeAdminNavbarBreadcrumbs(breadcrumbs)
          })
      }
    }
  }
</script>

<style scoped>

</style>
