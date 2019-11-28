<template>
  <b-row class="justify-content-center">
    <b-col cols="8">
      <b-table
        :items="schoolListFiltered"
        :fields="fields"
        striped
        sort-icon-left
        responsive="md"
        class="custom table-responsive"
        @row-clicked="rowRedirect"
      >
        <template slot="type" slot-scope="scope">
          <div class="d-flex align-items-center justify-content-between">
            <div class="wrap-img-type-table mr-3">
              <img :src="scope.item.image || 'https://placeimg.com/50/50/any'" alt="">
            </div>
            <span>{{scope.item.type == 0 ? 'Klub' : 'Szkoła'}}</span>
          </div>

        </template>

        <template slot="object" slot-scope="scope">
          <span>{{scope.item.places.length}}</span>
        </template>

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
            <span class="icon icon-iconm_search"></span>
          </b-link>
        </template>

      </b-table>
    </b-col>
  </b-row>
</template>

<script>
  import SchoolsAndClubsMixin from '@/mixins/schools-and-clubs-mixin'

  export default {
    name: 'ListToConfirm',
    props: [ 'filters' ],
    mixins: [ SchoolsAndClubsMixin ],
    data () {
      return {
        fields: [
          { key: 'type', label: 'Typ', sortable: true },
          { key: 'name', label: 'Nazwa', sortable: true },
          { key: 'object', label: 'Obiekty sportowe', sortable: true },
          { key: 'data', label: 'Data dodania', sortable: true },
          { key: 'btnTable', label: '', sortable: true },
          { key: 'edit', label: '' }
        ]
      }
    },
    computed: {
      schoolsToConfirm () {
        return this.$store.getters.schoolsToConfirm
      }
    },
    methods: {
      rowRedirect (row) {
        this.$parent.rowRedirect(row.id, false)
      },
      confirmItem (id) {
        this.$store.dispatch('putSchool', { id: id, confirmed: 1 })
          .then((response) => {
            this.$store.dispatch('getSchools', { confirmed: 0 })
          })
      }
    },
    created () {
      this.$store.dispatch('getSchools', { confirmed: 0 })
    }
  }
</script>

<style scoped>

</style>
