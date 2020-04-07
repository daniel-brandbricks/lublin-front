<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="12">

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
  </div>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import DatePicker from 'vue2-datepicker'

  import {DATEPICKER_PARAMS, DISTRICTS} from '@/config/AppConfig'

  import Lessons from '@/views/calendar/components/Lessons'
  import Events from '@/components/common-views/Events'
  import Calendar from '@/components/common-views/Calendar'
  import {mapGetters} from "vuex";

  export default {
    components: {Treeselect, Lessons, Events, Calendar, DatePicker},
    mixins: [EventBusEmit],
    props: ['showLessons', 'showEvents'],
    data() {
      return {
        lessonsFields: [
          {key: 'school', label: 'Szkoła / Klub', sortable: true},
          {key: 'title', label: 'Nazwa zajęcia', sortable: true},
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
        return this.$store.getters.lessons
      },
      storeEvents() {
        return this.$store.getters.eventsConfirmed
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
    methods: {
      getSchoolNameById(id) {
        if (undefined === this.schoolsAndClubs || this.schoolsAndClubs === null || this.schoolsAndClubs.length < 1) return ''
        let school = this.schoolsAndClubs.find((obj) => {
          return obj.id === id
        })
        return school ? school.name : ''
      },
      rowRedirectEvent (row) {
        this.$router.push({
          name: 'event',
          params: { 'tab': 'main-data', 'id': row.id, 'isConfirmed': true }
        })
      },
      rowRedirectLesson (row) {
        this.$router.push({
          name: 'lesson',
          params: {'tab': 'main-data', 'id': row.id}
        })
      }
    },
    created() {
    }
  }
</script>

<style scoped>

</style>
