<template>
  <b-col cols="12">
    <template>
      <date-pick
        v-model="date"
        :hasInputElement="false"
        :weekdays="params.weekdays"
        :months="params.months"
        :isDateDisabled="disableDates"
      />
      <!--todo добавить класс на ячейку с событием, и дописать ему стиля от .disablet-->
      <!--todo убрать с header select-->
    </template>
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

  export default {
    components: {Treeselect, DatePick},
    mixins: [EventBusEmit],
    props: ['lessons', 'events', 'dateFrom', 'dateTo', 'showLessons', 'showEvents'],
    data () {
      return {
        date: '2019-09-01',
        params: CALENDAR_PARAMS,

        dates: {}
      }
    },
    computed: {
    },
    watch: {
      dates: {
        handler: function (val) {
          console.log(val)
          for (let [date, value] of Object.entries(val)) {
            // console.log(`${date}: ${value}`)

            let cell = document.querySelector('[data-id="' + date + '"]')
            // console.log(cell)
            if (cell) {
              cell.setAttribute('data-days', value)
              // console.log(cell.getElementsByTagName('div')[0])
              // cell.getElementsByTagName('div')[0].setAttribute('data-days', value)
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
      // dateFrom: function (val) {
      //   this.recalculateCalendar()
      // },
      // dateTo: function (val) {
      //   this.recalculateCalendar()
      // }
    },
    methods: {
      disableDates (date) {
        let dateTime = new Date(date).getTime()
        if (this.dateFrom) {
          let dateFrom = new Date(this.dateFrom)
          dateFrom.setDate(dateFrom.getDate() - 1)
          dateFrom = dateFrom.getTime()
          console.log(date)
          console.log(dateFrom)
          console.log(dateTime)
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
      recalculateCalendar () {
        let dates = {}
        if (this.showEvents && this.showEvents.length > 0) {
          this.calculateCalendarDayEvents(this.events, dates)
        }
        if (this.showLessons && this.showLessons.length > 0) {
          this.calculateCalendarDayLessons(this.lessons, dates)
        }
        this.dates = {...dates}
      },
      calculateCalendarDayEvents (val, dates = {}) {
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
      calculateCalendarDayLessons (val, dates) {
        console.log(dates)
        for (let index in val) {
          let date = new Date(val[index].date)
          let filteredDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

          if (undefined === dates[filteredDate]) {
            dates[filteredDate] = 1
          } else {
            dates[filteredDate] += 1
          }
        }
      },
      calculateDatesDifference (dateOne, dateTwo) {
        let getDaysArray = function (start, end) {
          // eslint-disable-next-line no-unmodified-loop-condition
          for (var arr = [], dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
            let date = new Date(dt)
            let filteredDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            arr.push(filteredDate)
          }
          return arr
        }

        return getDaysArray(new Date(dateOne), new Date(dateTwo))
      }
    },
    mounted () {
      let button = document.querySelector('.vdpPeriodControl')
      var config = { attributes: true, childList: true, subtree: true }
      var observer = new MutationObserver((list) => {
        console.log('changed')
        this.recalculateCalendar()
      })
      observer.observe(button, config)
    },
    created () {
      this.recalculateCalendar()

      let newDate = new Date()
      this.date = newDate.getFullYear() + '-' +
        ((newDate.getMonth() + 1) < 10 ? ('0' + (newDate.getMonth() + 1)) : (newDate.getMonth() + 1)) +
        '-' + ((newDate.getDate()) < 10 ? ('0' + (newDate.getDate())) : (newDate.getDate()))
    }
  }
</script>

<style scoped>

</style>
