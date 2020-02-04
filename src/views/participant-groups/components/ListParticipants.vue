<template>
  <ParticipantList :status-slot="statusSlot"
                   @participant-participant-list-change-status="$parent.changeParticipantStatusInList"/>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import EventBusEmit from '@/mixins/event-bus-emit'
  import ParticipantMixin from '@/mixins/participant-mixin'

  import ParticipantList from '@/views/participants/ParticipantList'

  export default {
    components: { Treeselect, ParticipantList },
    props: ['participantGroup', 'isValidForm'],
    mixins: [ EventBusEmit, ParticipantMixin ],
    data () {
      return {}
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
      }
    },
    methods: {},
    created () {}
  }
</script>

<style scoped>

</style>
