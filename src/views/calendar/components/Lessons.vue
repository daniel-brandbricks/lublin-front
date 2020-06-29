<template>
  <div>
    <b-form-group class="custom">
      <b-form-input type="text" class="custom"
                    placeholder="Nazwa zajęcia"
                    v-model="lessons.selectedLesson"/>
    </b-form-group>

    <b-row class="align-items-center mb-2">
      <b-col>
        <b-form-group class="custom">
          <b-form-checkbox-group
            id="checkbox-group-type"
            v-model="selectedType"
            :options="typeOptions"
            name="checkbox-group-type"
          />
        </b-form-group>
      </b-col>
      <b-col>
        <treeselect v-model="lessons.schoolsAndClubs"
                    :multiple="true"
                    :searchable="false"
                    placeholder="Nazwa klubu/Szkoły"
                    :options="schoolsAndClubsPrepared"
                    name="sportObject.schools" key="sportObject.schools"
                    class="custom"/>
      </b-col>
    </b-row>
<!--    <treeselect class="custom mb-2"-->
<!--                v-model="lessons.selectedLesson"-->
<!--                :multiple="true"-->
<!--                placeholder="Nazwa zajęcia"-->
<!--                :options="lessons.sportObjects"/>-->
    <treeselect class="custom mb-2"
                v-model="lessons.selectedSportObject"
                :multiple="true"
                placeholder="Obiekt sportowy"
                :options="sportObjectsTreeselect(lessons.schoolsAndClubs)"/>
    <treeselect class="custom mb-2" v-if="$store.getters.isDirector || $store.getters.isAdmin"
                v-model="lessons.selectedLeader"
                :multiple="true"
                placeholder="Prowadzący"
                :options="leadersTreeselect"/>

    <treeselect class="custom mt-4 mb-2"
                v-model="lessons.districtValue"
                :multiple="true"
                placeholder="Dzielnica"
                :options="districts"/>
    <treeselect class="custom mb-2"
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
<!--    <treeselect class="custom mb-2"-->
<!--                v-model="lessons.selectedYear"-->
<!--                :multiple="true"-->
<!--                placeholder="Rocznik"-->
<!--                :options="lessons.years"/>-->

<!--    <b-row class="align-items-center mb-2">-->
<!--      <b-col>-->
<!--        <b-form-group class="custom">-->
<!--          <b-form-checkbox-group-->
<!--            id="checkbox-group-gender"-->
<!--            v-model="lessons.selectedGender"-->
<!--            :options="lessons.genderOptions"-->
<!--            name="checkbox-group-gender"-->
<!--          ></b-form-checkbox-group>-->
<!--        </b-form-group>-->
<!--      </b-col>-->
<!--      <b-col>-->
<!--        <treeselect v-model="lessons.schoolsAndClubs"-->
<!--                    :multiple="true"-->
<!--                    :searchable="false"-->
<!--                    placeholder="Lista"-->
<!--                    :options="schoolsAndClubsPrepared"-->
<!--                    :class="{'error-input-custom': veeErrors.has('sportObject.schools')}"-->
<!--                    name="sportObject.schools" key="sportObject.schools" v-validate="{'required':true}"-->
<!--                    class="custom"/>-->
<!--      </b-col>-->
<!--    </b-row>-->
<!--    <treeselect class="custom mb-2"-->
<!--                v-model="lessons.selectedParticipant"-->
<!--                :multiple="true"-->
<!--                placeholder="Imię i Nazwisko zawodnika"-->
<!--                :options="lessons.leaders"/>-->
  </div>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import EventBusEmit from '@/mixins/event-bus-emit'

  export default {
    components: { Treeselect },
    mixins: [ EventBusEmit ],
    props: [ 'lessons', 'districts' ],
    data () {
      return {
        typeOptions: [
          { text: 'klub', value: 0 },
          { text: 'szkola', value: 1 }
        ],
        selectedType: []
      }
    },
    watch: {
      selectedType: function (val) {
        this.lessons.schoolsAndClubs = null
      }
    },
    computed: {
      // copied in FormMainData.vue -> sports-objects
      schoolsAndClubsPrepared () {
        let data = this.$store.getters.schoolsConfirmed
        let user = this.$store.getters.authUser

        let userSchools = []
        if (user && user.role === 1 && user.schoolsUsers && user.schoolsUsers.length > 0) {
          for (let index in user.schoolsUsers) {
            if (user.schoolsUsers[index].status || user.schoolsUsers[index].role === 1) {
              userSchools.push(user.schoolsUsers[index].school.id)
            }
          }
        }

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

        let result = []
        if (userSchools.length > 0 && preparedSchools.length > 0) {
          for (let index in preparedSchools) {
            if (userSchools.includes(preparedSchools[index].id)) result.push(preparedSchools[index])
          }
        } else {
          result = preparedSchools
        }

        return result
      },
      sportObjectsTreeselect () {
        return schoolIds => {
          console.log(this.$route.name)
          if (this.$route.name === 'reports') {
            let sportObjects = this.$store.getters.sportObjectsConfirmed
            let prepared = []
            for (let index in sportObjects) {
              prepared.push({id: sportObjects[index].id, label: sportObjects[index].title})
            }
            return prepared
          }

          if (null === schoolIds || undefined === schoolIds) return []
          let sportObjects = this.$store.getters.sportObjectsConfirmed
          console.log(sportObjects)
          let prepared = []
          for (let index in sportObjects) {
            // get places with @schoolId
            if (!schoolIds.includes(parseInt(sportObjects[index].school.id))) continue
            prepared.push({id: sportObjects[index].id, label: sportObjects[index].title})
          }
          return prepared
        }
      },
      leadersTreeselect () {
        let leaders = this.$store.getters.leadersConfirmed
        let leadersPrepared = []
        for (let index in leaders) {
          leadersPrepared.push({
            id: leaders[index].id,
            label: leaders[index].email
          })
        }
        return leadersPrepared
      },
      leadersTreeselectBySchool () {
        return schoolIds => {
          if (null === schoolIds || undefined === schoolIds) return []
          let leaders = this.$store.getters.leadersConfirmed
          console.log(leaders)
          let prepared = []
          for (let index in leaders) {
            let exist = false
            for (let schoolIndex in leaders[index].schoolsUsers) {
              if (schoolIds.includes(leaders[index].schoolsUsers[schoolIndex].school.id)) {
                exist = true
              }
            }

            if (exist) {
              prepared.push({id: leaders[index].id, label: leaders[index].firstName + ' ' + leaders[index].lastName})
            }
          }
          return prepared
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
    created () {
    }
  }
</script>

<style scoped>

</style>
