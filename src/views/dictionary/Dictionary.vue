<template>
  <div>
    <b-row class="justify-content-center">
      <b-col cols="12">
        <Tablinks :links="tabLinks"></Tablinks>
      </b-col>
    </b-row>

  </div>
</template>

<script>

import EventBusEmit from '@/mixins/event-bus-emit'
import TabLinks from '../../components/TabLinks'

export default {
  name: 'Dictionary',
  components: {TabLinks},
  mixins: [EventBusEmit],
  data () {
    return {
      objects: [],
      tabLinks: [
        {
          title: 'Typy obiektów sportowych',
          link: 'dictionary',
          tab: 'typy obiektów sportowych'
        },
        {
          title: 'Dyscypliny',
          link: 'dictionary',
          tab: 'dyscypliny'
        },
        {
          title: 'Kategorie Zajęć',
          link: 'dictionary',
          tab: 'kategorie zajęć'
        },
        {
          title: 'Klasy',
          link: 'dictionary',
          tab: 'klasy'
        },
        {
          title: 'Sezony',
          link: 'dictionary',
          tab: 'typy obiektów sportowych'
        }
      ]
    }
  },
  created () {
    if (this.$route.params.tab === undefined) {
      this.$router.push({name: 'dictionary', params: {'tab': 'dictionary'}})
    }
    /** @buttonLink route name || false if button must be hidden */
    this.changeAdminNavbarButton({buttonLink: 'sport.object', params: {tab: 'main-data'}})
    this.changeAdminNavbarBreadcrumbs([{text: 'Słownik', active: true}])
  }
}
</script>

<style scoped>

</style>
