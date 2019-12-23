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

      <h5  class="mb-3">Płeć</h5>
      <b-form-radio v-model="lesson.sex" :value="element.value" class="d-inline-block mr-3 mb-3"
                    :class="{'error-input-custom': veeErrors.has('lesson.sex')}"
                    name="lesson.sex" :key="'lesson.sex'+index" v-validate="{'required':true}"
                    v-for="(element, index) in [{title:'mężczyzna', value: true}, {title: 'kobieta', value: false}]">
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
<!--      todo leader treeselect-->
<!--      <h2>LEADERS TREESELECT </h2>-->
      <b-form-group class="custom mb-2">
        <treeselect class="custom m-0" v-if="lesson.leader"
                    v-model="lesson.leader.id"
                    :multiple="false"
                    placeholder="Prowadzący"
                    :options="lessonLeader"
                    :class="{'error-input-custom': veeErrors.has('lesson.leader')}"
                    name="lesson.leader" key="lesson.leader" v-validate="{'required':true}"/>
      </b-form-group>
      <b-form-group  class="custom mb-2">
        <treeselect class="custom m-0" v-if="lesson.discipline"
                    v-model="lesson.discipline.id"
                    :multiple="false"
                    placeholder="Dyscyplina" :options="lessonDiscipline"
                    :class="{'error-input-custom': veeErrors.has('lesson.discipline')}"
                    name="lesson.discipline" key="lesson.discipline" v-validate="{'required':true}"/>
      </b-form-group>
      <b-form-group  class="custom mb-2">
        <treeselect class="custom m-0" v-if="lesson.lessonCategory"
                    v-model="lesson.lessonCategory.id"
                    :multiple="false"
                    placeholder="Kategoria" :options="lessonOfLessonCategory"
                    :class="{'error-input-custom': veeErrors.has('lesson.lessonCategory')}"
                    name="lesson.lessonCategory" key="lesson.lessonCategory" v-validate="{'required':true}"/>
      </b-form-group>
      <b-form-group  class="custom mb-4">
        <treeselect class="custom m-0" v-if="lesson.class"
                    v-model="lesson.class.id"
                    :multiple="false"
                    placeholder="Klasa" :options="lessonClass"
                    :class="{'error-input-custom': veeErrors.has('lesson.class')}"
                    name="lesson.class" key="lesson.class" v-validate="{'required':true}"/>
      </b-form-group>
      <h5>Organizator</h5>
      <b-form-group>
        <b-form-radio v-model="lesson.schoolOrClub" :value="element.value" class="d-inline-block my-3 mr-3"
                      :class="{'error-input-custom': veeErrors.has('lesson.schoolOrClub')}"
                      name="lesson.schoolOrClub" :key="'lesson.schoolOrClub'+index" v-validate="{'required':true}"
                      v-for="(element,index) in [{title: 'Klub', value: 1}, {title: 'Szkoły', value: 0}]">
          {{ element.title }}
        </b-form-radio>
      </b-form-group>
<!--      todo treeselect kluby/szkoly-->
<!--      <treeselect class="custom m-0" v-if="lesson.schoolOrClub"-->
<!--                  v-model="lesson.schoolOrClub.id"-->
<!--                  :multiple="false"-->
<!--                  placeholder="Nazwa klubu/szkoły" :options="lessonSchoolOrClub"-->
<!--                  :class="{'error-input-custom': veeErrors.has('lesson.schoolOrClub')}"-->
<!--                  name="lesson.schoolOrClub" key="lesson.schoolOrClub" v-validate="{'required':true}"/>-->
      <treeselect v-model="lesson.schools"
                  :multiple="true"
                  :searchable="false"
                  placeholder="Klub / Szkoła"
                  :options="schoolsAndClubsPrepared"
                  class="custom"/>
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

  export default {
    name: 'FormMainData',
    props: [ 'lesson' ],
    components: { Treeselect },
    mixins: [ EventBusEmit, FormMixin, LessonMixin ],
    data () {
      return {
        lessons: [],
        lessonDefault: {
          active: '',
          sex: '',
          title: '',
          // leaders: [],
          disciplines: [],
          lessonCategories: [],
          classes: [],
          //  todo check this radio
          schoolOrClub: 0
        },

        isValidForm: false
      }
    },
    computed: {
      schools () {
        return this.$store.getters.schools
      },
      leaders () {
        return this.$store.getters.leaders
      },
      disciplines () {
        return this.$store.getters.disciplines
      },
      lessonCategories () {
        return this.$store.getters.lessonCategories
      }
    },
    methods: {
      submit (validRequired = false) {
        if (validRequired) {
          this.preSubmit()
            .then((result) => {
              if (!result) {
                this.loading = false
                return
              }

              this.loading = false
              this.$parent.submit()
            })
        } else {
          this.$parent.submit()
        }
      },
      goToFormTab (tabName) {
        this.$parent.goToFormTab(tabName)
      }
    },
    mounted () {
      if (this.$route.params.validateForm) {
        this.checkValidForm()
      }
    },
    created () {
      this.$store.dispatch('getLessons')
      this.$store.dispatch('getLeaders', {confirmed: 0})
      this.$store.dispatch('getLeaders', {confirmed: 1})
      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getLessonCategories')
      this.$store.dispatch('getClasses')
      this.$store.dispatch('getSchools', {confirmed: 0})
      this.$store.dispatch('getSchools', {confirmed: 1})
    }
  }
</script>

<style scoped>

</style>
