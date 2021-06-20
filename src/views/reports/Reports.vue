<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="12">
        <TabLinks :links="tabLinks"></TabLinks>
      </b-col>
    </b-row>

    <reporting :key="$route.params.tab" v-if="$route.params.tab === 'reporting'"/>
    <visit :key="$route.params.tab" v-if="$route.params.tab === 'visit'"/>

    <b-modal ref="loadingModal" centered hide-header hide-header-close
             hide-footer size="lg">
      <h3 class="text-center">Trwa ladowanie...</h3>
    </b-modal>
  </div>
</template>

<script>
  import EventBusEmit from '@/mixins/event-bus-emit'
  import TabLinks from '../../components/TabLinks'
  import Reporting from '@/views/reports/components/Reporting'
  import Visit from '@/views/reports/components/Visit'

  export default {
    components: { TabLinks, Reporting, Visit },
    mixins: [ EventBusEmit ],
    data () {
      return {
        tabLinks: [
          {
            title: 'Raportowanie',
            link: 'reports',
            tab: 'reporting'
          },
          {
            title: 'Wizytacja',
            link: 'reports',
            tab: 'visit'
          }
        ]
      }
    },
    computed: {
      isLoading () {
        return this.$store.getters.isLoading
      }
    },
    watch: {
      isLoading: function (val) {
        if (val) {
          this.$refs.loadingModal.show()
        } else {
          this.$refs.loadingModal.hide()
        }
      }
    },
    created () {
      if (!this.$store.getters.isAdmin) {
        this.tabLinks = []
      }

      if (this.$route.params.tab === undefined) {
        this.$router.push({ name: 'reports', params: { 'tab': 'reporting' } })
      }

      this.$store.dispatch('getSchools', { confirmed: 1 })
      this.$store.dispatch('getAdminSportObjects', { confirmed: 1 })
      this.$store.dispatch('getSportObjects', { confirmed: 1 })
      this.$store.dispatch('getLeaders', { confirmed: 1, forLesson: true, returnType: 'short' })
      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getLessonCategories')
      this.$store.dispatch('getClasses')

      this.changeAdminNavbarBreadcrumbs([ { text: 'Raporty', active: true } ])
    }
  }
</script>

<style scoped>

</style>
