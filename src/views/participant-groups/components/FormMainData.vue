<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="5" class="">

      <!--      RADIO-->
      <h2 class="mb-4">Aktywuj</h2>
      <b-row class="justify-content-start align-items-center">
        <b-col cols="12">
          <b-form-group>
            <b-form-radio v-model="participantGroup.active" :value="element.value" class="d-inline-block mr-3 mb-3"
                          :class="{'error-input-custom': veeErrors.has('participantGroup.active')}"
                          name="participantGroup.active" :key="'participantGroup.active'+index" v-validate="'required'"
                          v-for="(element,index) in [{title: 'Tak', value: 1}, {title: 'Nie', value: 0}]">
              {{ element.title }}
            </b-form-radio>

            <!--            CHECKBOX-->
            <h2 class="mb-4">Płeć</h2>
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="participantGroup.selectedGender"
              :options="participantGroup.genderOptions"
              name="flavour-1"
            ></b-form-checkbox-group>
          </b-form-group>
          <!--          INPUT FORM-->
          <h2 class="mb-4">Dane ogólne</h2>
          <b-form-group class="custom">
            <b-form-input id="input-1" class="custom"
                          placeholder="Nazwa listy"
                          :class="{'error-input-custom': veeErrors.has('participantGroup.title')}"
                          name="participantGroup.title" key="participantGroup.title" v-validate="'required'"
                          v-model="participantGroup.title"></b-form-input>
          </b-form-group>
          <!--          TREESELECT  -->
            <treeselect v-model="participantGroup.discipline.id" v-if="participantGroup.discipline"
                        :multiple="false" class="custom mb-3"
                        placeholder="Dyscyplina" :options="participantGroupDiscipline"
                        :class="{'error-input-custom': veeErrors.has('participantGroup.discipline')}"
                        name="participantGroup.discipline" key="participantGroup.discipline" v-validate="'required'"
                        />
          <treeselect v-model="participantGroup.lessonCategory.id" v-if="participantGroup.lessonCategory"
                        :multiple="false" class="custom mb-3"
                        placeholder="Kategoria" :options="participantGroupLessonCategory"
                        :class="{'error-input-custom': veeErrors.has('participantGroup.lessonCategory')}"
                        name="participantGroup.lessonCategory" key="participantGroup.lessonCategory" v-validate="'required'"
                        />
          <treeselect v-model="participantGroup.class.id" v-if="participantGroup.class"
                        :multiple="false" class="custom mb-3"
                        placeholder="Klasa" :options="participantGroupClass"
                        :class="{'error-input-custom': veeErrors.has('participantGroup.class')}"
                        name="participantGroup.class" key="participantGroup.class" v-validate="'required'"
                        />

          <!--          BUTTONS -->
          <b-row class="justify-content-center">
                <b-link block class="custom btn" :to="{ name: 'participant.groups' }">
                  Anuluj
                </b-link>
            <b-col>
              <b-btn variant="primary" block class="custom" @click="goToFormTab('participants')">
                Dalej
              </b-btn>
            </b-col>
          </b-row>
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

export default {
  name: 'FormMainData',
  props: ['participantGroup'],
  components: {Treeselect},
  mixins: [EventBusEmit, FormMixin],
  data () {
    return {}
  },
  computed: {
    participantGroupDiscipline () {
      // eslint-disable-next-line one-var
      let data = this.$store.getters.disciplines,
        preparedDisciplines = []
      for (let disciplineIndex in data) {
        preparedDisciplines.push({id: data[disciplineIndex].id, label: data[disciplineIndex].title})
      }

      return preparedDisciplines
    },
    participantGroupLessonCategory () {
      // eslint-disable-next-line one-var
      let data = this.$store.getters.lessonCategories,
        preparedLessonCategories = []

      for (let lessonCategoryIndex in data) {
        preparedLessonCategories.push({id: data[lessonCategoryIndex].id, label: data[lessonCategoryIndex].title})
      }

      return preparedLessonCategories
    },
    participantGroupClass () {
      // eslint-disable-next-line one-var
      let data = this.$store.getters.classes,
        preparedClasses = []

      for (let classIndex in data) {
        preparedClasses.push({id: data[classIndex].id, label: data[classIndex].title})
      }

      return preparedClasses
    }
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
    this.$store.dispatch('getDisciplines')
    this.$store.dispatch('getLessonCategories')
    // todo
    // this.$store.dispatch('getClasses')
  }
}
</script>

<style scoped>

</style>
