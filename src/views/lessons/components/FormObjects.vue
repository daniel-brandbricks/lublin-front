<template>
<b-row class="justify-content-center" v-if="lesson">
    <b-col cols="6">
      <h5 class="mb-3">Obiekty Sportowe</h5>
      {{lesson.sportObjects}}
      <div class="row" v-if="lesson.sportObjects"
           v-for="(sportObject, index) in lesson.sportObjects" :key="index">
        <div class="col-2">
          <div class="text-center _custom-css">
            <p class="m-auto">{{index + 1}}</p>
          </div>
            <p @click="removeSportObject(index)" v-if="lesson.sportObjects.length > 0">usuń</p>
        </div>
        <div class="col-10">
          <b-form-radio v-model="lesson.sportObjects[index].status" :value="element.value"
                        class="d-inline-block mr-4 mb-2"
                        :class="{'error-input-custom': veeErrors.has('lesson.active'+radioIndex)}"
                        :name="'lesson.active'+radioIndex"
                        :key="'lesson.active'+radioIndex"
                        v-validate="{'required':true}"
                        v-for="(element,radioIndex) in [{title: 'Tak', value: true}, {title: 'Nie', value: false}]">
            {{ element.title }}
          </b-form-radio>
          <treeselect class="custom mb-2" v-if="lesson.sportObjects[index]"
                      v-model="lesson.sportObjects[index].id"
                      :multiple="false"
                      placeholder="Nawa Klub / szkoły"
                      @input="sportObjects[index].places = []"
                      :options="schoolOrClubTreeselect"
                      :class="{'error-input-custom': veeErrors.has('lesson.schoolSportObjects.school')}"
                      :name="'lesson.schoolSportObjects.school'+index" :key="'lesson.schoolSportObjects.school'+index"
                      v-validate="{'required': true}"/>
          <treeselect class="custom mb-4" v-if="lesson.sportObjects[index]"
                      v-model="lesson.sportObjects[index].id"
                      :multiple="false"
                      placeholder="Nawa obiektu"
                      :options="sportObjectTitleTreeselect"
                      :class="{'error-input-custom': veeErrors.has('lesson.sportObjects.place')}"
                      :name="'lesson.sportObjects.place'+index" :key="'lesson.sportObjects.place'+index"
                      v-validate="{'required': true}"/>
<!--          <treeselect class="custom mb-4" v-if="lesson.sportObjects[index]"-->
<!--                      v-model="lesson.sportObjects[index].id"-->
<!--                      :multiple="false"-->
<!--                      placeholder="Nawa obiektu"-->
<!--                      :options="sportObjectTitleTreeselect(selectedSchoolsIds[index] ?-->
<!--                      selectedSchoolsIds[index].id : null)"-->
<!--                      :class="{'error-input-custom': veeErrors.has('lesson.sportObjects.place')}"-->
<!--                      :name="'lesson.sportObjects.place'+index" :key="'lesson.sportObjects.place'+index"-->
<!--                      v-validate="{'required': true}"/>-->
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-2">
          <div class="text-center _custom-css">
            <p class="m-auto">{{lesson.sportObjects.length + 1}}</p>
          </div>
        </div>
        <div class="col-10">
          <b-btn @click="addSportObject" variant="primary" block-class="w-50">+ Dodaj</b-btn>
        </div>
      </div>

      <b-row class="mt-4">
        <b-col>
          <b-btn block-class="custom btn" :to="{ name: 'lessons' }">
            Anuluj
          </b-btn>
        </b-col>
        <b-col>
          <b-btn variant="primary" block class="custom" @click="goToFormTab('participant-group-list')">
            Dalej
          </b-btn>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    // todo props
    name: 'FormObjects',
    props: [ 'lesson', 'isValidForm', 'schoolIds' ],
    components: { Treeselect },
    mixins: [ EventBusEmit, FormMixin ],
    data () {
      return {
        selectedSchoolsIds: [],
        titlePlace: ''
      }
    },
    computed: {
      ...mapGetters([
        'schools',
        'sportObjects'
      ]),
      schoolOrClubTreeselect () {
        let schools = this.schools
        let prepared = []

        for (let index in schools) {
          if (this.selectedSchoolsIds.indexOf(schools[index].id) === -1) {
            prepared.push({ id: schools[index].id, label: schools[index].name })
          } else {
            prepared.push({ id: schools[index].id, label: schools[index].name, isDisabled: true })
          }
        }

        return prepared
      },
      sportObjectTitleTreeselect () {
        let data = this.sportObjects
        let prepared = []

        for (let index in data) {
          prepared.push({ id: data[index].id, label: data[index].title })
        }

        return prepared
      }
    },
    methods: {
      ...mapActions([
        'getSportObjects',
        'getSchools'
      ]),
      removeSportObject (index) {
        this.lesson.sportObjects.splice(index, 1)
      },
      addSportObject () {
        this.lesson.sportObjects.push({id: null})
      },
      goToFormTab (tabName) {
        this.$parent.goToFormTab(tabName)
      },
      submit () {
        console.log('FormObjectsSubmit')
      }
    },
    created () {
      this.getSchools()
      this.getSportObjects({confirmed: 1})
      // this.$store.dispatch('getSportObjectTypes')

      this.$emit('tabLinkChanged', 'sportObjects')
    }
  }
</script>

<style scoped>

</style>
