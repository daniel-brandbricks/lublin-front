<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="12">
        <TabLinks :links="tabLinks"></TabLinks>
      </b-col>
    </b-row>

    <b-row class="justify-content-center">
      <b-col cols="8">
        <b-row class="align-items-center mb-3">
          <b-col cols="4">
            {{selectedDiscipline}}
            <treeselect class="custom"
                        v-model="selectedDiscipline"
                        :multiple="true"
                        placeholder="Dyscyplina"
                        :options="disciplines"/>
          </b-col>
          <b-col cols="4">
            <treeselect class="custom"
                        v-model="selectedSportObject"
                        :multiple="true"
                        placeholder="Obiekt"
                        :options="sportObjects"/>
          </b-col>
          <b-col cols="4">
            <b-form-group
              class="custom">
              <b-form-input id="input-1" class="custom m-0"
                            placeholder="Szukaj"
                            v-model="search"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <list-confirmed
      :filters="{selectedDiscipline: selectedDiscipline, selectedSportObject: selectedSportObject, search: search}"
      :key="$route.params.tab" v-if="$route.params.tab === 'confirmed'"/>
    <list-to-confirm
      :filters="{selectedDiscipline: selectedDiscipline, selectedSportObject: selectedSportObject, search: search}"
      :key="$route.params.tab" v-if="$route.params.tab === 'to-confirm'"/>

  </div>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import ListMixin from '@/mixins/list-mixin'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import TabLinks from '../../components/TabLinks'

  import ListConfirmed from '@/views/leaders/components/ListConfirmed'
  import ListToConfirm from '@/views/leaders/components/ListToConfirm'

  export default {
    name: 'Leaders',
    components: { TabLinks, ListConfirmed, ListToConfirm, Treeselect },
    mixins: [ EventBusEmit, ListMixin ],
    data () {
      return {
        tabLinks: [
          {
            title: 'Zatwierdzone',
            link: 'leaders',
            tab: 'confirmed'
          },
          {
            title: 'Do zatwierdzenia',
            link: 'leaders',
            tab: 'to-confirm'
          }
        ],

        selectedDiscipline: null,
        selectedSportObject: null,
        search: '',

        // temp
        disciplines: [
          { id: 1, label: 'Basen' },
          { id: 2, label: 'Siłownia' },
          { id: 3, label: 'Bieg' }
        ],
        sportObjects: [
          { id: 1, label: 'Park' },
          { id: 2, label: 'Siłownia' },
          { id: 3, label: 'Basen' }
        ]
      }
    },
    created () {
      if (this.$route.params.tab === undefined) {
        this.$router.push({ name: 'leaders', params: { 'tab': 'confirmed' } })
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: 'leader', params: { tab: 'main-data' } })
      this.changeAdminNavbarBreadcrumbs([ { text: 'Prowadzący', active: true } ])
    }
  }
</script>

<style scoped>

</style>
