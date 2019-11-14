<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="5" class="">

      <!--      RADIO-->
      <h2 class="mb-4">Aktywuj</h2>
      <b-row class="justify-content-start align-items-center">
        <b-col cols="6">
          <b-form-group>
            <b-form-radio v-model="participantGroup.active" :value="element.value" class="d-inline-block mr-3 mb-3"
                          :class="{'error-input-custom': veeErrors.has('participant.active')}"
                          name="participantGroup.active" :key="'participant.active'+index" v-validate="'required'"
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
                          :class="{'error-input-custom': veeErrors.has('participant.title')}"
                          name="participant.title" key="participant.title" v-validate="'required'"
                          v-model="participantGroup.title"></b-form-input>
          </b-form-group>
          <!--          TREESELECT  -->
          <treeselect class="custom"
                      v-model="participantGroup.selectedDiscipline"
                      :multiple="true"
                      placeholder="Dyscyplina"
                      :options="participantGroup.disciplines"></treeselect>
          <treeselect class="custom"
                      v-model="participantGroup.selectedCategory"
                      :multiple="true"
                      placeholder="Kategoria"
                      :options="participantGroup.categories"></treeselect>
          <treeselect class="custom"
                      v-model="participantGroup.selectedClass"
                      :multiple="true"
                      placeholder="Klasa sportowa"
                      :options="participantGroup.classes"></treeselect>
          <!--          BUTTONS -->
          <b-row class="justify-content-center">
              <b-btn variant="delete" class="custom">
                <b-link block class="custom" :to="{ name: 'participant.groups', params: { 'tab': 'confirmed' } }">
                  Anuluj
                </b-link>
              </b-btn>
            <b-col>
              <b-btn block class="custom" @click="goToFormTab('participants')">
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
  }
}
</script>

<style scoped>

</style>
