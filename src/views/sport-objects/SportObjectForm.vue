<template>
  <div>
    <template>
      {{sportObject.schools}}
      <!--   Component for PlaceEntity   -->
      <FormMainData :sportObject="sportObject" @childSubmit="submit" ref="FormMainData" :districts="districts"
                    :key="$route.params.tab+'FormMainData'" v-show="$route.params.tab === 'main-data'"/>
    </template>
  </div>
</template>

<script>
import TabLinks from '@/components/TabLinks'
import EventBusEmit from '@/mixins/event-bus-emit'
import FormMixin from '@/mixins/form-mixin'

import FormMainData from '@/views/sport-objects/components/FormMainData'
import {DISTRICTS} from '@/config/AppConfig'

export default {
  name: 'SportObjectForm',
  components: {
    TabLinks,
    FormMainData
  },
  mixins: [EventBusEmit, FormMixin],
  data () {
    return {
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

        schools: []
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
      console.log(this.sportObject)
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
      response.schools = response.schools.map(school => school.id)
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
      this.$router.push({name: 'sport.object', params: {'tab': 'main-data'}})
    }

    if (this.id) {
      this.$store.dispatch('getSportObject', {id: this.id})
        .then((response) => {
          this.prepareSportObject(response)
        })
    }

    /** @buttonLink route name || false if button must be hidden */
    this.changeAdminNavbarButton({buttonLink: false})

    let breadcrumbs = [{text: 'Obiekty sportowe', to: {name: 'sport.objects', params: {'tab': 'confirmed'}}},
      {text: this.id ? this.sportObject.name : 'Nowy', active: true}]
    this.changeAdminNavbarBreadcrumbs(breadcrumbs)
  }
}
</script>

<style scoped>
</style>
