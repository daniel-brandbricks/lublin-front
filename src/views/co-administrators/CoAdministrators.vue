<template>
  <div>
    <b-row class="justify-content-center">
      <b-col cols="8">
        <b-table
          :items="administrators"
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
  import EventBusEmit from '@/mixins/event-bus-emit'
  import listMixin from '@/mixins/list-mixin'

  export default {
    mixins: [ EventBusEmit, listMixin ],
    name: 'CoAdministrators',
    data () {
      return {
        // table
        fields: [
          { key: 'firstName', label: 'Imię', sortable: true },
          { key: 'lastName', label: 'Nazwisko', sortable: true },
          { key: 'phone', label: 'Telefon', sortable: true },
          { key: 'email', label: 'E-mail', sortable: true },
          { key: 'status', label: 'Status w systemie', sortable: true },
          { key: 'edit', label: '' }
        ]
      }
    },
    computed: {
      administrators () {
        return this.$store.getters.administrators
      }
    },
    methods: {
      rowRedirect (node) {
        this.$router.push({
          name: 'co.administrator',
          params: { id: node.id }
        })
      }
    },
    created () {
      this.$store.dispatch('getAdministrators')

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: 'co.administrator' })
      this.changeAdminNavbarBreadcrumbs([ { text: 'Współadministratorzy', active: true } ])
    }
  }
</script>

<style scoped>

</style>
