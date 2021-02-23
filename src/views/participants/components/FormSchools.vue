<template>
  <div class="wrap" v-if="participantStore">
    <b-table
      ref="leader-table"
      :items="participantStore.schoolsParticipants"
      :fields="fields"
      striped
      sort-icon-left
      responsive="md"
      class="custom table-responsive"
    >
      <template slot="school" slot-scope="scope">
        <span>{{scope.item.school.name}}</span>
      </template>

      <template slot="status" slot-scope="scope">
        <template>
          <b-dropdown class="status-dropdown">
            <template v-slot:button-content>
              <span class="status c-pointer"
                    :class="{'active': !! scope.item.status}">
                  {{!!scope.item.status ? 'aktywny' : 'nieaktywny'}}
                </span>
            </template>
            <b-dropdown-item :disabled="scope.item.status == 1"
                             @click="changeParticipantStatus(scope.item.school.id, 1)">
              Aktywuj
            </b-dropdown-item>
            <b-dropdown-item :disabled="scope.item.status == 0"
                             @click="changeParticipantStatus(scope.item.school.id, 0)">
              Dezaktywuj
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </template>

    </b-table>
  </div>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import EventBusEmit from '@/mixins/event-bus-emit'
  import ToastMixin from '@/mixins/toast-mixin'

  export default {
    name: 'FormLeaders',
    props: ['participant'],
    components: {Treeselect},
    mixins: [EventBusEmit, ToastMixin],
    data () {
      return {
        fields: [
          {key: 'school', label: 'Szkoła/klub', sortable: true},
          {key: 'status', label: 'Status w szkołe/klubu', sortable: true}
        ],
        id: this.$route.params.id
      }
    },
    computed: {
      participantStore() {
        return this.$store.getters.participant(this.id)
      }
    },
    methods: {
      changeParticipantStatus (schoolId, status) {
        this.$store.dispatch('putParticipant', {
          id: this.participant.id,
          schoolId: schoolId,
          status: status,
          actionType: 'changeSchoolStatus'
        })
      }
    },
    created () {
      if (this.participant === undefined) {
        this.changeAdminNavbarBreadcrumbs([{text: 'Lista zawodników', active: true}])
      }
    }
  }
</script>

<style scoped>

</style>
