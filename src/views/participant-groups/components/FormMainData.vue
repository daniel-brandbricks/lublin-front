<!--<template>-->
<!--  &lt;!&ndash;  <b-row class="justify-content-center" v-if="participantGroup">&ndash;&gt;-->
<!--  <b-row class="justify-content-center" v-if="participantGroup">-->
<!--    <b-col cols="12" lg="5" class="">-->
<!--      &lt;!&ndash;      RADIO&ndash;&gt;-->
<!--      <h5 class="mb-4">Aktywuj</h5>-->
<!--      <b-form-group>-->
<!--        <b-form-radio v-model="participantGroup.active" :value="element.value" class="d-inline-block my-3 mr-3"-->
<!--                      :class="{'error-input-custom': veeErrors.has('participantGroup.active')}"-->
<!--                      name="participantGroup.active" :key="'participantGroup.active'+index" v-validate="{'required':true}"-->
<!--                      v-for="(element,index) in [{title: 'Tak', value: 1}, {title: 'Nie', value: 0}]">-->
<!--          {{ element.title }}-->
<!--        </b-form-radio>-->
<!--      </b-form-group>-->

<!--            <h2 class="mb-4">Płeć</h2>-->
<!--      <b-form-radio v-model="participantGroup.sex" :value="element.value" class="d-inline-block mr-3 mb-3"-->
<!--                    :class="{'error-input-custom': veeErrors.has('participantGroup.sex')}"-->
<!--                    name="participantGroup.sex" :key="'participantGroup.sex'+index" v-validate="{'required':true}"-->
<!--                    v-for="(element, index) in [{title:'mężczyzna', value: 1}, {title: 'kobieta', value: 0}]">-->
<!--        {{element.title}}-->
<!--      </b-form-radio>-->
<!--          &lt;!&ndash;          INPUT FORM&ndash;&gt;-->
<!--          <h2 class="mb-3">Dane ogólne</h2>-->
<!--          <b-form-group class="custom mb-2">-->
<!--            <b-form-input id="title-1" class="custom m-0"-->
<!--                          placeholder="Nazwa listy"-->
<!--                          :class="{'error-input-custom': veeErrors.has('participantGroup.title')}"-->
<!--                          name="participantGroup.title" key="participantGroup.title" v-validate="{'required':true}"-->
<!--                          v-model="participantGroup.title"/>-->
<!--          </b-form-group>-->

<!--      <b-form-group class="custom mb-2">-->

<!--&lt;!&ndash;       todo maybe from mixin   &ndash;&gt;-->

<!--      <treeselect class="custom mb-3" v-if="participantGroup.disciplines"-->
<!--                  v-model="participantGroup.disciplines.id"-->
<!--                  :multiple="false"-->
<!--                      placeholder="Dyscyplina" :options="participantGroupDiscipline"-->
<!--                      :class="{'error-input-custom': veeErrors.has('participantGroup.disciplines')}"-->
<!--                      name="participantGroup.disciplines" key="participantGroup.disciplines"-->
<!--                      v-validate="{'required':true}"-->
<!--          />-->
<!--          <treeselect class="custom mb-3" v-if="participantGroup.lessonCategories"-->
<!--                      v-model="participantGroup.lessonCategories.id"-->
<!--                      :multiple="false"-->
<!--                      placeholder="Kategoria" :options="participantGroupLessonCategory"-->
<!--                      :class="{'error-input-custom': veeErrors.has('participantGroup.lessonCategories')}"-->
<!--                      name="participantGroup.lessonCategories" key="participantGroup.lessonCategories"-->
<!--                      v-validate="{'required':true}"-->
<!--          />-->
<!--          <treeselect class="custom mb-3" v-if="participantGroup.classes"-->
<!--                      v-model="participantGroup.classes.id"-->
<!--                      :multiple="false"-->
<!--                      placeholder="Klasa" :options="participantGroupClass"-->
<!--                      :class="{'error-input-custom': veeErrors.has('participantGroup.classes')}"-->
<!--                      name="participantGroup.classes" key="participantGroup.classes" v-validate="{'required':true}"-->
<!--          />-->
<!--      </b-form-group>-->

