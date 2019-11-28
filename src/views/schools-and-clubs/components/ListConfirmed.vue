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

        <template slot="status" slot-scope="scope">
          <span class="status"
                :class="{'active': scope.item.active}">{{scope.item.active == 1 ? 'aktywny' : 'nieaktywny'}}</span>
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
    name: 'ListConfirmed',
    props: [ 'filters' ],
    mixins: [ SchoolsAndClubsMixin ],
    data () {
      return {
        // table
        fields: [
          { key: 'type', label: 'Typ', sortable: true },
          { key: 'name', label: 'Nazwa', sortable: true },
          { key: 'object', label: 'Obiekty sportowe', sortable: true },
          { key: 'email', label: 'E-mail', sortable: true },
          { key: 'status', label: 'status w systemie', sortable: true },
          { key: 'edit', label: '' }
        ]
      }
    },
    computed: {
      schoolsConfirmed () {
        return this.$store.getters.schoolsConfirmed
      }
    },
    methods: {
      rowRedirect (row) {
        this.$parent.rowRedirect(row.id, true)
      }
    },
    created () {
      this.$store.dispatch('getSchools', { confirmed: 1 })
    }
  }
</script>

<style scoped>

</style>
