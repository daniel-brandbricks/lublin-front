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
          <span class="status" :class="{'active': scope.item.status}">
            {{scope.item.status == 1 ? 'aktywny' : 'nieaktywny'}}
          </span>
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
        fields: [
          { key: 'fullName', label: 'Imię i Nazwisko', sortable: true },
          { key: 'disciplines', label: 'Dyscyplina', sortable: true },
          { key: 'sportObject', label: 'Obiekt', sortable: true },
          { key: 'lessons', label: 'Zajęcia', sortable: true },
          { key: 'status', label: 'Status w systemie', sortable: true },
          { key: 'edit', label: '' }
        ],

        // search
        search: '',

        // treeselect
        discipline: null,
        sportObject: null
      }
    },
    computed: {
      leadersConfirmed () {
        return this.$store.getters.leadersConfirmed
      },
      disciplines () {
        return this.$store.getters.disciplines
      },
      sportObjects () {
        return this.$store.getters.sportObjects
      }
    },
    methods: {
      getDisciplineTitleById (id, index = null, arrayLength = null) {
        if (undefined === this.disciplines || this.disciplines === null || this.disciplines.length < 1) return ''
        return this.disciplines.find((obj) => {
          return obj.id === id
        }).title + ((index + 1) < arrayLength ? ',' : '')
      },
      rowRedirect (row) {
        this.$parent.rowRedirect(row.id, true)
      }
    },
    created () {
      this.$store.dispatch('getLeaders', { confirmed: 1 })
      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getSportObjects')
    }
  }
</script>

<style scoped>

</style>
