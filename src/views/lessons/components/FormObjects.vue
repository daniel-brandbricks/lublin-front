<template>
  <b-row class="justify-content-center" v-if="lesson">
    <b-col cols="6">
      <h5 class="mb-3">Obiekty Sportowe</h5>
      <div class="row" v-if="lessonSportObjects"
           v-for="(sportObject, index) in lessonSportObjects" :key="index">
        <div class="col-2">
          <div class="text-center _custom-css">
            <p class="m-auto">{{index + 1}}</p>
          </div>
          <p @click="deleteLessonSportObject(lessonSportObjects[index].id, index)"
             v-if="lessonSportObjects.length > 0">usuń</p>
        </div>
        <div class="col-10">
          <b-form-radio v-model="orgTypes[index]" :value="element.value"
                        class="d-inline-block mr-4 mb-2"
                        :class="{'error-input-custom': veeErrors.has('orgType'+index+'_'+radioIndex)}"
                        :name="'orgType'+index+'_'+radioIndex"
                        :key="'orgType'+index+'_'+radioIndex"
                        v-validate="{'required':true}"
                        v-for="(element,radioIndex) in [{title: 'Klub', value: 0}, {title: 'Szkoła', value: 1}]">
            {{ element.title }}
          </b-form-radio>
          <treeselect class="custom mb-2" v-if="lessonSportObjects[index].school"
                      v-model="lessonSportObjects[index].school.id"
                      :multiple="false"
                      placeholder="Nawa Klub / szkoły"
                      @change="lessonSportObjects[index].places = []"
                      :options="schoolOrClubTreeselect(index)"
                      :class="{'error-input-custom': veeErrors.has('lessonSportObjects.school'+index)}"
                      :name="'lessonSportObjects.school'+index" :key="'lessonSportObjects.school'+index"
                      v-validate="{'required': true}"/>
          <treeselect class="custom mb-4" v-if="lessonSportObjects[index].place"
                      v-model="lessonSportObjects[index].place.id"
                      :multiple="false"
                      placeholder="Nawa obiektu"
                      :class="{'error-input-custom': veeErrors.has('lessonSportObjects.place'+index)}"
                      :name="'lessonSportObjects.place'+index" :key="'lessonSportObjects.place'+index"
                      v-validate="{'required': true}"
                      :options="sportObjectByIdTreeselect(lessonSportObjects[index].school.id)"/>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-2">
          <div class="text-center _custom-css">
            <p class="m-auto">{{lessonSportObjects.length + 1}}</p>
          </div>
        </div>
        <div class="col-10">
          <b-btn @click="addEmptyLessonSportObject()" variant="primary" block-class="w-50">+ Dodaj
          </b-btn>
        </div>
      </div>

      <b-row class="mt-4">
        <b-col>
          <b-btn block-class="custom btn" :to="{ name: 'lessons' }">
            Anuluj
          </b-btn>
        </b-col>
        <b-col>
          <b-btn @click="submit" variant="primary" block>Zapisz</b-btn>
        </b-col>
        <b-col>
          <b-btn variant="primary" @click="goToFormTab('participant-group-list')">
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
  import {mapActions, mapGetters} from 'vuex'
  import LessonMixin from '@/mixins/lesson-mixin'

  export default {
    name: 'FormObjects',
    props: ['lesson', 'schoolIds'],
    components: {Treeselect},
    mixins: [EventBusEmit, FormMixin, LessonMixin],
    data () {
      return {
        selectedSchoolsIds: [],
        titlePlace: '',
        orgTypes: []
      }
    },
    computed: {
      ...mapGetters([
        'schools',
        'sportObjects'
      ]),
      lessonSportObjects: {
        get () {
          this.checkLessonSportObjects(this.$store.getters.lessonSportObjects)
          return this.$store.getters.lessonSportObjects
        },
        set (value) {
          console.log(value)
          this.$store.dispatch('setLessonSportObjects', value)
        }
      },
      schoolOrClubTreeselect () {
        return typeIndex => {
          let schools = this.schools
          let prepared = []

          for (let index in schools) {
            if (undefined !== this.orgTypes[typeIndex] && parseInt(schools[index].type) !== this.orgTypes[typeIndex]) {
              continue
            }
            if (this.selectedSchoolsIds.indexOf(schools[index].id) === -1) {
              prepared.push({id: schools[index].id, label: schools[index].name})
            } else {
              prepared.push({id: schools[index].id, label: schools[index].name, isDisabled: true})
            }
          }

          return prepared
        }
      },
      sportObjectByIdTreeselect () {
        return schoolId => {
          let sportObjects = this.sportObjects
          let prepared = []

          for (let index in sportObjects) {
            let schoolIds = sportObjects[index].schools
            if (undefined === schoolIds.find(x => {
              return parseInt(x.id) === parseInt(schoolId)
            })) {
              continue
            }

            prepared.push({id: sportObjects[index].id, label: sportObjects[index].title})
          }

          return prepared
        }
      }
    },
    methods: {
      ...mapActions([
        'getSportObjects',
        'getSchools'
      ]),
      deleteLessonSportObject (id, index) {
        this.$store.dispatch('deleteLessonSportObject', {id: id})
        console.log(index)
        delete this.orgTypes[index]
      },
      addEmptyLessonSportObject () {
        this.$store.dispatch('addEmptyLessonSportObject')
        // this.orgTypes.push(0)
      },
      removeSportObject (index) {
        this.lesson.sportObjects.splice(index, 1)
      },
      addSportObject () {
        this.lesson.sportObjects.push({id: null})
      },
      goToFormTab (tabName) {
        this.$parent.goToFormTab(tabName)
      },
      submit (tabToRedirect) {
        console.log(123123)
        let lesson = {
          id: this.$route.params.id,
          lessonSchools: Object.assign({}, this.lessonSportObjects)
        }
        this.$parent.submit(lesson, tabToRedirect)

        // this.$router.push({
        //   name: 'lesson',
        //   params: {'tab': tabToRedirect, 'id': this.$route.params.id}
        // })
      },
      checkLessonSportObjects (lessonSportObjects) {
        this.selectedSchoolsIds = []

        for (let index in lessonSportObjects) {
          if (lessonSportObjects[index].school && lessonSportObjects[index].school.id) {
            // uniq schools
            if (this.selectedSchoolsIds.indexOf(lessonSportObjects[index].school.id) === -1) {
              this.selectedSchoolsIds.push(lessonSportObjects[index].school.id)
            }
          }
        }
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
