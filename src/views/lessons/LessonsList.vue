<template>
  <div>
    <b-row class="justify-content-center">
      <b-col class="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 mt-4">
        <b-row class="justify-content-center align-items-center">
          <b-col cols="12" xl="6" lg="6" md="12" sm="12" class="mb-2">
            <b-form-group class="custom"
                          v-if="undefined === sportObject &&
                          undefined === participantGroup &&
                          undefined === school && undefined === participant">
              <!--              todo checkbox filter  -->
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selectedType"
                :options="typeOptions"
                name="flavour-1"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" xl="6" lg="6" md="12" sm="12" class="mb-2">
            <b-form-group class="custom">
              <b-form-input id="input-1" class="custom m-0"
                            placeholder="Szukaj"
                            v-model="search"/>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>

      <b-col class="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 mt-4">
        <b-row class="justify-content-between align-items-center">
          <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
            <treeselect class="custom"
                        v-model="selectedDisciplines"
                        :multiple="true"
                        placeholder="Dyscyplina"
                        :options="lessonDiscipline"/>
          </b-col>
          <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
            <treeselect class="custom"
                        v-model="selectedLessonCategories"
                        :multiple="true"
                        placeholder="Kategoria"
                        :options="lessonCategory"/>
          </b-col>
          <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
            <treeselect class="custom"
                        v-model="selectedClasses"
                        :multiple="true"
                        placeholder="Klasa"
                        :options="lessonClass"/>
          </b-col>
          <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
            <treeselect class="custom"
                        v-model="selectedLeaders"
                        :multiple="true"
                        placeholder="Prowadzący"
                        :options="lessonLeaderEmail"/>
          </b-col>
        </b-row>
      </b-col>

      <!--   Table   -->
      <b-col class="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 mt-4">
        <b-row class="justify-content-end mb-3">
          <b-btn variant="primary" class="mr-3" @click="filter(1, true)">Filtruj</b-btn>
        </b-row>

        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
          aria-controls="history-table"
        />

        <b-table
          :items="storeLessons"
          :fields="fields"
          :per-page="perPage"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive"
          @row-clicked="rowRedirect"
        >

          <template slot="school" slot-scope="scope">
            <span v-if="scope.item && scope.item.school">
              {{getSchoolNameById(scope.item.school.id)}}
            </span>
          </template>

          <template slot="disciplines" slot-scope="scope">
            <span v-if="scope.item && scope.item.discipline">
              {{getDisciplineTitleById(scope.item.discipline.id)}}
            </span>
          </template>
          <template slot="lessonCategories" slot-scope="scope">
            <span v-if="scope.item && scope.item.lessonCategory">
              {{getLessonCategoryTitleById(scope.item.lessonCategory.id)}}
            </span>
          </template>
          <template slot="classes" slot-scope="scope">
            <span v-if="scope.item && scope.item.class">
              {{getClassTitleById(scope.item.class.id)}}
            </span>
          </template>

          <!--          <template slot="leaders" slot-scope="scope">-->
          <!--            <span>{{scope.item.leaders}}</span>-->
          <!--          </template>-->

          <template slot="leader" slot-scope="scope">
            <span v-if="scope.item && scope.item.leader">
