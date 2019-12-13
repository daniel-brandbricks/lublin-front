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
          <span/>
          <span class="d-inline" v-for="(discipline,index) in scope.item.disciplines" :key="index">
            {{getDisciplineTitleById(discipline.id, index, scope.item.disciplines.length)}}
          </span>
        </template>

        <template slot="status" slot-scope="scope">
          <span class="status" :class="{'active': scope.item.active}">
            {{scope.item.active == 1 ? 'aktywny' : 'nieaktywny'}}
          </span>
        </template>

        <template slot="lessons" slot-scope="scope">
          <span/>
          <span class="d-inline" v-for="(lesson,index) in scope.item.lessons" :key="index">
<!--            {{getDisciplineTitleById(discipline.id, index, scope.item.disciplines.length)}}-->
          </span>
        </template>

        <template slot="edit" slot-scope="scope">
          <b-link class="icon-link">
            <span class="icon icon-iconm_search"/>
          </b-link>
        </template>

      </b-table>
    </b-col>
  </b-row>
</template>

<script>
  import LeaderMixin from '@/mixins/leader-mixin'

  export default {
    name: 'ListToConfirm',
    props: ['filters', 'isConfirmed', 'idsToPass'],
    mixins: [LeaderMixin],
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
      leaders () {
        let leadersPassedByIds = []
        let storeLeaders = this.isConfirmed === 'all' ? this.$store.getters.leaders
        : this.isConfirmed ? this.$store.getters.leadersConfirmed : this.$store.getters.leadersToConfirm

        // this block for filtering by passed ids through related entities
        if (undefined === this.idsToPass) {
          leadersPassedByIds = storeLeaders
        } else {
          for (let index in storeLeaders) {
            if (this.idsToPass.includes(parseInt(storeLeaders[index].id))) {
              leadersPassedByIds.push(storeLeaders[index])
            }
          }
        }

        return leadersPassedByIds
      },
      disciplines () {
        return this.$store.getters.disciplines
      }
    },
    methods: {
      getDisciplineTitleById (id, index = null, arrayLength = null) {
        if (undefined === this.disciplines || this.disciplines === null) return ''
        // todo error title of undefined
        let discipline = this.disciplines.find((obj) => {
          return obj.id === id
        })

        return undefined === discipline ? '' : discipline.title + ((index + 1) < arrayLength ? ',' : '')
      },
      rowRedirect (row) {
        this.$router.push({
          name: 'leader',
          params: { 'tab': 'main-data', 'id': row.id, 'isConfirmed': false }
        })
        // this.$parent.rowRedirect(row.id, false)
      }
    },
    created () {
      if (this.isConfirmed === 'all') {
        this.$store.dispatch('getLeaders', {confirmed: 0})
        this.$store.dispatch('getLeaders', {confirmed: 1})
      } else {
        this.$store.dispatch('getLeaders', {confirmed: this.isConfirmed ? 1 : 0})
      }
      // this.$store.dispatch('getDisciplines')
    }
  }
</script>

<style scoped>

</style>
