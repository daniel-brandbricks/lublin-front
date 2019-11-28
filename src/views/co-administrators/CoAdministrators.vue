<template>
  <div>
    <b-row class="justify-content-center">
      <b-col cols="8">
        <b-table
          :items="items"
          :fields="fields"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive"
          @row-clicked="rowRedirect"
        >

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

  </div>
</template>

<script>
  // node_modules

  import EventBusEmit from '@/mixins/event-bus-emit'

  export default {
    mixins: [ EventBusEmit ],
    name: 'CoAdministrators',
    data () {
      return {
        // table
        fields: [
          { key: 'name', label: 'Imię', sortable: true },
          { key: 'surname', label: 'Nazwisko', sortable: true },
          { key: 'phone', label: 'Telefon', sortable: true },
          { key: 'email', label: 'E-mail', sortable: true },
          { key: 'status', label: 'Status w systemie', sortable: true },
          { key: 'edit', label: '' }
        ],
        items: [
          { name: 'Face', surname: 'Raper', phone: 5553535, email: 'face@gmail.com' },
          { name: 'Table', surname: 'Mebel', phone: 123456, email: 'stol@gmail.com' }
        ]
      }
    },
    methods: {
      rowRedirect (id, isConfirmed) {
        this.$router.push({
          name: 'co.administrators',
          params: { 'tab': 'main-data', 'id': id, 'isConfirmed': isConfirmed }
        })
      }
    },
    created () {
      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })
      this.changeAdminNavbarBreadcrumbs([ { text: 'Współadministratorzy', active: true } ])
    }
  }
</script>

<style scoped>

</style>
