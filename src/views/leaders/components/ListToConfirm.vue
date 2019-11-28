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

        <template slot="btnTable" slot-scope="scope">
          <b-btn variant="primary" class="custom mb-0" @click="confirmItem(scope.item.id)">
            Zatwierdź
          </b-btn>
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

  export default {
    name: 'ListToConfirm',
    props: [ 'filters' ],
    mixins: [],
    data () {
      return {
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
          { fullName: 'Mark Brown', discipline: 'Biegun', sportObject: 'Park', lessons: 13, status: 0 },
          { fullName: 'Tom Green', discipline: 'Biegun', sportObject: 'Park', lessons: 42, status: 0 },
          { fullName: 'Ben Red', discipline: 'Biegun', sportObject: 'Park', lessons: 32, status: 1 },
          { fullName: 'Bill White', discipline: 'Biegun', sportObject: 'Park', lessons: 21, status: 1 }
        ]
      }
    },
    methods: {
      rowRedirect (row) {
        this.$parent.rowRedirect(row.id, false)
      },
      confirmItem (id) {
        this.$store.dispatch('putSportObject', { id: id, confirmed: 1 })
          .then((response) => {
            // todo remake + in school
            this.$store.dispatch('getSportObjects', { confirmed: 0 })
          })
      }
    },
    created () {
      this.$store.dispatch('getSportObjects', { confirmed: 0 })
    }
  }
</script>

<style scoped>

</style>
