<template>
  <div>
    <b-row>
      <b-col cols="12" xl="6" lg="6" md="12" sm="12" class="mb-2">
        <h2 class="my-3">Zajęcia (filtruj, aby pojawiały się na mapie)</h2>

        <b-form-group class="custom my-3">
          <b-form-checkbox-group
            id="checkbox-confirm-type"
            v-model="lessons.selectedAccepted"
            :options="acceptedValues"
            name="checkbox-confirm-type"
          ></b-form-checkbox-group>
        </b-form-group>

        <b-form-group class="custom mt-1 mb-2">
          <b-form-input type="text" class="custom mb-0"
                        placeholder="Nazwa zajęcia"
                        v-model="lessons.selectedLesson"/>
        </b-form-group>

        <b-row class="align-items-center mb-2">
          <b-col>
            <b-form-group class="custom">
              <b-form-checkbox-group
                id="checkbox-schhol-type"
                v-model="selectedType"
                :options="typeOptions"
                name="checkbox-schhol-type"
              ></b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <b-col>
            <treeselect v-model="lessons.schoolsAndClubs"
                        :multiple="true"
                        :searchable="false"
                        placeholder="Nazwa klubu/Szkoły"
                        :options="schoolsAndClubsPrepared"
                        :class="{'error-input-custom': veeErrors.has('sportObject.schools')}"
                        name="sportObject.schools" key="sportObject.schools" v-validate="{'required':true}"
                        class="custom"/>
          </b-col>
        </b-row>

        <treeselect class="custom mb-2"
                    v-model="lessons.selectedSportObject"
                    :multiple="true"
                    placeholder="Obiekt sportowy"
                    :options="sportObjectsTreeselect(lessons.schoolsAndClubs)"/>
        <treeselect class="custom"
                    v-model="lessons.selectedLeader"
                    :multiple="true"
                    placeholder="Prowadzący"
                    :options="leadersTreeselect(lessons.schoolsAndClubs)"/>

      </b-col>
      <b-col cols="12" xl="6" lg="6" md="12" sm="12" class="mb-2">
        <date-picker v-model="selectedYear" :lang="datepickerParams.lang"
                     :class="{'error-input-custom': veeErrors.has('selectedYear')}"
                     :name="'selectedYear'" :key="'selectedYear'"
                     value-type="format" format="YYYY-MM-DD"
                     v-validate="{'required': true}"
                     type="date"
                     :id="'selectedYear'" placeholder="Wybierz datę (obowiązkowo)" class="w-100 custom mt-4">
        </date-picker>

        <treeselect class="custom mt-4 mb-2"
                    v-model="lessons.selectedDiscipline"
                    :multiple="true"
                    placeholder="Dyscyplina"
                    :options="disciplinesTreeselect"/>
        <treeselect class="custom mb-2"
                    v-model="lessons.selectedCategory"
                    :multiple="true"
                    placeholder="Kategoria"
                    :options="lessonCategoryTreeselect"/>
        <treeselect class="custom mb-2"
                    v-model="lessons.selectedClass"
                    :multiple="true"
                    placeholder="Klasa"
                    :options="lessonClassTreeselect"/>

        <h6 class="mt-4 my-3">Lokalizacja</h6>
        <treeselect class="custom mb-2"
                    v-model="lessons.districtValue"
                    :multiple="true"
                    placeholder="Dzielnica"
                    :options="districts"/>

