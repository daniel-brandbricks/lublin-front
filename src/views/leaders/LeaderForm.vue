<template>
  <div class="container">
    <b-row class="justify-content-center" v-if="$route.params.id !== undefined">
      <b-col cols="12">
        <TabLinks :links="tabLinks"></TabLinks>
      </b-col>
    </b-row>

    <FormMainData :leader="leader" @childSubmit="submit" ref="FormMainData"
                  :key="$route.params.tab+'FormMainData'" v-show="$route.params.tab === 'main-data'"/>
  </div>
</template>

<script>
  import TabLinks from '@/components/TabLinks'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'
  import FormMainData from '@/views/leaders/components/FormMainData'

  export default {
    name: 'LeaderForm',
    components: {
      TabLinks, FormMainData
    },
    mixins: [ EventBusEmit, FormMixin ],
    data () {
      return {
        tabLinks: [
          {
            title: 'Dane ogólne',
            link: 'leader',
            tab: 'main-data'
          },
          {
            title: 'Uprawnienia',
            link: 'leader',
            tab: 'permissions'
          },
          {
            title: 'Obiekty',
            link: 'leader',
            tab: 'sport-objects'
          },
          {
            title: 'Lista Zawodników',
            link: 'leader',
            tab: 'participant-list'
          },
          {
            title: 'Zawodnicy',
            link: 'leader',
            tab: 'participants'
          },
          {
            title: 'Zajęcia',
            link: 'leader',
            tab: 'lessons'
          },
          {
            title: 'Kalendarz',
            link: 'leader',
            tab: 'calendar'
          },
          {
            title: 'Frekwencja',
            link: 'leader',
            tab: 'frequency'
          },
          {
            title: 'MTSF',
            link: 'leader',
            tab: 'mtsf'
          },
          {
            title: 'Wydarzenia',
            link: 'leader',
            tab: 'events'
          }
        ],

        leader: {
          id: this.id,
          confirmed: 0,
          name: '',
          surname: '',
          email: '',
          password: '',
          phone: '',
          active: 1,
          disciplines: [
            { id: 1 },
            { id: 2 }
          ]
        }
      }
    },
    computed: {},
    methods: {
      submit () {
      },
      addDiscipline () {
        this.leader.disciplines.push({})
      },
      removeDiscipline (index) {
        this.leader.disciplines.splice(index, 1)
      }
    },
    created () {
      if (this.$route.params.tab === undefined) {
        this.$router.push({ name: 'leader', params: { 'tab': 'main-data' } })
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })

      let breadcrumbs = [
        { text: 'Prowadzący', to: { name: 'leaders', params: { 'tab': 'confirmed' } } },
        { text: this.id ? this.leader.name : 'Nowy', active: true }
      ]
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)
    }
  }
</script>

<style scoped>

</style>
