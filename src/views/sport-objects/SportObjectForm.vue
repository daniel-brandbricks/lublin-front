<template>
  <div class="container">
    <TabLinks :links="tabLinks"/>

    <template>
      <!--   Component for PlaceEntity   -->
      <FormMainData :sportObject="sportObject" @childSubmit="submit" ref="FormMainData" :districts="districts"
                    :key="$route.params.tab+'FormMainData'" v-show="$route.params.tab === 'main-data'"/>
      <!--   Component for todo Entity   -->
      <FormLeaders :sportObject="sportObject" :isValidForm="isValidForm" @childSubmit="submit" ref="FormLeaders"
                   :key="$route.params.tab+'FormLeaders'" v-if="$route.params.tab === 'leaders'"/>

      <!--   Component for GroupEntity   -->
      <FormParticipantGroups :sportObject="sportObject" :isValidForm="isValidForm" @childSubmit="submit" ref="FormParticipantGroups"
                             :key="$route.params.tab+'FormParticipantGroups'" v-if="$route.params.tab === 'participant-groups'"/>

      <!--   Component for EventEntity   -->
      <FormEvents :sportObject="sportObject" :isValidForm="isValidForm" @childSubmit="submit" ref="FormEvents"
                  :key="$route.params.tab+'FormEvents'" v-if="$route.params.tab === 'events'"/>

      <!--   Component for todo Entity   -->
      <FormParticipants :sportObject="sportObject" :isValidForm="isValidForm" @childSubmit="submit" ref="FormCompetitors"
                       :key="$route.params.tab+'FormCompetitors'" v-if="$route.params.tab === 'competitors'"/>

      <!--   Component for todo Entity   -->
      <FormCalendar :sportObject="sportObject" :isValidForm="isValidForm" @childSubmit="submit" ref="FormCalendar"
                    :key="$route.params.tab+'FormCalendar'" v-if="$route.params.tab === 'calendar'"/>

      <!--   Component for todo Entity   -->
      <FormFrequency :sportObject="sportObject" :isValidForm="isValidForm" @childSubmit="submit" ref="FormFrequency"
                     :key="$route.params.tab+'FormFrequency'" v-if="$route.params.tab === 'frequency'"/>

      <!--   Component for todo Entity   -->
      <FormMTSF :sportObject="sportObject" :isValidForm="isValidForm" @childSubmit="submit" ref="FormMTSF"
                :key="$route.params.tab+'FormMTSF'" v-if="$route.params.tab === 'mtsf'"/>

      <!--   Component for todo Entity   -->
      <FormEvents :sportObject="sportObject" :isValidForm="isValidForm" @childSubmit="submit" ref="FormActivities"
                      :key="$route.params.tab+'FormEvents'" v-if="$route.params.tab === 'events'"/>
    </template>
  </div>
</template>

<script>
  import TabLinks from '@/components/TabLinks'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'

  import FormMainData from '@/views/sport-objects/components/FormMainData'
  import FormLeaders from '@/views/sport-objects/components/FormLeaders'
  import FormParticipantGroups from '@/views/sport-objects/components/FormParticipantGroups'
  import FormParticipants from '@/views/sport-objects/components/FormParticipants'
  import FormCalendar from '@/views/sport-objects/components/FormCalendar'
  import FormFrequency from '@/views/sport-objects/components/FormFrequency'
  import FormMTSF from '@/views/sport-objects/components/FormMTSF'
  import FormEvents from '@/views/sport-objects/components/FormEvents'

  import { DISTRICTS } from '@/config/AppConfig'

  export default {
    name: 'SportObjectForm',
    components: {
      TabLinks,
      FormMainData,
      FormLeaders,
      FormParticipantGroups,
      FormParticipants,
      FormCalendar,
      FormFrequency,
      FormMTSF,
      FormEvents,
    },
    mixins: [ EventBusEmit, FormMixin ],
    data () {
      return {
        tabLinks: [],
        districts: DISTRICTS,

        sportObject: {
          active: 1,
          confirmed: false,
          type: {
            id: null
          },
          name: '',

          // location
          district: null,
          address: '',
          postcode: '',
          // todo
          mapImg: '',

          school: {
            id: null
          }
        },

        isValidForm: false,
        isConfirmed: undefined
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
      submit () {
        let sportObject = this.sportObject
        // school.image = this.mixinImage

        const method = this.id === undefined ? 'postSportObject' : 'putSportObject'
        this.$store.dispatch(method, sportObject)
          .then(() => {
            this.postSubmitRedirect('sport.objects')
          })
          .catch((error) => {
            this.postSubmitError(error)
          })
      },
      // todo look at this
      prepareSportObject (response) {
        console.log(response)
        if (undefined === response.type || response.type === null) {
          response.type = {
            id: null
          }
        }
        this.sportObject = response
      }
    },
    created () {
      // set isConfirmed data from table redirect only
      if (this.$route.params.isConfirmed) {
        this.isConfirmed = this.$route.params.isConfirmed
      }

      // init sport object
      this.sportObject = Object.assign(this.sportObject, this.$store.getters.sportObject(this.isConfirmed, this.id))

      // auto redirect if url is without 'tab' param
      if (this.$route.params.tab === undefined) {
        this.$router.push({ name: 'sport.object', params: { 'tab': 'main-data' } })
      }

      let breadcrumbs = [
        { text: 'Obiekty sportowe', to: { name: 'sport.objects', params: { 'tab': 'confirmed' } } },
        { text: this.id ? this.sportObject.name : 'Nowy', active: true }
      ]
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)

      if (this.id) {
        this.$store.dispatch('getSportObject', { id: this.id })
          .then((response) => {
            this.prepareSportObject(response)

            // set more tab links
            this.tabLinks = [
              {
                title: 'Dane ogólne',
                link: 'sport.object',
                tab: 'main-data'
              },
              {
                title: 'Prowadzący',
                link: 'sport.object',
                tab: 'leaders'
              },
              {
                title: 'Lista Zawodników',
                link: 'sport.object',
                tab: 'participant-groups'
              },
              {
                title: 'Zawodnicy',
                link: 'sport.object',
                tab: 'competitors'
              },
              {
                title: 'Zajęcia',
                link: 'sport.object',
                tab: 'activities'
              },
              {
                title: 'Kalendarz',
                link: 'sport.object',
                tab: 'calendar'
              },
              {
                title: 'Frekwencja',
                link: 'sport.object',
                tab: 'frequency'
              },
              {
                title: 'MTSF',
                link: 'sport.object',
                tab: 'mtsf'
              },
              {
                title: 'Wydarzenia',
                link: 'sport.object',
                tab: 'events'
              }
            ]

            let breadcrumbs = [
              { text: 'Obiekty sportowe', to: { name: 'sport.objects', params: { 'tab': 'confirmed' } } },
              { text: this.id ? response.title : 'Nowy', active: true }
            ]
            this.changeAdminNavbarBreadcrumbs(breadcrumbs)
          })
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })
    }
  }
</script>

<style scoped>
</style>
