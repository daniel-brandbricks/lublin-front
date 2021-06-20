<template>
  <b-row class="justify-content-center">
    <b-col cols="8">
      <b-table
        :items="leadersFiltered"
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

        <template slot="sportObject" slot-scope="scope">
          <span class="d-inline" v-for="(place,index) in scope.item.places" :key="index">
            {{getPlaceTitleById(place.id, index, scope.item.places.length)}}
          </span>
        </template>

        <template slot="lessons" slot-scope="scope">
          <span>{{scope.item.lessonsCount}}</span>
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
  import LeaderMixin from '@/mixins/leader-mixin'
  import { mapGetters } from 'vuex'

  export default {
    name: 'ListConfirmed',
    props: [ 'filters' ],
    mixins: [ LeaderMixin ],
    data () {
      return {
        fields: [
          { key: 'fullName', label: 'Imię i Nazwisko', sortable: true },
          { key: 'disciplines', label: 'Dyscyplina', sortable: true },
          { key: 'sportObject', label: 'Obiekt', sortable: true },
          { key: 'lessons', label: 'Zajęcia', sortable: true },
          { key: 'status', label: 'Status w systemie', sortable: true },
          { key: 'edit', label: '' }
        ]
      }
    },
    computed: {
      ...mapGetters(['disciplines', 'sportObjects', 'lessons']),
      leadersConfirmed () {
        return this.$store.getters.leadersConfirmed
      }
    },
    methods: {
      getDisciplineTitleById (id, index = null, arrayLength = null) {
        if (undefined === this.disciplines || this.disciplines === null || this.disciplines.length < 1) return ''
        return this.disciplines.find((obj) => {
          return obj.id === id
        }).title + ((index + 1) < arrayLength ? ',' : '')
      },
      getPlaceTitleById (id, index = null, arrayLength = null) {
        if (undefined === this.sportObjects || this.sportObjects === null || this.sportObjects.length < 1) return ''
        return this.sportObjects.find((obj) => {
          return obj.id === id
        }).title + ((index + 1) < arrayLength ? ',' : '')
      },
      rowRedirect (row) {
        this.$parent.rowRedirect(row.id, true)
      }
    },
    created () {
      this.$store.dispatch('getLeaders', { confirmed: 1, returnType: 'short'})
      // this.$store.dispatch('getDisciplines')
    }
  }
</script>

<style scoped>

</style>
