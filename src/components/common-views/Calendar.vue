<template>
  <b-col cols="12">
    <template>
      {{dates}}
      {{date}}
      <date-pick
        v-model="date"
        :hasInputElement="false"
        :weekdays="params.weekdays"
        :months="params.months"
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
    props: ['lessons', 'events'],
    data() {
      return {
        date: '2019-09-01',
        params: CALENDAR_PARAMS,

        dates: {}
      }
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
        console.log(val)
      },
      lessons: function (val) {
        this.calculateCalendarDayEvents(val)
      }
    },
    methods: {
      calculateCalendarDayEvents(val) {
        let dates = {}
        for (let index in val) {
          let date = new Date(val[index].date)
          let filteredDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

          if (undefined === dates[filteredDate]) {
            dates[filteredDate] = 1
          } else {
            dates[filteredDate] += 1
          }

          // let cell = document.querySelector('[data-id="' + filteredDate + '"]')
          // console.log(cell)
        }

        this.dates = {...dates}
      }
    },
    mounted() {
      let button = document.querySelector('.vdpPeriodControl')
      var config = { attributes: true, childList: true, subtree: true }
      var observer = new MutationObserver((list) => {
        console.log('changed')
        this.calculateCalendarDayEvents(this.lessons)
      })
      observer.observe(button, config)
    },
    created() {
      let newDate = new Date()
      this.date = newDate.getFullYear() + '-' +
        ((newDate.getMonth() + 1) < 10 ? ('0' + (newDate.getMonth() + 1)) : (newDate.getMonth() + 1)) +
        '-' + ((newDate.getDate()) < 10 ? ('0' + (newDate.getDate())) : (newDate.getDate()))
    }
  }
</script>

<style scoped>

</style>
