<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="6">
        <b-row class="">
          <b-col>
            <h4>Zakres</h4>
          </b-col>
          <b-col>
            <b-row class="justify-content-end">
<!--              <b-btn v-if="!$store.getters.isAdmin"-->
<!--                     variant="primary" class="mr-3 mb-3" @click="filterByRole">Pokaż tylko moje zajęcia</b-btn>-->
              <b-btn variant="primary" class="mr-3" @click="filter">Filtruj</b-btn>
            </b-row>
          </b-col>
        </b-row>
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

        <b-form-group class="custom checkbox-big-span mb-3">
          <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="showLessons"
            :options="[{text: 'Zajęcia', value: 1}]"
            :unchecked-value="false"
            value="false"
            name="flavour-1"
          />
        </b-form-group>

        <lessons v-show="showLessons.length > 0" :districts="districts" :lessons="lessons"/>

        <b-form-group class="custom checkbox-big-span my-3">
          <b-form-checkbox-group
            id="checkbox-group-show-events"
            v-model="showEvents"
            :options="[{text: 'Imprezy sportowe', value: 1}]"
            :unchecked-value="false"
            value="false"
            name="checkbox-group-show-events"
          />
        </b-form-group>

        <events v-show="showEvents.length > 0" :events="events" :disciplinesPrepared="disciplinesPrepared"
                :schoolsAndClubsTreeselect="schoolsAndClubsPrepared"/>
      </b-col>

      <b-col cols="6">
        <TabLinks :links="tabLinks"/>
        <calendar :lessons="storeLessons" :events="storeEvents" :key="$route.params.tab+rerenderCalendar"
                  v-if="$route.params.tab === 'calendar'" ref="mainCalendar"
                  :showLessons="showLessons" :showEvents="showEvents"
                  :dateFrom="selectedYearFrom" :dateTo="selectedYearTo"/>
        <list :lessons="storeLessons" :events="storeEvents" :key="$route.params.tab"
              :showLessons="showLessons" :showEvents="showEvents"
              v-if="$route.params.tab === 'list'" ref="calendarList"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import TabLinks from '../../components/TabLinks'
  import DatePicker from 'vue2-datepicker'

  import {DATEPICKER_PARAMS, DISTRICTS} from '@/config/AppConfig'

  import Lessons from '@/views/calendar/components/Lessons'
  import Events from '@/components/common-views/Events'
  import Calendar from '@/components/common-views/Calendar'
  import List from '@/views/calendar/components/List'

  export default {
    components: {List, TabLinks, Treeselect, Lessons, Events, Calendar, DatePicker },
    mixins: [ EventBusEmit ],
    data () {
      return {
        datepickerParams: DATEPICKER_PARAMS,
        rerenderCalendar: false,

        tabLinks: [
          {
            title: 'Kalendarz',
            link: 'calendar',
            tab: 'calendar'
          },
          {
            title: 'Lista',
            link: 'calendar',
            tab: 'list'
          }
        ],

        selectedYearFrom: null,
        selectedYearTo: null,

        districts: DISTRICTS,

        lessons: {
          districtValue: null,
          selectedType: [],
          schoolsAndClubs: null,
          selectedDiscipline: null,
          selectedCategory: null,
          selectedClass: null,
          selectedYear: null,
          selectedSportObject: null,
          selectedLeader: null,
          selectedLesson: null
        },

        events: {
          selectedYearFrom: null,
          selectedYearTo: null,
          address: '',
          organization: '',
          selectedDiscipline: null,
          selectedSchoolOrCLub: null
        },

        showLessons: [ 1 ],
        showEvents: [ 1 ]
      }
    },
    computed: {
      storeLessons () {
        return this.$store.getters.lessons
      },
      storeEvents () {
        return this.$store.getters.eventsConfirmed
      },
      // copied in FormMainData.vue -> sports-objects
      schoolsAndClubsPrepared () {
        let data = this.$store.getters.schools
        let preparedSchools = []

        for (let schoolIndex in data) {
          preparedSchools.push({ id: data[schoolIndex].id, label: data[schoolIndex].name })
        }

        return preparedSchools
      },
      disciplinesPrepared () {
        let data = this.$store.getters.disciplines
        let preparedDisciplines = []

        for (let disciplineIndex in data) {
          preparedDisciplines.push({id: data[disciplineIndex].id, label: data[disciplineIndex].title})
        }

        return preparedDisciplines
      }
    },
    methods: {
      filterByRole () {
        let authUser = this.$store.getters.authUser
        if (this.$store.getters.isDirector) {

        } else {
          this.lessons.selectedLeader = [authUser.id]
          this.filter()
        }
      },
      filter () {
        let lessonFilters = {
          lesson: this.lessons,
          dateFrom: this.selectedYearFrom,
          dateTo: this.selectedYearTo
        }

        let events = {...this.events}
        events.selectedYearFrom = this.selectedYearFrom
        events.selectedYearTo = this.selectedYearTo

        this.$store.dispatch('getLessons', {filters: lessonFilters})
          .then(res => {
            this.$store.dispatch('getEvents', { confirmed: 1, filters: events })
              .then(res => {
                this.rerenderCalendar = !this.rerenderCalendar
                if (this.$refs['mainCalendar']) {
                  this.$refs['mainCalendar'].recalculateCalendar()
                }
              })
          })
      },
      initCurrentMonthRange () {
        let date = new Date()
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)

        firstDay = firstDay.getFullYear() + '-' +
          ((firstDay.getMonth() + 1) < 10 ? ('0' + (firstDay.getMonth() + 1)) : (firstDay.getMonth() + 1)) +
          '-' + ((firstDay.getDate()) < 10 ? ('0' + (firstDay.getDate())) : (firstDay.getDate()))

        lastDay = lastDay.getFullYear() + '-' +
          ((lastDay.getMonth() + 1) < 10 ? ('0' + (lastDay.getMonth() + 1)) : (lastDay.getMonth() + 1)) +
          '-' + ((lastDay.getDate()) < 10 ? ('0' + (lastDay.getDate())) : (lastDay.getDate()))

        this.selectedYearFrom = firstDay
        this.selectedYearTo = lastDay

        let filters = {
          dateFrom: firstDay,
          dateTo: lastDay
        }

        this.$store.dispatch('getLessons', {filters: filters})
        this.$store.dispatch('getEvents', { confirmed: 1, filters: filters })
      }
    },
    created () {
      this.initCurrentMonthRange()

      this.$store.dispatch('getSchools', { confirmed: 1, getAll: true })
      this.$store.dispatch('getSportObjects', { confirmed: 1 })
      this.$store.dispatch('getLeaders', { confirmed: 1, forLesson: true })
      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getLessonCategories')
      this.$store.dispatch('getClasses')

      if (this.$route.params.tab === undefined) {
        this.$router.push({ name: 'calendar', params: { 'tab': 'calendar' } })
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })
      this.changeAdminNavbarBreadcrumbs([ { text: 'Kalendarz zajęć i wydarzeń', active: true } ])
    }
  }
</script>

<style scoped>

</style>
