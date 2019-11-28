<template>
  <b-row class="justify-content-center">
    <b-col cols="8">
      <b-table
        :items="leadersConfirmed"
        :fields="fields"
        striped
        sort-icon-left
        responsive="md"
        class="custom table-responsive"
        @row-clicked="rowRedirect"
      >
        <template slot="status" slot-scope="scope">
          <span class="status"
                :class="{'active': scope.item.status}">{{scope.item.status == 1 ? 'aktywny' : 'nieaktywny'}}</span>
        </template>

        <template slot="edit" slot-scope="scope">
          <b-link class="icon-link">
            <span class="icon icon-iconm_search"></span>
          </b-link>
        </template>

      </b-table>
    </b-col>
  </b-row>
</template>

<script>
  import SportObjectsMixin from '@/mixins/sport-objects-mixin'

  export default {
    name: 'ListConfirmed',
    props: [ 'filters' ],
    mixins: [ SportObjectsMixin ],
    data () {
      return {
        // table
        fields: [
          { key: 'fullName', label: 'Imię i Nazwisko', sortable: true },
          { key: 'discipline', label: 'Dyscyplina', sortable: true },
          { key: 'sportObject', label: 'Obiekt', sortable: true },
          { key: 'lessons', label: 'Zajęcia', sortable: true },
          { key: 'status', label: 'Status w systemie', sortable: true },
          { key: 'edit', label: '' }
        ]
      }
    },
    computed: {
      leadersConfirmed () {
        return [
          { fullName: 'Mark Brown', discipline: 'Biegun', sportObject: 'Park', lessons: 3, status: 1 },
          { fullName: 'Tom Green', discipline: 'Biegun', sportObject: 'Park', lessons: 4, status: 0 },
          { fullName: 'Ben Red', discipline: 'Biegun', sportObject: 'Park', lessons: 2, status: 0 },
          { fullName: 'Bill White', discipline: 'Biegun', sportObject: 'Park', lessons: 1, status: 1 }
        ]
      }
    },
    methods: {
      rowRedirect (row) {
        this.$parent.rowRedirect(row.id, true)
      }
    },
    created () {
      this.$store.dispatch('getSportObjects', { confirmed: 1 })
      this.$store.dispatch('getSportObjectTypes')
    }
  }
</script>

<style scoped>

</style>
