<template>
  <div class="container">
    <b-row class="justify-content-center" v-if="$route.params.id !== undefined">
      <b-col cols="12">
      <TabLinks :links="tabLinks"/>
        {{isValidForm}}
      </b-col>
    </b-row>

    <FormMainData :participant="participant" @childSubmit="submit" ref="FormMainData" :years="years"
                      :key="$route.params.tab+'FormMainData'" v-show="$route.params.tab === 'main-data'"/>
  </div>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import TabLinks from '@/components/TabLinks'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'

  // todo components
  import FormMainData from '@/views/participants/components/FormMainData'
  import { YEARS } from '../../config/AppConfig'

  export default {
    name: 'ParticipantForm',
    components: {
      TabLinks,
      Treeselect,
      FormMainData
    },
    mixins: [ EventBusEmit, FormMixin ],
    data () {
      return {
        tabLinks: [
          {
            link: 'participant',
            tab: 'main-data'
          },
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
            tab: 'activities'
          },
          {
            title: 'Kalendarz',
            link: 'participant',
            tab: 'calendar'
          },
          {
            title: 'Frekwencja',
            link: 'participant',
            tab: 'frequency'
          },
          {
            title: 'MTSF',
            link: 'participant',
            tab: 'mtsf'
          }
        ],
        years: YEARS,

        participant: {
          active: true,
          firstName: '',
          lastName: '',
          year: null,
          sex: 1,
          discipline: {
            id: null
          },
          category: {
            id: null
          },
          class: {
            id: null
          },

          // for v-for
          disciplines: []
          // selectedGender: []
        },

        genderOptions: [
          { text: 'kobieta', value: 0 },
          { text: 'mężczyzna', value: 1 }
        ],

        isValidForm: false
      }
    },
    computed: {},
    methods: {
      checkValidMainForm () {
        this.$refs.FormMainData.checkValidForm()
          .then((result) => {
            this.isValidForm = result
          })
      },
      prepareToSubmit (participant) {
        let disciplines = participant.disciplines
        let disciplinesPrepared = []

        for (let disciplinesIndex in disciplines) {
          disciplinesPrepared.push(disciplines[disciplinesIndex].id)
        }
        participant.disciplines = disciplinesPrepared
      },
      submit () {
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
      },
      addDiscipline () {
        this.participant.disciplines.push({id: null})
        // this.participant.class.push({})
      },
      removeDiscipline (index) {
        this.participant.disciplines.splice(index, 1)
        // this.participant.class.splice(index, 1)
      }
    },
    created () {
      if (this.$route.params.tab === undefined) {
        this.$router.push({ name: 'participant', params: {'tab': 'main-data'} })
      }

      if (this.id) {
        this.$store.dispatch('getParticipant', { id: this.id })
          .then((response) => {
            this.participantGroup = response
          })
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })

      let breadcrumbs = [
        { text: 'Zawodnicy', to: { name: 'participants' } },
        { text: this.id ? this.participant.name : 'Nowa', active: true }
      ]
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)
    }
  }
</script>

<style scoped>

</style>
