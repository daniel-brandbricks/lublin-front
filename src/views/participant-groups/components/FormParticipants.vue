<template>
  <div>

    <b-row class="justify-content-center">
      <b-col cols="12" lg="6" class="">
        <b-row>
          <b-col cols="12">
            <h2 class="mb-4">Zawodnicy</h2>
          </b-col>
        </b-row>
        <div class="row" v-if="participantGroup.participants"
             v-for="(participant, index) in participantGroup.participants" :key="index">
          <div class="col-1">
            <div class="text-center custom-class">
              <p class="m-auto">{{ index + 1 }}</p>
            </div>
            <p @click="removeParticipant(index)" v-if="participantGroup.participants.length > 0">usuń</p>
          </div>
          <div class="col-11 pl-4">
            <b-form-group
              class="custom">
              <!--          todo -->
              <treeselect v-model="participant.years.id" v-if="participant.years"
                          :multiple="false" class="custom mb-3"
                          placeholder="Rocznik" :options="participantYears"
                          :class="{'error-input-custom': veeErrors.has('participant.year')}"
                          name="participant.year" key="participant.year" v-validate="{'required':true}"
              />
              <!--          <treeselect class="custom mb-3"-->
              <!--                      v-model="participant.selectedYear"-->
              <!--                      :multiple="false"-->
              <!--                      placeholder="Rocznik"-->
              <!--                      :options="participant.years"/>-->
              <treeselect class="custom mb-3"
                          v-model="participant.selectedName"
                          :multiple="true"
                          placeholder="Imię i Nazwisko"
                          :options="participant.names"/>
            </b-form-group>
          </div>
        </div>
      </b-col>
    </b-row>

    <b-row class="justify-content-center">
      <b-col cols="12" lg="6" class="">
        <!--buttons-->
        <div class="row">
          <div class="col-1">
            <!--   todo Веталь, перепиши в класс как будет время   -->
            <div class="text-center custom-class">
              <p class="m-auto" v-if="participantGroup.participants">{{participantGroup.participants.length + 1}}</p>
            </div>
          </div>

          <div class="col-11 pl-4">
            <b-btn variant="primary" class="w-50" @click="addParticipant">Dodaj</b-btn>
          </div>
        </div>
      </b-col>
    </b-row>
    <!--      -->
    <b-row class="justify-content-center">
      <b-col cols="12" lg="6">
        <!--buttons-->
        <b-row class="mt-4">
          <b-col>
            <b-btn block class="custom btn" :to="{ name: 'participant.groups' }">
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
    <!--      </div>-->
  </div>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'

  export default {
    name: 'FormParticipants',
    props: [ 'participantGroup', 'isValidForm' ],
    components: { Treeselect },
    mixins: [ EventBusEmit, FormMixin ],
    data () {
      return {
        participants: [],
        class: [],
        lessonCategory: [],
        discipline: [],
        participantToDelete: [],
        participantDefault: {
          active: 1,
          sex: '',
          years: [],

          // years: [
          //   {id: 1, label: '1999'},
          //   {id: 2, label: '2000'},
          //   {id: 3, label: '1900'}
          // ],

          names: [
            { id: 1, label: 'Piotr Ivanov' },
            { id: 2, label: 'Greg Vol' },
            { id: 3, label: 'Zywiec Zdroj' }
          ]
        },

        years: [],
        selectedYear: null,
        selectedName: null
      }
    },
    // todo for treeselect years
    computed: {
      participantYears () {
        let data = this.$store.getters.participants
        let preparedParticipants = []

        for (let participantIndex in data) {
          preparedParticipants.push({ id: data[participantIndex].id, label: data[participantIndex].year })
        }

        return preparedParticipants
      }
    },
    methods: {
      addParticipant () {
        this.$parent.addParticipant(this.participantDefault)
      },
      removeParticipant (index) {
        this.$parent.removeParticipant(index)
      },

      submit (validRequired = false) {
        if (validRequired) {
          this.preSubmit()
            .then((result) => {
              if (!result) {
                this.loading = false
                return
              }

              // this.$parent.concanParticipants(this.participantToDelete)
              this.loading = false
              this.$parent.submit()
            })
        } else {
          this.$parent.submit()
        }
      }
    },
    created () {
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
