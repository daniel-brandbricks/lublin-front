<template>
  <div>
    <treeselect class="custom mb-2"
                v-model="events.districtValue"
                :multiple="true"
                placeholder="Dzielnica"
                :options="events.districts"/>
    <treeselect class="custom mb-2"
                v-model="events.selectedDiscipline"
                :multiple="true"
                placeholder="Dyscyplina"
                :options="events.disciplines"/>
    <treeselect class="custom mb-2"
                v-model="events.selectedSchoolOrCLub"
                :multiple="true"
                placeholder="Organizator"
                :options="events.schoolsOrClubs"/>
    <treeselect class="custom mb-2"
                v-model="events.selectedSportObject"
                :multiple="true"
                placeholder="Obiekt"
                :options="events.sportObjects"/>
  </div>
</template>

<script>
// node_modules
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import EventBusEmit from '@/mixins/event-bus-emit'

export default {
  components: {Treeselect},
  mixins: [EventBusEmit],
  props: ['events'],
  data () {
    return {}
  },
  computed: {},
  created () {}
}
</script>

<style scoped>

</style>
