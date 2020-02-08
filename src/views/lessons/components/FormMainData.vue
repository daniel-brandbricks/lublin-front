<template>
    <b-row class="justify-content-center" v-if="lesson">
        <b-col cols="6">
            <!--     todo breadcrumbs -->
            <h5>Aktywuj</h5>
            <b-form-group>
                <b-form-radio v-model="lesson.active" :value="element.value" class="d-inline-block my-3 mr-3"
                              :class="{'error-input-custom': veeErrors.has('lesson.active')}"
                              name="lesson.active" :key="'lesson.active'+index" v-validate="{'required':true}"
                              v-for="(element,index) in [{title: 'Tak', value: true}, {title: 'Nie', value: false}]">
                    {{ element.title }}
                </b-form-radio>
            </b-form-group>

            <h5 class="mb-3">Płeć</h5>
            <b-form-radio v-model="lesson.sex" :value="element.value" class="d-inline-block mr-3 mb-3"
                          :class="{'error-input-custom': veeErrors.has('lesson.sex')}"
                          name="lesson.sex" :key="'lesson.sex'+index" v-validate="{'required':true}"
                          v-for="(element, index) in [{title:'mężczyzna', value: 1}, {title: 'kobieta', value: 0}]">
                {{element.title}}
            </b-form-radio>

            <h5 class="mb-3">Dane ogólne</h5>
            <b-form-group class="custom mb-2">
                <b-form-input id="title-1" class="custom m-0"
                              placeholder="Nazwa zajęcia"
                              :class="{'error-input-custom': veeErrors.has('lesson.title')}"
                              name="lesson.title" key="lesson.title" v-validate="{'required':true}"
                              v-model="lesson.title"/>
            </b-form-group>
            <b-form-group class="custom mb-2">
                <treeselect class="custom m-0" v-if="lesson.discipline"
                            v-model="lesson.discipline.id"
                            :multiple="false"
                            placeholder="Dyscyplina" :options="lessonDiscipline"
                            :class="{'error-input-custom': veeErrors.has('lesson.discipline')}"
                            name="lesson.discipline" key="lesson.discipline" v-validate="{'required':true}"/>
            </b-form-group>
            <b-form-group class="custom mb-2">
                <treeselect class="custom m-0" v-if="lesson.lessonCategory"
                            v-model="lesson.lessonCategory.id"
                            :multiple="false"
                            placeholder="Kategoria" :options="lessonCategory"
                            :class="{'error-input-custom': veeErrors.has('lesson.lessonCategory')}"
                            name="lesson.lessonCategory" key="lesson.lessonCategory" v-validate="{'required':true}"/>
            </b-form-group>
            <b-form-group class="custom mb-4">
                <treeselect class="custom m-0" v-if="lesson.class"
                            v-model="lesson.class.id"
                            :multiple="false"
                            placeholder="Klasa" :options="lessonClass"
                            :class="{'error-input-custom': veeErrors.has('lesson.class')}"
                            name="lesson.class" key="lesson.class" v-validate="{'required':true}"/>
            </b-form-group>
            <h5>Organizator</h5>
            <b-form-group>
                <b-form-radio @change="lesson.school.id = null"
                              v-model="orgType" :value="element.value" class="d-inline-block mt-3 mr-3"
                              :class="{'error-input-custom': veeErrors.has('organizatorType')}"
                              name="organizatorType" :key="'organizatorType'+index" v-validate="{'required':true}"
                              v-for="(element,index) in [{title: 'Klub', value: 0}, {title: 'Szkoła', value: 1}]">
                    {{ element.title }}
                </b-form-radio>
            </b-form-group>
            <treeselect v-if="lesson.school"
                        v-model="lesson.school.id"
                        :multiple="false"
                        placeholder="Klub / Szkoła"
                        :options="schoolsAndClubsPrepared"
                        class="custom mb-2"
                        :class="{'error-input-custom': veeErrors.has('lesson.school')}"
                        name="lesson.school" key="lesson.school" v-validate="{'required':true}"/>
            <b-form-group class="custom mb-2">
                <treeselect class="custom m-0"
                            v-model="lesson.leader.id"
                            :multiple="false"
                            placeholder="Prowadzący" :options="leadersTreeselect(lesson.school.id)"
                            :class="{'error-input-custom': veeErrors.has('lesson.leaders')}"
                            name="lesson.leaders" key="lesson.leaders" v-validate="{'required':true}"/>
            </b-form-group>
            <b-form-group class="custom mb-2">
                <treeselect class="custom m-0"
                            v-model="lesson.place.id"
                            :multiple="false"
                            placeholder="Obiekt sportowy" :options="sportObjectsTreeselect(lesson.school.id)"
                            :class="{'error-input-custom': veeErrors.has('lesson.place')}"
                            name="lesson.place" key="lesson.place" v-validate="{'required':true}"/>
            </b-form-group>

            <h5 class="my-4">Czas</h5>
            <date-picker v-model="lesson.date" :lang="'pl'"
                         :class="{'error-input-custom': veeErrors.has('lesson.date')}"
                         :name="'lesson.date'" :key="'lesson.date'"
                         value-type="format" format="YYYY-MM-DD"
                         type="date"
                         v-validate="{'required': true}"
                         id="inputDatapicFromdatelesson" placeholder="" class="w-100 custom mb-3">
            </date-picker>
            <date-picker v-model="lesson.timeRange" :lang="'pl'"
                         :class="{'error-input-custom': veeErrors.has('lesson.timeRange')}"
                         :name="'lesson.timeRange'" :key="'lesson.timeRange'"
                         type="time"
                         range @clear="lesson.timeRange = []"
                         :show-second="false"
                         value-type="format"
                         format="HH:mm"
                         v-validate="{'required': true}"
                         id="inputDatapicFromlesson" placeholder="" class="w-100 custom mb-3">
            </date-picker>

            <b-form-group class="custom mb-4">
                <treeselect class="custom m-0"
                            v-model="lesson.repetition"
                            :multiple="false"
                            placeholder="Powtarzaj przez.." :options="lessonRepeat"
                            :class="{'error-input-custom': veeErrors.has('lesson.repetition')}"
                            name="lesson.repetition" key="lesson.repetition" v-validate="{'required':true}"/>
            </b-form-group>

            <!--      buttons   -->
            <b-row class="mt-4">
                <b-col>
                    <b-btn block class="custom btn" :to="{ name: 'lessons' }">
                        Anuluj
                    </b-btn>
                </b-col>
                <b-col>
                    <b-btn variant="primary" block class="custom" @click="submit">
                        Zapisz
                    </b-btn>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import {LESSON_REPEAT} from '@/config/AppConfig'

  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'
  import LessonMixin from '@/mixins/lesson-mixin'
  import {mapGetters} from 'vuex'
  import DatePicker from 'vue2-datepicker'

  export default {
    name: 'FormMainData',
    props: ['lesson'],
    components: {Treeselect, DatePicker},
    mixins: [EventBusEmit, FormMixin, LessonMixin],
    data () {
      return {
        dateval2: [],
        dateval: [],
        orgType: 0,
        lessonRepeat: LESSON_REPEAT
      }
    },
    computed: {
      ...mapGetters(['schools', 'disciplines', 'sportObjectsConfirmed', 'leadersConfirmed', 'classes', 'lessonCategories']),
      sportObjectsTreeselect () {
        return schoolId => {
          let sportObjects = this.sportObjectsConfirmed
          let prepared = []
          for (let index in sportObjects) {
            // get places with @schoolId
            if (parseInt(sportObjects[index].school.id) !== parseInt(schoolId)) continue
            prepared.push({id: sportObjects[index].id, label: sportObjects[index].title})
          }
          return prepared
        }
      },
      leadersTreeselect () {
        return schoolId => {
          let leadersConfirmed = this.leadersConfirmed
          let prepared = []
          for (let index in leadersConfirmed) {
            // get places with @schoolId
            if (!Array.isArray(leadersConfirmed[index].schoolsUsers) ||
              undefined === leadersConfirmed[index].schoolsUsers.find(x => {
                return parseInt(x.school.id) === schoolId
            })) {
              continue
            }
            prepared.push({id: leadersConfirmed[index].id, label: leadersConfirmed[index].firstName})
          }
          return prepared
        }
      }
    },
    methods: {
      submit (tabToRedirect) {
        // todo uncomment
        // this.$validator.validateScopes()
        //   .then((result) => {
        //     if (result === false) return
            this.$parent.submit()
          // })
      },
      goToFormTab (tabName) {
        this.$parent.goToFormTab(tabName)
      },
      checkValidTabForm () {
        return this.$validator.validateScopes()
      }
    },
    mounted () {
      if (this.$route.params.validateForm) {
        this.checkValidForm()
      }
    },
    created () {
      this.$store.dispatch('getSchools')
      this.$store.dispatch('getLeaders', {confirmed: 1})
      this.$store.dispatch('getSportObjects', {confirmed: 1})
      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getLessonCategories')
      this.$store.dispatch('getClasses')
      // this.$store.dispatch('getLessons')
    }
  }
</script>

<style scoped>

</style>
