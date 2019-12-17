<template>
  <b-row class="justify-content-center" v-if="participantGroup">
    <b-col cols="6">
      <h5>Aktywuj</h5>
      {{participantGroup}}
      <b-form-group>
        <b-form-radio v-model="participantGroup.active" :value="element.value" class="d-inline-block my-3 mr-3"
                      :class="{'error-input-custom': veeErrors.has('participantGroup.active')}"
                      name="participantGroup.active" :key="'participantGroup.active'+index" v-validate="{'required':true}"
                      v-for="(element,index) in [{title: 'Tak', value: true}, {title: 'Nie', value: false}]">
          {{ element.title }}
        </b-form-radio>
      </b-form-group>

      <h2 class="mb-4">Płeć</h2>
<!--      todo maybe checkbox like in invisionapp-->
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
        <treeselect class="custom m-0"
                    v-model="participantGroup.discipline.id"
                    :multiple="false"
                    placeholder="Dyscyplina" :options="participantGroupDiscipline"
                    :class="{'error-input-custom': veeErrors.has('participantGroup.discipline')}"
                    name="participantGroup.discipline" key="participantGroup.discipline" v-validate="{'required':true}"/>
      </b-form-group>
      <b-form-group  class="custom mb-2">
        <treeselect class="custom m-0"
                    v-model="participantGroup.lessonCategory.id"
                    :multiple="false"
                    placeholder="Kategoria" :options="participantGroupLessonCategory"
                    :class="{'error-input-custom': veeErrors.has('participantGroup.lessonCategory')}"
                    name="participantGroup.lessonCategory" key="participantGroup.lessonCategory" v-validate="{'required':true}"/>
      </b-form-group>
      <b-form-group  class="custom mb-2">
        <treeselect class="custom m-0"
                    v-model="participantGroup.class.id"
                    :multiple="false"
                    placeholder="Klasa" :options="participantGroupClass"
                    :class="{'error-input-custom': veeErrors.has('participantGroup.class')}"
                    name="participantGroup.class" key="participantGroup.class" v-validate="{'required':true}"/>
      </b-form-group>

      <b-row class="mt-4 justify-content-end">
        <b-col cols="5">
          <b-btn block class="custom btn" :to="{ name: 'participant.groups' }">
            Anuluj
          </b-btn>
        </b-col>
        <b-col cols="5">
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
      console.log(11)
      this.$store.dispatch('getParticipantGroups')
      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getLessonCategories')
      this.$store.dispatch('getClasses')
    }
  }
</script>

<style scoped>

</style>