<!--        <treeselect class="custom mb-2"-->
<!--                    v-model="addressValue"-->
<!--                    :multiple="true"-->
<!--                    placeholder="Adres"-->
<!--                    :options="addresses"/>-->
<!--        <treeselect class="custom mb-2"-->
<!--                    v-model="distanceValue"-->
<!--                    :multiple="true"-->
<!--                    placeholder="W odległości 1km"-->
<!--                    :options="distances"/>-->

        <b-btn variant="primary" class="text-align-right d-block ml-auto" @click="filter">Filtruj</b-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import {DATEPICKER_PARAMS, DISTRICTS} from '@/config/AppConfig'
  import DatePicker from 'vue2-datepicker'

  export default {
    components: {Treeselect, DatePicker},
    mixins: [EventBusEmit],
    props: ['lessons'],
    data () {
      return {
        selectedYear: null,
        datepickerParams: DATEPICKER_PARAMS,

        districts: DISTRICTS,
        districtValue: null,

        selectedAccepted: [],
        acceptedValues: [
          { text: 'Aktywne', value: 1 },
          { text: 'Nie aktywne', value: 0 }
        ],

        selectedType: [],
        typeOptions: [
          {text: 'klub', value: 0},
          {text: 'szkola', value: 1}
        ],
        selectedGender: [],
        genderOptions: [
          {text: 'kobieta', value: 0},
          {text: 'mężczyzna', value: 1}
        ]
      }
    },
    computed: {
      // copied in FormMainData.vue -> sports-objects
      schoolsAndClubsPrepared () {
        let data = this.$store.getters.schoolsConfirmed
        let preparedSchools = []

        for (let schoolIndex in data) {
          if (this.selectedType.length > 0) {
            if (this.selectedType.includes(data[schoolIndex].type)) {
              preparedSchools.push({ id: data[schoolIndex].id, label: data[schoolIndex].name })
            }
          } else {
            preparedSchools.push({ id: data[schoolIndex].id, label: data[schoolIndex].name })
          }
        }

        return preparedSchools
      },
      sportObjectsTreeselect () {
        return schoolIds => {
          // if (null === schoolIds || undefined === schoolIds) return []
          let sportObjects = this.$store.getters.adminSportObjectsConfirmed
          // console.log(sportObjects)
          let prepared = []
          for (let index in sportObjects) {
            // get places with @schoolId
            // if (!schoolIds.includes(parseInt(sportObjects[index].school.id))) continue
            prepared.push({id: sportObjects[index].id, label: sportObjects[index].title})
          }
          return prepared
        }
      },
      leadersTreeselect () {
        return schoolIds => {
          console.log(schoolIds)
          if (undefined === schoolIds || null === schoolIds) return []
          let leaders = this.$store.getters.leadersConfirmed
          let leadersPrepared = []
          for (let index in leaders) {
            if (undefined === leaders[index].schoolsUsers || leaders[index].schoolsUsers === null || leaders[index].schoolsUsers.length < 1) continue
            let hasSchool = false
            for (let suIndex in leaders[index].schoolsUsers) {
              if (schoolIds.includes(leaders[index].schoolsUsers[suIndex].school.id)) hasSchool = true
            }
            if (!hasSchool) continue

            leadersPrepared.push({
              id: leaders[index].id,
              label: (leaders[index].firstName ? leaders[index].firstName : '') + ' ' + (leaders[index].lastName ? leaders[index].lastName : '')
            })
          }
          return leadersPrepared
        }
      },
      disciplinesTreeselect () {
        // eslint-disable-next-line one-var
        let disciplinesPrepared = [],
            disciplines = this.$store.getters.disciplines
        for (let index in disciplines) {
          disciplinesPrepared.push({
            id: disciplines[index].id,
            label: disciplines[index].title
          })
        }
        return disciplinesPrepared
      },
      lessonCategoryTreeselect () {
        let data = this.$store.getters.lessonCategories || []
        let preparedLessonCategories = []

        for (let lessonCategoryIndex in data) {
          preparedLessonCategories.push({id: data[lessonCategoryIndex].id, label: data[lessonCategoryIndex].title})
        }

        return preparedLessonCategories
      },
      lessonClassTreeselect () {
        let data = this.$store.getters.classes || []
        let preparedClasses = []

        for (let classIndex in data) {
          preparedClasses.push({id: data[classIndex].id, label: data[classIndex].title})
        }

        return preparedClasses
      }
    },
    methods: {
      filter () {
        if (this.selectedYear === undefined || this.selectedYear === null) return
        let lessonFilters = {
          lesson: this.lessons,
          date: this.selectedYear
        }
        this.$store.dispatch('getLessons', {adminPlaces: true, filters: lessonFilters})
          .then(response => {
            this.$parent.setLocations(response)
          })
      }
    },
    created () {
      this.$store.dispatch('getSchools', {})
    }
  }
</script>

<style scoped>

</style>
