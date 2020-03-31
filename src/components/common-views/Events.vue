<template>
  <div>
<!--    <treeselect class="custom mb-2"-->
<!--                v-model="events.districtValue"-->
<!--                :multiple="true"-->
<!--                placeholder="Dzielnica"-->
<!--                :options="events.districts"/>-->
    <b-form-group class="custom">
      <b-form-input id="input-4" class="custom mb-2"
                    placeholder="Adres"
                    name="event.address" key="event.address"
                    v-model="events.address"/>
    </b-form-group>
    <treeselect class="custom mb-2"
                v-model="events.selectedDiscipline"
                :multiple="true"
                placeholder="Dyscyplina"
                :options="disciplinesPrepared"/>
    <b-form-group>
      <b-form-radio @change="clearData"
                    v-model="orgType" :value="element.value" class="d-inline-block mt-3 mr-3"
                    :class="{'error-input-custom': veeErrors.has('organizatorType')}"
                    name="organizatorType" :key="'organizatorType'+index" v-validate="{'required':true}"
                    v-for="(element,index) in [{title: 'Klub / Szkoła', value: 0}, {title: 'Inny podmiot', value: 1}]">
        {{ element.title }}
      </b-form-radio>
    </b-form-group>
    <treeselect class="custom mb-2" v-if="orgType === 0"
                v-model="events.selectedSchoolOrCLub"
                :multiple="true"
                placeholder="Organizator (Klub / Szkoła)"
                :options="schoolsAndClubsTreeselect"/>
    <b-form-group v-else
      class="custom">
      <b-form-input id="input-4" class="custom"
                    placeholder="Organizator (Inny podmiot)"
                    name="event.organizator" key="event.organizator"
                    v-model="events.organization"/>
    </b-form-group>
<!--    <treeselect class="custom mb-2"-->
<!--                v-model="events.selectedSportObject"-->
<!--                :multiple="true"-->
<!--                placeholder="Obiekt"-->
<!--                :options="events.sportObjects"/>-->
  </div>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import EventBusEmit from '@/mixins/event-bus-emit'

  export default {
    components: { Treeselect },
    mixins: [ EventBusEmit ],
    props: [ 'events', 'disciplinesPrepared', 'schoolsAndClubsTreeselect' ],
    data () {
      return {
        orgType: 0
      }
    },
    computed: {},
    methods: {
      clearData () {
        this.events.organization = ''
        this.events.selectedSchoolOrCLub = []
      }
    },
    created () {
    }
  }
</script>

<style scoped>

</style>
