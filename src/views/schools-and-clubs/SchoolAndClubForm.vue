<template>
  <div class="container">
    <TabLinks :links="tabLinks"/>
    <template>
      <!--   Component for SchoolEntity   -->
      <FormMainData :school="school" @childSubmit="submit" ref="FormMainData" :districts="districts"
                    :key="$route.params.tab+'FormMainData'" v-show="$route.params.tab === 'main-data'"/>

      <!--   Component for PlaceEntity   -->
      <FormPlaces :school="school" :isValidForm="isValidForm" @childSubmit="submit" ref="FormPlaces"
                  :districts="districts"
                  :key="$route.params.tab+'FormPlaces'" v-if="$route.params.tab === 'places'"/>

      <!--   Component for todo Entity   -->
      <FormLeaders :school="school" :isValidForm="isValidForm" @childSubmit="submit" ref="FormLeaders"
                   :key="$route.params.tab+'FormLeaders'" v-if="$route.params.tab === 'leaders'"/>

      <!--   Component for GroupEntity   -->
      <FormParticipantGroups :school="school" :isValidForm="isValidForm" @childSubmit="submit" ref="FormParticipantGroups"
                  :key="$route.params.tab+'FormParticipantGroups'" v-if="$route.params.tab === 'participant-groups'"/>

      <!--   Component for EventEntity   -->
      <FormEvents :school="school" :isValidForm="isValidForm" @childSubmit="submit" ref="FormEvents"
                  :key="$route.params.tab+'FormEvents'" v-if="$route.params.tab === 'events'"/>

      <!--   Component for todo Entity   -->
      <FormParticipants :school="school" :isValidForm="isValidForm" @childSubmit="submit" ref="FormCompetitors"
                       :key="$route.params.tab+'FormCompetitors'" v-if="$route.params.tab === 'competitors'"/>

      <!--   Component for todo Entity   -->
      <FormEvents :school="school" :isValidForm="isValidForm" @childSubmit="submit" ref="FormActivities"
                      :key="$route.params.tab+'FormEvents'" v-if="$route.params.tab === 'events'"/>

      <!--   Component for todo Entity   -->
      <FormCalendar :school="school" :isValidForm="isValidForm" @childSubmit="submit" ref="FormCalendar"
                    :key="$route.params.tab+'FormCalendar'" v-if="$route.params.tab === 'calendar'"/>

      <!--   Component for todo Entity   -->
      <FormFrequency :school="school" :isValidForm="isValidForm" @childSubmit="submit" ref="FormFrequency"
                     :key="$route.params.tab+'FormFrequency'" v-if="$route.params.tab === 'frequency'"/>

      <!--   Component for todo Entity   -->
      <FormMTSF :school="school" :isValidForm="isValidForm" @childSubmit="submit" ref="FormMTSF"
                :key="$route.params.tab+'FormMTSF'" v-if="$route.params.tab === 'mtsf'"/>

    </template>
  </div>
</template>

