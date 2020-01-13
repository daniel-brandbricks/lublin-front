<template>
  <b-row class="justify-content-center">
    <b-col cols="8">
      <b-table
        :items="sportObjectsListFiltered"
        :fields="fields"
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
          <span>{{getSportObjectTypeNameById(scope.item.type)}}</span>
        </template>

        <template slot="object" slot-scope="scope">
          <span>{{scope.item.places.length}}</span>
        </template>

        <template slot="lessons" slot-scope="scope">
          <span class="status active">aktywny</span>
        </template>

        <template slot="status" slot-scope="scope">
          <span class="status inactive"
                :class="{'active': scope.item.active}">{{scope.item.active == 1 ? 'aktywny' : 'nieaktywny'}}</span>
        </template>

<!--        <template slot="object" slot-scope="scope">-->
<!--          <span>{{scope.item.placeType.title}}</span>-->
<!--        </template>-->

        <template slot="data" slot-scope="scope">
          <span>{{scope.item.created}}</span>
        </template>

        <template slot="btnTable" slot-scope="scope">
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
        // table
        fields: [
          { key: 'title', label: 'Nazwa obiektu', sortable: true },
          { key: 'type', label: 'Typ obiektu', sortable: true },
          // { key: 'schoolOrClub', label: 'Nazwa Klubu/Szkoły', sortable: true },
          // { key: 'lessons', label: 'Zajęcia', sortable: true },
          // { key: 'status', label: 'Status w systemie', sortable: true },
          // { key: 'data', label: 'Data dodania', sortable: true },
          // { key: 'btnTable', label: '', sortable: true },
          // { key: 'edit', label: '' }
        ]
      }
    },
    computed: {
      sportObjects () {
        let sportObjectsPassedByIds = []
        let storeSportObjects = this.isConfirmed === 'all' ? this.$store.getters.sportObjects
        : this.isConfirmed ? this.$store.getters.sportObjectsConfirmed : this.$store.getters.sportObjectsToConfirm

        console.log(storeSportObjects)

        // this block for filtering by passed ids through parent-related entities
        if (undefined === this.idsToPass) {
          sportObjectsPassedByIds = storeSportObjects
        } else {
          for (let index in storeSportObjects) {
            if (this.idsToPass.includes(parseInt(storeSportObjects[index].id))) {
              sportObjectsPassedByIds.push(storeSportObjects[index])
            }
          }
        }

        console.log(sportObjectsPassedByIds)

        return sportObjectsPassedByIds
      }
    },
    methods: {
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
      if (this.isConfirmed === 'all') {
        this.$store.dispatch('getSportObjects', {confirmed: 0})
        this.$store.dispatch('getSportObjects', {confirmed: 1})
      } else {
        this.$store.dispatch('getSportObjects', {confirmed: this.isConfirmed ? 1 : 0})
      }

      this.$store.dispatch('getSportObjectTypes')
    }
  }
</script>

<style scoped>

</style>
