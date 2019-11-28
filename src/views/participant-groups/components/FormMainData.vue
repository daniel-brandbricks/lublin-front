<template>
  <!--  <b-row class="justify-content-center" v-if="participantGroup">-->
  <b-row class="justify-content-center">
    <b-col cols="12" lg="5" class="">

      <!--      RADIO-->
      <h2 class="mb-4">Aktywuj</h2>
      <b-row class="justify-content-start align-items-center">
        <b-col cols="12">
          <template slot="status" slot-scope="scope">
            <span class="status"
                  :class="{'active': scope.item.active}">{{scope.item.active == 1 ? 'tak' : 'nie'}}</span>
          </template>
          <b-form-group>
            <b-form-radio v-model="participantGroup.active" :value="element.value" class="d-inline-block mr-3 mb-3"
                          :class="{'error-input-custom': veeErrors.has('participantGroup.active')}"
                          name="participantGroup.active" :key="'participantGroup.active'+index"
                          v-validate="{'required':true}"
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
                          name="participantGroup.title" key="participantGroup.title" v-validate="{'required':true}"
                          v-model="participantGroup.title"></b-form-input>
          </b-form-group>
          <!--          TREESELECT  -->
          <treeselect v-model="participantGroup.discipline.id" v-if="participantGroup.discipline"
                      :multiple="false" class="custom mb-3"
                      placeholder="Dyscyplina" :options="participantGroupDiscipline"
                      :class="{'error-input-custom': veeErrors.has('participantGroup.discipline')}"
                      name="participantGroup.discipline" key="participantGroup.discipline"
                      v-validate="{'required':true}"
          />
          <treeselect v-model="participantGroup.lessonCategory.id" v-if="participantGroup.lessonCategory"
                      :multiple="false" class="custom mb-3"
                      placeholder="Kategoria" :options="participantGroupLessonCategory"
                      :class="{'error-input-custom': veeErrors.has('participantGroup.lessonCategory')}"
                      name="participantGroup.lessonCategory" key="participantGroup.lessonCategory"
                      v-validate="{'required':true}"
          />
          <treeselect v-model="participantGroup.class.id" v-if="participantGroup.class"
                      :multiple="false" class="custom mb-3"
                      placeholder="Klasa" :options="participantGroupClass"
                      :class="{'error-input-custom': veeErrors.has('participantGroup.class')}"
                      name="participantGroup.class" key="participantGroup.class" v-validate="{'required':true}"
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
  import ParticipantGroupMixin from '@/mixins/participant-group-mixin'

  export default {
    name: 'FormMainData',
    props: [ 'participantGroup' ],
    components: { Treeselect },
    mixins: [ EventBusEmit, FormMixin, ParticipantGroupMixin ],
    data () {
      return {}
    },
    computed: {},
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
      this.$store.dispatch('getClasses')
    }
  }
</script>

<style scoped>

</style>
