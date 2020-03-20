<template>
  <b-row>
    <b-col>
      <h4>Zakres</h4>
      <b-row class="my-3">
        <b-col cols="5">
          <treeselect class="custom"
                      v-model="selectedYearFrom"
                      :multiple="true"
                      placeholder="Od"
                      :options="years"/>
        </b-col>
        <b-col cols="2">
          <hr class="mt-4">
        </b-col>
        <b-col cols="5">
          <treeselect class="custom"
                      v-model="selectedYearTo"
                      :multiple="true"
                      placeholder="Do"
                      :options="years"/>
        </b-col>
      </b-row>

      <h4 class="mb-3">Wydarzenia</h4>
      <events :events="events"/>

    </b-col>
    <b-col>
      <b-row class="justify-content-center">
        <b-col cols="12">
          <TabLinks :links="tabLinks"></TabLinks>
        </b-col>
      </b-row>

      <calendar :key="$route.params.tab"/>

      <h4 class="my-3">Wyniki</h4>
      <b-table
        :items="eventListFiltered"
        :fields="fields"
        striped
        sort-icon-left
        responsive="md"
        class="custom table-responsive"
        @row-clicked="rowRedirect"
      >
        <template slot="name" slot-scope="scope">
          <div class="d-flex align-items-center justify-content-between">
            <div class="wrap-img-type-table mr-3">
              <img :src="'https://placeimg.com/50/50/any'" alt="">
            </div>
            <span>{{scope.item.name}}</span>
          </div>
        </template>
        <template slot="edit" slot-scope="scope">
          <b-link class="icon-link">
            <span class="icon icon-iconm_search"></span>
          </b-link>
        </template>

      </b-table>
    </b-col>
  </b-row>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import Events from '@/components/common-views/Events'
  import { DISTRICTS } from '@/config/AppConfig'
  import TabLinks from '@/components/TabLinks'
  import Calendar from '@/components/common-views/Calendar'
  import EventsMixin from '@/mixins/event-mixin'

  export default {
    name: 'ListConfirmed',
    components: { Treeselect, Events, TabLinks, Calendar },
    mixins: [ EventsMixin ],
    data () {
      return {
        tabLinks: [
          {
            title: 'Kalendarz',
            link: 'events',
            tab: 'confirmed'
          },
          {
            title: 'Lista',
            link: 'events',
            tab: 'confirmed'
          }
        ],

        selectedYearFrom: null,
        selectedYearTo: null,
        // temp
        years: [
          { id: 1, label: '2000' },
          { id: 2, label: '2001' },
          { id: 3, label: '2002' }
        ],

        events: {
          districtValue: null,
          districts: DISTRICTS,
          selectedDiscipline: null,
          // temp
          disciplines: [
            { id: 1, label: 'Basen' },
            { id: 2, label: 'Siłownia' },
            { id: 3, label: 'Bieg' }
          ],
          selectedSportObject: null,
          sportObjects: [
            { id: 1, label: 'Park' },
            { id: 2, label: 'Siłownia' },
            { id: 3, label: 'Basen' }
          ],
          selectedSchoolOrCLub: null,
          schoolsOrClubs: [
            { id: 1, label: 'Park' },
            { id: 2, label: 'Siłownia' },
            { id: 3, label: 'Basen' }
          ]
        },
        //  table
        fields: [
          { key: 'title', label: 'Nazwa', sortable: true },
          { key: 'description', label: 'Opis', sortable: true },
          { key: 'phone', label: 'Telefon', sortable: true },
          { key: 'edit', label: '' }
        ]
      }
    },
    computed: {
      eventsConfirmed () {
        return this.$store.getters.eventsConfirmed
      }
    },
    methods: {
      rowRedirect (row) {
        this.$parent.rowRedirect(row.id, true)
      }
    },
    created () {
      this.$store.dispatch('getEvents', { confirmed: 1 })
    }
  }
</script>

<style scoped>

</style>
