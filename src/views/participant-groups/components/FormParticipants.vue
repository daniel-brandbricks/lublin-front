<template>
<div>

  <b-row class="justify-content-center">
    <b-col cols="12" lg="6" class="">
      <div class="row" v-if="participantGroup.participants"
           v-for="(participant, index) in participantGroup.participants" :key="index">
        <div class="col-1">
          <div class="text-center"
               style="border-radius: 50%; box-sizing: border-box;	height: 36px;	width: 36px;	border: 2px solid #D8D8D8;">
            <p class="m-auto">{{ index + 1 }}</p>
          </div>
          <p @click="removeParticipant(index)" v-if="participantGroup.participants.length > 0">usuń</p>
        </div>
        <div class="custom col-11 pl-4">
        <h2 class="mb-4" >Zawodnicy</h2>
        <b-form-group
          class="custom">
          <treeselect class="mb-4 custom"
                      v-model="participant.selectedYear"
                      :multiple="false"
                      placeholder="Rocznik"
                      :options="participant.years"/>
          <treeselect class="mb-4 custom"
                      v-model="participant.selectedName"
                      :multiple="true"
                      placeholder="Imię i Nazwisko"
                      :options="participant.names"/>
        </b-form-group>
        </div>
      </div>
    </b-col>
  </b-row>

  <b-row class="row">
        <b-col cols="12" lg="6" class="">
          <div class="row">
            <div class="col-1">
              <!--   todo Веталь, перепиши в класс как будет время   -->
              <div class="text-center"
                   style="border-radius: 50%; box-sizing: border-box;	height: 36px;	width: 36px;	border: 2px solid #D8D8D8;">
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
        <!--            buttons   -->
        <b-row class="justify-content-center">
          <b-col cols="12" lg="8" class="">

            <b-row class="mt-4">
              <b-col>
                <b-btn block-class="custom" :to="{ name: 'participant.groups' }">
                  Anuluj
                </b-btn>
              </b-col>
              <b-col>
<!--                 maybe todo Zapisz-->
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
  props: ['participantGroup', 'isValidForm'],
  components: {Treeselect},
  mixins: [EventBusEmit, FormMixin],
  data () {
    return {
      // participants: [],
      class: [],
      lessonCategory: [],
      discipline: [],
      participantToDelete: [],
      participantDefault: {
        sex: '',
        years: [],

        // years: [
        //   {id: 1, label: '1999'},
        //   {id: 2, label: '2000'},
        //   {id: 3, label: '1900'}
        // ],

        names: [
          {id: 1, label: 'Piotr Ivanov'},
          {id: 2, label: 'Greg Vol'},
          {id: 3, label: 'Zywiec Zdroj'}
        ]
      },

      selectedYear: null,
      selectedName: null
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
  }
}
</script>

<style scoped>

</style>
