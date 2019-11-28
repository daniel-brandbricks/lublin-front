<template>
  <div>
    <treeselect class="custom mb-2"
                v-model="lessons.districtValue"
                :multiple="true"
                placeholder="Dzielnica"
                :options="lessons.districts"/>
    <treeselect class="custom mb-2"
                v-model="lessons.selectedDiscipline"
                :multiple="true"
                placeholder="Dyscyplina"
                :options="lessons.disciplines"/>

    <b-row class="align-items-center mb-2">
      <b-col>
        <b-form-group class="custom">
          <b-form-checkbox-group
            id="checkbox-group-type"
            v-model="lessons.selectedType"
            :options="lessons.typeOptions"
            name="checkbox-group-type"
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
                v-model="lessons.selectedCategory"
                :multiple="true"
                placeholder="Kategoria"
                :options="lessons.categories"/>
    <treeselect class="custom mb-2"
                v-model="lessons.selectedClass"
                :multiple="true"
                placeholder="Klasa"
                :options="lessons.classes"/>

    <treeselect class="custom mb-2"
                v-model="lessons.selectedSportObject"
                :multiple="true"
                placeholder="Obiekt sportowy"
                :options="lessons.sportObjects"/>
    <treeselect class="custom mb-2"
                v-model="lessons.selectedLeader"
                :multiple="true"
                placeholder="Prowadzący"
                :options="lessons.leaders"/>

    <b-row class="align-items-center mb-2">
      <b-col>
        <b-form-group class="custom">
          <b-form-checkbox-group
            id="checkbox-group-gender"
            v-model="lessons.selectedGender"
            :options="lessons.genderOptions"
            name="checkbox-group-gender"
          ></b-form-checkbox-group>
        </b-form-group>
      </b-col>
      <b-col>
        <treeselect v-model="lessons.schoolsAndClubs"
                    :multiple="true"
                    :searchable="false"
                    placeholder="Lista"
                    :options="schoolsAndClubsPrepared"
                    :class="{'error-input-custom': veeErrors.has('sportObject.schools')}"
                    name="sportObject.schools" key="sportObject.schools" v-validate="{'required':true}"
                    class="custom"/>
      </b-col>
    </b-row>

    <treeselect class="custom mb-2"
                v-model="lessons.selectedParticipant"
                :multiple="true"
                placeholder="Imię i Nazwisko zawodnika"
                :options="lessons.leaders"/>
    <treeselect class="custom mb-2"
                v-model="lessons.selectedLesson"
                :multiple="true"
                placeholder="Nazwa zajęcia"
                :options="lessons.sportObjects"/>

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
    props: [ 'lessons' ],
    data () {
      return {}
    },
    computed: {
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
    created () {
      this.$store.dispatch('getSchools', {})
    }
  }
</script>

<style scoped>

</style>
