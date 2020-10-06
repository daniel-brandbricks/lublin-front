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
<!--        <template slot="name" slot-scope="scope">-->
<!--          <span v-if="scope.item">{{scope.item.title}}</span>-->
<!--        </template>-->

<!--        <template slot="type" slot-scope="scope">-->
<!--          <span v-if="scope.item.type">{{getSportObjectTypeNameById(scope.item.type.id)}}</span>-->
<!--        </template>-->
<!--        <template slot="type" slot-scope="scope">-->
<!--          {{scope.item.type}}-->
<!--          <span v-if="scope.item.type">{{getSportObjectTypeById(scope.item.type.id)}}</span>-->
<!--        </template>-->

        <!--        <template slot="object" slot-scope="scope">-->
<!--          <span>{{scope.item.placeType.title}}</span>-->
<!--        </template>-->

<!--        <template slot="data" slot-scope="scope">-->
<!--          <span>{{scope.item.created}}</span>-->
<!--        </template>-->

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
  import SportObjectsMixin from '@/mixins/sport-objects-mixin'

  export default {
    name: 'ListToConfirm',
    props: [ 'filters', 'sportObjectTypes' ],
    mixins: [ SportObjectsMixin ],
    data () {
      return {
        fields: [
          { key: 'name', label: 'Nazwa obiektu', sortable: true },
          { key: 'type', label: 'Typ obiektu', sortable: true },
          { key: 'data', label: 'Data dodania', sortable: true },
          { key: 'btnTable', label: '', sortable: true },
          { key: 'edit', label: '' }
        ]
      }
    },
    computed: {
      sportObjectsToConfirm () {
        return this.$store.getters.sportObjectsToConfirm
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
      this.$store.dispatch('getSportObjectTypes')
    }
  }
</script>

<style scoped>

</style>
