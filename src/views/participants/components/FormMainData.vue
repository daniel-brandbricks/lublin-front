<template>
  <b-row class="justify-content-center" v-if="participant">
    <b-col cols="6">
      <h5>Aktywuj</h5>
      <b-form-group>
        <b-form-radio v-model="participant.active" :value="element.value" class="d-inline-block my-3 mr-3"
                      :class="{'error-input-custom': veeErrors.has('participant.active')}"
                      name="participant.active" :key="'participant.active'+index" v-validate="{'required':true}"
                      v-for="(element,index) in [{title: 'Tak', value: 1}, {title: 'Nie', value: 0}]">
          {{ element.title }}
        </b-form-radio>
      </b-form-group>

      <!--            todo CHECKBOX  OR RADIO -->
      <h2 class="mb-4">Płeć</h2>
      <b-form-radio v-model="participant.sex" :value="element.value" class="d-inline-block mr-3 mb-3"
                    :class="{'error-input-custom': veeErrors.has('participant.sex')}"
                    name="participant.sex" :key="'participant.sex'+index" v-validate="{'required':true}"
                    v-for="(element, index) in [{title:'mężczyzna', value: 1}, {title: 'kobieta', value: 0}]">
        {{element.title}}
      </b-form-radio>

      <h5 class="mb-3">Dane ogólne</h5>
      <b-form-group class="custom mb-2">
        <b-form-input id="name-1" class="custom m-0"
                      placeholder="Imię"
                      :class="{'error-input-custom': veeErrors.has('participant.firstName')}"
                      name="participant.firstName" key="participant.firstName" v-validate="{'required':true}"
                      v-model="participant.firstName"/>
      </b-form-group>
      <b-form-group class="custom mb-2">
        <b-form-input id="surname-1" class="custom m-0"
                      placeholder="Nazwisko"
                      :class="{'error-input-custom': veeErrors.has('participant.lastName')}"
                      name="participant.lastName" key="participant.lastName" v-validate="{'required':true}"
                      v-model="participant.lastName"/>
      </b-form-group>
      <b-form-group class="custom mb-2">
        <treeselect v-model="participant.year"
                    :multiple="false"
                    placeholder="Rocznik"
                    :options="years"
                    :class="{'error-input-custom': veeErrors.has('participant.year')}"
                    name="participant.year" key="participant.year" v-validate="{'required':true}"
                    class="custom mb-3"/>
      </b-form-group>

      <h5 class="my-3">Dyscipliny</h5>
      <div class="row" v-if="participant.disciplines"
           v-for="(discipline,index) in participant.disciplines" :key="index">
        <div class="col-2">
          <div class="text-center _custom-css">
            <p class="m-auto">{{index + 1}}</p>
          </div>
          <p @click="removeDiscipline(index)" v-if="participant.disciplines.length > 0 && participant.class.length > 0">usuń</p>
        </div>
        <div class="col-10">
          <treeselect class="custom mb-2" v-if="participant.disciplines[index]"
                      v-model="participant.disciplines[index].id"
                      :multiple="false"
                      :class="{'error-input-custom': veeErrors.has('participant.discipline'+index)}"
                      :name="'participant.discipline'+index" :key="'participant.discipline'+index" v-validate="{'required':true}"
                      placeholder="Dyscyplina"
                      :options="disciplinesTreeselect"/>
          <treeselect class="custom mb-2" v-if="participant.class[index]"
                      v-model="participant.class[index].id"
                      :multiple="false"
                      placeholder="Klasa"
                      :class="{'error-input-custom': veeErrors.has('participant.class')}"
                      name="'participant.class'+index" :key="'participant.class'+index" v-validate="{'required':true}"
                      :options="classTreeselect"
          />

        </div>
      </div>
      <div class="row mb-3">
        <div class="col-2">
          <div class="text-center _custom-css">
            <p class="m-auto">{{participant.disciplines.length + 1 && participant.class.length + 1}}</p>
          </div>
        </div>
        <div class="col-10">
          <b-btn @click="addDisciplineAndClass" variant="primary" block class="w-50">+ Dodaj</b-btn>
        </div>
      </div>

      <!--buttons-->
      <b-row class="mt-4">
        <b-col>
          <b-btn block class="custom btn" :to="{ name: 'participants' }">
            Anuluj
          </b-btn>
        </b-col>
        <b-col>
          <b-btn block variant="primary" class="custom" @click="submit(1, true)">
            Dodaj
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
  import ParticipantMixin from '@/mixins/participant-mixin'

  export default {
    name: 'FormMainData',
    props: [ 'participant', 'years' ],
    components: { Treeselect },
    mixins: [ EventBusEmit, FormMixin, ParticipantMixin ],
    data () {
      return {
        participants: [],
        participantDefault: {
          active: 1,
          firstName: '',
          lastName: '',
          sex: '',

          years: []
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
      classTreeselect () {
        let classes = this.classes
        let prepared = []

        for (let classIndex in classes) {
          prepared.push({id: classes[classIndex].id, label: classes[classIndex].title})
        }

        return prepared
      },
      disciplinesTreeselect () {
        let disciplines = this.disciplines
        let prepared = []

        for (let disciplineIndex in disciplines) {
          prepared.push({id: disciplines[disciplineIndex].id, label: disciplines[disciplineIndex].title})
        }

        return prepared
      }
    },
    methods: {
      addDisciplineAndClass () {
        this.$parent.addDisciplineAndClass()
      },
      removeDiscipline (index) {
        this.$parent.removeDiscipline(index)
      },
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
      }
    },
    mounted () {
      // validate form after redirect from another tab (component)
      if (this.$route.params.validateForm) {
        this.checkValidForm()
      }
    },
    created () {
      this.$store.dispatch('getParticipants')
      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getClasses')
    }
  }
</script>

<style scoped>
   ._custom-css {
     border-radius: 50%;
     box-sizing: border-box;
     height: 36px;
     width: 36px;
     border: 2px solid #D8D8D8;
   }
</style>
