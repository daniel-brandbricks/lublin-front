<template>
  <b-row class="justify-content-center">
    <b-col cols="8">
      <b-table
        :items="leadersToConfirm"
        :fields="fields"
        striped
        sort-icon-left
        responsive="md"
        class="custom table-responsive"
        @row-clicked="rowRedirect"
      >
        <template slot="fullName" slot-scope="scope">
          <span>{{scope.item.firstName + ' ' + scope.item.firstName}}</span>
        </template>

        <template slot="disciplines" slot-scope="scope">
          <span></span>
          <span class="d-inline" v-for="(discipline,index) in scope.item.disciplines" :key="index">
            {{getDisciplineTitleById(discipline.id, index, scope.item.disciplines.length)}}
          </span>
        </template>

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
    props: ['filters'],
    mixins: [],
    data () {
      return {
        fields: [
          {key: 'fullName', label: 'Imię i Nazwisko', sortable: true},
          {key: 'disciplines', label: 'Dyscyplina', sortable: true},
          {key: 'sportObject', label: 'Obiekt', sortable: true},
          {key: 'lessons', label: 'Zajęcia', sortable: true},
          {key: 'status', label: 'Status w systemie', sortable: true},
          {key: 'edit', label: ''}
        ]
      }
    },
    computed: {
      leadersToConfirm () {
        return this.$store.getters.leadersToConfirm
      },
      disciplines () {
        return this.$store.getters.disciplines
      }
    },
    methods: {
      getDisciplineTitleById (id, index = null, arrayLength = null) {
        if (undefined === this.disciplines || this.disciplines === null) return ''
        return this.disciplines.find((obj) => {
          return obj.id === id
        }).title + ((index + 1) < arrayLength ? ',' : '')
      },
      rowRedirect (row) {
        this.$parent.rowRedirect(row.id, false)
      },
      confirmItem (id) {
        this.$store.dispatch('putSportObject', {id: id, confirmed: 1})
          .then((response) => {
            // todo remake + in school
            this.$store.dispatch('getSportObjects', {confirmed: 0})
          })
      }
    },
    created () {
      this.$store.dispatch('getLeaders', { confirmed: 0 })
      this.$store.dispatch('getDisciplines')
    }
  }
</script>

<style scoped>

</style>
