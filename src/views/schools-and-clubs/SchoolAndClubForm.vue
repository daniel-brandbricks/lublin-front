<template>
  <div>
    <TabLinks :links="tabLinks"></TabLinks>
    <template>
      <!--   Component for SchoolEntity   -->
      <FormMainData :school="school" @childSubmit="submit" ref="FormMainData"
                    :key="$route.params.tab+'FormMainData'" v-show="$route.params.tab === 'main-data'"/>

      <!--   Component for PlaceEntity   -->
      <FormPlaces :school="school" :isValidForm="isValidForm" @childSubmit="submit"
                  :key="$route.params.tab+'FormPlaces'" v-show="$route.params.tab === 'places'"/>
    </template>
  </div>
</template>

<script>
import TabLinks from '@/components/TabLinks'
import EventBusEmit from '@/mixins/event-bus-emit'
import FormMixin from '@/mixins/form-mixin'
import FormMainData from '@/views/schools-and-clubs/components/FormMainData'
import FormPlaces from '@/views/schools-and-clubs/components/FormPlaces'

export default {
  name: 'SchoolAndClubForm',
  components: {TabLinks, FormMainData, FormPlaces},
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
      school.image = this.mixinImage

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
