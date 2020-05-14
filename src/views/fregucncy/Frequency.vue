<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="12" v-if="undefined === lessonId">
        <h4>Zakres</h4>

        <b-row class="my-3 justify-content-center">
          <b-col cols="12" xl="6" lg="6" md="12" sm="12" class="mb-2">
            <b-row>
              <b-col cols="5">
                <date-picker v-model="selectedYearFrom" :lang="datepickerParams.lang"
                             :class="{'error-input-custom': veeErrors.has('freq.from')}"
                             :name="'freq.from'" :key="'freq.from'"
                             id="inputDatapicFromfreq" placeholder="" class="w-100 custom mb-3">
                </date-picker>
              </b-col>
              <b-col cols="2">
                <hr class="mt-3">
              </b-col>
              <b-col cols="5">
                <date-picker v-model="selectedYearTo" :lang="datepickerParams.lang"
                             :class="{'error-input-custom': veeErrors.has('freq.to')}"
                             :name="'freq.to'" :key="'freq.to'"
                             id="inputDatapicTofreq" placeholder="" class="w-100 custom mb-3">
                </date-picker>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" xl="6" lg="6" md="12" sm="12" class="mb-2">
            <b-form-checkbox-group
              v-if="undefined === schoolId && undefined === lessonId"
              id="checkbox-group-type"
              v-model="selectedType"
              :options="typeOptions"
              name="checkbox-group-type"
            />
          </b-col>
        </b-row>
        <b-row class="justify-content-between">
          <b-col cols="12" xl="6" lg="6" md="12" sm="12" class="mb-2">
            <treeselect v-model="schoolsAndClubs"
                        :multiple="false"
                        :disabled="schoolId !== undefined || lessonId !== undefined"
                        :searchable="false"
                        placeholder="Szkoła / klub"
                        :options="schoolsAndClubsPrepared"
                        class="custom"/>

          </b-col>
          <b-col class="text-align-right mt-3 mb-2" cols="12" xl="6" lg="6" md="12" sm="12">
            <b-btn variant="primary" @click="filter(1, true)">Filtruj</b-btn>
            <!--            <treeselect v-model="lessonsSelected"-->
            <!--                        :multiple="true"-->
            <!--                        :searchable="false"-->
            <!--                        placeholder="Zajęcia"-->
            <!--                        :options="schoolsAndClubsPrepared"-->
            <!--                        class="custom"/>-->
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="12">
        <h4 class="mt-3" v-if="undefined === lessonId">Wyniki</h4>
        <b-pagination
          v-if="undefined === lessonId"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
          aria-controls="history-table"
        />
        <b-table
          id="frequency-table"
          :items="tableData"
          @sort-changed="sortingChanged"
          :fields="fields"
          :per-page="perPage"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive">

          <template slot="title" slot-scope="scope">
            <span v-if="scope.item.lesson">{{scope.item.lesson.title}}</span>
          </template>
          <template slot="day" slot-scope="scope">
            <span v-if="scope.item.lesson">{{scope.item.lesson.date}}</span>
          </template>
          <template slot="hour" slot-scope="scope">
            <span v-if="scope.item.lesson">{{scope.item.lesson.timeRange}}</span>
          </template>
          <template slot="category" slot-scope="scope">
            <span v-if="scope.item.lesson">{{scope.item.lesson.lessonCategory.title}}</span>
          </template>
          <template slot="discipline" slot-scope="scope">
            <span v-if="scope.item.lesson">{{scope.item.lesson.discipline.title}}</span>
          </template>
          <template slot="list" slot-scope="scope">
            <span v-if="scope.item.lesson">{{scope.item.lesson.participantGroup.title}}</span>
          </template>
          <template slot="leader" slot-scope="scope">
            <span
              v-if="scope.item.lesson">{{scope.item.lesson.leader.firstName}} {{scope.item.lesson.leader.firstName}}</span>
            <br>
            <span v-if="scope.item.lesson">{{scope.item.lesson.leader.email}}</span>
          </template>
          <template slot="frequency" slot-scope="scope">
            <span class="c-pointer" v-if="scope.item"
                  @click="showFrequency(scope.item.frequencyParticipants, scope.item.id)">Szczegóły
              ({{getFrequencyCount(scope.item.frequencyParticipants)}})</span>
          </template>

        </b-table>
      </b-col>
    </b-row>

    <b-modal ref="modalFrequency"
             modal-class="custom"
             centered size="md"
             :hide-footer="true"
             footer-class="justify-content-between"
             title-tag="h2"
             header-class="pr-4 pb-0">

      <template slot="modal-title">
        Obecność
      </template>

      <div slot="default" class="d-block mt-3">
        <div :key="index" v-for="(val,index) in parsedFrequency" class="d-flex justify-content-between">
          <b-col>
            <ul class="d-block">
              <li>
                {{val.fullName}}:
              </li>
            </ul>
          </b-col>
          <b-col>
            <b-form-group class="custom">
              <b-form-radio-group
                :id="'checkbox-group-type'+val.fullName+val.id"
                v-model="parsedFrequency[index].active"
                :options="[{text: 'tak', value: true}, {text: 'nie', value: false}]"
                :name="'checkbox-group-type'+val.fullName+val.id"
              />
            </b-form-group>
          </b-col>
        </div>

        <b-row class="justify-content-end">
          <b-btn variant="primary" class="my-2" @click="saveFrequency">Zapisz</b-btn>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import EventBusEmit from '@/mixins/event-bus-emit'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import ToastMixin from '@/mixins/toast-mixin'

  // todo in common component (using in Calendar.vue)
  import Lessons from '@/views/calendar/components/Lessons'

  import {DISTRICTS, DATEPICKER_PARAMS} from '@/config/AppConfig'
  import DatePicker from 'vue2-datepicker'

  export default {
    name: 'Frequency',
    props: ['schoolId', 'lessonId'],
    components: {Treeselect, Lessons, DatePicker},
    mixins: [EventBusEmit, ToastMixin],
    data() {
      return {
        datepickerParams: DATEPICKER_PARAMS,

        parsedFrequency: {},
        frequencyId: null,

        selectedYearFrom: null,
        selectedYearTo: null,
        selectedType: [],
        schoolsAndClubs: null,
        lessonSelected: null,

        currentPage: 1,
        perPage: 20,
        totalRows: 0,

        tableData: [
          {id: 1, name: 'Admin', date: '11/10/19', changes: 'Nazwa Kłubu "Lead" -> "Moc"'},
          {id: 2, name: 'Kłub', date: '10/10/19', changes: 'Test'},
          {id: 3, name: 'Prowadzący', date: '10/10/19', changes: 'Test'}
        ],

        typeOptions: [
          {text: 'klub', value: 0},
          {text: 'szkola', value: 1}
        ],

        fields: [
          {key: 'title', label: 'Nazwa', sortable: true},
          {key: 'day', label: 'Dzień', sortable: true},
          {key: 'hour', label: 'Godzina', sortable: true},
          {key: 'category', label: 'Kategoria', sortable: true},
          {key: 'discipline', label: 'Dyscyplina', sortable: true},
          {key: 'list', label: 'Lista', sortable: true},
          {key: 'leader', label: 'Prowadzący', sortable: true},
          {key: 'frequency', label: 'Obecność', sortable: true}
        ],

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
        }
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
      }
    },
    methods: {
      getFrequencyCount (participants) {
        if (!participants) return
        let data = JSON.parse(participants)
        let totalCount = data.length
        let activeCount = 0
        for (let index in data) {
          if (data[index].active) activeCount += 1
        }

        return activeCount + '/' + totalCount
      },
      saveFrequency() {
        console.log(this.parsedFrequency)
        console.log(this.frequencyId)

        this.$store.dispatch('putFrequency', {id: this.frequencyId, data: this.parsedFrequency})
          .then((response) => {
            let data = [...this.tableData]
            for (let index in data) {
              if (data[index].id === response.id) {
                data[index] = response
              }
            }
            this.tableData = data

            this.showToast('Dane zostały zapisane', 'Uwaga!', 'success')
          })
          // eslint-disable-next-line handle-callback-err
          .catch((error) => {
            this.showToast('Wystąpił błąd podczas zapisywania', 'Uwaga!', 'danger')
          })

        this.$refs.modalFrequency.hide()
        this.parsedFrequency = {}
        this.frequencyId = null
      },
      showFrequency(val, frequencyId) {
        this.parsedFrequency = JSON.parse(val)
        this.frequencyId = frequencyId
        this.$refs.modalFrequency.show()
      },
      filterResponse(response, reset) {
        this.tableData = response.data
        this.totalRows = response.totalCount

        if (reset) this.currentPage = 1
      },
      filter(currentPage = 1, reset = false) {
        let filters = {
          selectedYearFrom: this.selectedYearFrom,
          selectedYearTo: this.selectedYearTo,
          schoolsAndClubs: this.schoolsAndClubs,
          lessonSelected: this.lessonSelected
        }

        this.$store.dispatch('getFrequencies', {filters: filters, currentPage: currentPage, perPage: this.perPage})
          .then(response => {
            this.filterResponse(response, reset)
          })
      },
      sortingChanged(ctx) {
        console.log(ctx)
      }
    },
    created() {
      this.$store.dispatch('getSchools', {})

      if (this.schoolId) {
        this.schoolsAndClubs = [this.schoolId]
        this.filter(1, true)
      } else if (this.lessonId) {
        this.lessonSelected = this.lessonId
        this.filter(1, true)
      } else {
        this.$store.dispatch('getFrequencies', {currentPage: this.currentPage, perPage: this.perPage})
          .then(response => {
            this.filterResponse(response)
          })
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})
      if (this.schoolId === undefined && this.lessonId === undefined) {
        this.changeAdminNavbarBreadcrumbs([{text: 'Frekwencja', active: true}])
      }
    }
  }
</script>

<style scoped>

</style>
