<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="12">
        <TabLinks :links="tabLinks"></TabLinks>
      </b-col>

      <b-col cols="12">
        <sport-object-type :key="$route.params.tab" v-if="$route.params.tab === 'sport-object-type'"/>
        <disciplines :key="$route.params.tab" v-if="$route.params.tab === 'disciplines'"/>
        <lesson-category :key="$route.params.tab" v-if="$route.params.tab === 'lesson-category'"/>
        <classes :key="$route.params.tab" v-if="$route.params.tab === 'classes'"/>
        <seasons :key="$route.params.tab" v-if="$route.params.tab === 'seasons'"/>
      </b-col>

    </b-row>
  </div>
</template>

<script>
  import EventBusEmit from '@/mixins/event-bus-emit'
  import TabLinks from '../../components/TabLinks'
  import SportObjectType from '@/views/dictionary/components/SportObjectType'
  import Disciplines from '@/views/dictionary/components/Disciplines'
  import LessonCategory from '@/views/dictionary/components/LessonCategory'
  import Classes from '@/views/dictionary/components/Classes'
  import Seasons from '@/views/dictionary/components/Seasons'

  export default {
    components: { TabLinks, SportObjectType, Disciplines, LessonCategory, Classes, Seasons },
    mixins: [ EventBusEmit ],
    data () {
      return {
        tabLinks: [
          {
            title: 'Kategorie zajęć',
            link: 'dictionary',
            tab: 'lesson-category'
          },
          {
            title: 'Dyscypliny',
            link: 'dictionary',
            tab: 'disciplines'
          },
          {
            title: 'Klasy',
            link: 'dictionary',
            tab: 'classes'
          },
          {
            title: 'Typy obiektów sportowych',
            link: 'dictionary',
            tab: 'sport-object-type'
          },
          {
            title: 'Czas trwania sezonu',
            link: 'dictionary',
            tab: 'seasons'
          }
        ]
      }
    },
    created () {
      if (this.$route.params.tab === undefined) {
        this.$router.push({ name: 'dictionary', params: { 'tab': 'sport-object-type' } })
      }

      this.changeAdminNavbarBreadcrumbs([ { text: 'Słownik', active: true } ])
    }
  }
</script>

<style scoped>

</style>
