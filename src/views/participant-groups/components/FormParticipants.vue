<template>
  <b-row class="justify-content-center" v-if="participantGroup">
    <b-col cols="6">
      <h5 class="my-3">Zawodnicy</h5>
      <div class="row" v-if="participantGroup.participants"
           v-for="(participant,index) in participantGroup.participants" :key="index">
        <div class="col-2">
          <div class="text-center _custom-css">
            <p class="m-auto">{{index + 1}}</p>
          </div>
          <p @click="removeParticipant(index)" v-if="participantGroup.participants.length > 0">usuń</p>
        </div>
        <div class="col-10">
          <!--          todo NAMES  -->
          <treeselect class="custom mb-2" v-if="participantYearsSelected && participantYearsSelected[index]"
                      v-model="participantYearsSelected[index].year"
                      :multiple="false"
                      placeholder="Rocznik"
                      :options="years"
                      :name="'participantYearsSelected.years'+index"
                      :class="{'error-input-custom': veeErrors.has('participantYearsSelected.years'+index)}"
                      :key="'participantYearsSelected.years'+index" v-validate="{'required':true}"/>
          <treeselect class="custom mb-2"
                      v-if="participantGroup.participants && participantGroup.participants[index]"
                      v-model="participantGroup.participants[index].id"
                      :multiple="false"
                      placeholder="Imie Nazwisko"
                      :name="'participantGroup.participants.fullName'+index"
                      :class="{'error-input-custom': veeErrors.has('participantGroup.participants.fullName'+index)}"
                      :key="'participantGroup.participants.fullName'+index" v-validate="{'required':true}"
                      :options="participantsTreeselect(participantYearsSelected[index] ?
                      participantYearsSelected[index].year : null, selectedParticipants)"/>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-2">
          <div class="text-center _custom-css">
            <p class="m-auto">{{participantGroup.participants.length + 1}}</p>
          </div>
        </div>
        <div class="col-10">
          <b-btn @click="addParticipant" variant="primary" block class="w-50">+ Dodaj</b-btn>
        </div>
      </div>

      <b-row class="mt-4 justify-content-end">
        <b-col cols="5">
          <b-btn block class="custom btn" :to="{ name: 'participant.groups' }">
            Anuluj
          </b-btn>
        </b-col>
        <b-col cols="5">
          <b-btn variant="primary" block class="custom" @click="submitCheckMainTabForm(true)">
            Zapisz
          </b-btn>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<!--todo-->

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import {YEARS} from '../../../config/AppConfig'

  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'
  import ParticipantMixin from '@/mixins/participant-mixin'

  export default {
    name: 'FormParticipants',
    props: ['participantGroup', 'isValidForm', 'participantYearsSelected'],
    components: {Treeselect},
    mixins: [EventBusEmit, FormMixin, ParticipantMixin],
    data () {
      return {
        years: YEARS,
        selectedParticipants: []
      }
    },
    computed: {},
    watch: {
      // todo review
      'participantYearsSelected': {
        handler: function (newValue) {
          for (let index in newValue) {
            let id = undefined === this.participantGroup.participants[index] ? null
            : this.participantGroup.participants[index].id
            if (undefined === id || id === null) {
              continue
            }

            let participant = this.$store.getters.participant(id)
            if (undefined === participant) {
              this.$store.dispatch('getParticipant', { id: id })
                .then((response) => {
                  if (parseInt(response.year) !== parseInt(newValue[index].year)) {
                    this.participantGroup.participants[index].id = null
                  }
                })
            } else {
              if (parseInt(participant.year) !== parseInt(newValue[index].year)) {
                this.participantGroup.participants[index].id = null
              }
            }
          }
        },
        deep: true
      },
      'participantGroup.participants': {
        handler: function (val) {
          let idsArray = []
          for (let index in val) {
            idsArray.push(val[index].id)
          }
          this.selectedParticipants = idsArray
        },
        deep: true
      }
    },
    methods: {
      participantsTreeselect (year, selectedParticipants) {
        let data = this.$store.getters.participants
        let prepared = []
console.log(data)
        for (let participantIndex in data) {
          if (year && parseInt(data[participantIndex].year) === parseInt(year)) {
            if (this.selectedParticipants.indexOf(data[participantIndex].id) === -1) {
              prepared.push({id: data[participantIndex].id,
                             label: data[participantIndex].firstName + ' ' + data[participantIndex].lastName})
            } else {
              prepared.push({id: data[participantIndex].id,
                             label: data[participantIndex].firstName + ' ' + data[participantIndex].lastName,
                             isDisabled: true})
            }
          }
        }

        return prepared
      },
      addParticipant () {
        this.$parent.addParticipant()
      },
      removeParticipant (index) {
        this.$parent.removeParticipant(index)
      },
      submitCheckMainTabForm (validRequired) {
        if (validRequired) {
          if (this.isValidForm) {
            this.submit(validRequired)
          } else {
            // validate form in next tab (component)
            this.$parent.goToFormTab('main-data', { 'validateForm': true })
          }
        } else {
          this.submit(validRequired)
        }
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
    created () {
      // todo by school
      this.$store.dispatch('getParticipants')
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
