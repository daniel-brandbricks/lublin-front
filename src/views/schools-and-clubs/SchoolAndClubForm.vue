<template>
  <div>
    <TabLinks :links="tabLinks"></TabLinks>
    <template>
      <FormMainData :school="school" @childSubmit="submit" ref="FormMainData"
                    :key="$route.params.tab+'FormMainData'" v-show="$route.params.tab === 'main-data'"/>
      <FormSportObjects :school="school" :isValidForm="isValidForm" @childSubmit="submit"
                        :key="$route.params.tab+'FormSportObjects'" v-show="$route.params.tab === 'sport-objects'"/>
    </template>
  </div>
</template>

<script>
import TabLinks from '@/components/TabLinks'
import EventBusEmit from '@/mixins/event-bus-emit'
import FormMixin from '@/mixins/form-mixin'
import FormMainData from '@/views/schools-and-clubs/components/FormMainData'
import FormSportObjects from '@/views/schools-and-clubs/components/FormSportObjects'

export default {
  name: 'SchoolAndClubForm',
  components: {TabLinks, FormMainData, FormSportObjects},
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
          tab: 'sport-objects',
          method: 'checkValidForm'
        }
      ],

      school: {
        image: null,
        active: 1,
        confirmed: null,
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
        sportObjects: []
      },

      // sportObjects: [],
      sportObjectsToDelete: [], // ???
      sportObjectDefault: {
        active: 1,
        confirmed: null,
        type: '0',
        name: '',

        // location
        district: null,
        address: '',
        postcode: '',
        // todo
        mapImg: ''
      },

      isValidForm: false,
      isConfirmed: undefined
    }
  },
  computed: {
    schoolComputed () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.school = Object.assign(this.school, this.$store.getters.school(this.isConfirmed, this.id))
      // return this.$store.getters.school(this.isConfirmed, this.id)
    }
  },
  methods: {
    // FormSportObjects
    addSportObject () {
      console.log(111)
      let copy = { ...this.sportObjectDefault }
      this.school.sportObjects.push(copy)
    },
    removeSportObject (index) {
      // this.sportObjectsToDelete.push(this.sportObjects[index].id)
      this.school.sportObjects.splice(index, 1)
    },

    checkValidForm () {
      this.$refs.FormMainData.checkValidForm()
        .then((result) => {
          this.isValidForm = result
        })
    },
    goToFormTab (tabName) {
      this.checkValidForm()
      this.$router.push({name: 'school.or.club', params: {'tab': tabName}})
    },
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
    // todo remove + find solution
    this.school.sportObjects = []

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
          // todo remove + find solution
          this.school.sportObjects = []   })
    }

    /** @buttonLink route name || false if button must be hidden */
    this.changeAdminNavbarButton({buttonLink: false})
    this.changeAdminNavbarBreadcrumbs()
  }
}
</script>

<style scoped>
</style>
