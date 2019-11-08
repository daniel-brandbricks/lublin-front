<template>
<div class="container">
  <b-row class="justify-content-center">
  <b-col cols="6">

    <b-row class=" justify-content-between">
    <h4>Szablony</h4>
      <b-col class="flex-grow-0">

      <b-btn variant="secondary" class="custom" size="sm" block>Dodaj</b-btn>
      </b-col></b-row>
    <b-table
    :items="templateItems"
    :fields="templateFields"
    striped
    responsive="md"
    class="custom table-responsive"
    @row-clicked="rowRedirect"
    >
      <template slot="edit" slot-scope="scope">
        <b-link class="icon-link">
          <span class="icon icon-iconm_search"></span>
        </b-link>
      </template>
    </b-table>
  </b-col>

  <b-col cols="6">
    <h4 class="mb-3">Wysłane</h4>
    <b-table
    :items="sentItems"
    :fields="sentFields"
    striped
    responsive="md"
    class="custom table-responsive"
    @row-clicked="rowRedirect"
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
  mixins: [EventBusEmit],
  name: 'Messages',
  data () {
    return {
      templateFields: [
        {key: 'title', label: 'Tytuł', sortable: true},
        {key: 'content', label: 'Treść', sortable: true},
        {key: 'edit', label: ''}
      ],
      templateItems: [
        {title: 'hello', content: 'world'},
        {title: 'kek', content: 'cheburek'}
      ],
      sentFields: [
        {key: 'title', label: 'Tytuł', sortable: true},
        {key: 'dateOfSent', label: 'Data wysłania', sortable: true},
        {key: 'newAnswers', label: 'Nowe Odpowiedzi', sortable: true},
        {key: 'edit', label: ''}
      ],
      sentItems: [
        {title: 'china', dateOfSent: '10/10/2019', newAnswers: '5'},
        {title: 'chiza', dateOfSent: '11/11/2005', newAnswers: '2'}
      ]
    }
  },
  methods: {
    rowRedirect (id, isConfirmed) {
      this.$router.push({
        name: 'messages',
        params: {'tab': 'main-data', 'id': id, 'isConfirmed': isConfirmed}
      })
    }
  },
  created () {
    /** @buttonLink route name || false if button must be hidden */
    this.changeAdminNavbarButton({buttonLink: false})
    this.changeAdminNavbarBreadcrumbs([{text: 'Komunikaty', active: true}])
  }
}
</script>

<style scoped>

</style>
