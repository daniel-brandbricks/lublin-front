<template>
  <b-row class="justify-content-center" v-if="lesson">
    <b-col cols="6">
      <!--     todo breadcrumbs -->
      <h5>Aktywuj</h5>
      {{lesson}}
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
        <treeselect class="custom m-0"
                    v-model="lesson.leaders"
                    :multiple="true"
                    placeholder="Prowadzący" :options="lessonLeader"
                    :class="{'error-input-custom': veeErrors.has('lesson.leaders')}"
                    name="lesson.leaders" key="lesson.leaders" v-validate="{'required':true}"/>
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
                  class="custom"
                  :class="{'error-input-custom': veeErrors.has('lesson.school')}"
                  name="lesson.school" key="lesson.school" v-validate="{'required':true}"/>
      <!--      buttons   -->
      <b-row class="mt-4">
        <b-col>
          <b-btn block class="custom btn" :to="{ name: 'lessons' }">
            Anuluj
          </b-btn>
        </b-col>
        <b-col>
          <b-btn variant="primary" block class="custom" @click="goToFormTab('objects')">
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
  import LessonMixin from '@/mixins/lesson-mixin'
  import {mapGetters} from 'vuex'

  export default {
    name: 'FormMainData',
    props: ['lesson'],
    components: {Treeselect},
    mixins: [EventBusEmit, FormMixin, LessonMixin],
    data () {
      return {
        orgType: 0
      }
    },
    computed: {
      ...mapGetters(['schools', 'disciplines', 'leadersConfirmed', 'classes', 'lessonCategories'])
    },
    methods: {
      submit (tabToRedirect) {
        let lesson = this.lesson
        delete lesson.sportObjects
        delete lesson.participantGroups
        delete lesson.lessonSchools

        this.$parent.submit(lesson, tabToRedirect)
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
      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getLessonCategories')
      this.$store.dispatch('getClasses')
      // this.$store.dispatch('getLessons')
    }
  }
</script>

<style scoped>

</style>
