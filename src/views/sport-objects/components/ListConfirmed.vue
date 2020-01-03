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

  export default {
    name: 'ListConfirmed',
    props: [ 'filters', 'sportObjectTypes' ],
    mixins: [ SportObjectsMixin ],
    data () {
      return {
        // table
        fields: [
          { key: 'title', label: 'Nazwa obiektu', sortable: true },
          { key: 'type', label: 'Typ obiektu', sortable: true },
          { key: 'lessons', label: 'Zajęcia', sortable: true },
          { key: 'status', label: 'Status w systemie', sortable: true },
          { key: 'edit', label: '' }
        ]
      }
    },
    computed: {
      sportObjectsConfirmed () {
        return this.$store.getters.sportObjectsConfirmed
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
