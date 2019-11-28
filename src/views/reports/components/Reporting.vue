<template>
  <b-row>
    <b-col>
      <h4>Typ</h4>
      <b-form-group class="my-3">
        <b-form-radio class="d-inline-block mr-4" v-model="selectedRadio" name="some-radios" value="A">Zajęcia
        </b-form-radio>
        <b-form-radio class="d-inline-block mr-4" v-model="selectedRadio" name="some-radios" value="B">Frekwencje
        </b-form-radio>
        <b-form-radio class="d-inline-block" v-model="selectedRadio" name="some-radios" value="C">MTSF</b-form-radio>
      </b-form-group>

      <h4>Zakres</h4>

      <b-row class="my-3">
        <b-col cols="5">
          <treeselect class="custom"
                      v-model="selectedFrom"
                      :multiple="true"
                      placeholder="Od"
                      :options="years"/>
        </b-col>
        <b-col cols="2">
          <hr class="mt-4">
        </b-col>
        <b-col cols="5">
          <treeselect class="custom"
                      v-model="selectedTo"
                      :multiple="true"
                      placeholder="Do"
                      :options="years"/>
        </b-col>
      </b-row>

      <h4>Zajęcia</h4>

      <b-form-group class="custom my-3">
        <b-form-checkbox-group
          id="checkbox-group-type"
          v-model="selectedActive"
          :options="activeOptions"
          name="checkbox-group-type"
        ></b-form-checkbox-group>
      </b-form-group>

      <lessons :lessons="lessons"/>
    </b-col>
    <b-col>
      <h4>Wyniki</h4>
      <b-form-group class="custom my-3">
        <b-form-checkbox-group
          id="checkbox-group-filter"
          v-model="checkboxFilterValues"
          :options="checkboxFilters"
          name="checkbox-group-typefilter"
        ></b-form-checkbox-group>
      </b-form-group>
      <hr>
      <b-table v-if="checkboxFilterValues.length > 0"
               :items="listItems"
               :fields="fields"
               striped
               sort-icon-left
               responsive="md"
               class="custom table-responsive"
      >
        <!--              @row-clicked="rowRedirect"-->
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
  import Lessons from '@/views/reports/components/lessons'
  import EventBusEmit from '@/mixins/event-bus-emit'

  export default {
    name: 'Reporting',
    components: { Treeselect, Events, TabLinks, Calendar, Lessons },
    mixins: [ EventBusEmit ],
    data () {
      return {
        selectedRadio: 'A',

        selectedFrom: null,
        selectedTo: null,
        // temp
        years: [
          { id: 1, label: '2000' },
          { id: 2, label: '2001' },
          { id: 3, label: '2002' }
        ],

        selectedActive: [],
        activeOptions: [
          { text: 'Aktywny', value: 1 },
          { text: 'Nieaktywny', value: 0 }
        ],

        lessons: {
          districtValue: null,
          districts: DISTRICTS,

          selectedType: [],
          typeOptions: [
            { text: 'klub', value: 0 },
            { text: 'szkola', value: 1 }
          ],
          selectedGender: [],
          genderOptions: [
            { text: 'kobieta', value: 0 },
            { text: 'mężczyzna', value: 1 }
          ],

          schoolsAndClubs: null,
          selectedDiscipline: null,
          selectedCategory: null,
          selectedClass: null,
          selectedYearFrom: null,
          selectedYearTo: null,
          selectedSportObject: null,
          selectedLeader: null,
          selectedParticipant: null,
          selectedLesson: null,

          // temp
          years: [
            { id: 1, label: '2000' },
            { id: 2, label: '2001' },
            { id: 3, label: '2002' }
          ],
          disciplines: [
            { id: 1, label: 'Basen' },
            { id: 2, label: 'Siłownia' },
            { id: 3, label: 'Bieg' }
          ],
          categories: [
            { id: 1, label: 'pierwsza' },
            { id: 2, label: 'druga' },
            { id: 3, label: 'cos cos' }
          ],
          classes: [
            { id: 1, label: '2b' },
            { id: 2, label: '6a' },
            { id: 3, label: '8c' }
          ],
          sportObjects: [
            { id: 1, label: 'Park' },
            { id: 2, label: 'Siłownia' },
            { id: 3, label: 'Basen' }
          ],
          leaders: [
            { id: 1, label: 'Mark White' },
            { id: 2, label: 'Ben Stiffler' },
            { id: 3, label: 'Thomas Shelby' }
          ]
        },

        checkboxFilterValues: [],
        checkboxFilters: [
          { text: 'Dzielnica', value: 0, key: 'district' },
          { text: 'Klub/Szkoła', value: 1, key: 'klubOrSchool' },
          { text: 'Obiekt', value: 2, key: 'object' },
          { text: 'Dyscyplina', value: 3, key: 'discipline' },
          { text: 'Kategoria', value: 4, key: 'category' },
          { text: 'Klasa', value: 5, key: 'class' },
          { text: 'Prowadzący', value: 6, key: 'leader' },
          { text: 'Lista zawodników', value: 7, key: 'participantList' },
          { text: 'Płeć', value: 8, key: 'gender' },
          { text: 'Zawodnik', value: 9, key: 'participant' },
          { text: 'Rocznik', value: 10, key: 'year' },
          { text: 'Data', value: 11, key: 'date' },
          { text: 'Status', value: 12, key: 'status' }
        ],

        fields: [],
        listItems: [
          {
            id: 1,
            district: 'Centrum',
            klubOrSchool: 'Kłub',
            object: 'Park',
            discipline: 'Bieg 50m',
            category: '2',
            class: '4A',
            leader: 'Marek',
            participantList: 'PL',
            gender: 'M',
            participant: '13',
            year: '2003',
            date: '23/11/19',
            status: '1'
          },
          {
            id: 1,
            district: 'Centrum',
            klubOrSchool: 'Kłub',
            object: 'Park',
            discipline: 'Bieg 50m',
            category: '2',
            class: '4A',
            leader: 'Marek',
            participantList: 'PL',
            gender: 'M',
            participant: '13',
            year: '2003',
            date: '23/11/19',
            status: '1'
          },
          {
            id: 1,
            district: 'Centrum',
            klubOrSchool: 'Kłub',
            object: 'Park',
            discipline: 'Bieg 50m',
            category: '2',
            class: '4A',
            leader: 'Marek',
            participantList: 'PL',
            gender: 'M',
            participant: '13',
            year: '2003',
            date: '23/11/19',
            status: '1'
          },
          {
            id: 1,
            district: 'Centrum',
            klubOrSchool: 'Kłub',
            object: 'Park',
            discipline: 'Bieg 50m',
            category: '2',
            class: '4A',
            leader: 'Marek',
            participantList: 'PL',
            gender: 'M',
            participant: '13',
            year: '2003',
            date: '23/11/19',
            status: '1'
          }
        ]
      }
    },
    computed: {},
    watch: {
      checkboxFilterValues: function (val) {
        let columns = []
        for (let index in val) {
          let res = this.checkboxFilters.filter(obj => {
            return obj.value === val[index]
          })
          columns.push({ key: res[0].key, label: res[0].text, sortable: true })
        }
        this.fields = columns
      }
    },
    methods: {},
    created () {
      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false, generateExcel: true, generatePdf: true })
    }
  }
</script>

<style scoped>

</style>
