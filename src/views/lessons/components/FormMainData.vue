<template>
  <b-row class="justify-content-center" v-if="lesson">
    <!--  cykliczne usuwanie  -->
<!--    <b-modal ref="cycleRemove"-->
<!--             modal-class="custom"-->
<!--             centered size="md"-->
<!--             :hide-footer="true"-->
<!--             footer-class="justify-content-between"-->
<!--             title-tag="h2"-->
<!--             header-class="pr-4 pb-0"-->
<!--             no-close-on-backdrop>-->

<!--      <template slot="modal-title">-->
<!--        Czy napewno chcesz usunąć?-->
<!--      </template>-->

<!--      <div slot="default" class="my-3 d-flex justify-content-between">-->
<!--        <b-btn class="custom mx-2" variant="secondary"-->
<!--               @click.prevent="hideCycleRemoveModal">-->
<!--          anuluj-->
<!--        </b-btn>-->
<!--        <b-btn v-if="remove" style="color: white" class="custom px-4 mx-2" variant="danger"-->
<!--               @click.prevent="submitCycleRemove(true)">-->
<!--          dezaktywuj-->
<!--        </b-btn>-->
<!--        <b-btn class="custom px-4" style="color: white" :class="remove ? 'mx-2' : ''" variant="danger"-->
<!--               @click.prevent="submitCycleRemove(false)">-->
<!--          usuń-->
<!--        </b-btn>-->
<!--      </div>-->
<!--    </b-modal>-->
    <!--  cykliczne usuwanie  -->

    <b-col cols="12" xl="6" lg="6" md="12" sm="12" class="mb-2">
      <!--     todo breadcrumbs -->
      <!--            <h5>Aktywuj</h5>-->
      <!--          <b-form-group>-->
      <!--            <b-form-radio v-model="lesson.active" :value="element.value" class="d-inline-block my-3 mr-3"-->
      <!--                          :class="{'error-input-custom': veeErrors.has('lesson.active')}"-->
      <!--                          name="lesson.active" :key="'lesson.active'+index" v-validate="{'required':true}"-->
      <!--                          v-for="(element,index) in [{title: 'Tak', value: true}, {title: 'Nie', value: false}]">-->
      <!--              {{ element.title }}-->
      <!--            </b-form-radio>-->
      <!--          </b-form-group>-->

      <h5 class="mb-3">Płeć</h5>
      <b-form-checkbox-group
        v-model="lesson.sex"
        id="checkbox-group-1" class="mr-3 mb-3"
        :class="{'error-input-custom': veeErrors.has('lesson.sex')}"
        name="lesson.sex" :key="'lesson.sex'" v-validate="{'required':true}"
        :options="[
            { text: 'kobieta', value: 0 },
            { text: 'mężczyzna', value: 1 }
          ]"
      />

      <h5 class="mb-3">Dane ogólne</h5>
      <b-form-group class="custom mb-2">
        <b-form-input id="title-1" class="custom m-0"
                      placeholder="Nazwa zajęcia"
                      :class="{'error-input-custom': veeErrors.has('lesson.title')}"
                      name="lesson.title" key="lesson.title" v-validate="{'required':true}"
                      v-model="lesson.title"/>
      </b-form-group>
      <b-form-group class="custom mb-2" v-if="lesson.discipline">
        <treeselect class="custom m-0"
                    v-model="lesson.discipline.id"
                    :multiple="false"
                    placeholder="Dyscyplina" :options="lessonDiscipline"
                    :class="{'error-input-custom': veeErrors.has('lesson.discipline')}"
                    name="lesson.discipline" key="lesson.discipline" v-validate="{'required':true}"/>
      </b-form-group>
      <b-form-group class="custom mb-2" v-if="lesson.lessonCategory">
        <treeselect class="custom m-0"
                    v-model="lesson.lessonCategory.id"
                    :multiple="false"
                    placeholder="Kategoria" :options="lessonCategory"
                    :class="{'error-input-custom': veeErrors.has('lesson.lessonCategory')}"
                    name="lesson.lessonCategory" key="lesson.lessonCategory" v-validate="{'required':true}"/>
      </b-form-group>
      <b-form-group class="custom mb-4" v-if="lesson.class">
        <treeselect class="custom m-0"
                    v-model="lesson.class.id"
                    :multiple="false"
                    placeholder="Klasa" :options="lessonClass"
                    :class="{'error-input-custom': veeErrors.has('lesson.class')}"
                    name="lesson.class" key="lesson.class" v-validate="{'required':true}"/>
      </b-form-group>
      <h5>Organizator</h5>
      <b-form-group>
        <b-form-radio @change="lesson.school.id = null"
                      v-if="lesson.id === undefined"
                      v-model="orgType" :value="element.value" class="d-inline-block mt-3 mr-3"
                      :class="{'error-input-custom': veeErrors.has('organizatorType')}"
                      name="organizatorType" :key="'organizatorType'+index" v-validate="{'required':true}"
                      v-for="(element,index) in [{title: 'Klub', value: 0}, {title: 'Szkoła', value: 1}]">
          {{ element.title }}
        </b-form-radio>
      </b-form-group>
      <b-form-group v-if="lesson.school">
        <treeselect v-model="lesson.school.id"
                    :multiple="false"
                    :disabled="lesson.school.id !== null && lesson.id !== undefined"
                    placeholder="Klub / Szkoła"
                    :options="schoolsAndClubsPrepared"
                    class="custom mb-2"
                    :class="{'error-input-custom': veeErrors.has('lesson.school')}"
                    name="lesson.school" key="lesson.school" v-validate="{'required':true}"/>
      </b-form-group>
      <b-form-group class="custom mb-2"
                    v-if="lesson.leader && !(authUser && authUser.role === 1 && !$store.getters.isDirector)">
        <treeselect class="custom m-0"
                    v-model="lesson.leader.id"
                    :disabled="lesson.leader.id !== null && lesson.id !== undefined"
                    :multiple="false"
                    placeholder="Prowadzący" :options="leadersTreeselect(lesson.school.id)"
                    :class="{'error-input-custom': veeErrors.has('lesson.leaders')}"
                    name="lesson.leaders" key="lesson.leaders" v-validate="{'required':true}"/>
      </b-form-group>
      <b-form-group class="custom mb-2" v-if="lesson.place">
        <treeselect class="custom m-0"
                    v-model="lesson.place.id"
                    :multiple="false"
                    placeholder="Obiekt sportowy" :options="sportObjectsTreeselect(lesson.school.id)"
                    :class="{'error-input-custom': veeErrors.has('lesson.place')}"
                    name="lesson.place" key="lesson.place" v-validate="{'required':true}"/>
      </b-form-group>

      <b-form-group class="custom mb-2" v-if="lesson.participantGroup">
        <treeselect class="custom m-0"
                    v-model="lesson.participantGroup.id"
                    :multiple="false"
                    placeholder="Lista zawodników" :options="participantGroupsTreeselect(lesson.school.id)"
                    :class="{'error-input-custom': veeErrors.has('lesson.participantGroup')}"
                    name="lesson.participantGroup" key="lesson.participantGroup"
                    v-validate="{'required':true}"/>
      </b-form-group>

      <h5 class="my-4">Czas</h5>
      <date-picker v-model="lesson.date" :lang="datepickerParams.lang"
                   :class="{'error-input-custom': veeErrors.has('lesson.date')}"
                   :name="'lesson.date'" :key="'lesson.date'"
                   value-type="format" format="YYYY-MM-DD"
                   type="date"
                   placeholder="Data"
                   v-validate="{'required': true}"
                   id="lessonDate" class="w-100 custom mb-3">
      </date-picker>

      <!--      range @clear="lesson.timeRange = []"-->
      <!--      format="HH:mm a"-->
      <!--      value-type="format"-->
      <!--      type="time"-->
      <!--      placeholder="HH:mm"-->

      <date-picker v-model="lesson.timeRange" :lang="datepickerParams.lang"
                   :minute-step="5"
                   :hour-options="datepickerParams.hours"
                   format="HH:mm"
                   value-type="format"
                   type="time"
                   placeholder="Godziny / minuty"
                   range
                   :name="'lesson.timeRange'" :key="'lesson.timeRange'"
                   :class="{'error-input-custom': veeErrors.has('lesson.timeRange')}"
                   v-validate="{'required': true}"
                   id="lessonTimeRange" class="w-100 custom mb-3">

        <template v-slot:header="{ emit }">
          <b-row class="mt-1 justify-content-center">
            <b-col class="text-center">
              <p class="">Godz:min</p>
            </b-col>
            <b-col class="text-center">
              <p class="">Godz:min</p>
            </b-col>
          </b-row>
        </template>
      </date-picker>

      <b-form-group class="custom mb-4" v-if="lesson.id === undefined && lesson.date">
        <treeselect class="custom m-0"
                    id="lessonRepetition"
                    v-model="lesson.repetition"
                    :multiple="false"
                    placeholder="Powtarzaj przez.." :options="lessonRepeat"/>
      </b-form-group>

      <h6 v-b-toggle.collapse-repetitions v-if="lesson.id === undefined && lesson.date"><span class="mr-3">^</span>Daty
        powtórzeń</h6>
      <b-collapse visible id="collapse-repetitions" class="mt-2">
        <div :key="index" v-for="(item,index) in lesson.repetition">
          {{ item }}. {{ getRepetitionDate(item) }}
        </div>
      </b-collapse>

      <b-form-group class="custom checkbox-big-span mb-3" v-if="undefined !== id">
        <b-form-checkbox-group
          id="lessonCanceled"
          v-model="lesson.canceled"
          :options="[{text: 'Zajęcia odwołane', value: true}]"
          :unchecked-value="false"
          :value="true"
          name="flavour-1"
        />
      </b-form-group>

      <template v-if="undefined !== id && (lesson.canceled.length > 0 || lesson.canceled)">
        <date-picker v-model="lesson.newDate" :lang="datepickerParams.lang"
                     :class="{'error-input-custom': veeErrors.has('lesson.newDate')}"
                     :name="'lesson.newDate'" :key="'lesson.newDate'"
                     value-type="format" format="YYYY-MM-DD"
                     type="date"
                     placeholder="Nowa data"
                     v-validate="{'required': true}"
                     id="lessonNewDate" class="w-100 custom mb-3">
        </date-picker>
        <date-picker v-model="lesson.newTimeRange" :lang="datepickerParams.lang"
                     @clear="lesson.newTimeRange = []"
                     :minute-step="5"
                     :hour-options="datepickerParams.hours"
                     format="HH:mm"
                     value-type="format"
                     type="time"
                     placeholder="Godziny / minuty"
                     range
                     :class="{'error-input-custom': veeErrors.has('lesson.newTimeRange')}"
                     :name="'lesson.newTimeRange'" :key="'lesson.newTimeRange'"
                     v-validate="{'required': true}"
                     id="lessonNewTimeRange" class="w-100 custom mb-3">
          <template v-slot:header="{ emit }">
            <b-row class="mt-1 justify-content-center">
              <b-col class="text-center">
                <p class="">Godz:min</p>
              </b-col>
              <b-col class="text-center">
                <p class="">Godz:min</p>
              </b-col>
            </b-row>
          </template>
        </date-picker>
      </template>

      <b-form-group class="custom checkbox-big-span mb-3" v-if="undefined !== id">
        <b-form-checkbox-group
          id="lessonReplaced"
          v-model="lesson.replaced"
          :options="[{text: 'Zastępstwa', value: true}]"
          :unchecked-value="false"
          :disabled="lesson.replacementLeaders && lesson.replacementLeaders.length > 0
          && !!lesson.replacementLeaders[0].id"
          :value="true"
          name="flavour-1"
        />
      </b-form-group>

      <template v-if="undefined !== id && lesson.replaced">
        <div :key="index" v-for="(leader,index) in lesson.replacementLeaders">

          <h6 class="my-3">Aktywuj</h6>
          <b-form-group>
            <b-form-radio v-model="lesson.replacementLeaders[index].active" :value="element.value"
                          class="d-inline-block mr-3"
                          :disabled="!!(authUser.id !== lesson.leader.id && lesson.id) && !$store.getters.isDirector"
                          :class="{'error-input-custom': veeErrors.has('lesson.replacementLeaders.active'+index)}"
                          :name="'lesson.replacementLeaders.active'+index"
                          v-validate="{'required':true}"
                          v-for="(element,index2) in [{title: 'Tak', value: true}, {title: 'Nie', value: false}]">
              {{ element.title }}
            </b-form-radio>
          </b-form-group>

          <b-form-group class="custom mt-2" v-if="lesson.replacementLeaders[index].leader">
            <treeselect class="custom"
                        v-model="lesson.replacementLeaders[index].leader.id"
                        :multiple="false"
                        :disabled="!!(authUser.id !== lesson.leader.id && lesson.id) && !$store.getters.isDirector"
                        placeholder="Prowadzący" :options="leadersReplaceTreeselect(lesson.school.id)"
                        :class="{'error-input-custom': veeErrors.has('lesson.replacementLeaders.leaders'+index)}"
                        :name="'lesson.replacementLeaders.leaders'+index"
                        :key="'lesson.replacementLeaders.leaders'+index" v-validate="{'required':true}"/>
          </b-form-group>

          <b-btn
            v-if="lesson.replacementLeaders[index].leader.id === null || lesson.replacementLeaders[index].leader.id === undefined"
            variant="delete" class="custom d-block mr-auto mb-2" @click="removeReplacedLeader(index)" size="sm">Usuń
          </b-btn>
        </div>

        <b-btn :disabled="!!(authUser.id !== lesson.leader.id && lesson.id) && !$store.getters.isDirector"
               variant="primary" class="custom d-block ml-auto my-3" @click="addReplacedLeader" size="sm">Dodaj
        </b-btn>
      </template>

      <!--      buttons   -->
      <b-row class="mt-4">
        <b-col>
          <b-btn variant="delete" class="custom" v-if="lesson.active == 1"
                 @click="deleteFromForm('deleteLesson', lesson.id, undefined, 'lessons', {}, {}, true)">
            <!-- todo Vetal' -->
            Usuń
          </b-btn>
          <b-btn variant="delete" class="custom" v-else
                 @click="activateLesson">
            <!-- todo Vetal' -->
            Przywróć
          </b-btn>

        </b-col>
        <b-col v-if="lesson.active == 1">
          <b-btn variant="delete" class="custom"
                 @click="deleteFromForm('deleteLesson', lesson.id, undefined, 'lessons', {}, {cycle: true})">
            <!-- todo Vetal' -->
            Usuń czykliczne
          </b-btn>
        </b-col>
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

  import {DATEPICKER_PARAMS, LESSON_REPEAT} from '@/config/AppConfig'

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
        orgType: 0,
        lessonRepeat: LESSON_REPEAT,
        datepickerParams: DATEPICKER_PARAMS
      }
    },
    watch: {
      'lesson.canceled': function (val) {
        console.log(val)
        if (val.length < 1 || val === false) {
          this.lesson.newDate = null
          this.lesson.newTimeRange = null
        }
      }
    },
    computed: {
      ...mapGetters(['schools', 'disciplines', 'participantGroups', 'sportObjectsConfirmed',
                     'leadersConfirmed', 'classes', 'lessonCategories']),
      authUser () {
        return this.$store.getters.authUser
      },
      sportObjectsTreeselect () {
        return schoolId => {
          let sportObjects = this.sportObjectsConfirmed
          let prepared = []
          for (let index in sportObjects) {
            // get places with @schoolId
            if (sportObjects[index].school && parseInt(sportObjects[index].school.id) !== parseInt(schoolId)) continue
            prepared.push({id: sportObjects[index].id, label: sportObjects[index].title})
          }
          return prepared
        }
      },
      participantGroupsTreeselect () {
        return schoolId => {
          let participantGroups = this.participantGroups
          let prepared = []
          for (let index in participantGroups) {
            // get participant groups with @schoolId
            if (participantGroups[index].school && parseInt(participantGroups[index].school.id) !== parseInt(schoolId)) continue
            prepared.push({id: participantGroups[index].id, label: participantGroups[index].title})
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
            prepared.push({id: leadersConfirmed[index].id, label: leadersConfirmed[index].firstName + ' ' + leadersConfirmed[index].lastName})
          }
          return prepared
        }
      },
      leadersReplaceTreeselect () {
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
            if ((this.lesson.leader.id && this.lesson.leader.id === leadersConfirmed[index].id) ||
              undefined !== this.lesson.replacementLeaders.find(x => {
                return x.leader.id === leadersConfirmed[index].id
            })) {
              prepared.push({
                id: leadersConfirmed[index].id,
                label: leadersConfirmed[index].firstName + ' ' + leadersConfirmed[index].lastName,
                isDisabled: true
              })
            } else {
              prepared.push({id: leadersConfirmed[index].id, label: leadersConfirmed[index].firstName + ' ' + leadersConfirmed[index].lastName})
            }
          }
          return prepared
        }
      }
    },
    methods: {
      // submitCycleRemove () {
      //   console.log(111)
      // },
      // showCycleRemoveModal () {
      //   this.$refs.cycleRemove.show()
      // },
      // hideCycleRemoveModal () {
      //   this.$refs.cycleRemove.hide()
      // },
      getRepetitionDate (repetition) {
        let selectedDate = new Date(this.lesson.date)
        let newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + (7 * repetition))
        return newDate.getFullYear() + '-' +
          ((newDate.getMonth() + 1) < 10 ? ('0' + (newDate.getMonth() + 1)) : (newDate.getMonth() + 1)) +
          '-' + ((newDate.getDate()) < 10 ? ('0' + (newDate.getDate())) : (newDate.getDate()))
      },
      removeReplacedLeader (index) {
        this.lesson.replacementLeaders.splice(index, 1)
      },
      addReplacedLeader () {
        this.lesson.replacementLeaders.push({
          lesson: {
            id: this.id
          },
          active: true,
          leader: {
            id: null
          }
        })
      },
      submit (tabToRedirect) {
        if (this.authUser.role === 1 && !this.$store.getters.isDirector) {
          this.lesson.leader.id = this.authUser.id
        }
        this.$validator.validateScopes()
          .then((result) => {
            if (result === false) return
            this.$parent.submit()
          })
      },
      activateLesson () {
        this.lesson.active = true
        this.submit()
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
      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})

      const filters = {}
      if (!this.$store.getters.isAdmin) filters['forMe'] = true
      this.$store.dispatch('getSchools', filters)
      this.$store.dispatch('getLeaders', {confirmed: 1, forLesson: true})
      this.$store.dispatch('getSportObjects', {confirmed: 1})
      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getParticipantGroups')
      this.$store.dispatch('getLessonCategories')
      this.$store.dispatch('getClasses')
    // this.$store.dispatch('getLessons')
    }
  }
</script>

<style scoped>

</style>
