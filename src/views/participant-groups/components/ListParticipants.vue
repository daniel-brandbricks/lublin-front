<template>
  <div>
    <ParticipantList :status-slot="statusSlot" :disableNavButton="true" :school="participantGroup.school"
                     @participant-participant-list-change-status="$parent.changeParticipantStatusInList"/>

    <b-modal ref="participantPGModal" centered title="Dodaj zawodnika" hide-footer size="md">
      <treeselect class="custom"
                  v-model="selectedParticipants"
                  :multiple="true"
                  placeholder="Zawodnik"
                  :options="participantsTreeselect"/>
      <b-row class="mt-2">
        <b-col>
          <b-btn variant="primary" @click="addParticipants" class="w-25 float-right">Zapisz</b-btn>
        </b-col>
      </b-row>
    </b-modal>
  </div>
  </template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import EventBusEmit from '@/mixins/event-bus-emit'
  import ToastMixin from '@/mixins/toast-mixin'
  import ParticipantMixin from '@/mixins/participant-mixin'

  import ParticipantList from '@/views/participants/ParticipantList'
  import EventBus from '@/event-bus'

  export default {
    components: { Treeselect, ParticipantList },
    props: ['participantGroup', 'isValidForm'],
    mixins: [ EventBusEmit, ParticipantMixin, ToastMixin ],
    data () {
      return {
        selectedParticipants: []
      }
    },
    computed: {
      // eslint-disable-next-line vue/return-in-computed-property
      statusSlot () {
        let data = {}
        let participantIds = {}
        for (let index in this.participantGroup.participants) {
          participantIds[this.participantGroup.participants[index].id] = this.participantGroup.participants[index].status
        }
        data['ids'] = participantIds
        data['columnWord'] = 'Status dla listy'
        data['event'] = 'participant-participant-list-change-status'
        console.log(this.participantGroup)
        console.log(data)
        return data
      },
      participantsTreeselect () {
        console.log(this.participantGroup)
        let data = this.$store.getters.participants
        let prepared = []
        for (let participantIndex in data) {
          if (this.participantGroup.participants.length < 1 ||
            undefined === this.participantGroup.participants.find(x => {
              return x.id === data[participantIndex].id
          })) {
            prepared.push({id: data[participantIndex].id,
                           label: data[participantIndex].firstName + ' ' + data[participantIndex].lastName})
          }
        }

        return prepared
      }
    },
    methods: {
      addParticipants () {
        // let participantsExisted = this.participantGroup.participants.map(x => x.id)
        // console.log(participantsExisted)
        this.$store.dispatch('putParticipantGroup',
                             {id: this.participantGroup.id,
                              participants: this.selectedParticipants})
          .then((res) => {
            this.$parent.refreshParticipantGroup()
            this.showToast('Dane zostały zapisane', 'Uwaga', 'success')
          })
          .catch((err) => {
            this.showToast('Wystąpil błąd', 'Uwaga', 'danger')
          })
        this.selectedParticipants = []
        this.$refs.participantPGModal.hide()
      },
      openParticipantListModal () {
        if (this.$refs.participantPGModal) {
          this.$refs.participantPGModal.show()
        }
      }
    },
    created () {
      EventBus.$on('OPEN_PARTICIPANT_LIST_MODAL', (params) => {
        this.openParticipantListModal()
      })

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({eventBusMethod: 'OPEN_PARTICIPANT_LIST_MODAL'})
    }
  }
</script>

<style scoped>

</style>