<!--      &lt;!&ndash;          BUTTONS &ndash;&gt;-->
<!--          <b-row class="justify-content-center">-->
<!--            <b-link block class="custom btn" :to="{ name: 'participant.groups' }">-->
<!--              Anuluj-->
<!--            </b-link>-->
<!--            <b-col>-->
<!--              <b-btn variant="primary" block class="custom" @click="goToFormTab('participants')">-->
<!--                Dalej-->
<!--              </b-btn>-->
<!--            </b-col>-->
<!--          </b-row>-->
<!--        </b-col>-->
<!--  </b-row>-->
<!--</template>-->
<template>
  <b-row class="justify-content-center" v-if="participantGroup">
    <b-col cols="6">
      <h5>Aktywuj</h5>
      <b-form-group>
        <b-form-radio v-model="participantGroup.active" :value="element.value" class="d-inline-block my-3 mr-3"
                      :class="{'error-input-custom': veeErrors.has('participantGroup.active')}"
                      name="participantGroup.active" :key="'participantGroup.active'+index" v-validate="{'required':true}"
                      v-for="(element,index) in [{title: 'Tak', value: 1}, {title: 'Nie', value: 0}]">
          {{ element.title }}
        </b-form-radio>
      </b-form-group>

      <h2 class="mb-4">Płeć</h2>
      <b-form-radio v-model="participantGroup.sex" :value="element.value" class="d-inline-block mr-3 mb-3"
                    :class="{'error-input-custom': veeErrors.has('participantGroup.sex')}"
                    name="participantGroup.sex" :key="'participantGroup.sex'+index" v-validate="{'required':true}"
                    v-for="(element, index) in [{title:'mężczyzna', value: 1}, {title: 'kobieta', value: 0}]">
        {{element.title}}
      </b-form-radio>

      <h5 class="mb-3">Dane ogólne</h5>
      <b-form-group class="custom mb-2">
        <b-form-input id="title-1" class="custom m-0"
                      placeholder="Nazwa listy"
                      :class="{'error-input-custom': veeErrors.has('participantGroup.title')}"
                      name="participantGroup.title" key="participantGroup.title" v-validate="{'required':true}"
                      v-model="participantGroup.title"/>
      </b-form-group>
      <b-form-group  class="custom mb-2">
        <treeselect class="custom m-0" v-if="participantGroup.discipline"
                    v-model="participantGroup.discipline.id"
                    :multiple="false"
                    placeholder="Dyscyplina" :options="participantGroupDiscipline"
                    :class="{'error-input-custom': veeErrors.has('participantGroup.discipline')}"
                    name="participantGroup.discipline" key="participantGroup.discipline" v-validate="{'required':true}"/>
      </b-form-group>
      <b-form-group  class="custom mb-2">
        <treeselect class="custom m-0" v-if="participantGroup.lessonCategory"
                    v-model="participantGroup.lessonCategory.id"
                    :multiple="false"
                    placeholder="Kategoria" :options="participantGroupLessonCategory"
                    :class="{'error-input-custom': veeErrors.has('participantGroup.lessonCategory')}"
                    name="participantGroup.lessonCategory" key="participantGroup.lessonCategory" v-validate="{'required':true}"/>
      </b-form-group>
      <b-form-group  class="custom mb-2">
        <treeselect class="custom m-0" v-if="participantGroup.class"
                    v-model="participantGroup.class.id"
                    :multiple="false"
                    placeholder="Klasa" :options="participantGroupClass"
                    :class="{'error-input-custom': veeErrors.has('participantGroup.class')}"
                    name="participantGroup.class" key="participantGroup.class" v-validate="{'required':true}"/>
      </b-form-group>

      <b-row class="mt-4">
        <b-col>
          <b-btn block class="custom btn" :to="{ name: 'participant.groups' }">
            Anuluj
          </b-btn>
        </b-col>
        <b-col>
          <b-btn variant="primary" block class="custom" @click="goToFormTab('participants')">
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
  import ParticipantGroupMixin from '@/mixins/participant-group-mixin'

  export default {
    name: 'FormMainData',
    props: [ 'participantGroup' ],
    components: { Treeselect },
    mixins: [ EventBusEmit, FormMixin, ParticipantGroupMixin ],
    data () {
      return {
        participants: [],
        participantGroupDefault: {
          active: 1,
          sex: '',
          title: '',
          disciplines: [],
          categories: [],
          classes: []
        },

        isValidForm: false
      }
    },
    computed: {
      disciplines () {
        return this.$store.getters.disciplines
      },
      classes () {
        return this.$store.getters.classes
      },
      lessonCategories () {
        return this.$store.getters.lessonCategories
      }
      // disciplinesTreeselect () {
      //   let disciplines = this.disciplines
      //   let prepared = []
      //
      //   for (let disciplineIndex in disciplines) {
      //     prepared.push({id: disciplines[disciplineIndex].id, label: disciplines[disciplineIndex].title})
      //   }
      //
      //   return prepared
      // },
      // lessonCategoriesTreeselect () {
      //   let lessonCategories = this.lessonCategories
      //   let prepared = []
      //
      //   for (let lessonCategoryIndex in lessonCategories) {
      //     prepared.push({id: lessonCategories[lessonCategoryIndex].id, label: lessonCategories[lessonCategoryIndex].title})
      //   }
      //
      //   return prepared
      // },
      // classesTreeselect () {
      //   let classes = this.classes
      //   let prepared = []
      //
      //   for (let classIndex in classes) {
      //     prepared.push({id: classes[classIndex].id, label: classes[classIndex].title})
      //   }
      //
      //   return prepared
      // }
    },
    methods: {
      submit (validRequired) {
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
      },
      mounted () {
        if (this.$route.params.validateForm) {
          this.checkValidForm()
        }
      }
    },
    created () {
      this.$store.dispatch('getParticipantGroups')
      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getLessonCategories')
      this.$store.dispatch('getClasses')
    }
  }
</script>

<style scoped>

</style>
