<template>
  <b-col cols="12">
    <b-row>
      <!--      :cols="splitComponents ? 6 : 12"    -->
      <b-col :sm="12" :md="12" :lg="splitComponents ? 6 : 12" :xl="splitComponents ? 6 : 12">
        <template>
          <date-pick
            v-model="date"
            :hasInputElement="false"
            :weekdays="params.weekdays"
            :months="params.months"
            :isDateDisabled="disableDates"
          />
        </template>
      </b-col>
      <b-col :sm="12" :md="12" :lg="splitComponents ? 6 : 12" :xl="splitComponents ? 6 : 12">
        <div v-if="showLessons && showLessons.length > 0">
          <h4>Zajęcia</h4>
          <b-row class="justify-content-center">
            <b-col cols="12">
              <b-table
                @row-clicked="rowRedirectLesson"
                :items="storeLessons"
                :fields="lessonsFields"
                striped
                sort-icon-left
                responsive="md"
                class="custom table-responsive"
              >
                <!--              @row-clicked="rowRedirect"-->

                <template slot="school" slot-scope="scope">
            <span v-if="scope.item && scope.item.school">
              {{getSchoolNameById(scope.item.school.id)}}
            </span>
                </template>

                <template slot="time" slot-scope="scope">
            <span v-if="scope.item && scope.item.school">
              {{scope.item.timeRange[0] + ' - ' + scope.item.timeRange[1]}}
            </span>
                </template>

                <template slot="leaders" slot-scope="scope">
            <span v-if="scope.item && scope.item.leader">
              {{ buildUserNames(leaderById(scope.item.leader.id)) }}
            </span>
                </template>

                <template slot="status" slot-scope="scope">
            <span class="status"
                  :class="{'active': scope.item.active}">{{scope.item.active == 1 ? 'aktywny' : 'nieaktywny'}}</span>
                </template>

                <template slot="edit" slot-scope="scope">
                  <b-link class="icon-link">
                    <span class="icon icon-iconm_search"></span>
                  </b-link>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </div>

        <div v-if="showEvents && showEvents.length > 0">
          <h4 class="my-3">Imprezy sportowe</h4>
          <b-row class="justify-content-center">
            <b-col cols="12">
              <b-table
                @row-clicked="rowRedirectEvent"
                :items="storeEvents"
                :fields="eventsFields"
                striped
                sort-icon-left
                responsive="md"
                class="custom table-responsive"
              >
                <template slot="dateStart" slot-scope="scope">
                  <span>{{scope.item.dateStart.substr(0, scope.item.dateStart.indexOf(' '))}}</span>
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
        </div>
      </b-col>
    </b-row>

  </b-col>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import DatePick from 'vue-date-pick'
  import 'vue-date-pick/dist/vueDatePick.css'

  import {CALENDAR_PARAMS} from '@/config/AppConfig'
  import {mapGetters} from "vuex";

  export default {
    components: {Treeselect, DatePick},
    mixins: [EventBusEmit],
    props: [
      'lessons', 'events', 'dateFrom', 'splitComponents', 'calendarFront', 'parentDate',
      'dateTo', 'showLessons', 'showEvents', 'participantGroupId', 'calendarFrontLessons'
    ],
    data() {
      return {
        date: '2019-09-01',
        params: CALENDAR_PARAMS,

        dates: {},

        lessonsFields: [
          {key: 'school', label: 'Szkoła / Klub', sortable: true},
          {key: 'title', label: 'Nazwa zajęcia', sortable: true},
          {key: 'time', label: 'Czas', sortable: true},
          {key: 'leaders', label: 'Prowadzący', sortable: false},
          {key: 'status', label: 'Status w systemie', sortable: false},
          {key: 'edit', label: ''}
        ],
        eventsFields: [
          {key: 'dateStart', label: 'Data rozpoczęcia', sortable: true},
          {key: 'title', label: 'Nazwa', sortable: true},
          {key: 'organization', label: 'Organizator', sortable: true},
          {key: 'edit', label: ' ', sortable: true}
        ]
      }
    },
    computed: {
      ...mapGetters(['leaderById']),
      storeLessons() {
        let lessons = this.$store.getters.lessons
        let prepared = []
        for (let index in lessons) {
          let date = (lessons[index].newDate === null) ? new Date(lessons[index].date) : new Date(lessons[index].newDate)
          date = date.getFullYear() + '-' +
            ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) +
            '-' + ((date.getDate()) < 10 ? ('0' + (date.getDate())) : (date.getDate()))

          if (date === this.date) prepared.push(lessons[index])
        }
        return prepared
      },
      storeEvents() {
        let events = this.$store.getters.eventsConfirmed
        let prepared = []
        for (let index in events) {
          let datesArr = this.calculateDatesDifference(events[index].dateStart, events[index].dateEnd, true)

          for (let dateIndex in datesArr) {
            if (datesArr[dateIndex] === this.date) {
              prepared.push(events[index])
            }
          }
        }

        return prepared
      },
      schoolsAndClubs() {
        return this.$store.getters.schools
      },
      buildUserNames: () => (user) => {
        if (undefined === user || user === null) {
          return null
        }
        return user.firstName + ' ' + user.lastName
      }
    },
    watch: {
      parentDate: function (val) {
        this.date = val
      },
      date: function (val) {
        if (this.calendarFront) this.$emit('dayChanged', val)
      },
      showLessons: function () {
        this.recalculateCalendar()
      },
      showEvents: function () {
        this.recalculateCalendar()
      },
      dates: {
        handler: function (val) {
          let cell = document.getElementsByClassName('vdpCell')
          for (let index in cell) {
            if (cell[index].dataset && cell[index].dataset.days) delete cell[index].dataset.days
          }

          for (let [date, value] of Object.entries(val)) {
            let cell = document.querySelector('[data-id="' + date + '"]')
            if (cell) {
              cell.setAttribute('data-days', value)
            }
          }
        },
        deep: true
      },
      events: function (val) {
        this.recalculateCalendar()
      },
      lessons: function (val) {
        this.recalculateCalendar()
      }
    },
    methods: {
      rowRedirectEvent(row) {
        if (this.$store.getters.isAdmin || this.$store.getters.isDirector) {
          this.$router.push({
            name: 'event',
            params: {'tab': 'main-data', 'id': row.id, 'isConfirmed': true}
          })
        }
      },
      rowRedirectLesson(row) {
        this.$router.push({
          name: 'lesson',
          params: {'tab': 'main-data', 'id': row.id}
        })
      },
      getSchoolNameById(id) {
        if (undefined === this.schoolsAndClubs || this.schoolsAndClubs === null || this.schoolsAndClubs.length < 1) return ''
        let school = this.schoolsAndClubs.find((obj) => {
          return obj.id === id
        })
        return school ? school.name : ''
      },
      disableDates(date) {
        let dateTime = new Date(date).getTime()
        if (this.dateFrom) {
          let dateFrom = new Date(this.dateFrom)
          dateFrom.setDate(dateFrom.getDate() - 1)
          dateFrom = dateFrom.getTime()
          if (dateFrom >= dateTime) return true
        }
        if (this.dateTo) {
          let dateTo = new Date(this.dateTo).getTime()
          if (dateTo <= dateTime) return true
        }
      },
      isFutureDate(date) {
        const currentDate = new Date();
        return date > currentDate;
      },
      recalculateCalendar() {
        let dates = {}
        if ((this.showEvents && this.showEvents.length > 0) || this.calendarFront) {
          this.calculateCalendarDayEvents(this.events, dates)
        }
        if ((this.showLessons && this.showLessons.length > 0) || this.calendarFrontLessons) {
          this.calculateCalendarDayLessons(this.lessons, dates)
        }

        this.dates = {...dates}
      },
      calculateCalendarDayEvents(val, dates) {
        for (let index in val) {
          let datesArr = this.calculateDatesDifference(val[index].dateStart, val[index].dateEnd)

          for (let dateIndex in datesArr) {
            if (undefined === dates[datesArr[dateIndex]]) {
              dates[datesArr[dateIndex]] = 1
            } else {
              dates[datesArr[dateIndex]] += 1
            }
          }
        }
      },
      calculateCalendarDayLessons(val, dates) {
        for (let index in val) {
          // check is date changed
          let date = (val[index].newDate === null) ? new Date(val[index].date) : new Date(val[index].newDate)
          let filteredDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

          if (undefined === dates[filteredDate]) {
            dates[filteredDate] = 1
          } else {
            dates[filteredDate] += 1
          }
        }
      },
      calculateDatesDifference(dateOne, dateTwo, withZeros = false) {
        dateOne = dateOne.replace(/-/g, "/")
        dateTwo = dateTwo.replace(/-/g, "/")

        let getDaysArray = function (start, end) {
          // eslint-disable-next-line no-unmodified-loop-condition
          for (var arr = [], dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
            let date = new Date(dt)
            let filteredDate = ''
            if (withZeros) {
              filteredDate = date.getFullYear() + '-' +
                ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) +
                '-' + ((date.getDate()) < 10 ? ('0' + (date.getDate())) : (date.getDate()))
            } else {
              filteredDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            }
            arr.push(filteredDate)
          }
          return arr
        }

        return getDaysArray(new Date(dateOne), new Date(dateTwo))
      }
    },
    mounted() {
      let button = document.querySelector('.vdpPeriodControl')
      var config = {attributes: true, childList: true, subtree: true}
      var observer = new MutationObserver((list) => {
        this.recalculateCalendar()
        if (this.calendarFront) this.$emit('monthOrYearChanged')
      })
      observer.observe(button, config)
    },
    created() {
      this.recalculateCalendar()

      let newDate = new Date()
      this.date = newDate.getFullYear() + '-' +
        ((newDate.getMonth() + 1) < 10 ? ('0' + (newDate.getMonth() + 1)) : (newDate.getMonth() + 1)) +
        '-' + ((newDate.getDate()) < 10 ? ('0' + (newDate.getDate())) : (newDate.getDate()))

      if (this.parentDate) this.date = this.parentDate
    }
  }
</script>

<style scoped>

</style>
