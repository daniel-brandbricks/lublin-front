<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="12">
        <TabLinks :links="tabLinks"/>
      </b-col>
    </b-row>

    <list-confirmed :key="$route.params.tab" v-if="$route.params.tab === 'confirmed'"/>
    <list-to-confirm :key="$route.params.tab" v-if="$route.params.tab === 'to-confirm'"/>

  </div>
</template>

<script>
  import EventBusEmit from '@/mixins/event-bus-emit'
  import TabLinks from '../../components/TabLinks'
  import ListMixin from '@/mixins/list-mixin'
  import ListConfirmed from '@/views/events/components/ListConfirmed'
  import ListToConfirm from '@/views/events/components/ListToConfirm'

  export default {
    components: { TabLinks, ListConfirmed, ListToConfirm },
    mixins: [ EventBusEmit, ListMixin ],
    data () {
      return {
        tabLinks: [
          {
            title: 'Zatwierdzone',
            link: 'events',
            tab: 'confirmed'
          },
          {
            title: 'Do zatwierdzenia (' + this.$store.getters.eventsToConfirm.length + ')',
            link: 'events',
            tab: 'to-confirm'
          }
        ]
      }
    },
    watch: {
      '$store.getters.eventsToConfirm': function (val) {
        this.tabLinks = [
          {
            title: 'Zatwierdzone',
            link: 'events',
            tab: 'confirmed'
          },
          {
            title: 'Do zatwierdzenia (' + val.length + ')',
            link: 'events',
            tab: 'to-confirm'
          }
        ]
      }
    },
    computed: {
      authUser () {
        if (this.$store.getters.authUser &&
          this.$store.getters.authUser.role !== 2 &&
          this.$store.getters.authUser.role !== 3) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.tabLinks = [
              {
                title: 'Zatwierdzone',
                link: 'events',
                tab: 'confirmed'
              }
            ]
          }
        return this.$store.getters.authUser
      }
    },
    methods: {
      rowRedirect (id, isConfirmed) {
        this.$router.push({
          name: 'event',
          params: { 'tab': 'main-data', 'id': id, 'isConfirmed': isConfirmed }
        })
      }
    },
    created () {
      if (this.$route.params.tab === undefined) {
        this.$router.push({ name: 'events', params: { 'tab': 'confirmed' } })
      }

      this.$store.dispatch('getEvents', { confirmed: 0, forSchool: true })

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: 'event' })
      this.changeAdminNavbarBreadcrumbs([ { text: 'Lista imprez sportowych', active: true } ])
    }
  }
</script>

<style scoped>

</style>
