<template>
  <b-row>
    <b-col cols="12" xl="6" lg="6" md="12" sm="12" class="mb-2">
      <h4>Typ</h4>
      <b-form-group class="my-3">
        <b-form-radio class="d-inline-block mr-4" v-model="selectedType" name="some-radios" value="Zajęcia">Zajęcia
        </b-form-radio>
        <b-form-radio class="d-inline-block mr-4" v-model="selectedType" name="some-radios" value="Frekwencja">Frekwencja
        </b-form-radio>
<!--        <b-form-radio class="d-inline-block" v-model="selectedType" name="some-radios" value="MTSF">MTSF</b-form-radio>-->
      </b-form-group>

      <h4>Zakres</h4>

      <b-row class="my-3">
        <b-col cols="5">
          <date-picker v-model="selectedYearFrom" :lang="datepickerParams.lang"
                       :class="{'error-input-custom': veeErrors.has('selectedYearFrom')}"
                       :name="'selectedYearFrom'" :key="'selectedYearFrom'"
                       value-type="format" format="YYYY-MM-DD"
                       v-validate="{'required': true}"
                       type="date"
                       :id="'selectedYearFrom'" placeholder="Od" class="w-100 custom mt-3">
          </date-picker>
        </b-col>
        <b-col cols="2">
          <hr class="mt-4 mb-0">
        </b-col>
        <b-col cols="5">
          <date-picker v-model="selectedYearTo" :lang="datepickerParams.lang"
                       :class="{'error-input-custom': veeErrors.has('selectedYearTo')}"
                       :name="'selectedYearTo'" :key="'selectedYearTo'"
                       value-type="format" format="YYYY-MM-DD"
                       type="date"
                       v-validate="{'required': true}"
                       :id="'selectedYearTo'" placeholder="Do" class="w-100 custom mt-3">
          </date-picker>
        </b-col>
      </b-row>

      <h4 class="mt-5">Wybierz wyniki</h4>
<!--      <b-form-group class="custom my-3">-->
        <b-form-checkbox-group
          id="checkbox-group-filter"
          class=""
          v-model="checkboxFilterValues"
          :options="checkboxFilters"
          name="checkbox-group-typefilter"
        ></b-form-checkbox-group>
<!--      </b-form-group>-->
      <!--      <hr>-->
      <!--      <b-table v-if="checkboxFilterValues.length > 0"-->
      <!--               :items="listItems"-->
      <!--               :fields="fields"-->
      <!--               striped-->
      <!--               sort-icon-left-->
      <!--               responsive="md"-->
      <!--               class="custom table-responsive"-->
      <!--      >-->
      <!--        &lt;!&ndash;              @row-clicked="rowRedirect"&ndash;&gt;-->
      <!--        <template slot="edit" slot-scope="scope">-->
      <!--          <b-link class="icon-link">-->
      <!--            <span class="icon icon-iconm_search"></span>-->
      <!--          </b-link>-->
      <!--        </template>-->
      <!--      </b-table>-->
    </b-col>
    <b-col cols="12" xl="6" lg="6" md="12" sm="12" class="mb-2">
      <h4>Zajęcia</h4>

      <b-form-group class="custom my-3">
        <b-form-checkbox-group
          id="checkbox-group-type-lesson-active"
          v-model="lessons.selectedAccepted"
          :options="activeOptions"
          name="checkbox-group-type-lesson-active"
        ></b-form-checkbox-group>
      </b-form-group>

      <!--      <lessons :lessons="lessons"/>-->
      <LessonsFromCalendar :districts="districts" :lessons="lessons"/>
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
  import Lessons from '@/views/reports/components/lessons'
  import LessonsFromCalendar from '@/views/calendar/components/lessons'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import DatePicker from 'vue2-datepicker'

  export default {
    name: 'Reporting',
    components: {Treeselect, LessonsFromCalendar, Events, TabLinks, Calendar, Lessons, DatePicker},
    mixins: [EventBusEmit],
    data () {
      return {
        generateExcel: true,
        generatePdf: true,

        districts: DISTRICTS,

        datepickerParams: DATEPICKER_PARAMS,
        selectedYearFrom: null,
        selectedYearTo: null,

        selectedType: 'Zajęcia',

        activeOptions: [
          { text: 'Aktywne', value: 1 },
          { text: 'Nie aktywne', value: 0 }
        ],
        lessons: {
          selectedAccepted: [],
          districtValue: null,
          selectedType: [],
          schoolsAndClubs: null,
          selectedDiscipline: null,
          selectedCategory: null,
          selectedClass: null,
          selectedSportObject: null,
          selectedLeader: null,
          selectedLesson: null
        },

        checkboxFilterValues: [15],
        checkboxFilters: [
          {text: 'Dzielnica', value: 0, key: 'district'},
          {text: 'Klub/Szkoła', value: 1, key: 'klubOrSchool'},
          {text: 'Obiekt', value: 2, key: 'object'},
          {text: 'Dyscyplina', value: 3, key: 'discipline'},
          {text: 'Kategoria', value: 4, key: 'category'},
          {text: 'Klasa', value: 5, key: 'class'},
          {text: 'Prowadzący', value: 6, key: 'leader'},
          {text: 'Lista zawodników', value: 7, key: 'participantList'},
          {text: 'Płeć', value: 8, key: 'gender'},
          {text: 'Zawodnik', value: 9, key: 'participant'},
          {text: 'Rocznik', value: 10, key: 'year'},
          {text: 'Data', value: 11, key: 'date'},
          {text: 'Status', value: 12, key: 'status'},
          {text: 'Zastępstwo', value: 13, key: 'replacementLeader'},
          {text: 'Odwolanie', value: 14, key: 'newDate'},
          {text: 'Nazwa', value: 15, key: 'title'}
        ],

        fields: [],
        // temp
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
          columns.push({key: res[0].key, label: res[0].text, sortable: true})
        }
        this.fields = columns

        this.changeAdminNavbarButtonWithParams()
      },
      selectedType: function (val) {
        if (val === 'Zajęcia') {
          this.generateExcel = true
        } else {
          this.generateExcel = false
        }
        this.changeAdminNavbarButtonWithParams()
      },
      lessons: {
        handler: function (val) {
          this.changeAdminNavbarButtonWithParams()
        },
        deep: true
      },
      selectedYearTo: function (val) {
        this.changeAdminNavbarButtonWithParams()
      },
      selectedYearFrom: function (val) {
        this.changeAdminNavbarButtonWithParams()
      }
    },
    methods: {
      changeAdminNavbarButtonWithParams () {
        this.changeAdminNavbarButton({
          buttonLink: false,
          generateExcel: this.generateExcel,
          generatePdf: this.generatePdf,
          generationParams: {
            type: this.selectedType,
            lesson: this.lessons,
            dateFrom: this.selectedYearFrom,
            dateTo: this.selectedYearTo,
            results: this.checkboxFilterValues
          }
        })
      }
    },
    created () {
      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false, generateExcel: true, generatePdf: true})
      this.changeAdminNavbarBreadcrumbs([ { text: 'Raporty', active: true } ])
    }
  }
</script>

<style scoped>

</style>
