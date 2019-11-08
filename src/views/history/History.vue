<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="6">
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

        <b-form-group class="custom checkbox-big-span mb-3">
          <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="showLessons"
            :options="[{text: 'Zajęcia', value: 1}]"
            :unchecked-value="false"
            value="false"
            name="flavour-1"
          ></b-form-checkbox-group>
        </b-form-group>

        <lessons v-show="showLessons.length > 0" :lessons="lessons"/>

        <b-form-group class="custom checkbox-big-span my-3">
          <b-form-checkbox-group
            id="checkbox-group-show-events"
            v-model="showEvents"
            :options="[{text: 'Wydarzenia', value: 1}]"
            :unchecked-value="false"
            value="false"
            name="checkbox-group-show-events"
          ></b-form-checkbox-group>
        </b-form-group>

        <events v-show="showEvents.length > 0" :events="events"/>
      </b-col>

      <b-col cols="6">
        <h4>Wyniki</h4>
        <b-row class="justify-content-center">
          <b-col cols="12">
            <b-table
              :items="historyData"
              :fields="historyFields"
              striped
              sort-icon-left
              responsive="md"
              class="custom table-responsive"
            >
              <!--              @row-clicked="rowRedirect"-->
            </b-table>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// node_modules
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import EventBusEmit from '@/mixins/event-bus-emit'

import { DISTRICTS } from '@/config/AppConfig'

import Lessons from '@/views/calendar/components/Lessons'
import Events from '@/components/common-views/Events'
import Calendar from '@/components/common-views/Calendar'

export default {
  components: {Treeselect, Lessons, Events, Calendar},
  mixins: [EventBusEmit],
  data () {
    return {
      selectedYearFrom: null,
      selectedYearTo: null,
      // temp
      years: [
        {id: 1, label: '2000'},
        {id: 2, label: '2001'},
        {id: 3, label: '2002'}
      ],

      lessons: {
        districtValue: null,
        districts: DISTRICTS,

        selectedType: [],
        typeOptions: [
          {text: 'klub', value: 0},
          {text: 'szkola', value: 1}
        ],
        selectedGender: [],
        genderOptions: [
          {text: 'kobieta', value: 0},
          {text: 'mężczyzna', value: 1}
        ],

        schoolsAndClubs: null,
        selectedDiscipline: null,
        selectedCategory: null,
        selectedClass: null,
        selectedYear: null,
        selectedSportObject: null,
        selectedLeader: null,
        selectedParticipant: null,
        selectedLesson: null,
        // temp
        disciplines: [
          {id: 1, label: 'Basen'},
          {id: 2, label: 'Siłownia'},
          {id: 3, label: 'Bieg'}
        ],
        categories: [
          {id: 1, label: 'pierwsza'},
          {id: 2, label: 'druga'},
          {id: 3, label: 'cos cos'}
        ],
        classes: [
          {id: 1, label: '2b'},
          {id: 2, label: '6a'},
          {id: 3, label: '8c'}
        ],
        sportObjects: [
          {id: 1, label: 'Park'},
          {id: 2, label: 'Siłownia'},
          {id: 3, label: 'Basen'}
        ],
        leaders: [
          {id: 1, label: 'Mark White'},
          {id: 2, label: 'Ben Stiffler'},
          {id: 3, label: 'Thomas Shelby'}
        ]
      },

      events: {
        districtValue: null,
        districts: DISTRICTS,
        selectedDiscipline: null,
        // temp
        disciplines: [
          {id: 1, label: 'Basen'},
          {id: 2, label: 'Siłownia'},
          {id: 3, label: 'Bieg'}
        ],
        selectedSportObject: null,
        sportObjects: [
          {id: 1, label: 'Park'},
          {id: 2, label: 'Siłownia'},
          {id: 3, label: 'Basen'}
        ],
        selectedSchoolOrCLub: null,
        schoolsOrClubs: [
          {id: 1, label: 'Park'},
          {id: 2, label: 'Siłownia'},
          {id: 3, label: 'Basen'}
        ]
      },

      showLessons: [1],
      showEvents: [1],

      historyFields: [
        {key: 'name', label: 'Kto', sortable: true},
        {key: 'date', label: 'Data', sortable: true},
        {key: 'changes', label: 'Zmiana', sortable: true}
      ],
      historyData: [
        {id: 1, name: 'Admin', date: '11/10/19', changes: 'Nazwa Kłubu "Lead" -> "Moc"'},
        {id: 2, name: 'Kłub', date: '10/10/19', changes: 'Test'},
        {id: 3, name: 'Prowadzący', date: '10/10/19', changes: 'Test'}
      ]
    }
  },
  computed: {
    // copied in FormMainData.vue -> sports-objects
    schoolsAndClubsPrepared () {
      // eslint-disable-next-line one-var
      let data = this.$store.getters.schools,
        preparedSchools = []

      for (let schoolIndex in data) {
        preparedSchools.push({ id: data[schoolIndex].id, label: data[schoolIndex].name })
      }

      console.log(preparedSchools)
      return preparedSchools
    }
  },
  created () {
    this.$store.dispatch('getSchools', {})

    /** @buttonLink route name || false if button must be hidden */
    this.changeAdminNavbarButton({buttonLink: false})
    this.changeAdminNavbarBreadcrumbs([{text: 'Historia', active: true}])
  }
}
</script>

<style scoped>

</style>
