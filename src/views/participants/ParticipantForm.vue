<template>
  <div class="container">
    <b-row cols="12">
      <TabLinks :links="tabLinks"></TabLinks>
      <template>
        <FormMainData :participant="participant" @childSubmit="submit" ref="FormMainData"
                      :key="$route.params.tab+'FormMainData'" v-show="$route.params.tab === 'main-data'"/>
      </template>
    </b-row>
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
          }
        ],

        participant: {
          active: 1,
          firstName: '',
          lastName: '',
          sex: '',
          year: '',
          class: [],

          participants: [],

          // for treeselect
          years: [],
          discipline: [],

          // checkbox
          selectedGender: [],
          genderOptions: [
            { text: 'kobieta', value: 0 },
            { text: 'mężczyzna', value: 1 }
          ]
        },

        selectedClass: null,
        selectedDiscipline: null,

        isValidForm: false
      }
    },
    computed: {},
    methods: {
      addDiscipline (disciplineDefault) {
        this.participant.discipline.push(disciplineDefault)
      },
      removeDiscipline (index) {
        this.participant.discipline.splice(index, 1)
      },
      checkValidMainForm () {
        this.$refs.FormMainData.checkValidForm()
          .then((result) => {
            this.isValidForm = result
          })
      },
      submit () {
        let discipline = this.discipline

        const method = this.id === undefined ? 'postDiscipline' : 'putDiscipline'
        this.$store.dispatch(method, discipline)
          .then(() => {
            this.postSubmitRedirect('participants')
          })
          .catch((error) => {
            this.postSubmitError(error)
          })
      }
    },
    created () {
      if (this.id) {
        this.$store.dispatch('getParticipants', { id: this.id })
          .then((response) => {
            this.participant = response

            this.tabLinks = [
              {
                title: 'Dane ogólne',
                link: 'participant',
                tab: 'main-data'
              },
              {
                title: 'ListaZawodników',
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
            ]
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
