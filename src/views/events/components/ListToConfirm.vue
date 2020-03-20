<template>
  <b-row class="justify-content-center">
    <b-col cols="8">
      <h5 class="mb-3">Data</h5>
      <b-table
        :items="eventListFiltered"
        :fields="fields"
        striped
        sort-icon-left
        responsive="md"
        class="custom table-responsive"
        @row-clicked="rowRedirect"
      >
        <template slot="name" slot-scope="scope">
          <div class="d-flex align-items-center justify-content-between">
            <div class="wrap-img-type-table mr-3">
              <img :src="'https://placeimg.com/50/50/any'" alt="">
            </div>
            <span>{{scope.item.name}}</span>
          </div>
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
  import EventsMixin from '@/mixins/event-mixin'

  export default {
    name: 'ListToConfirm',
    mixins: [ EventsMixin ],
    data () {
      return {
        fields: [
          { key: 'title', label: 'Nazwa', sortable: true },
          { key: 'description', label: 'Opis', sortable: true },
          { key: 'phone', label: 'Telefon', sortable: true },
          { key: 'phone', label: 'Telefon', sortable: true },
          { key: 'btnTable', label: '', sortable: true },
          { key: 'edit', label: '' }
        ]
      }
    },
    computed: {
      eventsToConfirm () {
        return this.$store.getters.eventsToConfirm
      }
    },
    methods: {
      rowRedirect (row) {
        this.$parent.rowRedirect(row.id, false)
      },
      confirmItem (id) {
        this.$store.dispatch('putEvent', { id: id, confirmed: 1 })
          .then((response) => {
            this.$store.dispatch('getEvents', { confirmed: 0 })
          })
      }
    },
    created () {
      this.$store.dispatch('getEvents', { confirmed: 0 })
    }
  }
</script>

<style scoped>

</style>
