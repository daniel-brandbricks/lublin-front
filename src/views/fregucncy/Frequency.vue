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

        <h4 class="mb-3">Zajęcia</h4>
        <lessons :lessons="lessons"/>
      </b-col>

      <b-col cols="6">
        <h4 class="mb-3">Wyniki</h4>

        <h5>21.11.19</h5>
        <b-table
          :items="tableData1"
          :fields="fields"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive">
          <!--          @row-clicked="rowRedirect"-->
          <template slot="edit" slot-scope="scope">
            <b-link class="icon-link">
              <span class="icon icon-iconm_search"></span>
            </b-link>
          </template>
        </b-table>

        <h5>22.11.19</h5>
        <b-table
          :items="tableData2"
          :fields="fields"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive">
          <!--          @row-clicked="rowRedirect"-->
          <template slot="edit" slot-scope="scope">
            <b-link class="icon-link">
              <span class="icon icon-iconm_search"></span>
            </b-link>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import EventBusEmit from '@/mixins/event-bus-emit'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

// todo in common component (using in Calendar.vue)
import Lessons from '@/views/calendar/components/Lessons'

import { DISTRICTS } from '@/config/AppConfig'

export default {
  name: 'Frequency',
  components: {Treeselect, Lessons},
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

      fields: [
        {key: 'name', label: 'Nazwa listy', sortable: true},
        {key: 'discipline', label: 'Dyscyplina', sortable: true},
        {key: 'gender', label: 'Płeć', sortable: true},
        {key: 'category', label: 'Kategoria', sortable: true},
        {key: 'class', label: 'Klasa', sortable: true},
        {key: 'resence', label: 'Obecność', sortable: true},
        {key: 'edit', label: ''}
      ],
      tableData1: [
        {name: 'Test', discipline: 'Biegun', gender: 1, category: 1, class: 1, resence: '5z9'},
        {name: 'Test', discipline: 'Biegun', gender: 1, category: 1, class: 1, resence: '5z9'},
        {name: 'Test', discipline: 'Biegun', gender: 1, category: 1, class: 1, resence: '5z9'},
        {name: 'Test', discipline: 'Biegun', gender: 1, category: 1, class: 1, resence: '5z9'}
      ],
      tableData2: [
        {name: 'Test 2', discipline: 'Biegun', gender: 2, category: 3, class: 5, resence: '4z6'},
        {name: 'Test 2', discipline: 'Biegun', gender: 2, category: 3, class: 5, resence: '4z6'},
        {name: 'Test 2', discipline: 'Biegun', gender: 2, category: 3, class: 5, resence: '4z6'},
        {name: 'Test 2', discipline: 'Biegun', gender: 2, category: 3, class: 5, resence: '4z6'}
      ]
    }
  },
  created () {
    /** @buttonLink route name || false if button must be hidden */
    this.changeAdminNavbarButton({buttonLink: false})
    this.changeAdminNavbarBreadcrumbs([{text: 'Frekwencja', active: true}])
  }
}
</script>

<style scoped>

</style>
