<template>
  <div>
    <b-row class="justify-content-center">
      <b-col class="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 mt-4">
        <b-row class="justify-content-between align-items-center">
          <b-col cols="12" xl="6" lg="6" md="12" sm="12" class="mb-2">
            <b-form-group class="custom d-inline-block">
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selectedGender"
                :options="genderOptions"
                name="flavour-1"
              />
            </b-form-group>
            <!--            todo checkbox klub/szkola   -->

            <!--            <b-form-group class="custom d-inline-block">-->
            <!--              <b-form-checkbox-group-->
            <!--                id="checkbox-group-2"-->
            <!--                v-model="selectedType"-->
            <!--                :options="typeOptions"-->
            <!--                name="flavour-2"-->
            <!--              />-->
            <!--            </b-form-group>-->
          </b-col>
          <b-col xl="6" lg="6" md="12" sm="12" class="mb-2">
            <b-form-group class="custom">
              <b-form-input id="input-1" class="custom m-0"
                            placeholder="Szukaj"
                            v-model="search"/>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>

      <b-col class="col-xl-8 col-lg-8 col-md-12 col-sm-12 mt-4">
        <b-row class="justify-content-between align-items-center">
          <b-col xl="6" lg="6" md="12" sm="12" class="mb-2">
            <treeselect v-model="selectedSchools" v-if="selectedSchools &&
            (undefined === this.participant && undefined === this.school)"
                        :multiple="true" class="custom"
                        placeholder="Szkoła / Klub" :options="schoolsTreeselect"
            />
          </b-col>
          <b-col xl="6" lg="6" md="12" sm="12" class="mb-2">
            <treeselect v-model="selectedDisciplines" v-if="selectedDisciplines"
                        :multiple="true" class="custom"
                        placeholder="Dyscyplina" :options="participantGroupDiscipline"
            />
          </b-col>
          <b-col xl="6" lg="6" md="12" sm="12" class="mb-2">
            <treeselect v-model="selectedLessonCategories" v-if="selectedLessonCategories"
                        :multiple="true" class="custom"
                        placeholder="Kategoria" :options="participantGroupLessonCategory"
            />
          </b-col>
          <b-col xl="6" lg="6" md="12" sm="12" class="mb-2">
            <treeselect v-model="selectedClasses" v-if="selectedClasses"
                        :multiple="true" class="custom"
                        placeholder="Klasa" :options="participantGroupClass"
            />
          </b-col>
        </b-row>
      </b-col>

      <!--   Table   -->
      <b-col class="col-xl-8 col-lg-8 col-md-12 col-sm-12 mt-4">
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
          :items="participantGroups"
          :fields="fields"
          :per-page="perPage"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive"
          @row-clicked="rowRedirect"
        >

          <template slot="discipline" slot-scope="scope">
            <span>{{getDisciplineTitleById(scope.item.discipline.id)}}</span>
          </template>
          <template slot="sex" slot-scope="scope">
            <span>{{getSex(scope.item.sex)}}</span>
          </template>
          <template slot="lessonCategory" slot-scope="scope">
            <span>{{getLessonCategoryTitleById(scope.item.lessonCategory.id)}}</span>
          </template>
          <template slot="class" slot-scope="scope">
            <span>{{getClassTitleById(scope.item.class.id)}}</span>
          </template>
          <template slot="school" slot-scope="scope">
            <span>{{getSchoolNameById(scope.item.school.id)}}</span>
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
  import ParticipantGroupMixin from '@/mixins/participant-group-mixin'

  export default {
    components: {Treeselect},
    props: ['participantGroup', 'school', 'schoolIds', 'participant'],
    mixins: [EventBusEmit, ParticipantGroupMixin],
    data() {
      return {
        currentPage: 1,
        perPage: 20,
        totalRows: 0,

        fields: [
          {key: 'title', label: 'Nazwa listy', sortable: true},
          {key: 'discipline', label: 'Dyscyplina', sortable: true},
          {key: 'sex', label: 'Płeć', sortable: true},
          {key: 'lessonCategory', label: 'Kategoria', sortable: true},
          {key: 'class', label: 'Klasa', sortable: true},
          {key: 'school', label: 'Szkoła / Klub', sortable: true},
          {key: 'status', label: 'Status w systemie', sortable: true},
          {key: 'edit', label: ''}
        ],

        search: '',

        selectedGender: [],
        genderOptions: [
          {text: 'kobieta', value: 0},
          {text: 'mężczyzna', value: 1}
        ],

        selectedDisciplines: [],
        selectedLessonCategories: [],
        selectedClasses: [],
        selectedSchools: []
      }
    },
    computed: {
      schoolsTreeselect() {
        let data = this.$store.getters.schools
        let preparedSchools = []

        for (let schoolIndex in data) {
          if (this.school) {
            if (data[schoolIndex].id === this.school.id) preparedSchools.push({ id: data[schoolIndex].id, label: data[schoolIndex].name })
          } else if (this.schoolIds) {
            if (this.schoolIds.includes(data[schoolIndex].id)) preparedSchools.push({ id: data[schoolIndex].id, label: data[schoolIndex].name })
          } else {
            preparedSchools.push({ id: data[schoolIndex].id, label: data[schoolIndex].name })

          }
        }

        return preparedSchools
      },
      disciplines() {
        return this.$store.getters.disciplines
      },
      lessonCategories() {
        return this.$store.getters.lessonCategories
      },
      classes() {
        return this.$store.getters.classes
      },
      participantGroups() {
        let participantGroups = this.$store.getters.participantGroups

        // let filteredParticipantGroups = []
        // let search = this.search || ''
        // let selectedGender = this.selectedGender || []
        // let disciplines = this.selectedDisciplines || []
        // let lessonCategories = this.selectedLessonCategories || []
        // let classes = this.selectedClasses || []
        // let selectedSchools = this.selectedSchools || []
        //
        // for (let index in participantGroups) {
        //   if (search.length > 0 && participantGroups[index].title.toLowerCase().indexOf(search.toLowerCase()) === -1) continue
        //   if (selectedGender.length > 0 && participantGroups[index].sex.filter(x => selectedGender.includes(x)).length < 1) continue
        //   // if (selectedGender.length > 0 && !selectedGender.includes(participantGroups[index].sex)) continue
        //   if (disciplines.length > 0 && !disciplines.includes(parseInt(participantGroups[index].discipline.id))) continue
        //   if (lessonCategories.length > 0 && !lessonCategories.includes(parseInt(participantGroups[index].lessonCategory.id))) continue
        //   if (classes.length > 0 && !classes.includes(parseInt(participantGroups[index].class.id))) continue
        //   if (selectedSchools.length > 0 && !selectedSchools.includes(parseInt(participantGroups[index].school.id))) continue
        //
        //   // for school & leader & participant component
        //   if (this.participant && this.participant.id) {
        //     let participantExists = participantGroups[index].participants && participantGroups[index].participants.find(x => {
        //       return x.id === this.participant.id
        //     })
        //
        //     if (undefined === participantExists) continue
        //   }
        //   if (this.school && this.school.id) {
        //     if (this.school.id !== participantGroups[index].school.id) continue
        //   }
        //   if (this.schoolIds && this.schoolIds.length > 0) {
        //     if (!this.schoolIds.includes(participantGroups[index].school.id)) continue
        //   }
        //
        //   filteredParticipantGroups.push(participantGroups[index])
        // }

        return participantGroups
        // return filteredParticipantGroups
      }
    },
    watch: {
      currentPage: function (val) {
        this.filter(val)
      }
    },
    methods: {
      filter (currentPage = 1, reset = false) {
        let filters = {
          search: this.search || '',
          selectedGender: this.selectedGender || [],
          disciplines: this.selectedDisciplines || [],
          lessonCategories: this.selectedLessonCategories || [],
          classes: this.selectedClasses || [],
          selectedSchools: this.selectedSchools || []
        }

        if (this.participant && this.participant.id) {
          filters.participantId = this.participant.id
          // let participantExists = participantGroups[index].participants && participantGroups[index].participants.find(x => {
          //   return x.id === this.participant.id
          // })

          // if (undefined === participantExists) continue
        }
        if (this.school && this.school.id) {
          filters.schoolId = this.school.id
          // if (this.school.id !== participantGroups[index].school.id) continue
        }
        if (this.schoolIds && this.schoolIds.length > 0) {
          filters.schoolIds = this.schoolIds
          // if (!this.schoolIds.includes(participantGroups[index].school.id)) continue
        }

        this.$store.dispatch('getParticipantGroups', {
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
      getSchoolNameById (id) {
        let schools = this.$store.getters.schools
        if (undefined === schools || schools === null || schools.length < 1) return ''
        let school = schools.find((obj) => {
          return obj.id === id
        })
        return undefined === school ? '' : school.name
      },
      getSex(value) {
        if (!Array.isArray(value)) return ''
        let string = ''
        if (value.includes(1)) string += 'Mężczyzna'
        if (value.length > 1) string += ', '
        if (value.includes(0)) string += 'Kobieta'
        return string
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
        this.$router.push({
          name: 'participant.group',
          params: {'tab': 'main-data', 'id': row.id}
        })
      }
    },
    created() {
      this.filter()
      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getLessonCategories')
      this.$store.dispatch('getClasses')
      this.$store.dispatch('getSchools', {})

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: 'participant.group', params: {tab: 'main-data'}})

      if (undefined === this.school && this.schoolIds === undefined && this.participant === undefined) {
        this.changeAdminNavbarBreadcrumbs([{text: 'Lista zawodników', active: true}])
      }
    }
  }
</script>

<style scoped>

</style>
