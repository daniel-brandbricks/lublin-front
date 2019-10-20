<template>
  <div>
    <TabLinks :links="tabLinks"></TabLinks>
    <template>
      <!--   Component for SchoolEntity   -->
      <FormMainData :school="school" @childSubmit="submit" ref="FormMainData"
                    :key="$route.params.tab+'FormMainData'" v-show="$route.params.tab === 'main-data'"/>

      <!--   Component for PlaceEntity   -->
      <FormPlaces :school="school" :isValidForm="isValidForm" @childSubmit="submit" ref="FormPlaces"
                  :key="$route.params.tab+'FormPlaces'" v-show="$route.params.tab === 'places'"/>

      <!--   Component for todo Entity   -->
      <FormLeaders :school="school" :isValidForm="isValidForm" @childSubmit="submit" ref="FormLeaders"
                  :key="$route.params.tab+'FormLeaders'" v-show="$route.params.tab === 'leaders'"/>

      <!--   Component for GroupEntity   -->
      <FormGroups :school="school" :isValidForm="isValidForm" @childSubmit="submit" ref="FormGroups"
                  :key="$route.params.tab+'FormGroups'" v-show="$route.params.tab === 'groups'"/>

      <!--   Component for EventEntity   -->
      <FormEvents :school="school" :isValidForm="isValidForm" @childSubmit="submit" ref="FormEvents"
                  :key="$route.params.tab+'FormEvents'" v-show="$route.params.tab === 'events'"/>

      <!--   Component for todo Entity   -->
      <FormCompetitors :school="school" :isValidForm="isValidForm" @childSubmit="submit" ref="FormCompetitors"
                  :key="$route.params.tab+'FormCompetitors'" v-show="$route.params.tab === 'competitors'"/>

      <!--   Component for todo Entity   -->
      <FormActivities :school="school" :isValidForm="isValidForm" @childSubmit="submit" ref="FormActivities"
                      :key="$route.params.tab+'FormActivities'" v-show="$route.params.tab === 'activities'"/>

      <!--   Component for todo Entity   -->
      <FormCalendar :school="school" :isValidForm="isValidForm" @childSubmit="submit" ref="FormCalendar"
                      :key="$route.params.tab+'FormCalendar'" v-show="$route.params.tab === 'calendar'"/>

      <!--   Component for todo Entity   -->
      <FormFrequency :school="school" :isValidForm="isValidForm" @childSubmit="submit" ref="FormFrequency"
                  :key="$route.params.tab+'FormFrequency'" v-show="$route.params.tab === 'frequency'"/>

      <!--   Component for todo Entity   -->
      <FormMTSF :school="school" :isValidForm="isValidForm" @childSubmit="submit" ref="FormMTSF"
                  :key="$route.params.tab+'FormMTSF'" v-show="$route.params.tab === 'mtsf'"/>
    </template>
  </div>
</template>

<script>
import TabLinks from '@/components/TabLinks'
import EventBusEmit from '@/mixins/event-bus-emit'
import FormMixin from '@/mixins/form-mixin'
import FormMainData from '@/views/schools-and-clubs/components/FormMainData'
import FormPlaces from '@/views/schools-and-clubs/components/FormPlaces'
import FormLeaders from '@/views/schools-and-clubs/components/FormLeaders'
import FormGroups from '@/views/schools-and-clubs/components/FormGroups'
import FormCompetitors from '@/views/schools-and-clubs/components/FormCompetitors'
import FormActivities from '@/views/schools-and-clubs/components/FormActivities'
import FormCalendar from '@/views/schools-and-clubs/components/FormCalendar'
import FormFrequency from '@/views/schools-and-clubs/components/FormFrequency'
import FormMTSF from '@/views/schools-and-clubs/components/FormMTSF'
import FormEvents from '@/views/schools-and-clubs/components/FormEvents'

export default {
  name: 'SchoolAndClubForm',
  components: {
    TabLinks,
    FormMainData,
    FormPlaces,
    FormLeaders,
    FormGroups,
    FormEvents,
    FormCompetitors,
    FormActivities,
    FormCalendar,
    FormFrequency,
    FormMTSF
  },
  mixins: [EventBusEmit, FormMixin],
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

      school: {
        image: null,
        active: 1,
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
        places: []
      },

      isValidForm: false,
      isConfirmed: undefined
    }
  },
  computed: {},
  methods: {
    // FormPlaces
    addPlace (placeDefault) {
      let copy = {...placeDefault}
      copy.collectionType = 'add'
      this.school.places.push(copy)
    },
    removePlace (index) {
      this.school.places.splice(index, 1)
    },
    concatPlaces (placesToDelete) {
      this.school.places = [...this.school.places, ...placesToDelete]
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
      this.$router.push({name: 'school.or.club', params: defaultParams})
    },

    // submit full school and school places without form validation
    submit () {
      let school = this.school
        console.log(this.school)
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
      this.$router.push({name: 'school.or.club', params: {'tab': 'main-data'}})
    }

    // set isConfirmed data from table redirect only
    if (this.$route.params.isConfirmed) {
      this.isConfirmed = this.$route.params.isConfirmed
    }

    if (this.id) {
      this.$store.dispatch('getSchool', {id: this.id})
        .then((response) => {
          this.school = response

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
              title: 'Grupy',
              link: 'school.or.club',
              tab: 'groups'
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
    this.changeAdminNavbarButton({buttonLink: false})

    let breadcrumbs = [{text: 'Kłuby i szkoły', to: {name: 'schools.and.clubs', params: {'tab': 'confirmed'}}},
      {text: this.id ? this.school.type == 1 ? 'Szkoła' : 'Klub' : 'Nowy', active: true}]
    this.changeAdminNavbarBreadcrumbs(breadcrumbs)
  }
}
</script>

<style scoped>
</style>
