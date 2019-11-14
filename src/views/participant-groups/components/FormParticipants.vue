<template>
<div>
  <h2 class="col-11 pl-4" >Zawodnicy</h2>
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
        <b-form-group class="col-11 pl-4">
          <treeselect class="mb-4 custom"
                      v-model="participantGroup.selectedDiscipline"
                      :multiple="false"
                      placeholder="Rocznik"
                      :options="participantGroup.disciplines"/>
          <treeselect class="mb-4 custom"
                      v-model="participantGroup.selectedCategory"
                      :multiple="true"
                      placeholder="Imię i Nazwisko"
                      :options="participantGroup.categories"/>
        </b-form-group>
      </div>

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

            <div class="mb-6">
              <b-row class="justify-content-center">
                <b-col cols="1">
                  <b-btn variant="primary" class="custom" @click="addParticipant">Dodaj</b-btn>
                </b-col>
              </b-row>
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
                <b-btn block-class="custom" :to="{ name: 'participant.groups', params: { 'tab': 'confirmed' } }">
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
    </b-col>
  </b-row>
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
      // participantToDelete: [],
      participantDefault: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    addParticipant () {
      this.$parent.addParticipant(this.participantDefault)
    },
    removeParticipant (index) {
      let oldItem = {
        id: this.participantGroup.participants[index].id,
        collectionType: 'remove'
      }
      // this.participantToDelete.push(oldItem)
      this.$parent.remove(index)
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
