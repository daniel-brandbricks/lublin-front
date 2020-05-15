<template>
  <b-row class="justify-content-center">
    <b-col class="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 mt-4">
      <b-row class="justify-content-end mb-3">
        <b-btn variant="primary" class="mr-3" @click="filter(1, true)">Filtruj</b-btn>
      </b-row>

      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-0"
        aria-controls="history-table"
      />

<!--      :items="sportObjectsListFiltered"-->
      <b-table
        :items="sportObjects"
        :fields="fields"
        :per-page="perPage"
        striped
        sort-icon-left
        responsive="md"
        class="custom table-responsive"
        @row-clicked="rowRedirect"
      >
        <template slot="title" slot-scope="scope">
          <span v-if="scope.item">{{scope.item.title}}</span>
        </template>

        <template slot="type" slot-scope="scope">
          <span v-if="scope.item">{{getSportObjectTypeNameById(scope.item.type)}}</span>
        </template>

        <template slot="object" slot-scope="scope">
          <span v-if="scope.item">{{scope.item.places.length}}</span>
        </template>

        <template slot="schoolOrClub" slot-scope="scope">
          <span v-if="scope.item">{{getSchoolNameById(scope.item.school.id)}}</span>
        </template>

        <template slot="lessons" slot-scope="scope">
          <span v-if="scope.item">{{scope.item.lessons.length}}</span>
        </template>

        <template slot="status" slot-scope="scope">
          <span class="status inactive" v-if="scope.item"
                :class="{'active': scope.item.active}">{{scope.item.active == 1 ? 'aktywny' : 'nieaktywny'}}</span>
        </template>

<!--        <template slot="object" slot-scope="scope">-->
<!--          <span>{{scope.item.placeType.title}}</span>-->
<!--        </template>-->

        <template slot="data" slot-scope="scope">
          <span v-if="scope.item">{{scope.item.created}}</span>
        </template>

        <template slot="btnTable" slot-scope="scope" v-if="$store.getters.isDirector">
          <b-btn variant="primary" class="custom mb-0" @click="confirmItem(scope.item.id)">
            Zatwierdź
          </b-btn>
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
  import SportObjectsMixin from '@/mixins/sport-objects-mixin'
  import TableMixin from '@/mixins/table-mixin'

  export default {
    name: 'ListConfirmed',
    props: [ 'filters', 'sportObjectTypes', 'isConfirmed', 'idsToPass', 'fieldsParams' ],
    mixins: [ SportObjectsMixin, TableMixin ],
    data () {
      return {
        currentPage: 1,
        perPage: 20,
        totalRows: 0,

        // table
        fields: [
          { key: 'title', label: 'Nazwa obiektu', sortable: true },
          { key: 'type', label: 'Typ obiektu', sortable: true },
          { key: 'schoolOrClub', label: 'Nazwa Klubu/Szkoły', sortable: true },
          // { key: 'lessons', label: 'Zajęcia', sortable: true },
          // { key: 'status', label: 'Status w systemie', sortable: true },
          // { key: 'data', label: 'Data dodania', sortable: true },
          // { key: 'btnTable', label: '', sortable: true },
          // { key: 'edit', label: '' }
        ]
      }
    },
    watch: {
      currentPage: function (val) {
        this.filter(val)
      }
    },
    computed: {
      sportObjects () {
        let sportObjectsPassedByIds = []
        let storeSportObjects = this.isConfirmed === 'all' ? this.$store.getters.sportObjects
        : this.isConfirmed ? this.$store.getters.sportObjectsConfirmed : this.$store.getters.sportObjectsToConfirm

        // this block for filtering by passed ids through parent-related entities
        // if (undefined === this.idsToPass) {
          sportObjectsPassedByIds = storeSportObjects
        // } else {
        //   for (let index in storeSportObjects) {
        //     if (this.idsToPass.includes(parseInt(storeSportObjects[index].id))) {
        //       sportObjectsPassedByIds.push(storeSportObjects[index])
        //     }
        //   }
        // }

        return sportObjectsPassedByIds
      }
    },
    methods: {
      filter (currentPage = 1, reset = false) {
        let filters = this.filters
        filters.idsToPass = this.idsToPass

        if (this.isConfirmed === 'all') {
          this.$store.dispatch('getSportObjects', {confirmed: 0, filters: filters, currentPage: currentPage, perPage: this.perPage})
            .then(response => {
              this.filterResponse(response, reset)
            })
          this.$store.dispatch('getSportObjects', {confirmed: 1, filters: filters, currentPage: currentPage, perPage: this.perPage})
            .then(response => {
              this.filterResponse(response, reset)
            })
        } else {
          this.$store.dispatch('getSportObjects', {confirmed: this.isConfirmed ? 1 : 0, filters: filters, currentPage: currentPage, perPage: this.perPage})
            .then(response => {
              this.filterResponse(response, reset)
            })
        }
      },
      filterResponse(response, reset) {
        // this.historyData = response.data
        this.totalRows = response.totalCount

        if (reset) this.currentPage = 1
      },
      rowRedirect (row) {
        this.$parent.rowRedirect(row.id, true)
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
      this.filter()
      // if (this.isConfirmed === 'all') {
      //   this.$store.dispatch('getSportObjects', {confirmed: 0})
      //   this.$store.dispatch('getSportObjects', {confirmed: 1})
      // } else {
      //   this.$store.dispatch('getSportObjects', {confirmed: this.isConfirmed ? 1 : 0})
      // }

      this.$store.dispatch('getSchools', {})
      this.$store.dispatch('getSportObjectTypes')
    }
  }
</script>

<style scoped>

</style>