<!--              {{scope.item.leader.id}}-->
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
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import EventBusEmit from '@/mixins/event-bus-emit'
  import LessonMixin from '@/mixins/lesson-mixin'
  import {mapGetters} from 'vuex'

  export default {
    name: 'LessonList',
    components: {Treeselect},
    props: ['lesson', 'isConfirmed', 'school', 'participant',
      'sportObject', 'schoolIds', 'participantGroup', 'leader'],
    mixins: [EventBusEmit, LessonMixin],
    data() {
      return {
        currentPage: 1,
        perPage: 20,
        totalRows: 0,

        fields: [
          {key: 'date', label: 'Data', sortable: true},
          {key: 'school', label: 'Szkoła / Klub', sortable: true},
          {key: 'title', label: 'Nazwa zajęcia', sortable: true},
          {key: 'disciplines', label: 'Dyscyplina', sortable: false},
          {key: 'lessonCategories', label: 'Kategoria', sortable: false},
          {key: 'classes', label: 'Klasa', sortable: false},
          {key: 'leader', label: 'Prowadzący', sortable: true},
          {key: 'status', label: 'Status w systemie', sortable: false},
          {key: 'edit', label: ''}
        ],

        selectedType: [],
        typeOptions: [
          {text: 'klub', value: 0},
          {text: 'szkola', value: 1}
        ],
        search: '',
        selectedDisciplines: [],
        selectedLessonCategories: [],
        selectedClasses: [],
        selectedLeaders: []
      }
    },
    computed: {
      ...mapGetters(['leaderById', 'classes', 'lessonCategories', 'disciplines']),
      leadersConfirmed() {
        return this.$store.getters.leadersConfirmed
      },
      storeLessons() {
        return this.$store.getters.lessons
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
      // getLeadersFullNamesByIds: () => (ids) => {
      //   let leadersConfirmed = this.leadersConfirmed
      //   console.log(leadersConfirmed)
      //   if (undefined === leadersConfirmed || leadersConfirmed === null || leadersConfirmed.length < 1) {
      //     return null
      //   }
      //
      //   let names = ''
      //   for (let leaderId in ids) {
      //     let user = this.leaderById(leaderId)
      //     console.log(user)
      //     names += user.firstName + ' ' + user.lastName
      //   }
      //   return names.substring(0, names.length - 2)
      // }
    },
    watch: {
      currentPage: function (val) {
        this.filter(val)
      }
    },
    methods: {
      filter(currentPage = 1, reset = false) {
        let filters = {
          selectedType: this.selectedType || [],
          lesson: {
            selectedDiscipline: this.selectedDisciplines || [],
            selectedCategory: this.selectedLessonCategories || [],
            selectedClass: this.selectedClasses || [],
            selectedLeader: this.selectedLeaders || [],
            selectedLesson: this.search || '',
          }
        }

        if (this.participant && this.participant.id) {
          let res = this.participant.participantGroups.map(x => {
            return x.participantGroup.id
          })
          filters.participantGroups = (res && res.length > 0) ? res : []
        }
        if (this.participantGroup && this.participantGroup.id) {
          filters.participantGroups = [this.participantGroup.id]
        }

        if (this.school && this.school.id) {
          filters.lesson.schoolsAndClubs = [this.school.id]
        }
        if (this.leader && this.leader.id) {
          filters.lesson.selectedLeader = [this.leader.id]
        }
        if ((this.schoolIds && this.schoolIds.length > 0)) {
          filters.lesson.schoolsAndClubs = this.schoolIds
        }
        if (this.sportObject && this.sportObject.id) {
          filters.lesson.selectedSportObject = [this.sportObject.id]
        }

        this.$store.dispatch('getLessons', {
          filters: filters, currentPage: currentPage, perPage: this.perPage
        })
          .then(response => {
            this.filterResponse(response, reset)
          })
      },
      filterResponse(response, reset) {
        // this.historyData = response.data
        this.totalRows = response.totalCount

        if (reset) this.currentPage = 1
      },
      getSchoolNameById(id) {
        if (undefined === this.schoolsAndClubs || this.schoolsAndClubs === null || this.schoolsAndClubs.length < 1) return ''
        let res = this.schoolsAndClubs.find((obj) => {
          return obj.id === id
        })

        return res ? res.name : ''
      },
      getDisciplineTitleById(id) {
        if (undefined === this.disciplines || this.disciplines === null || this.disciplines.length < 1) return ''
        return this.disciplines.find((obj) => {
          return obj.id === id
        }).title
      },
      getLessonCategoryTitleById(id) {
        if (undefined === this.lessonCategories || this.lessonCategories === null || this.lessonCategories.length < 1) return ''
        return this.lessonCategories.find((obj) => {
          return obj.id === id
        }).title
      },
      getClassTitleById(id) {
        if (undefined === this.classes || this.classes === null || this.classes.length < 1) return ''
        return this.classes.find((obj) => {
          return obj.id === id
        }).title
      },
      rowRedirect(row) {
        let filters = {
          selectedType: this.selectedType,
          search: this.search,
          selectedDisciplines: this.selectedDisciplines,
          selectedLessonCategories: this.selectedLessonCategories,
          selectedClasses: this.selectedClasses,
        }
        let filtersJSON = JSON.stringify(filters)
        console.log(filtersJSON)
        this.$router.push({
          name: 'lesson',
          params: {'tab': 'main-data', 'id': row.id, 'filters': filtersJSON}
        })
      },
      changeFilters(filters) {
        let filtersParsed = JSON.parse(filters)

        this.selectedType = filtersParsed.selectedType
        this.search = filtersParsed.search
        this.selectedDisciplines = filtersParsed.selectedDisciplines
        this.selectedLessonCategories = filtersParsed.selectedLessonCategories
        this.selectedClasses = filtersParsed.selectedClasses
        this.filter()
      }
    },
    created() {
      if (this.$route.params.filters) {
        this.changeFilters(this.$route.params.filters)
      }
      this.filter()

      this.$store.dispatch('getSchools', {})
      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getLessonCategories')
      this.$store.dispatch('getClasses')
      // this.$store.dispatch('getLeaders', {confirmed: 0})
      this.$store.dispatch('getLeaders', {confirmed: 1, forLesson: true})

      if (this.fieldsParams) {
        for (let key in this.fieldsParams) {
          let field = this.fieldsParams[key]
          console.log(field)
          this.replaceTableField(field)
        }
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: 'lesson', params: {tab: 'main-data'}})
      if (undefined === this.school && this.sportObject === undefined && this.schoolIds === undefined &&
        this.participantGroup === undefined && this.participant === undefined && this.leader === undefined) {
        this.changeAdminNavbarBreadcrumbs([{text: 'Lista zajęć', active: true}])
      }
    }
  }
</script>

<style scoped>

</style>
