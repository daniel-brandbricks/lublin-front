<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="5" class="">

      <!--      RADIO 104.7 kiss fm-->
      <h2 class="mb-4">Aktywuj</h2>
      <b-row class="justify-content-start align-items-center" v-if="participant">
        <b-col cols="12">
<!--          <template slot="status" slot-scope="scope">-->
<!--            <span class="status"-->
<!--                  :class="{'active': scope.item.active}">{{scope.item.active == 1 ? 'tak' : 'nie'}}</span>-->
<!--          </template>-->
          <b-form-group>
            <b-form-radio v-model="participant.active" :value="element.value" class="d-inline-block mr-3 mb-3"
                          :class="{'error-input-custom': veeErrors.has('participantGroup.active')}"
                          name="participant.active" :key="'participant.active'+index" v-validate="{'required':true}"
                          v-for="(element, index) in [{title:'Tak', value: 1}, {title: 'Nie', value: 0}]">
              {{element.title}}
            </b-form-radio>

            <!--            todo CHECKBOX  OR RADIO -->
            <h2 class="mb-4">Płeć</h2>
            <b-form-radio v-model="participant.sex" :value="element.value" class="d-inline-block mr-3 mb-3"
                          :class="{'error-input-custom': veeErrors.has('participant.sex')}"
                          name="participant.sex" :key="'participant.sex'+index" v-validate="{'required':true}"
                          v-for="(element, index) in [{title:'mężczyzna', value: 1}, {title: 'kobieta', value: 0}]">
              {{element.title}}
            </b-form-radio>
<!--            <b-form-checkbox-group-->
<!--              id="checkbox-group-1"-->
<!--              v-model="participant.selectedGender"-->
<!--              :options="participant.genderOptions"-->
<!--              name="flavour-1"-->
<!--            ></b-form-checkbox-group>-->
          </b-form-group>
          <!--          INPUT-->
          <h2 class="mb-4">Dane ogólne</h2>
          <b-form-group class="custom">
            <b-form-input id="input-1" class="custom"
                          placeholder="Imię"
                          :class="{'error-input-custom': veeErrors.has('participant.firstName')}"
                          name="participant.firstName" key="participant.firstName" v-validate="{'required':true}"
                          v-model="participant.firstName"/>
          </b-form-group>
          <b-form-group class="custom">
            <b-form-input id="input-1" class="custom"
                          placeholder="Nazwisko"
                          :class="{'error-input-custom': veeErrors.has('participant.lastName')}"
                          name="participant.lastName" key="participant.lastName" v-validate="{'required':true}"
                          v-model="participant.lastName"/>
          </b-form-group>
          <!--          todo computed in mixin-->
          <treeselect v-model="participant.years.id" v-if="participant.years"
                      :multiple="false" class="custom mb-3"
                      placeholder="Rocznik" :options="participantYears"
                      :class="{'error-input-custom': veeErrors.has('participant.years')}"
                      name="participant.years" key="participant.years" v-validate="{'required':true}"
          />

          <!--          DISCIPLINES     -->
          <b-row>
            <b-col cols="12">
              <h2 class="mb-4">Dyscypliny</h2>
            </b-col>
          </b-row>
          <div class="row" v-if="participant.discipline"
               v-for="(discipline, index) in participant.discipline" :key="index">
            <div class="col-1">
              <div class="text-center custom-class">
                <p class="m-auto">{{ index + 1 }}</p>
              </div>
              <p @click="removeDiscipline(index)" v-if="participant.discipline.length > 0">usuń</p>
            </div>
            <div class="col-11 pl-4">
              <b-form-group class="custom">
                <treeselect v-model="discipline.id" v-if="discipline.discipline"
                            :multiple="false" class="custom mb-3"
                            placeholder="Dyscyplina" :options="participantDiscipline"
                            :class="{'error-input-custom': veeErrors.has('discipline.discipline')}"
                            name="discipline.discipline" key="discipline.discipline" v-validate="{'required':true}"
                />
                <treeselect v-model="discipline.class.id" v-if="discipline.class"
                            :multiple="false" class="custom mb-3"
                            placeholder="Klasa" :options="participantClass"
                            :class="{'error-input-custom': veeErrors.has('discipline.class')}"
                            name="discipline.class" key="discipline.class" v-validate="{'required':true}"
                />
              </b-form-group>
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" lg="6" class="">
          <!--buttons-->
          <div class="row">
            <div class="col-1">
              <!--   todo Веталь, перепиши в класс как будет время   -->
              <b-col>
                <div class="text-center custom-class">
                  <p class="m-auto" v-if="participant.discipline">{{participant.discipline.length + 1}}</p>
                </div>
              </b-col>
            </div>

            <b-col>
              <div class="col-11 pl-4">
                <b-btn variant="primary" class="custom" @click="addDiscipline">Dodaj</b-btn>
              </div>
            </b-col>
          </div>
        </b-col>

      </b-row>

      <b-row class="justify-content-center">
        <b-col cols="12" lg="6" class="">
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
    props: [ 'participant' ],
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
        disciplineDefault: {
          discipline: [],
          class: []
        },

        isValidForm: false
      }
    },
    methods: {
      addDiscipline () {
        this.$parent.addDiscipline(this.disciplineDefault)
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
      },
      mounted () {
        if (this.$route.params.validateForm) {
          this.checkValidForm()
        }
      },
      rowRedirect (row) {
        this.$parent.rowRedirect(row.id)
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
  .custom-class {
    border-radius: 50%;
    box-sizing: border-box;
    height: 36px;
    width: 36px;
    border: 2px solid #D8D8D8;
  }
</style>
