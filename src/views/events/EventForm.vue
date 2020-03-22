<template>
  <div class="container">
    <template>
      <!--   Component for EventEntity   -->
      <FormMainData :event="event" @childSubmit="submit" ref="FormMainData"
                    :key="$route.params.tab+'FormMainData'" v-show="$route.params.tab === 'main-data'"/>
    </template>
  </div>
</template>

<script>
  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'

  import FormMainData from '@/views/events/components/FormMainData'

  export default {
    components: { FormMainData },
    mixins: [ EventBusEmit, FormMixin ],
    data () {
      return {
        event: {
          id: this.id,
          image: null,
          images: [],
          dates: [],
          title: '',
          description: '',
          address: '',
          addressDesc: '',
          email: '',
          phone: '',
          facebook: '',
          youtube: '',
          confirmed: false,
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
      submit () {
        let event = this.event

        const method = this.id === undefined ? 'postEvent' : 'putEvent'
        this.$store.dispatch(method, event)
          .then(() => {
            this.postSubmitRedirect('events')
          })
          .catch((error) => {
            this.postSubmitError(error)
          })
      },
      checkValidMainForm () {
        this.$refs.FormMainData.checkValidForm()
          .then((result) => {
            this.isValidForm = result
          })
      },
      prepareEvent (response) {
        this.event = response
      }
    },
    created () {
      // set isConfirmed data from table redirect only
      if (this.$route.params.isConfirmed) {
        this.isConfirmed = this.$route.params.isConfirmed
      }

      // init event
      this.event = Object.assign(this.event, this.$store.getters.event(this.isConfirmed, this.id))

      // auto redirect if url is without 'tab' param
      if (this.$route.params.tab === undefined) {
        this.$router.push({ name: 'event', params: { 'tab': 'main-data' } })
      }

      let breadcrumbs = [
        { text: 'Lista imprez', to: { name: 'events', params: { 'tab': 'confirmed' } } },
        { text: this.id ? this.event.title : 'Nowa', active: true }
      ]
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)

      if (this.id) {
        this.$store.dispatch('getEvent', { id: this.id })
          .then((response) => {
            this.prepareEvent(response)

            console.log(response.title)
            let breadcrumbs = [
              { text: 'Lista imprez', to: { name: 'events', params: { 'tab': 'confirmed' } } },
              { text: this.id ? response.title : 'Nowa', active: true }
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
