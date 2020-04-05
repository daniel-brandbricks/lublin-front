<template>
  <b-row class="justify-content-center">
    <b-col cols="6">
      <h4>Zakres</h4>
      <b-row class="my-3">
        <b-col cols="5">
          <date-picker v-model="events.selectedYearFrom" :lang="datepickerParams.lang"
                       :class="{'error-input-custom': veeErrors.has('selectedYearFrom')}"
                       :name="'selectedYearFrom'" :key="'selectedYearFrom'"
                       value-type="format" format="YYYY-MM-DD"
                       type="date"
                       v-validate="{'required': true}"
                       :id="'selectedYearFrom'" placeholder="Od" class="w-100 custom mt-3">
          </date-picker>
        </b-col>
        <b-col cols="2">
          <hr class="mt-4 mb-0">
        </b-col>
        <b-col cols="5">
          <date-picker v-model="events.selectedYearTo" :lang="datepickerParams.lang"
                       :class="{'error-input-custom': veeErrors.has('selectedYearTo')}"
                       :name="'selectedYearTo'" :key="'selectedYearTo'"
                       value-type="format" format="YYYY-MM-DD"
                       type="date"
                       v-validate="{'required': true}"
                       :id="'selectedYearTo'" placeholder="Do" class="w-100 custom mt-3">
          </date-picker>
        </b-col>
      </b-row>

      <h4 class="mb-3">Wydarzenia</h4>
      <events :events="events" :disciplinesPrepared="disciplinesPrepared"
              :schoolId="schoolId"
              :schoolsAndClubsTreeselect="schoolsAndClubsTreeselect"/>
      <b-btn class="d-block ml-auto" variant="primary" @click="findEvents">Szukaj</b-btn>
    </b-col>
    <b-col cols="10">
<!--      <b-row class="justify-content-center">-->
<!--        <b-col cols="12">-->
<!--          <TabLinks :links="tabLinks"></TabLinks>-->
<!--        </b-col>-->
<!--      </b-row>-->

<!--      <calendar :key="$route.params.tab"/>-->

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
        <template slot="dateStart" slot-scope="scope">
          <span>{{scope.item.dateStart.substr(0, scope.item.dateStart.indexOf(' '))}}</span>
        </template>

        <template slot="discipline" slot-scope="scope">
          <span v-if="scope.item.discipline && scope.item.discipline.id">
            {{getDisciplineTitleById(scope.item.discipline.id)}}
          </span>
        </template>

        <template slot="organization" slot-scope="scope">
          <span v-if="scope.item.organization">{{scope.item.organization}}</span>
          <span v-else-if="scope.item.school && scope.item.school.id">
            {{getSchoolNameById(scope.item.school.id)}}
          </span>
        </template>

        <template slot="edit" slot-scope="scope">
          <span class="c-pointer">Szczegóły</span>
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
  import {DATEPICKER_PARAMS, DISTRICTS} from '@/config/AppConfig'
  import TabLinks from '@/components/TabLinks'
  import Calendar from '@/components/common-views/Calendar'
  import EventsMixin from '@/mixins/event-mixin'
  import DatePicker from 'vue2-datepicker'

  export default {
    name: 'ListConfirmed',
    components: { Treeselect, Events, TabLinks, Calendar, DatePicker },
    mixins: [ EventsMixin ],
    props: ['schoolId'],
    data () {
      return {
        datepickerParams: DATEPICKER_PARAMS,
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

        // districtValue: null,
        // districts: DISTRICTS,
        // selectedSportObject: null,

        events: {
          selectedYearFrom: null,
          selectedYearTo: null,
          address: '',
          organization: '',
          selectedDiscipline: null,
          selectedSchoolOrCLub: null
        },
        //  table
        fields: [
          { key: 'dateStart', label: 'Data rozpoczęcia', sortable: true },
          { key: 'title', label: 'Nazwa', sortable: true },
          { key: 'discipline', label: 'Dyscyplina', sortable: true },
          { key: 'organization', label: 'Organizator', sortable: true },
          { key: 'edit', label: ' ', sortable: true }
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
      },
      findEvents() {
        this.$store.dispatch('getEvents', { confirmed: 1, filters: JSON.stringify(this.events) })
      }
    },
    created () {
      if (this.schoolId) {
        this.events.selectedSchoolOrCLub = [this.schoolId]
        this.$store.dispatch('getEvents', { confirmed: 1, filters: JSON.stringify(this.events) })
      } else {
        this.$store.dispatch('getSchools', {})
        this.$store.dispatch('getEvents', { confirmed: 1 })
      }

      this.$store.dispatch('getDisciplines')
    }
  }
</script>

<style scoped>

</style>