<script>
  import TabLinks from '@/components/TabLinks'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'
  import ToastMixin from '@/mixins/toast-mixin'

  import FormMainData from '@/views/schools-and-clubs/components/FormMainData'
  import FormPlaces from '@/views/schools-and-clubs/components/FormPlaces'
  import FormLeaders from '@/views/schools-and-clubs/components/FormLeaders'
  import FormParticipantGroups from '@/views/schools-and-clubs/components/FormParticipantGroups'
  import FormParticipants from '@/views/schools-and-clubs/components/FormParticipants'
  import FormCalendar from '@/views/schools-and-clubs/components/FormCalendar'
  import FormFrequency from '@/views/schools-and-clubs/components/FormFrequency'
  import FormMTSF from '@/views/schools-and-clubs/components/FormMTSF'
  import FormEvents from '@/views/schools-and-clubs/components/FormEvents'

  import { DISTRICTS } from '@/config/AppConfig'

  export default {
    name: 'SchoolAndClubForm',
    components: {
      TabLinks,
      FormMainData,
      FormPlaces,
      FormLeaders,
      FormParticipantGroups,
      FormEvents,
      FormParticipants,
      FormCalendar,
      FormFrequency,
      FormMTSF
    },
    mixins: [ EventBusEmit, FormMixin, ToastMixin ],
    data () {
      return {
        tabLinks: [
          {
            title: 'Dane ogólne',
            link: 'school.or.club',
            tab: 'main-data'
          },
          {
            title: 'Obiekty sportowe',
            link: 'school.or.club',
            tab: 'places',
            method: 'checkValidMainForm'
          }
        ],
        districts: DISTRICTS,

        school: {
          id: this.id,
          image: null,
          active: true,
          confirmed: false,
          type: 0,
          name: '',
          email: '',
          password: '',
          phone: '',

          // location
          district: null,
          address: '',
          postcode: '',
          // todo
          mapImg: '',
          openHours: '',
          comments: '',

          // contact person
          personToContactFullName: '',
          personToContactPhone: '',

          // foreign
          places: [],
          schoolsUsers: []
        },

        isValidForm: false,
        isConfirmed: undefined
      }
    },
    methods: {
      changeSchoolLeaderStatus (data) {
        this.$store.dispatch('putSchool', {
          id: this.$route.params.id,
          active: data.status,
          leaderId: data.id,
          actionType: 'putLeaderStatus'
        }).then((response) => {
          this.school = response
        })
      },
      updateSchool () {
        this.school = this.$store.getters.school(this.isConfirmed, this.id)
      },

      // FormPlaces
      addPlace (placeDefault) {
        let copy = {...placeDefault}
        // copy.collectionType = 'add'
        this.school.places.push(copy)
      },
      removePlace (index) {
        this.school.places.splice(index, 1)
      },
      concatPlaces (placesToDelete) {
        // this.school.places = [...this.school.places, ...placesToDelete]
      },
      checkValidMainForm () {
        return this.$refs.FormMainData.checkValidForm()
          .then((result) => {
            console.log(result)
            this.isValidForm = result
            if (result) {
              this.$router.push({
                name: 'school.or.club',
                params: {'tab': 'places', id: this.id}
              })
            }
          })
      },
      goToFormTab (tabName, params = {}) {
        this.checkValidMainForm()
        // let defaultParams = { ...{ 'tab': tabName, 'id': this.id }, ...params }
        // this.$router.push({ name: 'school.or.club', params: defaultParams })
      },

      // submit full school and school sport-objects without form validation
      submit () {
        let school = this.school
        console.log(this.school)
        delete school.schoolsUsers
        // school.image = this.mixinImage

        const method = this.id === undefined ? 'postSchool' : 'putSchool'
        this.$store.dispatch(method, school)
          .then(() => {
            this.postSubmitRedirect('schools.and.clubs')
          })
          .catch((error) => {
            this.postSubmitError(error)
          })
      }
    },
    created () {
      // init school
      this.school = Object.assign(this.school, this.$store.getters.school(this.isConfirmed, this.id))

      // auto redirect if url is without 'tab' param
      if (this.$route.params.tab === undefined) {
        this.$router.push({ name: 'school.or.club', params: { 'tab': 'main-data' } })
      }

      // set isConfirmed data from table redirect only
      if (this.$route.params.isConfirmed) {
        this.isConfirmed = this.$route.params.isConfirmed
      }

      if (this.id) {
        this.$store.dispatch('getSchool', { id: this.id })
          .then((response) => {
            this.school = response

            console.log('more tab links')
            // set more tab links
            this.tabLinks = [
              {
                title: 'Dane ogólne',
                link: 'school.or.club',
                tab: 'main-data'
              },
              {
                title: 'Obiekty',
                link: 'school.or.club',
                tab: 'places',
                method: 'checkValidMainForm'
              },
              {
                title: 'Prowadzący',
                link: 'school.or.club',
                tab: 'leaders'
              },
              {
                title: 'Lista Zawodników',
                link: 'school.or.club',
                tab: 'participant-groups'
              },
              {
                title: 'Zawodnicy',
                link: 'school.or.club',
                tab: 'competitors'
              },
              {
                title: 'Zajęcia',
                link: 'school.or.club',
                tab: 'activities'
              },
              {
                title: 'Kalendarz',
                link: 'school.or.club',
                tab: 'calendar'
              },
              {
                title: 'Frekwencja',
                link: 'school.or.club',
                tab: 'frequency'
              },
              {
                title: 'MTSF',
                link: 'school.or.club',
                tab: 'mtsf'
              },
              {
                title: 'Wydarzenia',
                link: 'school.or.club',
                tab: 'events'
              }
            ]
          })
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })

      let breadcrumbs = [
        { text: 'Kłuby i szkoły', to: { name: 'schools.and.clubs', params: { 'tab': 'confirmed' } } },
        { text: this.id ? parseInt(this.school.type) === 1 ? 'Szkoła' : 'Klub' : 'Nowy', active: true }
      ]
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)
    }
  }
</script>

<style scoped>
</style>
