<!--<template>-->
<!--  <b-row class="justify-content-center" v-if="participantGroup">-->
<!--    <b-col cols="6">-->
<!--      <h5 class="my-3">Zawodnicy</h5>-->
<!--      <div class="row" v-if="participantGroup.participants"-->
<!--            v-for="(year,index) in participantGroup.years" :key="index">-->
<!--        <div class="col-2">-->
<!--          <div class="text-center _custom-css">-->
<!--            <p class="m-auto">{{index + 1}}</p>-->
<!--          </div>-->
<!--          <p @click="removeParticipant(index)" v-if="participantGroup.years.length > 0">usuń</p>-->
<!--        </div>-->
<!--        <div class="col-10">-->
<!--&lt;!&ndash;          todo NAMES  &ndash;&gt;-->
<!--          <treeselect class="custom mb-2" v-if="participantGroup.participants.name[index]"-->
<!--                      v-model="participantGroup.participants.name[index].id"-->
<!--                      :multiple="false"-->
<!--                      :class="{'error-input-custom': veeErrors.has('participantGroup.participants.name'+index)}"-->
<!--                      placeholder="Imie Nazwisko"-->
<!--                      :options="disciplinesTreeselect"/>-->
<!--          <treeselect class="custom mb-2" v-if="participantGroup.years[index]"-->
<!--                      v-model="participantGroup.years[index].id"-->
<!--                      :multiple="false"-->
<!--                      :class="{'error-input-custom': veeErrors.has('participantGroup.years'+index)}"-->
<!--                      placeholder="Imie Nazwisko"-->
<!--                      :options="participantYears"-->
<!--                      :name="'participantGroup.years'+index" :key="'participantGroup.years'+index" v-validate="{'required':true}"/>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="row mb-3">-->
<!--        <div class="col-2">-->
<!--          <div class="text-center _custom-css">-->
<!--            <p class="m-auto">{{participantGroup.years.length + 1}}</p>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="col-10">-->
<!--          <b-btn @click="addParticipant" variant="primary" block class="w-50">+ Dodaj</b-btn>-->
<!--        </div>-->
<!--      </div>-->
<!--    </b-col>-->
<!--  </b-row>-->
<!--</template>-->

<!--todo-->

<script>
  // import Treeselect from '@riophae/vue-treeselect'
  // import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  //
  // import EventBusEmit from '@/mixins/event-bus-emit'
  // import FormMixin from '@/mixins/form-mixin'
  // import ParticipantMixin from '@/mixins/participant-mixin'
  //
  // export default {
  //   name: 'FormParticipants',
  //   props: [ 'participantGroup', 'isValidForm' ],
  //   components: { Treeselect },
  //   mixins: [ EventBusEmit, FormMixin, ParticipantMixin ],
  //   data () {
  //     return {
  //       // participants: [],
  //       // class: [],
  //       // lessonCategory: [],
  //       discipline: [],
  //       participantToDelete: [],
  //       participantDefault: {
  //         active: 1,
  //         sex: '',
  //         years: [],
  //
  //         name: [
  //           { id: 1, label: 'Piotr Ivanov' },
  //           { id: 2, label: 'Greg Vol' },
  //           { id: 3, label: 'Zywiec Zdroj' }
  //         ]
  //       },
  //
  //       years: [],
  //       selectedYear: null,
  //       selectedName: null
  //     }
  //   },
  //   computed: {
  //     // participantYears () {
  //     //   let data = this.$store.getters.participants
  //     //   let preparedParticipants = []
  //     //
  //     //   for (let participantIndex in data) {
  //     //     preparedParticipants.push({ id: data[participantIndex].id, label: data[participantIndex].year })
  //     //   }
  //     //
  //     //   return preparedParticipants
  //     // }
  //   },
  //   methods: {
  //     addParticipant () {
  //       this.$parent.addParticipant(this.participantDefault)
  //     },
  //     removeParticipant (index) {
  //       this.$parent.removeParticipant(index)
  //     },
  //
  //     submit (validRequired = false) {
  //       if (validRequired) {
  //         this.preSubmit()
  //           .then((result) => {
  //             if (!result) {
  //               this.loading = false
  //               return
  //             }
  //
  //             // this.$parent.concanParticipants(this.participantToDelete)
  //             this.loading = false
  //             this.$parent.submit()
  //           })
  //       } else {
  //         this.$parent.submit()
  //       }
  //     }
  //   },
  //   created () {
  //     this.$store.dispatch('getParticipants')
  //   }
  // }
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
