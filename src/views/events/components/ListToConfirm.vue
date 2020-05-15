<template>
  <b-row class="justify-content-center">
    <b-col cols="12" xl="12" lg="12" md="12" sm="12" class="mb-2">
      <b-table
        :items="eventListFiltered"
        :fields="fields"
        striped
        sort-icon-left
        responsive="md"
        class="custom table-responsive"
        @row-clicked="rowRedirect"
      >
        <template slot="dateStart" slot-scope="scope">
          <span>{{scope.item.dateStart.substr(0, scope.item.dateStart.indexOf(' '))}}</span>
        </template>

        <template slot="discipline" slot-scope="scope">
          <span v-if="scope.item.discipline && scope.item.discipline.id">
            {{getDisciplineTitleById(scope.item.discipline.id)}}
          </span>
        </template>

        <template slot="organization" slot-scope="scope">
          <span v-if="scope.item.organization">{{scope.item.organization}}</span>
          <span v-else-if="scope.item.school && scope.item.school.id">
            {{getSchoolNameById(scope.item.school.id)}}
          </span>
        </template>

        <template slot="btnTable" slot-scope="scope" v-if="$store.getters.isAdmin">
          <b-btn variant="primary" class="custom mb-0" @click="confirmItem(scope.item.id)">
            Zatwierdź
          </b-btn>
        </template>
        <template slot="edit" slot-scope="scope">
          <span class="c-pointer">Szczegóły</span>
        </template>

      </b-table>
    </b-col>
  </b-row>
</template>

<script>
  import EventsMixin from '@/mixins/event-mixin'

  export default {
    name: 'ListToConfirm',
    mixins: [ EventsMixin ],
    data () {
      return {
        fields: [
          { key: 'dateStart', label: 'Data rozpoczęcia', sortable: true },
          { key: 'title', label: 'Nazwa', sortable: true },
          { key: 'discipline', label: 'Dyscyplina', sortable: true },
          { key: 'organization', label: 'Organizator', sortable: true },
          { key: 'btnTable', label: '', sortable: true },
          { key: 'edit', label: '' }
        ]
      }
    },
    computed: {
      eventsToConfirm () {
        return this.$store.getters.eventsToConfirm
      }
    },
    methods: {
      rowRedirect (row) {
        this.$parent.rowRedirect(row.id, false)
      },
      confirmItem (id) {
        this.$store.dispatch('putEvent', { id: id, confirmed: 1 })
          .then((response) => {
            this.$store.dispatch('getEvents', { confirmed: 0, forSchool: true })
          })
      }
    },
    created () {
      this.$store.dispatch('getEvents', { confirmed: 0, forSchool: true })
    }
  }
</script>

<style scoped>

</style>
