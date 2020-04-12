<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="6">

        <b-row class=" justify-content-between">
          <h4>Szablony</h4>
          <b-col class="flex-grow-0">
            <b-btn variant="primary" class="mr-3" :to="{ name: 'mail.template' }">
              Dodaj
            </b-btn>
          </b-col>
        </b-row>
        <b-table
          :items="mailTemplates"
          :fields="templateFields"
          striped
          responsive="md"
          class="custom table-responsive"
          @row-clicked="rowRedirectMailTemplates"
        >
          <template slot="edit" slot-scope="scope">
            <b-link class="icon-link">
              <span class="icon icon-iconm_search"></span>
            </b-link>
          </template>
        </b-table>
      </b-col>

      <b-col cols="6">
        <h4 class="mb-3">Odbiorcy</h4>
        <b-table
          :items="mails"
          :fields="recipientFields"
          striped
          responsive="md"
          class="custom table-responsive"
          @row-clicked="rowRedirectMails"
        >

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
    name: 'Messages',
    data () {
      return {
        templateFields: [
          { key: 'title', label: 'Tytuł', sortable: true },
          { key: 'description', label: 'Treść', sortable: true }
        ],
        recipientFields: [
          { key: 'mailTemplate.title', label: 'Tytuł', sortable: true },
          { key: 'mailTemplate.created', label: 'Data wysłania', sortable: true }
        ]
      }
    },
    computed: {
      sender () {
        return this.$store.getters.sender
      },
      mailTemplates () {
        return this.sender ? this.sender.mailTemplates : []
      },
      mails () {
        return this.sender ? this.sender.mails : []
      }
    },
    methods: {
      rowRedirectMailTemplates (row) {
        this.$router.push({
          name: 'mail.template',
          params: { 'id': row.id }
        })
      },
      rowRedirectMails (row) {
        this.$router.push({
          name: 'recipient',
          params: { 'id': row.id }
        })
      }
    },
    created () {
      this.$store.dispatch('getSender')
      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })
      this.changeAdminNavbarBreadcrumbs([ { text: 'Komunikaty', active: true } ])
    }
  }
</script>

<style scoped>

</style>
