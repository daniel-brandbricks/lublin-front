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
              <b-btn variant="primary" class="mr-3" @click="filter">Filtruj</b-btn>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="my-3">
          <b-col cols="5">
            <date-picker v-model="selectedYearFrom" :lang="datepickerParams.lang"
                         :name="'selectedYearFrom'" :key="'selectedYearFrom'"
                         value-type="format" format="YYYY-MM-DD"
                         type="date"
                         :id="'selectedYearFrom'" placeholder="Od" class="w-100 custom mt-3">
            </date-picker>
          </b-col>
          <b-col cols="2">
            <hr class="mt-4 mb-0">
          </b-col>
          <b-col cols="5">
            <date-picker v-model="selectedYearTo" :lang="datepickerParams.lang"
                         :name="'selectedYearTo'" :key="'selectedYearTo'"
                         value-type="format" format="YYYY-MM-DD"
                         type="date"
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
            :options="[{text: 'Wydarzenia', value: 1}]"
            :unchecked-value="false"
            value="false"
            name="checkbox-group-show-events"
          />
        </b-form-group>

        <events v-show="showEvents.length > 0" :events="events"/>
      </b-col>

      <b-col cols="6">
        <TabLinks :links="tabLinks"/>
        <calendar :lessons="storeLessons" :events="storeEvents" :key="$route.params.tab+rerenderCalendar"
                  v-if="$route.params.tab === 'calendar'" ref="mainCalendar"
                  :showLessons="showLessons" :showEvents="showEvents"
                  :dateFrom="selectedYearFrom" :dateTo="selectedYearTo"/>

        <h4>Wyniki</h4>

        <b-row class="justify-content-center">
          <b-col cols="12">
            <b-table
              :items="eventsAndLessonsFiltered"
              :fields="eventsAndLessonsFields"
              striped
              sort-icon-left
              responsive="md"
              class="custom table-responsive"
            >
              <!--              @row-clicked="rowRedirect"-->

              <template slot="name" slot-scope="scope">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="wrap-img-type-table mr-3">
                    <img :src="scope.item.image || 'https://placeimg.com/50/50/any'" alt="">
                  </div>
                  <span>{{scope.item.name}}</span>
                </div>
              </template>
            </b-table>
          </b-col>
        </b-row>
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

  export default {
    components: { TabLinks, Treeselect, Lessons, Events, Calendar, DatePicker },
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
          selectedLesson: null,
          // temp
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

        events: {
          districtValue: null,
          districts: DISTRICTS,
          selectedDiscipline: null,
          // temp
          disciplines: [
            { id: 1, label: 'Basen' },
            { id: 2, label: 'Siłownia' },
            { id: 3, label: 'Bieg' }
          ],
          selectedSportObject: null,
          sportObjects: [
            { id: 1, label: 'Park' },
            { id: 2, label: 'Siłownia' },
            { id: 3, label: 'Basen' }
          ],
          selectedSchoolOrCLub: null,
          schoolsOrClubs: [
            { id: 1, label: 'Park' },
            { id: 2, label: 'Siłownia' },
            { id: 3, label: 'Basen' }
          ]
        },

        showLessons: [ 1 ],
        showEvents: [ 1 ],

        eventsAndLessonsFields: [
          { key: 'name', label: 'Nazwa', sortable: true },
          { key: 'leader', label: 'Prowadzący/Organizator', sortable: true },
          { key: 'location', label: 'Lokalizacja', sortable: true },
          { key: 'time', label: 'Czas trwania', sortable: true }
        ],
        eventsAndLessonsFiltered: [
          { id: 1, name: 'test', leader: 'Mark Twen', location: 'Al. Jana Pawła II', time: '2g.' },
          { id: 2, name: 'dwa', leader: 'Lew Tolstoj', location: 'Dw. Centralny', time: '1,5g.' },
          { id: 3, name: 'trzy', leader: 'Jack London', location: 'Koło', time: '3g.' }
        ]
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
      }
    },
    methods: {
      filter () {
        this.rerenderCalendar = !this.rerenderCalendar
        this.$refs['mainCalendar'].recalculateCalendar()
      }
    },
    created () {
      this.$store.dispatch('getLessons')
      this.$store.dispatch('getEvents', { confirmed: 1 })
      this.$store.dispatch('getSchools', { confirmed: 1 })
      this.$store.dispatch('getSportObjects', { confirmed: 1 })
      this.$store.dispatch('getLeaders', { confirmed: 1 })
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
