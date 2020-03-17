<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="12">
        <h4>Zakres</h4>

        <b-row class="">
          <b-col cols="6">
            <b-row class="my-2">
              <b-col cols="5">
                <date-picker v-model="selectedYearFrom" :lang="lang"
                             :class="{'error-input-custom': veeErrors.has('history.from')}"
                             :name="'history.from'" :key="'history.from'"
                             id="inputDatapicFrom" placeholder="" class="w-100 custom mb-3">
                </date-picker>
              </b-col>
              <b-col cols="2">
                <hr class="mt-4">
              </b-col>
              <b-col cols="5">
                <date-picker v-model="selectedYearTo" :lang="lang"
                             :class="{'error-input-custom': veeErrors.has('history.to')}"
                             :name="'history.to'" :key="'history.to'"
                             id="inputDatapicTo" placeholder="" class="w-100 custom mb-3">
                </date-picker>
              </b-col>
            </b-row>
          </b-col>
          <b-col class="my-2">
            <treeselect class="custom"
                        v-model="selectedAction"
                        :multiple="false"
                        placeholder="Rodzaj akcji"
                        :options="actions"/>
          </b-col>
        </b-row>


        <!--        <b-form-group class="custom checkbox-big-span mb-3">-->
        <!--          <b-form-checkbox-group-->
        <!--            id="checkbox-group-1"-->
        <!--            v-model="showLessons"-->
        <!--            :options="[{text: 'Zajęcia', value: 1}]"-->
        <!--            :unchecked-value="false"-->
        <!--            value="false"-->
        <!--            name="flavour-1"-->
        <!--          />-->
        <!--        </b-form-group>-->

        <b-row class="align-items-center mb-2">
          <b-col>
            <b-form-group class="custom">
              <b-form-checkbox-group
                id="checkbox-group-type"
                v-model="selectedType"
                :options="typeOptions"
                name="checkbox-group-type"
              ></b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <b-col>
            <treeselect v-model="lessons.schoolsAndClubs"
                        :multiple="true"
                        :searchable="false"
                        placeholder="Nazwa klubu/Szkoły"
                        :options="schoolsAndClubsPrepared"
                        :class="{'error-input-custom': veeErrors.has('sportObject.schools')}"
                        name="sportObject.schools" key="sportObject.schools"
                        class="custom"/>
          </b-col>
        </b-row>

        <!--        <lessons v-show="showLessons.length > 0" :lessons="lessons"/>-->

        <!--        <b-form-group class="custom checkbox-big-span my-3">-->
        <!--          <b-form-checkbox-group-->
        <!--            id="checkbox-group-show-events"-->
        <!--            v-model="showEvents"-->
        <!--            :options="[{text: 'Wydarzenia', value: 1}]"-->
        <!--            :unchecked-value="false"-->
        <!--            value="false"-->
        <!--            name="checkbox-group-show-events"-->
        <!--          />-->
        <!--        </b-form-group>-->

        <!--        <events v-show="showEvents.length > 0" :events="events"/>-->
      </b-col>

      <b-col cols="12">
        <b-row class="justify-content-end">
          <b-btn variant="primary" class="mr-3" @click="filter(1, true)">Filtruj</b-btn>
        </b-row>
      </b-col>

      <b-col cols="12">
        <h4>Wyniki</h4>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
          aria-controls="history-table"
        />
        <b-row class="justify-content-center">
          <b-col cols="12">
            <b-table
              id="history-table"
              :items="historyData"
              :fields="historyFields"
              :per-page="perPage"
              striped
              sort-icon-left
              responsive="md"
              class="custom table-responsive"
            >
              <template slot="user" slot-scope="scope">
                <span v-if="scope.item.user">{{scope.item.user.firstName}} {{scope.item.user.lastName}}</span>
                <br>
                <span v-if="scope.item.user">{{scope.item.user.email}}</span>
              </template>
              <template slot="method" slot-scope="scope">
                <span v-if="scope.item">{{getMethodName(scope.item.method)}}</span>
              </template>
              <template slot="school" slot-scope="scope">
                <span v-if="scope.item.school">{{scope.item.school.name}}</span>
              </template>
              <template slot="changes" slot-scope="scope">
                <span v-show="scope.item.method !== 'DELETE'" class="c-pointer" @click="showChanges(scope.item.changes)">Zobać</span>
              </template>
              <!--              @row-clicked="rowRedirect"-->
            </b-table>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-modal ref="modalChanges"
             modal-class="custom"
             centered size="md"
             :hide-footer="true"
             footer-class="justify-content-between"
             title-tag="h2"
             header-class="pr-4 pb-0">

      <template slot="modal-title">
        Dane po zmianie
      </template>

      <div slot="default" class="d-flex">
        <b-row>
          <ul class="d-block">
            <li :key="index" v-for="(val, changesName, index) in parsedChanges">
              {{changesName}}: {{val}}
            </li>
          </ul>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import EventBusEmit from '@/mixins/event-bus-emit'

  import {DISTRICTS} from '@/config/AppConfig'

  import Lessons from '@/views/calendar/components/Lessons'
  import Events from '@/components/common-views/Events'
  import Calendar from '@/components/common-views/Calendar'
  import DatePicker from 'vue2-datepicker'

  export default {
    components: {Treeselect, Lessons, Events, Calendar, DatePicker},
    mixins: [EventBusEmit],
    data() {
      return {
        parsedChanges: {},

        currentPage: 1,
        perPage: 5,
        totalRows: 0,

        lang: {
          days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
          placeholder: {
            date: 'Select Date',
            dateRange: 'Select Date Range'
          }
        },

        selectedAction: null,
        selectedYearFrom: null,
        selectedYearTo: null,
        selectedType: [],
        typeOptions: [
          {text: 'klub', value: 0},
          {text: 'szkola', value: 1}
        ],
        // temp
        actions: [
          {id: 1, label: 'Dodanie'},
          {id: 2, label: 'Edycja'},
          {id: 3, label: 'Usunięcie'}
        ],
        actionsBE: [
          {val: 'POST', label: 'Dodanie'},
          {val: 'PUT', label: 'Edycja'},
          {val: 'DELETE', label: 'Usunięcie'}
        ],
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
          {key: 'id', label: 'id', sortable: true},
          {key: 'user', label: 'Kto', sortable: true},
          {key: 'object', label: 'Obiekt', sortable: true},
          {key: 'method', label: 'Typ', sortable: true},
          {key: 'school', label: 'szkoła / klub', sortable: true},
          {key: 'changes', label: 'Zmiana', sortable: true},
          {key: 'createdLog', label: 'Data', sortable: true}
        ],
        historyData: [
          {id: 1, name: 'Admin', date: '11/10/19', changes: 'Nazwa Kłubu "Lead" -> "Moc"'},
          {id: 2, name: 'Kłub', date: '10/10/19', changes: 'Test'},
          {id: 3, name: 'Prowadzący', date: '10/10/19', changes: 'Test'}
        ]
      }
    },
    computed: {
      schoolsAndClubsPrepared() {
        let data = this.$store.getters.schools
        let preparedSchools = []
        for (let schoolIndex in data) {
          if (this.selectedType.length > 0 && !this.selectedType.includes(data[schoolIndex].type)) continue
          preparedSchools.push({id: data[schoolIndex].id, label: data[schoolIndex].name})
        }

        return preparedSchools
      }
    },
    watch: {
      currentPage: function (val) {
        this.filter(val)
      },
      selectedType: function (val) {
        this.lessons.schoolsAndClubs = null
      }
    },
    methods: {
      hideModal() {
        this.$refs.modalChanges.hide()
      },
      showChanges(val) {
        this.parsedChanges = JSON.parse(val)
        this.$refs.modalChanges.show()
      },
      getMethodName(name) {
        let namePrepared = this.actionsBE.find(x => {
          return x.val === name
        })
        return undefined === namePrepared ? '' : namePrepared.label
      },
      filter (currentPage = 1, reset = false) {
        let filters = {
          selectedYearFrom: this.selectedYearFrom,
          selectedYearTo: this.selectedYearTo,
          selectedAction: this.selectedAction,
          schoolsAndClubs: this.lessons.schoolsAndClubs
        }

        this.$store.dispatch('getLogs', {filters: filters, currentPage: currentPage, perPage: 5})
          .then(response => {
            this.filterResponse(response, reset)
          })
      },
      filterResponse(response, reset) {
        this.historyData = response.data
        this.totalRows = response.totalCount

        if (reset) this.currentPage = 1
      }
    },
    created() {
      this.$store.dispatch('getSchools', {})
      this.$store.dispatch('getLogs', {currentPage: this.currentPage, perPage: this.perPage})
        .then(response => {
          this.filterResponse(response)
        })

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})
      this.changeAdminNavbarBreadcrumbs([{text: 'Historia', active: true}])
    }
  }
</script>

<style scoped>

</style>
