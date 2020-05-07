<template>
  <div class="wrap">
    <b-container>
      <b-row>
        <b-col cols="12" class="mb-3">
          <h1 class="c-green">
            Imprezy sportowe
          </h1>
        </b-col>
      </b-row>
    </b-container>
    <section class="mb-3">
      <b-container>
        <b-row class="">
          <b-col cols="12" md="6" lg="6" class="mb-3">
            <b-row class="justify-content-end">
              <b-col cols="12" class="mb-3">
                <treeselect v-model="selectedDiscipline"
                            placeholder="Dyscyplina"
                            :multiple="true"
                            :options="disciplinesTreeselect"
                            class="custom bg-transparent"/>
              </b-col>
              <b-col cols="12" sm="6" lg="3" class="mb-3 mb-lg-0">
                <b-btn variant="primary" class="custom mb-3" block @click="filterEvents">
                  <span class="icon icon-iconm_search"></span>szukaj
                </b-btn>
              </b-col>
            </b-row>
            <template>
              <calendar :events="frontEvents" @dayChanged="changeDay"
                        @monthOrYearChanged="changeMonthOrYear"
                        :calendarFront="true" ref="calendarFront"
                        :splitComponents="false" class="p-0"/>

              <!--              <date-pick-->
              <!--                v-model="date"-->
              <!--                :hasInputElement="false"-->
              <!--              ></date-pick>-->
            </template>
          </b-col>
          <b-col>
            <b-row>
              <b-col cols="12" md="6" lg="6" class="mb-3" :key="index"
                     v-for="(event,index) in frontEventsCurrentDate">
                <b-card
                  class="custom min-h-457"
                  footer-class="p-0"
                  :img-src="event.images.length > 0 && event.images[0].path ? event.images[0].path : ''"
                  body-class="d-flex flex-column justify-content-between"
                  img-alt="Image"
                  img-top>
                  <b-card-text text-tag="div" class="height-hidden flex-grow-1">
                    <h2 class="card-title " title="lorem8">{{event.title}}</h2>
                    <p>{{event.description}}</p>
                  </b-card-text>

                  <div class="box-sub d-flex justify-content-between">
                    <p class="card-signature mb-0">
                      <span class="icon icon-calendar pr-1 "></span>
                      {{event.dateStart.split(' ')[0] + ' - ' + event.dateEnd.split(' ')[0]}}
                    </p>

                    <b-btn variant="icon" class="custom card-arrow p-0 mb-n1"
                           :to="{name:'sportEventsInner', params: {id: event.id}}">
                      <span class="icon icon-arrow_right c-red"></span>
                    </b-btn>
                  </div>
                </b-card>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
  import DatePick from 'vue-date-pick'
  import 'vue-date-pick/dist/vueDatePick.css'

  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import Calendar from '@/components/common-views/Calendar'

  export default {
    name: 'SportEvents',
    components: {DatePick, Treeselect, Calendar},
    data() {
      return {
        selectedYearFrom: null,
        selectedYearTo: null,
        selectedDiscipline: null,

        date: '2019-09-01'
      }
    },
    computed: {
      frontEventsCurrentDate() {
        let events = this.$store.getters.frontEvents
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
      frontEvents() {
        return this.$store.getters.frontEvents
      },
      frontDisciplines() {
        return this.$store.getters.frontDisciplines
      },
      disciplinesTreeselect() {
        let disciplines = this.frontDisciplines
        let prepared = []

        for (let disciplineIndex in disciplines) {
          prepared.push({id: disciplines[disciplineIndex].id, label: disciplines[disciplineIndex].title})
        }

        return prepared
      }
    },
    methods: {
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
      },
      filterEvents () {
        let filters = {
          discipline: this.selectedDiscipline,
          selectedYearFrom: this.selectedYearFrom,
          selectedYearTo: this.selectedYearTo
        }
        this.$store.dispatch('getFilteredEvents', filters).then(res => {
        })
      },
      changeDay (val) {
        this.date = val
      },
      changeMonthOrYear (val) {
        let elements = document.getElementsByClassName('vdpPrevDirection')
        if (elements.length < 1) elements = document.getElementsByClassName('vdpNextDirection')
        if (elements.length < 1) return
        let month = elements[0].textContent.trim() // replace(/ /g, '')
        let year = elements[1].textContent.trim() // replace(/ /g, '')

        let monthes = {
          'Styczeń': '01',
          'Luty': '02',
          'Marzec': '03',
          'Kwiecień': '04',
          'Maj': '05',
          'Czerwiec': '06',
          'Lipiec': '07',
          'Sierpień': '08',
          'Wrzesień': '09',
          'Październik': '10',
          'Listopad': '11',
          'Grudzień': '12'
        }

        let fullDate = year + '-' + monthes[month] + '-10'
        let date = new Date(fullDate)
        this.selectedYearFrom = new Date(date.getFullYear(), date.getMonth() - 1, 25)
        this.selectedYearTo = new Date(date.getFullYear(), date.getMonth() + 1, 5)

        this.filterEvents()
      }
    },
    created() {
      this.filterEvents()
      this.$store.dispatch('getMenuAndFooter')
      this.$store.dispatch('getFrontDisciplines')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .min-h-457 {
    min-height: 457px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
